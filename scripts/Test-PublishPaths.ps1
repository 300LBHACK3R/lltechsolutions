# Startup regression checks only: all Git and Node commands are mocked.
[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Publisher = Join-Path $PSScriptRoot 'Publish-LandL.ps1'
$Tokens = $null
$ParseErrors = $null
$null = [System.Management.Automation.Language.Parser]::ParseFile($Publisher, [ref]$Tokens, [ref]$ParseErrors)
if ($ParseErrors.Count -ne 0) { throw ($ParseErrors | Out-String) }

$FixtureRoot = Join-Path ([IO.Path]::GetTempPath()) ('landl-path-tests-' + [guid]::NewGuid().ToString('N'))
$PackageDirectory = Join-Path $FixtureRoot 'release folder [1]'
$ProjectDirectory = Join-Path $FixtureRoot 'project folder [1]'
$OtherDirectory = Join-Path $FixtureRoot 'unrelated cwd'
$SavedLocation = Get-Location
$script:Assertions = 0
$global:LandLTestGitCalls = @()

function node { $global:LASTEXITCODE = 0; return 'v22.18.0' }
function npm.cmd { throw 'Unexpected npm call in a startup test.' }
function git {
    $global:LandLTestGitCalls += ,@($args)
    $global:LASTEXITCODE = 0
    if (($args -join '|') -eq "-C|$ProjectDirectory|remote|get-url|origin") {
        return 'git@github.com:300LBHACK3R/lltechsolutions.git'
    }
    if (($args -join '|') -eq "-C|$ProjectDirectory|fetch|origin") {
        throw 'TEST: startup completed; intercepted before network or worktree changes.'
    }
    throw "Unexpected Git command: $($args -join ' ')"
}

function Assert-Startup {
    param([string]$Name, [string]$Script, [hashtable]$Parameters, [string]$Expected, [int]$ExpectedGitCalls)
    $global:LandLTestGitCalls = @()
    $Caught = $false
    try { & $Script @Parameters } catch {
        if ($_.Exception.Message -notlike $Expected) { throw }
        $Caught = $true
    }
    if (-not $Caught) { throw "The startup test did not stop: $Name" }
    if ($global:LandLTestGitCalls.Count -ne $ExpectedGitCalls) { throw "Unexpected Git calls: $Name" }
    if ((Get-Location).Path -ne $OtherDirectory) { throw "The caller location was not restored: $Name" }
    $script:Assertions++
    Write-Host "PASS: $Name"
}

try {
    foreach ($Directory in @($FixtureRoot, $PackageDirectory, $ProjectDirectory, $OtherDirectory)) {
        $null = [IO.Directory]::CreateDirectory($Directory)
    }
    $PackagedPublisher = Join-Path $PackageDirectory 'Publish-LandL.ps1'
    Copy-Item -LiteralPath $Publisher -Destination $PackagedPublisher
    Set-Content -LiteralPath (Join-Path $ProjectDirectory 'package.json') -Value '{"name":"landl-tech"}'
    $Bundle = Join-Path $PackageDirectory 'landl-final-release.bundle'
    Set-Content -LiteralPath $Bundle -Value 'Test fixture only; never imported into Git.'
    $Manifest = Join-Path $PackageDirectory 'release.json'
    @{bundleSha256=(Get-FileHash -LiteralPath $Bundle -Algorithm SHA256).Hash.ToLowerInvariant()} |
        ConvertTo-Json | Set-Content -LiteralPath $Manifest
    Set-Location -LiteralPath $OtherDirectory
    $Ready = 'TEST: startup completed*'
    Assert-Startup 'omitted release path, unrelated cwd, spaces and brackets' $PackagedPublisher @{ProjectPath=$ProjectDirectory; Deploy=$true} $Ready 2
    Assert-Startup 'empty release path' $PackagedPublisher @{ProjectPath=$ProjectDirectory; ReleaseDirectory=''; Deploy=$true} $Ready 2
    Assert-Startup 'whitespace release path' $PackagedPublisher @{ProjectPath=$ProjectDirectory; ReleaseDirectory='  '; Deploy=$true} $Ready 2
    Assert-Startup 'explicit release path from a separate publisher download' $Publisher @{ProjectPath=$ProjectDirectory; ReleaseDirectory=$PackageDirectory; Deploy=$true} $Ready 2
    Assert-Startup 'missing project path' $PackagedPublisher @{ProjectPath=(Join-Path $FixtureRoot 'missing')} 'Project folder does not exist:*' 0
    Assert-Startup 'missing release directory' $PackagedPublisher @{ProjectPath=$ProjectDirectory; ReleaseDirectory=(Join-Path $FixtureRoot 'missing')} 'Release folder does not exist:*' 0
    Assert-Startup 'file supplied as release directory' $PackagedPublisher @{ProjectPath=$ProjectDirectory; ReleaseDirectory=$Bundle} 'Release folder does not exist:*' 0
    Assert-Startup 'publisher downloaded without its release assets' $Publisher @{ProjectPath=$ProjectDirectory} 'Missing release.json in*' 0
    Move-Item -LiteralPath $Manifest -Destination "$Manifest.saved"
    Assert-Startup 'missing manifest' $PackagedPublisher @{ProjectPath=$ProjectDirectory} 'Missing release.json in*' 0
    Move-Item -LiteralPath "$Manifest.saved" -Destination $Manifest
    Move-Item -LiteralPath $Bundle -Destination "$Bundle.saved"
    Assert-Startup 'missing bundle' $PackagedPublisher @{ProjectPath=$ProjectDirectory} 'Missing landl-final-release.bundle in*' 0
    Move-Item -LiteralPath "$Bundle.saved" -Destination $Bundle
    Add-Content -LiteralPath $Bundle -Value 'Changed bytes must reject before fetch.'
    Assert-Startup 'incorrect bundle checksum' $PackagedPublisher @{ProjectPath=$ProjectDirectory} 'The bundle checksum does not match.' 1
    Write-Host "PASS: $script:Assertions startup checks; no network requests, worktree changes or pushes."
} finally {
    Remove-Variable -Name LandLTestGitCalls -Scope Global
    Set-Location -LiteralPath $SavedLocation.Path
    if (Test-Path -LiteralPath $FixtureRoot) { Remove-Item -LiteralPath $FixtureRoot -Recurse -Force }
}
