import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { normalizeStaticExportSegments } from "./lib/static-export-segments.mjs";

const { values } = parseArgs({
  options: { "project-dir": { type: "string" }, help: { type: "boolean" } },
  strict: true,
});
if (values.help) {
  console.log(
    "Normalize exported Wellness demo RSC filenames across Windows and POSIX.\nnode scripts/normalize-wellness-segments.mjs [--project-dir <generated-project>]",
  );
} else {
  const { manifest, added } = await normalizeStaticExportSegments({
    projectDirectory: resolve(values["project-dir"] ?? process.cwd()),
    routes: ["/", "/treatments", "/pricing", "/about", "/faq", "/contact", "/_not-found"],
  });
  console.log(
    `PASS: ${manifest.files.length} static RSC files match original build bytes; ${added} missing canonical files restored. Public manifest: wellness-segments.json.`,
  );
}
