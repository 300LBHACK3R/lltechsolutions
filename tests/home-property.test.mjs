import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  homePropertyTemplates,
  homePropertyTemplate,
  homePropertyPagePath,
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
  ["home-cleaning", 150, 1, "direct"],
  ["window-care", 299, 3, "direct"],
  ["home-organizing", 399, 4, "direct"],
  ["interior-studio", 499, 5, "enquiry-form"],
  ["property-management", 499, 5, "enquiry-form"],
  ["real-estate", 600, 7, "enquiry-form"],
];
test("Home & Property adds six distinct offers without losing existing landscaping examples", () => {
  const gallery = categoryDesigns(categoryForIndustry("cleaning"));
  const ids = new Set(expected.map(([id]) => id));
  assert.deepEqual(
    filterDesigns(gallery, {})
      .filter((d) => ids.has(d.id))
      .map((d) => [d.id, d.startingPriceCad, d.pageCount, d.contactMode]),
    expected,
  );
  for (const id of ["earthworks", "horizon"])
    assert(
      gallery.some((d) => d.id === id),
      `${id}: existing reference preserved`,
    );
  assert.equal(new Set(homePropertyTemplates.map((t) => t.theme)).size, 6);
  for (const [id, price, pages, contactMode] of expected) {
    const template = homePropertyTemplate(id);
    const design = websiteDesigns.find((d) => d.id === id);
    assert.equal(design.contactMode, contactMode);
    assert.deepEqual(
      filterDesigns(gallery, { industry: template.industry }).map((d) => d.id),
      [id],
    );
    assert.equal(template.price, price);
    assert.equal(template.pages.length, pages);
    assert.deepEqual(entryTemplateDemos[id].routes, template.pages.map(homePropertyPagePath));
    assert.equal(entryTemplateDemos[id].contactMode, design.contactMode);
    const inquiry = collectionInquiry(
      { collection: "website", design: id, price: "1" },
      websiteDesigns,
      saleNow,
    );
    assert(inquiry.message.includes(`Launch pricing: ${designPrice(design, saleNow)}.`));
    assert(inquiry.message.includes(`Regular starting price: $${price} CAD.`));
    assert(inquiry.message.includes("20% template sale."));
    assert(inquiry.message.includes(design.name));
  }
  assert.deepEqual(
    filterDesigns(gallery, { sort: "price-high" })
      .filter((d) => ids.has(d.id))
      .map((d) => d.id),
    [
      "real-estate",
      "interior-studio",
      "property-management",
      "home-organizing",
      "window-care",
      "home-cleaning",
    ],
  );
});

test("property showcase assets cannot cross folders and invalid demo schemes stay absent", async () => {
  for (const { id } of homePropertyTemplates) {
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
    assert.equal(
      readTemplateShowcase(
        { screenshots: [image] },
        homePropertyTemplates.find((t) => t.id !== id).id,
      ).screenshots.length,
      0,
    );
    assert.equal(readTemplateShowcase({ url: "javascript:alert(1)" }, id).url, null);
  }
});
