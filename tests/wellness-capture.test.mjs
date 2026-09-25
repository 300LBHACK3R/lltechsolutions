import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { isCompletedHeadTransfer } from "../scripts/lib/capture-request-failures.mjs";
import {
  verifyWellnessPublicSegments,
  validateWellnessSegmentsManifest,
} from "../scripts/check-wellness-public.mjs";

test("only a confirmed successful HEAD transfer can excuse Chromium's body cancellation", () => {
  const completed = {
    method: "HEAD",
    resourceType: "fetch",
    errorText: "net::ERR_ABORTED",
    status: 200,
  };
  assert.equal(isCompletedHeadTransfer(completed), true);
  for (const override of [
    { method: "GET" },
    { resourceType: "image" },
    { status: 404 },
    { status: 500 },
    { status: undefined },
    { errorText: "net::ERR_CONNECTION_RESET" },
  ])
    assert.equal(isCompletedHeadTransfer({ ...completed, ...override }), false);
});

const payload = '0:{"sample":"exported route data"}\n';
const files = ["", "/treatments", "/pricing", "/about", "/faq", "/contact"].flatMap((route) =>
  ["_tree", "_full", "$oc$view.__PAGE__"].map((name) => ({
    path: `${route}/__next.${name}.txt`,
    bytes: Buffer.byteLength(payload),
    sha256: createHash("sha256").update(payload).digest("hex"),
  })),
);
const manifest = { version: 1, files };
const url = "https://ll-wellness-template.vercel.app/";

test("public verification checks every deployed page-data file against its build", async () => {
  const seen = [];
  const fetchImpl = async (target) => {
    seen.push(target.pathname);
    return target.pathname === "/wellness-segments.json"
      ? Response.json(manifest)
      : new Response(payload);
  };
  assert.equal(await verifyWellnessPublicSegments({ url, manifest, fetchImpl }), 18);
  assert.equal(new Set(seen).size, 19);
});

test("public verification rejects missing segment files and HTML fallbacks", async () => {
  for (const failedResponse of [
    () => new Response("Missing", { status: 404 }),
    () => new Response("<html>fallback</html>"),
  ]) {
    const fetchImpl = async (target) =>
      target.pathname === "/wellness-segments.json" ? Response.json(manifest) : failedResponse();
    await assert.rejects(verifyWellnessPublicSegments({ url, manifest, fetchImpl }));
  }
});

test("segment manifests must include all six routes and cannot redirect checks elsewhere", () => {
  assert.throws(() => validateWellnessSegmentsManifest({ ...manifest, files: files.slice(1) }));
  for (const path of [
    "https://example.com/file",
    "/../secret.txt",
    "/contact/__next..txt",
    "/admin/__next._tree.txt",
  ]) {
    assert.throws(() =>
      validateWellnessSegmentsManifest({ ...manifest, files: [...files, { ...files[0], path }] }),
    );
  }
});
