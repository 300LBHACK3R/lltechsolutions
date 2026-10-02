import { lstat, readFile, readdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const caches = [".next", "out", "coverage", "tsconfig.tsbuildinfo"];

async function info(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function directories(path) {
  const parent = await info(path);
  if (!parent) return [];
  if (parent.isSymbolicLink()) throw new Error(`Refusing linked directory: ${path}`);
  return (await readdir(path, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

/** Remove only compiler/test outputs; never source, credentials or source ZIPs. */
export async function cleanProject(root = projectRoot, { dryRun = false } = {}) {
  const rootInfo = await info(root);
  if (!rootInfo?.isDirectory() || rootInfo.isSymbolicLink())
    throw new Error("Use the real landl-tech project directory.");
  const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
  if (pkg.name !== "landl-tech") throw new Error("This is not the landl-tech project.");

  const templateFolders = (await directories(join(root, "templates"))).filter((name) =>
    name.endsWith("-demo"),
  );
  const editions = await directories(join(root, "templates/source-editions"));
  const locations = [
    "",
    ...templateFolders.map((name) => `templates/${name}`),
    ...templateFolders.map((name) => `build/${name}`),
    ...editions.map((name) => `templates/source-editions/${name}`),
  ];
  const targets = [];
  for (const location of locations) {
    // Validate every parent before reading/removing a cache. Windows junctions
    // are symbolic links to Node, and must not lead cleanup outside the project.
    let parent = root;
    for (const part of location.split("/").filter(Boolean)) {
      parent = join(parent, part);
      if ((await info(parent))?.isSymbolicLink())
        throw new Error(`Refusing linked directory: ${parent}`);
    }
    for (const cache of caches) {
      const relative = location ? `${location}/${cache}` : cache;
      const metadata = await info(join(root, relative));
      if (!metadata) continue;
      if (metadata.isSymbolicLink()) throw new Error(`Refusing linked cache: ${relative}`);
      targets.push(relative);
    }
  }
  // Complete the safety checks before deleting the first cache.
  if (!dryRun)
    for (const target of targets) await rm(join(root, target), { recursive: true, force: true });
  return targets;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.some((arg) => arg !== "--dry-run"))
    throw new Error("Usage: npm run clean [-- --dry-run]");
  const dryRun = args.includes("--dry-run");
  const targets = await cleanProject(projectRoot, { dryRun });
  for (const target of targets) console.log(`${dryRun ? "Would remove" : "Removed"}: ${target}`);
  console.log(
    targets.length
      ? `${targets.length} generated output(s) ${dryRun ? "listed" : "removed"}.`
      : "No generated caches to clean.",
  );
  console.log(
    "Source, dependencies, environment settings, Git history and private source packages are preserved.",
  );
}
