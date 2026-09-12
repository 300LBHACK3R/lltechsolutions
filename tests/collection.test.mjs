import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  websiteDesigns,
  collectionTiers,
  publishedDesigns,
  filterDesigns,
  collectionInquiry,
  collectionInquiryHref,
} from "../src/data/website-collection.ts";
import { validateContact } from "../src/lib/contact-validation.ts";

// Test-only records: these are never imported into the site or offered for sale.
const fixture = (id, tier, price, industry = "Trades", status = "published") => ({
  id,
  tier,
  startingPriceCad: price,
  industry,
  status,
  name: `Test design ${id}`,
});
const designs = [
  fixture("one", "essential", 300),
  fixture("two", "signature", 800, "Wellness"),
  fixture("three", "premier", 1600),
  fixture("draft", "flagship", 2000, "Trades", "draft"),
];

test("collection filters keep unpublished designs private and combine scope, industry and budget", () => {
  assert.equal(publishedDesigns(designs).length, 3);
  assert.deepEqual(
    filterDesigns(designs, { industry: "Trades", budget: "under-1000" }).map((item) => item.id),
    ["one"],
  );
  assert.deepEqual(filterDesigns(designs, { tier: "signature", industry: "Trades" }), []);
  assert.deepEqual(
    filterDesigns(designs, { sort: "price-high" }).map((item) => item.id),
    ["three", "two", "one"],
  );
  assert.equal(
    filterDesigns(designs, { budget: "toString", tier: ["essential", "flagship"] }).length,
    3,
  );
  assert.deepEqual(
    designs.map((item) => item.id),
    ["one", "two", "three", "draft"],
    "sorting never mutates the canonical catalogue",
  );
});

test("collection inquiry uses catalogue identity rather than untrusted query text or price", () => {
  const selection = collectionInquiry(
    { collection: "website", design: "two", tier: "flagship", care: "social", price: "1" },
    designs,
  );
  assert.equal(selection.summary, "Test design two · Signature · Website + Social");
  assert.ok(selection.message.includes("Collection: Signature"));
  assert.ok(!selection.message.includes("Flagship"));
  const bad = collectionInquiry(
    {
      collection: "website",
      design: "draft",
      tier: "<script>alert(1)</script>",
      care: ["social", "care"],
    },
    designs,
  );
  assert.equal(bad.summary, "Website Collection");
  assert.ok(!bad.message.includes("draft") && !bad.message.includes("<script>"));
  assert.equal(collectionInquiry({ collection: ["website", "website"], tier: "essential" }), null);
});

test("collection choice travels through the existing validated inquiry payload", () => {
  const href = collectionInquiryHref({ tier: "premier", care: "growth" });
  const query = Object.fromEntries(new URL(href, "https://example.test").searchParams);
  const inquiry = collectionInquiry(query);
  assert.equal(inquiry.summary, "Premier · Website Growth");
  const result = validateContact({
    name: "Test Person",
    email: "test@example.com",
    service: inquiry.service,
    timeline: "This month",
    message: `${inquiry.message}\nA business website enquiry.`,
  });
  assert.equal(result.ok, true);
  assert.ok(
    result.value.message.includes("Premier") && result.value.message.includes("Website Growth"),
  );
});

test("published catalogue entries have safe links, real assets and complete pricing before they can ship", () => {
  const ids = new Set();
  for (const design of websiteDesigns) {
    assert.match(design.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!ids.has(design.id), `duplicate design id: ${design.id}`);
    ids.add(design.id);
    assert.ok(["draft", "published"].includes(design.status));
  }
  for (const design of publishedDesigns()) {
    assert.ok(collectionTiers.some((tier) => tier.id === design.tier));
    for (const value of [
      design.name,
      design.description,
      design.industry,
      design.deliveryWindow,
      design.preview.alt,
    ])
      assert.ok(typeof value === "string" && value.trim().length > 0);
    assert.ok(Number.isFinite(design.startingPriceCad) && design.startingPriceCad > 0);
    assert.ok(Number.isInteger(design.pageCount) && design.pageCount > 0);
    assert.ok(Number.isInteger(design.preview.width) && design.preview.width > 0);
    assert.ok(Number.isInteger(design.preview.height) && design.preview.height > 0);
    assert.match(design.preview.src, /^\/images\/collection\/[a-z0-9/_-]+\.(?:webp|png|jpe?g)$/i);
    assert.ok(fs.statSync(path.join("public", design.preview.src)).isFile(), design.preview.src);
    const demo = new URL(design.demoUrl);
    assert.equal(demo.protocol, "https:");
    assert.ok(!demo.username && !demo.password);
    assert.ok(
      design.included.length > 0 &&
        design.included.every((item) => typeof item === "string" && item.trim().length > 0),
    );
  }
});
