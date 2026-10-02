# Trail & Co Rentals source guide

This is a customer-editable edition of the Tow-N-Go trailer-rental design. It retains the original page layouts, black/gold styling, rental categories, service selection, FAQ search and filters, image viewing, and enquiry-field flow. The sample business, fleet, service area and prices are fictional. This edition contains no original client logo, photographs, customer reviews, personal biography, contact details, analytics or email endpoint.

## Run and export

Use Node.js 22 or newer. Run `npm install`, `npm run dev`, then open the local address printed by Next.js. Run `npm run typecheck` and `npm run build` before publishing. The build produces `out/`, which can be served by a static host. `next start` is not used for a static export. No environment variables, API keys or external services are required.

## Customize

- `lib/site.ts`: business identity, site domain, contact details, social links and metadata. Phone, email and social links intentionally point to the placeholder contact panel. Change the display text and the matching destination together when your real details are ready.
- `components/layout/Navbar.tsx`: editable text wordmark and navigation. No client logo is included.
- `app/layout.tsx`: global sample notice and search-engine indexing defaults. Keep the notice until all fictional content is replaced; enable indexing only when the site is ready.
- `data/trailers.ts` and `data/trailerCategories.ts`: sample fleet, categories, descriptions, specifications and rates. Every sample uses illustrative artwork, not a photo of a particular trailer. Replace descriptions, ratings, towing requirements and safety information with equipment-specific, approved information.
- `data/servicePathways.ts`, `data/faqDirectory.ts` and `data/trailerCategorySeoContent.ts`: sample service descriptions and editable FAQ content. Verify your own policies, delivery arrangements, geographic coverage and legal requirements before publishing.
- `app/about/page.tsx`: company-story layout with editorial placeholders.
- `components/sections/ReviewsSection.tsx`: empty review slots. No supplied text is a customer endorsement. Add only genuine, approved reviews and remove placeholder indicators when appropriate.
- `data/projectGallery.ts` and `data/recentJobs.ts`: illustrative gallery and an initially empty customer-project dataset. The `approvedForWebsite` flag deliberately prevents unpublished customer projects from appearing.
- `components/contact/ContactForm.tsx`: local demo form. It supports service/trailer query-prefill, different route fields, add-ons and a local preview confirmation. It makes no network request, sends no email, stores no submission and creates no booking. Connect your own protected delivery service and update the status text before accepting real enquiries. A static export does not contain a server endpoint.
- `app/globals.css`: global styling. Tailwind utility classes in the original page/component files control the black/gold layout. System fonts avoid remote font requests.

The included generated `public/images/sample-rentals.webp` is repeated as placeholder artwork. It is an illustrative equipment-rental scene and must not be described as a real fleet or completed customer project. Supply your own approved imagery and update each alternative description when replacing it. Asset provenance is documented in the package asset notice.

The routes are Home, Rentals, three rental categories, Services, Gallery (`/recent-jobs`), About, Reviews, FAQ and Contact. Inventory, payments, booking, email delivery, customer accounts, tracking and external integrations are not included.
