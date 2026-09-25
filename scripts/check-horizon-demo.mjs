import assert from "node:assert/strict";
import { access, cp, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { horizonPagePath, horizonPages } from "../src/data/horizon-pages.ts";
import {
  collectionInquiryHref,
  designPrice,
  websiteDesigns,
} from "../src/data/website-collection.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "build/horizon-demo/out");
const design = websiteDesigns.find((item) => item.id === "horizon");
assert.ok(design, "The landscape offer exists in the canonical catalogue");
const expectedEnquiry = new URL(
  collectionInquiryHref({ design: design.id }),
  "https://lltechsolutions.ca",
);
const routes = horizonPages.map((page) => {
  const pathname = horizonPagePath(page);
  return [pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`, pathname];
});
const pages = new Map(
  await Promise.all(
    routes.map(async ([file, pathname]) => [
      pathname,
      { file, html: await readFile(resolve(output, file), "utf8") },
    ]),
  ),
);
const headings = new Set();
const titles = new Set();
const decodeHref = (href) => href.replaceAll("&amp;", "&");

for (const [activePath, { file, html }] of pages) {
  assert.equal((html.match(/<main(?:\s|>)/g) ?? []).length, 1, `${file}: one main landmark`);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${file}: one main heading`);
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(heading, `${file}: a main heading is present before hydration`);
  assert.ok(title, `${file}: a document title is present`);
  headings.add(heading);
  titles.add(title);
  assert.ok(html.includes('data-horizon-demo="horizon"'), `${file}: standalone marker`);
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${file}: search exclusion`);
  const formatDetection = html.match(/name="format-detection" content="([^"]+)"/)?.[1];
  for (const setting of ["telephone=no", "email=no", "address=no"])
    assert.ok(formatDetection?.includes(setting), `${file}: disable sample contact auto-linking`);
  assert.ok(html.includes(designPrice(design)), `${file}: canonical starting price`);
  assert.ok(html.includes('class="motion-control"'), `${file}: shared motion control`);
  const nav = html.match(/<nav\b[^>]*class="[^"]*\bhorizon-nav\b[^\"]*"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, `${file}: landscape navigation is rendered before hydration`);
  for (const [, pathname] of routes)
    assert.ok(nav.includes(`href="${pathname}"`), `${file}: real ${pathname} destination`);
  const links = [...nav.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag);
  const current = links.filter((tag) => tag.includes('aria-current="page"'));
  assert.equal(current.length, 1, `${file}: one current navigation item`);
  assert.ok(current[0].includes(`href="${activePath}"`), `${file}: correct active destination`);
  assert.ok(!nav.includes("<button"), `${file}: page navigation uses ordinary links`);

  for (const [tag] of html.matchAll(/<(?:link|script|img)\b[^>]*>/g)) {
    const src = tag.match(/(?:href|src)="(\/[^"?]+)(?:\?[^"]*)?"/)?.[1];
    if (src && !src.startsWith("//")) await access(resolve(output, src.slice(1)));
    if (tag.startsWith("<img")) {
      assert.match(tag, /\ssrc="\/images\//, `${file}: sample imagery is served locally`);
      assert.match(tag, /\salt="[^"]*"/, `${file}: images declare alternative text`);
    }
  }

  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
  for (const [, rawHref] of anchors) {
    const href = decodeHref(rawHref);
    assert.ok(href && href !== "#", `${file}: no placeholder destinations`);
    assert.ok(!/^(?:mailto|tel|javascript):/i.test(href), `${file}: sample contacts stay inert`);
    if (href.startsWith("#")) {
      assert.ok(html.includes(`id="${href.slice(1)}"`), `${file}: anchor ${href} exists`);
    } else if (href.startsWith("/") && !href.startsWith("//")) {
      const destination = new URL(href, "https://demo.invalid");
      assert.ok(pages.has(destination.pathname), `${file}: ${href} resolves within the demo`);
      if (destination.hash)
        assert.ok(
          pages.get(destination.pathname).html.includes(`id="${destination.hash.slice(1)}"`),
          `${file}: destination anchor ${href} exists`,
        );
    }
  }
  assert.ok(
    anchors.some(([, href]) => href === "https://lltechsolutions.ca/website-collection/horizon"),
    `${file}: returns to the correct L&L template`,
  );
  const purchaseLinks = anchors.filter(([, , text]) => text.includes("Make this my website"));
  assert.ok(purchaseLinks.length, `${file}: real L&L enquiry action is visible`);
  for (const [, href] of purchaseLinks)
    assert.equal(
      new URL(decodeHref(href)).href,
      expectedEnquiry.href,
      `${file}: the real enquiry uses canonical landscape selection context`,
    );
  assert.ok(!/<form\b/.test(html), `${file}: demo does not collect contractor enquiries`);
}

assert.equal(headings.size, routes.length, "All four pages have distinct main headings");
assert.equal(titles.size, routes.length, "All four pages have distinct document titles");
const contact = pages.get("/contact").html;
assert.ok(contact.includes("not a landscape contractor"), "Demo is clearly identified");
const visibleContact = contact.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const displayedEmails = visibleContact.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
assert.ok(displayedEmails.length, "Contact demonstrates a sample email layout");
assert.ok(
  displayedEmails.every((email) => email === "hello@example.com"),
  "The only displayed sample email uses the reserved example.com domain",
);
assert.match(visibleContact, /DEMO EMAIL/i, "Sample email is clearly labelled");
assert.match(visibleContact, /DEMO PHONE/i, "Sample phone is clearly labelled");
assert.match(pages.get("/projects").html, /illustrative/i, "Project imagery is disclosed");
for (const asset of [
  "earthworks-landscape.webp",
  "earthworks-detail.webp",
  "earthworks-site.webp",
  "lawn-hero.webp",
  "lawn-detail.webp",
])
  await access(resolve(output, "images/collection", asset));
const notFound = await readFile(resolve(output, "404.html"), "utf8");
assert.match(notFound, /name="robots" content="noindex/, "The 404 remains excluded from search");
assert.ok(notFound.includes('href="/"'), "The 404 has a working return to the demo");
await assert.rejects(access(resolve(output, "api")), "No contact API is included in the export");

// Static hosts do not receive Next.js headers; ship the maintained Vercel policy with out/.
await cp(resolve(root, "templates/horizon-demo/vercel.json"), resolve(output, "vercel.json"));
const config = JSON.parse(await readFile(resolve(output, "vercel.json"), "utf8"));
const baseline = JSON.parse(
  await readFile(resolve(root, "templates/lawncare-demo/vercel.json"), "utf8"),
);
assert.deepEqual(config.headers, baseline.headers, "The demo retains the maintained header policy");
assert.equal(config.framework, null, "The static export uses Vercel Framework Other");
assert.equal(config.cleanUrls, true, "Exported page destinations use clean URLs");
console.log(
  `PASS: ${routes.length} distinct standalone landscape pages, active navigation, local assets, working destinations, canonical price and enquiry links, inert sample contacts, noindex, 404 and static deployment headers. Browser rendering remains a separate review.`,
);
