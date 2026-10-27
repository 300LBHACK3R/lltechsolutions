# Christmas 2026 theme

The seasonal design keeps L&L's black, charcoal and gold identity, current business copy, client assets and template journeys. Shared decorations apply only to the main application; standalone template apps are unchanged.

## Seasonal switch

Set `christmasThemeEnabled` to `false` in `src/config/seasonal.ts` to remove the seasonal components, Scripture notes and theme attribute together. There is no visitor clock dependency or change to template promotion dates.

## Design and motion

- The garland, greeting wreath, brand and navigation share one sticky header. The separate Christmas masthead is removed. Continuous evergreen trim runs across the header top; the wreath sits beside the logo and desktop links, and beneath the logo/menu row on narrow phones. Both keep soft white fairy lights with gentle staggered twinkles.
- A strand of glossy vintage multicolour C7/C9-style bulbs hangs from the same header’s lower edge. Most bulbs stay steady; selected bulbs dim irregularly at different intervals.
- A six-point Star of David ornament hangs over the homepage artboard. The nativity illustration separately depicts the Star of Bethlehem, Mary, Joseph, baby Jesus in the manger and a lamb.
- The nativity and Christmas greeting live inside the shared footer. The template collection still leads directly from its category strips into the footer.
- Snow uses 72 decorative CSS particles (36 on phones) with different sizes, speeds, opacity and drift. A shallow layered snowbank sits along the viewport bottom beside a snowman whose separate twig arm waves with pauses. No canvas, timers or animation library are added.
- All effects obey the existing visitor motion switch and global OS reduced-motion handling. Snow is omitted under OS reduced motion; the snowman, snowbank and lights remain static. Decorations never receive clicks or keyboard focus. Extra footer padding keeps the final links above the bank.
- The nativity uses more natural faces, fabric and timber, with restrained star and manger glows.
- Scripture details use native keyboard/touch-accessible disclosure controls, work without JavaScript, and expand in normal document flow. No Scripture is available only on hover.

The greeting and garland remain server-rendered components passed into the interactive header through ReactNode slots. The existing menu behavior is unchanged; no scroll listeners or new client-side animation code are added. Header-aware anchor offsets keep target content below the decorations.

## Artwork

The garland, wreath, snowman layers and nativity were generated specifically for this request with the built-in image-generation tool on 26 October 2026 (Alberta), then resized and encoded to transparent WebP. The snowman sprite sheet was split into separate body and twig-arm assets for CSS animation. No stock licence or external image request is required. Original business/client logos and screenshots were not altered.

- `public/images/seasonal/christmas-2026/garland.webp`: 1200 × 400, 177 kB.
- `public/images/seasonal/christmas-2026/nativity-lifelike.webp`: 900 × 600; loaded lazily in the footer.
- `public/images/seasonal/christmas-2026/wreath.webp`: 880 × 440.
- `public/images/seasonal/christmas-2026/snowman-body.webp`: 380 × 627.
- `public/images/seasonal/christmas-2026/snowman-arm.webp`: 215 × 275.

Final artwork direction: match the existing realistic evergreen garland with a wide oval wreath, gold baubles, small burgundy ribbons and soft white lights, leaving a generous transparent centre for live text. Create a friendly textured snowman with a black hat/gold band and tartan scarf, then separate its raised twig arm while preserving its face and materials. Reinterpret the original nativity with natural human faces and woven fabric, preserving Mary, Joseph, the swaddled baby in the manger, lamb, rustic roof and Star of Bethlehem; use warm manger lighting and transparent surroundings. No text or logos are baked into any generated artwork.

## Scripture sources

All quotations use the public-domain King James Version and retain references next to their text. They are stored together in `src/config/seasonal.ts`.

- [John 1:5](https://www.biblegateway.com/passage/?search=John+1%3A5&version=KJV): homepage introduction.
- [Proverbs 16:3](https://www.biblegateway.com/passage/?search=Proverbs+16%3A3&version=KJV): homepage closing invitation and services introduction.
- [Proverbs 3:6](https://www.biblegateway.com/passage/?search=Proverbs+3%3A6&version=KJV): contact sidebar.
- [Luke 2:11](https://www.biblegateway.com/passage/?search=Luke+2%3A11&version=KJV): shared nativity footer.

The theme changes presentation only. Pricing, payment/provider configuration, forms, catalogue data, real client content, and standalone demos are unchanged.
