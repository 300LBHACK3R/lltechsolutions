import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(root, "build/wellness-demo");
// Generated output only. The maintained sources remain in src/ and templates/.
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(resolve(root, "templates/wellness-demo"), target, { recursive: true });
const files = [
  "scripts/normalize-wellness-segments.mjs",
  "scripts/lib/static-export-segments.mjs",
  "src/components/collection/WellnessTemplate.tsx",
  "src/components/collection/WellnessCover.tsx",
  "src/components/collection/WellnessMarks.tsx",
  "src/components/collection/WellnessEnquiryDemo.tsx",
  "src/components/collection/WellnessBookingDemo.tsx",
  "src/components/ui/MotionControl.tsx",
  "src/lib/use-motion.ts",
  "src/data/website-collection.ts",
  "src/data/wellness-pages.ts",
  "src/data/wellness-content.ts",
  "src/styles/globals.css",
  "src/styles/base.css",
  "src/styles/wellness-template.css",
  "public/images/collection/massage-room.webp",
  "public/images/template-categories/health-wellness.webp",
  "postcss.config.mjs",
  "tsconfig.json",
];
for (const file of files) {
  await mkdir(dirname(resolve(target, file)), { recursive: true });
  await cp(resolve(root, file), resolve(target, file));
}
await cp(resolve(root, "public/brand/icon.png"), resolve(target, "app/icon.png"));
const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
pkg.name = "ll-wellness-template";
pkg.scripts = {
  dev: "next dev",
  build: "next build",
  postbuild: "node scripts/normalize-wellness-segments.mjs",
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
console.log(`Standalone wellness demo prepared: ${target}`);
console.log(
  "Install and build inside that folder, then run scripts/check-wellness-demo.mjs from the main project before publishing out/ to ll-wellness-template with Vercel Framework set to Other.",
);
