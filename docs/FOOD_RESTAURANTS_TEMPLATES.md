# Food & Restaurants templates

Prices and contact-scope ranges in this guide are regular base prices. Apply the temporary 20% template sale and automatic expiry in [Current template pricing](CURRENT_TEMPLATE_PRICING.md).

Six fictional business templates extend the existing Food & Restaurants category. Existing templates, client references and live destinations remain unchanged. Current prices follow [the approved catalogue pricing](CURRENT_TEMPLATE_PRICING.md).

| ID                 | Brand          | Starting CAD | Pages | Contact at customer launch            |
| ------------------ | -------------- | -----------: | ----: | ------------------------------------- |
| food-truck         | SIDE STREET    |          150 |     1 | Direct contact                        |
| neighbourhood-cafe | SUNDAY CLUB    |          299 |     3 | Direct contact                        |
| artisan-bakery     | BUTTER & CRUMB |          399 |     4 | Direct contact                        |
| pizzeria           | SLICE SOCIAL   |          499 |     5 | Standard protected enquiry form setup |
| catering-events    | TABLE & FIELD  |          499 |     5 | Standard protected enquiry form setup |
| fine-dining        | VESPER         |          600 |     7 | Standard protected enquiry form setup |

All prices are starting prices in CAD before applicable taxes. Personalization and launch use supplied content within the agreed scope. Extra pages, copywriting, photography, videography and ongoing care are separate. Hosting, domains and provider costs are identified in the proposal. A template does not establish a real business, food-service credentials, dietary suitability or available tables.

## Pages and visual direction

| Template       | Pages                                                                 | Direction                                                                                    |
| -------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| SIDE STREET    | Home                                                                  | Cobalt-and-acid-yellow street-food identity, oversized type and a concise menu               |
| SUNDAY CLUB    | Home, Menu, Visit                                                     | Warm café editorial, generous imagery and a filterable sample menu                           |
| BUTTER & CRUMB | Home, Bakes, Our kitchen, Visit                                       | Butter-cream and berry-red bakery identity, striped awning and editorial bake ledger         |
| SLICE SOCIAL   | Home, Menu, Our place, Group tables, Contact                          | Lively red-and-cobalt pizzeria, interactive pizza wheel, menu categories and group enquiries |
| TABLE & FIELD  | Home, Menus, Events, Our approach, Contact                            | Olive-and-parchment catering editorial with sample menus and event planning                  |
| VESPER         | Home, The menu, The room, Private dining, Our story, Journal, Contact | Dark restaurant editorial, considered menu presentation and seven-page storytelling          |

These are six separate layouts, with shared navigation and contact conventions. No fake testimonials, awards, customer counts, kitchen credentials, dietary guarantees or real-world operating claims are used. Journal and menu content are illustrative initial content, not a live publishing or ordering system.

## Canonical content and architecture

`src/data/website-collection.ts` owns `foodTemplates`, all names, template prices, page counts, industries, initial menu examples and scope. `FoodTemplate` and `FoodTemplateId` derive from that array. `foodTemplate(id)` supplies lookup and `foodPagePath(page)` converts page names into routes; Home becomes `/`, and Our kitchen becomes `/our-kitchen`.

Every food entry uses the `food` concept theme. The category includes six dedicated filters alongside the existing Food & Restaurants industry. Numeric low-to-high sorting and source order for equal prices remain intact. Food offers participate in the existing enquiry, comparison and filtering flows.

`FoodTruckTemplate.tsx`, `CafeTemplate.tsx`, `BakeryTemplate.tsx`, `PizzeriaTemplate.tsx`, `CateringTemplate.tsx` and `FineDiningTemplate.tsx` own their layouts. `FoodShared.tsx` provides shared presentation and `FoodInteractions.tsx` provides navigation. Client components are limited to actual interaction and progressive motion. `FoodCover.tsx` provides inert catalogue previews.

Shared styles live in `food.css`. Per-template styles are `food-truck.css`, `food-cafe.css`, `food-bakery.css`, `food-pizzeria.css`, `food-catering.css` and `food-dining.css`. The main site imports only food.css for catalogue covers; theme CSS is isolated to the corresponding standalone demo. A standalone shell imports only the common food styles and its own template stylesheet, directly imports its own template component and copies only its required component dependencies and its own hero asset.

Maintained standalone shells live in `templates/<id>-demo/`; preparation writes disposable output to `build/<id>-demo/`. Each shell statically exports only its listed pages and a noindex 404. All routes have noindex metadata, the existing static security-header policy, MotionControl, a canonical template price and real L&L detail/enquiry handoffs. The sample brand contact details stay inert.

## Menu and enquiry scope

The initial website includes the customer's supplied and approved menu as static content within the agreed page scope. The business supplies menu names, descriptions, prices, tax wording, ingredient and allergen information, dietary descriptions, opening details and content rights. Sample item prices are illustrative CAD menu prices, separate from the L&L template purchase price. Sample hours, locations, dishes and event formats are not real service availability. Guests must confirm ingredients, allergens, dietary needs and current availability directly with the actual business.

$150–$399 offers include direct contact. Actual customer phone/email details and an existing external booking or ordering destination can be configured at launch. The demo's “Make this my website” action is a real L&L enquiry, with the selected design preserved.

$499–$600 customer launch scope includes standard enquiry form setup for one inbox: Resend, sending-domain configuration, field validation, spam controls and an initial delivery test. Static demo forms only preview local interaction. They have no transmission endpoint or storage, no named submission fields, no submit button and a disabled fieldset until JavaScript loads. Use sample details. No preview sends an email, places an order, holds a table or confirms an event.

Online ordering, payments, reservations, POS, delivery-platform integrations, live menu feeds, accounts and connected workflows are separate scopes. An enquiry form is not a reservation engine. Extra forms, copywriting, original media, continuing menu updates and ongoing care are separately scoped. Real email delivery must be configured and verified at the customer launch.

## Images, screenshots and public links

The six local `/images/collection/food-<id>.webp` assets are generated illustrative imagery for fictional designs. They are not real client food photographs, premises or screenshots. Generation prompts and actual asset details belong in the release's `ASSET_NOTES.md`.

Keep `src/data/<id>-demo.json` at the following initial state until actual evidence exists:

```json
{
  "url": null,
  "screenshots": []
}
```

Capture screenshots only from the implemented demo after assets load. Save each capture in `public/images/templates/<id>/` and add its real dimensions, useful alt text and caption to the matching JSON. The catalogue reader rejects another template's screenshot folder, unsafe filenames and incomplete entries. Generated illustrations must never be entered as page screenshots.

Keep every public URL unset until its separate production demo is independently verified. Expected aliases follow `https://ll-<id>-template.vercel.app/`; these are deployment targets, not evidence of publication. The shared external action label is “View live demo”. This expansion adds no video player and no in-page Try This Design overlay.

## Validation and release

Run the normal main-site gates, then prepare, build and check all six standalone exports. For example:

```sh
npm run format:check
npm run check
npm audit --audit-level=high
npm run build
npm run smoke
node scripts/prepare-food-truck-demo.mjs
cd build/food-truck-demo
npm ci
npm audit --audit-level=high
npm run build
cd ../..
node scripts/check-food-truck-demo.mjs
```

Repeat the prepare/build/check steps for neighbourhood-cafe, artisan-bakery, pizzeria, catering-events and fine-dining. Preparation replaces only that demo's generated directory. The checker verifies the canonical price/contact scope, listed routes, unique page titles and headings, one main/h1, navigation/current-page state, local assets, sample disclosures, safe forms, real L&L handoffs, noindex/security headers and hashed page-data files.

Review mobile, tablet and desktop layouts; 320 px width; text zoom; keyboard focus; menu open/close/Escape; reduced motion and MotionControl; all routes and L&L links. Exercise every menu filter, selector, reset and form preview. Confirm visible validation and success without a network transmission, and inspect empty states where supplied. Static checks do not establish browser rendering or email delivery.

Release verification must state checks actually performed and any incomplete work. A successful source push is not proof that a Vercel deployment is Ready. Public deployment should use six separate demo projects and never the main L&L project as a demo destination.
