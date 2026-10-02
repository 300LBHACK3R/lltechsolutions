# Summit Painting Studio — editing guide

This source edition keeps the Crestline reference design's four-column interactive service hero, blue/navy palette, responsive navigation, story panels, service cards, four service detail pages, project category index, four detailed gallery pages, and contact layout. It is a customer-editable Next.js App Router project, not a screenshot or an iframe.

## Run and build

Use Node.js 22 or newer. Run `npm install`, then `npm run dev`. Run `npm run typecheck` to check types and `npm run build` to generate `out/`. Upload the contents of `out/` to a static host with routing that matches the export configuration. Follow the packaged README and deployment configuration for clean URLs or directory index handling. There is no Next.js server runtime, database or environment-variable requirement. `next start` is not used for this static export.

## Change your content

- `src/data/services.ts`: service names, descriptions and images. Keep each service slug aligned with the detail copy in `src/app/services/[slug]/page.tsx`.
- `src/data/projects.ts`: fictional project entries, category labels, descriptions and gallery images. The 23 illustrative entries preserve the original gallery structure. Replace them with approved work or remove unneeded entries.
- `src/components/home/`: homepage sections and interactive service hero.
- `src/app/about/page.tsx`: story and process panels.
- `src/components/layout/`: editable text wordmark, navigation and footer.
- `src/components/contact/`: sample contact details and form fields.
- `src/app/globals.css`: original layout styling, colour variables, responsive breakpoints and the source-edition text wordmark.
- `src/app/layout.tsx`: page title, metadata and robots settings. Replace `https://example.com` with your domain and deliberately enable indexing after your launch content is ready.

## Included media and sample identity

Summit Painting Studio is fictional. No client logo, contact information, project photography, video, testimonial, credentials or production service connection is included. The two included WebP files are documented generated illustrative assets. They fill the original image slots, with deliberate repetition throughout the sample galleries. They are not photographs of completed painting work. Included images and text branding therefore differ from the Crestline live reference. System fonts require no remote font request.

Use your own approved images in `public/images/`, update their paths and alternative descriptions, and replace all fictional project content before publishing. The original desktop and mobile layout remains available to edit.

## Enquiry form

The sample form uses native required-field and email validation, displays an explicit local-only confirmation, and clears the fields. It does not make a network request, save personal information, send email or request a quote. Contact placeholders are inert. Connect a service you control, implement server-side validation and spam protection, and test delivery before presenting it as a working enquiry channel. A backend would require hosting/configuration beyond this static source edition.

## Routes

The source includes Home, About, Services, four service detail routes, Projects, four project gallery routes, and Contact (13 routes). Category route slugs are preserved from the reference. Original footer links that did not resolve to actual service routes have been corrected. Dynamic service and gallery routes are enumerated at build time with `generateStaticParams`.

## Reference provenance

Layout source: https://github.com/300LBHACK3R/Crestline-Painting at `e10ba187d78efd9b89277aba7e3ab27fc29bd6bf`.

The accompanying customer licence governs the supplied source. Third-party package licences remain applicable. The accompanying asset documentation identifies the included illustrative media.
