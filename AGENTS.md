# L&L Tech Solutions Engineering Guide

This repository represents the same standard L&L sells to clients. Changes must preserve a focused public offer, a clean source tree, strong accessibility, responsive behaviour, and production-safe defaults.

## Product scope

The public business has exactly three service pillars:

1. Website Design & Development
2. Software Design & Development
3. Social Media Management & Content

Do not reintroduce unrelated IT support, infrastructure, cabling, CCTV, or general repair services without an explicit product decision.

## Sources of truth

- `src/config/site.ts` — company details, navigation, contact data, and global SEO terms
- `src/data/services.ts` — public service catalogue
- `src/lib/projects.ts` — project and case-study content
- `src/data/contact.ts` — contact form options and initial state
- `src/lib/metadata.ts` — route metadata helper
- `src/styles/` — ordered global design-system layers

Avoid duplicating these values inside page components.

## Architecture rules

- Keep full Services, Projects, Process, Investment, and Contact content on their dedicated routes.
- Keep the homepage focused on positioning, proof, previews, and one clear next action.
- Prefer Server Components. Add `"use client"` only when browser state or effects are required.
- Keep components small enough to describe one responsibility.
- Use `next/image` with accurate `sizes` for every substantial local image.
- Use semantic HTML, visible focus states, keyboard-operable controls, and reduced-motion support.
- External links opened in a new tab must use `rel="noopener noreferrer"`.
- Never commit secrets, `.env.local`, build output, reports, backups, generated installers, or abandoned source copies.

## Content rules

- Write specific, evidence-based copy. Do not make unsupported performance guarantees.
- Do not call the work “premium” repeatedly; the design, clarity, proof, and execution should communicate quality.
- Keep Canadian spelling and `en-CA` metadata.
- Add projects only when the title, category, image, scope, result, and live links are accurate.

## Validation

Run before every push:

```bash
npm run check
```

The validation sequence checks project structure, obsolete files, unresolved imports, unused source modules, the three-service scope, local asset references, linting, TypeScript, and the production build.
