import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { entryTemplateDemo } from "./entry-template-config.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export async function prepareEntryTemplate(kind) {
  const demo = entryTemplateDemo(kind);
  const target = resolve(root, "build", demo.folder);
  // Delete generated output only; the maintained source stays in src/ and templates/.
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
  await cp(resolve(root, "templates", demo.folder), target, { recursive: true });
  const files = [
    "scripts/normalize-entry-template-segments.mjs",
    "scripts/lib/entry-template-config.mjs",
    "scripts/lib/static-export-segments.mjs",
    ...demo.components.map((name) => `src/components/collection/${name}.tsx`),
    ...demo.data.map((name) => `src/data/${name}.ts`),
    "src/data/website-collection.ts",
    "src/components/ui/MotionControl.tsx",
    "src/lib/use-motion.ts",
    "src/styles/globals.css",
    "src/styles/base.css",
    `src/styles/${demo.style}.css`,
    ...demo.assets.map((name) => `public/images/collection/${name}`),
    "postcss.config.mjs",
    "tsconfig.json",
  ];
  for (const file of files) {
    await mkdir(dirname(resolve(target, file)), { recursive: true });
    await cp(resolve(root, file), resolve(target, file));
  }
  await cp(resolve(root, "public/brand/icon.png"), resolve(target, "app/icon.png"));
  const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
  pkg.name = demo.project;
  pkg.scripts = {
    dev: "next dev",
    build: "next build",
    postbuild: `node scripts/normalize-entry-template-segments.mjs --kind ${kind}`,
    typecheck: "next typegen && tsc --noEmit",
  };
  const lock = JSON.parse(await readFile(resolve(root, "package-lock.json"), "utf8"));
  lock.name = pkg.name;
  lock.packages[""].name = pkg.name;
  await writeFile(resolve(target, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
  await writeFile(resolve(target, "package-lock.json"), `${JSON.stringify(lock, null, 2)}\n`);
  await writeFile(
    resolve(target, ".gitignore"),
    "node_modules/\n.next/\nout/\n.vercel/\n.env*\n*.tsbuildinfo\nnext-env.d.ts\n",
  );
  console.log(`Standalone ${demo.label} demo prepared: ${target}`);
  console.log(`Build and check the export before publishing only out/ to ${demo.project}.`);
}
