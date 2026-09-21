import assert from "node:assert/strict";
import { readFile, access, cp } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "build/painting-demo/out");
const files = ["index.html", "services.html", "projects.html", "contact.html"];
let checks = 0;
for (const file of files) {
  const html = await readFile(resolve(output, file), "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${file}: one main heading`);
  assert.ok(html.includes('data-painting-demo="pigment"'), `${file}: standalone demo marker`);
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${file}: demo is not indexed`);
  assert.ok(html.includes("From $499 CAD"), `${file}: agreed price`);
  const nav = html.match(/<nav class="paint-nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, `${file}: painting navigation`);
  for (const route of ["/", "/services", "/projects", "/contact"])
    assert.ok(nav.includes(`href="${route}"`), `${file}: real ${route} link`);
  assert.equal(
    (nav.match(/aria-current="page"/g) ?? []).length,
    1,
    `${file}: one active navigation item`,
  );
  assert.ok(!nav.includes("<button"), `${file}: navigation works without JavaScript`);
  for (const [tag] of html.matchAll(/<(?:link|script|img)\b[^>]*>/g)) {
    const src = tag.match(/(?:href|src)="(\/[^"?]+)(?:\?[^"]*)?"/)?.[1];
    if (src && !src.startsWith("//")) await access(resolve(output, src.slice(1)));
  }
  assert.ok(html.includes("https://lltechsolutions.ca/contact?"), `${file}: real L&L enquiry link`);
  checks++;
}
const contact = await readFile(resolve(output, "contact.html"), "utf8");
assert.ok(contact.includes("no information collected or sent"));
assert.ok(!contact.includes("<form"), "No pretend painting form submits data");
const projects = await readFile(resolve(output, "projects.html"), "utf8");
assert.ok(projects.includes("not completed painting projects"));
await access(resolve(output, "404.html"));
// A static upload needs deployment headers alongside its exported files.
await cp(resolve(root, "templates/painting-demo/vercel.json"), resolve(output, "vercel.json"));
const config = JSON.parse(await readFile(resolve(output, "vercel.json"), "utf8"));
const headers = config.headers[0].headers;
for (const name of [
  "Content-Security-Policy",
  "X-Frame-Options",
  "X-Content-Type-Options",
  "X-Robots-Tag",
])
  assert.ok(headers.some((item) => item.key === name));
assert.equal(config.cleanUrls, true);
console.log(
  `PASS: ${checks} standalone pages, real navigation, local assets, enquiry links, noindex and static deployment headers. Browser rendering remains a separate review.`,
);
