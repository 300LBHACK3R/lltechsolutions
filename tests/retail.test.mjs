import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  retailTemplates,
  retailTemplate,
  retailPagePath,
  websiteDesigns,
  categoryForIndustry,
  categoryDesigns,
  filterDesigns,
  collectionInquiry,
  designPrice,
  templateSale,
} from "../src/data/website-collection.ts";
import { readTemplateShowcase } from "../src/lib/template-showcase.ts";
import { entryTemplateDemos } from "../scripts/lib/entry-template-config.mjs";

const saleNow = Date.parse(templateSale.startsAt);

const expected = [
  ["mobile-detailing", 150, 1, "direct"],
  ["flower-shop", 299, 3, "direct"],
  ["auto-repair", 399, 4, "direct"],
  ["streetwear-store", 499, 5, "enquiry-form"],
  ["wheel-studio", 499, 5, "enquiry-form"],
  ["jewellery-atelier", 600, 7, "enquiry-form"],
];
test("retail enquiries preserve approved prices, contact scope and stable gallery ordering", () => {
  const gallery = categoryDesigns(categoryForIndustry("retail"));
  const ids = new Set(expected.map(([id]) => id));
  assert.deepEqual(
    filterDesigns(gallery, {})
      .filter((d) => ids.has(d.id))
      .map((d) => [d.id, d.startingPriceCad, d.pageCount, d.contactMode]),
    expected,
  );
  assert.equal(gallery.length, 6);
  assert.deepEqual(
    filterDesigns(gallery, { industry: "retail" }).map((d) => d.id),
    ["flower-shop", "streetwear-store", "jewellery-atelier"],
  );
  assert.deepEqual(
    filterDesigns(gallery, { industry: "automotive" }).map((d) => d.id),
    ["mobile-detailing", "auto-repair", "wheel-studio"],
  );
  assert.equal(new Set(retailTemplates.map((t) => t.theme)).size, 6);
  for (const [id, price, pages, contactMode] of expected) {
    const t = retailTemplate(id),
      d = websiteDesigns.find((design) => design.id === id);
    assert.equal(d.contactMode, contactMode);
    assert.equal(t.pages.length, pages);
    assert.deepEqual(entryTemplateDemos[id].routes, t.pages.map(retailPagePath));
    assert.equal(entryTemplateDemos[id].contactMode, d.contactMode);
    assert.deepEqual(
      filterDesigns(gallery, { industry: t.industry }).map((design) => design.id),
      [id],
    );
    const enquiry = collectionInquiry(
      { collection: "website", design: id, price: "1" },
      websiteDesigns,
      saleNow,
    );
    assert(enquiry.message.includes(`Launch pricing: ${designPrice(d, saleNow)}.`));
    assert(enquiry.message.includes(`Regular starting price: $${price} CAD.`));
    assert(enquiry.message.includes("20% template sale."));
    assert(enquiry.message.includes(d.name));
    assert(!enquiry.message.includes("From $1 CAD"));
  }
  assert.deepEqual(
    filterDesigns(gallery, { sort: "price-high" })
      .filter((d) => ids.has(d.id))
      .map((d) => d.id),
    [
      "jewellery-atelier",
      "streetwear-store",
      "wheel-studio",
      "auto-repair",
      "flower-shop",
      "mobile-detailing",
    ],
  );
});

test("retail showcase screenshots stay isolated and demo URLs are validated", async () => {
  for (const { id } of retailTemplates) {
    const config = JSON.parse(
      await readFile(new URL(`../src/data/${id}-demo.json`, import.meta.url), "utf8"),
    );
    assert.equal(readTemplateShowcase(config, id).url, config.url);
    const image = {
      src: `/images/templates/${id}/home.webp`,
      alt: "Actual demo home page",
      caption: "Home",
      width: 1440,
      height: 1000,
    };
    assert.equal(readTemplateShowcase({ screenshots: [image] }, id).screenshots.length, 1);
    const other = retailTemplates.find((t) => t.id !== id).id;
    assert.equal(readTemplateShowcase({ screenshots: [image] }, other).screenshots.length, 0);
    assert.equal(readTemplateShowcase({ url: "javascript:alert(1)" }, id).url, null);
  }
});
