# Transport & Logistics templates

Prices and contact-scope ranges in this guide are regular base prices. Apply the temporary 20% template sale and automatic expiry in [Current template pricing](CURRENT_TEMPLATE_PRICING.md).

Six fictional business templates extend the existing Transport & Logistics category. Tow-N-Go and Calgary Hot Shot retain their original identities, content and demo destinations. Their current starting prices are $549 and $299 CAD respectively; all offers follow [the approved catalogue pricing](CURRENT_TEMPLATE_PRICING.md).

| ID                | Brand     | Starting CAD | Pages | Contact at customer launch                                  |
| ----------------- | --------- | -----------: | ----: | ----------------------------------------------------------- |
| courier-one-page  | ZIP       |          150 |     1 | Direct phone/email; optional existing external booking link |
| moving-company    | GOOD MOVE |          299 |     3 | Direct contact                                              |
| auto-transport    | OVERLAND  |          399 |     4 | Direct contact                                              |
| equipment-rentals | YARD      |          499 |     5 | Standard protected enquiry form setup                       |
| cold-chain        | POLARLINE |          499 |     5 | Standard protected enquiry form setup                       |
| freight-logistics | MERIDIAN  |          600 |     7 | Standard protected enquiry form setup                       |

All prices are starting prices in CAD before applicable taxes. Personalization and launch use supplied content within the agreed scope. Extra pages, copywriting, photography/video production and ongoing care are separate. Hosting, domains and provider costs are identified in the proposal. A template does not establish operating credentials, service guarantees or a real business's capabilities.

## Pages and visual direction

| Template  | Pages                                                               | Design and local interaction                                                                  |
| --------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ZIP       | Home                                                                | Bright courier identity, parcel-inspired composition and concise direct-contact sections      |
| GOOD MOVE | Home, Services, Contact                                             | Warm moving brand, editorial packing imagery and a resettable packing checklist               |
| OVERLAND  | Home, Transport, How it works, Contact                              | Cinematic vehicle transport presentation and a vehicle-planning topic selector                |
| YARD      | Home, Equipment, Rental guide, About, Contact                       | Practical equipment catalogue, category filters and expandable illustrative equipment details |
| POLARLINE | Home, Services, Handling, Coverage, Contact                         | Cool technical editorial design, handling information and clearly labelled sample coverage    |
| MERIDIAN  | Home, Services, Industries, Network, Shipment guide, About, Contact | Expansive logistics design, industry content, illustrative network and shipment guidance      |

The six layouts use separate components and styles. Shared navigation, contact and footer components provide consistent accessibility and demo disclosure. No customer testimonials, customer counts, verified certifications or measured delivery results are invented.

## Canonical content and architecture

`src/data/website-collection.ts` owns `transportTemplates`, names, prices, page counts, industries, service copy and catalogue scope. `TransportTemplate` and `TransportTemplateId` derive from that data; `transportTemplate(id)` and `transportPagePath(page)` supply lookup and route paths. Catalogue entries use the `transport` concept theme and preserve numeric price sorting, including stable equal-price order.

The category provides Courier, Moving, Vehicle Transport, Equipment Rentals, Cold-chain and Freight industry filters alongside its existing industries. The new IDs participate in the existing collection enquiry, comparison and filtering journeys.

`src/components/collection/TransportTemplate.tsx` routes the six layouts to `CourierTemplate`, `MovingTemplate`, `AutoTransportTemplate`, `EquipmentRentalsTemplate`, `ColdChainTemplate` and `FreightTemplate`. Shared presentation lives in `TransportShared.tsx`; client components are limited to navigation and local interactions. `TransportCover.tsx` supplies inert catalogue previews.

Styles are explicitly imported from `transport.css`, `transport-courier.css`, `transport-moving.css`, `transport-auto.css`, `transport-equipment.css`, `transport-cold.css` and `transport-freight.css`. The main site and standalone shells both load these files. The shared preparation engine's optional `extraStyles` list copies the additional styles without changing existing demo behavior.

Maintained standalone shells live in `templates/<id>-demo/`; generated output lives in `build/<id>-demo/`. Each shell statically exports exactly the pages listed above, a noindex 404, noindex metadata and the existing static security-header policy. Each page retains the real L&L template-detail and enquiry handoffs, a canonical starting price and MotionControl. There is no demo authentication requirement.

## Honest contact and transport scope

$150–$399 offers include direct contact. Sample telephone/email text remains inert; actual customer phone, email and any existing external booking destination are supplied and configured at launch. The “Make this my website” action is a real enquiry with L&L.

$499–$600 offers include standard enquiry form setup to one inbox: Resend, sending-domain configuration, field validation, spam controls and an initial delivery test at the customer's launch. Static demo forms only preview local interaction. They have no transmission endpoint or storage, no named submission fields, no submit buttons and a disabled fieldset until JavaScript loads. Use sample details; do not enter real shipment addresses, cargo values or confidential information. Demo behavior is not evidence of email delivery.

Routes, coverage, vehicles, equipment and handling topics are illustrative static content. They do not show live availability, active shipments, confirmed routes, real-time temperatures or bookable services. Temperature-related examples do not establish product suitability, monitoring capabilities, compliance or a service guarantee; the live business supplies and approves its own handling requirements and claims.

Shipment tracking, fleet/dispatch systems, live rental inventory, live rates, booking, payments, accounts, customer portals, telematics, temperature telemetry and external APIs are separately scoped integrations. Equipment selection, suitability, operator requirements, availability and rental terms must be confirmed with the actual business. Extra forms, workflows, media and ongoing care also remain separate.

## Illustrations, screenshots and live links

The local `public/images/collection/transport-<id>.webp` assets are generated illustrations for fictional designs. They are not client photographs, available inventory, actual operating premises or screenshots. Record the actual generation prompts and resulting asset details in the release's `ASSET_NOTES.md`.

For real page captures, add files to `public/images/templates/<id>/` and entries to `src/data/<id>-demo.json`:

```json
{
  "url": null,
  "screenshots": [
    {
      "src": "/images/templates/courier-one-page/home-desktop.webp",
      "alt": "ZIP courier demo home page on desktop",
      "caption": "Home — desktop",
      "width": 1440,
      "height": 1100
    }
  ]
}
```

Use the correct template ID, actual screenshot dimensions and a useful description. Capture the implemented page after its assets load; do not replace it with an unrelated image or a generated browser mockup. Paths from another template folder, unsafe filenames and incomplete entries are rejected. Screenshots stay separate from the generated hero imagery.

Keep each `url` unset until its separate production demo is publicly verified. The shared visible label remains “View live demo”. Preserve screenshot entries when connecting a verified link. This expansion does not add a video player or in-page Try This Design overlay.

## Local checks and publishing

Run the normal main-site gates, then prepare and verify each standalone demo. For example:

```sh
npm ci
npm run format:check
npm run check
npm audit --audit-level=high
npm run build
npm run smoke
node scripts/prepare-courier-one-page-demo.mjs
cd build/courier-one-page-demo
npm ci
npm audit --audit-level=high
npm run build
cd ../..
node scripts/check-courier-one-page-demo.mjs
```

Repeat the prepare/build/check steps for the other five IDs. Preparation replaces only the selected generated build directory. The shared static checker verifies canonical price and contact scope, route count, one main/h1, distinct titles/headings, complete navigation, local assets, sample disclosures, safe forms, real L&L handoffs, noindex/header policy and hashed page-data files.

Use the maintained preparation/check scripts above and the [release checklist](RELEASE_CHECKLIST.md). Before uploading each static export, verify the separate Vercel project/team, then check its stable public alias before recording the matching JSON URL. Never select the main L&L project as a demo destination. Earlier bundle-specific Windows release scripts are not part of this repository workflow.

Expected aliases follow `https://ll-<id>-template.vercel.app/`. These are configuration targets, not evidence of completed deployment. A successful source push does not establish that the main-site Vercel deployment is Ready. Final release evidence belongs in `VERIFICATION.md` and must describe checks actually performed.

## Browser review

Review 320/390 px mobile, tablet, laptop and wide desktop; text zoom; keyboard focus; navigation opening, closing and Escape; reduced motion and MotionControl; all page links and L&L handoffs. Exercise packing checklist reset, vehicle planning selection, equipment filters/details and any handling/network/industry controls. Verify form preview success and validation without network transmission. Inspect empty/filter states where provided.

Static checks do not establish browser rendering, physical-device compatibility, Lighthouse scores, live email delivery or the behavior of a future customer integration. Configure and test the customer's real domain/inbox separately at launch.
