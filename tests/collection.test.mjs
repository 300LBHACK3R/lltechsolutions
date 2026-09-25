import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  websiteDesigns,
  templateCategories,
  categoryDesigns,
  categoryForIndustry,
  categoryHref,
  availableDesigns,
  designPrice,
  designStatusLabel,
  designInquiryLabel,
  designScopeLabel,
  designHref,
  journeyInquiry,
  compareSelection,
  developerIntroduction,
  collectionTiers,
  collectionIndustries,
  publishedDesigns,
  filterDesigns,
  collectionInquiry,
  collectionInquiryHref,
} from "../src/data/website-collection.ts";
import { validateContact } from "../src/lib/contact-validation.ts";

// Test-only records: these are never imported into the site or offered for sale.
const fixture = (id, tier, price, industry = "painting", status = "published") => ({
  id,
  tier,
  startingPriceCad: price,
  industry,
  status,
  name: `Test design ${id}`,
});
const designs = [
  fixture("one", "essential", 300),
  fixture("two", "signature", 800, "massage-wellness"),
  fixture("three", "premier", 1600),
  fixture("draft", "flagship", 2000, "painting", "draft"),
];

test("collection filters keep unpublished designs private and combine scope, industry and budget", () => {
  assert.equal(publishedDesigns(designs).length, 3);
  assert.deepEqual(
    filterDesigns(designs, { industry: "painting", budget: "under-1000" }).map((item) => item.id),
    ["one"],
  );
  assert.deepEqual(filterDesigns(designs, { tier: "signature", industry: "painting" }), []);
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
    {
      collection: "website",
      design: "two",
      tier: "flagship",
      care: "social",
      industry: "legal",
      price: "1",
    },
    designs,
  );
  assert.equal(
    selection.summary,
    "Test design two · Massage & Wellness · Signature · Website + Social",
  );
  assert.ok(selection.message.includes("Collection: Signature"));
  assert.ok(selection.message.includes("Launch pricing: From $800 CAD"));
  assert.ok(!selection.message.includes("From $1 CAD"), "query cannot forge a price");
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
  assert.equal(bad.summary, "Website Templates");
  assert.ok(!bad.message.includes("draft") && !bad.message.includes("<script>"));
  assert.equal(collectionInquiry({ collection: ["website", "website"], tier: "essential" }), null);
});

test("collection choice travels through the existing validated inquiry payload", () => {
  const href = collectionInquiryHref({ tier: "premier", care: "growth", industry: "plumbing" });
  const query = Object.fromEntries(new URL(href, "https://example.test").searchParams);
  const inquiry = collectionInquiry(query);
  assert.equal(inquiry.summary, "Plumbing · Premier · Website Growth");
  const result = validateContact({
    name: "Test Person",
    email: "test@example.com",
    service: inquiry.service,
    timeline: "This month",
    message: `${inquiry.message}\nA business website enquiry.`,
  });
  assert.equal(result.ok, true);
  assert.ok(result.value.message.includes("Business type: Plumbing"));
  assert.ok(
    result.value.message.includes("Premier") && result.value.message.includes("Website Growth"),
  );
});

function asset(src, suffix, directory = "collection") {
  assert.match(src, new RegExp(`^/(?:images|media)/${directory}/[a-z0-9/_-]+\\.${suffix}$`, "i"));
  assert.ok(fs.statSync(path.join("public", src)).isFile(), src);
}
function media(video) {
  if (!video) return;
  asset(video.src, "mp4");
  asset(video.poster, "(?:webp|png|jpe?g)");
  asset(video.captions, "vtt");
  assert.ok(video.transcript.trim().length > 20, "real videos have readable transcripts");
}

test("collection validates design status, scope and local preview assets", () => {
  const ids = new Set();
  for (const design of websiteDesigns) {
    assert.match(design.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!["start", "compare", "brief", "category"].includes(design.id), "reserved route");
    assert.ok(!ids.has(design.id), `duplicate design id: ${design.id}`);
    ids.add(design.id);
    assert.ok(["draft", "concept", "published", "client-example"].includes(design.status));
  }
  for (const design of availableDesigns()) {
    assert.ok(collectionTiers.some((tier) => tier.id === design.tier));
    assert.ok(collectionIndustries.some((industry) => industry.id === design.industry));
    for (const category of design.additionalIndustries ?? [])
      assert.ok(collectionIndustries.some((item) => item.id === category));
    for (const value of [design.name, design.description, design.deliveryWindow])
      assert.ok(value.trim().length > 0);
    if (design.status === "published")
      assert.ok(
        Number.isFinite(design.startingPriceCad) && design.startingPriceCad > 0,
        "release needs an approved price",
      );
    else assert.ok(design.startingPriceCad === null || design.startingPriceCad > 0);
    if (design.status === "client-example") {
      assert.match(design.clientProjectId, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(Number.isFinite(design.startingPriceCad) && design.startingPriceCad > 0);
      assert.equal(design.pageCount, null);
    } else assert.ok(Number.isInteger(design.pageCount) && design.pageCount > 0);
    if (design.preview) {
      asset(
        design.preview.src,
        "(?:webp|png|jpe?g)",
        design.status === "client-example" ? "projects" : "collection",
      );
      assert.ok(design.preview.alt && design.preview.width > 0 && design.preview.height > 0);
    } else assert.ok(design.concept, "a usable visual preview exists");
    if (design.pagePreview) {
      asset(design.pagePreview.src, "(?:webp|png|jpe?g)");
      assert.ok(
        design.pagePreview.alt && design.pagePreview.width > 0 && design.pagePreview.height > 0,
      );
    }
    if (design.concept) {
      assert.ok(["pigment", "structure", "still", "earthworks"].includes(design.concept.theme));
      assert.equal(design.concept.brands.length, 2);
      assert.equal(design.concept.headlines.length, 2);
      assert.ok(design.concept.services.length > 0);
      asset(design.concept.photo.src, "(?:webp|png|jpe?g)");
      assert.ok(
        design.concept.photo.alt &&
          design.concept.photo.width > 0 &&
          design.concept.photo.height > 0,
      );
      assert.equal(design.demoUrl, `${designHref(design)}#preview`);
    } else {
      const demo = new URL(design.demoUrl);
      assert.equal(demo.protocol, "https:");
      assert.ok(!demo.username && !demo.password);
    }
    assert.ok(design.included.length > 0 && design.included.every((item) => item.trim()));
    media(design.walkthrough);
    for (const evidence of design.performance ?? []) {
      for (const url of [evidence.url, evidence.reportUrl]) {
        const parsed = new URL(url);
        assert.equal(parsed.protocol, "https:");
        assert.ok(!parsed.username && !parsed.password);
      }
      assert.match(evidence.measuredAt, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(
        Number.isFinite(Date.parse(evidence.measuredAt)) &&
          Date.parse(evidence.measuredAt) <= Date.now(),
      );
      assert.ok(evidence.conditions.trim() && evidence.lighthouseVersion.trim());
      assert.ok(["Mobile", "Desktop"].includes(evidence.device));
      for (const score of Object.values(evidence.scores))
        assert.ok(Number.isInteger(score) && score >= 0 && score <= 100);
    }
  }
  media(developerIntroduction);
});

test("unpriced concepts are never treated as free or as a match for a price ceiling", () => {
  const concept = { ...fixture("concept", "signature", null), status: "concept" };
  const all = [concept, ...designs];
  assert.equal(availableDesigns(all).length, 4);
  assert.equal(publishedDesigns(all).length, 3);
  assert.ok(!filterDesigns(all, { budget: "under-500" }).includes(concept));
  assert.equal(filterDesigns(all, { sort: "price-high" }).at(-1), concept);
  assert.equal(designPrice(concept), "Quoted after a conversation");
  assert.ok(
    filterDesigns(websiteDesigns, { industry: "plumbing" }).some(
      (design) => design.id === "structure",
    ),
  );
});

test("guided preferences retain their canonical labels through the validated enquiry", () => {
  const design = websiteDesigns.find((item) => item.id === "pigment");
  const inquiry = journeyInquiry(design, ["copy", "booking", "forged-extra", "copy"], "social");
  assert.ok(
    inquiry.message.includes("Website + Social") &&
      inquiry.message.includes("Help with website wording"),
  );
  assert.ok(!inquiry.message.includes("forged-extra"));
  assert.equal((inquiry.message.match(/Help with website wording/g) ?? []).length, 1);
  assert.ok(inquiry.message.includes(designPrice(design)));
  assert.equal((inquiry.message.match(/Launch pricing:/g) ?? []).length, 1);
  assert.equal(
    validateContact({
      name: "Test",
      email: "test@example.com",
      service: inquiry.service,
      timeline: "This month",
      message: `${inquiry.message}\nI need a painting website.`,
    }).ok,
    true,
  );
  assert.ok(journeyInquiry(design, [], "none").message.includes("No monthly plan selected"));
});

test("comparison ignores unknown IDs and deduplicates a shortlist", () => {
  const selected = compareSelection(["pigment", "pigment", "still", "private-draft", "<script>"]);
  assert.equal(selected.tooMany, false);
  assert.deepEqual(
    selected.designs.map((item) => item.id),
    ["pigment", "still"],
  );
  assert.equal(compareSelection(undefined).designs.length, 0);
});

test("business galleries retain all industry mappings and exclude unrelated or draft templates", () => {
  assert.equal(
    new Set(templateCategories.map((category) => category.id)).size,
    templateCategories.length,
  );
  for (const industry of collectionIndustries) {
    const matches = templateCategories.filter((category) =>
      category.industries.includes(industry.id),
    );
    assert.equal(matches.length, 1, `${industry.id} belongs to one browsing category`);
  }
  const trades = categoryForIndustry("painting");
  assert.equal(categoryHref(trades), "/website-collection/category/construction-trades");
  assert.deepEqual(
    categoryDesigns(trades, designs).map((design) => design.id),
    ["one", "three"],
  );
  assert.equal(categoryForIndustry(["painting", "legal"]), undefined);
  assert.equal(categoryDesigns(categoryForIndustry("legal")).length, 0);
  for (const design of availableDesigns())
    assert.ok(categoryDesigns(categoryForIndustry(design.industry)).includes(design));
});

test("category and template enquiries preserve the selection without inventing a business type", () => {
  const href = collectionInquiryHref({ category: "legal-professional" });
  const inquiry = collectionInquiry(
    Object.fromEntries(new URL(href, "https://example.test").searchParams),
  );
  assert.ok(inquiry.message.includes("Business category: Legal & Professional"));
  assert.ok(!inquiry.message.includes("Business type:"));
  assert.ok(!collectionInquiryHref({ category: "forged-category" }).includes("forged-category"));
  for (const design of availableDesigns()) {
    const url = new URL(collectionInquiryHref({ design: design.id }), "https://example.test");
    assert.ok(
      collectionInquiry(Object.fromEntries(url.searchParams)).message.includes(
        `${design.status === "client-example" ? "Client example" : "Design"}: ${design.name}`,
      ),
    );
  }
});

test("transport and restaurant enquiries preserve their category and real design choice", () => {
  const transport = categoryForIndustry("transport-logistics");
  assert.equal(transport.name, "Transport & Logistics");
  assert.ok(categoryDesigns(transport).some((design) => design.id === "calgary-hot-shot"));
  assert.equal(categoryForIndustry("food-hospitality").id, "food-restaurants");
  for (const [choice, expected] of [
    [{ design: "calgary-hot-shot" }, "Calgary Hot Shot"],
    [{ category: "food-restaurants" }, "Food & Restaurants"],
  ]) {
    const url = new URL(collectionInquiryHref(choice), "https://lltechsolutions.ca");
    const inquiry = collectionInquiry(Object.fromEntries(url.searchParams));
    assert.ok(inquiry.message.includes(expected));
  }
});

for (const [id, industry] of [
  ["tow-n-go", "transport-logistics"],
  ["crestline", "painting"],
  ["mckenzie-house", "massage-wellness"],
]) {
  test(`${id}: client reference keeps its own scoped offer and enquiry`, () => {
    const design = availableDesigns().find((item) => item.id === id);
    assert.equal(design.status, "client-example");
    assert.equal(design.clientProjectId, id);
    assert.equal(designStatusLabel(design), "Live client example");
    assert.equal(designInquiryLabel(design), "Build something like this");
    assert.equal(designScopeLabel(design), "Pages scoped to your business");
    assert.ok(!publishedDesigns().includes(design));
    assert.equal(
      filterDesigns([design], { budget: "under-500" }).includes(design),
      id === "crestline",
    );
    assert.ok(categoryDesigns(categoryForIndustry(industry)).includes(design));
    assert.ok(filterDesigns([design], { industry }).includes(design));
    const inquiry = journeyInquiry(design, [], "none");
    assert.ok(inquiry.message.includes(`Client example: ${design.name}`));
    assert.ok(inquiry.message.includes("my own branding, content and business details"));
    assert.ok(!inquiry.message.includes("$0"));
    assert.equal(
      validateContact({
        name: "Casey",
        business: "Example Business",
        email: "casey@example.com",
        service: inquiry.service,
        timeline: "Flexible / planning ahead",
        message: inquiry.message,
      }).ok,
      true,
    );
  });
}

test("price sorting is numeric, stable and keeps unquoted options last in either direction", () => {
  const entries = [
    fixture("unquoted", "signature", null, "painting", "concept"),
    fixture("large", "premier", 1000),
    fixture("small", "essential", 99),
    fixture("equal", "signature", 1000),
    fixture("middle", "signature", 299),
  ];
  const original = entries.map((entry) => entry.id);
  for (const sort of [undefined, "price-low", "unknown", ["price-high", "price-low"]]) {
    assert.deepEqual(
      filterDesigns(entries, { sort }).map((entry) => entry.id),
      ["small", "middle", "large", "equal", "unquoted"],
    );
  }
  assert.deepEqual(
    filterDesigns(entries, { sort: "price-high" }).map((entry) => entry.id),
    ["large", "equal", "middle", "small", "unquoted"],
  );
  assert.deepEqual(
    entries.map((entry) => entry.id),
    original,
  );
  assert.deepEqual(
    filterDesigns(entries, { sort: "price-high", budget: "under-1000" }).map((entry) => entry.id),
    ["middle", "small"],
  );
});

test("earthworks is a five-page $1000 starting scope discoverable in trades and property", () => {
  const design = availableDesigns().find((item) => item.id === "earthworks");
  assert.equal(design.startingPriceCad, 1000);
  assert.equal(design.pageCount, 5);
  for (const category of ["construction-trades", "home-property"])
    assert.ok(
      categoryDesigns(templateCategories.find((item) => item.id === category)).some(
        (item) => item.id === design.id,
      ),
    );
  const selection = journeyInquiry(design, ["pages", "customization"], "none");
  assert.ok(selection.message.includes("From $1,000 CAD"));
  assert.ok(selection.message.includes("Layout or feature changes"));
  assert.equal(
    validateContact({
      name: "Example Client",
      email: "example@example.com",
      service: selection.service,
      timeline: "This month",
      message: selection.message,
    }).ok,
    true,
  );
});
