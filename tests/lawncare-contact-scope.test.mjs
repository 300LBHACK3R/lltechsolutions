import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  availableDesigns,
  categoryDesigns,
  collectionInquiry,
  designContactLabel,
  filterDesigns,
  templateCategories,
} from "../src/data/website-collection.ts";
import { lawnPages, lawnPagePath, lawnPageFromPath } from "../src/data/lawn-pages.ts";
import { readTemplateShowcase } from "../src/lib/template-showcase.ts";

test("contact scope belongs to the selected offer and cannot be changed by an enquiry URL", () => {
  for (const design of availableDesigns()) {
    assert.ok(["direct", "enquiry-form"].includes(design.contactMode));
    if (design.startingPriceCad !== null && design.startingPriceCad <= 500)
      assert.equal(design.contactMode, "direct", design.id);
    if (design.startingPriceCad !== null && design.startingPriceCad >= 699)
      assert.equal(design.contactMode, "enquiry-form", design.id);
    const inquiry = collectionInquiry({
      collection: "website",
      design: design.id,
      contactMode: design.contactMode === "direct" ? "enquiry-form" : "direct",
    });
    assert.ok(inquiry.message.includes(designContactLabel(design)), design.id);
  }
});

test("lawn care is a four-page $499 direct-contact option sorted between $399 and $699", () => {
  const lawn = availableDesigns().find((design) => design.id === "lawncare");
  assert.equal(lawn.startingPriceCad, 499);
  assert.equal(lawn.pageCount, 4);
  assert.equal(lawn.contactMode, "direct");
  for (const id of ["construction-trades", "home-property"]) {
    const category = templateCategories.find((entry) => entry.id === id);
    assert.ok(categoryDesigns(category).some((entry) => entry.id === lawn.id));
  }
  const trades = categoryDesigns(
    templateCategories.find((entry) => entry.id === "construction-trades"),
  );
  assert.equal(trades.length, 6);
  assert.deepEqual(
    filterDesigns(trades, {}).map((entry) => entry.id),
    ["crestline", "lawncare", "pigment", "horizon", "structure", "earthworks"],
  );
  assert.deepEqual(
    filterDesigns(trades, { sort: "price-high" }).map((entry) => entry.id),
    ["earthworks", "structure", "horizon", "lawncare", "pigment", "crestline"],
  );
});

test("lawn care routes include our-work and reject unsupported or nested destinations", () => {
  for (const page of lawnPages) {
    assert.equal(lawnPageFromPath(lawnPagePath(page).split("/").filter(Boolean)), page);
  }
  assert.equal(lawnPageFromPath(), "Home");
  assert.equal(lawnPageFromPath(["our-work"]), "Our Work");
  assert.equal(lawnPageFromPath(["our-work", "example"]), null);
  assert.equal(lawnPageFromPath(["admin"]), null);
  assert.equal(lawnPageFromPath(["Services"]), null);
});

test("lawn screenshots stay in their own folder and an unset live URL stays absent", () => {
  const shot = {
    src: "/images/templates/lawncare/home.webp",
    alt: "Lawn website",
    caption: "Home",
    width: 1536,
    height: 1024,
  };
  assert.deepEqual(readTemplateShowcase({ screenshots: [shot] }, "lawncare").screenshots, [shot]);
  assert.deepEqual(readTemplateShowcase({ screenshots: [shot] }, "pigment").screenshots, []);
  const config = JSON.parse(fs.readFileSync("src/data/lawncare-demo.json", "utf8"));
  const parsed = readTemplateShowcase(config, "lawncare");
  assert.equal(parsed.url, config.url);
  assert.equal(parsed.screenshots.length, config.screenshots.length);
  for (const image of parsed.screenshots) assert.ok(fs.existsSync(path.join("public", image.src)));
});
