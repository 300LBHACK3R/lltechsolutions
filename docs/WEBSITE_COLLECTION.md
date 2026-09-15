# Website Templates

This is a prepared source update, not a claim of a GitHub push or live Vercel deployment. It preserves L&L’s black, gold and charcoal identity and its three public disciplines.

## The visitor journey

1. Open Website Templates after Our Clients in the navigation. The approved introduction explains the service; visitors choose a business category from wide photographic strips.
2. Each category opens `/website-collection/category/[category]`, with a compact visual gallery. The existing templates use plain names: Painting Company, Construction & Plumbing, Massage Practice, Calgary Hot Shot and Tow-N-Go Trailers. Category filtering stays on the gallery page, not the landing page.
3. Open a template to explore its inline pages and Phone/Fit screen views. “Make this my website” opens the existing contact form with that exact template selected. Checkboxes on a gallery allow a comparison of up to three templates; they are a page-local selection, not a persistent saved list.
4. Optional extras and monthly support remain available from the template detail page through the existing guided enquiry. The content guide remains available after booking. No payment is collected and no monthly plan is preselected.

No account, extra analytics, tracking pixels, new application dependencies or upload service is introduced. The contact form stays mounted while visitors move back through the guided steps, preserving their typed information. Selection context is appended to the final submitted message using the existing length limits and server validation. A normal enquiry link and direct contact details remain available.

## Current designs and truthfulness

The category banners are generated industry illustrations, not photographs of client premises or completed projects. Their sources are documented in `docs/TEMPLATE_CATEGORY_IMAGES.md`. They load from local optimized WebP files through Next Image. Desktop strips use a shaded text area and a small hover zoom for a fine pointer; on mobile the panorama sits above the copy, preserving the range of subjects. Reduced-motion and forced-colour preferences are respected. The images are decorative because the adjacent heading and description provide the category's meaning.

| Design                  | Main fit                              | Level     | Current status                             |
| ----------------------- | ------------------------------------- | --------- | ------------------------------------------ |
| Painting Company        | Painting                              | Signature | Interactive concept; launch pricing quoted |
| Construction & Plumbing | Construction, also shown for Plumbing | Premier   | Interactive concept; launch pricing quoted |
| Massage Practice        | Massage & Wellness                    | Essential | Interactive concept; launch pricing quoted |

These are original coded design studies with sample text, generic sample identities and generated illustrative photography. They are not client projects, ready-made client assets or complete production business sites. Contact layouts within the concept do not collect information. The actual pages, content, integrations and launch implementation are defined in the proposal. Only original or appropriately licensed reusable material may enter the collection.

Existing website/software/social pricing remains unchanged. No collection launch prices have been approved in this update. A concept with `startingPriceCad: null` reads “Quoted after a conversation”; it is never treated as free or included beneath a numeric budget ceiling. The finished offer can receive a price and published status once approved. Higher levels buy greater scope, not a different baseline of security or care.

## Canonical data and routes

`src/data/website-collection.ts` is the catalogue and selection source. It holds tiers, industry tags grouped into seven browsing categories, care choices, extras, design records and canonical inquiry helpers. `additionalIndustries` lets a design fit more than one relevant category. `src/data/collection-brief.ts` defines the content guide, bounded recovery format and text export.

- `/website-collection`: business category selection and service explanations. Legacy `?industry=` links redirect to the corresponding gallery, preserving filter context.
- `/website-collection/category/[category]`: category-specific gallery, optional business/level filters, template previews, direct enquiry links and comparison selections.
- `/website-collection/[design]`: individual detail page, interactive preview, scope, optional video, pricing explanation and performance evidence.
- `/website-collection/start?design=pigment`: three-step guided enquiry.
- `/website-collection/compare?design=pigment&design=still`: shareable comparison.
- `/website-collection/brief`: optional client content guide, after booking.

Design pages use server-generated metadata, canonical URLs and CreativeWork structured data. The landing page lists category links in its CollectionPage/ItemList schema. Category pages have unique metadata, breadcrumbs and an ItemList matching their displayed templates. Only categories with available templates enter the sitemap; empty categories are noindex and say that no templates have been added yet. Design pages are added to the sitemap from the same catalogue. Start, Compare and Brief are noindex utilities and are not in the sitemap. Draft designs are excluded from cards, details, inquiries and comparisons. Reserve the slugs `start`, `compare`, `brief` and `category`. Internal template IDs and existing URLs remain stable even when display names change.

## Adding and publishing designs

Use the `WebsiteDesign` type in the catalogue. Give every design a unique slug, a plain business-facing name, tier, industry, description, page count, realistic delivery wording, scope and customization list. Assign an existing industry tag and it automatically appears in the correct gallery. If adding an industry tag, assign it to exactly one `templateCategories` group. Put real thumbnail images under `public/images/collection/<design-id>/preview.webp` and set the `preview` source, alt text and actual dimensions in the record. An image alone does not make a template available: include a working inline concept or a checked public demo.

- `draft`: private preparation; never rendered publicly.
- `concept`: an explicitly labelled preview whose final offer may still require a quote.
- `published`: approved offer with a positive, numeric `startingPriceCad` and a checked demo.
- `client-example`: a real portfolio reference with a valid `clientProjectId`; launch price and page count stay unquoted until the prospect’s own scope is agreed.

Existing concepts have `concept` data used by `DesignPreview.tsx` and their own route anchor as `demoUrl`. Future externally hosted demos need a public HTTPS URL and a real screenshot under `public/images/collection/`, with alt text and the actual image dimensions. Inline concepts use a miniature HTML page layout built from their sample brand, headline and services. Supplied screenshots take precedence in gallery cards. These are preview layouts, not screenshots of a finished client site. A future original layout can extend the preview component; do not disguise a repeated layout as an exclusive bespoke client design.

Confirm scope, revision allowance, content responsibilities, completion timing, usage/handover terms, taxes and provider fees before accepting a deposit. Monthly care remains optional and separately scoped.

## Adding walkthrough videos and Tate’s introduction

The UI renders videos only after real files and their data are supplied. It uses native controls, inline playback, no autoplay, no preloading, captions and a readable transcript. No stock person, synthetic Tate recording, broken video placeholder or invented performance clip is included.

Use these suggested file locations (create each folder when adding the actual files):

| Recording      | Files relative to the repository                                                   |
| -------------- | ---------------------------------------------------------------------------------- |
| Pigment tour   | `public/media/collection/pigment/walkthrough.mp4`, `poster.webp`, `captions.vtt`   |
| Structure tour | `public/media/collection/structure/walkthrough.mp4`, `poster.webp`, `captions.vtt` |
| Still tour     | `public/media/collection/still/walkthrough.mp4`, `poster.webp`, `captions.vtt`     |
| Meet Tate      | `public/media/collection/tate/introduction.mp4`, `poster.webp`, `captions.vtt`     |

Set a design’s `walkthrough` object, or the `developerIntroduction` export, with `src`, `poster`, `captions` and a real `transcript`. Public URLs omit `public`, for example `/media/collection/pigment/walkthrough.mp4`. Do not set the object until all three files exist. Use H.264 MP4 with a web-friendly encoding and captions matching the recording. Keep a tour focused: home, services, one useful detail and the contact journey. Check playback and seeking on the actual deployed site.

Without a recording, the interactive concept remains usable; Meet Tate uses the written introduction. Existing client videos elsewhere on the site are untouched.

## Performance evidence

Each design optionally accepts `performance` records containing:

- `url`: the actual tested public HTTPS page;
- `measuredAt`: the real measurement date, YYYY-MM-DD;
- `device`: Mobile or Desktop;
- `conditions`: meaningful connection, throttling and test-environment details;
- `lighthouseVersion` and an accessible HTTPS `reportUrl`;
- `scores`: actual integer 0–100 values for performance, accessibility, bestPractices and seo.

No records are supplied for the new concepts because they have not been measured in a public browser environment. The page says so. Do not use another project’s scores or imply a guarantee. Metadata and automated checks are a foundation, not a ranking or security promise.

## Content guide and privacy

The guide is an optional preparation tool, not an authenticated client portal. It makes no network submission and accepts no uploads. All fields can be left for discussion. The visitor explicitly clicks Save draft to use browser storage; nothing is saved automatically. The record has a version and field allowlist, with bounded field lengths. Restore and Clear ask before replacing current work. Missing or unavailable storage produces a useful message and preserves current entries.

The exported file is `My-LandL-Website-Brief.txt`. The visitor sends it through the agreed project email if they choose. Actual media transfer and account access are arranged separately. No passwords, API keys, payment details or sensitive customer data should enter the guide. Privacy explains this behaviour. Browser data is not synchronized across devices.

## Checks and remaining review

Use `npm ci`, `npm run format:check`, `npm run check`, `npm audit --audit-level=moderate`, `npm run build` and `npm run smoke`.

The September 15 industry-gallery update passed formatting, source/asset validation, ESLint without warnings, TypeScript, 19 tests, production build, compiled stylesheet verification and 86 HTTP checks. Tests cover category boundaries, draft exclusion, direct enquiry context, unknown categories, legacy filter redirects and empty-state metadata. The smoke server has no email key and sends no external email.

The subsequent category-photo update passed the same checks and 91 HTTP checks, including an optimized image response for each of the five banners. The full-resolution WebP sources total 936,082 bytes; the browser receives responsive derivatives. No new dependencies, third-party image domains or security-policy exceptions were introduced. Rendered browser review is still required: the preview browser rejected access to the local server (`ERR_BLOCKED_BY_CLIENT`).

Rendered review of this update remains outstanding: the supported browser cannot access the local server. After applying it, check category rows and galleries on phone, tablet and desktop, including keyboard selection, template previews and contact links. A successful main push is not a verified Vercel deployment.

The updater preserves a local backup, applies only this reviewed patch in a release branch, and runs the quality gates. With `-Push`, it fast-forwards main to the validated commit and uses the owner’s authenticated Git to push. No force push, stash operation or environment-file copy is used.

## Realistic previews and live examples

The Painting Company, Construction & Plumbing and Massage Practice concepts use photo-led previews and customer-facing sample copy. Visitors can try a business name locally in the preview; it is not stored or sent. Miniature typography scales against its card width to keep the title separate from the services strip. Massage has three page structures, with its approach included on Home.

Transport & Logistics includes Calgary Hot Shot, the user-supplied live concept demo. Its card and scrollable detail preview use actual screenshots; the external link opens the interactive demo. It remains unpriced and explicitly labelled as a concept with placeholder business details. Do not represent it as an approved client or a production launch.

Food & Restaurants has its own illustrated category and an honest empty state until a template is ready. Retail & Automotive is separate; the old retail-hospitality route redirects permanently. Food industry filters now resolve to Food & Restaurants. Empty categories remain noindex and outside the sitemap.

To add a real example, extend `websiteDesigns` with its approved category, name, scope, `preview`, optional `pagePreview` and actual HTTPS `demoUrl`. Images live in `public/images/collection/`; provenance is documented in `TEMPLATE_PREVIEW_IMAGES.md`. Do not mark a concept as published until its price and finished scope are approved.

### Validation for this update

Formatting, local asset/import validation, zero-warning ESLint, TypeScript, 20 unit tests, production build, production stylesheet checks and 102 HTTP checks passed. Dependency audit reported zero vulnerabilities. HTTP checks cover new category pages and metadata, truthful empty states, the legacy category redirect, actual and generated image responses, enquiry context and security responses. No external email was sent.

The public Calgary Hot Shot demo was visually inspected and captured with its revealed sections. The updated L&L UI has not received browser-level visual verification in this environment: the preview browser cannot access the local build. Review the three sample previews at phone/tablet/desktop widths, long business-name wrapping, keyboard navigation and the full-page screenshot after deployment. This package does not claim a remote push or a successful Vercel deployment.

## Tow-N-Go client reference

Transport & Logistics now includes Tow-N-Go Trailers as a **Live client example** alongside the Calgary Hot Shot concept demo. The catalogue uses its existing real website screenshot; the detail page resolves the original project and video from the canonical portfolio data. No media files or client records are duplicated. It links to the live website, full website case study and ongoing monthly digital partnership.

The enquiry says “Build something like this” and carries a request for a similar website with the prospect’s own branding, content and business details. Tow-N-Go’s logo, fleet photography, reviews and client-specific materials are not offered for reuse. The original site remains a managed client project, not a generic template for sale. Page count and price are scoped for the new business; no Chad contract price is exposed or reused.

The existing 26-second portfolio walkthrough is reused, with native controls, no autoplay and a visual-description track. Replacing its canonical project media updates the collection example too. The client site continues to evolve; the live link remains available for its current state.

This addition passed formatting, import/asset validation, ESLint, TypeScript, 21 unit tests, the production build and 106 production HTTP checks. The checks cover the client-reference enquiry, category comparison, existing video controls and media responses, metadata and the unchanged contact protections. Dependency audit reported zero vulnerabilities. No external email was sent; browser/device review and deployment confirmation remain separate.
