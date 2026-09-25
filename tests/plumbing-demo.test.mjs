import test from "node:test";
import assert from "node:assert/strict";
import {
  plumbingPageFromPath,
  plumbingPagePath,
  plumbingPages,
} from "../src/data/plumbing-pages.ts";

test("plumbing demo destinations round-trip and unsupported routes are rejected", () => {
  for (const page of plumbingPages) {
    const pathname = plumbingPagePath(page);
    assert.equal(plumbingPageFromPath(pathname.split("/").filter(Boolean)), page);
  }
  assert.equal(plumbingPageFromPath(), "Home");
  assert.equal(plumbingPageFromPath(["services", "unknown"]), null);
  assert.equal(plumbingPageFromPath(["admin"]), null);
  assert.equal(plumbingPageFromPath(["Services"]), null);
});
