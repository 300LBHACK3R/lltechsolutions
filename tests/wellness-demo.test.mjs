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
  templateSale,
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

test("the McKenzie client example uses its approved $399 template price in enquiries", () => {
  const design = websiteDesigns.find((item) => item.id === "mckenzie-house");
  assert.ok(design);
  assert.equal(design.name, "McKenzie House Massage");
  assert.equal(design.status, "client-example");
  assert.equal(design.clientProjectId, "mckenzie-house");
  assert.equal(design.startingPriceCad, 399);
  assert.equal(design.pageCount, null);
  assert.equal(design.contactMode, "direct");
  const href = new URL(collectionInquiryHref({ design: design.id }), "https://lltechsolutions.ca");
  assert.equal(href.pathname, "/contact");
  assert.equal(href.searchParams.get("collection"), "website");
  assert.equal(href.searchParams.get("design"), "mckenzie-house");
  const inquiry = collectionInquiry(
    Object.fromEntries(href.searchParams),
    websiteDesigns,
    Date.parse(templateSale.startsAt),
  );
  assert.ok(inquiry.message.includes(design.name));
  assert.ok(inquiry.message.includes("Launch pricing: From $319.20 CAD"));
  assert.ok(inquiry.message.includes("Regular starting price: $399 CAD"));
  assert.ok(!inquiry.message.includes("$1,000"), "historical bundled project fee stays separate");
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
