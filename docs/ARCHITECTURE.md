# Architecture

L&L Tech Solutions is a Next.js App Router application organized around a small set of explicit responsibilities.

## Source ownership

- `src/app` — routes, metadata files, legal pages, error boundaries, and the contact API.
- `src/components/layout` — global header and footer.
- `src/components/home` — homepage-only presentation components.
- `src/components/contact` — the project-inquiry experience.
- `src/components/projects` — reusable portfolio and case-study presentation.
- `src/components/seo` — structured data.
- `src/components/ui` — shared interface primitives.
- `src/config` — company identity, navigation, contact details, and public configuration.
- `src/data` — service and form-option content.
- `src/lib` — metadata and project-domain helpers.
- `src/styles` — ordered design-system layers.

## Content model

The public service model is intentionally limited to:

1. Website Design & Development
2. Software Design & Development
3. Social Media Management & Content

Do not reintroduce unrelated IT, cabling, CCTV, or general repair services into the public site without a deliberate repositioning decision.

## Rendering strategy

Pages are server components by default. Client components are limited to interaction that requires browser state, such as the header menu, hero project tabs, reveal animation, and contact form.

## Security model

- Security headers are configured in `next.config.ts`.
- The contact endpoint validates origin, content type, body size, enumerated options, field lengths, and submission rate.
- Secrets remain in environment variables and are never exposed to the browser.
- Legal and security disclosure pages are linked globally.

## Release standard

Every release must pass:

```bash
npm ci
npm run validate
npm run lint
npm run typecheck
npm audit --omit=dev --audit-level=critical
npm run build
```
