# Source downloads: owner setup

The storefront offers **Personalize & launch** first and **Download source code** as a separate DIY purchase. This release does not charge a card, create provider accounts or make a storage bucket public. Until the private packages and payment settings are ready, customers can enquire about purchasing; checkout stays unavailable.

## What is sold

Every visible template has two paths: L&L personalization and launch, or a code-only option. The five reference examples use **Request a code-only version**, with availability, reusable scope and price confirmed first. They do not expose or sell original client files.

`src/data/source-products.ts` is the explicit list of 40 reusable fictional designs. Tow-N-Go, Crestline, McKenzie House, Calgary Hot Shot and Horizon are excluded. Never add a real client's code, identity or private media to the downloadable catalogue without separately resolving the rights and product scope.

| Managed offer regular price | Separate source-only price |
| --------------------------- | -------------------------- |
| $150 CAD                    | $49 CAD                    |
| $299 CAD                    | $79 CAD                    |
| $399 CAD                    | $99 CAD                    |
| $499 CAD                    | $149 CAD                   |
| $549 CAD                    | $179 CAD                   |
| $600 CAD                    | $199 CAD                   |

The existing managed-launch 20% promotion does **not** discount these download prices. Each archive includes editable source, a lockfile, setup instructions, sample content and a single-business licence. Personalization, hosting, domains, email/API configuration, extra features and maintenance are separate. Structure, Earthworks and Lawn Care use neutral sample images in the ZIP; their purchase page discloses this difference from the live preview. These archives must not include third-party stock assets without redistribution rights.

## 1. Review and build the private archives

Use the project's supported Node version, stop any competing release task, and commit the reviewed source changes first. The uploader refuses uncommitted source changes, untracked non-ignored files and archives from another HEAD. The generated storefront manifest is the only allowed tracked difference. No reset, forced checkout or stash is necessary.

From PowerShell:

```powershell
Set-Location "C:\Users\techn\landl-tech"
npm ci
if ($LASTEXITCODE -ne 0) { throw 'Dependency install failed.' }
npm run check
if ($LASTEXITCODE -ne 0) { throw 'Quality checks failed.' }
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Production build failed.' }
node --experimental-strip-types scripts/build-source-packages.mjs
if ($LASTEXITCODE -ne 0) { throw 'Package build failed.' }
node --experimental-strip-types scripts/upload-source-packages.mjs
if ($LASTEXITCODE -ne 0) { throw 'Package validation failed.' }
```

The last command is a **dry run**: it makes no network requests and writes no storefront records. To prepare one product first, add `--design pigment` to the builder. Repeated `--design` options select several products. The builder writes only the selected batch to `build/source-packages/manifest.json`; published historical versions are preserved separately.

Archive layout: `build/source-packages/{designId}/{sha256}/{designId}.zip`. The ZIP's `TEMPLATE-PACKAGE.json` identifies its source snapshot. `version` and `sha256` identify the sanitized content and archive respectively; `sourceCommit` records the generating repository commit. The builder requires clean committed source before and after generation and records `sourceDirty: false` in both the manifest and archive. The uploader rejects missing or dirty provenance, including review-only helper builds. Rebuild earlier archives with the current clean-source builder before uploading.

Before selling a new or changed design, extract its ZIP into a fresh folder, follow its README, run `npm ci` and `npm run build`, and review the actual output on desktop and mobile. Confirm sample contact details and forms are clearly marked and check the licence and asset notes. Do not upload your extracted customer folder's credentials into an archive.

## 2. Prepare private object storage

Use a dedicated private Amazon S3 or compatible Cloudflare R2 bucket. Enable S3 Block Public Access, or disable R2's public development URL and any public custom domain. Do not use the website's public assets folder. Keep the `source-packages/` prefix private; the site issues short-lived signed downloads only after verifying payment.

Use bucket-scoped credentials. The upload operator needs read/HEAD and conditional object creation under that prefix. The deployed application needs read/HEAD and signing access, **not** upload or delete permission. Set the same variable names with separate least-privilege credential values in the operator file and Vercel settings.

Create a private environment file outside the repository, for example `C:\Users\techn\LAndL-Private\source-upload.env`, with:

```dotenv
SOURCE_S3_REGION=auto
SOURCE_S3_BUCKET=YOUR_PRIVATE_BUCKET
SOURCE_S3_ENDPOINT=https://YOUR_ACCOUNT.r2.cloudflarestorage.com
SOURCE_S3_ACCESS_KEY_ID=YOUR_UPLOAD_ACCESS_KEY
SOURCE_S3_SECRET_ACCESS_KEY=YOUR_UPLOAD_SECRET
```

For Amazon S3, omit `SOURCE_S3_ENDPOINT` and set the actual region instead of `auto`. Do not paste real keys into chat, documentation, source files or Git. The uploader requires an HTTPS endpoint and will not print provider keys or signed download URLs.

Upload explicitly:

```powershell
node --experimental-strip-types `
  --env-file="$env:USERPROFILE\LAndL-Private\source-upload.env" `
  scripts/upload-source-packages.mjs --upload
if ($LASTEXITCODE -ne 0) { throw 'Private upload stopped. Read the message above.' }
git diff -- src/data/source-package-manifest.json
```

Uploads use content-addressed immutable keys, `If-None-Match: *`, private cache policy, application/zip content type and SHA-256 metadata. Existing objects with different metadata are refused. All local archives are validated before the first remote request; each remote object is verified before the storefront manifest is written. The provider must support conditional writes; do not remove that protection to work around an error.

Confirm a **known uploaded object** cannot be fetched anonymously without a signed URL. Test the ordinary bucket/object address with no authorization, cookies or signed query string. It must not return the ZIP; typically it returns 403 or 404. A missing arbitrary object does not prove the bucket is private. Review the bucket policy as well; the uploader's authenticated HEAD check cannot prove anonymous access is disabled.

After successful verification, review and commit the append-only manifest:

```powershell
git add -- src/data/source-package-manifest.json
git commit -m "Publish verified private source-package versions"
if ($LASTEXITCODE -ne 0) { throw 'Review Git output before continuing.' }
git push origin main
if ($LASTEXITCODE -ne 0) { throw 'Manifest push failed.' }
```

Follow the repository's normal main-branch review/release process; do not switch branches or overwrite local work to force these commands. No ZIP or private environment file belongs in Git. Wait for the matching Vercel production deployment to become Ready before testing storefront availability.

## 3. Configure checkout in test mode

Run test checkout locally with `npm run dev` and a private, ignored `.env.local`. Test keys are accepted only for local development (`http://localhost:3000` or `http://127.0.0.1:3000`, with a non-production Node environment). Public production checkout requires live keys and Vercel's production environment; putting test keys on the public site deliberately disables commerce. Never prefix server secrets with `NEXT_PUBLIC_`.

| Variable                         | Value / purpose                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `SOURCE_DOWNLOADS_ENABLED`       | Keep `false` until package and provider checks pass; `true` permits new checkout sessions.                               |
| `STRIPE_SECRET_KEY`              | Stripe **test-mode** key first; live key only when ready.                                                                |
| `STRIPE_WEBHOOK_SECRET`          | Signing secret for this exact environment's webhook endpoint.                                                            |
| `SOURCE_DOWNLOAD_SIGNING_SECRET` | At least 32 bytes from a cryptographically secure generator, held privately.                                             |
| `SOURCE_CHECKOUT_ORIGIN`         | `https://lltechsolutions.ca`; local development can use `http://localhost:3000`. Arbitrary preview domains are rejected. |
| `SOURCE_STRIPE_AUTOMATIC_TAX`    | Explicit `true` or `false`, according to the owner's configured tax collection setup. An omitted value blocks checkout.  |
| `RESEND_API_KEY`                 | Authorized email-sending key.                                                                                            |
| `SOURCE_FROM_EMAIL`              | Sender on your verified Resend domain, such as `L&L Tech Solutions <noreply@lltechsolutions.ca>`.                        |
| `SOURCE_S3_*`                    | Private bucket settings above, using application read-only credentials.                                                  |

For local test-mode development, use Stripe CLI forwarding to `http://localhost:3000/api/source-purchases/webhook` and its matching local signing secret. Subscribe to `checkout.session.completed` and `checkout.session.async_payment_succeeded`. The live signed webhook will use `https://lltechsolutions.ca/api/source-purchases/webhook` and its own signing secret. Do not replace production live settings with local test credentials.

Test via an actual source-product checkout started on the local development site, such as `http://localhost:3000/website-collection/pigment/source`. Generic synthetic webhook events do not contain the signed purchase metadata and cannot authorize a download. Use Stripe test cards only. Complete one purchase, cancel one and check a declined payment. No real card charge is needed for these checks. Stop the development server and keep its test credentials separate when returning to production work.

Check these outcomes before switching on live sales:

- The chosen product, CAD price, tax treatment and licence are clear before payment. The managed-launch sale is not applied to source downloads.
- The payment return page provides the correct ZIP only after payment is confirmed; a copied session ID in a different browser does not grant access.
- The receipt email arrives at a controlled inbox. Its private link works in a separate browser, downloads the purchased version and matches the displayed SHA-256.
- Replaying the same signed event does not send another receipt after delivery is recorded. Failed or pending payment does not deliver a file.
- A refunded test order is blocked when requesting a new download. An already-issued storage link can remain valid for up to five minutes.
- Disabling `SOURCE_DOWNLOADS_ENABLED` prevents **new** purchases while already-paid customers retain their valid download links and webhook delivery can finish.
- A clean ZIP extraction builds successfully; representative mobile and desktop screens, keyboard navigation and reduced-motion behavior have been reviewed. Automated build checks are not a guarantee of every browser/device combination.

Use the documented tax collection configuration intentionally before live activation. The app adds only the taxes returned by your Stripe setup; it does not decide registration obligations or configure tax registrations for you. Customer download links expire 30 days after checkout creation, and storage URLs last five minutes.

## 4. Enable live sales

Keep checkout disabled while entering production Stripe keys, the production webhook signing secret, verified email settings, the private read-only storage credentials and the persistent signing secret. Verify the final environment and uploaded manifest, then set `SOURCE_DOWNLOADS_ENABLED=true` and deploy. Live Stripe keys are accepted only in Vercel's production environment.

Readiness checks validate configuration shape and the relevant archive's existence; they do not prove your Stripe account is fully activated, tax settings are appropriate, email is delivered or the bucket policy is private. Complete the provider setup and test flow above. A production purchase test using a real card incurs a real charge and is an owner action, not an automatic release step.

## Recovery and ongoing operations

- **Partial upload:** previously uploaded immutable objects can remain. The storefront manifest stays unchanged until the whole selected batch succeeds. Resolve the storage issue and re-run the same upload; verified matching objects are reused. Never delete or replace a package already sold.
- **Upload lock:** if a process crashed, confirm no upload is still running before deleting only `src/data/source-package-manifest.json.upload-lock`, then retry. Do not remove another active publisher's lock.
- **Changed source:** commit the reviewed changes and rebuild. The uploader rejects archives created from an older source commit. After a successful manifest-only commit, a future batch still requires a fresh build from that HEAD.
- **Retained versions:** new records append to `src/data/source-package-manifest.json`; the last record for a design serves new purchases. Keep historical records and objects so prior paid orders resolve to the exact purchased version. Do not rotate the signing secret during the 30-day access period except as an intentional incident response, which invalidates affected links.
- **Email pending:** inspect Stripe's checkout-session metadata (`source_email_attempted_at`, `source_email_delivered`) and the matching Resend logs privately. Delivery records hold the provider's accepted message ID; provider acceptance is not proof the message reached an inbox. Verify webhook retries and sender/domain status. Do not publish customer emails, tokens or delivery logs.
- **Uncertain email older than 23 hours:** automated retries stop to avoid resending after Resend's deduplication window. Reconcile the matching session against provider logs. If the message was accepted, record its actual Resend message ID in `source_email_delivered`; do not send another automatically. If the provider confirms no send occurred, clear the failed attempt marker and retry the signed event once while the purchase is still valid. If the outcome is uncertain, leave the hold in place and handle the customer's receipt directly after verifying ownership. Never repeatedly clear delivery markers to force retries.
- **Temporary outage:** set `SOURCE_DOWNLOADS_ENABLED=false` to pause sales; retain the storage, signing and payment verification settings needed by existing buyers. Download endpoints re-fetch Stripe payment and refund/dispute status rather than trusting the URL alone.

The upload script and automated tests do not submit payments, send emails, create a bucket or change provider configuration. Those integrations remain unverified until exercised with the owner's actual test-mode setup.
