# Vercel visitor and performance reporting

The main L&L root layout includes Vercel Web Analytics and Speed Insights once,
only when Vercel builds the production environment. There are no API keys to
create or environment variables to add for these integrations. Vercel supplies
the production environment and collection routes.

## Release status — October 3, 2026

The integration passed formatting, import/asset validation, lint, TypeScript,
the test suite, the production build/CSS check and 541 HTTP/link checks. No browser
event receipt, dashboard data, remote push or deployment is confirmed.

The raw dependency audit reports
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
It affects the existing development-only chain `eslint-config-next` →
`@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces@3.0.3`.
Those five lockfile entries are unchanged by this release. The advisory lists
no patched version. The separate production dependency audit reports zero
vulnerabilities; this does not make the full audit pass. Do not use npm's
suggested forced downgrade to the Next.js 14 ESLint configuration.

Tate approved a temporary exception on October 3, 2026. `npm run audit:check`
applies it only to that verified development-only chain and advisory, until
`2026-11-01T06:00:00Z` (the start of November 1 in Alberta). CI and the installer
use the same gate. Other high/critical findings, runtime exposure, invalid audit
results and expired exceptions still block. See `DEPENDENCY_AUDIT.md`.

## Activate and verify

1. Open the Vercel project **lltechsolutions-otm7** under
   **300lbhack3rs-projects**. Confirm its domain is **lltechsolutions.ca**.
2. Open **Analytics** and choose **Enable** if offered. The **Get Started** package
   instructions mean the code integration still needs a deployment.
3. Open **Speed Insights**. Use its available basic reporting; this change does not
   purchase or require an upgrade to Speed Insights Plus.
4. Push this release to `main`, then wait for its production deployment to show
   **Ready** and confirm the live domain serves that commit. If automatic deployment
   does not start, use **Deployments > Create Deployment** with `main`.
5. Visit the public homepage and a few public pages. For verification, use a browser
   without a content blocker on this site, then check both dashboards with
   **Production** selected. Web Analytics needs visits; performance metrics need
   real browser samples. A GitHub push or successful build alone does not prove
   events reached the dashboards.

In browser developer tools, look for successful same-origin Vercel collection
script/event requests. Vercel may use `/_vercel/insights/*`,
`/_vercel/speed-insights/*` or its generated intake paths. No CSP relaxation is
needed for these same-origin routes. Dashboard data is not retroactive. Speed
Insights measures performance; it does not itself make pages faster.

## Privacy and scope

- `src/components/analytics/SiteAnalytics.tsx` contains the two official Next.js
  components. The main layout stays a Server Component.
- `src/lib/analytics-privacy.ts` removes URL query strings and fragments and drops
  events for `/source-purchase`, `/template-purchase` and `/api` routes, including
  their subpaths. Payment-session IDs and signed download URLs are excluded.
- No custom purchase events, business briefs, form values or advertising pixels
  are added. The privacy page describes the visitor/performance services.
- Local development and Vercel previews do not mount the components. Standalone
  template demos use separate layouts; sold source editions do not include this
  L&L integration.
- These dashboards are independent of Stripe, Resend and private file storage.
  Purchase activation remains documented in `docs/PURCHASE_ACTIVATION.md`.

Official setup references:

- <https://vercel.com/docs/analytics/quickstart>
- <https://vercel.com/docs/speed-insights/quickstart>
