import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  wellnessPageFromPath,
  wellnessPagePath,
  wellnessPages,
} from "../src/data/wellness-pages.ts";
import {
  collectionInquiry,
  collectionInquiryHref,
  websiteDesigns,
} from "../src/data/website-collection.ts";

test("wellness pages map to six distinct static destinations and round-trip", () => {
  const expected = new Map([
    ["Home", "/"],
    ["Treatments", "/treatments"],
    ["Pricing", "/pricing"],
    ["About", "/about"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ]);
  assert.deepEqual(wellnessPages, [...expected.keys()]);
  for (const [page, pathname] of expected) {
    assert.equal(wellnessPagePath(page), pathname);
    assert.equal(wellnessPageFromPath(pathname.split("/").filter(Boolean)), page);
  }
  assert.equal(wellnessPageFromPath(), "Home");
});

test("wellness routing rejects unknown, nested and differently cased paths", () => {
  for (const segments of [
    ["admin"],
    ["book"],
    ["Home"],
    ["FAQ"],
    ["treatments", "sample"],
    ["contact", ""],
    ["pricing%2Fabout"],
  ])
    assert.equal(wellnessPageFromPath(segments), null, segments.join("/"));
});

test("the six-page $999 wellness offer preserves its bookmarked enquiry selection", () => {
  const design = websiteDesigns.find((item) => item.id === "mckenzie-house");
  assert.ok(design);
  assert.equal(design.name, "Wellness & Massage");
  assert.equal(design.startingPriceCad, 999);
  assert.equal(design.pageCount, wellnessPages.length);
  assert.equal(design.contactMode, "enquiry-form");
  const href = new URL(collectionInquiryHref({ design: design.id }), "https://lltechsolutions.ca");
  assert.equal(href.pathname, "/contact");
  assert.equal(href.searchParams.get("collection"), "website");
  assert.equal(href.searchParams.get("design"), "mckenzie-house");
  const inquiry = collectionInquiry(Object.fromEntries(href.searchParams));
  assert.ok(inquiry.message.includes(design.name));
  assert.ok(inquiry.message.includes("$999"));
});

test("the static wellness deployment retains security headers and search exclusion", async () => {
  const [wellness, lawncare] = await Promise.all(
    ["wellness", "lawncare"].map(async (name) =>
      JSON.parse(await readFile(new URL(`../templates/${name}-demo/vercel.json`, import.meta.url))),
    ),
  );
  assert.equal(wellness.framework, null);
  assert.equal(wellness.cleanUrls, true);
  assert.deepEqual(wellness.headers, lawncare.headers);
  const headers = wellness.headers.find((rule) => rule.source === "/(.*)").headers;
  assert.equal(headers.find((header) => header.key === "X-Robots-Tag").value, "noindex, nofollow");
  assert.equal(headers.find((header) => header.key === "X-Content-Type-Options").value, "nosniff");
});
