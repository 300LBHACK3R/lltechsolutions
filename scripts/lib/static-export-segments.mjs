import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { isAbsolute, join, parse, relative, resolve, sep } from "node:path";

const sourceSuffix = ".segment.rsc";
const manifestName = "wellness-segments.json";

function safeParts(value, label) {
  assert(typeof value === "string" && value.length > 0, `${label} must be a nonempty path`);
  const parts = value.replaceAll("\\", "/").split("/");
  assert(
    parts.every((part) => /^[A-Za-z0-9_$@!.-]+$/.test(part) && part !== "." && part !== ".."),
    `${label} contains an unsupported path segment: ${value}`,
  );
  return parts;
}

/** Match Next's URL protocol after normalizing native Windows separators. */
export function staticSegmentFilename(segmentPath) {
  assert(
    typeof segmentPath === "string" && segmentPath.startsWith("/"),
    "Invalid RSC segment path",
  );
  return `__next.${safeParts(segmentPath.slice(1), "RSC segment").join(".")}.txt`;
}

async function safeStat(root, child = "", allowMissing = false) {
  const destination = resolve(root, child);
  const inside = relative(root, destination);
  assert(
    !inside.startsWith(`..${sep}`) && inside !== ".." && !isAbsolute(inside),
    "Path escaped project",
  );
  const volume = parse(destination).root;
  const parts = relative(volume, destination).split(sep).filter(Boolean);
  let current = volume;
  let result;
  for (const part of parts) {
    current = join(current, part);
    try {
      result = await lstat(current);
    } catch (error) {
      if (error.code === "ENOENT" && allowMissing) return null;
      throw error;
    }
    assert(!result.isSymbolicLink(), `Refusing a symbolic link: ${current}`);
    if (current !== destination) assert(result.isDirectory(), `Not a directory: ${current}`);
  }
  return result;
}

async function readRegular(root, child) {
  const info = await safeStat(root, child);
  assert(info.isFile(), `Expected a regular file: ${child}`);
  return readFile(resolve(root, child));
}

async function sourceSegments(root, directory) {
  const result = [];
  async function walk(child) {
    const info = await safeStat(root, child);
    assert(info.isDirectory(), `Expected an RSC directory: ${child}`);
    const entries = await readdir(resolve(root, child), { withFileTypes: true });
    for (const entry of entries) {
      safeParts(entry.name, "RSC source filename");
      assert(!entry.isSymbolicLink(), `Refusing a symbolic link in RSC source: ${entry.name}`);
      const next = join(child, entry.name);
      if (entry.isDirectory()) await walk(next);
      else {
        assert(
          entry.isFile() && entry.name.endsWith(sourceSuffix),
          `Unrecognized RSC source: ${next}`,
        );
        result.push(relative(directory, next).split(sep).join("/"));
      }
    }
  }
  await walk(directory);
  return result.sort();
}

/**
 * Next 16.3.4's exporter passes Windows path.relative() separators into a
 * forward-slash-only filename encoder. Recreate the browser's flat filenames
 * from the original prerendered bytes, without modifying Next or disabling
 * prefetch. Preflight the entire export before writing any missing files.
 */
export async function normalizeStaticExportSegments({ projectDirectory, routes }) {
  assert(isAbsolute(projectDirectory), "Project directory must be absolute");
  const root = resolve(projectDirectory);
  assert((await safeStat(root)).isDirectory(), "Project directory does not exist");
  assert(
    (await safeStat(root, "out")).isDirectory(),
    "Run the static build before normalizing RSC files",
  );
  assert(Array.isArray(routes) && routes.length > 0, "Explicit exported routes are required");
  const planned = new Map();
  const seenRoutes = new Set();

  for (const route of routes) {
    assert(
      typeof route === "string" && route.startsWith("/") && !route.includes("\\"),
      "Invalid exported route",
    );
    assert(!seenRoutes.has(route), `Duplicate exported route: ${route}`);
    seenRoutes.add(route);
    const routeParts = route === "/" ? [] : safeParts(route.slice(1), "Exported route");
    const stem = routeParts.length ? join(...routeParts) : "index";
    // Source-only error routes must not accidentally be published as new pages.
    await readRegular(root, join("out", `${stem}.html`));
    const directory = join(".next", "server", "app", `${stem}.segments`);
    const metadata = JSON.parse(
      await readRegular(root, join(".next", "server", "app", `${stem}.meta`)),
    );
    assert(
      Array.isArray(metadata.segmentPaths) && metadata.segmentPaths.length > 0,
      `Missing segment metadata for ${route}`,
    );
    const expectedSources = [];
    for (const segment of metadata.segmentPaths) {
      const filename = staticSegmentFilename(segment);
      const parts = safeParts(segment.slice(1), "RSC segment");
      const sourceRelative = `${parts.join("/")}${sourceSuffix}`;
      expectedSources.push(sourceRelative);
      const sourceFile = join(directory, ...parts.slice(0, -1), `${parts.at(-1)}${sourceSuffix}`);
      const bytes = await readRegular(root, sourceFile);
      const path = `/${[...routeParts, filename].join("/")}`;
      assert(!planned.has(path), `RSC filenames collide at ${path}`);
      const target = join("out", ...routeParts, filename);
      const existing = await safeStat(root, target, true);
      if (existing) {
        assert(existing.isFile(), `RSC destination is not a regular file: ${target}`);
        assert(
          bytes.equals(await readRegular(root, target)),
          `Existing RSC bytes conflict at ${path}`,
        );
      }
      planned.set(path, {
        path,
        sha256: createHash("sha256").update(bytes).digest("hex"),
        bytes: bytes.length,
        contents: bytes,
        target,
        exists: Boolean(existing),
      });
    }
    assert.deepEqual(
      await sourceSegments(root, directory),
      expectedSources.sort(),
      `RSC metadata/source mismatch for ${route}`,
    );
  }

  const files = [...planned.values()].sort((a, b) => a.path.localeCompare(b.path, "en"));
  const manifest = {
    version: 1,
    files: files.map(({ path, sha256, bytes }) => ({ path, sha256, bytes })),
  };
  const manifestBytes = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
  const manifestTarget = join("out", manifestName);
  const existingManifest = await safeStat(root, manifestTarget, true);
  if (existingManifest) {
    assert(existingManifest.isFile(), "Segment manifest is not a regular file");
    assert(
      manifestBytes.equals(await readRegular(root, manifestTarget)),
      "Existing segment manifest conflicts with this export",
    );
  }

  let added = 0;
  for (const file of files) {
    if (file.exists) continue;
    // Only generated out/ directories are created. Malformed Windows copies
    // remain untouched; they cannot replace the canonical browser URL files.
    await mkdir(resolve(root, "out", ...file.path.slice(1).split("/").slice(0, -1)), {
      recursive: true,
    });
    await safeStat(root, file.target, true);
    await writeFile(resolve(root, file.target), file.contents, { flag: "wx" });
    added += 1;
  }
  if (!existingManifest)
    await writeFile(resolve(root, manifestTarget), manifestBytes, { flag: "wx" });
  return { manifest, added };
}
