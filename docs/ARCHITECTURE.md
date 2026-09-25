# Architecture

The App Router owns page composition, metadata and the contact endpoint. Components are grouped by responsibility: layout, home, projects, contact, SEO and UI. Typed content lives in `src/data`; business configuration lives in `src/config`; reusable validation and security logic lives in `src/lib`.

## Content and presentation

- Homepage: hero with manually selected project tabs, actual website/software previews and a final CTA. Separate service and client-name strips and the small showcase footnote were removed to reduce repetition. The homepage service explorer was removed at Tate’s request; the dedicated Services page retains the full offering. Full reviews, pricing and the inquiry form have dedicated routes. The separate L&L Process page is retired; its previous URL redirects to Services.
- Projects: one typed dataset in `src/data/projects.ts`, grouped into a shared website/software showcase and content partnerships in the directory, with studio ownership clearly labelled, with three discipline pages for detailed case studies. Each case study has an addressable anchor, real supplied imagery, a brief/work/delivery narrative and verified implementation and hosting details. Related work links connect Tow-N-Go's website to its monthly social/content partnership. The separate `src/data/project-videos.ts` mapping owns media paths, dimensions, descriptions and optional narration/captions settings; each project references it once.
- Reviews: the exact supplied Heather Knorr testimonial and Chad Muxlow Google review are stored once in `src/data/reviews.ts` and linked to the corresponding projects. The page uses WebPage and breadcrumb schema, with no aggregate rating claims.
- Pricing: public starting prices and their metadata come from `src/data/investments.ts`. These entry points do not alter any existing client agreement.
- Tate's TV is identified as studio-owned software, separately from client engagements. The retired personal portfolio is not public project content.
- Header, footer, page introductions, project previews and final CTA are reusable components.
- Black, charcoal, gold, white and muted gray are defined as CSS tokens. Breakpoints handle narrow phones, tablets, desktop and wide displays without scaling the entire interface.

## Client boundaries

The header supplies active navigation and Escape handling. The project showcase uses manually selected tabs with arrow/Home/End keyboard handling and no auto-rotation. It receives only the required fields from canonical server data. The contact form handles submission, duplicate-click prevention, persistent failures and a timeout. Reveal only enhances already-visible server content. A shared external motion preference respects the operating system, persists visitor pause choices locally and stops both CSS and Web Animations effects. Static content and ordinary links remain available without animation. No animation package, video background or third-party tracking script is loaded.

## Inquiry flow

Browser form → same-origin JSON POST → origin/Fetch Metadata check → best-effort throttling → streamed byte limit → field/allowlist validation → Resend → structured response.

The email SDK is initialized only after validated input and configuration checks. Missing configuration cannot prevent the rest of the site from building. No email-provider response, credentials or submitted personal details are logged.

## SEO

Each page declares its own title, description and canonical URL. The root provides Organization/ProfessionalService and WebSite JSON-LD; services and category pages describe their visible content. The sitemap lists only current public routes. Preview deployments are noindex. There are no fabricated review aggregates or ranking guarantees.

## Retired routes

The former main-site `/process` page redirects permanently to `/services`; it is excluded from navigation and the sitemap. The independent Earthworks demo retains its own contractor process page.

`/projects/tech-support` and `/projects/infrastructure` redirect permanently to `/projects`. The legacy `/free-tech-audit` URL remains, with Free Digital Audit branding. The public navigation labels `/packages` as Pricing. The established URL remains unchanged.

## Styles and asset provenance

`src/app/layout.tsx` imports all global stylesheets in cascade order, starting with Tailwind in `globals.css`. Keep these imports explicit so the build tracks each stylesheet directly. `collection.css`, `collection-journey.css` and `collection-previews.css` own the business category list and galleries, guided enquiry and interactive templates. Category membership is derived from industry tags in the canonical catalogue; template cards never appear on the category-selection landing page. The postbuild check verifies their compiled CSS; the smoke check also fetches the stylesheets linked by each collection route. After deploying, run `node scripts/check-collection-styles.mjs --url https://lltechsolutions.ca` and inspect the rendered page before claiming visual QA.

`base.css` owns tokens and primitives; `layout.css` owns navigation/footer; `home.css` owns shared project/CTA surfaces; `home-premium-hero.css` and `home-premium-work.css` own the scoped homepage composition; `pages.css` owns general interior layouts; `portfolio.css` and `reviews.css` own their page-specific presentation and breakpoints; `motion.css` owns effects and motion preferences; `responsive.css` owns shared content-fit breakpoints. Removed selectors are not retained as obsolete override layers.

The McKenzie House Massage and Tow-N-Go screenshots were refreshed from their public homepages on September 6, 2026. They are real page captures converted to WebP, with no generated client imagery or invented performance figures.
