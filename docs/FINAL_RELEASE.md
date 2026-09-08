# Compact footer and production release

Prepared September 8, 2026, following Tate's approval of the rest of the site and request to publish.

## Changes

The footer uses a smaller linked logo, short location line, inline desktop navigation and a three-column phone navigation grid. Large repeated tagline text, the tall navigation column and surplus padding were removed. Email, telephone, all three social links, legal pages and motion preferences remain accessible. The rest of the approved interactive design is unchanged.

## Security and SEO review

- The npm registry reports Next.js 16.3.4 and React 19.2.8 as current stable releases; both match this project. The [August Next.js advisory](https://nextjs.org/blog/august-2026-security-release) identifies 16.3.3 as the patched 16.3 release; this project is newer and uses WebP image output.
- A fresh `npm audit --audit-level=high` reports zero known vulnerabilities in the lockfile. Resend remains pinned at the existing compatible 6.14.0; newer feature releases are available, but no known audit finding requires an SDK migration in this footer release.
- Live `/contact`, `/robots.txt` and `/sitemap.xml` returned 200. The contact page has its canonical URL, and the live site exposes CSP, HSTS, frame/MIME protections, referrer/permissions policies and cross-origin protections without an X-Powered-By header.
- The approved release passes the production metadata, sitemap, JSON-LD, internal-link, validation and response-header checks. Security limitations such as the static-page inline-script allowance and per-process throttling remain documented in `SECURITY.md`.
- The live contact UI blocks missing required fields. The endpoint rejects incomplete submissions with 400. Actual Resend delivery remains unconfirmed; see `CONTACT_SETUP.md`.

These findings establish specific checks, not a penetration-test result, guaranteed rankings or universal browser compatibility. The new local footer cannot be visually inspected from the restricted preview environment here. The user has approved the surrounding design; real-device review remains useful after publication.

## Publication

The source includes `scripts/Publish-LandL.ps1`. The downloadable package places a copy beside its verified Git bundle and manifest. Run that packaged copy with `-Deploy` to authorize this sequence:

1. Verify the repository, Node version, bundle checksum and imported commit.
2. Create a separate worktree. Merge current `origin/main` into it so newer production work is preserved; conflicts stop publication.
3. Install locked dependencies and run formatting, validation, lint, TypeScript, tests, audit, build and smoke checks.
4. Push a release branch and wait for the Quality workflow for its exact commit.
5. Recheck that main and the validated worktree have not changed. Push the tested commit to main using a normal fast-forward push. No force push or branch-protection bypass is used.
6. Poll the public domain for the compact footer, Reviews, Investment and Contact pages and expected headers. This checks visible release content, not the exact internal Vercel deployment ID or inbox delivery.

The original working directory, local main and uncommitted work are preserved. No stash is popped or credentials copied. The script stops if a required quality check cannot be confirmed. If GitHub requires a pull request, the main push will be rejected normally; use the printed PR link and repository-required workflow.

At preparation time, production main was `5304cc16`; approved review `d4c4544` was pushed with successful Quality and Vercel status checks but had no open PR and remained unmerged. This session's GitHub/Vercel write access is unavailable, so publication uses Tate's authenticated Windows Git. No production push or deployment has been performed by this session.

Vercel must still be configured to deploy this repository's `main` branch to the existing production domain. If main pushes successfully but the public checks time out, inspect the production deployment and build logs; do not assume the Git push was undone. Follow [Vercel's Git deployment guide](https://vercel.com/docs/deployments/git/vercel-for-github).
