[CmdletBinding()]
param(
    [string]$ProjectPath = (Join-Path $env:USERPROFILE 'landl-tech'),
    [string]$ReleaseDirectory = $PSScriptRoot,
    [switch]$Deploy
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Invoke-Checked {
    param([string]$Program, [string[]]$Arguments)
    & $Program @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$Program failed with exit code $LASTEXITCODE. No force push was attempted; the original checkout is preserved."
    }
}

function Wait-Quality {
    param([string]$Commit)
    $Deadline = [DateTime]::UtcNow.AddMinutes(12)
    $Headers = @{ Accept = 'application/vnd.github+json'; 'User-Agent' = 'LandL-Production-Release' }
    do {
        $Response = Invoke-RestMethod -Uri "https://api.github.com/repos/300LBHACK3R/lltechsolutions/actions/runs?head_sha=$Commit&event=push&per_page=20" -Headers $Headers -TimeoutSec 30
        $Run = $Response.workflow_runs |
            Where-Object { $_.head_sha -eq $Commit -and $_.name -eq 'Quality' -and $_.path -eq '.github/workflows/quality.yml' -and $_.event -eq 'push' } |
            Sort-Object run_number -Descending | Select-Object -First 1
        if ($null -ne $Run -and $Run.status -eq 'completed') {
            if ($Run.conclusion -ne 'success') {
                throw "Quality did not pass: $($Run.conclusion). Production was not pushed. $($Run.html_url)"
            }
            Write-Host "QUALITY PASSED: $($Run.html_url)" -ForegroundColor Green
            return
        }
        Write-Host 'Waiting for the Quality workflow for this exact commit...'
        Start-Sleep -Seconds 20
    } while ([DateTime]::UtcNow -lt $Deadline)
    throw 'Quality could not be confirmed within 12 minutes. The release branch is pushed; production was not pushed.'
}

function Assert-PublishState {
    param([string]$ExpectedMain, [string]$ActualMain, [string]$ExpectedCommit, [string]$ActualCommit, [string[]]$Changes)
    if ($ActualMain -ne $ExpectedMain) {
        throw 'Remote main changed during validation. The release branch is available, but production was not pushed. Reconcile the new main before retrying.'
    }
    if ($ActualCommit -ne $ExpectedCommit -or $Changes.Count -ne 0) {
        throw 'The release worktree changed after validation. Production was not pushed.'
    }
}

function Test-PublicRelease {
    param([string]$Commit)
    $Deadline = [DateTime]::UtcNow.AddMinutes(5)
    $Headers = @{ 'Cache-Control' = 'no-cache'; 'User-Agent' = 'LandL-Production-Release' }
    do {
        try {
            $Page = Invoke-WebRequest -Uri "https://lltechsolutions.ca/?release=$Commit" -UseBasicParsing -Headers $Headers -TimeoutSec 20
            if ($Page.StatusCode -eq 200 -and $Page.Content -match 'footer-compact' -and $Page.Content -match '>Our Clients</a>') {
                foreach ($Route in @('/reviews', '/packages', '/contact', '/projects/web-builds', '/projects/software-development', '/projects/social-media-management')) {
                    $Check = Invoke-WebRequest -Uri "https://lltechsolutions.ca${Route}?release=$Commit" -UseBasicParsing -Headers $Headers -TimeoutSec 20
                    if ($Check.StatusCode -ne 200 -or $Check.Content -notmatch 'footer-compact') {
                        throw "The updated $Route page is not yet available."
                    }
                    if ($Check.Headers['X-Content-Type-Options'] -ne 'nosniff' -or $Check.Headers['X-Frame-Options'] -ne 'DENY' -or -not $Check.Headers['Strict-Transport-Security'] -or -not $Check.Headers['Content-Security-Policy']) {
                        throw "Production security headers are missing on $Route."
                    }
                    if ($Check.Headers['X-Robots-Tag'] -match 'noindex') {
                        throw "The production $Route page has a noindex header."
                    }
                    if ($Route -eq '/packages' -and ($Check.Content -notmatch '\$399\+' -or $Check.Content -notmatch '\$149\+')) {
                        throw 'The new starting prices are not visible yet.'
                    }
                    if ($Check.Content -match 'tate.?byers\.ca|tate-byers|Selected Work') {
                        throw "Retired portfolio references are still present on $Route."
                    }
                    if ($Route -like '/projects/*' -and $Check.Content -notmatch 'data-project-video') {
                        throw "The inline previews are not visible on $Route yet."
                    }
                }
                foreach ($Video in @('tow-n-go-website', 'crestline-website', 'mckenzie-website', 'tates-tv-interface', 'tow-n-go-content', 'mckenzie-launch')) {
                    $Media = Invoke-WebRequest -Uri "https://lltechsolutions.ca/media/projects/${Video}.mp4?release=$Commit" -Method Head -UseBasicParsing -Headers $Headers -TimeoutSec 20
                    if ($Media.StatusCode -ne 200 -or $Media.Headers['Content-Type'] -notmatch 'video/mp4') {
                        throw "The $Video preview is not available yet."
                    }
                }
                Write-Host 'LIVE SITE CHECKS PASSED: https://lltechsolutions.ca' -ForegroundColor Green
                Write-Host 'The compact footer, Our Clients navigation, six preview videos, Reviews, Investment and Contact pages are available. Inbox delivery still needs a real enquiry and receipt check.'
                return
            }
        } catch {
            Write-Host "Waiting for the live release: $($_.Exception.Message)"
        }
        Start-Sleep -Seconds 15
    } while ([DateTime]::UtcNow -lt $Deadline)
    Write-Warning 'Main was pushed, but the live update could not be confirmed within five minutes. Check the Vercel production deployment. Do not assume the push was undone.'
}

$OriginalLocation = Get-Location
try {
    foreach ($Program in @('git', 'node', 'npm.cmd')) {
        if (-not (Get-Command $Program -ErrorAction SilentlyContinue)) { throw "Required command not found: $Program" }
    }
    $NodeVersion = (& node --version).Trim()
    if ($LASTEXITCODE -ne 0 -or [int]($NodeVersion.TrimStart('v').Split('.')[0]) -lt 22) { throw 'Node.js 22 or newer is required.' }
    $ProjectPath = (Resolve-Path -LiteralPath $ProjectPath).Path
    $ReleaseDirectory = (Resolve-Path -LiteralPath $ReleaseDirectory).Path
    $Package = Get-Content -LiteralPath (Join-Path $ProjectPath 'package.json') -Raw | ConvertFrom-Json
    if ($Package.name -ne 'landl-tech') { throw 'This is not the landl-tech project.' }
    $Remote = (& git -C $ProjectPath remote get-url origin).Trim()
    if ($LASTEXITCODE -ne 0 -or $Remote -notmatch '^(https://github\.com/|git@github\.com:)300LBHACK3R/lltechsolutions(\.git)?/?$') { throw 'The origin remote does not match L&L.' }
    $Manifest = Get-Content -LiteralPath (Join-Path $ReleaseDirectory 'release.json') -Raw | ConvertFrom-Json
    $BundlePath = Join-Path $ReleaseDirectory 'landl-final-release.bundle'
    if ((Get-FileHash -LiteralPath $BundlePath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $Manifest.bundleSha256) { throw 'The bundle checksum does not match.' }

    Invoke-Checked 'git' @('-C', $ProjectPath, 'fetch', 'origin')
    $PreparedMain = (& git -C $ProjectPath rev-parse origin/main).Trim()
    if ($LASTEXITCODE -ne 0) { throw 'Could not inspect origin/main.' }
    Invoke-Checked 'git' @('-C', $ProjectPath, 'bundle', 'verify', $BundlePath)
    $Stamp = Get-Date -Format 'yyyyMMdd-HHmmss-fff'
    $ImportRef = "refs/landl-production/$Stamp"
    $Branch = "release/landl-production-$Stamp"
    $ReviewPath = Join-Path (Split-Path -Parent $ProjectPath) "landl-tech-production-$Stamp"
    Invoke-Checked 'git' @('-C', $ProjectPath, 'fetch', $BundlePath, "$($Manifest.bundleRef):$ImportRef")
    $ImportedCommit = (& git -C $ProjectPath rev-parse $ImportRef).Trim()
    if ($LASTEXITCODE -ne 0 -or $ImportedCommit -ne $Manifest.releaseCommit) { throw 'The imported commit does not match the manifest.' }
    Invoke-Checked 'git' @('-C', $ProjectPath, 'worktree', 'add', '-b', $Branch, $ReviewPath, $ImportRef)
    Set-Location -LiteralPath $ReviewPath
    # Preserve any newer main work. Conflicts stop here, inside the isolated worktree.
    Invoke-Checked 'git' @('merge', '--no-edit', 'origin/main')
    Write-Host "Release worktree: $ReviewPath" -ForegroundColor Cyan
    Write-Host 'Your original checkout and uncommitted files are preserved.'

    Invoke-Checked 'npm.cmd' @('ci')
    Invoke-Checked 'npm.cmd' @('run', 'format:check')
    Invoke-Checked 'npm.cmd' @('run', 'check')
    Invoke-Checked 'npm.cmd' @('audit', '--audit-level=high')
    Invoke-Checked 'npm.cmd' @('run', 'build')
    Invoke-Checked 'npm.cmd' @('run', 'smoke')
    Invoke-Checked 'git' @('diff', '--check')
    $Changes = @(& git status --porcelain)
    if ($LASTEXITCODE -ne 0 -or $Changes.Count -ne 0) { throw 'The worktree changed during validation; nothing was pushed.' }
    $ValidatedCommit = (& git rev-parse HEAD).Trim()
    if ($LASTEXITCODE -ne 0) { throw 'Could not identify the validated commit.' }
    Write-Host "LOCAL QUALITY CHECKS PASSED: $ValidatedCommit" -ForegroundColor Green

    if ($Deploy) {
        Invoke-Checked 'git' @('push', '-u', 'origin', $Branch)
        Write-Host "Review/PR link: https://github.com/300LBHACK3R/lltechsolutions/compare/main...${Branch}?expand=1"
        Wait-Quality -Commit $ValidatedCommit
        Invoke-Checked 'git' @('fetch', 'origin')
        $LatestMain = (& git rev-parse origin/main).Trim()
        if ($LASTEXITCODE -ne 0) { throw 'Could not recheck origin/main; production was not pushed.' }
        $CurrentCommit = (& git rev-parse HEAD).Trim()
        if ($LASTEXITCODE -ne 0) { throw 'Could not recheck HEAD; production was not pushed.' }
        $Changes = @(& git status --porcelain)
        if ($LASTEXITCODE -ne 0) { throw 'Could not recheck the worktree; production was not pushed.' }
        Assert-PublishState -ExpectedMain $PreparedMain -ActualMain $LatestMain -ExpectedCommit $ValidatedCommit -ActualCommit $CurrentCommit -Changes $Changes
        Invoke-Checked 'git' @('merge-base', '--is-ancestor', $LatestMain, $ValidatedCommit)
        # Normal fast-forward push only. GitHub branch rules still apply.
        Invoke-Checked 'git' @('push', 'origin', "${ValidatedCommit}:refs/heads/main")
        Write-Host 'PRODUCTION MAIN PUSHED SUCCESSFULLY' -ForegroundColor Green
        Test-PublicRelease -Commit $ValidatedCommit
    } else {
        Write-Host 'Validation only: no branch or production push was performed.'
        Write-Host "To preview: cd `"$ReviewPath`"; npm run dev"
        Write-Host 'Run the packaged script with -Deploy to validate, push a release branch, wait for Quality and publish main.'
    }
} finally {
    Set-Location -LiteralPath $OriginalLocation.Path
}
