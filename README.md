# L&L Tech Solutions

Production website for **L&L Tech Solutions**, a Calgary-based digital studio focused on three connected disciplines:

1. **Website Design & Development**
2. **Software Design & Development**
3. **Social Media Management & Content**

The site is intentionally structured as a focused studio homepage with dedicated Services, Projects, Process, Investment, Contact, Audit, Privacy, Terms, and Security routes.


## Public service and pricing model

The public offer is intentionally limited to exactly three services:

- **Website Design & Development** — launch sites from **$499 CAD**
- **Software Design & Development** — focused pilots from **$1,500 CAD**
- **Social Media Management** — monthly management from **$299 CAD/month**

More complex work is scoped before commitment. Third-party software, hosting, domains, advertising spend, and paid media are separate unless explicitly included in the written scope.

## Local editor history

VS Code Local History (`.history/`) is developer-machine state, not application
source. It is ignored by Git and ESLint and should never be committed or used
as a release input. The automated release script preserves a copy in its
Desktop backup before removing it from the release working tree.

## Technology

- Next.js 16.3.3 App Router
- React 19.2.8
- TypeScript
- Tailwind CSS 4
- Resend for project-inquiry delivery
- Vercel deployment
- GitHub Actions quality gates

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality gates

```bash
npm run validate
npm run lint
npm run typecheck
npm run build
```

Run the complete sequence with:

```bash
npm run check
```

`npm run validate` enforces the approved source structure, exact three-service scope, asset references, import resolution, and removal of obsolete modules before linting or building.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Production | Sends project inquiries through Resend |
| `CONTACT_TO_EMAIL` | Production | Destination for project inquiries |
| `CONTACT_FROM_EMAIL` | Production | Verified sender identity |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console verification |

Use `.env.example` as the template. Never commit `.env.local` or production credentials.

## Source structure

```text
src/
  app/          App Router pages, metadata files, legal pages, and API handlers
  components/
    contact/    Project inquiry experience
    home/       Homepage-only sections and interactive showcase
    layout/     Shared header and footer
    legal/      Legal-document presentation
    projects/   Case-study rendering
    seo/        Structured data
    ui/         Shared interface primitives
  config/       Business, navigation, and contact configuration
  data/         Service and form data
  lib/          Metadata and project helpers
  styles/       Ordered design-system layers
scripts/        Repository consistency checks
public/
  brand/        Optimized brand assets
  images/       Optimized project imagery
```

## Public routes

- `/` — focused studio homepage
- `/services` — complete capabilities
- `/projects` — portfolio categories and selected live work
- `/projects/web-builds`
- `/projects/software-development`
- `/projects/social-media-management`
- `/process`
- `/packages`
- `/contact`
- `/free-tech-audit`
- `/privacy`
- `/terms`
- `/security`

## Production safeguards

- Canonical metadata, Open Graph, Twitter cards, robots, sitemap, manifest, and JSON-LD
- Content Security Policy and restrictive browser headers
- HTTPS enforcement in production
- Accessible navigation, skip link, focus management, error and 404 routes
- Responsive image delivery for mobile through large-format displays
- Contact origin checks, payload limits, validation, honeypot filtering, and best-effort abuse throttling
- Automated structure validation, linting, TypeScript, dependency audit, and production build on GitHub Actions

## Deployment

`main` is production. Feature branches use the `revamp/**` convention. Changes should reach `main` only after the Quality workflow succeeds.

See [AGENTS.md](AGENTS.md) for architecture and content rules and [SECURITY.md](SECURITY.md) for responsible disclosure.
