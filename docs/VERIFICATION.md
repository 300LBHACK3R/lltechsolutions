# Verification and release status

## Current prepared scope — September 26, 2026

Four distinct Health & Wellness offers are added with dedicated demo source: `medical-spa` ($999 CAD, six pages, Flagship), `artsy-nails` ($699 CAD, four pages, Premier), `hair-salon` ($499 CAD, four pages, Signature), and `hair-one-page` ($150 CAD, one page, Essential). The new Medical Spa and Hair Salon business types belong to Health & Wellness; the nail offer uses Beauty & Personal Care. Existing prices, stable URLs, client media, main navigation and compact homepage scope are preserved.

The fictional/illustrative clinic, nail and hair demonstrations are separate from real client work. The clinic and nail forms run locally without email delivery. Their $699+ customer scope includes standard Resend/form setup and an initial delivery check, configured at that customer's launch. The $150/$499 hair scope is direct contact or an external booking link. Optional forms, additional pages, advanced integrations, original content and ongoing care remain separately scoped.

Separate static targets are `ll-medical-spa-template`, `ll-artsy-nails-template`, `ll-hair-salon-template` and `ll-hair-one-page-template`. Matching JSON configs begin with null URLs and empty screenshots, so the catalogue uses dedicated covers and does not advertise unverified demo access. Noindex and maintained security headers apply to each demo. A public production URL must be verified before it is connected to View live demo.

The expanded gates check canonical prices/page counts/contact scope, category placement and filters, numeric sorting with stable equal-price order, comparison and enquiry selection, media isolation, metadata, matching covers and delivered CSS.

### Completed preparation checks

- Formatting, zero-warning ESLint, TypeScript and local import/asset validation across 173 source files passed; 63 tests passed.
- The final main production build, delivered stylesheet gate and 185 production HTTP/link/anchor checks passed after the mobile medical-spa text-size correction.
- All four standalone production builds passed using normal dependency installs and actual font downloads: 15 public pages and 57 page-data segment hashes checked across the four exports.
- A same-process local HTTP check verified 15 clean page routes and 56 per-demo asset URLs. This verifies HTTP responses and identity, not rendered layout.
- The production dependency audit reported zero known vulnerabilities. This is not a security guarantee.
- Demo form markup and source checks confirm disabled pre-hydration/no-JavaScript fields, no endpoint or named submission fields, explicit local-preview disclosure and no email delivery. No external email was sent.
- Windows release scripts received independent static review. Windows execution, remote Git push and Vercel deployment have not been performed in this environment. The release manifest identifies its exact source commit.

### Remaining verification

Rendered browser review was blocked: the browser tool rejected local preview access with `net::ERR_BLOCKED_BY_CLIENT`; CLI browser setup also failed. Mobile/desktop rendering, browser interactions and Safari/Firefox compatibility are not claimed as verified. Check the published previews on real devices before promoting them. Customer email delivery is configured and tested separately at that customer's launch. Historical results below do not verify this expansion.

## Previous prepared scope — September 25, 2026

Nail & Esthetics Studio replaces the former generic Massage Practice at the stable `still` URL. The approved $399 CAD offer has Home, Services and Contact. One-page Massage Website (`massage-one-page`) adds a $150 CAD entry offer using supplied content, up to three treatments and direct contact or an external booking link. The public website starting price is now $150+ CAD; social management remains $149+ CAD/month. Other template and client prices are unchanged.

Both offers use separate static demo projects (`ll-beauty-template` and `ll-massage-one-page`). Their source, export checks and approved scope are distinct from public deployment: record a live-demo URL only after verifying the actual public production domain. Keep the demos noindex with the maintained security headers. No practice email delivery, integrated booking or ongoing care is included in these direct-contact demonstrations. Extra pages, original content, forms and integrations are separately scoped.

McKenzie remains a separately quoted real client example with a matching image and View live demo. Its original approximately $1,000 CAD website/photo/video project is historical combined scope, not a new template price.

This section records the prepared scope, not completed test counts, Windows execution, browser/device verification, a remote push or a Vercel deployment. Use the checks for the exact new revision and the current release checklist; historical results below do not establish verification of these new offers.

## Historical verification — September 8, 2026

Release: Client Showcase, Reviews & Investment.

## Source and scope

- Production main was verified at `5304cc16ede9e1e4d95806f0427a82faeb64f21a`. The interactive redesign `9968e5ba665a229eaf0bb6002eb0bfbfa83b314a` is pushed to a separate review branch and remains unmerged.
- This revision carries that interactive design forward. Complete pre-change Git history is preserved in a backup bundle; changes are isolated on `refactor/client-proof-and-reviews`.
- Retains the exact brand asset, three disciplines and approved hero language. The homepage now has five sections; all three client websites are represented and full testimonials live on `/reviews`.
- The portfolio distinguishes client websites, content partnerships and studio-owned projects. Tow-N-Go has a direct monthly social/content partnership link; McKenzie's completed digital launch is not described as a monthly contract.
- At that historical release, website starting prices were $399+ CAD and social management started at $149+ CAD/month. The current website entry is $150+ CAD as described above; software remains scoped and existing client agreements are unaffected.
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
