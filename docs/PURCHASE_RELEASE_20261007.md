# Purchase delivery release — October 7, 2026 (UTC)

## Verified before this release

- The first 44 customer ZIPs were uploaded to private R2 and recorded in commit `8b66062`.
- Tate completed a Painting Company code-only purchase in the local Stripe sandbox, received the download email and confirmed that the ZIP downloaded and opened (October 6, Alberta time).
- Production credentials and webhook delivery have not been verified by that local test. Managed buyer and owner email arrival still need an owner-run sandbox check.

## Delivery presentation

Source delivery and managed buyer/owner notifications now include branded HTML alongside the existing plain-text fallback. Download URLs remain private; payment checks, expiry, refund/dispute checks, ownership cookies and durable delivery markers are unchanged. Automated browser rendering was blocked by the execution environment; browser and email-client appearance still need visual review.

Already-delivered messages are not resent just because their design changes. If an earlier send attempt remains unresolved, reconcile its Resend result before retrying; do not clear delivery markers or invent a new idempotency key to force another message.

## Customer package quality

Customer files are formatted before content versions and ZIP hashes are calculated. Each new package includes an editing file map and EditorConfig. Dead transport-family modules/styles and empty sales-control fragments are removed where their lack of use is proven. Remaining shared family components are documented, and working CSS cascades are preserved rather than claimed to be completely refactored.

New ZIP versions must be privately uploaded and verified before the storefront manifest selects them. Never replace an old object or remove historical manifest entries: a previous buyer must still receive the version they purchased. Calgary Hot Shot remains unavailable for source checkout until its actual source package exists.

## Production activation

1. Publish the reviewed application commit and verified new archive manifest.
2. In the L&L Stripe live account, check that both canonical webhook destinations are enabled for `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
3. In the existing `lltechsolutions-otm7` Vercel project, review Production values: a live Stripe server key, each matching LIVE endpoint secret, `https://lltechsolutions.ca` as checkout origin, the reviewed automatic-tax value, verified sending addresses and Resend key, and the private R2 read-only credentials. Do not copy local sandbox keys, localhost origin or CLI listener secrets into Production.
4. Preserve existing `SOURCE_DOWNLOAD_SIGNING_SECRET` and `MANAGED_PURCHASE_SIGNING_SECRET`. Changing them invalidates existing grants or order proofs.
5. Enable `SOURCE_DOWNLOADS_ENABLED=true` once the source checks pass. Enable `MANAGED_TEMPLATE_PURCHASES_ENABLED=true` only after the managed sandbox buyer and owner emails are confirmed. The flags are independent.
6. Make a new Production deployment. Saved environment changes do not update an existing deployment.
7. At the canonical public domain, start each enabled hosted Checkout and stop before payment. Confirm the template, CAD amount, scope and live mode. Opening Checkout is not proof of live paid delivery. Do not charge a real card solely for testing.

For all setting names and scope details, use `PURCHASE_ACTIVATION.md`. The read-only live-webhook helper checks account identity, charges-enabled status and destination configuration; it cannot read Vercel secret values or prove email arrival.
