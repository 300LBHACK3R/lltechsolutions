import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(root, "build/lawncare-demo");
// Generated output only. The maintained sources remain in src/ and templates/.
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(resolve(root, "templates/lawncare-demo"), target, { recursive: true });
const files = [
  "src/components/collection/LawnTemplate.tsx",
  "src/components/collection/LawnCover.tsx",
  "src/components/collection/LawnMarks.tsx",
  "src/components/ui/MotionControl.tsx",
  "src/lib/use-motion.ts",
  "src/data/website-collection.ts",
  "src/data/lawn-pages.ts",
  "src/styles/globals.css",
  "src/styles/base.css",
  "src/styles/lawn-template.css",
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
pkg.name = "ll-lawncare-template";
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
console.log(`Standalone lawncare demo prepared: ${target}`);
console.log(
  "Install and build inside that folder, then run scripts/check-lawncare-demo.mjs from the main project before publishing out/.",
);
