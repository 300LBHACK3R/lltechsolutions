import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, win32 } from "node:path";
import {
  normalizeStaticExportSegments,
  staticSegmentFilename,
} from "../scripts/lib/static-export-segments.mjs";

async function fixture(t, segments = ["/_tree", "/_full", "/$oc$view/__PAGE__"]) {
  const projectDirectory = await mkdtemp(join(tmpdir(), "wellness-rsc-test-"));
  t.after(() => rm(projectDirectory, { recursive: true, force: true }));
  const routes = ["/", "/contact", "/_not-found"];
  const sources = new Map();
  for (const route of routes) {
    const stem = route === "/" ? "index" : route.slice(1);
    const metadata = join(projectDirectory, ".next/server/app", `${stem}.meta`);
    await mkdir(dirname(metadata), { recursive: true });
    await writeFile(metadata, JSON.stringify({ segmentPaths: segments }));
    await mkdir(join(projectDirectory, "out"), { recursive: true });
    await writeFile(join(projectDirectory, "out", `${stem}.html`), "<!doctype html><p>Sample</p>");
    for (const segment of segments) {
      const path = join(
        projectDirectory,
        ".next/server/app",
        `${stem}.segments`,
        `${segment.slice(1)}.segment.rsc`,
      );
      const bytes = Buffer.from(`0:${JSON.stringify({ route, segment })}\n`);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, bytes);
      const url = `${route === "/" ? "" : route}/${staticSegmentFilename(segment)}`;
      sources.set(url, { path, bytes });
    }
  }
  return { projectDirectory, routes, sources };
}

test("normalizes Windows segment separators to the browser's POSIX filename protocol", () => {
  const native = win32.relative(
    "C:\\build\\index.segments",
    "C:\\build\\index.segments\\$oc$view\\__PAGE__.segment.rsc",
  );
  assert.equal(native, "$oc$view\\__PAGE__.segment.rsc");
  assert.equal(
    staticSegmentFilename(`/${native.slice(0, -".segment.rsc".length)}`),
    "__next.$oc$view.__PAGE__.txt",
  );
  assert.equal(staticSegmentFilename("/$oc$view/__PAGE__"), "__next.$oc$view.__PAGE__.txt");
});

test("repairs Windows nested export copies byte-for-byte and is idempotent", async (t) => {
  const sample = await fixture(t);
  const { projectDirectory, routes, sources } = sample;
  for (const [url, { bytes }] of sources) {
    const windowsOutput = url.replace(
      "__next.$oc$view.__PAGE__.txt",
      "__next.$oc$view/__PAGE__.txt",
    );
    const target = join(projectDirectory, "out", windowsOutput.slice(1));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, bytes);
  }
  const first = await normalizeStaticExportSegments({ projectDirectory, routes });
  assert.equal(first.added, 3);
  assert.equal(first.manifest.files.length, 9);
  for (const entry of first.manifest.files) {
    const original = sources.get(entry.path).bytes;
    assert.deepEqual(await readFile(join(projectDirectory, "out", entry.path.slice(1))), original);
    assert.equal(entry.sha256, createHash("sha256").update(original).digest("hex"));
    assert.equal(entry.bytes, original.length);
  }
  const second = await normalizeStaticExportSegments({ projectDirectory, routes });
  assert.equal(second.added, 0);
  assert.deepEqual(second.manifest, first.manifest);
  assert.deepEqual(
    JSON.parse(await readFile(join(projectDirectory, "out/wellness-segments.json"))),
    first.manifest,
  );
});

test("conflicting existing output aborts before any other repair or manifest write", async (t) => {
  const { projectDirectory, routes } = await fixture(t);
  const conflict = join(projectDirectory, "out/contact/__next.$oc$view.__PAGE__.txt");
  await mkdir(dirname(conflict), { recursive: true });
  await writeFile(conflict, "another build");
  await assert.rejects(
    normalizeStaticExportSegments({ projectDirectory, routes }),
    /bytes conflict/,
  );
  assert.equal(await readFile(conflict, "utf8"), "another build");
  await assert.rejects(access(join(projectDirectory, "out/__next._tree.txt")));
  await assert.rejects(access(join(projectDirectory, "out/wellness-segments.json")));
});

test("different segment paths that flatten to one filename are rejected", async (t) => {
  const { projectDirectory, routes } = await fixture(t, ["/a.b/c", "/a/b.c"]);
  await assert.rejects(
    normalizeStaticExportSegments({ projectDirectory, routes }),
    /filenames collide/,
  );
  await assert.rejects(access(join(projectDirectory, "out/__next.a.b.c.txt")));
});

test("rejects traversal metadata, undeclared source files and missing sources", async (t) => {
  const { projectDirectory, routes } = await fixture(t);
  const metadataPath = join(projectDirectory, ".next/server/app/index.meta");
  const metadata = await readFile(metadataPath);
  await writeFile(metadataPath, JSON.stringify({ segmentPaths: ["/../../outside"] }));
  await assert.rejects(
    normalizeStaticExportSegments({ projectDirectory, routes }),
    /unsupported path segment/,
  );
  await writeFile(metadataPath, metadata);
  const unknown = join(projectDirectory, ".next/server/app/index.segments/unexpected.segment.rsc");
  await writeFile(unknown, "unknown");
  await assert.rejects(
    normalizeStaticExportSegments({ projectDirectory, routes }),
    /metadata\/source mismatch/,
  );
  await rm(unknown);
  await rm(join(projectDirectory, ".next/server/app/index.segments/_tree.segment.rsc"));
  await assert.rejects(normalizeStaticExportSegments({ projectDirectory, routes }), /ENOENT/);
  await assert.rejects(access(join(projectDirectory, "out/wellness-segments.json")));
});

test("refuses symbolic links in generated source or destination paths", async (t) => {
  const { projectDirectory, routes } = await fixture(t);
  const source = join(projectDirectory, ".next/server/app/index.segments/_tree.segment.rsc");
  const outside = join(projectDirectory, "unrelated.txt");
  await writeFile(outside, "unrelated");
  await rm(source);
  try {
    await symlink(outside, source);
  } catch (error) {
    if (error.code === "EPERM" || error.code === "EACCES") {
      t.skip("This Windows account cannot create symbolic links");
      return;
    }
    throw error;
  }
  await assert.rejects(
    normalizeStaticExportSegments({ projectDirectory, routes }),
    /symbolic link/,
  );
  await rm(source);
  await writeFile(source, "source restored");
  await symlink(outside, join(projectDirectory, "out/__next._tree.txt"));
  await assert.rejects(
    normalizeStaticExportSegments({ projectDirectory, routes }),
    /symbolic link/,
  );
  assert.equal(await readFile(outside, "utf8"), "unrelated");
});
