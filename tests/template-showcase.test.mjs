import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { readTemplateShowcase } from "../src/lib/template-showcase.ts";
import {
  paintingPageFromPath,
  paintingPagePath,
  paintingPages,
} from "../src/data/painting-pages.ts";

test("showcase media rejects unsafe links, missing descriptions and paths outside its screenshot folder", () => {
  const image = {
    src: "/images/templates/pigment/home-desktop.webp",
    alt: "Painting homepage",
    caption: "Home / desktop",
    width: 1440,
    height: 2000,
  };
  assert.equal(readTemplateShowcase({ url: "javascript:alert(1)" }).url, null);
  assert.equal(readTemplateShowcase({ url: "https://user:secret@example.com" }).url, null);
  assert.equal(
    readTemplateShowcase({ url: "https://example.vercel.app/" }).url,
    "https://example.vercel.app/",
  );
  const media = readTemplateShowcase({
    screenshots: [
      image,
      { ...image, src: "/images/templates/pigment/../private.png" },
      { ...image, alt: "" },
      { ...image, width: 0 },
    ],
  });
  assert.deepEqual(media.screenshots, [image]);
});

test("configured painting screenshots exist and retain their order", () => {
  const config = JSON.parse(fs.readFileSync("src/data/painting-demo.json", "utf8"));
  const parsed = readTemplateShowcase(config);
  assert.equal(parsed.url, config.url);
  assert.equal(
    parsed.screenshots.length,
    config.screenshots.length,
    "Every configured screenshot must have valid metadata",
  );
  assert.equal(
    new Set(parsed.screenshots.map((image) => image.src)).size,
    parsed.screenshots.length,
    "Screenshot paths must be unique",
  );
  for (const image of parsed.screenshots)
    assert.ok(fs.existsSync(path.join("public", image.src)), `Missing screenshot: ${image.src}`);
});

test("standalone painting destinations round-trip and unknown routes are rejected", () => {
  for (const page of paintingPages) {
    const pathname = paintingPagePath(page);
    assert.equal(paintingPageFromPath(pathname.split("/").filter(Boolean)), page);
  }
  assert.equal(paintingPageFromPath(["services", "unknown"]), null);
  assert.equal(paintingPageFromPath(["admin"]), null);
});

test("plumbing screenshots are isolated to their own upload folder", () => {
  const shot = {
    src: "/images/templates/structure/home-desktop.webp",
    alt: "Plumbing homepage",
    caption: "Home / desktop",
    width: 1440,
    height: 960,
  };
  assert.deepEqual(readTemplateShowcase({ screenshots: [shot] }, "structure").screenshots, [shot]);
  assert.deepEqual(readTemplateShowcase({ screenshots: [shot] }, "pigment").screenshots, []);
  assert.deepEqual(
    readTemplateShowcase(
      { screenshots: [{ ...shot, src: "/images/templates/structure/../private.png" }] },
      "structure",
    ).screenshots,
    [],
  );
  const config = JSON.parse(fs.readFileSync("src/data/plumbing-demo.json", "utf8"));
  const parsed = readTemplateShowcase(config, "structure");
  assert.equal(parsed.url, config.url);
  assert.equal(parsed.screenshots.length, config.screenshots.length);
  for (const image of parsed.screenshots) assert.ok(fs.existsSync(path.join("public", image.src)));
});

test("earthworks media keeps its verified URL and isolates screenshot paths", () => {
  const shot = {
    src: "/images/templates/earthworks/home-desktop.webp",
    alt: "Earthworks homepage",
    caption: "Home / desktop",
    width: 1440,
    height: 960,
  };
  assert.deepEqual(readTemplateShowcase({ screenshots: [shot] }, "earthworks").screenshots, [shot]);
  assert.deepEqual(readTemplateShowcase({ screenshots: [shot] }, "structure").screenshots, []);
  const config = JSON.parse(fs.readFileSync("src/data/earthworks-demo.json", "utf8"));
  const parsed = readTemplateShowcase(config, "earthworks");
  assert.equal(parsed.url, config.url);
  assert.equal(parsed.screenshots.length, config.screenshots.length);
  for (const image of parsed.screenshots) assert.ok(fs.existsSync(path.join("public", image.src)));
});
