# Verification and release status

Date: September 8, 2026. Release: Client Showcase, Reviews & Investment.

## Source and scope

- Production main was verified at `5304cc16ede9e1e4d95806f0427a82faeb64f21a`. The interactive redesign `9968e5ba665a229eaf0bb6002eb0bfbfa83b314a` is pushed to a separate review branch and remains unmerged.
- This revision carries that interactive design forward. Complete pre-change Git history is preserved in a backup bundle; changes are isolated on `refactor/client-proof-and-reviews`.
- Retains the exact brand asset, three disciplines and approved hero language. The homepage now has five sections; all three client websites are represented and full testimonials live on `/reviews`.
- The portfolio distinguishes client websites, content partnerships and studio-owned projects. Tow-N-Go has a direct monthly social/content partnership link; McKenzie's completed digital launch is not described as a monthly contract.
- Website starting prices are $399+ CAD; social management starts at $149+ CAD/month. Software remains scoped. Existing client agreements are unaffected.
- Retains the layered project stage, interactive service study, fine-pointer tilt, gold circuit motion, crossfades, visitor motion controls and real client captures from September 6. No client images, reviews or performance figures were invented.

## Verified automatically

- Imports and local asset references validate across 61 source files.
- TypeScript, ESLint with zero-warning enforcement, and eight focused contact tests pass.
- Production build completes with all intended routes.
- Thirty production HTTP checks pass: all 14 public pages, one H1/main, unique branded titles, canonical URLs, Canadian language/locale, responsive viewport, social cards, JSON-LD parsing, tab/panel identifiers, internal links/anchors, retired routes, 404, metadata/image endpoints, security headers and rejected contact requests. Additional assertions cover all three client links, the monthly partnership link, exact quote/attribution, updated visible and metadata pricing, header/footer home links, official social links and complete sitemap coverage.
- Dependency audit reports zero known vulnerabilities. This is not a security guarantee or penetration test.
- Contact checks remove the mail key and never send external email. Missing configuration returns 503 instead of claiming delivery.

## Responsive implementation and verification limits

Responsive rules cover narrow phones, tablets, laptops, desktops, ultrawide displays and 4K layouts. They include fluid containers/type, touch controls, a scrollable small-screen menu, single-column forms, 16 px form inputs, short-landscape handling, reduced motion, keyboard operation and forced-color fallbacks. These are implementation facts, not browser-test results.

The browser inspected the deployed L&L site and the public client homepages. On September 8, the live header logo was tested from Services back to Home and worked. Access to the new local preview is blocked in this environment; an earlier protected Vercel preview also lacked authorized browser access. This revision has not been visually verified across browsers or physical devices. No new Lighthouse score, universal device compatibility, actual email delivery or production deployment is claimed.

GitHub write access remains unavailable to this session. The included PowerShell workflow uses the user's authenticated Git installation to create and optionally push a separate review branch after local checks. Visual review and a green check for that exact commit must precede the next production merge.

## Windows review workflow

The package contains the source, a baseline-bound Git bundle and a PowerShell review helper. It preserves the original checkout and uncommitted work, requires Node 22+, verifies the repository and bundle checksum, checks the current remote baseline, creates a separate worktree and runs the documented quality gates. `-Push` publishes only its new review branch. It never merges production main or copies secrets.

The earlier interactive review passed the user's Windows installation and push workflow at commit `9968e5ba`. That result does not establish Windows or browser verification of the new revision. Complete the browser/device checklist in `docs/RELEASE_CHECKLIST.md` using the local build and Vercel preview before approving the design for production. This package's validation is documented separately in `PACKAGE-VERIFICATION.txt`.
