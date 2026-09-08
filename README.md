# L&L Tech Solutions

A custom Next.js website for the Calgary digital studio. The current direction preserves black and gold, with charcoal section backgrounds and restrained corporate typography.

## Start locally

Use Node 22 or newer (Node 22 is used in CI).

```sh
npm ci
npm run dev
```

For inquiry delivery, copy `.env.example` to `.env.local` and configure the three Resend/email values. Do not commit credentials. Without them, the site renders and the form shows a clear delivery-unavailable response. A sender verified in Resend is required.

## Quality gates

```sh
npm run format:check
npm run check
npm audit --audit-level=high
npm run build
npm run smoke
```

`check` verifies local imports/assets, ESLint, route types/TypeScript and contact security tests. `smoke` starts a separate production server on port 3198 and checks pages, canonical URLs, internal links, anchors, headers, redirects, metadata assets and contact rejection paths. Its child server has the Resend key removed, so it cannot deliver external email.

Browser QA and actual inbox delivery are separate release checks. A passing build does not establish either.

## Where to edit

| Content                                       | Source                                                |
| --------------------------------------------- | ----------------------------------------------------- |
| Business details, social links and navigation | `src/config/site.ts`                                  |
| Three service disciplines                     | `src/data/services.ts`                                |
| Client projects and portfolio details         | `src/data/projects.ts`                                |
| Exact supplied client testimonials            | `src/data/reviews.ts`                                 |
| Public starting prices and pricing metadata   | `src/data/investments.ts`                             |
| Shared metadata                               | `src/lib/metadata.ts`                                 |
| Form options and validation                   | `src/lib/contact-validation.ts`                       |
| Request size, origin and rate handling        | `src/lib/contact-security.ts`                         |
| Colours, layout and responsive rules          | `src/styles/` (base, layout, home, pages, responsive) |
| Production browser headers and redirects      | `next.config.ts`                                      |

See `docs/ARCHITECTURE.md`, `docs/RELEASE_CHECKLIST.md`, `docs/CONTENT_PLAN.md` and `docs/VERIFICATION.md`.

## Release provenance

The original corporate cleanup started at `55b9d7bd` and was merged into production at `5304cc16`. This review carries forward the interactive studio revision `9968e5ba` and adds the client showcase, dedicated Reviews page and revised public starting prices. It is not an import of the earlier navy/white premium release ZIP. Uncommitted work on Tate's Windows computer has not been accessed or altered; the review-worktree installer preserves that separation.
