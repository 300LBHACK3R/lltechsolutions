# Retail & Automotive templates

Prices and contact-scope ranges in this guide are regular base prices. Apply the temporary 20% template sale and automatic expiry in [Current template pricing](CURRENT_TEMPLATE_PRICING.md).

Six fictional designs extend the existing Retail & Automotive category. Existing templates, client references and live destinations remain unchanged. Current prices follow [the approved catalogue pricing](CURRENT_TEMPLATE_PRICING.md).

| ID                | Brand      | Starting CAD | Tier      | Pages | Contact at customer launch            |
| ----------------- | ---------- | -----------: | --------- | ----: | ------------------------------------- |
| mobile-detailing  | CURBSIDE   |          150 | Essential |     1 | Direct contact                        |
| flower-shop       | STEM HOUSE |          299 | Signature |     3 | Direct contact                        |
| auto-repair       | BAY 03     |          399 | Signature |     4 | Direct contact                        |
| streetwear-store  | OFF/GRID   |          499 | Premier   |     5 | Standard protected enquiry form setup |
| wheel-studio      | AXIS WORKS |          499 | Premier   |     5 | Standard protected enquiry form setup |
| jewellery-atelier | FORME      |          600 | Flagship  |     7 | Standard protected enquiry form setup |

Prices are website starting prices in CAD before applicable taxes. Sample product and service prices are illustrative content, separate from the website price. Personalization and launch include supplied, approved initial products, services, text and images within the agreed page scope. Extra pages, copywriting, original photography, videography, continuing content updates and ongoing care are separate. Hosting, domains and provider costs are identified in the proposal.

## Pages and visual direction

| Template   | Pages                                                                | Direction                                                                               |
| ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| CURBSIDE   | Home                                                                 | Ink and icy aqua service ticket with a sample detailing selector                        |
| STEM HOUSE | Home, Flowers, Visit                                                 | Aubergine, butter and yellow paper bouquet mood board                                   |
| BAY 03     | Home, Services, Workshop, Contact                                    | Steel-blue and white workshop manual with service exploration                           |
| OFF/GRID   | Home, Collection, Lookbook, Our story, Contact                       | Electric coral and monochrome oversized typeset lookbook with a local product shortlist |
| AXIS WORKS | Home, Wheels, Services, Fitment, Contact                             | Charcoal and copper wheel studio with a visual finish selector                          |
| FORME      | Home, Collections, The atelier, Bespoke, Materials, Journal, Contact | Ivory, champagne and ink gallery with an interactive exhibit and material swatches      |

The six designs use distinct layouts. Brands, items, prices, service details, locations and imagery are illustrative. There are no invented customer claims, reviews, credentials, guarantees, stock levels or certifications. Material swatches show visual tone only. Wheel selectors never establish compatibility or provide vehicle fitment advice. The actual business supplies and approves accurate product composition, provenance, service procedures, credentials, care information and content usage rights.

## Canonical architecture

`src/data/website-collection.ts` owns `retailTemplates`, names, template prices, page counts, industries, initial item/service content and offer scope. `RetailTemplate` and `RetailTemplateId` derive from that array. Each item has `name`, `description`, `price` as a string and `category`; each service has `name`, `description` and `detail`. `retailTemplate(id)` looks up a design. `retailPagePath(page)` maps canonical labels to URLs: Home becomes `/`, Our story becomes `/our-story`, and The atelier becomes `/the-atelier`.

Every entry uses the `retail` concept theme. Six dedicated industry filters accompany the existing retail and automotive filters within the same category. Additional industries preserve broad retail/automotive browsing. Default numeric low-to-high sorting and source order for equal prices remain intact. Offers participate in the existing enquiry, comparison and category flows.

`DetailingTemplate`, `FloristTemplate`, `AutoRepairTemplate`, `StreetwearTemplate`, `WheelStudioTemplate` and `JewelleryTemplate` own their layouts. `RetailShared` supplies shared presentation, `RetailInteractions` supplies navigation, and `RetailSmallInteractions`, `RetailShopInteractions` and `RetailPremiumInteractions` supply paired local interactions. `DemoEnquiryForm` supplies the local form preview. Server components remain the default. `RetailCover` supplies inert catalogue previews.

Common styles live in `retail.css`; each shell imports only its own stylesheet: `retail-detailing.css`, `retail-florist.css`, `retail-repair.css`, `retail-streetwear.css`, `retail-wheels.css` or `retail-jewellery.css`. The main site imports common cover styles only. Each preparation config copies only its own template component, shared dependencies, paired interaction module, stylesheet and illustrative hero asset.

Maintained shells live in `templates/<id>-demo/`; preparation writes disposable output under `build/<id>-demo/`. Shells statically export only their canonical routes and a noindex 404. They retain noindex metadata, static security headers and CSP, MotionControl, the canonical price and real L&L detail/enquiry links. Page metadata uses canonical page labels; component page props use lower-case route slugs. The navigation class is `retail-nav` and each main landmark carries `data-retail-demo` with its canonical ID.

## Contact and store scope

$150–$399 offers include direct contact. The customer's real phone and email links and an existing external booking or store destination can be configured at launch. Fictional contact details in these demos remain inert. “Make this my website” is a real L&L enquiry action retaining the selected design.

$499–$600 customer launch scope includes standard enquiry form setup for one inbox: Resend, verified sending-domain configuration, field validation, spam controls and an initial delivery test. Static demo forms only preview local interaction. They have no transmission endpoint, storage, named submission fields or submit button, and their fieldsets remain disabled before JavaScript loads. Use sample details. No preview sends an email or creates a booking, commission, quote, order or stock hold.

E-commerce checkout, stock or inventory systems, payment processing, booking engines, POS, customer accounts, live catalogues, vehicle fitment databases, compatibility tools and other integrations are separately scoped. These showcase prices do not include a working online store. A wheel finish choice is visual exploration, not fitment validation. A product shortlist is a local preview, not a cart. Extra forms, workflows and ongoing care remain separate. Actual email delivery is configured and verified at the customer launch.

## Images, screenshots and public links

The six `/images/collection/retail-<id>.webp` assets are generated illustrations for fictional brands, not client photographs or page screenshots. Record generation prompts and actual asset details in the release's asset notes. Each demo's screenshots stay in its own `public/images/templates/<id>/` folder. Capture only implemented pages after assets load, and record actual dimensions, useful alt text and captions in the matching showcase JSON.

Keep `src/data/<id>-demo.json` initialized as follows until production URLs and screenshots are verified:

```json
{
  "url": null,
  "screenshots": []
}
```

The showcase reader rejects screenshots in another design's folder, unsafe filenames and incomplete entries. Expected project names `ll-<id>-template` are deployment targets, not publication evidence. Use the shared external “View live demo” label only once an actual public HTTPS demo has been independently verified. Do not add generated images as screenshots, videos or an in-page Try This Design overlay.

## Validation and release

Run the main-site quality gates, then prepare, build and check each standalone demo. For example:

```sh
npm run format:check
npm run check
npm audit --audit-level=high
npm run build
npm run smoke
node scripts/prepare-mobile-detailing-demo.mjs
cd build/mobile-detailing-demo
npm ci
npm audit --audit-level=high
npm run build
cd ../..
node scripts/check-mobile-detailing-demo.mjs
```

Repeat preparation, build and check for flower-shop, auto-repair, streetwear-store, wheel-studio and jewellery-atelier. Preparation replaces only that demo's generated folder. The shared checker verifies canonical prices, contact scope, route coverage, unique page titles and headings, navigation/current state, local assets, sample disclosures, safe forms, L&L handoffs, noindex/security headers and hashed page-data files.

Review 320 px mobile, tablet, desktop and zoomed text. Exercise keyboard navigation, focus visibility, menu open/close/Escape, all local selectors and resets, form validation, MotionControl and reduced motion. Confirm no preview transmits data. Static checks do not establish browser QA or real email delivery. Release notes must identify checks actually performed and any incomplete work. Use six separate demo projects; never publish a demo to the main L&L project. A successful source push alone does not establish a Ready deployment.
