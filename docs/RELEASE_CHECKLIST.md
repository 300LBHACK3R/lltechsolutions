# Release checklist

## Before review

- Use an isolated worktree or branch and preserve existing local work.
- Fetch the current main before applying a release. Match the installer manifest to the release being applied; reconcile later upstream work without overwriting it.
- When retiring routes, stop the local development server before installation. The release installer preserves stale `.next/dev/types` under its private backup so deleted routes cannot block typechecking; other caches and source files stay untouched.
- Run `npm ci`, formatting, `npm run check`, dependency audit, production build and `npm run smoke`.
- Review the diff, including deleted files. Originals are recoverable from Git history.

## Browser review required

- Inspect 320/375/390/430 px phones, 768/1024 px tablets, 1366/1440 px laptops, 1920/2560 px desktops and a 3840 px large-display layout. Include portrait, short landscape viewports, 200% zoom and enlarged system text.
- Use current Chrome/Edge, Firefox and Safari, including real iOS and Android devices and an actual TV browser/remote when available. The installed Next.js documents Chrome/Edge/Firefox 111+ and Safari 16.4+ as its default browser baseline; this does not establish support for every older smart-TV browser.
- Check navigation, menu close/Escape, keyboard focus, the homepage work anchor, project-card links, touch-only operation, project anchors and external links. The Home menu item is removed; the header and footer logos still return home.
- Check contact service preselection, native validation, failure messaging and retained input.
- Check OS reduced motion, the visitor motion switch, persistence across pages, blocked local storage, no hover-only actions and usable content with JavaScript unavailable. Changing motion preferences should stop active effects without hiding content.
- Inspect every page for overflow, missing images, unreadable type and console errors.
- Check all six navigation destinations, both home logos, the three client website previews and Tate’s TV software preview, Tow-N-Go's monthly partnership link and the dedicated Reviews layout. Confirm starting prices of $150+ CAD and $149+ CAD/month on Pricing.
- Check the two social/content case-study videos: play/pause, seeking, full screen, portrait orientation, browser back, native keyboard controls and failure fallback. Confirm there is no autoplay. Website/software projects use screenshot galleries: check every thumbnail, visible selection, keyboard operation, image proportions, scrolling and full-size links, including without JavaScript.
- Confirm Our Clients navigation and the absence of the retired personal website in public copy and structured data. Review any new Google quotations against their original source; pending sources are documented in `REVIEW_SOURCES.md`.

## Before production

- Set RESEND_API_KEY, CONTACT_TO_EMAIL and a verified CONTACT_FROM_EMAIL in the intended Vercel environment.
- Verify live inquiry receipt and reply-to with Tate's explicit authorization. A success UI alone does not prove inbox delivery.
- Review privacy/terms wording against actual operating practices and provider setup.
- Check project images against the latest live clients; McKenzie and Tow-N-Go were refreshed in this release; other supplied screenshots may reflect earlier designs.
- Verify HTTPS, canonical URLs, robots, sitemap and the 1200×630 social share image on the deployed preview/production domain.
- Confirm GitHub Quality workflow is green for the actual review commit.
- Merge/publish only after the review and authorization. Do not pop an old stash over the release.
- After launch, confirm the production commit and repeat the critical link and inquiry checks before advertising the new site.

## Website Templates journey

- Confirm the 20% template sale uses the regular base price on every pricing surface and enquiry, including McKenzie. Before `2027-01-01T07:00:00Z`, the sale range is $120–$480 CAD with regular prices shown beside it; at and after expiry, automatically use $150–$600 CAD regular prices. Contact scopes use regular-price bands throughout this checklist; the promotion changes no features, extras, care or service entry prices.
- Preview `/website-collection`, each `/website-collection/category/[category]` gallery, every current design detail page, `/website-collection/compare`, `/website-collection/start?design=pigment` and `/website-collection/brief`.
- For Painting Company, check the brush underline on Home/Services/Projects/Contact, the three accent colours and service selection carried into the sample estimate. Confirm the real L&L enquiry opens with Painting Company selected.
- Nail & Esthetics Studio (`still`) and One-page Massage Website (`massage-one-page`) use dedicated covers or actual screenshots and a verified external View live demo link. There must be no inline Try this design here dialog or business-name editor. Ensure no demonstration sends a salon or massage enquiry; its L&L handoff must retain the chosen template. Add only real supplied walkthroughs and measured reports.
- Confirm navigation is Website Templates, Services, Our Clients, Pricing, Reviews, Contact. The former main-site /process URL must redirect to /services and stay out of the sitemap. Landing-page categories should open distinct galleries, not a flat catalogue. Empty categories must have an honest message and noindex metadata.
- On Website Templates, confirm the approved headline and introduction lead directly into the business-category photo strips, with no large client preview selector or oversized gap. Follow each category link; the shared footer should follow the category cards without extra marketing sections or a How it works anchor. Check visible keyboard focus, readable text, image loading and overflow at phone/tablet/desktop widths, including with JavaScript disabled, reduced motion and forced colours.
- In each populated gallery, apply Price: low to high and Price: high to low; confirm the selected option, card order and industry/design-level filters work together, including without JavaScript. Check the filter controls on narrow screens. Review `CURRENT_TEMPLATE_PRICING.md` and the current category tables before publishing. All 45 catalogue offers must have numeric regular starting prices from $150–$600 CAD, with unchanged page counts, features and canonical contact modes.
- In Construction & Trades, filter Painting + Signature, then Plumbing. Compare two and three designs. Open shared comparison links, clear selections and check an empty match. Concepts without a price must never show $0 or appear under a numeric price ceiling.
- On the guided enquiry, choose extras and care, write contact details on Review, go Back to change a choice and return. Your typed contact details must remain. The sent message must contain the current preferences and the typed notes. Test failed delivery with details retained; verify actual inbox receipt separately.
- In the brief, fill a section, request help, advance/back, save, reload and explicitly restore. Check cancellation of restore and clear actions, restricted/private browser storage, export filename, line breaks and no network submission. Check that unsupplied fields say To discuss.
- “Make this my website” must reach Contact with the chosen template name in the editable message. Category-only enquiries must preserve the broad category without guessing a specific business type.
- Utility pages and empty categories must be noindex and absent from the sitemap. Design detail pages must have unique metadata, a canonical URL, CreativeWork schema and sitemap entries.
- Visual review remains necessary: the supported browser blocked this environment’s local preview. Automated HTTP checks do not establish rendered layout or inbox delivery.

## Painting showcase / separate demo

- Click the Painting Company name and cover; both must open the detail page from the top.
- Add real screenshots using `public/images/templates/pigment/README.md`; test tall captures, thumbnail buttons, keyboard access and full-size links.
- Deploy `build/painting-demo/out` as a separate static project and verify public access. Record only its actual HTTPS URL in `src/data/painting-demo.json`.
- On that live demo, check Home, Services, Projects, Contact, refresh and browser Back. Test the brush effect, colour controls, reduced motion and the real L&L enquiry link.
- Complete Chrome, Firefox, Safari and real mobile rendering review before advertising universal compatibility. Build and HTTP checks alone do not establish that result.

## Premium homepage and template details

- Check the visual studio hero, its two real case-study links, the work jump link, four project cards and concise final CTA. Check all three next-step links: templates, services and clients. The gallery should be two columns from 760 px and one column below, with one named main link per project and a separate Tow-N-Go monthly partnership link. Preserve the client/studio distinction. The portfolio screenshots must keep their proportions and full content. The opening composition pairs the real Tow-N-Go website with its social-content poster; no autoplay carousel or video. Verify visible keyboard focus, 200% zoom, reduced motion, motion paused and JavaScript disabled.

- Check the compact template heading, price and actions appear before its design cover or screenshots. Scope, extra-page/custom-feature pricing, optional care and existing evidence must remain discoverable below.
- Check the hero captions remain unobstructed: the decorative code badge is removed, desktop preview angles are restrained, and both card heights contribute to the section layout. At 479 px and below, the cards use separate rows and the social poster sits beside its caption. Check these transitions at 479/480 px and with enlarged text; labels and focus rings must remain visible above the next-step links.
- Confirm the homepage flows from the visual opening and compact next-step navigation into the work gallery, with no restored long service strip, client-name bar or showcase footnote. Verify pointer movement is restrained on a fine-pointer device and the composition stays still on touch, motion paused and reduced-motion settings; all image links must work without JavaScript. The global footer retains the motion control.
- Review all four homepage project previews, image aspect ratios, related-work links and the final project invitation. Keep studio software ownership distinct from client website work.
- Confirm Construction & Trades and Home & Property both include the seven-page Excavation & Landscaping template at From $600 CAD. Sorting and the contact prefill must retain that canonical price.
- On the separate earthworks demo, test Home, Services, Projects, Materials, Process, FAQ and Contact, refresh and browser Back. Test the visual service and materials selectors, project filters, FAQ expand/collapse, project-outline choices, clipboard success/failure and reduced motion. The outline is local only and does not submit a booking.
- Verify only the actual public earthworks deployment URL is recorded in `src/data/earthworks-demo.json`. Keep its link absent until verified; deploy only to the separate `ll-earthworks-template` project.

## Lawn Care and contact scope

- Confirm $399, four pages and direct contact on the Lawn Care card, detail, comparison and enquiry. Check both trades and property categories. Low/high price ordering must keep Lawn Care before Painting Company within the $399 group.
- Check direct contact on $150–$399 new-build offers and standard protected enquiry form setup on current $499–$600 offers. Optional form upgrades, monthly care and provider fees must remain separately scoped. Original client case studies must retain their facts.
- Build the standalone Lawn Care export and run its checker. Review Home, Services, Our Work and Contact at narrow and wide widths. Check all nav links, service anchors, focus outlines and L&L enquiry handoff. The reserved sample email must remain labelled and inert.
- Review the grass/mower animation with motion on, paused and reduced motion. Navigation must remain usable with animation disabled, keyboard input and JavaScript disabled.
- Confirm no public live-demo link is shown before a verified deployment URL is configured. Review real screenshots once supplied. Static demo routes require noindex and the maintained security headers.
- Browser rendering, real mobile/Safari/Firefox behavior, Windows script execution and public deployment require separate verification; build and HTTP checks alone do not establish them.

## Landscape Contracting reference

- Confirm six Construction & Trades entries, with Landscape Contracting first in the $399 group, followed by Lawn Care and Painting Company. It also appears in Home & Property. Its detail and comparison show four pages; its enquiry preserves the canonical price and direct-contact selection.
- Build the standalone Landscape Studio export and run its checker. Review Home, Services, Projects and Contact at narrow and wide widths. Check navigation, project filters, service details, coverage anchors, keyboard focus, motion preferences and the real L&L enquiry handoff. Sample contractor contacts stay clearly labelled and inert.
- Keep the original Horizon captures as reference files. The catalogue's maintained cover and any new screenshots should represent the new Landscape Studio demo. Preserve the independent-concept label; Horizon is not a client record.
- Keep `src/data/horizon-demo.json`'s URL null until the publisher verifies the separate demo's public alias and all four routes. Check the live demo button after the main L&L deployment is Ready.

## Individual client and studio case studies

- Open `/projects`, `/projects/web-builds`, `/projects/software-development` and `/projects/social-media-management`. The directory has four screenshot-led website/software cards and two compact content partnership links; the category indexes have three, one and two entries respectively, without full case-study bodies or video players. Check the preserved category hash bookmarks for all six project IDs.
- Open each standalone route directly and through its directory/category card: `/projects/tow-n-go`, `/projects/crestline`, `/projects/mckenzie-house`, `/projects/tates-tv`, `/projects/tow-n-go-digital` and `/projects/mckenzie-digital-launch`. Confirm its unique title, description, canonical URL and sitemap entry. Homepage, related-work and client-template links must use these canonical routes.
- Check at least two distinct, accurate screenshots on each of the first four details, with readable captions, native thumbnail buttons and working full-size links. They must have no video player. Tow-N-Go and Crestline’s Website Templates references use the shared screenshot gallery; McKenzie’s reference retains its original matching image. Only the two content details retain their supplied videos.
- Verify that every detail explains the brief, work, delivery, project scope and implementation, with client/studio ownership and ongoing/completed scope accurate. Keep ClinicSense booking context on McKenzie and the software/media architecture on Tate’s TV.
- Check Other design options on all three website case studies. Crestline retains its three original image options and a Construction & Trades link. Tow-N-Go links to Equipment Rentals, Auto Transport and Calgary Hot Shot plus Transport & Logistics. McKenzie links to One-page Massage, Nail & Esthetics Studio and Medical Spa plus Health & Wellness. These are alternative directions or template references; never claim a client chose, approved or rejected an option without supplied evidence.
- Review phone, tablet and desktop layouts, JavaScript unavailable, reduced motion, keyboard focus, enlarged text and image loading. Verify that the delivered stylesheet contains the client-showcase, detail, card and gallery rules; HTTP checks alone do not establish rendered layout.

## McKenzie client reference and consistent actions

- Confirm individual `/projects/{id}` case studies label external website/software actions View live site, including Tate’s TV and the content partnerships’ website links. Website Templates retain View live demo, including real client references.
- Confirm `/website-collection/mckenzie-house` presents McKenzie House Massage as live client work with its matching original image, actual website and client-story link. Its template page must not contain a video player. The standalone `/projects/mckenzie-house` case study has a real screenshot gallery; the launch-content video belongs on `/projects/mckenzie-digital-launch`. Health & Wellness must show the same identity and matching image.
- Confirm the catalogue, comparison, guided enquiry and Contact use McKenzie’s $399 CAD regular starting price ($319.20 during the sale) for a similar new website using supplied content. McKenzie sorts with the $399 group and retains direct contact; do not reuse the historical approximately $1,000 combined website/photo/video fee as its template price.
- Explain the original website, on-site photography, filming, editing and media implementation scope. New production, forms and ongoing care require their own agreed scope and price; do not publish a client's historical invoice as a new offer.
- The generic wellness demo is archived. Its preparation and capture scripts must stop before modifying output; old publishers must not reconnect it to McKenzie's catalogue URL. Keep archived source and captures available for reference. This update does not delete the separate Vercel deployment.

## Nail & Esthetics and One-page Massage offers

- Confirm Nail & Esthetics Studio remains at `/website-collection/still`, belongs to Beauty & Personal Care in Health & Wellness, and shows $299 CAD with three pages: Home, Services and Contact. Old bookmarks must select this current offer without a duplicate Massage Practice listing.
- Confirm `/website-collection/massage-one-page` shows $150 CAD and one scrolling page. Its agreed starting scope uses supplied branding/content, up to three treatments, a short about section and direct contact or an external booking link. It does not promise an enquiry API, integrated booking, extra pages or ongoing management.
- On Pricing, check the visible $150+ CAD website entry and its metadata. Social management remains $149+ CAD/month and software remains quoted. Template prices follow the approved current schedule. Catalogue, detail, comparison, proposal and contact prefills must agree; a URL parameter cannot change the price or contact scope.
- In Health & Wellness, keep the $150 massage and $299 beauty scopes distinct from the four newer clinic/nail/hair offers. The current complete sort order is recorded in the expansion checklist below. McKenzie is a $399 starting offer and sorts after Hair Salon within their equal-price group in either direction.
- Build and check both static demo exports. In Nail & Esthetics, test Home, Services and Contact, direct route refresh, browser Back and the L&L enquiry handoff. In One-page Massage, test every section anchor, header navigation and L&L enquiry handoff. Sample identities, imagery and contact/booking layouts must remain clearly labelled; do not send pretend practice enquiries.
- Publish the demos only to the separate `ll-beauty-template` and `ll-massage-one-page` Vercel projects. Verify actual public production URLs, required pages, local assets, noindex and security headers before connecting View live demo. Never use the main L&L project for a demo or advertise an unverified alias.
- Review covers, screenshots, text, menu behavior, keyboard focus and reduced motion on mobile and desktop, including Chrome, Firefox and Safari. Source builds and HTTP checks do not establish rendered browser compatibility.
- The `LL_Beauty_Massage_Templates_Release.zip` workflow validates and applies source changes, publishes the two separate demos and records verified live links. A successful source push or demo publication does not confirm that L&L production has finished deploying; verify its matching Vercel deployment separately.

## Health & Wellness expansion

- Confirm `medical-spa` is $600 CAD/six pages/Flagship, `artsy-nails` is $499 CAD/four pages/Premier, `hair-salon` is $399 CAD/four pages/Signature, and `hair-one-page` is $150 CAD/one page/Essential. Check all four cards, detail pages, comparison, guided enquiry and Contact. Altered price, tier, industry or contact-mode query parameters must not change canonical enquiry scope.
- Check default numeric low-to-high order: `massage-one-page`, `hair-one-page`, `still`, `hair-salon`, `mckenzie-house`, `artsy-nails`, `medical-spa`. High-to-low reverses price groups and preserves source order within both the equal $150 and $399 pairs. Medical Spa filtering shows only the clinic; Hair Salon shows the two hair offers; Beauty & Personal Care shows `still` and `artsy-nails`. The new offers must stay out of unrelated galleries.
- Confirm `still` is still $299/three pages, `massage-one-page` is still $150/one page, and all other offers match the current pricing schedule. McKenzie remains an image-led client reference with its real website and a $399 starting price for a similar new website using supplied content; no fictional clinic or hair imagery replaces client assets. Keep the six-item main navigation and compact homepage unchanged.
- Run the four prepare/build/export-check flows documented in `WEBSITE_COLLECTION.md`. Verify Medical Spa Home/Treatments/Consultation/The Clinic/FAQs/Contact, Artsy Nails Home/Services/The Studio/Contact, Hair Salon Home/Services/Our Salon/Contact, and every one-page hair section anchor. Check direct route refresh, browser Back, mobile navigation, current-page state, keyboard focus, interactive selectors and the selected-template L&L handoff.
- Review the fictional/illustrative disclosure on every demo. Sample business contact details must stay inert. Medical-spa content must not imply real credentials, client testimonials, treatment results or a working clinic. Forms on the medical-spa and nail demos must validate locally and confirm that no email or booking was sent; confirm that submissions make no external request and that invalid inputs receive useful feedback.
- Keep the $499/$600 standard enquiry-form launch scope clear: Resend and verified sending-domain configuration, validation, spam controls and an initial delivery test are included when launching the customer's site. Actual inbox delivery is not claimed for the static demo. The $150/$399 hair offers include direct contact or an external booking link; form upgrades and ongoing care remain separately quoted.
- Check matching cover styles in Health & Wellness and all four details. Keep each real screenshot under `public/images/templates/<catalogue-id>/`; missing captures use the correct cover. Do not show View live demo until the actual publicly accessible production URL is verified in its matching JSON config.
- Publish only to the separate `ll-medical-spa-template`, `ll-artsy-nails-template`, `ll-hair-salon-template` and `ll-hair-one-page-template` projects. Verify each public route, local asset, noindex policy, canonical URL and maintained security header. Record the deployed demo revision and independently confirm the matching main-site production deployment.
- Review every new cover and demo at 320/375/390 px phone, tablet and desktop widths, short landscape, 200% zoom, keyboard-only and touch input. Check reduced motion, JavaScript unavailable, readable type, visible focus, menu reflow and horizontal overflow. Include Chrome, Firefox and Safari; record browsers and widths actually observed. Source, build, export and HTTP tests do not establish this visual review or email delivery.

## Template purchase choices and managed checkout

- Check all 45 detail pages and their category/comparison cards: a verified View live demo action comes first, Personalize & launch second, then an outlined button literally labelled Purchase with its lower price and adjacent Code only context. Without a verified demo URL, retain an accurate template/preview action. The main price includes L&L personalization and launch; the source price covers files/instructions and self-managed implementation. Five reference editions must clearly exclude original business identities, private client files, original media, testimonials and connected services. Existing source-version enquiry bookmarks remain supported. Photography/video production is separately quoted.
- Build and validate the intended 44-package preparation set before private upload. Confirm that Calgary Hot Shot still cannot charge without its missing matching source, reviewed customer package and verified private manifest record. Every source offer must fail closed when its archive or payment/email/storage settings are unavailable; a visible Purchase link does not establish delivery readiness.
- Follow Personalize & launch. The 42 fixed-scope offers collect the business brief only when Stripe/email are configured; the other three agree scope and price before booking. Missing configuration must show a working selected-design enquiry, never pretend to charge or submit an order.
- Run managed-commerce tests and follow the provider checks in `docs/MANAGED_TEMPLATE_CHECKOUT.md`. A signed, verified payment must notify the fixed owner inbox with the purchased scope and business brief, and send the buyer a separate confirmation with a reply-by-email handoff for approved photos, logo and website content. Verify both accepted sends and actual inbox delivery. Failed or repeated events must not notify unpaid orders or repeatedly confirm paid ones.
- Review the enabled form, hosted payment return and confirmation on desktop/mobile with keyboard, zoom and form errors. Automated HTTP checks do not establish browser rendering or live provider delivery.
