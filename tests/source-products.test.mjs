import assert from "node:assert/strict";
import test from "node:test";
import {
  sourceProducts,
  sourceProduct,
  sourceHref,
  sourceInquiryHref,
  sourceVersionRequest,
} from "../src/data/source-products.ts";
import { websiteDesigns } from "../src/data/website-collection.ts";
import { templatePrice } from "../src/data/template-promotion.ts";

test("source purchases have separate exact prices and exclude client/reference material", () => {
  assert.equal(sourceProducts.length, 40);
  assert.equal(new Set(sourceProducts.map((item) => item.designId)).size, 40);
  for (const id of [
    "horizon",
    "tow-n-go",
    "crestline",
    "mckenzie-house",
    "calgary-hot-shot",
    "__proto__",
    "../../terms",
    "unknown",
  ])
    assert.equal(sourceProduct(id), null);
  for (const product of sourceProducts) {
    const design = websiteDesigns.find((item) => item.id === product.designId);
    assert.ok(design && !design.clientProjectId && !design.independentConcept);
    assert.ok(
      Number.isInteger(product.priceCad) && product.priceCad >= 49 && product.priceCad <= 199,
    );
    assert.ok(product.priceCad < design.startingPriceCad);
    assert.equal(sourceHref(product.designId), `/website-collection/${product.designId}/source`);
    assert.equal(
      new URL(sourceInquiryHref(product.designId), "https://example.test").searchParams.get(
        "source",
      ),
      product.designId,
    );
  }
});

test("managed promotion expires without altering code-only prices or existing scope", () => {
  const low = sourceProduct("massage-one-page");
  const high = sourceProduct("earthworks");
  assert.equal(low.priceCad, 49);
  assert.equal(high.priceCad, 199);
  assert.equal(templatePrice(150, Date.parse("2026-12-31T23:00:00Z")).priceCad, 120);
  assert.equal(templatePrice(150, Date.parse("2027-01-01T07:00:00Z")).priceCad, 150);
  assert.equal(sourceProduct("massage-one-page").priceCad, 49);
  assert.equal(websiteDesigns.find((item) => item.id === "earthworks").pageCount, 7);
});

test("reference enquiry bookmarks remain scoped without creating downloadable products", () => {
  for (const design of websiteDesigns.filter((item) => item.status !== "draft")) {
    const product = sourceProduct(design.id);
    const request = sourceVersionRequest(design.id);
    assert.notEqual(Boolean(product), Boolean(request));
    if (request) {
      assert.equal(request.name, design.name);
      assert.equal(
        new URL(request.href, "https://example.test").searchParams.get("source-version"),
        design.id,
      );
      assert.match(request.message, /confirm availability, scope and price/);
      assert.match(request.message, /private files are not included/);
      assert.match(request.summary, /quoted separately/);
    }
  }
  for (const id of ["unknown", "../../terms", "__proto__", "pigment"]) {
    assert.equal(sourceVersionRequest(id), null);
  }
});
