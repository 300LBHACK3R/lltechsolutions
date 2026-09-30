import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  transportTemplates,
  transportTemplate,
  transportPagePath,
  websiteDesigns,
  categoryForIndustry,
  categoryDesigns,
  filterDesigns,
  collectionInquiry,
} from "../src/data/website-collection.ts";
import { readTemplateShowcase } from "../src/lib/template-showcase.ts";
import { entryTemplateDemos } from "../scripts/lib/entry-template-config.mjs";

const expected = [
  ["courier-one-page", 150, 1],
  ["moving-company", 399, 3],
  ["auto-transport", 499, 4],
  ["equipment-rentals", 699, 5],
  ["cold-chain", 699, 5],
  ["freight-logistics", 999, 7],
];
test("transport enquiries preserve approved prices, contact scope and stable gallery ordering", () => {
  const gallery = categoryDesigns(categoryForIndustry("courier"));
  const ids = new Set(expected.map(([id]) => id));
  assert.deepEqual(
    filterDesigns(gallery, {})
      .filter((d) => ids.has(d.id))
      .map((d) => [d.id, d.startingPriceCad, d.pageCount]),
    expected,
  );
  for (const id of ["tow-n-go", "calgary-hot-shot"])
    assert(
      gallery.some((d) => d.id === id),
      `${id}: existing example preserved`,
    );
  assert.equal(new Set(transportTemplates.map((t) => t.theme)).size, 6);
  for (const [id, price, pages] of expected) {
    const t = transportTemplate(id),
      d = websiteDesigns.find((design) => design.id === id);
    assert.equal(d.contactMode, price >= 699 ? "enquiry-form" : "direct");
    assert.equal(t.pages.length, pages);
    assert.deepEqual(entryTemplateDemos[id].routes, t.pages.map(transportPagePath));
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
      "freight-logistics",
      "equipment-rentals",
      "cold-chain",
      "auto-transport",
      "moving-company",
      "courier-one-page",
    ],
  );
});

test("transport showcase screenshots stay isolated and demo URLs are validated", async () => {
  for (const { id } of transportTemplates) {
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
    const other = transportTemplates.find((t) => t.id !== id).id;
    assert.equal(readTemplateShowcase({ screenshots: [image] }, other).screenshots.length, 0);
    assert.equal(readTemplateShowcase({ url: "javascript:alert(1)" }, id).url, null);
  }
});
