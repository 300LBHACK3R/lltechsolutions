# Current template pricing

The approved October 1, 2026 catalogue has 45 offers, all with numeric regular starting prices from $150–$600 CAD before applicable taxes. `startingPriceCad` in `src/data/website-collection.ts` remains the canonical regular price used to derive pricing for cards, details, comparisons, guided enquiries, contact prefills and standalone demo handoffs.

All 45 template starting prices receive 20% off until January 1, 2027 at midnight in Alberta (`2027-01-01T07:00:00Z`). Sale starting prices range from $120–$480 CAD, calculated from the regular base price and rounded to cents. Apply the sale only before that instant and return automatically to regular prices at or after it. Keep the regular price visible beside the sale price. The discount applies only to the template starting price; extras, original media, integrations, provider charges and ongoing care are outside the promotion. Service entry prices and historical client costs remain unchanged.

| Previous template starting price (CAD) | Approved regular starting price (CAD) | Sale starting price (CAD) |
| -------------------------------------: | ------------------------------------: | ------------------------: |
|                                   $150 |                                  $150 |                      $120 |
|                                   $399 |                                  $299 |                   $239.20 |
|                                   $499 |                                  $399 |                   $319.20 |
|                                   $699 |                                  $499 |                   $399.20 |
|                                   $899 |                                  $549 |                   $439.20 |
|                         $999 or $1,000 |                                  $600 |                      $480 |
|              McKenzie: quoted / `null` |                                  $399 |                   $319.20 |

This approval changes starting prices only. Page counts, features, tiers, contact modes, assets, template IDs and demo destinations retain their existing scope. Contact-scope price ranges always refer to regular base prices: the $150–$399 offers use direct contact; the $499–$600 offers include standard enquiry form setup at customer launch. The sale does not downgrade contact scope. `contactMode` defines each offer, and query parameters cannot change its scope. Optional forms on direct-contact offers, extra pages, advanced workflows, original content, new media production and ongoing care are separately quoted. Domains, hosting and provider charges remain separate.

McKenzie’s $399 starting price covers a similar new website using the prospect’s supplied content, with pages and features agreed before booking. Its real-client identity and original media remain reference material. Heather’s approximately $1,000 CAD historical project combined the website, on-site photography, filming, editing and media implementation; that historical figure stays unchanged and does not include new production or care in the $399 offer.

Service entry prices remain website development from $150 CAD, social management from $149 CAD/month and software quoted after discovery. Their canonical source remains `src/data/investments.ts`.

Current regular-price offer tables are maintained in [Website Templates](WEBSITE_COLLECTION.md), [Legal & Professional](LEGAL_PROFESSIONAL_TEMPLATES.md), [Home & Property](HOME_PROPERTY_TEMPLATES.md), [Transport & Logistics](TRANSPORT_LOGISTICS_TEMPLATES.md), [Food & Restaurants](FOOD_RESTAURANTS_TEMPLATES.md) and [Retail & Automotive](RETAIL_AUTOMOTIVE_TEMPLATES.md). The first table covers the original 15 offers and client references; the five category guides cover six additional offers each. Apply the temporary sale above to those regular prices.

Default sorting remains numeric low to high, preserving source order at equal prices in either direction. McKenzie is now part of the $399 group, after Hair Salon in Health & Wellness; it is no longer an unpriced offer sorted last. Future unpriced records retain the existing quoted-price fallback.

Dated verification reports and historical release records retain the prices and results that applied to those revisions. They do not supersede this schedule or establish testing, publication or deployment of the repriced revision. Use the [release checklist](RELEASE_CHECKLIST.md) for the current revision.
