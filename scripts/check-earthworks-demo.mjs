import assert from "node:assert/strict";
import { readFile, access, cp } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "build/earthworks-demo/out");
const routes = [
  ["index.html", "/"],
  ["services.html", "/services"],
  ["projects.html", "/projects"],
  ["process.html", "/process"],
  ["contact.html", "/contact"],
];

for (const [file, activePath] of routes) {
  const html = await readFile(resolve(output, file), "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${file}: one main heading`);
  assert.ok(html.includes('data-earthworks-demo="earthworks"'), `${file}: standalone marker`);
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${file}: search exclusion`);
  assert.ok(html.includes("From $1,000 CAD"), `${file}: approved starting price`);
  const nav = html.match(/<nav\b[^>]*class="[^"]*earth-nav[^\"]*"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, `${file}: earthworks navigation`);
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
  assert.ok(
    html.includes("https://lltechsolutions.ca/website-collection/earthworks"),
    `${file}: return to the correct L&L template`,
  );
  const enquiry = [...html.matchAll(/href="(https:\/\/lltechsolutions\.ca\/contact\?[^\"]+)"/g)]
    .map(([, href]) => new URL(href.replaceAll("&amp;", "&")))
    .filter((url) => url.searchParams.get("design") === "earthworks");
  assert.ok(enquiry.length, `${file}: real enquiry keeps the selected earthworks design`);
}

const contact = await readFile(resolve(output, "contact.html"), "utf8");
assert.ok(!/<form\b/.test(contact), "Demo does not collect fake earthworks enquiries");
assert.ok(contact.includes("not an earthworks contractor"), "Demo is clearly identified");
assert.ok(contact.includes("Nothing is submitted"), "Interactive planner is local-only");
const projects = await readFile(resolve(output, "projects.html"), "utf8");
assert.ok(projects.includes("not completed client projects"), "Project imagery is illustrative");
await access(resolve(output, "404.html"));

// Headers must travel with the static output; Next.js headers are not exported.
await cp(resolve(root, "templates/earthworks-demo/vercel.json"), resolve(output, "vercel.json"));
const config = JSON.parse(await readFile(resolve(output, "vercel.json"), "utf8"));
const headers = config.headers[0].headers;
for (const name of [
  "Content-Security-Policy",
  "X-Frame-Options",
  "X-Content-Type-Options",
  "X-Robots-Tag",
  "Referrer-Policy",
])
  assert.ok(
    headers.some((item) => item.key === name),
    `Static deployment sends ${name}`,
  );
assert.equal(headers.find((item) => item.key === "X-Robots-Tag").value, "noindex, nofollow");
assert.equal(config.cleanUrls, true);
console.log(
  `PASS: ${routes.length} standalone earthworks pages, active navigation, local assets, correct enquiry links, noindex and static deployment headers. Browser rendering remains a separate review.`,
);
