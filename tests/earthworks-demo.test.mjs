import test from "node:test";
import assert from "node:assert/strict";
import {
  earthworksPageFromPath,
  earthworksPagePath,
  earthworksPages,
} from "../src/data/earthworks-pages.ts";

test("earthworks demo destinations round-trip and unsupported routes are rejected", () => {
  for (const page of earthworksPages) {
    const pathname = earthworksPagePath(page);
    assert.equal(earthworksPageFromPath(pathname.split("/").filter(Boolean)), page);
  }
  assert.equal(earthworksPageFromPath(), "Home");
  assert.equal(earthworksPageFromPath(["services", "unknown"]), null);
  assert.equal(earthworksPageFromPath(["admin"]), null);
  assert.equal(earthworksPageFromPath(["Services"]), null);
});
