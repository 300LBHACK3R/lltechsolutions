import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { horizonPageFromPath, horizonPagePath, horizonPages } from "../src/data/horizon-pages.ts";
import {
  collectionInquiry,
  collectionInquiryHref,
  websiteDesigns,
} from "../src/data/website-collection.ts";

test("landscape pages map to four distinct static destinations and round-trip", () => {
  const expected = new Map([
    ["Home", "/"],
    ["Services", "/services"],
    ["Projects", "/projects"],
    ["Contact", "/contact"],
  ]);
  assert.deepEqual(horizonPages, [...expected.keys()]);
  for (const [page, pathname] of expected) {
    assert.equal(horizonPagePath(page), pathname);
    assert.equal(horizonPageFromPath(pathname.split("/").filter(Boolean)), page);
  }
  assert.equal(horizonPageFromPath(), "Home");
});

test("landscape routing rejects unknown, nested and differently cased paths", () => {
  for (const segments of [
    ["admin"],
    ["our-work"],
    ["Home"],
    ["Services"],
    ["projects", "sample"],
    ["contact", ""],
    ["services%2Fprojects"],
  ])
    assert.equal(horizonPageFromPath(segments), null, segments.join("/"));
});

test("the four-page $499 landscape offer hands its exact design to the real enquiry", () => {
  const design = websiteDesigns.find((item) => item.id === "horizon");
  assert.ok(design);
  assert.equal(design.startingPriceCad, 499);
  assert.equal(design.pageCount, horizonPages.length);
  assert.equal(design.contactMode, "direct");
  const href = new URL(collectionInquiryHref({ design: design.id }), "https://lltechsolutions.ca");
  assert.equal(href.pathname, "/contact");
  assert.equal(href.searchParams.get("collection"), "website");
  assert.equal(href.searchParams.get("design"), "horizon");
  const inquiry = collectionInquiry(Object.fromEntries(href.searchParams));
  assert.ok(inquiry.message.includes(design.name));
  assert.ok(inquiry.message.includes("$499"));
});

test("the static landscape deployment keeps the maintained security and noindex policy", async () => {
  const [landscape, lawncare] = await Promise.all(
    ["horizon", "lawncare"].map(async (name) =>
      JSON.parse(await readFile(new URL(`../templates/${name}-demo/vercel.json`, import.meta.url))),
    ),
  );
  assert.equal(landscape.framework, null);
  assert.equal(landscape.cleanUrls, true);
  assert.deepEqual(landscape.headers, lawncare.headers);
  const headers = landscape.headers.find((rule) => rule.source === "/(.*)").headers;
  assert.equal(headers.find((header) => header.key === "X-Robots-Tag").value, "noindex, nofollow");
});
