# Verification and release status

Date: September 6, 2026. Release: Interactive Black & Gold Studio.

## Source and scope

- Starts from production main `5304cc16ede9e1e4d95806f0427a82faeb64f21a`, after the user merged the previous corporate release.
- Complete pre-change Git history is preserved in a backup bundle. Changes are isolated on `refactor/interactive-black-gold-studio`.
- Retains the exact brand asset, three disciplines, six-section homepage, approved hero language, current pricing and verbatim Heather testimonial.
- Adds a layered project stage, interactive service study, fine-pointer tilt, gold circuit motion, project crossfades, visitor motion controls, revised project frames and a gold final CTA.
- Fresh real McKenzie and Tow-N-Go homepage captures replace older project images. No client images or performance results were invented.

## Verified automatically

- Source imports and local asset references validate.
- TypeScript, ESLint with zero-warning enforcement, and eight focused contact tests pass.
- Production build completes with all intended routes.
- Twenty-nine production HTTP checks pass: public pages, one H1/main, unique branded titles, canonical URLs, Canadian language/locale, responsive viewport, social cards, JSON-LD parsing, tab/panel identifiers, internal links/anchors, retired routes, 404, metadata/image endpoints, security headers and rejected contact requests.
- Dependency audit reports zero known vulnerabilities. This is not a security guarantee or penetration test.
- Contact checks remove the mail key and never send external email. Missing configuration returns 503 instead of claiming delivery.

## Responsive implementation and verification limits

Responsive rules cover narrow phones, tablets, laptops, desktops, ultrawide displays and 4K layouts. They include fluid containers/type, touch controls, a scrollable small-screen menu, single-column forms, 16 px form inputs, short-landscape handling, reduced motion, keyboard operation and forced-color fallbacks. These are implementation facts, not browser-test results.

The browser inspected the deployed L&L site and the public client homepages. Access to the new local preview is blocked in this environment; an earlier protected Vercel preview also lacked authorized browser access. The redesigned site has not been visually verified across browsers or physical devices. No new Lighthouse score, universal device compatibility, actual email delivery or production deployment is claimed.

GitHub write access remains unavailable to this session. The included PowerShell workflow uses the user's authenticated Git installation to create and optionally push a separate review branch after local checks. Visual review and a green check for that exact commit must precede the next production merge.

## Windows review workflow

The package contains the source, a baseline-bound Git bundle and a PowerShell review helper. It preserves the original checkout and uncommitted work, requires Node 22+, verifies the repository and bundle checksum, checks the current remote baseline, creates a separate worktree and runs the documented quality gates. `-Push` publishes only its new review branch. It never merges production main or copies secrets.

Complete the browser/device checklist in `docs/RELEASE_CHECKLIST.md` using the local build and Vercel preview before approving the design for production. The helper's packaging validation is documented separately in `PACKAGE-VERIFICATION.txt`.
