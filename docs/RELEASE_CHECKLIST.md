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
- Check navigation, menu close/Escape, keyboard focus, featured project tabs (arrows/Home/End), touch-only operation, project anchors and external links. The Home menu item is removed; the header and footer logos still return home.
- Check contact service preselection, native validation, failure messaging and retained input.
- Check OS reduced motion, the visitor motion switch, persistence across pages, blocked local storage, no hover-only actions and usable content with JavaScript unavailable. Changing motion preferences should stop active effects without hiding content.
- Inspect every page for overflow, missing images, unreadable type and console errors.
- Check all six navigation destinations, both home logos, the three client website previews and Tate’s TV software preview, Tow-N-Go's monthly partnership link and the dedicated Reviews layout. Confirm starting prices of $399+ CAD and $149+ CAD/month on Pricing.
- Check all six inline previews: play/pause, seeking, full screen, portrait orientation, browser back, native keyboard controls and failure fallback. Confirm there is no autoplay or cross-tab launch when selecting a project preview.
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

- Preview `/website-collection`, each `/website-collection/category/[category]` gallery, every current design detail page, `/website-collection/compare`, `/website-collection/start?design=pigment` and `/website-collection/brief`.
- For Painting Company, check the brush underline on Home/Services/Projects/Contact, the three accent colours and service selection carried into the sample estimate. Confirm the real L&L enquiry opens with Painting Company selected.
- Massage Practice retains the inline concept: try a short and a long business name, Phone/Fit screen and every page button. Painting, plumbing and earthworks now use screenshots or a labelled cover plus a verified external live-demo link; the duplicate Try this design here dialog is removed. Ensure no pretend enquiry is sent by a demonstration. Add only real supplied walkthroughs and measured reports.
- Confirm navigation is Website Templates, Services, Our Clients, Pricing, Reviews, Contact. The former main-site /process URL must redirect to /services and stay out of the sitemap. Landing-page categories should open distinct galleries, not a flat catalogue. Empty categories must have an honest message and noindex metadata.
- On Website Templates, confirm the approved headline and introduction lead directly into the business-category photo strips, with no large client preview selector or oversized gap. Follow the category links and the **How it works** anchor; its process strip must appear after all categories and stack on a phone. Check visible keyboard focus, readable text, image loading and overflow at phone/tablet/desktop widths, including with JavaScript disabled, reduced motion and forced colours.
- In each populated gallery, apply Price: low to high and Price: high to low; confirm the selected option, card order and industry/design-level filters work together, including without JavaScript. Check the filter controls on narrow screens. Review the starting prices in `WEBSITE_COLLECTION.md` before publishing.
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

- Check the compact template heading, price and actions appear before its design cover or screenshots. Scope, extra-page/custom-feature pricing, optional care and existing evidence must remain discoverable below.
- Confirm the homepage flows from hero and project tabs directly to the work section, with no repeated service strip, client-name bar or showcase footnote. The global footer retains the motion control.
- Review all four homepage project rows, image aspect ratios, related-work links and the final project invitation. Keep studio software ownership distinct from client website work.
- Check all three featured-project tabs with touch and keyboard; the first project must remain visible without JavaScript. There is no autoplay.
- Confirm Construction & Trades and Home & Property both include the seven-page Excavation & Landscaping template at From $1,000 CAD. Sorting and the contact prefill must retain that canonical price.
- On the separate earthworks demo, test Home, Services, Projects, Materials, Process, FAQ and Contact, refresh and browser Back. Test the visual service and materials selectors, project filters, FAQ expand/collapse, project-outline choices, clipboard success/failure and reduced motion. The outline is local only and does not submit a booking.
- Verify only the actual public earthworks deployment URL is recorded in `src/data/earthworks-demo.json`. Keep its link absent until verified; deploy only to the separate `ll-earthworks-template` project.
