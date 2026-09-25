import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(root, "build/horizon-demo");
// Generated output only. The maintained sources remain in src/ and templates/.
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(resolve(root, "templates/horizon-demo"), target, { recursive: true });
const files = [
  "src/components/collection/HorizonTemplate.tsx",
  "src/components/collection/HorizonMarks.tsx",
  "src/components/collection/HorizonInteractions.tsx",
  "src/components/ui/MotionControl.tsx",
  "src/lib/use-motion.ts",
  "src/data/website-collection.ts",
  "src/data/horizon-pages.ts",
  "src/data/horizon-content.ts",
  "src/styles/globals.css",
  "src/styles/base.css",
  "src/styles/horizon-template.css",
  "public/images/collection/earthworks-landscape.webp",
  "public/images/collection/earthworks-detail.webp",
  "public/images/collection/earthworks-site.webp",
  "public/images/collection/lawn-hero.webp",
  "public/images/collection/lawn-detail.webp",
  "postcss.config.mjs",
  "tsconfig.json",
];
for (const file of files) {
  await mkdir(dirname(resolve(target, file)), { recursive: true });
  await cp(resolve(root, file), resolve(target, file));
}
await cp(resolve(root, "public/brand/icon.png"), resolve(target, "app/icon.png"));
const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
pkg.name = "ll-landscape-template";
pkg.scripts = {
  dev: "next dev",
  build: "next build",
  typecheck: "next typegen && tsc --noEmit",
};
const lock = JSON.parse(await readFile(resolve(root, "package-lock.json"), "utf8"));
lock.name = pkg.name;
lock.packages[""].name = pkg.name;
await writeFile(resolve(target, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
await writeFile(resolve(target, "package-lock.json"), JSON.stringify(lock, null, 2) + "\n");
await writeFile(
  resolve(target, ".gitignore"),
  "node_modules/\n.next/\nout/\n.vercel/\n.env*\n*.tsbuildinfo\nnext-env.d.ts\n",
);
console.log(`Standalone landscape demo prepared: ${target}`);
console.log(
  "Install and build inside that folder, then run scripts/check-horizon-demo.mjs from the main project before publishing out/ with Vercel Framework set to Other.",
);
