# Architecture

The App Router owns page composition, metadata and the contact endpoint. Components are grouped by responsibility: layout, home, projects, contact, SEO and UI. Typed content lives in `src/data`; business configuration lives in `src/config`; reusable validation and security logic lives in `src/lib`.

## Content and presentation

- Homepage: six focused sections; detailed process, investment and inquiry form stay on dedicated routes.
- Projects: one typed dataset, grouped into three categories. Each case study has an addressable anchor, real supplied imagery when available and clearly stated scope.
- Creative software and Tate's personal portfolio are identified separately from client engagements.
- Header, footer, page introductions, project previews and final CTA are reusable components.
- Black, charcoal, gold, white and muted gray are defined as CSS tokens. Breakpoints handle narrow phones, tablets, desktop and wide displays without scaling the entire interface.

## Client boundaries

The header supplies active navigation and Escape handling. The project showcase has manually selected tabs with arrow/Home/End keyboard handling and no auto-rotation. The contact form handles submission, duplicate-click prevention, persistent failures and a timeout. Reveal only enhances already-visible server content and respects reduced motion.

## Inquiry flow

Browser form → same-origin JSON POST → origin/Fetch Metadata check → best-effort throttling → streamed byte limit → field/allowlist validation → Resend → structured response.

The email SDK is initialized only after validated input and configuration checks. Missing configuration cannot prevent the rest of the site from building. No email-provider response, credentials or submitted personal details are logged.

## SEO

Each page declares its own title, description and canonical URL. The root provides Organization and WebSite JSON-LD; services and category pages describe their visible content. The sitemap lists only current public routes. Preview deployments are noindex. There are no fabricated review aggregates or ranking guarantees.

## Retired routes

`/projects/tech-support` and `/projects/infrastructure` redirect permanently to `/projects`. The legacy `/free-tech-audit` URL remains, with Free Digital Audit branding. The public navigation labels `/packages` as Investment.
