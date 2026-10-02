import { createHash, randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import { lstat, open, readFile, rename, unlink } from "node:fs/promises";
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { unzipSync } from "fflate";
import { sourceProduct } from "../src/data/source-products.ts";
import { auditSourceFiles } from "./lib/source-package-tools.mjs";

const repository = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MAX_ARCHIVE_BYTES = 100 * 1024 * 1024;
const MAX_MANIFEST_BYTES = 8 * 1024 * 1024;
const HASH = /^[a-f0-9]{64}$/u;
const fields = new Set([
  "designId",
  "version",
  "filename",
  "sha256",
  "bytes",
  "sourceCommit",
  "sourceDirty",
  "key",
  "assetNote",
]);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");

export function validateManifest(value, { pending = false } = {}) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    value.schemaVersion !== 1 ||
    Object.keys(value).some((key) => !["schemaVersion", "packages"].includes(key)) ||
    !Array.isArray(value.packages) ||
    value.packages.length > (pending ? 40 : 10000) ||
    (pending && value.packages.length === 0)
  ) {
    throw new Error("Invalid source-package manifest.");
  }
  const identities = new Set();
  const versions = new Map();
  const selected = new Set();
  for (const item of value.packages) {
    if (
      !item ||
      typeof item !== "object" ||
      Array.isArray(item) ||
      Object.keys(item).some((key) => !fields.has(key)) ||
      typeof item.designId !== "string" ||
      !sourceProduct(item.designId) ||
      typeof item.version !== "string" ||
      !HASH.test(item.version) ||
      item.filename !== `${item.designId}.zip` ||
      typeof item.sha256 !== "string" ||
      !HASH.test(item.sha256) ||
      !Number.isSafeInteger(item.bytes) ||
      item.bytes <= 0 ||
      item.bytes > MAX_ARCHIVE_BYTES ||
      typeof item.sourceCommit !== "string" ||
      !/^[a-f0-9]{40}$/u.test(item.sourceCommit) ||
      item.sourceDirty !== false ||
      item.key !== `source-packages/${item.designId}/${item.sha256}/${item.filename}` ||
      (item.assetNote !== undefined &&
        (typeof item.assetNote !== "string" ||
          item.assetNote.length > 1000 ||
          /[\x00-\x1f\x7f]/u.test(item.assetNote)))
    ) {
      throw new Error("Invalid or ineligible source-package record.");
    }
    const identity = `${item.designId}/${item.sha256}`;
    const version = `${item.designId}/${item.version}`;
    if (identities.has(identity) || (pending && selected.has(item.designId)))
      throw new Error("Duplicate source-package record.");
    // Version identifies sanitized content; rebuilding a new commit can yield a
    // different ZIP hash. Both archives remain addressable for previous buyers.
    if (versions.has(version) && versions.get(version) === item.sha256)
      throw new Error("Duplicate source-package version.");
    identities.add(identity);
    versions.set(version, item.sha256);
    selected.add(item.designId);
  }
  return value;
}

/** Keep every old paid-for archive, and never silently change its metadata. */
export function mergeManifests(existing, pending) {
  validateManifest(existing);
  validateManifest(pending, { pending: true });
  const merged = [...existing.packages];
  for (const item of pending.packages) {
    const prior = merged.find(
      (entry) => entry.designId === item.designId && entry.sha256 === item.sha256,
    );
    if (prior) {
      if ([...fields].some((key) => prior[key] !== item[key]))
        throw new Error("Previously published package metadata cannot change.");
      const latest = merged.filter((entry) => entry.designId === item.designId).at(-1);
      if (latest.sha256 !== item.sha256)
        throw new Error("Refusing to make an older package current. Build a new package instead.");
    } else merged.push(item);
  }
  return { schemaVersion: 1, packages: merged };
}

async function assertNoSymlinks(path) {
  const absolute = resolve(path);
  const root = parse(absolute).root;
  let cursor = root;
  for (const component of absolute.slice(root.length).split(sep).filter(Boolean)) {
    cursor = join(cursor, component);
    const info = await lstat(cursor);
    if (info.isSymbolicLink()) throw new Error("Symlink refused in source-package path.");
  }
  return absolute;
}

export async function readSafeFile(root, child, maximum = MAX_ARCHIVE_BYTES) {
  if (
    typeof child !== "string" ||
    !child ||
    isAbsolute(child) ||
    child.includes("\\") ||
    child.includes(":") ||
    /[\x00-\x1f\x7f]/u.test(child) ||
    child.split("/").some((part) => !part || part === "." || part === "..")
  ) {
    throw new Error("Unsafe local source-package path.");
  }
  const path = resolve(root, child);
  const within = relative(resolve(root), path);
  if (!within || within.startsWith(`..${sep}`) || isAbsolute(within))
    throw new Error("Archive is outside its package directory.");
  await assertNoSymlinks(path);
  const info = await lstat(path);
  if (!info.isFile() || info.size > maximum)
    throw new Error("Invalid source-package file or size.");
  const bytes = await readFile(path);
  if (bytes.length > maximum) throw new Error("Source-package file exceeds the size limit.");
  return bytes;
}

export function verifyArchive(archive, item) {
  if (archive.length !== item.bytes || hash(archive) !== item.sha256)
    throw new Error(`Archive integrity mismatch: ${item.designId}.`);
  let inflated = 0;
  let entries = 0;
  const contents = unzipSync(archive, {
    filter(entry) {
      inflated += entry.originalSize;
      entries += 1;
      if (
        !Number.isSafeInteger(entry.originalSize) ||
        entry.originalSize < 0 ||
        entry.originalSize > 16 * 1024 * 1024 ||
        inflated > 128 * 1024 * 1024 ||
        entries > 4096
      )
        throw new Error("Source archive expands beyond safe limits.");
      return true;
    },
  });
  const files = new Map(Object.entries(contents));
  auditSourceFiles(files);
  const packageBytes = files.get("TEMPLATE-PACKAGE.json");
  if (!packageBytes) throw new Error("Archive is missing its package identity.");
  const identity = JSON.parse(Buffer.from(packageBytes).toString("utf8"));
  if (
    identity.schemaVersion !== 1 ||
    identity.designId !== item.designId ||
    identity.version !== item.version ||
    identity.sourceCommit !== item.sourceCommit ||
    identity.sourceDirty !== false ||
    identity.assetNote !== (item.assetNote ?? "") ||
    identity.contactMode !== "local-demo-only"
  )
    throw new Error("Archive identity does not match its manifest.");
}

export function sourceStorageSettings(env = process.env) {
  const required = (key) => {
    const value = env[key]?.trim();
    if (!value || /[\r\n]/u.test(value))
      throw new Error(`Set ${key} in a private environment file before uploading.`);
    return value;
  };
  const bucket = required("SOURCE_S3_BUCKET");
  if (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/u.test(bucket))
    throw new Error("Invalid private bucket name.");
  const region = required("SOURCE_S3_REGION");
  if (!/^[a-z0-9-]{1,40}$/u.test(region)) throw new Error("Invalid storage region.");
  const endpoint = env.SOURCE_S3_ENDPOINT?.trim() || undefined;
  if (endpoint) {
    let url;
    try {
      url = new URL(endpoint);
    } catch {
      throw new Error("Invalid storage endpoint.");
    }
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/"
    ) {
      throw new Error(
        "Storage endpoint must be an HTTPS origin without credentials or query parameters.",
      );
    }
  }
  return {
    bucket,
    region,
    endpoint,
    accessKeyId: required("SOURCE_S3_ACCESS_KEY_ID"),
    secretAccessKey: required("SOURCE_S3_SECRET_ACCESS_KEY"),
  };
}

export function assertUploadSource(
  pending,
  git = (args) =>
    execFileSync("git", args, {
      cwd: repository,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }),
) {
  let commit;
  let changes;
  try {
    commit = git(["rev-parse", "HEAD"]).trim();
    changes = [
      ...git(["diff", "--name-only", "-z", "HEAD", "--"]).split("\0"),
      ...git(["ls-files", "--others", "--exclude-standard", "-z"]).split("\0"),
    ].filter((name) => name && name !== "src/data/source-package-manifest.json");
  } catch {
    throw new Error("Cannot verify the repository source before upload.");
  }
  if (!/^[a-f0-9]{40}$/u.test(commit) || changes.length) {
    throw new Error(
      "Commit your reviewed source changes before uploading. Only the generated source-package-manifest.json may differ; build outputs and private ignored env files are excluded.",
    );
  }
  if (pending.packages.some((item) => item.sourceCommit !== commit)) {
    throw new Error(
      "Packages were generated from a different source commit. Rebuild packages from the current clean HEAD before uploading.",
    );
  }
}

function metadataMatches(head, item) {
  return (
    head.ContentLength === item.bytes &&
    head.ContentType === "application/zip" &&
    head.Metadata?.sha256 === item.sha256
  );
}

/** Dependency injection keeps tests offline; every write uses If-None-Match. */
export async function ensureRemotePackage(client, bucket, item, archive) {
  const head = async () => {
    try {
      return await client.send(new HeadObjectCommand({ Bucket: bucket, Key: item.key }), {
        abortSignal: AbortSignal.timeout(30000),
      });
    } catch (error) {
      if (
        error?.$metadata?.httpStatusCode === 404 ||
        ["NotFound", "NoSuchKey"].includes(error?.name)
      )
        return null;
      throw new Error(
        `Cannot verify private storage for ${item.designId}. Check credentials and bucket permissions.`,
      );
    }
  };
  const existing = await head();
  if (existing) {
    if (!metadataMatches(existing, item))
      throw new Error(
        `Existing private object does not match ${item.designId}; overwrite refused.`,
      );
    return "verified";
  }
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: item.key,
        Body: archive,
        ContentLength: archive.length,
        ContentType: "application/zip",
        ContentDisposition: `attachment; filename="${item.filename}"`,
        CacheControl: "private, no-store",
        Metadata: {
          sha256: item.sha256,
          version: item.version,
          "source-commit": item.sourceCommit,
        },
        IfNoneMatch: "*",
      }),
      { abortSignal: AbortSignal.timeout(120000) },
    );
  } catch (error) {
    // Another authorized publisher may have won the race. Verify its object.
    if (error?.$metadata?.httpStatusCode !== 412 && error?.name !== "PreconditionFailed") {
      throw new Error(
        `Private upload failed for ${item.designId}. No storefront manifest was written; retry after resolving storage permissions.`,
      );
    }
  }
  const uploaded = await head();
  if (!uploaded || !metadataMatches(uploaded, item))
    throw new Error(
      `Uploaded archive could not be verified: ${item.designId}. No storefront manifest was written.`,
    );
  return "uploaded";
}

export async function publishPackages({
  packageDirectory,
  manifestPath,
  upload = false,
  client,
  bucket,
  verifySource,
  log = console.log,
}) {
  const pendingBytes = await readSafeFile(packageDirectory, "manifest.json", MAX_MANIFEST_BYTES);
  const pending = validateManifest(JSON.parse(pendingBytes.toString("utf8")), { pending: true });
  const targetRoot = dirname(manifestPath);
  const targetName = parse(manifestPath).base;
  const before = await readSafeFile(targetRoot, targetName, MAX_MANIFEST_BYTES);
  const existing = validateManifest(JSON.parse(before.toString("utf8")));
  const merged = mergeManifests(existing, pending);
  // Validate the complete set before making any network call or filesystem mutation.
  for (const item of pending.packages) {
    const archive = await readSafeFile(
      packageDirectory,
      `${item.designId}/${item.sha256}/${item.filename}`,
    );
    verifyArchive(archive, item);
    log(`VALIDATED ${item.designId}: ${item.bytes} bytes; version ${item.version.slice(0, 12)}.`);
  }
  if (!upload) {
    log(
      `DRY RUN: ${pending.packages.length} package(s) validated. No network requests, uploads or storefront changes. Re-run with --upload when private storage is ready.`,
    );
    return { uploaded: false, packages: pending.packages.length, manifest: merged };
  }
  if (!client || !bucket) throw new Error("Private storage must be configured before upload.");
  verifySource?.(pending);
  const lockPath = `${manifestPath}.upload-lock`;
  const tempPath = `${manifestPath}.${randomUUID()}.tmp`;
  let lock;
  try {
    lock = await open(lockPath, "wx", 0o600);
    for (const item of pending.packages) {
      const archive = await readSafeFile(
        packageDirectory,
        `${item.designId}/${item.sha256}/${item.filename}`,
      );
      verifyArchive(archive, item);
      const status = await ensureRemotePackage(client, bucket, item, archive);
      log(`${status.toUpperCase()} ${item.designId}: private archive verified.`);
    }
    const current = await readSafeFile(targetRoot, targetName, MAX_MANIFEST_BYTES);
    if (!current.equals(before))
      throw new Error(
        "Storefront manifest changed during upload. Re-run to preserve the new records.",
      );
    verifySource?.(pending);
    await assertNoSymlinks(targetRoot);
    const next = Buffer.from(`${JSON.stringify(merged, null, 2)}\n`);
    if (!next.equals(current)) {
      const file = await open(tempPath, "wx", 0o600);
      try {
        await file.writeFile(next);
        await file.sync();
      } finally {
        await file.close();
      }
      await rename(tempPath, manifestPath);
    }
    log(
      `READY: ${pending.packages.length} private package(s) verified. Review and commit src/data/source-package-manifest.json, then deploy. Checkout still requires its separate activation settings.`,
    );
    return { uploaded: true, packages: pending.packages.length, manifest: merged };
  } finally {
    if (lock) {
      await lock.close();
      await unlink(lockPath).catch(() => {});
      await unlink(tempPath).catch(() => {});
    }
  }
}

async function main() {
  const { values } = parseArgs({
    options: { upload: { type: "boolean", default: false }, "package-dir": { type: "string" } },
    strict: true,
  });
  const packageDirectory = resolve(repository, values["package-dir"] ?? "build/source-packages");
  const buildRelative = relative(resolve(repository, "build"), packageDirectory);
  if (
    !buildRelative ||
    buildRelative.startsWith(`..${sep}`) ||
    buildRelative === ".." ||
    isAbsolute(buildRelative)
  )
    throw new Error("Package directory must be inside the repository's ignored build directory.");
  let client;
  let bucket;
  if (values.upload) {
    const settings = sourceStorageSettings();
    bucket = settings.bucket;
    client = new S3Client({
      region: settings.region,
      endpoint: settings.endpoint,
      forcePathStyle: true,
      maxAttempts: 2,
      credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey },
    });
  }
  try {
    await publishPackages({
      packageDirectory,
      manifestPath: resolve(repository, "src/data/source-package-manifest.json"),
      upload: values.upload,
      client,
      bucket,
      verifySource: assertUploadSource,
    });
  } finally {
    client?.destroy();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Source upload failed.");
    process.exitCode = 1;
  }
}
