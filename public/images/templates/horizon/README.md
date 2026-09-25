# Landscape Contracting demo captures

The current four-page Landscape Studio demo uses a sample business and illustrative images. Its maintained source is in `src/components/collection/HorizonTemplate.tsx` and `templates/horizon-demo/`. Build it with `node scripts/prepare-horizon-demo.mjs`, then install dependencies and run the build in `build/horizon-demo`.

The following original Horizon Contracting Group captures are retained as design references, with their original metadata in `original-reference.json`. They are not screenshots of the new working demo and are no longer advertised as its gallery:

1. `hero.png` — 2048 × 1082
2. `services.png` — 2048 × 978
3. `gallery.png` — 2048 × 967

To add screenshots of the actual new demo, save them here with new names, such as `home-desktop.webp` or `contact-mobile.png`. Add their `src`, `alt`, `caption`, `width` and `height` to `src/data/horizon-demo.json`'s `screenshots` array. Use real dimensions and descriptions. PNG, WebP and JPEG are supported. The existing gallery displays configured captures automatically. With no captures, the catalogue and detail page use the maintained `HorizonCover` design overview; no separate cover image configuration is needed.

The demo `url` remains null until its public production alias is verified. The Landscape Demo publisher builds the maintained source, deploys only the standalone static export, checks all four public routes and adds the verified URL. The main L&L catalogue then exposes one View live demo action. Do not add Horizon as a client or reuse its identity in the sample business.
