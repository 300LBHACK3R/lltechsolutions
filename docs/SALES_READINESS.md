# Sales readiness — 26 October 2026 (Alberta)

The audit found and repaired a native-form fallback: the contact and managed checkout
forms could otherwise submit named fields through a GET before JavaScript took control.
All three live sales forms now stay inert until hydration, declare POST as a second
defence, and provide a direct email fallback. Contact delivery also requires a provider
message ID before claiming acceptance. Acceptance still does not establish inbox arrival.

The separately sanitized trailer-rental and painting reference editions receive the same
pre-hydration protection for their sample forms. They remain local demonstrations with no
email or booking integration; original client websites are not modified by these changes.

The managed purchase page now describes the available sample-content reference editions
consistently with the source product pages.

## Release evidence and remaining boundaries

- Before these repairs, production displayed enabled source and managed forms. All expected
  production environment variable names were present. Secret values were not retrieved.
- The live contact endpoint rejected an empty request; both purchase endpoints rejected
  invalid inputs; both status endpoints and the source download endpoint rejected unowned
  or invalid access. These checks created no payment and sent no email.
- The catalogue has 45 offers. The append-only source manifest contains 88 records across
  44 designs. Calgary Hot Shot remains missing and cannot accept a code-only payment.
- The published archive records point to source commits `5ec5e33` and `ce7b22c`. Both
  lockfiles pin Next.js 16.3.8. A reconstructed customer dependency audit flags the Next.js
  advisories documented in [Dependency audit](DEPENDENCY_AUDIT.md). Static export removes
  the production Next server surface, but customers receive editable code and may change
  deployment mode. Prepare and privately publish new archives using the patched 16.4.3
  dependency graph before advertising code downloads. This observation is based on archive
  provenance, not a download of the private stored ZIPs or evidence of exploitation.
- The connected Stripe account available to this audit was **Tate’s TV sandbox**, not an
  identified L&L live account. No unrelated account was modified. The production account,
  enabled webhooks, payment fulfillment and inbox delivery still need provider evidence.
- The private R2 uploader credentials were not available in this workspace. Rebuilding
  ZIPs does not publish them. Keep the current manifest until verified upload completes.
- GitHub write access was unavailable for the prior Christmas releases. Reconcile the
  prepared branch with GitHub and wait for remote Quality before resuming Git-driven
  deployment; deploying the older main branch would overwrite newer live work.

The current code changes do not alter payment amounts, tax settings, consent terms,
signing secrets, feature flags, private object permissions or existing paid entitlements.

## Publish refreshed customer downloads

Use the same clean source commit for build and upload. Review the release bundle's exact
commit and package verification report before running the upload. Never use an unrelated
checkout or reset local work to make it clean.

```powershell
npm ci
npm run check
npm run audit:check
npm run build
npm run source:build
npm run source:upload:check
```

Extract the ZIPs into fresh folders and verify installation, type checking, builds and
rendered desktop/mobile output. Then use the existing private uploader configuration:

```powershell
node --experimental-strip-types `
  --env-file="$env:USERPROFILE\LAndL-Private\source-upload.env" `
  scripts/upload-source-packages.mjs --upload
if ($LASTEXITCODE -ne 0) { throw 'Upload failed; do not publish a replacement manifest.' }
git diff -- src/data/source-package-manifest.json
```

The uploader verifies each immutable object before appending its record. Preserve all
historical records and objects. Confirm that a known object remains inaccessible without
a signed URL, commit the changed manifest, run the release checks and deploy that commit.
Do not publish the pending local manifest directly or put ZIPs in `public/`.

## Adding another template

1. Add its approved name, regular price, pages, contact scope and category to the canonical
   `src/data/website-collection.ts` data. Preserve numeric ordering and derive promotions
   from the shared promotion helper; never duplicate sale prices.
2. Build its distinct demonstration, approved sample assets and screenshots. Keep customer
   reference identities and original client media out of resale packages. Register the
   standalone target and add the live demo URL only after verifying its deployment.
3. If selling code, add the explicit source offer to `src/data/source-products.ts` and its
   package mapping/provenance to the existing source builder. A product entry alone is not
   a deliverable. A managed offer with an uncertain page count remains enquiry-first.
4. Update catalogue/count expectations and add meaningful scope, route and package checks.
   Run formatting, `check`, dependency audit, production build and `smoke`; review the
   real mobile and desktop purchase pages.
5. From clean committed source, build, inspect and privately upload the new archive as
   above. Commit only the verified manifest, then deploy. Check the offered price, live
   demo, contact handoff and hosted checkout before linking an advertisement to that page.

This is a code-maintained catalogue, not a dashboard where uploading a ZIP automatically
creates a product. Payment fulfillment remains automatic only when its configured Stripe,
email and private-storage services are healthy. Review delivery failures and keep the
dependencies and downloadable packages current as part of normal operation.
