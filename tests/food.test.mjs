import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  foodTemplates,
  foodTemplate,
  foodPagePath,
  websiteDesigns,
  categoryForIndustry,
  categoryDesigns,
  filterDesigns,
  collectionInquiry,
} from "../src/data/website-collection.ts";
import { readTemplateShowcase } from "../src/lib/template-showcase.ts";
import { entryTemplateDemos } from "../scripts/lib/entry-template-config.mjs";

const expected = [
  ["food-truck", 150, 1],
  ["neighbourhood-cafe", 399, 3],
  ["artisan-bakery", 499, 4],
  ["pizzeria", 699, 5],
  ["catering-events", 699, 5],
  ["fine-dining", 999, 7],
];
test("food enquiries preserve approved prices, contact scope and stable gallery ordering", () => {
  const gallery = categoryDesigns(categoryForIndustry("food-hospitality"));
  const ids = new Set(expected.map(([id]) => id));
  assert.deepEqual(
    filterDesigns(gallery, {})
      .filter((d) => ids.has(d.id))
      .map((d) => [d.id, d.startingPriceCad, d.pageCount]),
    expected,
  );
  assert.equal(gallery.length, 6);
  assert.equal(new Set(foodTemplates.map((t) => t.theme)).size, 6);
  for (const [id, price, pages] of expected) {
    const t = foodTemplate(id),
      d = websiteDesigns.find((design) => design.id === id);
    assert.equal(d.contactMode, price >= 699 ? "enquiry-form" : "direct");
    assert.equal(t.pages.length, pages);
    assert.deepEqual(entryTemplateDemos[id].routes, t.pages.map(foodPagePath));
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
      "fine-dining",
      "pizzeria",
      "catering-events",
      "artisan-bakery",
      "neighbourhood-cafe",
      "food-truck",
    ],
  );
});

test("food showcase screenshots stay isolated and demo URLs are validated", async () => {
  for (const { id } of foodTemplates) {
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
    const other = foodTemplates.find((t) => t.id !== id).id;
    assert.equal(readTemplateShowcase({ screenshots: [image] }, other).screenshots.length, 0);
    assert.equal(readTemplateShowcase({ url: "javascript:alert(1)" }, id).url, null);
  }
});
