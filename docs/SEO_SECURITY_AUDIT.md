# SEO and Security Audit

## Search implementation

- Central metadata helper for every public route.
- Self-referencing canonical URLs and `en-CA` language alternates.
- Descriptive titles and summaries aligned to the three public service pillars.
- Open Graph and Twitter card images with 1200 × 630 social artwork.
- Dynamic sitemap and robots routes.
- Web manifest and complete icon set.
- Organization, ProfessionalService, WebSite, Service, ItemList, CollectionPage, and CreativeWork structured data.
- Optimized local WebP project imagery with responsive `sizes` declarations.
- Accessible semantic headings, link language, and navigation labels.

## Browser and transport controls

- HTTPS upgrade and HSTS in production.
- Content Security Policy with default-deny framing and object restrictions.
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY` and `frame-ancestors 'none'`.
- Strict-origin referrer policy.
- Restrictive Permissions Policy.
- Same-origin opener and resource policies.
- API routes marked no-index and no-store.

## Inquiry endpoint controls

- JSON-only requests.
- Origin and Fetch Metadata checks.
- Header and actual-byte body-size limits.
- Field normalization and explicit maximum lengths.
- Enumerated service and timeline validation.
- Email and website validation.
- Honeypot filtering.
- Best-effort request throttling.
- Request IDs and non-sensitive operational logging.
- Environment-based Resend credentials.

## Release controls

- Pinned production dependencies.
- Reproducible npm lockfile.
- Repository structure validator.
- ESLint with zero-warning policy.
- Strict TypeScript validation.
- Critical production-dependency audit.
- Production build in GitHub Actions.
- Monthly Dependabot checks for npm and GitHub Actions.

## Deployment requirements

The deployment platform must define:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- optional `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

Security headers and form delivery should be verified against the deployed domain after every platform or framework change.
