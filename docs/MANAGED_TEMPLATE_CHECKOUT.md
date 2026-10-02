# Managed template checkout

Customers can choose **Personalize & launch** on each of the 45 current catalogue offers. The 42 fixed-scope templates accept a short business brief and payment through hosted Stripe Checkout once the owner enables this feature. The three client-reference offers remain enquiry-first so scope and price are agreed before booking. Source-code downloads remain a separate purchase option with their own flag, webhook and private-storage requirements.

The managed price includes the selected template's listed scope, supplied content/branding implementation, page-speed optimization, technical SEO and metadata, responsive/security checks and launch. Page count and contact setup remain those of the selected offer. Tow-N-Go, Crestline and McKenzie are reference-based offers without a fixed page count; they require an enquiry and agreement on pages, features and price before booking. Their routes cannot create an immediate payable checkout. Original photography, videography, editing, extra pages, advanced integrations, provider/domain fees and ongoing care are separately scoped. Checking the photography/video interest box asks for a separate quote; it adds no charge and no production deliverables to this purchase.

## Configuration

Managed checkout fails closed until all required settings are present. It does **not** require source ZIPs, a source manifest or S3. Keep secrets in server environment settings; never use a `NEXT_PUBLIC_` name or include them in an archive.

| Variable                             | Required value or purpose                                                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `MANAGED_TEMPLATE_PURCHASES_ENABLED` | `false` until activation checks are complete; then `true`.                                                           |
| `STRIPE_SECRET_KEY`                  | The selected account's secret key. Only `sk_live_` is accepted on the public production site.                        |
| `SOURCE_CHECKOUT_ORIGIN`             | Shared canonical checkout origin: `https://lltechsolutions.ca`.                                                      |
| `MANAGED_STRIPE_WEBHOOK_SECRET`      | The `whsec_` signing secret for `/api/template-purchases/webhook`, separate from the source-download webhook secret. |
| `MANAGED_PURCHASE_SIGNING_SECRET`    | A separate random secret of at least 32 bytes; retain it for existing paid orders.                                   |
| `SOURCE_STRIPE_AUTOMATIC_TAX`        | Shared explicit `true` or `false` choice. If enabled, configure Stripe Tax for the business before selling.          |
| `RESEND_API_KEY`                     | Key permitted to send from the verified business domain.                                                             |
| `CONTACT_FROM_EMAIL`                 | Verified sending address; `SOURCE_FROM_EMAIL` is a fallback.                                                         |
| `CONTACT_TO_EMAIL`                   | Owner notification inbox. If absent, the canonical site email is used. A buyer cannot set this recipient.            |
| `VERCEL_ENV`                         | Set by Vercel; live checkout requires `production`.                                                                  |

Generate the managed signing secret locally, then enter it directly in the server environment settings:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

Do not paste the generated secret into chat, commit it or put it in public files. Changing or losing it can prevent verification of already-created orders.

## Stripe webhook

Create a **separate endpoint** at:

```text
https://lltechsolutions.ca/api/template-purchases/webhook
```

Subscribe to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Use the matching account/mode webhook signing secret in `MANAGED_STRIPE_WEBHOOK_SECRET`. The handler verifies the exact raw payload and Stripe's timestamped signature, then retrieves the current Checkout Session and PaymentIntent with its latest Charge. An event or success-page URL alone never authorizes notification. Other purchase kinds, including source downloads, are ignored.

New purchases require the feature flag. Fulfilment of existing paid orders does not: turning the flag off pauses sales without suppressing paid-order emails.

## What is charged and retained

The server looks up the current canonical managed offer and approved promotion. The browser's displayed amount is comparison-only; an outdated price returns a refresh message instead of silently charging another amount. Stripe receives one CAD item, quantity one, with tax exclusive where applicable. Additional discounts, shipping and customer-controlled amounts are not enabled.

An open Stripe Checkout Session uses Stripe's default **24-hour expiry**. Its signed amount and scope stay fixed for that session, including when a promotion ends while it remains open. A fresh checkout uses the then-current canonical price. Paid-order verification uses its signed purchased snapshot rather than today's catalogue, so subsequent price, feature or terms changes do not rewrite the order.

The snapshot and brief are private Stripe metadata:

- Selected template ID/name, regular and purchased price, listed included items, page count, contact setup, personalization/launch inclusions and excluded extras.
- Scope/terms version, contact name, business name, email, optional phone and website, location/service area, services/products, project notes and optional media-production interest.
- Signed integrity proof and independent owner/buyer email state.

Notes are length-limited and split into Unicode-safe fields within Stripe's 500-character values and 50-key limit. Empty optional fields are supported. Payment details are entered only on Stripe; this application never receives card numbers. This brief is for business information, not passwords, payment details or customer/patient records. There is no public order lookup or public brief response.

## Notifications and confirmation

After the current payment is verified as completed, paid, correctly captured and neither refunded nor disputed:

1. **Owner email** goes to `CONTACT_TO_EMAIL`, or the canonical site inbox. It includes the order reference, exact purchased template/scope, price/tax/total, business details, project notes and separately quoted photography/video interest. Reply-to is the submitted business contact email. The Stripe billing email is also identified if the payer used another address.
2. **Buyer email** goes to the verified Stripe Checkout email. It confirms the purchased scope and amount, explains the content handoff and next contact with L&L, and keeps extras separate.
3. **Browser confirmation** requires the signed, HttpOnly ownership cookie created for that specific checkout. It exposes only paid/pending status, template name, reference, totals and notification state, never the full business brief.

A notification marked sent means Resend accepted the send request; it is not evidence of inbox placement or a opened/read email. Check the Resend delivery events when validating activation.

Owner and buyer emails have separate durable markers in Stripe and separate stable Resend idempotency keys. A temporary owner-email failure does not suppress buyer confirmation, or vice versa. Signed webhook retries and the browser's verified status request can retry incomplete delivery. Overlapping retries within the provider's idempotency window use the same key. This is not a claim of cross-provider exactly-once delivery.

An uncertain attempt older than 23 hours is held for manual reconciliation rather than automatically resent beyond Resend's 24-hour deduplication window. Inspect Stripe's `managed_owner_*`/`managed_buyer_*` metadata and the matching Resend request before resolving the order. Do not blindly clear markers and repeatedly resend. A paid order remains visible as paid even if notification is pending; use the order reference and Stripe session to recover it.

## Retry behaviour

The form retains one random request UUID for an unchanged brief. Stripe's idempotency key uses that UUID, and checkout parameters have no changing timestamp. A retry after a lost response therefore returns the same session while the offer and brief remain unchanged. Editing the brief or deliberately starting again creates a new attempt. If configuration or catalogue changes make an existing attempt's parameters differ, the server returns a clear refresh message instead of treating it as a new charge.

The browser ownership cookie lasts 24 hours and is Secure on HTTPS, HttpOnly and SameSite=Lax. Stripe confirmation emails and owner notifications do not depend on that cookie. API and confirmation responses are private/no-store, no-referrer and noindex. Per-instance checkout/status limits are present; configure Vercel Firewall limits for enforcement across instances.

## Activation checks

The included automated tests use local fixtures. They do not send emails, charge cards or verify the owner's provider accounts.

1. Configure the verified Resend sender and owner inbox. Review the purchased scope and business-brief copy.
2. Exercise the full flow locally with Stripe test credentials and Stripe webhook forwarding to `http://localhost:3000/api/template-purchases/webhook`. Test mode is deliberately accepted only with a localhost/127.0.0.1 HTTP origin outside a production build. Public preview and production sites cannot authorize test-card purchases.
3. Confirm a completed test order reaches both intended inboxes, contains the right signed scope/brief and records both notification markers. Resend acceptance alone is insufficient to verify delivery.
4. Test cancellation, duplicate webhook delivery, a lost-response retry and a refunded order. Confirm paid status does not depend solely on the return URL. Review the mobile/desktop form, keyboard controls and hosted checkout.
5. Configure live production keys, the live managed webhook and the explicit tax setting. Redeploy with the managed feature flag enabled only when these checks are complete. A real transaction/receipt/delivery check remains an owner-controlled production verification step.
6. Monitor webhook failures and Resend delivery events. Keep a reconciliation process for paid orders with pending notification.

The source-code checkout can remain disabled while managed purchases are enabled. See `SOURCE_DOWNLOADS_SETUP.md` for the independent ZIP-download setup.

## Implementation

- `src/lib/managed-commerce-core.ts`: input validation, signed order snapshot, verified payment invariants, notification content, idempotent delivery behaviour and signed webhook handling.
- `src/lib/managed-commerce.ts`: canonical offer lookup, private environment settings, Stripe/Resend adapters, checkout creation, ownership and API responses.
- `src/app/api/template-purchases/{checkout,status,webhook}/route.ts`: bounded request handling and private responses.
- `tests/managed-commerce.test.mjs`: behavioural coverage for all 42 fixed-scope offers and the three reference exclusions, price/metadata integrity, historical scope, Unicode/optional fields, paid-state checks, refunds, recipient routing and delivery retries.

Provider references: [Stripe Checkout fulfilment](https://docs.stripe.com/checkout/fulfillment), [Stripe metadata](https://docs.stripe.com/metadata), [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests), [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys).
