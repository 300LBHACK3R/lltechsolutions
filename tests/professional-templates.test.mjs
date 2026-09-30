import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  professionalTemplates,
  professionalTemplate,
  professionalPagePath,
  websiteDesigns,
  categoryForIndustry,
  categoryDesigns,
  filterDesigns,
  collectionInquiry,
} from "../src/data/website-collection.ts";
import { readTemplateShowcase } from "../src/lib/template-showcase.ts";
import { entryTemplateDemos } from "../scripts/lib/entry-template-config.mjs";

test("six professional offers retain price ordering, sector filters and enquiries", () => {
  const expected = [
    ["consultant-one-page", 150, 1],
    ["bookkeeping", 399, 3],
    ["accounting", 499, 4],
    ["creative-consultancy", 699, 4],
    ["boutique-law", 699, 5],
    ["corporate-law", 999, 7],
  ];
  const gallery = categoryDesigns(categoryForIndustry("legal"));
  assert.deepEqual(
    filterDesigns(gallery, {}).map((d) => [d.id, d.startingPriceCad, d.pageCount]),
    expected,
  );
  assert.deepEqual(
    filterDesigns(gallery, { industry: "legal" }).map((d) => d.id),
    ["boutique-law", "corporate-law"],
  );
  assert.deepEqual(
    filterDesigns(gallery, { sort: "price-high" }).map((d) => d.id),
    [
      "corporate-law",
      "creative-consultancy",
      "boutique-law",
      "accounting",
      "bookkeeping",
      "consultant-one-page",
    ],
  );
  for (const [id, price, pages] of expected) {
    const design = websiteDesigns.find((d) => d.id === id);
    assert.equal(design.contactMode, price >= 699 ? "enquiry-form" : "direct");
    const message = collectionInquiry({ collection: "website", design: id, price: "1" }).message;
    assert.ok(message.includes(`From $${price} CAD`));
    assert.ok(message.includes(design.name));
    const content = professionalTemplate(id);
    assert.equal(content.pages.length, pages);
    assert.equal(content.price, price);
    const exportConfig = entryTemplateDemos[id];
    assert.equal(exportConfig.id, id);
    assert.equal(exportConfig.contactMode, design.contactMode);
    assert.deepEqual(exportConfig.routes, content.pages.map(professionalPagePath));
    assert.ok(exportConfig.project.startsWith("ll-") && exportConfig.project !== "lltechsolutions");
  }
});

test("professional screenshot folders remain isolated and unverified demo links remain absent", async () => {
  for (const template of professionalTemplates) {
    const config = JSON.parse(
      await readFile(new URL(`../src/data/${template.id}-demo.json`, import.meta.url), "utf8"),
    );
    // Publishers may connect a verified HTTPS URL later; local media must remain design-specific.
    const media = readTemplateShowcase(config, template.id);
    assert.equal(media.url, config.url);
    const shot = {
      src: `/images/templates/${template.id}/home.webp`,
      alt: "Actual demo home page",
      caption: "Home",
      width: 1440,
      height: 1000,
    };
    assert.equal(readTemplateShowcase({ screenshots: [shot] }, template.id).screenshots.length, 1);
    const another = professionalTemplates.find((d) => d.id !== template.id);
    assert.equal(readTemplateShowcase({ screenshots: [shot] }, another.id).screenshots.length, 0);
    assert.equal(readTemplateShowcase({ url: "javascript:alert(1)" }, template.id).url, null);
    assert.equal(
      readTemplateShowcase(
        { screenshots: [{ ...shot, src: `/images/templates/${template.id}/../home.webp` }] },
        template.id,
      ).screenshots.length,
      0,
    );
  }
});
