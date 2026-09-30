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
} from "../src/data/website-collection.ts";
import { readTemplateShowcase } from "../src/lib/template-showcase.ts";
import { entryTemplateDemos } from "../scripts/lib/entry-template-config.mjs";

const expected = [
  ["mobile-detailing", 150, 1],
  ["flower-shop", 399, 3],
  ["auto-repair", 499, 4],
  ["streetwear-store", 699, 5],
  ["wheel-studio", 699, 5],
  ["jewellery-atelier", 999, 7],
];
test("retail enquiries preserve approved prices, contact scope and stable gallery ordering", () => {
  const gallery = categoryDesigns(categoryForIndustry("retail"));
  const ids = new Set(expected.map(([id]) => id));
  assert.deepEqual(
    filterDesigns(gallery, {})
      .filter((d) => ids.has(d.id))
      .map((d) => [d.id, d.startingPriceCad, d.pageCount]),
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
  for (const [id, price, pages] of expected) {
    const t = retailTemplate(id),
      d = websiteDesigns.find((design) => design.id === id);
    assert.equal(d.contactMode, price >= 699 ? "enquiry-form" : "direct");
    assert.equal(t.pages.length, pages);
    assert.deepEqual(entryTemplateDemos[id].routes, t.pages.map(retailPagePath));
    assert.equal(entryTemplateDemos[id].contactMode, d.contactMode);
    assert.deepEqual(
      filterDesigns(gallery, { industry: t.industry }).map((design) => design.id),
      [id],
    );
    const enquiry = collectionInquiry({ collection: "website", design: id, price: "1" });
    assert(enquiry.message.includes(`From $${price} CAD`));
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
