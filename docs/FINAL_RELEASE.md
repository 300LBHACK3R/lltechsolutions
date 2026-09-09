# Client previews, compact footer and production release

Prepared September 8, 2026, following Tate's approval of the rest of the site and request to publish.

## Changes

The footer uses a smaller linked logo, short location line, inline desktop navigation and a three-column phone navigation grid. Large repeated tagline text, the tall navigation column and surplus padding were removed. Email, telephone, all three social links, legal pages and motion preferences remain accessible.

The navigation is now Our Clients. The retired personal website was removed from the canonical project data and therefore from public portfolio content and structured data; Tate’s TV remains clearly labelled as L&L’s own software. Each of the six project examples now includes an inline, visitor-controlled MP4 preview. Three client websites have real captured scroll previews, Tate’s TV has a guide/remote interface tour, and the two content projects use Tate-supplied creative. No autoplay or third-party embed was added. See `PORTFOLIO_MEDIA.md` for source, accessibility and playback details.

Additional relevant Google reviews were requested, but the saved source images could not be read in full. Heather’s exact supplied testimonial remains. No quotation was invented from search summaries; see `REVIEW_SOURCES.md` for the pending sources.

## Security and SEO review

- The npm registry reports Next.js 16.3.4 and React 19.2.8 as current stable releases; both match this project. The [August Next.js advisory](https://nextjs.org/blog/august-2026-security-release) identifies 16.3.3 as the patched 16.3 release; this project is newer and uses WebP image output.
- A fresh `npm audit --audit-level=high` reports zero known vulnerabilities in the lockfile. Resend remains pinned at the existing compatible 6.14.0; newer feature releases are available, but no known audit finding requires an SDK migration in this footer release.
- Live `/contact`, `/robots.txt` and `/sitemap.xml` returned 200. The contact page has its canonical URL, and the live site exposes CSP, HSTS, frame/MIME protections, referrer/permissions policies and cross-origin protections without an X-Powered-By header.
- The approved release passes the production metadata, sitemap, JSON-LD, internal-link, validation and response-header checks. Security limitations such as the static-page inline-script allowance and per-process throttling remain documented in `SECURITY.md`.
- The live contact UI blocks missing required fields. The endpoint rejects incomplete submissions with 400. Actual Resend delivery remains unconfirmed; see `CONTACT_SETUP.md`.

These findings establish specific checks, not a penetration-test result, guaranteed rankings or universal browser compatibility. The new local footer cannot be visually inspected from the restricted preview environment here. The user has approved the surrounding design; real-device review remains useful after publication.

## Publisher path repair — September 9, 2026

The reported Windows invocation stopped with an empty `LiteralPath` error before bundle validation. The release-directory default is the likely cause, but the log did not include the internal failing line. Defaults now resolve inside the script body, and directory/asset checks report the relevant path before any Git operations.

For an already-extracted package, supply both paths explicitly. A repaired publisher downloaded separately can use the same existing bundle without downloading the videos again:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:USERPROFILE\Downloads\Publish-LandL-Fixed.ps1" -ProjectPath "C:\Users\techn\landl-tech" -ReleaseDirectory "$env:USERPROFILE\Downloads\LL_Final_Production_Release" -Deploy
```

The separately downloaded publisher validates and publishes the commit from that package's manifest. The refreshed full ZIP also includes this script fix in its bundled source. Never mix manifests and bundles from different package versions.

`powershell -NoProfile -File scripts/Test-PublishPaths.ps1` runs isolated startup checks with Git and Node mocked; it makes no network requests or pushes. Eleven startup cases and the existing eight publication guard checks passed in PowerShell 7.4.7 on Linux. Windows PowerShell 5.1 execution has not been performed here. The website source and its previously documented build/HTTP verification are unchanged by this repair.

## Publication

The source includes `scripts/Publish-LandL.ps1`. The downloadable package places a copy beside its verified Git bundle and manifest. Run that packaged copy with `-Deploy` to authorize this sequence:

1. Verify the repository, Node version, bundle checksum and imported commit.
2. Create a separate worktree. Merge current `origin/main` into it so newer production work is preserved; conflicts stop publication.
3. Install locked dependencies and run formatting, validation, lint, TypeScript, tests, audit, build and smoke checks.
4. Push a release branch and wait for the Quality workflow for its exact commit.
5. Recheck that main and the validated worktree have not changed. Push the tested commit to main using a normal fast-forward push. No force push or branch-protection bypass is used.
6. Poll the public domain for the compact footer, Our Clients navigation, six project videos, Reviews, Investment and Contact pages and expected headers. Check retired references are absent. This checks visible release content, not the exact internal Vercel deployment ID or inbox delivery.

The original working directory, local main and uncommitted work are preserved. No stash is popped or credentials copied. The script stops if a required quality check cannot be confirmed. If GitHub requires a pull request, the main push will be rejected normally; use the printed PR link and repository-required workflow.

At preparation time, production main was `5304cc16`; approved review `d4c4544` was pushed with successful Quality and Vercel status checks but had no open PR and remained unmerged. This session's GitHub/Vercel write access is unavailable, so publication uses Tate's authenticated Windows Git. No production push or deployment has been performed by this session.

Vercel must still be configured to deploy this repository's `main` branch to the existing production domain. If main pushes successfully but the public checks time out, inspect the production deployment and build logs; do not assume the Git push was undone. Follow [Vercel's Git deployment guide](https://vercel.com/docs/deployments/git/vercel-for-github).
