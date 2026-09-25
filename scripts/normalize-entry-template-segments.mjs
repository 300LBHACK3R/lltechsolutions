import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { entryTemplateDemo } from "./lib/entry-template-config.mjs";
import { normalizeStaticExportSegments } from "./lib/static-export-segments.mjs";

const { values } = parseArgs({
  options: { kind: { type: "string" }, "project-dir": { type: "string" } },
  strict: true,
});
const demo = entryTemplateDemo(values.kind);
const projectDirectory = resolve(values["project-dir"] ?? process.cwd());
const { manifest, added } = await normalizeStaticExportSegments({
  projectDirectory,
  routes: [...demo.routes, "/_not-found"],
});
// Reuse the maintained Windows filename fix; publish a neutral manifest name for these demos.
await rename(
  resolve(projectDirectory, "out/wellness-segments.json"),
  resolve(projectDirectory, "out/static-segments.json"),
);
console.log(
  `PASS: ${manifest.files.length} exported page-data files match their original bytes; ${added} canonical Windows filenames restored.`,
);
