# Tate's purchase activation guide

Provider instructions checked against official documentation on October 2, 2026. This guide describes the existing implementation; it does not activate accounts or sales.

## How the purchase works

| Customer chooses         | What happens after verified payment                                                                                                             | Services needed                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Personalize & launch** | Stripe takes payment; L&L receives the business brief and purchased scope; the buyer receives a confirmation and replies with approved content. | Stripe + Resend + Vercel                       |
| **Purchase** (code only) | Stripe takes payment; Resend emails a private link to the purchased ZIP in R2.                                                                  | Stripe + Resend + Vercel + private R2 archives |

Managed checkout covers 42 fixed-scope offers. Tow-N-Go, Crestline and McKenzie remain enquiry-first for managed work. All 45 designs have source purchase pages, with separate $49–$199 CAD prices. Reference editions use prepared sample content; the reference business's identity, original media, testimonials and connected services are excluded. The managed sale does not discount source files.

The source manifest is currently empty. Building the site alone does not publish ZIPs. There are 44 source-package candidates; Calgary Hot Shot still needs its source project and cannot accept a code payment until its ZIP is prepared, uploaded and recorded. Managed purchases can be enabled before source downloads because their readiness checks are independent. Provider activation and real delivery are not established by the repository checks.

## 1. Set up Stripe

1. Create or use the L&L Stripe account. Complete its business verification and activation requirements, including the requested business/payout information. Review the customer-visible business name, support details and statement descriptor. [Stripe account setup](https://docs.stripe.com/get-started/account/set-up)
2. Use a Stripe sandbox/test environment for the local checks below. Obtain its `rk_test_...` restricted key (or `sk_test_...` secret key). Later, use the activated account's corresponding `rk_live_...` or `sk_live_...` key in Vercel Production. Both purchase flows accept restricted and standard server keys and derive the payment mode from the same shared parser. It does not need a publishable key, Payment Link, or manually entered Stripe product/price IDs: the server creates the hosted Checkout line item from the catalogue. [Stripe keys](https://docs.stripe.com/keys)
3. Decide the business's tax treatment before activation. `SOURCE_STRIPE_AUTOMATIC_TAX` must explicitly be `true` or `false`; blank blocks checkout. With `true`, configure Stripe Tax, the applicable registrations and appropriate product classification first. The app sets prices as tax-exclusive; it does not decide the business's registration obligations. [Stripe Tax setup](https://docs.stripe.com/tax/set-up)
4. In the **live account**, open **Workbench → Webhooks → Create an event destination**. Choose **Your account**, the snapshot events below, and **Webhook endpoint**. Create the two destinations separately, then copy each endpoint's `whsec_...` signing secret into its matching Production variable. [Stripe webhooks](https://docs.stripe.com/webhooks)

| Live endpoint                                               | Signing-secret variable         |
| ----------------------------------------------------------- | ------------------------------- |
| `https://lltechsolutions.ca/api/source-purchases/webhook`   | `STRIPE_WEBHOOK_SECRET`         |
| `https://lltechsolutions.ca/api/template-purchases/webhook` | `MANAGED_STRIPE_WEBHOOK_SECRET` |

Both subscribe to `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Local CLI signing secrets are separate from live endpoint secrets. The server verifies Stripe's signature and retrieves the current payment; reaching the success page alone never grants fulfilment.

### Restricted-key permissions

Use individual resource rows rather than enabling the whole Core group. Based on the current server calls, start with:

| Resource            | Permission | Purpose                                                                           |
| ------------------- | ---------- | --------------------------------------------------------------------------------- |
| Checkout Sessions   | Write      | Create checkout, retrieve purchased line items and update email delivery markers. |
| Payment Intents     | Read       | Verify the current payment.                                                       |
| Charges and Refunds | Read       | Read the expanded latest charge and its captured/refunded/disputed state.         |

Leave other resources at None initially. This is a starting scope, not a claim that live provider testing has passed. The checkout creates inline product/price data and can enable automatic tax; confirm any additional permission dependencies with the actual sandbox checkout and Stripe request logs. Add only the specific permissions required by a verified permission error, then reproduce the tested configuration for the live key. Do not grant broad account access just to bypass an error. The app verifies incoming webhook signatures locally; the key does not need Webhook Endpoints Write to receive events configured in the Dashboard.

Store either key family under the existing server-only `STRIPE_SECRET_KEY` variable. Never paste the value in chat, commit it, or put it in a `NEXT_PUBLIC_` variable. Restricted-key support does not enable sales, configure webhooks, send emails or publish source archives. Keep both sales flags false until their activation checks pass. Local tests require HTTP localhost or 127.0.0.1, a non-production build and no hosted `VERCEL_ENV`; production accepts live keys only at the canonical HTTPS origin in Vercel Production. [Stripe restricted keys](https://docs.stripe.com/keys/restricted-api-keys)

## 2. Set up Resend and the owner inbox

1. In Resend, choose **Domains → Add Domain** and enter an L&L-owned domain or sending subdomain. Add the exact sending DNS records shown in its **Records** tab at your DNS provider. Record types can differ; use Resend's supplied values. Keep existing inbox MX records. This integration only needs sending, not Resend inbound mail. Wait for **Verified**. [Add a domain](https://resend.com/docs/add-a-domain), [sending records and existing MX](https://resend.com/docs/knowledge-base/how-do-i-avoid-conflicting-with-my-mx-records)
2. Choose **API Keys → Create API Key → Sending access**, restricted to that verified sending domain. Store its `re_...` value privately. [Create an API key](https://resend.com/docs/create-an-api-key)
3. Set `SOURCE_FROM_EMAIL` and `CONTACT_FROM_EMAIL` to an address on that verified domain, such as `L&L Tech Solutions <purchases@lltechsolutions.ca>` if you verified `lltechsolutions.ca`. Set `CONTACT_TO_EMAIL` to Tate's monitored owner inbox. Managed checkout falls back to the canonical site inbox when this is absent, but an explicit setting makes the destination clear.

Source ZIPs are delivered by **private email link**, not attachment. The link expires 30 days after checkout creation; each valid request rechecks payment/refund/dispute status and redirects to an R2 URL valid for five minutes. Treat the email link as private: anyone holding it may use it during its valid period. The buyer can also download from the verified payment-return page.

For managed orders, the existing buyer email asks customers to reply with their approved logo, photos and website content. A restricted sharing link can be sent in that reply for large folders; access must be granted to the L&L inbox. There is no customer file-upload portal in this implementation. Do not email passwords or private customer/patient records. Source-support replies currently go to `LandLTechSolutions@protonmail.com`; managed replies use `CONTACT_TO_EMAIL` or the canonical fallback.

## 3. Create private Cloudflare R2 storage — source downloads only

1. Open Cloudflare **R2 Object Storage**, enable R2 after reviewing its account/billing requirements, and create a dedicated bucket, for example `lltech-source-downloads`. Buckets are private by default. [Create a bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/)
2. In that bucket's **Settings**, leave **Public Development URL** disabled and do not connect a public custom domain. Disabling only `r2.dev` does not remove access through an existing custom domain. [Public-access settings](https://developers.cloudflare.com/r2/buckets/public-buckets/)
3. From R2 Overview, use **Account Details → API Tokens → Manage** to create two bucket-scoped credentials: **Object Read & Write** for the local uploader, and **Object Read only** for the deployed website. Prefer account tokens where available. Save each **Access Key ID** and **Secret Access Key** when displayed; the secret is not shown again. [R2 credentials](https://developers.cloudflare.com/r2/api/tokens/)
4. Use the bucket's S3 endpoint, normally `https://ACCOUNT_ID.r2.cloudflarestorage.com`, and `SOURCE_S3_REGION=auto`. If you selected a bucket jurisdiction, use its corresponding endpoint shown by Cloudflare. Use the S3 credentials, not a public bucket URL. Signed downloads work with private R2 storage. [R2 signed URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)

The uploader uses immutable `source-packages/...` keys and refuses conflicting existing objects. Keep historical ZIPs and manifest records for previous purchasers; do not add an expiry/deletion rule to sold archives.

## 4. Build, validate and upload ZIPs

Use Node 22 or later. First commit the reviewed source and this documentation through the normal branch/review process. The builder/uploader require clean committed source and matching HEAD; do not reset or discard unrelated work to satisfy that check. From the repository folder, run each line separately and stop if it fails:

```powershell
npm ci
npm run check
npm run build
npm run source:build
npm run source:upload:check
```

The default builder packages the 44 available source candidates and reports Calgary Hot Shot as not packaged. Explicitly selecting `--design calgary-hot-shot` fails until its real source project is available; it must not be replaced with another design. The last command is a **dry run**: no network, upload or storefront changes. To prepare just one design first, replace the build command with `npm run source:build -- --design pigment`; only uploaded designs become purchasable. Extract a generated ZIP into a fresh folder and verify its README, `npm ci`, `npm run build`, licence and desktop/mobile output before selling it.

Create `C:\Users\techn\LAndL-Private\source-upload.env` outside the repository using the **uploader** credentials:

```dotenv
SOURCE_S3_REGION=auto
SOURCE_S3_BUCKET=YOUR_PRIVATE_BUCKET
SOURCE_S3_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
SOURCE_S3_ACCESS_KEY_ID=YOUR_UPLOAD_ACCESS_KEY_ID
SOURCE_S3_SECRET_ACCESS_KEY=YOUR_UPLOAD_SECRET_ACCESS_KEY
```

Then explicitly upload:

```powershell
node --experimental-strip-types `
  --env-file="$env:USERPROFILE\LAndL-Private\source-upload.env" `
  scripts/upload-source-packages.mjs --upload
if ($LASTEXITCODE -ne 0) { throw 'Upload stopped; resolve the reported problem before continuing.' }
git diff -- src/data/source-package-manifest.json
```

Successful upload verifies every selected remote object before updating `src/data/source-package-manifest.json`. Check that a **known uploaded object** cannot be fetched anonymously without a signed query string, and review both R2 public-access settings. Authenticated upload success alone does not prove privacy.

Review and commit the updated manifest through the normal release process, then deploy that commit. ZIPs stay in private R2; neither ZIPs nor credential files belong in Git. See [detailed archive and recovery instructions](SOURCE_DOWNLOADS_SETUP.md).

## 5. Enter the exact environment variables

Keep real values in private `.env.local` for local development and in the correct Vercel project's **Environment Variables**, scoped to **Production**, for the live site. No secret gets a `NEXT_PUBLIC_` prefix. Do not paste secrets, signed links or customer records into chat, screenshots, Git or this guide.

| Variable                             | Local test value                              | Production value                                   |
| ------------------------------------ | --------------------------------------------- | -------------------------------------------------- |
| `STRIPE_SECRET_KEY`                  | Same sandbox's `rk_test_...` or `sk_test_...` | Activated account's `rk_live_...` or `sk_live_...` |
| `SOURCE_CHECKOUT_ORIGIN`             | `http://localhost:3000`                       | Exactly `https://lltechsolutions.ca`               |
| `SOURCE_STRIPE_AUTOMATIC_TAX`        | Explicit `true` or `false` for the test setup | Explicit reviewed `true` or `false`                |
| `RESEND_API_KEY`                     | Authorized `re_...` sending key               | Authorized `re_...` sending key                    |
| `CONTACT_FROM_EMAIL`                 | Verified sender                               | Verified sender for managed/contact emails         |
| `CONTACT_TO_EMAIL`                   | Controlled owner test inbox                   | Tate's monitored inbox                             |
| `SOURCE_FROM_EMAIL`                  | Verified sender                               | Verified sender for source emails                  |
| `MANAGED_TEMPLATE_PURCHASES_ENABLED` | `true` when testing managed flow              | Start `false`; enable after checks                 |
| `MANAGED_STRIPE_WEBHOOK_SECRET`      | Managed CLI listener's `whsec_...`            | Live managed endpoint's `whsec_...`                |
| `MANAGED_PURCHASE_SIGNING_SECRET`    | Separate random local secret                  | Persistent, separately generated secret            |
| `SOURCE_DOWNLOADS_ENABLED`           | `true` when testing source flow               | Start `false`; enable after checks/upload          |
| `STRIPE_WEBHOOK_SECRET`              | Source CLI listener's `whsec_...`             | Live source endpoint's `whsec_...`                 |
| `SOURCE_DOWNLOAD_SIGNING_SECRET`     | Separate random local secret                  | Persistent, separately generated secret            |
| `SOURCE_S3_REGION`                   | `auto`                                        | `auto`                                             |
| `SOURCE_S3_BUCKET`                   | Bucket holding manifest's ZIPs                | Same published private bucket                      |
| `SOURCE_S3_ENDPOINT`                 | Bucket's HTTPS S3 endpoint                    | Bucket's HTTPS S3 endpoint                         |
| `SOURCE_S3_ACCESS_KEY_ID`            | **Read-only** application key ID              | **Read-only** application key ID                   |
| `SOURCE_S3_SECRET_ACCESS_KEY`        | Matching read-only secret                     | Matching read-only secret                          |

`SOURCE_FROM_EMAIL`, source signing/webhook variables and `SOURCE_S3_*` are needed for source sales, not managed-only activation. Managed can use `SOURCE_FROM_EMAIL` as a fallback for `CONTACT_FROM_EMAIL`.

Generate each signing secret independently on your own machine and copy it directly into the appropriate private setting:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

Keep the production signing secrets stable and backed up privately so existing purchases remain verifiable. Vercel provides `VERCEL_ENV`; live commerce requires `production`. Do not spoof it locally. Test commerce is deliberately limited to a localhost/127.0.0.1 HTTP origin with `npm run dev`; production builds and public preview URLs cannot accept test payments.

## 6. Test locally, then enable live sales

Install the [Stripe CLI](https://docs.stripe.com/cli/install), authenticate with `stripe login`, and confirm it uses the same sandbox as the local secret key. Run these listeners in separate terminals; copy each displayed secret to its matching local variable:

```powershell
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded --forward-to http://localhost:3000/api/source-purchases/webhook
```

```powershell
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded --forward-to http://localhost:3000/api/template-purchases/webhook
```

Start/restart `npm run dev` after setting `.env.local`. Open `/website-collection/pigment/source` and `/website-collection/pigment/purchase` on `http://localhost:3000` and complete actual site-created test checkouts. Generic `stripe trigger` fixtures lack this application's signed metadata. [CLI forwarding](https://docs.stripe.com/cli/listen)

Use Stripe's test card `4242 4242 4242 4242`, a future expiry and any three-digit CVC. Use your controlled inbox as the buyer. All payment tests belong in the sandbox with test credentials; do not test using a real card/live payment. Resend emails during these checks are real sends to those inboxes. Local download links point to localhost, so open them on the testing computer. [Stripe testing](https://docs.stripe.com/testing)

Before activation, verify:

- Completed source checkout sends the correct ZIP link; a fresh browser with only the session ID cannot claim it, while the private email link works. Confirm the archive/version and SHA-256.
- Completed managed checkout sends the owner brief and buyer scope confirmation to the right inboxes. Confirm actual email arrival; a Resend accepted-message ID alone is insufficient.
- Cancellation/decline grants nothing, duplicate signed webhook delivery does not duplicate recorded email, and a refunded test source purchase cannot obtain a new download. An already-issued storage URL may work for its remaining five-minute lifetime.
- The detailed tests in [source setup](SOURCE_DOWNLOADS_SETUP.md) and [managed checkout](MANAGED_TEMPLATE_CHECKOUT.md) pass for the flow being enabled.

Finally, enter the live values in Vercel Production, enable only the desired feature flag(s), and make a new Production deployment containing the published manifest if selling code. Environment edits do not change existing deployments. Check the intended deployment is Ready at the canonical domain. [Vercel environment settings](https://vercel.com/docs/environment-variables/managing-environment-variables), [redeploying](https://vercel.com/docs/deployments/managing-deployments)

Monitor Stripe webhook delivery and Resend delivery events for the first genuine customer order. If necessary, set the relevant purchase flag to `false` and redeploy to pause new sales; keep payment verification, storage and signing settings available for existing buyers. Do not repeatedly clear email retry markers: uncertain attempts older than 23 hours need the reconciliation procedure in the detailed setup docs.
