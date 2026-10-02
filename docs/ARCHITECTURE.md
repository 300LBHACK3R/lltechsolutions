# Architecture

The repository root contains one maintained project. The Next.js App Router in `src/app/` owns main-site pages, metadata and API endpoints. Components are grouped by responsibility, canonical content lives in `src/data/`, business configuration lives in `src/config/`, and reusable validation/security logic lives in `src/lib/`. See the [README](../README.md) for the folder map, commands and editing entrypoints.

## Content and presentation

- The homepage has a visual studio hero with simultaneously visible website and content previews, three links into templates/services/client work, a two-column project gallery (one column on phones) and a short CTA. Previews link directly to canonical case studies.
- Each project has one `/projects/<project-id>` case study sourced from `src/data/projects.ts`. The directory and three discipline routes are compact indexes; category cards preserve their original IDs for old bookmarks. Website/software case studies use screenshot galleries. Only the two social/content case studies render videos from `src/data/project-videos.ts`. Tow-N-Go's monthly partnership stays distinct from its website, and Tate's TV stays labelled as studio-owned software.
- Services has exactly three disciplines with separately scoped photography/videography supporting website and social/content work. Canonical service content lives in `src/data/services.ts`.
- Reviews use the supplied quotations in `src/data/reviews.ts`, linked to their projects, without aggregate rating claims. Main service pricing reads `src/data/investments.ts`.
- The Website Templates landing page contains a compact introduction and category photo strips. Category, detail, comparison and enquiry views read one catalogue in `src/data/website-collection.ts`; promotion rules live in `src/data/template-promotion.ts`. [Current template pricing](CURRENT_TEMPLATE_PRICING.md) supersedes dated release prices.
- Header, footer, page introductions, galleries and CTA surfaces are shared. Black, charcoal, gold, white and muted gray are CSS tokens; responsive rules adapt content rather than scaling the whole interface.

## Client boundaries

Server components are the default. Client components handle navigation, image selection, forms, local comparison/brief tools and progressive motion. The homepage hero does not use a carousel or video download. Shared motion preferences respect the operating system, persist the visitor's pause choice and stop CSS and Web Animations effects. Links and static content remain available without animation. Standalone demos retain their own visual identity.

## Enquiries and purchases

The contact flow is a same-origin JSON request, origin/Fetch Metadata check, best-effort throttling, streamed byte limit, field/allowlist validation and Resend delivery. Provider initialization happens after validation and configuration checks, so absent credentials cannot block the website build. Credentials and submitted personal details are not logged. See [Contact setup](CONTACT_SETUP.md).

Managed template purchases and source downloads use separate flags, webhooks and readiness checks. Managed orders retain a server-signed scope/price snapshot and independent owner/buyer notification markers. Source downloads require a verified paid order and an immutable private archive; a return-page URL alone grants neither delivery nor download access. Source offers live in `src/data/source-products.ts`, the canonical licence in `src/data/source-license.ts`, and verified private upload records in `src/data/source-package-manifest.json`. An empty manifest intentionally keeps source checkout unavailable. See [Purchase activation](PURCHASE_ACTIVATION.md) for provider setup and the detailed implementation guides.

## Standalone demos and customer packages

`templates/<name>-demo/` contains dedicated app shells. Maintained shared components, content and styles remain in `src/`; the corresponding `scripts/prepare-*-demo.mjs` creates an isolated project under ignored `build/`. The matching check script verifies its static export. Public demo URLs are recorded in `src/data/*-demo.json` only after verification. A local export does not establish a public deployment.

`templates/source-editions/` contains sanitized customer reference editions. The source-package builder selects and audits each package's dependencies and assets, adds the canonical licence and provenance notices, and writes private ZIPs under `build/source-packages/`. There are 45 commercial source offers but 44 available package candidates; Calgary Hot Shot remains blocked until its actual matching source is supplied and reviewed. See [Source packages](SOURCE_PACKAGES.md).

## Metadata and routes

Each public page declares its title, description and canonical URL. The root provides Organization/ProfessionalService and WebSite JSON-LD; category metadata describes visible content. The sitemap includes public routes, while utility/purchase pages and preview deployments are noindex. There are no fabricated ratings or ranking guarantees.

Redirects in `next.config.ts` preserve retired paths: `/process` goes to `/services`; `/projects/tech-support` and `/projects/infrastructure` go to `/projects`; the former retail-hospitality category goes to retail-automotive. `/free-tech-audit` keeps its established URL with Free Digital Audit branding, and `/packages` is labelled Pricing. The independent Earthworks demo retains its own contractor process page.

## Styles and asset provenance

`src/app/layout.tsx` imports global styles explicitly in cascade order, beginning with Tailwind in `globals.css`. Base/layout styles own shared tokens and navigation; page, catalogue and template styles own their respective surfaces. Homepage styles are scoped in `home-premium-hero.css` and `home-premium-work.css`; the shared main-site circuit artwork uses `signals.css`. Standalone demos do not inherit that artwork.

The postbuild check verifies compiled collection CSS, and smoke checks fetch the stylesheets linked by collection routes. After deployment, `node scripts/check-collection-styles.mjs --url https://lltechsolutions.ca` checks delivered styles; rendered review is separate.

Real project captures and their sources are documented in [Client showcase](CLIENT_SHOWCASE.md) and [Portfolio media](PORTFOLIO_MEDIA.md). Generated template illustrations have separate provenance records. Customer packages admit only their audited reusable assets; client identities, original media and private files are excluded.
