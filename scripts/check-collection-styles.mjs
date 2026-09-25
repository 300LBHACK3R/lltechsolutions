import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// HTML-only checks missed a deployed bundle with all collection styles absent.
// Check delivered CSS, including one dependency from each collection stylesheet.
const routes = new Map([
  ["/", ["home-premium", "premium-hero", "home-work-row"]],
  [
    "/website-collection",
    [
      "collection-intro",
      "collection-intro-copy",
      "template-category-section",
      "template-category-heading",
      "collection-process-strip",
      "collection-roadmap",
      "template-category-list",
      "template-category-photo",
      "collection-customization",
      "collection-contact-options",
    ],
  ],
  [
    "/website-collection/category/construction-trades",
    [
      "template-gallery-hero",
      "collection-design-grid",
      "design-cover",
      "template-mini-hero",
      "paint-cover",
      "plumb-cover",
      "earth-cover",
      "lawn-cover",
      "horizon-cover",
    ],
  ],
  [
    "/website-collection/category/health-wellness",
    ["template-gallery-heading", "template-mini-hero", "wellness-cover"],
  ],
  [
    "/website-collection/pigment",
    [
      "paint-cover",
      "template-detail-header",
      "template-detail-intro",
      "template-detail-purchase",
      "template-detail-preview-heading",
      "template-screenshot-main",
    ],
  ],
  ["/website-collection/structure", ["plumb-cover", "template-detail-header"]],
  ["/website-collection/earthworks", ["earth-cover", "earth-cover-hero", "template-detail-header"]],
  [
    "/website-collection/lawncare",
    ["lawn-cover", "template-detail-header", "collection-contact-options"],
  ],
  ["/website-collection/still", ["design-preview-viewport", "design-name-field"]],
  [
    "/website-collection/horizon",
    ["template-detail-header", "horizon-cover", "collection-contact-options"],
  ],
  ["/website-collection/calgary-hot-shot", ["live-demo-scroll"]],
  ["/website-collection/tow-n-go", ["project-video", "design-detail-scope"]],
  ["/website-collection/crestline", ["project-video", "design-detail-scope"]],
  [
    "/website-collection/mckenzie-house",
    ["wellness-cover", "template-case-study", "design-detail-scope"],
  ],
  ["/website-collection/start?design=pigment", ["journey-progress", "journey-options"]],
  ["/website-collection/compare?design=pigment&design=still", ["design-comparison"]],
  ["/website-collection/brief", ["brief-fields"]],
]);

function assertStyles(css, classes, label) {
  for (const name of classes) {
    assert.match(
      css,
      new RegExp(`\\.${name}(?=[\\s.{:#>+~,\\[])`),
      `${label}: missing .${name} styles`,
    );
  }
}

export async function checkCollectionStyles(origin) {
  const base = new URL(origin);
  assert.ok(["http:", "https:"].includes(base.protocol), "Use an HTTP(S) website URL");
  const stylesheets = new Map();
  for (const [route, classes] of routes) {
    const page = await fetch(new URL(route, base), { signal: AbortSignal.timeout(15000) });
    assert.equal(page.status, 200, `${route}: page response`);
    const html = await page.text();
    const css = [];
    for (const [tag] of html.matchAll(/<link\b[^>]*>/g)) {
      if (!/\brel="stylesheet"/.test(tag)) continue;
      const href = tag.match(/\bhref="([^"]+)"/)?.[1];
      assert.ok(href, `${route}: stylesheet URL`);
      const url = new URL(href.replaceAll("&amp;", "&"), base);
      assert.equal(url.origin, base.origin, `${route}: first-party stylesheet`);
      if (!stylesheets.has(url.href)) {
        const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
        assert.equal(response.status, 200, `${url.pathname}: stylesheet response`);
        assert.match(response.headers.get("content-type") || "", /^text\/css\b/i);
        stylesheets.set(url.href, await response.text());
      }
      css.push(stylesheets.get(url.href));
    }
    assert.ok(css.length, `${route}: linked stylesheets are present`);
    assertStyles(css.join("\n"), classes, route);
  }
  return routes.size;
}

async function checkBuiltStyles() {
  const directory = resolve(".next/static");
  const files = (await readdir(directory, { recursive: true })).filter((file) =>
    file.endsWith(".css"),
  );
  assert.ok(files.length, "Production CSS is present; run next build first");
  const css = await Promise.all(files.map((file) => readFile(join(directory, file), "utf8")));
  assertStyles(css.join("\n"), new Set([...routes.values()].flat()), "Production build");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    if (process.argv[2] === "--url") {
      assert.ok(process.argv[3], "Supply a website URL after --url");
      const count = await checkCollectionStyles(process.argv[3]);
      console.log(`PASS: delivered collection styles on ${count} routes.`);
    } else {
      assert.equal(
        process.argv.length,
        2,
        "Usage: node scripts/check-collection-styles.mjs [--url URL]",
      );
      await checkBuiltStyles();
      console.log("PASS: production CSS includes collection, enquiry and preview styles.");
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
