import assert from "node:assert/strict";
import { access, cp, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { wellnessPagePath, wellnessPages } from "../src/data/wellness-pages.ts";
import {
  collectionInquiryHref,
  designPrice,
  websiteDesigns,
} from "../src/data/website-collection.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "build/wellness-demo/out");
const design = websiteDesigns.find((item) => item.id === "mckenzie-house");
assert.ok(design, "The wellness offer exists in the canonical catalogue");
assert.equal(design.name, "Wellness & Massage", "The template uses its generic offer name");
assert.equal(design.startingPriceCad, 999, "The wellness offer starts at $999 CAD");
assert.equal(design.pageCount, 6, "The offer includes the six demonstrated pages");
assert.equal(design.contactMode, "enquiry-form", "Standard enquiry setup is included");
const expectedEnquiry = new URL(
  collectionInquiryHref({ design: design.id }),
  "https://lltechsolutions.ca",
);
const routes = wellnessPages.map((page) => {
  const pathname = wellnessPagePath(page);
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
assert.equal(pages.size, 6, "The demo exports six distinct destinations");
const headings = new Set();
const titles = new Set();
const demoForms = new Set();
const decodeHref = (href) => href.replaceAll("&amp;", "&");
const visibleMarkup = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");

for (const [activePath, { file, html }] of pages) {
  assert.equal((html.match(/<main(?:\s|>)/g) ?? []).length, 1, `${file}: one main landmark`);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${file}: one main heading`);
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(heading, `${file}: a main heading is present before hydration`);
  assert.ok(title, `${file}: a document title is present`);
  headings.add(heading);
  titles.add(title);
  assert.equal(
    (visibleMarkup(html).match(/data-wellness-demo="mckenzie-house"/g) ?? []).length,
    1,
    `${file}: one standalone demo root`,
  );
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${file}: search exclusion`);
  const formatDetection = html.match(/name="format-detection" content="([^"]+)"/)?.[1];
  for (const setting of ["telephone=no", "email=no", "address=no"])
    assert.ok(formatDetection?.includes(setting), `${file}: disable sample contact auto-linking`);
  assert.ok(html.includes(designPrice(design)), `${file}: canonical starting price`);
  assert.ok(html.includes('class="motion-control"'), `${file}: shared motion control`);
  const nav = html.match(/<nav\b[^>]*class="[^"]*\bwellness-nav\b[^\"]*"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, `${file}: wellness navigation is rendered before hydration`);
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
    } else {
      assert.equal(
        new URL(href).origin,
        "https://lltechsolutions.ca",
        `${file}: external links hand off only to the real L&L site`,
      );
    }
  }
  assert.ok(
    anchors.some(
      ([, href]) => href === "https://lltechsolutions.ca/website-collection/mckenzie-house",
    ),
    `${file}: returns to the preserved L&L template URL`,
  );
  const purchaseLinks = anchors.filter(([, , text]) => text.includes("Make this my website"));
  assert.ok(purchaseLinks.length, `${file}: real L&L enquiry action is visible`);
  for (const [, href] of purchaseLinks)
    assert.equal(
      new URL(decodeHref(href)).href,
      expectedEnquiry.href,
      `${file}: the real enquiry preserves the canonical wellness selection`,
    );

  for (const [form] of visibleMarkup(html).matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)) {
    const tag = form.slice(0, form.indexOf(">") + 1);
    const kind = tag.match(/data-wellness-demo-form="(enquiry|booking)"/)?.[1];
    assert.ok(kind, `${file}: each form identifies its demonstration purpose`);
    demoForms.add(kind);
    assert.ok(!/\s(?:action|method)=/i.test(tag), `${file}: forms have no server action`);
    assert.ok(!/\sformaction=/i.test(form), `${file}: buttons cannot override a form action`);
    assert.ok(!/name="\$ACTION_/i.test(form), `${file}: no React server action is bound`);
    const buttons = [...form.matchAll(/<button\b[^>]*>/g)].map(([button]) => button);
    assert.ok(buttons.length, `${file}: form demonstration has a usable action`);
    for (const button of buttons) {
      const clientButton = /type="button"/.test(button);
      const disabledSubmit = /type="submit"/.test(button) && /\sdisabled(?:=|\s|>)/.test(button);
      assert.ok(clientButton || disabledSubmit, `${file}: demo cannot submit without JavaScript`);
    }
    assert.ok(
      !/<input\b[^>]*type="(?:submit|image)"/i.test(form),
      `${file}: no native submit controls`,
    );
    assert.ok(
      !/<(?:input|select|textarea)\b[^>]*\sname=/i.test(form),
      `${file}: sample fields cannot be serialized into a native request`,
    );
  }
}

assert.equal(headings.size, 6, "All six pages have distinct main headings");
assert.equal(titles.size, 6, "All six pages have distinct document titles");
assert.deepEqual([...demoForms].sort(), ["booking", "enquiry"], "Both demo journeys are present");
const contact = visibleMarkup(pages.get("/contact").html);
assert.match(
  contact,
  /not a massage or wellness practice/i,
  "The site is clearly identified as a demo",
);
assert.match(contact, /do not send or save information/i, "No information is sent or saved");
assert.match(contact, /no appointments are booked/i, "No appointment booking is represented");
const contactText = contact.replace(/<[^>]+>/g, " ");
const displayedEmails = contactText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
assert.ok(displayedEmails.length, "Contact demonstrates a sample email layout");
assert.ok(
  displayedEmails.every((email) => email === "hello@example.com"),
  "The only displayed email uses the reserved example.com domain",
);
assert.match(contact, /(?:DEMO|SAMPLE) EMAIL/i, "Sample email is clearly labelled");
assert.match(contact, /(?:DEMO|SAMPLE) PHONE/i, "Sample phone is clearly labelled");

// Keep sample inputs in memory only; the shared motion preference has its own separate storage.
for (const name of ["WellnessEnquiryDemo", "WellnessBookingDemo"]) {
  const source = await readFile(resolve(root, `src/components/collection/${name}.tsx`), "utf8");
  assert.ok(
    !/\b(?:fetch|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB)\b|document\.cookie|["']use server["']/.test(
      source,
    ),
    `${name}: demonstration inputs do not use network requests or persistence`,
  );
}
const notFound = await readFile(resolve(output, "404.html"), "utf8");
assert.match(notFound, /name="robots" content="noindex/, "The 404 remains excluded from search");
assert.ok(notFound.includes('href="/"'), "The 404 has a working return to the demo");
await assert.rejects(access(resolve(output, "api")), "No enquiry or booking API is exported");

// Static hosts do not receive Next.js headers; ship the maintained Vercel policy with out/.
await cp(resolve(root, "templates/wellness-demo/vercel.json"), resolve(output, "vercel.json"));
const config = JSON.parse(await readFile(resolve(output, "vercel.json"), "utf8"));
const baseline = JSON.parse(
  await readFile(resolve(root, "templates/lawncare-demo/vercel.json"), "utf8"),
);
assert.deepEqual(config.headers, baseline.headers, "The demo retains the maintained header policy");
assert.equal(config.framework, null, "The static export uses Vercel Framework Other");
assert.equal(config.cleanUrls, true, "Exported page destinations use clean URLs");
console.log(
  "PASS: six distinct standalone wellness pages, active navigation, local assets, working destinations, canonical $999 price and enquiry links, inert sample contacts, demonstration forms, noindex, 404 and static deployment headers. Browser interaction remains a separate review.",
);
