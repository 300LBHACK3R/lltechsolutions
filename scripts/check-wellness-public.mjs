import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const approvedOrigin = "https://ll-wellness-template.vercel.app";
const routes = ["", "/treatments", "/pricing", "/about", "/faq", "/contact"];

export function validateWellnessSegmentsManifest(manifest) {
  assert(manifest?.version === 1 && Array.isArray(manifest.files), "Missing segment manifest.");
  assert(manifest.files.length > 0 && manifest.files.length <= 128, "Invalid segment file count.");
  const paths = new Set();
  for (const file of manifest.files) {
    assert(
      typeof file.path === "string" &&
        /^\/(?:(?:treatments|pricing|about|faq|contact|_not-found)\/)?__next\.[a-zA-Z0-9_$@.!-]+\.txt$/.test(
          file.path,
        ) &&
        !file.path.includes(".."),
      "Unexpected segment path in manifest.",
    );
    assert(!paths.has(file.path), `Duplicate segment path: ${file.path}`);
    paths.add(file.path);
    assert(/^[a-f0-9]{64}$/.test(file.sha256), `Missing segment hash: ${file.path}`);
    assert(
      Number.isSafeInteger(file.bytes) && file.bytes > 0 && file.bytes <= 10_000_000,
      `Invalid segment size: ${file.path}`,
    );
  }
  for (const route of routes) {
    for (const name of ["_tree", "_full", "$oc$view.__PAGE__"]) {
      assert(paths.has(`${route}/__next.${name}.txt`), `Missing ${route || "/"} segment: ${name}`);
    }
  }
  return manifest.files;
}

export async function verifyWellnessPublicSegments({ url, manifest, fetchImpl = fetch }) {
  const source = new URL(url);
  assert(
    source.origin === approvedOrigin &&
      source.pathname === "/" &&
      !source.username &&
      !source.password &&
      !source.search &&
      !source.hash,
    "Only the approved public wellness demo root can be checked.",
  );
  async function request(path) {
    const response = await fetchImpl(new URL(path, source), {
      redirect: "error",
      headers: { "Cache-Control": "no-cache" },
      signal: AbortSignal.timeout(30000),
    });
    assert.equal(
      response.status,
      200,
      `Public segment request failed: ${path} (HTTP ${response.status}). Rebuild and republish the corrected demo before capture.`,
    );
    return response;
  }
  const publishedManifest = await (await request("/wellness-segments.json")).json();
  const files = validateWellnessSegmentsManifest(publishedManifest);
  if (manifest) {
    validateWellnessSegmentsManifest(manifest);
    const ordered = (value) => [...value.files].sort((a, b) => a.path.localeCompare(b.path));
    assert.deepEqual(
      ordered(publishedManifest),
      ordered(manifest),
      "The deployed segment manifest differs from this build. No screenshots were captured.",
    );
  }
  for (let start = 0; start < files.length; start += 4) {
    await Promise.all(
      files.slice(start, start + 4).map(async (file) => {
        const bytes = Buffer.from(await (await request(file.path)).arrayBuffer());
        assert.equal(bytes.length, file.bytes, `Public segment size mismatch: ${file.path}`);
        assert.equal(
          createHash("sha256").update(bytes).digest("hex"),
          file.sha256,
          `Public segment content mismatch: ${file.path}`,
        );
      }),
    );
  }
  return files.length;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { values } = parseArgs({
    options: { url: { type: "string" }, manifest: { type: "string" } },
    strict: true,
  });
  const manifest = values.manifest
    ? JSON.parse(await readFile(values.manifest, "utf8"))
    : undefined;
  const count = await verifyWellnessPublicSegments({ url: values.url ?? "", manifest });
  console.log(`PASS: ${count} public wellness page-data files match their build hashes.`);
}
