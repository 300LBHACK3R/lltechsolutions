# Customer source downloads

`scripts/build-source-packages.mjs` creates self-contained, editable source ZIPs for the 40 fictional standalone website templates. It does not change the public demos, upload files or make checkout available.

Client references (Crestline, Tow-N-Go, McKenzie House and Calgary Hot Shot) and the independent Horizon reference are excluded. The builder also rejects any catalogue record marked as a client or independent example even if its ID is later added accidentally.

## Build

Run from the maintained repository with its locked dependencies installed and all reviewed source changes committed. The CLI refuses tracked modifications or untracked files before packaging, and checks the working tree and HEAD again before publishing its local manifest:

```sh
node --experimental-strip-types scripts/build-source-packages.mjs
```

For one package, add `--design pigment`. The flag can repeat. Optional `--unpack` writes review copies to `build/source-packages/unpacked/<designId>/`. The output must stay within the ignored repository `build/` directory. Never place customer archives in `public/` or commit them.

Output:

```text
build/source-packages/manifest.json
build/source-packages/<designId>/<archive-sha256>/<designId>.zip
```

The manifest is `{ schemaVersion: 1, packages: [...] }`. Each entry contains `designId`, `version`, `filename`, `sha256`, `bytes`, `sourceCommit`, `sourceDirty`, `key` and `assetNote`. `version` hashes the exact sanitized package sources. `sha256` hashes the final ZIP. Object keys are immutable: `source-packages/<designId>/<sha256>/<designId>.zip`. `sourceCommit` records the verified clean Git HEAD; production CLI packages explicitly record `sourceDirty: false` both in the manifest and inside the archive. The direct assembly helper defaults to `sourceDirty: true` for tests or review and those packages must never be uploaded. The separate upload gate rejects missing or non-false provenance, requires a clean source tree and matching HEAD, and rechecks archive metadata, size and hash. A previously generated dirty/review archive does not become publishable merely because later edits were reverted. Neither a local manifest nor the presence of an archive means the file has been uploaded.

## What is included

- An isolated static Next.js app with all selected routes and its required source dependencies.
- A trimmed package manifest and lockfile containing Next.js, React, TypeScript and the necessary styling/build dependencies. Studio Stripe, AWS, Resend and unrelated lint dependencies are excluded.
- Only the selected catalogue content, plus shared template type definitions and helpers where needed. The whole L&L application, client pages and customer source store are excluded.
- Generated sample imagery with an explicit provenance allowlist and per-file hashes.
- `README.md`, `.env.example` without credentials, `LICENSE.txt`, `THIRD-PARTY-NOTICES.md`, `ASSET-LICENSES.json` and `TEMPLATE-PACKAGE.json`.
- A neutral icon, editable `src/config/site.ts`, documented sample behaviour and an export normalizer for Windows Next.js page-data filenames.

The builder removes the L&L sales strip and template-price calls to action. Remaining generic contact actions use an editable sample email link, never the studio's enquiry endpoint. Existing business-specific placeholder phone/email displays are deliberately identified in the setup guide rather than silently represented as configured. Demo forms remain local demonstrations; actual email/API delivery is not part of a code-only purchase.

The licence text reuses the exact storefront licence points from `src/data/source-license.ts`, including one-client handoff. Open-source dependencies retain their own licences. The license is non-exclusive and permits one business website plus staging; redistribution as a downloadable template product is excluded.

## Media provenance and preview differences

All permitted images are documented generated illustrations, not client photographs. Live client screenshots, client logos, media/video folders and unknown image paths are excluded. The explicit allowlist covers the recorded original painting/massage images; beauty and wellness expansion images; two professional images; and the six documented images in each of the property, transport, food and retail families.

The original standalone plumbing, earthworks and lawn-care image files have no adequate generation/provenance record in this checkout. Their source packages therefore use the documented generated construction-home and painting-interior samples as neutral substitutes, with matching alternative descriptions. The original live demos remain unchanged. Each affected package sets a nonempty `assetNote` in the manifest and README. The storefront must show this note before purchase, rather than promising identical included photography. Buyers can replace sample media with their own approved images.

## Safeguards and verification

Paths are validated before packaging: no parent traversal, absolute paths, Windows drives, backslashes, hidden environments, repository metadata, symlinks, generated output, logs, key files or duplicate names on case-insensitive systems. A content audit rejects common secret formats, known client identities and remaining L&L sales redirects. Files are written to a deterministic ZIP with fixed timestamps and verified content hashes. The secret audit is an extra guard, not a replacement for the explicit dependency/file allowlist.

Run `node --test --experimental-strip-types tests/source-packages.test.mjs`. Tests exercise malicious paths, secret leakage, Windows filename collisions, exact ZIP round trips, blocked client/reference requests, slim runtime dependencies, licence consistency, form disclosures, substituted assets, transport isolation and all 40 package manifests.

For a release, extract representative archives into clean folders, run `npm ci`, `npm run typecheck`, and `npm run build`. Check the exported routes and images, then review browser rendering before claiming device or browser QA. Source delivery does not promise universal compatibility, perfect security or a particular performance/search score. The generated buyer README covers configuration, the noindex defaults and the separate work needed for live contact delivery and deployment.
