# Website Collection

The public collection lives at `/website-collection`. It is a website-service offering, alongside bespoke work, within L&L’s three established disciplines. The approved black, gold and charcoal presentation is retained.

## Current release

- Four collection levels: Essential, Signature, Premier and Flagship.
- Twelve business categories, independent of tier: Construction & Contracting, Painting, Plumbing, Electrical, Landscaping & Outdoor Services, Massage & Wellness, Legal Services, Cleaning, Automotive & Detailing, Food & Hospitality, Beauty & Personal Care and Professional Services. Categories are editable in `collectionIndustries` in the same catalogue file. Industry choice carries through tier, care and catalogue enquiry links.
- No designs are published yet. The page clearly says the first designs are being prepared. No placeholder price, fictitious product, checkout or unsupported score claim is displayed.
- Every tier and optional monthly care option links to the existing contact form with its selection included in the editable project details. The API, mail handling, allowlists and security checks are reused.
- Links appear in the main navigation, compact footer, Services, Pricing and a small line within the existing homepage services preview.
- Canonical metadata, Open Graph and Twitter metadata use the existing helper. The public route registry includes the page in the sitemap. CollectionPage structured data describes the service; an ItemList is included only when designs are published.
- Existing website/software/social starting prices are unchanged. Collection prices must be decided for each actual design before publishing it.

## Adding a design

Edit the `websiteDesigns` array in `src/data/website-collection.ts`. This is the canonical catalogue. The `WebsiteDesign` type documents required fields. Add original screenshots under `public/images/collection/`, using optimized WebP or JPEG where appropriate. Keep the image’s real intrinsic dimensions and describe the visible design in its alt text.

Each record needs:

| Field                         | Meaning                                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `id`                          | Unique lowercase slug, used in links and inquiry selection                                            |
| `status`                      | `draft` while preparing; `published` only after checking the demo, content and offer                  |
| `name`, `tier`, `industry`    | Public display name, one of the four tier IDs, a canonical industry ID from `collectionIndustries`    |
| `description`                 | What this particular design is suited to                                                              |
| `startingPriceCad`            | Approved numeric starting price, greater than zero; personalization and launch scope must be explicit |
| `pageCount`, `deliveryWindow` | Included page count and realistic timing conditions, including when the clock starts                  |
| `preview`                     | Local image `src`, descriptive `alt`, intrinsic `width` and `height`                                  |
| `demoUrl`                     | Public HTTPS live demo; no credentials, private account links or customer data                        |
| `included`                    | Concrete list covering pages, customization, revisions and any included features                      |

The catalogue displays published records only. Business-type, collection and budget filters are available from the start. The page clearly shows the preparation state while no designs are published, and preserves the selected business type and tier in enquiry links. Adding the first published record populates matching image previews, individual prices, scope disclosures, demo links and “Choose this design” enquiry links. Filters and low/high price sorting then operate on the published records. Filters use native GET forms and work without JavaScript. Prices are formatted in CAD. “Under” budget filters are strictly less than the displayed amount.

There is no automated payment collection in this release. “Choose this design” begins a scope enquiry. The agreed proposal and deposit follow once the customer’s requirements are understood.

## Offer and care boundaries

Security and launch checks apply at every collection level. Higher tiers describe broader scope and presentation, not a safer or more correct baseline. Reusing a design foundation must be disclosed; never describe it as an exclusive bespoke design. Only use original or appropriately licensed reusable assets; keep client-specific logos, photos, private data and testimonials out of resale designs.

Monthly Website Care, Website Growth and Website + Social are optional, separately scoped service options. Decide fees, update cadence, included change allowance, support arrangements and handover/cancellation terms in the customer’s proposal. Domain, hosting, advertising and third-party costs must be clear. The collection does not promise unlimited changes, guaranteed security, rankings, traffic or universal Lighthouse scores.

Published performance results need a recorded URL, measurement date, device/test conditions and the actual result. Client project scores must not be presented as measurements of a collection design. The comparison with doing a Shopify or AI-builder setup yourself is about L&L’s included human service, implementation and accountability, not unsupported claims that other platforms are insecure or cannot be professionally managed.

## Validation and visual review

Run `npm run format:check`, `npm run check`, `npm audit --audit-level=moderate`, `npm run build` and `npm run smoke`. Catalogue tests reject duplicate IDs, invalid prices, unsafe demo URLs, missing preview assets and incomplete published entries. They also verify filtering, draft exclusion and safe selection transfer through the existing inquiry validation.

Before publishing a design, open its real demo and verify every included page and feature. Review the collection at phone, tablet, desktop and wide-screen sizes, plus keyboard navigation, 200% zoom, reduced motion and JavaScript disabled. Test filters with actual records, no-match results, clear filters, tier/plan links and browser back navigation. Confirm the inquiry contains the intended selection. A rendered form or a local HTTP pass does not prove inbox delivery.

## Verification for this release

On September 12, 2026: clean dependency installation, formatting, import/asset validation, ESLint with zero warnings, TypeScript, all 12 tests, dependency audit (zero reported vulnerabilities), production build and all 59 HTTP checks passed. No external email was sent. The supported browser returned `ERR_BLOCKED_BY_CLIENT` for the local preview, so visual device/browser verification is not claimed.

The update is prepared on top of the Crestline Other Design Options change. Its Windows updater includes both changes if the gallery has not already been installed. The existing GitHub integration cannot write to this repository, so publication uses the owner’s authenticated local Git. The updater defaults to local review, requires a clean working tree, preserves a backup branch and waits for GitHub Quality before a requested production push. It does not confirm Vercel deployment success.
