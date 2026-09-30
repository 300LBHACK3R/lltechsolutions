# Legal & Professional collection

Six fictional business demonstrations extend the existing L&L catalogue. The existing navigation, homepage, clients, prices and wellness demos are preserved. Default gallery order is numeric price ascending; the two $699 entries retain source order.

| Offer / ID                                             | CAD starting price | Pages                                                    | Contact scope               | Design direction                                                                             |
| ------------------------------------------------------ | -----------------: | -------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| Independent Consultant / `consultant-one-page`         |               $150 | One page: services, introduction, about and contact      | Direct                      | Lilac and ink; editorial typography, orbit motif, expandable service notes                   |
| Bookkeeping Studio / `bookkeeping`                     |               $399 | Home, Services, Contact                                  | Direct                      | Sage, cream and coral; paper composition, interactive month-end checklist                    |
| Corporate Accounting / `accounting`                    |               $499 | Home, Services, About, Contact                           | Direct                      | Blue, white and slate; panoramic office image, structured service explorer                   |
| Creative Business Consultancy / `creative-consultancy` |               $699 | Home, Services, Approach, Contact                        | Standard enquiry form setup | Acid yellow, charcoal and lilac; oversized type, playful composition, priority explorer      |
| Boutique Law Firm / `boutique-law`                     |               $699 | Home, Practice, Firm, FAQs, Contact                      | Standard enquiry form setup | Oxblood, parchment and bronze; arched architecture and serif typography                      |
| Full-service Law Firm / `corporate-law`                |               $999 | Home, Practice, Firm, Approach, Resources, FAQs, Contact | Standard enquiry form setup | Midnight blue and copper; architectural hero, practice explorer, filterable resource library |

Prices are before applicable taxes and cover supplied content, personalization and launch within the agreed scope. Domains, provider charges, extra pages, integrations, new writing, photography/video and ongoing care are separate. The $699+ form scope follows the existing catalogue: one business inbox, Resend and sending-domain configuration, validation, spam controls and an initial delivery check at customer launch. Demos themselves never deliver or store enquiries. Direct-contact examples keep fictional addresses inert; real customer contact links are connected at launch.

## Maintained source

- `src/data/website-collection.ts`: canonical professional content, offer scope, IDs, prices and page lists. `professionalTemplates` feeds the catalogue and demos.
- `src/components/collection/ProfessionalHero.tsx`: six different hero compositions, reused in noninteractive covers so preview designs match the demos.
- `ProfessionalTemplate.tsx`: complete inner pages and the shared contact/disclosure structure.
- `ProfessionalInteractions.tsx`: progressively enhanced mobile navigation, service selection, bookkeeping checklist and resource filtering.
- `ProfessionalCover.tsx`: decorative previews with no nested buttons or links.
- `src/styles/professional-templates.css`: scoped themes, responsive layouts, reduced motion, keyboard focus and forced-colour support. Demo viewport rules are scoped to `.professional-site` so they cannot enlarge miniature catalogue previews.
- `templates/<id>-demo`: six separate static Next.js app shells. `scripts/prepare-<id>-demo.mjs` copies maintained source to disposable `build/<id>-demo`; changes belong in source, not generated build folders.

## Live links and screenshots

Each `src/data/<id>-demo.json` begins with `url: null` and `screenshots: []`. Never guess that an intended production alias is assigned or public. The publisher verifies actual pages, images, styles, scripts, security headers, price, enquiry destinations and page-data hashes before connecting the alias. Main-site actions consistently use **View live demo**.

To add actual screenshots, place them in `public/images/templates/<id>/` and add entries to that template's JSON, for example:

```json
{
  "src": "/images/templates/boutique-law/home.webp",
  "alt": "Vale & Rowe demo home page showing the arched reception photograph",
  "caption": "Home page",
  "width": 1440,
  "height": 1000
}
```

Use real image dimensions and captures from that exact demo. The existing screenshot gallery handles selection and larger views. Keep an already verified `url` when adding screenshots. If screenshots are absent, the matching code-rendered design cover remains available; no pretend screenshot or video is inserted.

## Demo content boundaries

The brands and premises are illustrative. There are no invented lawyers, designations, professional registrations, client testimonials, case outcomes or financial results. Legal and accounting clients supply and approve their real service descriptions, qualifications and practice disclosures. Sample resource articles explain the enquiry experience, not legal advice. Demonstration forms explicitly discourage confidential, financial, legal and health information. They are disabled before hydration and have no transmission endpoint or named submission fields.

## Validation and deployment

Run `npm run format:check`, `npm run check`, `npm audit --audit-level=high`, `npm run build` and `npm run smoke` for the main site. For each ID:

```sh
node scripts/prepare-consultant-one-page-demo.mjs
cd build/consultant-one-page-demo
npm ci
npm run build
cd ../..
node scripts/check-consultant-one-page-demo.mjs
```

Replace the ID for each demo. Publish only the exported `out/` to its separate `ll-<id>-template` Vercel project, with Framework Other and no remote build/install command. The release publisher supplies and checks that configuration; it rejects the main L&L Vercel project. After a successful deployment it verifies the stable public alias, not a protected per-deployment URL. Never disable deployment protection globally to make a catalogue button work.

The Windows release runner installs the checked source, then publishes and verifies the six demos sequentially. A stopped publisher can be resumed individually; completed source pushes and deployments remain intact. `-DemoUrl` resumes using its verified public alias and current remote manifest; it does not attest to an earlier local build. There is no reset, forced update, stash or unrelated-file cleanup.

Automated static and HTTP checks do not replace browser testing. Before advertising, inspect desktop and mobile in Chrome, Firefox and Safari: navigation open/close/Escape, service selectors, checklist, FAQs, resource filters, contact preview, motion controls, 200% zoom and keyboard focus. Check real iOS/Android devices when available. Browser rendering and email delivery are not claimed by these checks.

## Illustration provenance

Two original illustrative images were generated with the built-in image-generation tool and converted to optimized WebP. They are not photographs of clients or actual practice premises.

- `public/images/collection/professional-law-office.webp`: architectural editorial photograph of a fictional quiet law reception, travertine arch, walnut panelling, oxblood bench, bronze details and afternoon light; asymmetric wide composition; no people, lettering, logos, gavel or scales.
- `public/images/collection/professional-boardroom.webp`: architectural editorial photograph of a fictional bright Canadian meeting space, pale oak table, blue-grey chairs, windows, anonymous glass towers and natural light; no people, logos, words or readable screen content.

Both assets are 1536 × 1024 pixels. Full generation prompts are retained in the release's asset notes.
