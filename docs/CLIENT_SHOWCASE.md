# Client showcase

## Visitor flow

Our Clients and its category indexes lead to one dedicated page per project at
`/projects/<project-id>`. Website and software examples open with screenshots and
**View live site**. The brief, delivery, implementation and hosting details follow.
Social media projects retain their actual content examples on their own pages.
The template collection continues to use **View live demo** for template actions.

The category routes remain available. Their project cards retain the original IDs
so previously shared category/hash links still lead to the matching project card.
All new internal links use the canonical individual project route.

## Images

Screenshot entries live with each project in `src/data/projects.ts` under `gallery`.
Add image files to `public/images/projects/<project-id>/`, then add an entry with
`src`, `alt`, `caption`, `width` and `height`. Use the image's actual dimensions.
The first gallery image is the directory cover. Original homepage and template
assets remain available to their existing consumers.

The gallery uses the same screenshot component as website templates. Visitors can
choose an image or open its full-size file; there is no new overlay to close and no
website walkthrough video to start. Keep captions factual and distinguish a real
website capture from a proposed design or illustrative mockup.

## Other design options

Tow-N-Go and McKenzie reference canonical collection entries through
`templateOptions.designIds`, plus their relevant `templateOptions.category`.
Prices, names and cover layouts are read from the collection's existing source.
Do not duplicate them in project data. These are alternative design directions for
prospective customers, not a claim that the client commissioned or approved them.

Crestline retains its supplied design explorations and a link into Construction &
Trades. Client branding and media belong to that client; a customer's template
personalization uses their own approved branding and material.

## Capture record — 2026-10-01

The following 1348 × 926 JPEGs were captured directly from the public website UI.
No content was retouched or substituted. Optional McKenzie ambience was dismissed
through its normal close control before capture. No form was submitted.

| Project asset                   | Page / visible view                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| `tow-n-go/homepage.jpg`         | `https://www.towandgotrailers.ca/` — homepage with the active October seasonal details   |
| `tow-n-go/fleet.jpg`            | `https://www.towandgotrailers.ca/rentals` — enclosed, dump and dovetail fleet cards      |
| `crestline/homepage.jpg`        | `https://www.crestlinepainting.ca/` — homepage and service navigation                    |
| `crestline/custom-homes.jpg`    | `https://www.crestlinepainting.ca/services/custom-homes` — service layout                |
| `mckenzie-house/homepage.jpg`   | `https://mckenziehousemassage.ca/` — homepage without the optional ambience prompt       |
| `mckenzie-house/treatments.jpg` | `https://mckenziehousemassage.ca/services/massage` — treatment, prices and booking links |
| `mckenzie-house/reviews.jpg`    | `https://mckenziehousemassage.ca/reviews` — client-story page                            |

All paths above are relative to `public/images/projects/`. These images document a
captured version; client websites may continue to change.

Tate's TV retains its supplied 2516 × 1315 playback/interface screenshot. Its
2552 × 1308 `tates-tv/programme-guide.webp` is an unaltered frame at 29 seconds from
the historical `public/media/projects/tates-tv-interface.mp4` recording, now retained
only in Git history. The frame was encoded as WebP for web delivery. That recording shows a September 11 guide; it is not represented as
a new October capture. The superseded website/software walkthrough files were removed during cleanup;
the derived screenshot is retained. Only the two social/content video sets remain
in `public/media/projects/`.

## Verification boundaries

The release checks cover page responses, canonical metadata, screenshot assets,
internal links, old category anchors, template recommendations, the two social
video examples and enquiry handoffs. A production build and source review do not
establish rendered browser compatibility. Review the new directory, each gallery,
keyboard image selection, small screens and enlarged text in actual browsers
before treating visual review as complete.
