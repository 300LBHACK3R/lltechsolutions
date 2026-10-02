import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import { posix, resolve } from "node:path";
import { strToU8, zipSync } from "fflate";

export const sourcePackageBlockedIds = new Set([
  "horizon",
  "crestline",
  "crestline-painting",
  "tow-n-go",
  "mckenzie-house",
  "calgary-hot-shot",
]);

export function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

export function assertPackagePath(path) {
  if (
    typeof path !== "string" ||
    path.length > 240 ||
    path.startsWith("/") ||
    path.includes("\\") ||
    path.includes(":") ||
    /[\x00-\x1f\x7f]/u.test(path) ||
    path.split("/").some((part) => !part || part === "." || part === "..")
  ) {
    throw new Error(`Unsafe source package path: ${JSON.stringify(path)}`);
  }
  if (
    /(?:^|\/)(?:node_modules|\.next|out|\.git|\.vercel|coverage|build)(?:\/|$)/u.test(path) ||
    /(?:^|\/)\.env(?!\.example$)/u.test(path) ||
    /\.(?:pem|key|p12|pfx|bundle|log|zip)$/iu.test(path)
  ) {
    throw new Error(`Private or generated path rejected: ${path}`);
  }
  return path;
}

export function auditSourceFiles(files) {
  if (!(files instanceof Map) || files.size === 0) throw new Error("Empty source package.");
  const required = [
    "package.json",
    "package-lock.json",
    "README.md",
    "LICENSE.txt",
    ".env.example",
  ];
  for (const file of required) if (!files.has(file)) throw new Error(`Package is missing ${file}.`);
  const folded = new Set();
  for (const [name, data] of files) {
    assertPackagePath(name);
    if (folded.has(name.toLowerCase())) throw new Error(`Case-insensitive duplicate path: ${name}`);
    folded.add(name.toLowerCase());
    if (!(data instanceof Uint8Array)) throw new Error(`Invalid bytes for ${name}.`);
    if (data.length > 16 * 1024 * 1024) throw new Error(`Unexpectedly large package file: ${name}`);
    if (!/\.(?:png|webp|jpg|jpeg|ico|woff2?)$/iu.test(name)) {
      const text = Buffer.from(data).toString("utf8");
      if (
        /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:sk_live_|sk_test_|rk_live_|re_[A-Za-z0-9]{24}|ghp_|github_pat_|AKIA[A-Z0-9]{16})/u.test(
          text,
        ) ||
        /(?:VERCEL_OIDC_TOKEN|RESEND_API_KEY|STRIPE_SECRET_KEY|AWS_SECRET_ACCESS_KEY)\s*[:=]\s*["']?[A-Za-z0-9_\-+/]{12,}/u.test(
          text,
        )
      ) {
        throw new Error(`Possible credential detected in ${name}.`);
      }
      if (
        /(?:towandgotrailers|crestlinepainting|mckenziehousemassage|calgary-hot-shot-corporate-live|tatestv)\.(?:ca|app)|Horizon Contracting Group|Chad Muxlow|Heather Saunders/u.test(
          text,
        )
      ) {
        throw new Error(`Client/reference identity detected in ${name}.`);
      }
      if (/^(?:app|src)\//u.test(name) && /https?:\/\/lltechsolutions\.ca/u.test(text)) {
        throw new Error(`Studio sales redirect remains in ${name}.`);
      }
    }
  }
  const pkg = JSON.parse(Buffer.from(files.get("package.json")).toString("utf8"));
  if (pkg.scripts?.build !== "next build") throw new Error("Unexpected customer build command.");
  for (const dependency of Object.keys(pkg.dependencies ?? {})) {
    if (!["next", "react", "react-dom"].includes(dependency)) {
      throw new Error(`Unexpected customer runtime dependency: ${dependency}`);
    }
  }
}

export function createSourceArchive(files) {
  auditSourceFiles(files);
  const entries = Object.fromEntries(
    [...files.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, data]) => [name, [data, { mtime: new Date("2026-01-01T00:00:00Z"), level: 6 }]]),
  );
  return Buffer.from(zipSync(entries));
}

export async function regularFiles(directory, prefix = "") {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${item.name}` : item.name;
    const full = resolve(directory, item.name);
    if ((await lstat(full)).isSymbolicLink()) throw new Error(`Symlink refused: ${path}`);
    if (item.isDirectory()) files.push(...(await regularFiles(full, path)));
    else if (item.isFile()) files.push(path);
    else throw new Error(`Special filesystem entry refused: ${path}`);
  }
  return files.sort();
}

// Retain the exact tested dependency versions while dropping unrelated server,
// payment, email, testing and studio tooling dependencies from buyer archives.
export function customerPackage(rootPackage, rootLock, designId) {
  if (!/^[a-z][a-z0-9-]{0,60}$/u.test(designId) || sourcePackageBlockedIds.has(designId)) {
    throw new Error("This design is not eligible for a source package.");
  }
  const dependencies = Object.fromEntries(
    ["next", "react", "react-dom"].map((name) => [
      name,
      rootLock.packages[`node_modules/${name}`].version,
    ]),
  );
  const devDependencies = Object.fromEntries(
    [
      "@tailwindcss/postcss",
      "@types/node",
      "@types/react",
      "@types/react-dom",
      "tailwindcss",
      "typescript",
    ].map((name) => [name, rootLock.packages[`node_modules/${name}`].version]),
  );
  const pkg = {
    name: `website-${designId}`,
    version: "1.0.0",
    private: true,
    type: "module",
    engines: rootPackage.engines,
    scripts: {
      dev: "next dev",
      build: "next build",
      postbuild: "node scripts/normalize-export.mjs",
      typecheck: "next typegen && tsc --noEmit",
    },
    dependencies,
    devDependencies,
  };
  const selected = new Set();
  function visit(name, from = "") {
    let cursor = from;
    let key;
    while (true) {
      const candidate = `${cursor ? `${cursor}/` : ""}node_modules/${name}`;
      if (rootLock.packages[candidate]) {
        key = candidate;
        break;
      }
      if (!cursor) return;
      cursor = cursor.includes("/node_modules/")
        ? cursor.slice(0, cursor.lastIndexOf("/node_modules/"))
        : "";
    }
    if (selected.has(key)) return;
    selected.add(key);
    const item = rootLock.packages[key];
    for (const dep of Object.keys({ ...item.dependencies, ...item.optionalDependencies }))
      visit(dep, key);
    for (const dep of Object.keys(item.peerDependencies ?? {})) {
      if (!item.peerDependenciesMeta?.[dep]?.optional) visit(dep, key);
    }
  }
  for (const name of [...Object.keys(dependencies), ...Object.keys(devDependencies)]) visit(name);
  const lock = {
    name: pkg.name,
    version: pkg.version,
    lockfileVersion: rootLock.lockfileVersion,
    requires: true,
    packages: {
      "": {
        name: pkg.name,
        version: pkg.version,
        dependencies,
        devDependencies,
        engines: pkg.engines,
      },
      ...Object.fromEntries([...selected].sort().map((key) => [key, rootLock.packages[key]])),
    },
  };
  return { pkg, lock };
}

export async function sourceFile(root, relative) {
  assertPackagePath(relative);
  const absolute = resolve(root, relative);
  let current = root;
  for (const part of relative.split("/")) {
    current = resolve(current, part);
    if ((await lstat(current)).isSymbolicLink()) throw new Error(`Symlink refused: ${relative}`);
  }
  return new Uint8Array(await readFile(absolute));
}

export function textBytes(text) {
  return strToU8(text.endsWith("\n") ? text : `${text}\n`);
}

export function localImportPath(source, specifier) {
  if (specifier.startsWith("@/")) return `src/${specifier.slice(2)}`;
  if (specifier.startsWith("."))
    return posix.normalize(posix.join(posix.dirname(source), specifier));
  return undefined;
}
