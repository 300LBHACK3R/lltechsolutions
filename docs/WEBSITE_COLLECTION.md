# Website Collection

This is a prepared source update, not a claim of a GitHub push or live Vercel deployment. It preserves L&L’s black, gold and charcoal identity and its three public disciplines.

## The visitor journey

1. Browse the small collection. Business type is the first filter; additional filters stay optional. Collection levels, launch standards and monthly options use native disclosures.
2. Open a design. Explore its inline pages, switch between two clearly labelled sample identities, and use Fit screen or Phone. Compare two or three designs if helpful.
3. Select additional help, then a support preference. Review the separate cost categories and submit an enquiry through the existing contact form. No payment is collected, and no paid support plan is preselected.
4. After the project is agreed, use the optional content guide. Enter public business information a section at a time, flag where help is needed, and download a text brief to attach to the existing project email.

No account, extra analytics, tracking pixels, new application dependencies or upload service is introduced. The contact form stays mounted while visitors move back through the guided steps, preserving their typed information. Selection context is appended to the final submitted message using the existing length limits and server validation. A normal enquiry link and direct contact details remain available.

## Current designs and truthfulness

| Design    | Main fit                              | Level     | Current status                             |
| --------- | ------------------------------------- | --------- | ------------------------------------------ |
| Pigment   | Painting                              | Signature | Interactive concept; launch pricing quoted |
| Structure | Construction, also shown for Plumbing | Premier   | Interactive concept; launch pricing quoted |
| Still     | Massage & Wellness                    | Essential | Interactive concept; launch pricing quoted |

These are original coded design studies with sample text, generic sample identities and CSS artwork. They are not client projects, ready-made client assets or complete production business sites. Contact layouts within the concept do not collect information. The actual pages, content, integrations and launch implementation are defined in the proposal. Only original or appropriately licensed reusable material may enter the collection.

Existing website/software/social pricing remains unchanged. No collection launch prices have been approved in this update. A concept with `startingPriceCad: null` reads “Quoted after a conversation”; it is never treated as free or included beneath a numeric budget ceiling. The finished offer can receive a price and published status once approved. Higher levels buy greater scope, not a different baseline of security or care.

## Canonical data and routes

`src/data/website-collection.ts` is the catalogue and selection source. It holds tiers, twelve industry categories, care choices, extras, design records and canonical inquiry helpers. `additionalIndustries` lets a design fit more than one relevant category. `src/data/collection-brief.ts` defines the content guide, bounded recovery format and text export.

- `/website-collection`: discovery, filters and service explanations.
- `/website-collection/[design]`: individual detail page, interactive preview, scope, optional video, pricing explanation and performance evidence.
- `/website-collection/start?design=pigment`: three-step guided enquiry.
- `/website-collection/compare?design=pigment&design=still`: shareable comparison.
- `/website-collection/brief`: optional client content guide, after booking.

Design pages use server-generated metadata, canonical URLs and CreativeWork structured data. The catalogue has CollectionPage/ItemList schema reflecting the filtered results. Design pages are added to the sitemap from the same catalogue. Start, Compare and Brief are noindex utilities and are not in the sitemap. Draft designs are excluded from cards, details, inquiries and comparisons. Reserve the slugs `start`, `compare` and `brief`.

## Adding and publishing designs

Use the `WebsiteDesign` type in the catalogue. Give every design a unique slug, name, tier, industry, description, page count, realistic delivery wording, scope and customization list.

- `draft`: private preparation; never rendered publicly.
- `concept`: an explicitly labelled preview whose final offer may still require a quote.
- `published`: approved offer with a positive, numeric `startingPriceCad` and a checked demo.

Existing concepts have `concept` data used by `DesignPreview.tsx` and their own route anchor as `demoUrl`. Future externally hosted demos need a public HTTPS URL and a real screenshot under `public/images/collection/`, with alt text and the actual image dimensions. Generic cover artwork is used only when an inline concept exists. A future original layout can extend the preview component; do not disguise a repeated layout as an exclusive bespoke client design.

Confirm scope, revision allowance, content responsibilities, completion timing, usage/handover terms, taxes and provider fees before accepting a deposit. Monthly care remains optional and separately scoped.

## Adding walkthrough videos and Tate’s introduction

The UI renders videos only after real files and their data are supplied. It uses native controls, inline playback, no autoplay, no preloading, captions and a readable transcript. No stock person, synthetic Tate recording, broken video placeholder or invented performance clip is included.

Use these suggested file locations (create each folder when adding the actual files):

| Recording      | Files relative to the repository                                                   |
| -------------- | ---------------------------------------------------------------------------------- |
| Pigment tour   | `public/media/collection/pigment/walkthrough.mp4`, `poster.webp`, `captions.vtt`   |
| Structure tour | `public/media/collection/structure/walkthrough.mp4`, `poster.webp`, `captions.vtt` |
| Still tour     | `public/media/collection/still/walkthrough.mp4`, `poster.webp`, `captions.vtt`     |
| Meet Tate      | `public/media/collection/tate/introduction.mp4`, `poster.webp`, `captions.vtt`     |

Set a design’s `walkthrough` object, or the `developerIntroduction` export, with `src`, `poster`, `captions` and a real `transcript`. Public URLs omit `public`, for example `/media/collection/pigment/walkthrough.mp4`. Do not set the object until all three files exist. Use H.264 MP4 with a web-friendly encoding and captions matching the recording. Keep a tour focused: home, services, one useful detail and the contact journey. Check playback and seeking on the actual deployed site.

Without a recording, the interactive concept remains usable; Meet Tate uses the written introduction. Existing client videos elsewhere on the site are untouched.

## Performance evidence

Each design optionally accepts `performance` records containing:

- `url`: the actual tested public HTTPS page;
- `measuredAt`: the real measurement date, YYYY-MM-DD;
- `device`: Mobile or Desktop;
- `conditions`: meaningful connection, throttling and test-environment details;
- `lighthouseVersion` and an accessible HTTPS `reportUrl`;
- `scores`: actual integer 0–100 values for performance, accessibility, bestPractices and seo.

No records are supplied for the new concepts because they have not been measured in a public browser environment. The page says so. Do not use another project’s scores or imply a guarantee. Metadata and automated checks are a foundation, not a ranking or security promise.

## Content guide and privacy

The guide is an optional preparation tool, not an authenticated client portal. It makes no network submission and accepts no uploads. All fields can be left for discussion. The visitor explicitly clicks Save draft to use browser storage; nothing is saved automatically. The record has a version and field allowlist, with bounded field lengths. Restore and Clear ask before replacing current work. Missing or unavailable storage produces a useful message and preserves current entries.

The exported file is `My-LandL-Website-Brief.txt`. The visitor sends it through the agreed project email if they choose. Actual media transfer and account access are arranged separately. No passwords, API keys, payment details or sensitive customer data should enter the guide. Privacy explains this behaviour. Browser data is not synchronized across devices.

## Checks and remaining review

Use `npm ci`, `npm run format:check`, `npm run check`, `npm audit --audit-level=moderate`, `npm run build` and `npm run smoke`.

On September 12, 2026, the guided-collection implementation passed formatting, source/asset validation, ESLint without warnings, TypeScript, 17 tests, a dependency audit with zero reported vulnerabilities, production build and 70 HTTP checks. The mail key is deliberately absent from smoke testing: no external email was sent.

The supported browser returned `ERR_BLOCKED_BY_CLIENT` for the local preview. Rendered browser/device validation and real inbox receipt remain unverified. Follow the focused Website Collection section in `docs/RELEASE_CHECKLIST.md` before production promotion. Test normal and enlarged text, keyboard access, touch, reduced motion, phone/tablet/desktop layouts and the actual browsers/devices you support.

The Windows updater includes the pending Crestline design-options gallery, the collection and this journey. It defaults to local review, preserves a backup branch, checks the exact file scope, waits for GitHub Quality on the release commit and uses a normal non-force main push when `-Push` is requested. The existing GitHub integration cannot write this repo; the updater runs through the owner’s locally authenticated Git. A successful main push is not a verified Vercel deployment.
