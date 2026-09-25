# Website Templates

This is a prepared source update, not a claim of a GitHub push or live Vercel deployment. It preserves L&L’s black, gold and charcoal identity and its three public disciplines.

## The visitor journey

1. Open Website Templates in the main navigation. A compact introduction preserves “A design you love. The details, handled.” and the existing launch explanation. Wide photographic business-category links appear immediately below, under “Browse by business type”. The nearby **How it works** link jumps to the compact process strip after the categories.
2. Each category opens `/website-collection/category/[category]`, with a compact visual gallery. The templates use plain names: Painting Company, Plumbing Company, Excavation & Landscaping, Landscape Contracting, Lawn Care, Nail & Esthetics Studio, One-page Massage Website, McKenzie House Massage, Calgary Hot Shot, Tow-N-Go Trailers and Crestline Painting. Category filtering stays on the gallery page, not the landing page.
3. Open a template to view its screenshots or labelled design cover, scope and starting price. Dedicated template demos use a **View live demo** button only when a verified public URL is configured. The former inline “Try this design here” flow and generic business-name editor are removed; the beauty and one-page massage offers follow the same cover/screenshots-to-live-demo journey. “Make this my website” opens the existing contact form with that exact template selected. Checkboxes on a gallery allow a comparison of up to three templates; they are a page-local selection, not a persistent saved list.
4. Additional pages, custom layouts and features are available for every template and are quoted by the agreed scope before work begins; no fixed per-page fee is implied. Optional extras and monthly support remain available from the template detail page through the existing guided enquiry. The content guide remains available after booking. No payment is collected and no monthly plan is preselected.

No account, extra analytics, tracking pixels, new application dependencies or upload service is introduced. The contact form stays mounted while visitors move back through the guided steps, preserving their typed information. Selection context is appended to the final submitted message using the existing length limits and server validation. A normal enquiry link and direct contact details remain available.

## Current designs and truthfulness

The category banners are generated industry illustrations, not photographs of client premises or completed projects. Their sources are documented in `docs/TEMPLATE_CATEGORY_IMAGES.md`. They load from local optimized WebP files through Next Image. Desktop strips use a shaded text area and a small hover zoom for a fine pointer; on mobile the panorama sits above the copy, preserving the range of subjects. Reduced-motion and forced-colour preferences are respected. The images are decorative because the adjacent heading and description provide the category's meaning.

| Design                   | Main fit                 | Level     | Current status                              |
| ------------------------ | ------------------------ | --------- | ------------------------------------------- |
| Painting Company         | Painting                 | Signature | Four-page sample demo; launch scope agreed  |
| Plumbing Company         | Plumbing                 | Premier   | Four-page sample demo; launch scope agreed  |
| Nail & Esthetics Studio  | Beauty & Personal Care   | Signature | Approved three-page offer; separate demo    |
| One-page Massage Website | Massage & Wellness       | Essential | Approved one-page offer; separate demo      |
| Excavation & Landscaping | Excavation & Landscaping | Flagship  | Seven-page sample demo; launch scope agreed |

These are original coded design studies with sample text, generic sample identities and generated illustrative photography. They are not client projects, ready-made client assets or complete production business sites. Sample contact layouts do not deliver enquiries to a contractor or practice; the real L&L enquiry action is clearly separate. The actual pages, content, integrations and launch implementation are defined in the proposal. Only original or appropriately licensed reusable material may enter the collection.

The starting-price schedule below applies to new template-based builds. Additional pages and customization are quoted separately by scope before work starts; the optional customization choice does not add an invented fixed fee. A design with `startingPriceCad: null` reads “Quoted after a conversation”; it is never treated as free or included beneath a numeric budget ceiling. A starting price does not change a sample layout into a finished template or a client example into reusable client assets. Higher levels describe greater scope, not a different baseline of security or care.

## Canonical data and routes

`src/data/website-collection.ts` is the catalogue and selection source. It holds tiers, industry tags grouped into seven browsing categories, care choices, extras, design records and canonical inquiry helpers. `additionalIndustries` lets a design fit more than one relevant category. `src/data/collection-brief.ts` defines the content guide, bounded recovery format and text export.

- `/website-collection`: business category selection and service explanations. Legacy `?industry=` links redirect to the corresponding gallery, preserving filter context.
- `/website-collection/category/[category]`: category-specific gallery, optional business/level filters, template previews, direct enquiry links and comparison selections.
- `/website-collection/[design]`: individual detail page, screenshots or a labelled cover, verified live-demo link where configured, scope, optional supplied media, pricing explanation and performance evidence. The beauty and one-page massage designs use the same dedicated showcase flow as the other templates.
- `/website-collection/start?design=pigment`: three-step guided enquiry.
- `/website-collection/compare?design=pigment&design=still`: shareable comparison.
- `/website-collection/brief`: optional client content guide, after booking.

Design pages use server-generated metadata, canonical URLs and CreativeWork structured data. The landing page lists category links in its CollectionPage/ItemList schema. Category pages have unique metadata, breadcrumbs and an ItemList matching their displayed templates. Only categories with available templates enter the sitemap; empty categories are noindex and say that no templates have been added yet. Design pages are added to the sitemap from the same catalogue. Start, Compare and Brief are noindex utilities and are not in the sitemap. Draft designs are excluded from cards, details, inquiries and comparisons. Reserve the slugs `start`, `compare`, `brief` and `category`. Internal template IDs and existing URLs remain stable even when display names change.

## Adding and publishing designs

Use the `WebsiteDesign` type in the catalogue. Give every design a unique slug, a plain business-facing name, tier, industry, description, page count, realistic delivery wording, scope and customization list. Assign an existing industry tag and it automatically appears in the correct gallery. If adding an industry tag, assign it to exactly one `templateCategories` group. Put real thumbnail images under `public/images/collection/<design-id>/preview.webp` and set the `preview` source, alt text and actual dimensions in the record. A screenshot is not a live demo: only show the external demo action after its public URL has been checked, and do not mark an offer as published on the strength of a cover image alone. A published offer requires an approved scope and completed dedicated demo source; this status does not imply that its separate Vercel deployment has been verified.

- `draft`: private preparation; never rendered publicly.
- `concept`: an explicitly labelled preview whose final offer may still require a quote.
- `published`: approved offer with a positive, numeric `startingPriceCad`, defined scope and completed dedicated demo source. A verified public URL is separately required before displaying View live demo.
- `client-example`: a real portfolio reference with a valid `clientProjectId`; its optional starting price is for a similar new build; the final quote and page count depend on the prospect’s own agreed scope.

Nail & Esthetics Studio and One-page Massage Website use dedicated covers and screenshot galleries, like painting, plumbing and earthworks. Live-demo URLs and screenshot records stay in their respective `src/data/*-demo.json` files. Missing screenshots show a labelled design cover. A missing URL omits the external demo action; it does not reveal a second embedded preview or a dead button. Supplied gallery captures must be real captures with accessible descriptions and actual dimensions. Do not disguise a repeated layout as an exclusive bespoke client design.

Confirm scope, revision allowance, content responsibilities, completion timing, usage/handover terms, taxes and provider fees before accepting a deposit. Monthly care remains optional and separately scoped.

## Adding walkthrough videos and Tate’s introduction

The UI renders videos only after real files and their data are supplied. It uses native controls, inline playback, no autoplay, no preloading, captions and a readable transcript. No stock person, synthetic Tate recording, broken video placeholder or invented performance clip is included.

Use these suggested file locations (create each folder when adding the actual files):

| Recording      | Files relative to the repository                                                   |
| -------------- | ---------------------------------------------------------------------------------- |
| Pigment tour   | `public/media/collection/pigment/walkthrough.mp4`, `poster.webp`, `captions.vtt`   |
| Structure tour | `public/media/collection/structure/walkthrough.mp4`, `poster.webp`, `captions.vtt` |
| Beauty tour    | `public/media/collection/still/walkthrough.mp4`, `poster.webp`, `captions.vtt`     |
| Meet Tate      | `public/media/collection/tate/introduction.mp4`, `poster.webp`, `captions.vtt`     |

Set a design’s `walkthrough` object, or the `developerIntroduction` export, with `src`, `poster`, `captions` and a real `transcript`. Public URLs omit `public`, for example `/media/collection/pigment/walkthrough.mp4`. Do not set the object until all three files exist. Use H.264 MP4 with a web-friendly encoding and captions matching the recording. Keep a tour focused: home, services, one useful detail and the contact journey. Check playback and seeking on the actual deployed site.

Without a recording, the design cover, supplied screenshots and any configured live-demo link remain available. A walkthrough is optional; the template does not need an embedded video or a duplicate interactive preview. Meet Tate uses the written introduction. Existing client videos elsewhere on the site are untouched.

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

Use `npm ci`, `npm run format:check`, `npm run check`, `npm audit --audit-level=high`, `npm run build` and `npm run smoke`.

Historical verification: the September 15 industry-gallery update passed formatting, source/asset validation, ESLint without warnings, TypeScript, 19 tests, production build, compiled stylesheet verification and 86 HTTP checks. Tests cover category boundaries, draft exclusion, direct enquiry context, unknown categories, legacy filter redirects and empty-state metadata. The smoke server has no email key and sends no external email.

Historical verification: the subsequent category-photo update passed the same checks and 91 HTTP checks, including an optimized image response for each of the five banners. The full-resolution WebP sources total 936,082 bytes; the browser receives responsive derivatives. No new dependencies, third-party image domains or security-policy exceptions were introduced. Rendered browser review is still required: the preview browser rejected access to the local server (`ERR_BLOCKED_BY_CLIENT`).

Rendered review of this update remains outstanding: the supported browser cannot access the local server. After applying it, check category rows and galleries on phone, tablet and desktop, including keyboard selection, template previews and contact links. A successful main push is not a verified Vercel deployment.

The current Windows installer preserves a local Git-history backup, verifies the release bundle and fast-forwards compatible history before running the quality gates. It stops for uncommitted changes or divergent commits. With `-Push`, it uses the owner’s authenticated Git for a normal main push only after validation. No force push, stash operation or environment-file copy is used.

## Realistic previews and live examples

Painting Company, Plumbing Company, Excavation & Landscaping, Nail & Esthetics Studio and One-page Massage Website use photo-led covers and customer-facing sample copy. Dedicated templates open their separate public demos through the verified live-demo button; the catalogue does not embed another interactive copy. Miniature typography scales against its card width. Nail & Esthetics has three complete pages. The massage entry has one scrolling page, with section anchors rather than separate service/contact routes.

Transport & Logistics includes Calgary Hot Shot, the user-supplied live concept demo. Its card and scrollable detail preview use actual screenshots; the external link opens the interactive demo. It remains explicitly labelled as a concept with placeholder business details; its starting price applies to a new personalization and launch. Do not represent it as an approved client or a production launch.

Food & Restaurants has its own illustrated category and an honest empty state until a template is ready. Retail & Automotive is separate; the old retail-hospitality route redirects permanently. Food industry filters now resolve to Food & Restaurants. Empty categories remain noindex and outside the sitemap.

To add a real example, extend `websiteDesigns` with its approved category, name, scope, `preview`, optional `pagePreview` and actual HTTPS `demoUrl`. Images live in `public/images/collection/`; provenance is documented in `TEMPLATE_PREVIEW_IMAGES.md`. Do not mark a concept as published until its price and finished scope are approved.

### Historical validation for the realistic-preview update

Formatting, local asset/import validation, zero-warning ESLint, TypeScript, 20 unit tests, production build, production stylesheet checks and 102 HTTP checks passed. Dependency audit reported zero vulnerabilities. HTTP checks cover new category pages and metadata, truthful empty states, the legacy category redirect, actual and generated image responses, enquiry context and security responses. No external email was sent.

The public Calgary Hot Shot demo was visually inspected and captured with its revealed sections. The updated L&L UI has not received browser-level visual verification in this environment: the preview browser cannot access the local build. Review the three sample previews at phone/tablet/desktop widths, long business-name wrapping, keyboard navigation and the full-page screenshot after deployment. This package does not claim a remote push or a successful Vercel deployment.

## Tow-N-Go client reference

Transport & Logistics now includes Tow-N-Go Trailers as a **Live client example** alongside the Calgary Hot Shot concept demo. The catalogue uses its existing real website screenshot; the detail page resolves the original project and video from the canonical portfolio data. No media files or client records are duplicated. It links to the live website, full website case study and ongoing monthly digital partnership.

The enquiry says “Build something like this” and carries a request for a similar website with the prospect’s own branding, content and business details. Tow-N-Go’s logo, fleet photography, reviews and client-specific materials are not offered for reuse. The original site remains a managed client project, not a generic template for sale. Page count and price are scoped for the new business; no Chad contract price is exposed or reused.

The existing 26-second portfolio walkthrough is reused, with native controls, no autoplay and a visual-description track. Replacing its canonical project media updates the collection example too. The client site continues to evolve; the live link remains available for its current state.

Historical Tow-N-Go verification: this addition passed formatting, import/asset validation, ESLint, TypeScript, 21 unit tests, the production build and 106 production HTTP checks. The checks cover the client-reference enquiry, category comparison, existing video controls and media responses, metadata and the unchanged contact protections. Dependency audit reported zero vulnerabilities. No external email was sent; browser/device review and deployment confirmation remain separate.

## Crestline and McKenzie client references

Construction & Trades includes **Crestline Painting**, also available through the Painting and Construction industry filters, using the actual portfolio screenshot, canonical walkthrough, live website and full client story. **Health & Wellness** shows **McKenzie House Massage** with its actual website image, live website and client story. Its template page has no video player; the canonical walkthrough remains in the client case study. Its website-only scope is quoted; Heather’s original combined website and production work is not used to set a template price. No client media files are copied or replaced.

Crestline’s proposed starting scope focuses on service pages, project categories, photography and quote enquiries. McKenzie’s focuses on treatment information, pricing, practice details and a booking pathway using the new business’s chosen provider. The examples demonstrate completed work; a new website uses the prospect’s own approved branding, content and imagery. Page count, launch price, additional production and care plans are scoped separately. No historical client fees or performance claims are used as an offer.

Adding these catalogue records uses the existing category, comparison, guided enquiry, metadata and sitemap paths. The production source change is confined to catalogue data; shared components, styles and contact protections are unchanged.

Historical client-reference verification: formatting, local import/asset validation, zero-warning ESLint, TypeScript, 23 unit tests, the production build, stylesheet verification and 115 production HTTP checks. Dependency audit reported zero vulnerabilities. Checks confirm both category placements, actual optimized images, canonical videos with playback controls and description tracks, case-study links, sitemap inclusion and selected-client enquiry context. No external email was sent. The existing images were visually inspected; this update does not claim new browser/device rendering tests or a remote deployment.

## Template starting prices and sorting

The following starting-price schedule reflects the current catalogue. These figures are commercial starting points, not inferred past client fees or externally benchmarked market rates. They exclude applicable taxes. The Custom Business Website entry is $150+ CAD for a focused one-page build using supplied content. Social Management Partner remains $149/month+. Extra scope, ongoing care and provider costs are separate.

| Design                       | Starting price (CAD) | Price applies to                                       |
| ---------------------------- | -------------------: | ------------------------------------------------------ |
| One-page Massage Website     |                 $150 | Supplied content; one page and direct contact          |
| Nail & Esthetics Studio      |                 $399 | New personalization and launch; three pages            |
| Calgary Hot Shot             |                 $399 | New personalization and launch                         |
| Lawn Care                    |                 $499 | New personalization and launch; four demo pages        |
| Painting Company             |                 $499 | New personalization and launch                         |
| Landscape Contracting        |                 $499 | New personalization and launch; four pages             |
| Plumbing Company             |                 $699 | New personalization and launch                         |
| Crestline Painting reference |                 $399 | A similar new website with the prospect’s own content  |
| Tow-N-Go Trailers reference  |                 $899 | A similar new website with the prospect’s own content  |
| McKenzie House Massage       |               Quoted | Website scope agreed; new photo/video production extra |
| Excavation & Landscaping     |               $1,000 | New personalization and launch; seven demo pages       |

The sole editable price field is `startingPriceCad` in `src/data/website-collection.ts`. Cards, design pages, comparison, the guided proposal summary and prefilled enquiries use that value. Prices remain starting points: final scope, optional extras, ongoing care, hosting, domains and provider charges are agreed separately. The client examples keep their real-client labels and original media; their brands, reviews and client-specific assets are not sold.

Each populated business gallery has a labelled native **Sort by price** control. Low to high is the default; high to low is available. Press **Apply filters** to apply it together with business type and design level. The GET URL preserves the selection and works without JavaScript. Invalid or repeated sort parameters fall back to low to high. Unpriced future additions stay last in either order. Sorting does not mutate the catalogue; equal prices preserve their source order in both directions. Put a new entry before an existing entry at the same price when it should lead that price group. Lawn Care is immediately before Painting Company at $499. The landing page retains category browsing.

Category metadata keeps the clean category canonical URL. ItemList structured data follows the displayed order. No Product/Offer markup or ranking claims have been added. Enquiry prices come from catalogue data; arbitrary URL prices are ignored. Contact requests remain ordinary editable enquiries, not binding orders or payment submissions.

Historical pricing/sorting verification: formatting, source/asset validation, zero-warning ESLint, TypeScript, 24 unit tests, the production build, stylesheet checks and 129 production HTTP checks passed. Audit reported zero vulnerabilities. Added checks cover numeric ordering, equal and unknown prices, invalid sort parameters, combined filters, canonical URLs, structured-data order and tamper-resistant prefilled starting prices. The native controls retain the existing responsive layout; new rendered browser/device checks were not performed. No external email, remote push or Vercel deployment was performed while preparing this update.

## Compact collection opening

The landing page opens with the approved “A design you love. The details, handled.” headline, its original introduction and a short personal-service note. The large client preview selector and oversized hero spacing have been removed. The seven business-category photo strips follow immediately, with a small “Browse by business type” heading and a **How it works** anchor. Client examples remain available through their category galleries and existing detail pages.

The opening and category links remain server-rendered and work without JavaScript. The first category image loads eagerly because it now appears near the top of the page; the remaining category images load lazily. Decorative image descriptions remain empty because each link contains its category name and description. Keyboard focus, the mobile panorama layout, reduced-motion styles and forced-colour text remain available.

The three-step explanation is a compact charcoal strip after the categories, followed by the existing customization, scope, developer, care and other service details. The process row remains horizontal on desktop and stacks on a phone. Intro, category and process styles live in `collection.css`; the retired `CollectionShowcase.tsx` and `collection-showcase.css` are removed. Category galleries, prices, sorting and enquiry routes remain intact.

The production smoke checks verify the retained headline and introduction, absence of the old selector, category-before-process order, working anchor, category links, optimized image responses and loading priorities. Delivered-CSS validation covers the compact introduction, category heading and process strip. Rendered responsive review remains necessary to verify the spacing and layout; HTTP checks alone do not establish browser/device behavior.

## Painting Company / Pigment demo

The $499 CAD starting point and four page structures remain unchanged. The painting preview now has its own scoped components and stylesheet: `PaintingTemplate`, `PaintingCover`, `PaintMarks` and `painting-template.css`. The cover represents the sample demo. Plumbing, earthworks, beauty and one-page massage have their own dedicated components; the generic inline `DesignPreview` flow is retired.

Home, Services, Projects and Contact are real routes in the standalone painting demo. Visitors can try three accent colours without storage or requests. The brush draws a navigation underline once on selection, keyboard focus or pointer hover. OS reduced motion and the existing L&L motion switch disable animation while preserving a static selected underline.

Contact is explicitly a non-interactive estimate layout; selecting a service carries its name into that layout. “Make this my website” opens the existing L&L enquiry with Pigment selected. No painting enquiry is collected or delivered by this sample. The two spaces use existing illustrative collection imagery, not claims of completed painting work.

Before publishing, review all four routes and accent selection at narrow and wide widths. Check keyboard focus after changing views, motion paused/reduced and the real L&L enquiry handoff. The production smoke and delivered-CSS checks include the painting preview and matching category cover.

## Painting showcase and standalone demo

The Painting Company title, cover and View template button all open `/website-collection/pigment` from the beginning. The detail page offers the price, scope, a screenshot gallery and the enquiry handoff. Until actual screenshots are supplied, a labelled design preview occupies the gallery area. There is no duplicate embedded “Try this design here” preview; use the verified external **View live demo** action.

Configure the real public demo URL and screenshots in `src/data/painting-demo.json`. Add screenshot files under `public/images/templates/pigment/`; the README in that folder includes an example with dimensions and accessible descriptions. Empty URL configuration omits the external live-demo button until a public demo is verified. Test validation rejects unsafe URLs, invalid dimensions, duplicate paths and missing files. This is a developer-managed gallery, not a public upload form.

The standalone painting site reuses `PaintingTemplate`, its imagery and stylesheet. Maintained hosting files live in `templates/painting-demo/`. Its Home, Services, Projects and Contact are real routes; each has one main heading. The sample contact layout does not collect information. Its L&L enquiry link carries Painting Company into the existing form. Demo pages are noindex to keep this sample business separate from real contractors.

Build the separate static demo:

```powershell
node scripts/prepare-painting-demo.mjs
npm --prefix build/painting-demo ci
npm --prefix build/painting-demo run build
node scripts/check-painting-demo.mjs
```

The generator replaces only `build/painting-demo`, which is ignored by Git. Deploy its `out` folder as a separate static Vercel project, with the copied `vercel.json` headers. Do not deploy the parent L&L app as the demo. The supplied publisher verifies the actual public URL before recording it in the gallery config. It never invents a Vercel address. A successful L&L Git push still requires a Ready Vercel production deployment before the link appears on the live catalogue.

Historical September 21 verification: root formatting, import validation, lint, TypeScript, 27 unit tests, production build and 133 HTTP checks passed. The static demo exported all four pages with checked navigation, asset references, noindex and headers. Browser rendering and real device behaviour remain unverified because the supported browser could not open the local preview; repeat the release checklist on the deployed demo.

## Plumbing template — current showcase behaviour

The `structure` slug now presents the $699 CAD Plumbing Company example. Its own navy/teal, ivory and copper palette is scoped to the template; L&L stays black and gold. The dedicated catalogue cover and separate four-page static demo share the plumbing design language. The copper pipe navigation supports keyboard use, and motion respects the visitor’s reduced-motion choice and L&L motion control. Images are illustrative, not claimed completed client work.

`src/data/plumbing-demo.json` holds only the verified public demo URL and screenshot metadata. Upload captures to `public/images/templates/structure/`; see its README. Build the independent demo with `node scripts/prepare-plumbing-demo.mjs`, install and build within `build/plumbing-demo`, then run `node scripts/check-plumbing-demo.mjs` from the main repository. Deploy only its exported `out/` contents to the separate `ll-plumbing-template` Vercel project.

The latest approved showcase removes the duplicate “Try this design here” dialog from painting, plumbing and earthworks. Each detail page keeps screenshots or a labelled cover, the verified **View live demo** button, pricing, scope and its L&L enquiry handoff. Nail & Esthetics Studio and One-page Massage Website now use the same dedicated cover/screenshots and verified external live-demo flow. The Crestline example starts at $399 CAD; this is the starting price for a similar new website with the prospect’s own content.

## Excavation & Landscaping / Earthworks demo

The `earthworks` design starts at **$1,000 CAD** and has seven sample pages: **Home, Services, Projects, Materials, Process, FAQ and Contact**. Its excavation industry places it in **Construction & Trades**; the additional landscaping industry also includes it in **Home & Property**. These placements come from the canonical catalogue tags, not duplicated design records.

The example uses a dedicated earthworks design and illustrative imagery. Photographic service exploration, a materials selector and expandable FAQ answers add useful depth without adding dependencies. The two new demo pages are Materials and FAQ; the starting price remains $1,000 CAD. Sample sites, scenes and identities do not establish real client projects, completed excavation work, team credentials or business claims. A customer's finished site uses approved details and appropriately licensed imagery. The starting price covers the agreed template personalization and launch scope; additional pages, custom layout changes and features are quoted by scope and agreed before work starts, for this template and every other template. There is no blanket per-page fee.

Use `src/data/earthworks-demo.json` for the verified public demo URL and screenshot metadata. Store actual captures in `public/images/templates/earthworks/`; its README includes the entry format. The detail page displays the screenshot gallery or a labelled cover and shows **View live demo** only when a public URL is configured. No duplicate embedded try-design dialog is offered.

The maintained standalone files live in `templates/earthworks-demo/`. Build and check the seven-page export with:

```powershell
node scripts/prepare-earthworks-demo.mjs
npm --prefix build/earthworks-demo ci
npm --prefix build/earthworks-demo run build
node scripts/check-earthworks-demo.mjs
```

The generator replaces only the ignored `build/earthworks-demo` directory. Publish its exported `out/` contents, with the maintained deployment headers, to the separate **ll-earthworks-template** Vercel project. Its real routes are `/`, `/services`, `/projects`, `/materials`, `/process`, `/faq` and `/contact`. The demo is noindex and the sample contact view does not send a contractor enquiry. The L&L demo strip carries the canonical price, a return-to-details link, motion control and the real template enquiry handoff.

The Windows publisher reads Vercel's production alias and checks all seven pages publicly before saving the URL. It preserves existing screenshot entries. A protected deployment URL is not a public demo link, and a completed Git push does not by itself confirm the main-site Vercel deployment. Verification counts above describe their named historical updates; they are not evidence of checks run for this earthworks release.

## Latest premium refinement verification

The homepage repetition and main-site Process route were removed, navigation was reordered, and Earthworks expanded to seven demo pages while retaining its $1,000 CAD starting scope and verified URL. Formatting, validation across 111 source files, zero-warning ESLint, TypeScript, 32 tests, the main production build, delivered CSS checks and 142 HTTP/link checks passed. The separate seven-page Earthworks build and export checks passed, including distinct Materials and FAQ content. The dependency audit reported zero vulnerabilities. No external email was sent. Browser rendering was not verified because the preview browser blocked local access; live deployment and device review remain separate checks.

## Lawn Care — $499 template and contact scopes

Lawn Care (`lawncare`) is the four-page option for lawn mowing, edging and seasonal cleanup. It is listed under Construction & Trades and Home & Property. The trades gallery has six designs. Default sorting is low to high: Crestline reference $399, Landscape Contracting $499, Lawn Care $499, Painting Company $499, Plumbing Company $699, Excavation & Landscaping $1,000. Equal-price designs retain their source order in both sort directions, with the newest Landscape Contracting entry first in the $499 group.

The sample identity is LAWN STUDIO. Forest green, ivory and fresh green are scoped to this demo; L&L keeps its black-and-gold brand. The decorative navigation grass is cut by a small periodic mower animation, gated by the existing motion setting and prefers-reduced-motion. The four routes are `/`, `/services`, `/our-work` and `/contact`. The imagery is generated illustration for a sample business, not completed client work or before/after evidence. The reserved sample email is clearly labelled and does not send mail; the real L&L enquiry action retains the selected design.

Build with `node scripts/prepare-lawncare-demo.mjs`, install/build inside `build/lawncare-demo`, and run `node scripts/check-lawncare-demo.mjs` from the main repository. Publish only the exported `out/` contents to the separate `ll-lawncare-template` Vercel project. The static demo carries noindex and security headers. `src/data/lawncare-demo.json` starts with a null URL and no screenshots. The main site shows a labelled cover until captures are supplied; it only displays **View live demo** after a public URL is configured. The Windows publisher checks the four public routes and headers before saving the URL, preserving screenshot entries. Put real captures in `public/images/templates/lawncare/` using its README.

### Contact setup for new builds

`contactMode` in the canonical catalogue defines each offer; a query string cannot change it. New offers from $150–$499 include a contact page or section with call/email links and an appropriate external booking link. Current $699-and-up offers include a standard enquiry form to one business inbox, Resend/sending-domain configuration, validation, spam controls and an initial delivery test as launch work. These are scope definitions for future customer builds, not claims that the static demonstrations deliver contractor enquiries. Existing client case-study facts and signed scopes are not changed.

A form can be added to a direct-contact offer by quote. Advanced fields, uploads, CRM routing, automation and other integrations require their own scope at any price. Ongoing maintenance and delivery checks are optional, separately scoped care work. No unlimited support, response SLA or new monthly fee has been invented. Domain and provider fees are separate; a provider free allowance is not free setup or ongoing management. Baseline responsive design, metadata, SEO and security checks apply across all prices. Form-specific controls apply where a form exists.

Cards, details, comparison, proposal summaries and enquiry prefills share these definitions. The guided enquiry offers an optional form/workflow upgrade without adding an invented fixed price. Public starting prices do not promise exact search rankings, delivery schedules, Lighthouse scores or uninterrupted email delivery.

Resend implementation reference: [verified sending domains](https://resend.com/docs/dashboard/domains/introduction). Check the provider's current limits and costs when scoping a launch.

## Landscape Contracting — Horizon independent concept

Landscape Contracting (`horizon`) is a **$499 CAD** starting offer for four pages: Home, Services, Projects and Contact. It includes service details, a filterable project gallery, coverage information and direct contact. The construction industry places it in Construction & Trades; its additional landscaping tag also includes it in Home & Property. Responsive implementation, core SEO and security standards, metadata and launch checks are included. Additional pages, enquiry forms and custom features are quoted separately. The previous $500 one-page listing is superseded.

The design direction began with an independent L&L redesign concept for **Horizon Contracting Group**. Its three supplied screenshots remain archived under `public/images/templates/horizon/` with metadata in `original-reference.json`. The working demo uses the sample name **Landscape Studio** and illustrative images, not Horizon's identity. The catalogue's `independentConcept` field records that distinction. Do not add Horizon to client or project records.

`HorizonCover` is the maintained visual overview on the catalogue and detail page. `src/data/horizon-demo.json` holds the live URL and optional screenshots of the new demo. Its screenshot list is empty until actual captures are added; original reference screenshots are not presented as captures of the new implementation. The live URL stays null until the publisher verifies it. The detail page retains **Independent design concept**, pricing, scope and the existing L&L enquiry handoff.

Run `node scripts/prepare-horizon-demo.mjs`, install and build in `build/horizon-demo`, then run `node scripts/check-horizon-demo.mjs` from the main repository. The maintained scaffold is `templates/horizon-demo/`; generated output is replaceable. Deploy only its `out/` export to the separate `ll-landscape-template` project. The demo includes the L&L details/price/motion/enquiry strip, real page links, sample contact details, noindex and static security headers. No contractor messages are sent. Configure a buyer's real contact details during personalization; forms remain a separately scoped upgrade.

## McKenzie House restored — current decision

McKenzie House Massage is a live client reference under the unchanged `mckenzie-house` catalogue identifier. The template entry uses its real website image and actual website under **View live demo**, with a link to the client case study. `clientPreview: "image"` keeps its template page free of video players while preserving the canonical walkthrough on the case study. Bookmarks and enquiries continue to select McKenzie House. Its source branding and media are examples, not assets included with a new customer's website.

`startingPriceCad` is `null`: **Quoted after a conversation**. No replacement price was supplied, so do not infer one from Heather's original project charge. That original scope combined website development, on-site photography, filming, editing and integrating the media into the site. New website pages and features are agreed separately; new photography/video, enquiry-form setup and ongoing care are optional quoted work. Direct contact and an external booking link describe the baseline enquiry scope, not a claim of an existing Resend form on Heather's site.

The shared `contentProduction.projectExample` in `src/data/services.ts` explains the original combined project as approximately **$1,000 CAD** on the McKenzie template and Pricing pages. This is historical project context, not a guaranteed package or a numeric template price. Photography and videography are visibly offered under the existing Social & Content service, with website use cases and standalone business-content work. Enquiries use the existing `Photo / Video / Short-Form Content` contact option; the collection extra keeps its stable `photos` ID. No new contact form, email provider or fourth pillar is introduced.

The generic Evergreen Wellness demo has been withdrawn from the catalogue. Its source and captured assets are retained for reference, with `archived: true` in `src/data/wellness-demo.json`. The preparation and capture scripts stop before modifying generated output or reconnecting it. Do not run the former wellness release/publisher against this current source. The existing separate Vercel deployment is not deleted by this catalogue update.

The former Windows static-export normalization and public hash-check utilities remain available with the archived demo source. They are not used by the restored McKenzie client reference. Future reactivation requires a separately approved identity, scope and price.

## Nail & Esthetics Studio — $399 CAD

The stable `still` catalogue ID now describes **Nail & Esthetics Studio**, an approved three-page offer in Beauty & Personal Care under Health & Wellness. Its `beauty` theme uses the sample identity FORMA and dedicated Home, Services and Contact pages. The starting scope includes supplied branding, approved wording and imagery, a treatment menu, appointment lengths and rates, studio details, direct call/email contact and an external booking link. Responsive implementation, core SEO, metadata, security headers and agreed launch checks remain included.

The former generic Massage Practice preview is replaced; the existing detail URL and selection ID are retained rather than creating duplicate entries. Sample identities, service copy and illustrative photography do not imply real salon clients, completed treatments or professional credentials. A customer's website must use their approved business details. Contact and booking in the demo are explicitly sample behaviour; no salon enquiry is delivered.

Maintained hosting files live in `templates/beauty-demo/`. Run:

```powershell
node scripts/prepare-beauty-demo.mjs
npm --prefix build/beauty-demo ci
npm --prefix build/beauty-demo run build
node scripts/check-beauty-demo.mjs
```

Deploy only the normalized static export to the separate **ll-beauty-template** Vercel project with its maintained noindex and security headers. `src/data/beauty-demo.json` maps the verified live URL and any real screenshots to `still`; screenshot files belong under `public/images/templates/still/`. The detail page keeps its matching design cover when no actual captures are configured. Do not substitute the main L&L project, an unverified deployment URL or client screenshots.

## One-page Massage Website — $150 CAD entry

**One-page Massage Website** (`massage-one-page`) is an approved Essential offer in Massage & Wellness under Health & Wellness. Its dedicated sample identity is SOMA. The starting scope is one scrolling page: a welcome, up to three treatments, a short about section and direct contact or an external booking link. Branding, wording, treatment names, durations, rates, imagery and business details are supplied and approved by the customer. Section anchors are navigation within that one page; they do not imply extra included pages.

The $150 CAD offer includes personalization within that defined design, responsive layout, core SEO, metadata, security headers and agreed launch checks. The smaller price reflects its limited content and page scope, not weaker baseline protections. Additional pages, layout changes, forms, integrated booking, original photography/video, copywriting and ongoing care are quoted separately. Domains, hosting and provider fees are separate and identified before approval. No API enquiry form, unlimited revisions, treatment credentials or delivery deadline is implied.

Maintained hosting files live in `templates/massage-one-page-demo/`. Run:

```powershell
node scripts/prepare-massage-one-page-demo.mjs
npm --prefix build/massage-one-page-demo ci
npm --prefix build/massage-one-page-demo run build
node scripts/check-massage-one-page-demo.mjs
```

Deploy only its normalized static export to the separate **ll-massage-one-page** project, retaining noindex and security headers. Record the actual publicly verified URL and real screenshots in `src/data/massage-one-page-demo.json`; captures belong under `public/images/templates/massage-one-page/`. The demo’s sample contact/booking display does not send a practice enquiry; its real L&L handoff selects this $150 offer.

Both offers are included in `LL_Beauty_Massage_Templates_Release.zip`. `Run-LandL-Beauty-Massage.ps1` validates and applies the source update, publishes the two separate demos and records their verified public links. Source validation, Windows execution, browser/device rendering, actual demo access and the main L&L production deployment are separate verification steps. This documentation records intended release scope and does not itself claim that any of those checks has passed.
