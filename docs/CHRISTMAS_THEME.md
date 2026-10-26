# Christmas 2026 theme

The seasonal design keeps L&L's black, charcoal and gold identity, current business copy, client assets and template journeys. Shared decorations apply only to the main application; standalone template apps are unchanged.

## Seasonal switch

Set `christmasThemeEnabled` to `false` in `src/config/seasonal.ts` to remove the seasonal components, Scripture notes and theme attribute together. There is no visitor clock dependency or change to template promotion dates.

## Design and motion

- A shallow evergreen garland masthead and warm gold lights frame the existing navigation.
- A six-point Star of David ornament hangs over the homepage artboard. The nativity illustration separately depicts the Star of Bethlehem, Mary, Joseph, baby Jesus in the manger and a lamb.
- The nativity and Christmas greeting live inside the shared footer. The template collection still leads directly from its category strips into the footer.
- Snow uses 24 decorative CSS particles (12 on phones), no canvas, timers or animation library. Snow and lights obey the existing visitor motion switch; snow is omitted and lights are static with OS reduced motion. Decoration does not receive clicks or keyboard focus.
- Scripture details use native keyboard/touch-accessible disclosure controls, work without JavaScript, and expand in normal document flow. No Scripture is available only on hover.

## Artwork

The garland and nativity were generated specifically for this request with the image-generation tool on 26 October 2026, then resized and encoded to transparent WebP. No stock licence or external image request is required. Original business/client logos and screenshots were not altered.

- `public/images/seasonal/christmas-2026/garland.webp`: 1200 × 400, 177 kB.
- `public/images/seasonal/christmas-2026/nativity.webp`: 900 × 600, 119 kB; loaded lazily in the footer.

## Scripture sources

All quotations use the public-domain King James Version and retain references next to their text. They are stored together in `src/config/seasonal.ts`.

- [John 1:5](https://www.biblegateway.com/passage/?search=John+1%3A5&version=KJV): homepage introduction.
- [Proverbs 16:3](https://www.biblegateway.com/passage/?search=Proverbs+16%3A3&version=KJV): homepage closing invitation and services introduction.
- [Proverbs 3:6](https://www.biblegateway.com/passage/?search=Proverbs+3%3A6&version=KJV): contact sidebar.
- [Luke 2:11](https://www.biblegateway.com/passage/?search=Luke+2%3A11&version=KJV): shared nativity footer.

The theme changes presentation only. Pricing, payment/provider configuration, forms, catalogue data, real client content, and standalone demos are unchanged.
