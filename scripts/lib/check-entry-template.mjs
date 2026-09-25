import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, cp, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import {
  collectionInquiryHref,
  designPrice,
  websiteDesigns,
} from "../../src/data/website-collection.ts";
import { entryTemplateDemo } from "./entry-template-config.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const visibleMarkup = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const decodeHref = (href) => href.replaceAll("&amp;", "&");

function segmentFiles(manifest, demo) {
  assert(manifest?.version === 1 && Array.isArray(manifest.files), "Missing page-data manifest");
  assert(manifest.files.length > 0 && manifest.files.length < 100, "Invalid page-data file count");
  const paths = new Set();
  const directories = new Set(
    [...demo.routes, "/_not-found"].map((path) => (path === "/" ? "" : path)),
  );
  for (const file of manifest.files) {
    assert(typeof file.path === "string" && !file.path.includes(".."), "Invalid page-data path");
    const match = file.path.match(/^(.*?)\/(__next\.[A-Za-z0-9_$@.!-]+\.txt)$/);
    assert(match && directories.has(match[1]), `Unexpected page-data file: ${file.path}`);
    assert(!paths.has(file.path), `Duplicate page-data file: ${file.path}`);
    paths.add(file.path);
    assert(/^[a-f0-9]{64}$/.test(file.sha256), "Invalid page-data hash");
    assert(
      Number.isSafeInteger(file.bytes) && file.bytes > 0 && file.bytes < 10_000_000,
      "Invalid page-data size",
    );
  }
  for (const directory of directories) {
    assert(paths.has(`${directory}/__next._tree.txt`), `Missing route tree: ${directory || "/"}`);
    assert(paths.has(`${directory}/__next._full.txt`), `Missing full route: ${directory || "/"}`);
    assert(
      [...paths].some(
        (path) => path.startsWith(`${directory}/__next.`) && path.endsWith(".__PAGE__.txt"),
      ),
      `Missing page segment: ${directory || "/"}`,
    );
  }
  return manifest.files;
}

async function validateSegments(manifest, demo, readBytes) {
  const files = segmentFiles(manifest, demo);
  for (let start = 0; start < files.length; start += 4) {
    await Promise.all(
      files.slice(start, start + 4).map(async (file) => {
        const bytes = await readBytes(file.path);
        assert.equal(bytes.length, file.bytes, `Page-data byte length: ${file.path}`);
        assert.equal(
          createHash("sha256").update(bytes).digest("hex"),
          file.sha256,
          `Page-data content: ${file.path}`,
        );
      }),
    );
  }
  return files.length;
}

function validatePages(pages, demo, design) {
  const enquiry = new URL(collectionInquiryHref({ design: demo.id }), "https://lltechsolutions.ca");
  const headings = new Set();
  const titles = new Set();
  for (const [activePath, html] of pages) {
    const visible = visibleMarkup(html);
    assert.equal(
      (visible.match(/<main(?:\s|>)/g) ?? []).length,
      1,
      `${activePath}: one main landmark`,
    );
    assert.equal(
      (visible.match(/<h1(?:\s|>)/g) ?? []).length,
      1,
      `${activePath}: one main heading`,
    );
    assert(visible.includes(demo.marker), `${activePath}: correct template identity`);
    assert.match(
      html,
      /name="robots" content="noindex, nofollow"/,
      `${activePath}: excluded from search`,
    );
    assert(html.includes(designPrice(design)), `${activePath}: canonical ${demo.price} CAD price`);
    for (const setting of ["telephone=no", "email=no", "address=no"]) {
      assert(
        html.match(/name="format-detection" content="([^"]+)"/)?.[1]?.includes(setting),
        `${activePath}: ${setting}`,
      );
    }
    const heading = visible.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert(heading && title, `${activePath}: rendered heading and title`);
    headings.add(heading);
    titles.add(title);
    const nav = visible.match(
      new RegExp(`<nav\\b[^>]*class="[^"]*\\b${demo.navClass}\\b[^"]*"[\\s\\S]*?<\\/nav>`),
    )?.[0];
    assert(nav, `${activePath}: navigation is present before hydration`);
    if (demo.routes.length > 1) {
      for (const route of demo.routes)
        assert(nav.includes(`href="${route}"`), `${activePath}: ${route} navigation`);
      const current = [...nav.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)];
      assert.equal(current.length, 1, `${activePath}: one current navigation item`);
      assert(
        current[0][0].includes(`href="${activePath}"`),
        `${activePath}: correct current navigation item`,
      );
    }
    const anchors = [...visible.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
    assert(
      anchors.some(
        ([, href]) => href === `https://lltechsolutions.ca/website-collection/${demo.id}`,
      ),
      `${activePath}: return to template details`,
    );
    const purchase = anchors.filter(([, , text]) => text.includes("Make this my website"));
    assert(purchase.length, `${activePath}: real L&L enquiry action`);
    for (const [, href] of purchase)
      assert.equal(
        new URL(decodeHref(href)).href,
        enquiry.href,
        `${activePath}: enquiry retains design`,
      );
    for (const [, rawHref] of anchors) {
      const href = decodeHref(rawHref);
      assert(href && href !== "#", `${activePath}: no empty links`);
      assert(
        !/^(?:mailto|tel|javascript):/i.test(href),
        `${activePath}: sample contact details stay inert`,
      );
      if (href.startsWith("#")) {
        assert(visible.includes(`id="${href.slice(1)}"`), `${activePath}: ${href} target exists`);
      } else if (href.startsWith("/") && !href.startsWith("//")) {
        const destination = new URL(href, "https://demo.invalid");
        assert(pages.has(destination.pathname), `${activePath}: ${href} is a real page`);
        if (destination.hash)
          assert(
            pages.get(destination.pathname).includes(`id="${destination.hash.slice(1)}"`),
            `${activePath}: ${href} target exists`,
          );
      } else {
        assert.equal(
          new URL(href).origin,
          "https://lltechsolutions.ca",
          `${activePath}: external action leads only to L&L`,
        );
      }
    }
    assert(
      !/<form\b/.test(visible),
      `${activePath}: no form endpoint is implied in the direct-contact offer`,
    );
    assert.match(
      visible,
      /sample|demonstration|illustrative/i,
      `${activePath}: demonstration is disclosed`,
    );
  }
  assert.equal(headings.size, demo.routes.length, "Distinct page headings");
  assert.equal(titles.size, demo.routes.length, "Distinct page titles");
}

async function publicRequest(origin, path) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(new URL(path, origin), {
        redirect: "error",
        headers: { "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(30000),
      });
      if ([404, 408, 425, 429, 500, 502, 503, 504].includes(response.status) && attempt < 2) {
        await response.body?.cancel();
        await new Promise((resolveDelay) => setTimeout(resolveDelay, (attempt + 1) * 2000));
        continue;
      }
      assert.equal(
        response.status,
        200,
        `Public ${path}: HTTP ${response.status}; no catalogue link was changed`,
      );
      return response;
    } catch (error) {
      if (attempt === 2 || error.code === "ERR_ASSERTION") throw error;
      await new Promise((resolveDelay) => setTimeout(resolveDelay, (attempt + 1) * 2000));
    }
  }
}

export async function checkEntryTemplate(kind) {
  const demo = entryTemplateDemo(kind);
  const { values } = parseArgs({
    options: { url: { type: "string" }, manifest: { type: "string" } },
    strict: true,
  });
  const design = websiteDesigns.find((entry) => entry.id === demo.id);
  assert(design, "The template exists in the canonical catalogue");
  assert.equal(
    design.startingPriceCad,
    demo.price,
    "The advertised starting price matches this offer",
  );
  assert.equal(
    design.pageCount,
    demo.routes.length,
    "The demonstration matches the offered page count",
  );
  assert.equal(design.contactMode, "direct", "The offer includes direct contact");
  const output = resolve(root, "build", demo.folder, "out");
  const pages = new Map();
  if (values.url) {
    const approved = `https://${demo.project}.vercel.app/`;
    assert.equal(
      values.url.replace(/\/$/, "") + "/",
      approved,
      "Only the approved public production alias can be checked",
    );
    for (const route of demo.routes) {
      const response = await publicRequest(approved, route);
      assert.match(
        response.headers.get("x-robots-tag") ?? "",
        /noindex/,
        `${route}: public noindex header`,
      );
      assert.equal(
        response.headers.get("x-content-type-options"),
        "nosniff",
        `${route}: public content-type protection`,
      );
      pages.set(route, await response.text());
    }
    validatePages(pages, demo, design);
    const manifest = await (await publicRequest(approved, "/static-segments.json")).json();
    if (values.manifest) {
      const localManifest = JSON.parse(await readFile(values.manifest, "utf8"));
      segmentFiles(localManifest, demo);
      assert.deepEqual(
        manifest,
        localManifest,
        "The public page-data manifest matches this deployment's build",
      );
    }
    const count = await validateSegments(manifest, demo, async (path) =>
      Buffer.from(await (await publicRequest(approved, path)).arrayBuffer()),
    );
    console.log(
      `PASS: public ${demo.label} demo, ${demo.routes.length} pages, correct price and enquiry destinations, required headers and ${count} page-data hashes. No browser capture or email was performed.`,
    );
    return;
  }
  for (const route of demo.routes)
    pages.set(
      route,
      await readFile(
        resolve(output, route === "/" ? "index.html" : `${route.slice(1)}.html`),
        "utf8",
      ),
    );
  validatePages(pages, demo, design);
  for (const [route, html] of pages) {
    for (const [tag] of html.matchAll(/<(?:link|script|img)\b[^>]*>/g)) {
      const src = tag.match(/(?:href|src)="(\/[^"?]+)(?:\?[^"]*)?"/)?.[1];
      if (src && !src.startsWith("//")) await access(resolve(output, src.slice(1)));
      if (tag.startsWith("<img")) {
        assert.match(tag, /\ssrc="\/images\//, `${route}: local imagery`);
        assert.match(tag, /\salt="[^"]*"/, `${route}: alternative text`);
      }
    }
  }
  const manifest = JSON.parse(await readFile(resolve(output, "static-segments.json"), "utf8"));
  const count = await validateSegments(manifest, demo, (path) =>
    readFile(resolve(output, path.slice(1))),
  );
  const notFound = await readFile(resolve(output, "404.html"), "utf8");
  assert.match(notFound, /name="robots" content="noindex/, "404 excluded from search");
  assert(notFound.includes('href="/"'), "404 returns to the demo");
  await assert.rejects(access(resolve(output, "api")), "No API is exported");
  await cp(resolve(root, "templates", demo.folder, "vercel.json"), resolve(output, "vercel.json"));
  const config = JSON.parse(await readFile(resolve(output, "vercel.json"), "utf8"));
  const baseline = JSON.parse(
    await readFile(resolve(root, "templates/lawncare-demo/vercel.json"), "utf8"),
  );
  assert.deepEqual(config.headers, baseline.headers, "Maintained static deployment header policy");
  assert.equal(config.framework, null, "Static Vercel Framework Other");
  assert.equal(config.cleanUrls, true, "Clean page URLs");
  console.log(
    `PASS: ${demo.routes.length} ${demo.label} pages, navigation and enquiry destinations, $${demo.price} scope, local assets, noindex, headers and ${count} page-data hashes. Browser rendering remains a separate review.`,
  );
}
