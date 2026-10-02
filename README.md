# L&L Tech Solutions

The Next.js website, template demos and customer source-package tooling for L&L's Calgary studio. Keep this entire repository in one `landl-tech/` folder; run commands from that folder. The main website and standalone demos share maintained source inside it.

## Start locally

Use Node 22 or newer; CI uses Node 22.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. For enquiry delivery, copy `.env.example` to `.env.local` and follow [Contact setup](docs/CONTACT_SETUP.md). The website builds without provider credentials; unavailable delivery and checkout stay disabled until configured. Never commit credentials.

## Project map

| Folder            | Purpose                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| `src/app/`        | Main website routes, layouts, metadata and API endpoints                   |
| `src/components/` | Shared UI and the maintained template components                           |
| `src/config/`     | Business identity, navigation and site settings                            |
| `src/data/`       | Canonical content, prices, demo metadata and source-product records        |
| `src/lib/`        | Shared validation, security, checkout and media logic                      |
| `src/styles/`     | Main website and template styles                                           |
| `public/`         | Public brand assets, images and social/content video examples              |
| `templates/`      | Standalone demo app shells and sanitized customer reference editions       |
| `scripts/`        | Validation, demo preparation/export and private source-package tools       |
| `tests/`          | Catalogue, contact, checkout, packaging and demo regression checks         |
| `docs/`           | Setup guides, approved scope, asset provenance and historical verification |

`node_modules/`, `.next/` and `build/` are generated locally and ignored by Git. Demo preparation and private ZIP output belong in `build/`; edit their maintained inputs in `src/` and `templates/`. Keep private archives out of `public/`. Root configuration files and `package-lock.json` belong beside this README.

## Commands

| Command                       | Use                                                                |
| ----------------------------- | ------------------------------------------------------------------ |
| `npm run dev`                 | Start local development                                            |
| `npm run format`              | Format maintained files                                            |
| `npm run check`               | Validate imports/assets, lint, check types and run tests           |
| `npm run build`               | Build production output and verify collection styles               |
| `npm run start`               | Serve the completed production build                               |
| `npm run smoke`               | Check the production build over local HTTP                         |
| `npm run clean:check`         | Preview disposable build/cache files that can be removed           |
| `npm run clean`               | Remove those generated files after stopping the development server |
| `npm run source:build`        | Prepare private customer ZIPs from clean, committed source         |
| `npm run source:upload:check` | Validate prepared ZIPs without uploading or activating sales       |

For routine cleanup, stop the development server, run `npm run clean:check`, then `npm run clean`. Cleanup preserves source, dependencies, environment settings and all private packages under `build/source-packages/`.

Before release, run these gates in order:

```sh
npm run format:check
npm run check
npm audit --audit-level=high
npm run build
npm run smoke
```

The same gates run in [Quality CI](.github/workflows/quality.yml). Smoke checks use a separate production server on port 3198 with the Resend key removed; they cannot deliver external email. Use the [Release checklist](docs/RELEASE_CHECKLIST.md) for browser review, provider delivery and deployment checks, which a successful build does not establish.

## Where to edit content

| Content                                                 | Canonical source                                                                                     |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Business details, social links and navigation           | `src/config/site.ts`                                                                                 |
| Three services and separately scoped media production   | `src/data/services.ts`                                                                               |
| Client projects, screenshot galleries and ownership     | `src/data/projects.ts`                                                                               |
| Social/content video paths, dimensions and descriptions | `src/data/project-videos.ts`                                                                         |
| Exact supplied client testimonials                      | `src/data/reviews.ts`                                                                                |
| Main service starting prices                            | `src/data/investments.ts`                                                                            |
| Template scope, regular prices and category membership  | `src/data/website-collection.ts`                                                                     |
| Temporary template promotion and expiry                 | `src/data/template-promotion.ts`                                                                     |
| Verified standalone demo URLs and screenshots           | `src/data/*-demo.json`                                                                               |
| Code-only offers, licence and uploaded archive records  | `src/data/source-products.ts`, `src/data/source-license.ts`, `src/data/source-package-manifest.json` |
| Contact fields and request protections                  | `src/lib/contact-validation.ts`, `src/lib/contact-security.ts`                                       |
| Shared metadata, headers and redirects                  | `src/lib/metadata.ts`, `next.config.ts`                                                              |

## Guides

- **Site structure:** [Architecture](docs/ARCHITECTURE.md), [Client showcase](docs/CLIENT_SHOWCASE.md), [Portfolio media](docs/PORTFOLIO_MEDIA.md) and [Review sources](docs/REVIEW_SOURCES.md).
- **Template development:** [Website collection](docs/WEBSITE_COLLECTION.md) and [Current template pricing](docs/CURRENT_TEMPLATE_PRICING.md). The collection guide links category-specific scope and standalone demo instructions. Asset provenance stays in the relevant image/category guides under `docs/`.
- **Email and purchases:** [Contact setup](docs/CONTACT_SETUP.md), [Purchase activation](docs/PURCHASE_ACTIVATION.md), [Managed checkout](docs/MANAGED_TEMPLATE_CHECKOUT.md), [Source package preparation](docs/SOURCE_PACKAGES.md) and [Source download setup](docs/SOURCE_DOWNLOADS_SETUP.md).
- **Review and history:** [Release checklist](docs/RELEASE_CHECKLIST.md), [Historical verification](docs/VERIFICATION.md), [Changelog](CHANGELOG.md) and [Security](SECURITY.md).

There are 45 commercial source offers and 44 available package candidates. Calgary Hot Shot still needs its matching application source. A catalogue listing, prepared ZIP or successful build does not activate payment: source checkout requires a reviewed package, verified private upload and provider configuration. Managed launch checkout has separate readiness checks. Preserve the canonical licence, asset provenance and immutable archive history for paid buyers.
