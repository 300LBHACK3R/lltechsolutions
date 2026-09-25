import assert from "node:assert/strict";
import { access, cp, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "build/lawncare-demo/out");
const routes = [
  ["index.html", "/"],
  ["services.html", "/services"],
  ["our-work.html", "/our-work"],
  ["contact.html", "/contact"],
];
const localPaths = new Set(routes.map(([, pathname]) => pathname));
const headings = new Set();
const titles = new Set();

for (const [file, activePath] of routes) {
  const html = await readFile(resolve(output, file), "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${file}: one main heading`);
  headings.add(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]);
  titles.add(html.match(/<title>([^<]+)<\/title>/)?.[1]);
  assert.ok(html.includes('data-lawncare-demo="lawncare"'), `${file}: standalone marker`);
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${file}: search exclusion`);
  assert.ok(html.includes("From $499 CAD"), `${file}: approved starting price`);
  assert.ok(html.includes('class="motion-control"'), `${file}: motion control`);
  const nav = html.match(/<nav\b[^>]*class="[^"]*lawn-nav[^\"]*"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, `${file}: lawncare navigation`);
  for (const [, pathname] of routes)
    assert.ok(nav.includes(`href="${pathname}"`), `${file}: real ${pathname} destination`);
  const links = [...nav.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag);
  const current = links.filter((tag) => tag.includes('aria-current="page"'));
  assert.equal(current.length, 1, `${file}: one current navigation item`);
  assert.ok(current[0].includes(`href="${activePath}"`), `${file}: correct active destination`);
  assert.ok(!nav.includes("<button"), `${file}: navigation works before hydration`);
  for (const [tag] of html.matchAll(/<(?:link|script|img)\b[^>]*>/g)) {
    const src = tag.match(/(?:href|src)="(\/[^"?]+)(?:\?[^"]*)?"/)?.[1];
    if (src && !src.startsWith("//")) await access(resolve(output, src.slice(1)));
  }
  for (const [, rawHref] of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
    const href = rawHref.replaceAll("&amp;", "&");
    assert.ok(href && href !== "#", `${file}: no placeholder destinations`);
    assert.ok(!/^(?:mailto|tel|javascript):/i.test(href), `${file}: no sample contact actions`);
    if (href.startsWith("#")) {
      assert.ok(html.includes(`id="${href.slice(1)}"`), `${file}: anchor ${href} exists`);
    } else if (href.startsWith("/") && !href.startsWith("//")) {
      const destination = new URL(href, "https://demo.invalid");
      assert.ok(localPaths.has(destination.pathname), `${file}: ${href} resolves within the demo`);
      if (destination.hash) {
        const [destinationFile] = routes.find(([, pathname]) => pathname === destination.pathname);
        const destinationHtml = await readFile(resolve(output, destinationFile), "utf8");
        assert.ok(
          destinationHtml.includes(`id="${destination.hash.slice(1)}"`),
          `${file}: destination anchor ${href} exists`,
        );
      }
    }
  }
  assert.ok(
    html.includes("https://lltechsolutions.ca/website-collection/lawncare"),
    `${file}: return to the correct L&L template`,
  );
  const enquiry = [...html.matchAll(/href="(https:\/\/lltechsolutions\.ca\/contact\?[^\"]+)"/g)]
    .map(([, href]) => new URL(href.replaceAll("&amp;", "&")))
    .filter((url) => url.searchParams.get("design") === "lawncare");
  assert.ok(enquiry.length, `${file}: real enquiry keeps the selected lawncare design`);
  assert.ok(!/<form\b/.test(html), `${file}: demo does not collect contractor enquiries`);
}

assert.equal(headings.size, routes.length, "All four pages have distinct main headings");
assert.equal(titles.size, routes.length, "All four pages have distinct document titles");
const contact = await readFile(resolve(output, "contact.html"), "utf8");
assert.ok(contact.includes("not a lawncare contractor"), "Demo is clearly identified");
const visibleContact = contact.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const displayedEmails = visibleContact.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
assert.ok(displayedEmails.length, "Contact demonstrates an explicitly labelled email layout");
assert.ok(
  displayedEmails.every((email) => email === "hello@example.com"),
  "The only sample email uses the reserved example.com domain",
);
assert.match(visibleContact, /DEMO EMAIL[\s\S]*?EXAMPLE ONLY/i, "Sample email is clearly labelled");
const work = await readFile(resolve(output, "our-work.html"), "utf8");
assert.match(work, /illustrative/i, "Work imagery is disclosed as illustrative");
for (const asset of ["lawn-hero.webp", "lawn-detail.webp"])
  await access(resolve(output, "images/collection", asset));
await access(resolve(output, "404.html"));

// Headers must travel with the static output; Next.js headers are not exported.
await cp(resolve(root, "templates/lawncare-demo/vercel.json"), resolve(output, "vercel.json"));
const config = JSON.parse(await readFile(resolve(output, "vercel.json"), "utf8"));
const headers = config.headers.find((item) => item.source === "/(.*)")?.headers;
assert.ok(headers, "Security headers cover every static route");
for (const name of [
  "Content-Security-Policy",
  "X-Frame-Options",
  "X-Content-Type-Options",
  "X-Robots-Tag",
  "Referrer-Policy",
  "Strict-Transport-Security",
  "Permissions-Policy",
  "Cross-Origin-Opener-Policy",
])
  assert.ok(
    headers.some((item) => item.key === name),
    `Static deployment sends ${name}`,
  );
assert.equal(headers.find((item) => item.key === "X-Robots-Tag").value, "noindex, nofollow");
assert.equal(config.cleanUrls, true);
console.log(
  `PASS: ${routes.length} distinct standalone lawncare pages, active navigation, local assets, working destinations, correct enquiry links, labelled sample email without delivery actions, noindex and static deployment headers. Browser rendering remains a separate review.`,
);
