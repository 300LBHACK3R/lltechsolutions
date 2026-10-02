# Client PageSpeed screenshots — October 1, 2026

The client case studies for Tow-N-Go and McKenzie House display the four original,
user-supplied Google PageSpeed Insights screenshots. They describe homepage lab
tests from October 1, 2026, not current guarantees, site-wide scores, search
rankings, real-user measurements or security certification. All four reports show
no available real-user field data. No new audit was run for this change.

| Case study     | Device  | Performance | Accessibility | Best Practices | SEO |
| -------------- | ------- | ----------: | ------------: | -------------: | --: |
| Tow-N-Go       | Mobile  |          91 |            96 |            100 | 100 |
| Tow-N-Go       | Desktop |          93 |            96 |            100 | 100 |
| McKenzie House | Mobile  |          92 |           100 |            100 | 100 |
| McKenzie House | Desktop |         100 |           100 |             88 | 100 |

The McKenzie desktop Best Practices score remains **88**. Improving that result
requires the failing audit details and a fresh test of the actual client site.
Never change an existing report to show a result it did not measure.

Canonical report records are in `src/data/projects.ts`. The shared server component
uses native disclosures, displays all four scores and links to full-size original
screenshots. No new JavaScript interaction, lightbox or remote reporting API is
needed. The other case studies, homepage and template catalogue remain unchanged.

Original PNGs were copied byte-for-byte. SHA-256 provenance:

| Public asset                                                       | SHA-256                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `/images/projects/tow-n-go/pagespeed-mobile-2026-10-01.png`        | `df265841570a0bd3dd19ddf47fc3b78a91dba114edb57fc7171ee10e50c424cd` |
| `/images/projects/tow-n-go/pagespeed-desktop-2026-10-01.png`       | `6d8811a7a4d382a85ad33e06a26546be88bb89ab656586bcb7e2e57853868fc5` |
| `/images/projects/mckenzie-house/pagespeed-mobile-2026-10-01.png`  | `40f350fc45fadc0369a71a658aff17e2561582d474b09295765cea64fbde2f1d` |
| `/images/projects/mckenzie-house/pagespeed-desktop-2026-10-01.png` | `3bdaa2a39e4c7639fb02e1898599515d89f596daff2997021dda6c355db1b713` |

Replacing a snapshot requires a new, unmodified report, matching date, device,
tested URL and scores. Keep the image and canonical record consistent.

## Verification for this change

Formatting, import/asset validation, zero-warning lint, TypeScript, all 79 tests,
the dependency audit (zero reported vulnerabilities), the production build and
303 production HTTP/link/anchor checks passed. The HTTP checks verify each
report's device, scores, date and original PNG bytes, and keep reports off
unrelated case studies. All four stored files match their uploaded originals.

Rendered browser/device review and Windows execution have not been completed in
this environment. Native disclosure controls and responsive CSS are implemented;
that does not establish universal browser compatibility. No external email was
sent and no new live PageSpeed audit, GitHub push or Vercel deployment was
performed as part of these preparation checks.
