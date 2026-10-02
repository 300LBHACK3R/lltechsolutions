import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { cleanProject } from "../scripts/clean-project.mjs";

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "landl-clean-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const put = async (path, content = "keep") => {
    const target = join(root, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content);
  };
  await put("package.json", JSON.stringify({ name: "landl-tech" }));
  return { root, put };
}

test("cleanup removes only known generated outputs and a dry run changes nothing", async (t) => {
  const { root, put } = await fixture(t);
  const removed = [
    ".next/cache/test",
    "out/index.html",
    "coverage/test",
    "tsconfig.tsbuildinfo",
    "templates/painting-demo/.next/cache/test",
    "build/painting-demo/out/index.html",
    "templates/source-editions/crestline/.next/cache/test",
  ];
  const preserved = [
    "src/app/page.tsx",
    "public/example.webp",
    ".env.local",
    ".git/config",
    "node_modules/example/index.js",
    "build/source-packages/design/version/design.zip",
    "build/source-packages/manifest.json",
    "build/painting-demo/.env.local",
    "build/painting-demo/.vercel/project.json",
    "templates/painting-demo/app/page.tsx",
    "build/unrelated-project/out/index.html",
  ];
  for (const path of [...removed, ...preserved]) await put(path);
  const planned = await cleanProject(root, { dryRun: true });
  assert.equal(planned.length, 7);
  for (const path of [...removed, ...preserved]) await access(join(root, path));
  assert.deepEqual(await cleanProject(root), planned);
  for (const path of removed) await assert.rejects(access(join(root, path)), { code: "ENOENT" });
  for (const path of preserved) assert.equal(await readFile(join(root, path), "utf8"), "keep");
  assert.deepEqual(await cleanProject(root), []);
});

test("a junction or symlink aborts the whole cleanup before any cache is deleted", async (t) => {
  const { root, put } = await fixture(t);
  const outside = await mkdtemp(join(tmpdir(), "landl-keep-"));
  t.after(() => rm(outside, { recursive: true, force: true }));
  await put(".next/cache/test");
  await put("templates/painting-demo/app/page.tsx");
  await writeFile(join(outside, "private.txt"), "keep");
  await symlink(outside, join(root, "build"), process.platform === "win32" ? "junction" : "dir");
  await assert.rejects(cleanProject(root), /Refusing linked directory/);
  await access(join(root, ".next/cache/test"));
  assert.equal(await readFile(join(outside, "private.txt"), "utf8"), "keep");
});

test("a different project's caches are not cleaned", async (t) => {
  const { root, put } = await fixture(t);
  await put("package.json", JSON.stringify({ name: "another-project" }));
  await put(".next/cache/test");
  await assert.rejects(cleanProject(root), /not the landl-tech project/);
  await access(join(root, ".next/cache/test"));
});
