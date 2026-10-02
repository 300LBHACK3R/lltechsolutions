# Home & Property templates

Prices and contact-scope ranges in this guide are regular base prices. Apply the temporary 20% template sale and automatic expiry in [Current template pricing](CURRENT_TEMPLATE_PRICING.md).

Six new fictional businesses with separate visual identities, local illustrations and complete static demos. Existing Landscape Contracting and Earthworks entries remain in this category.

| ID                  | Business             | Brand           | Starting CAD | Pages | Contact at customer launch                                  |
| ------------------- | -------------------- | --------------- | -----------: | ----: | ----------------------------------------------------------- |
| home-cleaning       | Home cleaning        | GOOD DAY        |          150 |     1 | Direct phone/email, optional existing external booking link |
| window-care         | Window cleaning      | CLEARLINE       |          299 |     3 | Direct contact                                              |
| home-organizing     | Home organization    | ROOM TO BREATHE |          399 |     4 | Direct contact                                              |
| interior-studio     | Interior design      | FORME           |          499 |     5 | Standard protected enquiry form setup                       |
| property-management | Property management  | COMMON GROUND   |          499 |     5 | Standard protected enquiry form setup                       |
| real-estate         | Boutique real estate | ADDRESS         |          600 |     7 | Standard protected enquiry form setup                       |

All prices are starting prices in CAD before applicable taxes. Personalization and launch use supplied content within the stated scope. Original copy, photography/video production, extra pages/features and ongoing care are separately scoped. Hosting, domain and provider costs are identified in the proposal. No scores or business outcomes are guaranteed.

## Visual directions and interactions

- **GOOD DAY:** butter yellow and cobalt, heavy rounded-feeling type, a serif accent, scalloped photo composition and a gently turning sun. One-page services, about and contact.
- **CLEARLINE:** aqua/white, precise grid, split hero and a user-controlled squeegee reveal. The reveal is labelled an illustrative design effect, not a cleaning result. Home, Services, Contact.
- **ROOM TO BREATHE:** peach, olive and linen, oversized editorial serif, an offset note/photo composition and a room selector. Home, Spaces, Our approach, Contact.
- **FORME:** terracotta and cream, large wordmark, asymmetrical magazine layout, project studies and a material palette explorer. Home, Projects, Services, Studio, Contact.
- **COMMON GROUND:** deep teal, citrus, structured property UI and dedicated owner/resident paths, sample-property filters. Home, Owners, Residents, Properties, Contact.
- **ADDRESS:** plum/ivory, cinematic full-bleed photography, editorial sections, sample-home filters and expandable property details. Home, Homes, Neighbourhoods, Services, About, FAQs, Contact.

## Source and configuration

`src/data/website-collection.ts` contains the canonical `homePropertyTemplates` data and catalogue mappings. It owns names, prices, page scope, industries, services and business copy. `src/data/property-demo-content.ts` contains explicitly illustrative showroom properties and material palettes.

Shared components are in `src/components/collection/HomeProperty*.tsx`. The six hero/home compositions are separate branches, not palette swaps. CSS is scoped in `src/styles/home-property.css`. Catalogue covers are inert hero miniatures without nested interactive elements. Viewport rules target `.hp-site` so mobile browser size cannot distort the miniature preview.

Each maintained standalone shell is in `templates/<id>-demo/`. Each shell exports exactly its declared pages. Unknown/nested destinations use the demo 404. Main-site detail pages share `View live demo` wording and validated media configuration.

## Contact and property scope

$150–$399 offers use direct contact. The sample phone and email text stays inert to prevent contacting invented businesses; the L&L enquiry handoff is real. Configure the customer's actual contact details at launch.

$499–$600 offers include one standard enquiry form: one inbox, Resend, verified sending-domain configuration, spam controls and an initial delivery test at customer launch. The sample form validates locally, displays a preview confirmation and clears its fields. It has no network endpoint or storage, no named submission fields, and is disabled until JavaScript loads. Do not claim actual email delivery from these static demos.

Property names, images and room counts are illustrative. They are not available listings, client work, MLS data or factual neighbourhood guides. Static property content is included only within agreed initial scope. MLS/IDX, live feeds, accounts, resident portals, maintenance systems, applications, payments and scheduling are separately scoped. Real businesses supply and approve their claims, credentials, property facts, disclosures and asset rights.

## Screenshots and live demos

Drop actual captures into `public/images/templates/<id>/`, then add entries to `src/data/<id>-demo.json`:

```json
{
  "url": null,
  "screenshots": [
    {
      "src": "/images/templates/home-cleaning/home-desktop.webp",
      "alt": "Home cleaning demo home page on desktop",
      "caption": "Home — desktop",
      "width": 1440,
      "height": 1100
    }
  ]
}
```

Use actual image dimensions. Change the ID for each template. Files in another template's directory, unsafe paths and incomplete descriptions are rejected. Keep `url` null until the separate public deployment has been verified. Publishers preserve screenshots while connecting the live URL. No video or in-page Try This Design overlay is added.

## Local verification and publishing

For each ID:

```sh
node scripts/prepare-home-cleaning-demo.mjs
cd build/home-cleaning-demo
npm ci
npm run build
cd ../..
node scripts/check-home-cleaning-demo.mjs
```

Repeat with the corresponding ID. Preparation replaces only that generated `build/<id>-demo` output. Run the [release checklist](RELEASE_CHECKLIST.md) for the maintained source and verify each separate static deployment before connecting its public URL. Do not select the main L&L project for demo deployment.

Public aliases follow `https://ll-<id>-template.vercel.app/`. These are expected addresses, not evidence of a completed deployment. Check the exact project/team identity before upload. Verify public page/asset responses, required headers, prices, navigation, L&L enquiry destinations and hashed route-data manifests before changing the catalogue link.

## Review before promotion

Code checks do not prove visual rendering. Review 320/390 px mobile, tablet, laptop and wide desktop, keyboard navigation, menu open/close and Escape, text zoom, reduced motion, the window range control, material/room selectors and property filter empty/reset states in supported browsers. Check real enquiry delivery only after configuring a customer's actual domain and inbox. No physical-device or live-email claim is implied by a successful static export.

Generated illustrative asset provenance and prompts are included in the release's `ASSET_NOTES.md`. Optimized WebP assets live under `public/images/collection/property-*.webp`.
