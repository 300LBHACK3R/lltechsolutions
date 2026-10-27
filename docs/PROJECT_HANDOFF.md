# One project, one complete download

The complete release ZIP expands into **one `landl-tech/` folder**. Keep the named
directories in that folder: a maintained Next.js application needs separate source,
configuration, assets and tests. The root README is the entry point; it links the
canonical content files and current operating guides.

## What is included

| Location                                 | Contents                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| `src/`, `public/`, `templates/`          | Complete maintained website, brand assets, demo definitions and sanitized customer editions |
| `scripts/`, `tests/`, root configuration | Existing build, quality, cleanup and private upload tools                                   |
| `docs/`                                  | Setup, scope, provenance, release history and the remaining sales checks                    |
| `build/source-packages/`                 | The 44 current prepared customer ZIPs and their pending manifest                            |
| `build/release/`                         | Release identity, verification evidence, Git recovery bundle and Windows continuation steps |

Dependencies, build caches, extracted test installations, credentials and alternate
working copies are excluded. Install dependencies with `npm ci`. Prior release history
and paid archive records remain intact; a historical guide is evidence, not an alternate
active application. Do not deploy `build/` as a public static folder or share this owner
handoff as a customer download.

## Start locally

Extract to a new folder, open PowerShell in `landl-tech`, and run:

```powershell
npm ci
if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
npm run dev
```

Use Node 22 or newer. The app opens at `http://localhost:3000`. Stop the development
server with Ctrl+C before running cleanup or release checks. Configure local services
using `.env.example` and the linked setup guides; real credentials are never included.

## Restore Git before publishing

The ZIP is a complete runnable source snapshot. Git history is supplied separately in
`build/release/changes.bundle` so cached files and local Git credentials do not travel
with it. Follow `build/release/WINDOWS-CONTINUATION.txt` in the exported package to
reconnect this exact folder to the canonical repository without overwriting another
checkout. The recovery process leaves working files intact and verifies them against
the release commit. Do not run `git init` and make a new unrelated initial commit.

Before any source upload, the uploader requires a clean Git checkout and package
provenance matching its HEAD. If source changes after this release, commit the reviewed
changes, rebuild the customer packages and repeat verification. Do not copy the pending
manifest over `src/data/source-package-manifest.json`: the private uploader appends
verified records while preserving existing buyers' archive versions.

## Routine work

- **Add a template:** follow the five-step sequence in [Sales readiness](SALES_READINESS.md#adding-another-template), using the canonical catalogue and source-product files.
- **Prepare customer downloads:** follow [Source packages](SOURCE_PACKAGES.md) and [Private storage setup](SOURCE_DOWNLOADS_SETUP.md). Local preparation does not publish a product.
- **Publish changes:** run formatting, `check`, `audit:check`, production build and `smoke`; complete the [Release checklist](RELEASE_CHECKLIST.md), then publish the reviewed Git branch.
- **Remove generated caches:** stop local servers, run `npm run clean:check`, then `npm run clean`. Keep dependencies, private packages, credentials and Git history.
- **Advertise:** use a verified product page only after its real payment, confirmation and download path has passed the remaining provider checks in [Sales readiness](SALES_READINESS.md).

The catalogue is code-maintained. Uploading a ZIP alone does not create a new offer,
and passing source tests is not a guarantee of uninterrupted third-party payment or
email service. No changes in this cleanup alter the Christmas theme, client work,
pricing, purchase guards or existing paid entitlements.
