# Architecture

The App Router owns page composition, metadata and the contact endpoint. Components are grouped by responsibility: layout, home, projects, contact, SEO and UI. Typed content lives in `src/data`; business configuration lives in `src/config`; reusable validation and security logic lives in `src/lib`.

## Content and presentation

- Homepage: five focused sections—hero, linked client strip, compact service explorer, three client website previews and final CTA. Full reviews, process, investment and the inquiry form have dedicated routes.
- Projects: one typed dataset, grouped by client websites, content partnerships and studio-owned work in the directory, with three discipline pages for detailed case studies. Each case study has an addressable anchor, real supplied imagery when available and clearly stated scope. Related work links connect Tow-N-Go's website to its monthly social/content partnership.
- Reviews: the exact supplied Heather Knorr testimonial is stored once in `src/data/reviews.ts` and linked to the corresponding project. The page uses WebPage and breadcrumb schema, with no aggregate rating claims.
- Investment: public starting prices and their metadata come from `src/data/investments.ts`. These entry points do not alter any existing client agreement.
- Creative software and Tate's personal portfolio are identified separately from client engagements.
- Header, footer, page introductions, project previews and final CTA are reusable components.
- Black, charcoal, gold, white and muted gray are defined as CSS tokens. Breakpoints handle narrow phones, tablets, desktop and wide displays without scaling the entire interface.

## Client boundaries

The header supplies active navigation and Escape handling. The project showcase and compact service explorer use manually selected tabs with arrow/Home/End keyboard handling and no auto-rotation. Both receive only the required fields from canonical server data. InteractiveSurface adds a bounded, event-driven pointer tilt only for fine mouse pointers; it cancels pending frames on leave, cancellation, page visibility changes and cleanup. The contact form handles submission, duplicate-click prevention, persistent failures and a timeout. Reveal only enhances already-visible server content. A shared external motion preference respects the operating system, persists visitor pause choices locally and stops both CSS and Web Animations effects. Static content and ordinary links remain available without animation. No animation package, video background or third-party tracking script is loaded.

## Inquiry flow

Browser form → same-origin JSON POST → origin/Fetch Metadata check → best-effort throttling → streamed byte limit → field/allowlist validation → Resend → structured response.

The email SDK is initialized only after validated input and configuration checks. Missing configuration cannot prevent the rest of the site from building. No email-provider response, credentials or submitted personal details are logged.

## SEO

Each page declares its own title, description and canonical URL. The root provides Organization/ProfessionalService and WebSite JSON-LD; services and category pages describe their visible content. The sitemap lists only current public routes. Preview deployments are noindex. There are no fabricated review aggregates or ranking guarantees.

## Retired routes

`/projects/tech-support` and `/projects/infrastructure` redirect permanently to `/projects`. The legacy `/free-tech-audit` URL remains, with Free Digital Audit branding. The public navigation labels `/packages` as Investment.

## Styles and asset provenance

`base.css` owns tokens and primitives; `layout.css` owns navigation/footer; `home.css` owns the homepage composition and shared project/CTA surfaces; `pages.css` owns general interior layouts; `portfolio.css` and `reviews.css` own their page-specific presentation and breakpoints; `services-explorer.css` owns the illustrative service study; `motion.css` owns effects and motion preferences; `responsive.css` owns shared content-fit breakpoints. Removed selectors are not retained as obsolete override layers.

The McKenzie House Massage and Tow-N-Go screenshots were refreshed from their public homepages on September 6, 2026. They are real page captures converted to WebP, with no generated client imagery or invented performance figures. The service illustrations are abstract L&L design studies, not client screenshots or product promises.
