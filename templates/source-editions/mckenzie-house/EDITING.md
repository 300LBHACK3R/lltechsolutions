# Cedar House Wellness source edition

This is the McKenzie design adapted to a fictional sample practice. It preserves the original deep-green and gold theme, home/service cards, four detailed service routes, pricing, FAQ, contact, about and review layouts. The original business identity, client testimonials, logos, photos, videos and audio are excluded.

## Run and export

Use Node.js 22 or newer. Run `npm install`, `npm run dev`, and `npm run build`. The production build exports static files to `out/`; publish that directory to a static host. `npm run typecheck` validates the TypeScript routes and components. Static exports do not run a Next.js server.

## Personalize

- `src/lib/site.ts`: business name, location, contact details, booking link, hours, services, illustrative rates, billing and policies. Replace every sample value. Set your real site origin using the constant at the top of this file or the optional `NEXT_PUBLIC_SITE_URL` environment setting at build time. No environment file or secret is required for this sample.
- `src/app/page.tsx` and the other page files: editorial headings and page-specific copy. Replace `Your City`, `Your Neighbourhood`, `Your Region`, and practitioner placeholders across `src/` before launch.
- `src/app/globals.css` and page CSS modules: theme, typography, spacing, responsive layouts and motion. Fonts use system sans-serif and Georgia and do not require network font requests.
- `src/lib/reviews.ts`: editing prompts, not testimonials. Replace with permission-approved review content, verified attribution and any legally usable media, or remove cards. No sample rating or external review profile is supplied.
- `public/brand/`: editable SVG sample wordmark and decorative cedar motif. `public/images/`: two generated illustrative interiors. These are sample spaces, not photographs of an actual practice. The included asset licence describes their source.
- `src/components/ServicePreviewVideo.tsx`: retained media component interface currently renders an ordinary still photo. Original treatment videos and ambient audio are not supplied. Add your own licensed media only if you choose to implement a new player.

## Contact and booking behavior

`siteConfig.demoMode` starts as `true`. Phone, SMS and email actions stay at the local sample-contact section. The initial booking link is `/contact/#booking`; there is no live booking integration, enquiry form, delivery service, payment flow or analytics. The visible phone and `hello@example.com` address are reserved examples.

Replace the contact details and booking URL with your own destinations, then set `demoMode` to `false`. Change `waitlist.href` separately if you enable a real waitlist. Test those actions before publication. Search indexing and structured data are disabled while demo mode is enabled; review all metadata before turning it off. No API credentials belong in this static client project.

All service descriptions, prices, taxes, hours, insurance information and policies are illustrative and must be reviewed for your own business. The fictional name does not establish practitioner credentials or treatment claims.
