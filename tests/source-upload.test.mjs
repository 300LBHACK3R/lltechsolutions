import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { createSourceArchive, textBytes } from "../scripts/lib/source-package-tools.mjs";
import { sourceProducts } from "../src/data/source-products.ts";
import {
  assertUploadSource,
  ensureRemotePackage,
  mergeManifests,
  publishPackages,
  readSafeFile,
  sourceStorageSettings,
  validateManifest,
  verifyArchive,
} from "../scripts/upload-source-packages.mjs";

function fixture(designId = "pigment", version = "a".repeat(64), sourceDirty = false) {
  const sourceCommit = "c".repeat(40);
  const files = new Map(
    Object.entries({
      "package.json": JSON.stringify({
        scripts: { build: "next build" },
        dependencies: { next: "16.3.8" },
      }),
      "package-lock.json": "{}",
      "README.md": "Editable sample website source.",
      "LICENSE.txt": "One business website.",
      ".env.example": "# Configure your own providers.\n",
      "TEMPLATE-PACKAGE.json": JSON.stringify({
        schemaVersion: 1,
        designId,
        version,
        sourceCommit,
        sourceDirty,
        contactMode: "local-demo-only",
        assetNote: "",
      }),
    }).map(([name, text]) => [name, textBytes(text)]),
  );
  const archive = createSourceArchive(files);
  const sha256 = createHash("sha256").update(archive).digest("hex");
  const item = {
    designId,
    version,
    filename: `${designId}.zip`,
    sha256,
    bytes: archive.length,
    sourceCommit,
    sourceDirty,
    key: `source-packages/${designId}/${sha256}/${designId}.zip`,
    assetNote: "",
  };
  return { item, archive };
}

const manifest = (...packages) => ({ schemaVersion: 1, packages });
const missing = () =>
  Object.assign(new Error("absent"), { name: "NotFound", $metadata: { httpStatusCode: 404 } });
const headFor = (item) => ({
  ContentLength: item.bytes,
  ContentType: "application/zip",
  Metadata: { sha256: item.sha256 },
});

function storageMock() {
  const objects = new Map();
  const writes = [];
  return {
    objects,
    writes,
    async send(command) {
      const input = command.input;
      if (command.constructor.name === "HeadObjectCommand") {
        if (!objects.has(input.Key)) throw missing();
        return objects.get(input.Key);
      }
      assert.equal(command.constructor.name, "PutObjectCommand");
      writes.push(input);
      objects.set(input.Key, {
        ContentLength: input.Body.length,
        ContentType: input.ContentType,
        Metadata: input.Metadata,
      });
      return {};
    },
  };
}

async function localFixture(t, entries = [fixture()], current = manifest()) {
  const directory = await mkdtemp(join(tmpdir(), "landl-source-upload-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const packageDirectory = join(directory, "packages");
  const manifestPath = join(directory, "source-package-manifest.json");
  await mkdir(packageDirectory);
  await writeFile(
    join(packageDirectory, "manifest.json"),
    JSON.stringify(manifest(...entries.map((entry) => entry.item))),
  );
  await writeFile(manifestPath, `${JSON.stringify(current, null, 2)}\n`);
  for (const { item, archive } of entries) {
    const archivePath = join(packageDirectory, item.designId, item.sha256, item.filename);
    await mkdir(dirname(archivePath), { recursive: true });
    await writeFile(archivePath, archive);
  }
  return { directory, packageDirectory, manifestPath, log() {} };
}

test("upload manifest rejects unknown offers, paths, malformed hashes and metadata", () => {
  const { item } = fixture();
  assert.equal(validateManifest(manifest(item), { pending: true }).packages.length, 1);
  for (const change of [
    { designId: "unknown" },
    { filename: "../pigment.zip" },
    { key: "public/pigment.zip" },
    { sha256: "a".repeat(63) },
    { version: "version\nforged" },
    { bytes: 0 },
    { bytes: 100 * 1024 * 1024 + 1 },
    { sourceCommit: "unrecorded" },
    { sourceDirty: undefined },
    { sourceDirty: true },
    { assetNote: "line\ncontrol" },
    { secret: "private" },
  ])
    assert.throws(() => validateManifest(manifest({ ...item, ...change }), { pending: true }));
  assert.throws(() => validateManifest(manifest(), { pending: true }));
  assert.throws(() => validateManifest(manifest(item, item), { pending: true }));
});

test("all source-offer IDs accept only matching private archive identities", () => {
  for (const product of sourceProducts) {
    const { item, archive } = fixture(product.designId);
    assert.doesNotThrow(() => validateManifest(manifest(item), { pending: true }));
    assert.doesNotThrow(() => verifyArchive(archive, item));
    assert.throws(() =>
      validateManifest(manifest({ ...item, key: "public/template.zip" }), { pending: true }),
    );
    assert.throws(
      () => verifyArchive(Buffer.concat([archive, Buffer.from("changed")]), item),
      /integrity/,
    );
  }
});

test("archive verification binds ZIP bytes and its internal identity to the manifest", () => {
  const { item, archive } = fixture();
  assert.doesNotThrow(() => verifyArchive(archive, item));
  assert.throws(
    () => verifyArchive(Buffer.concat([archive, Buffer.from("extra")]), item),
    /integrity/,
  );
  assert.throws(() => verifyArchive(archive, { ...item, designId: "structure" }), /identity/);
  assert.throws(() => verifyArchive(archive, { ...item, version: "b".repeat(64) }), /identity/);
  assert.throws(
    () => verifyArchive(archive, { ...item, sourceCommit: "d".repeat(40) }),
    /identity/,
  );
  const dirty = fixture("pigment", "a".repeat(64), true);
  assert.throws(
    () => verifyArchive(dirty.archive, { ...dirty.item, sourceDirty: false }),
    /identity/,
  );
});

test("manifest merge retains paid versions, is idempotent and refuses silent mutation or rollback", () => {
  const first = fixture().item;
  const second = fixture("pigment", "b".repeat(64)).item;
  const merged = mergeManifests(manifest(first), manifest(second));
  assert.deepEqual(merged.packages, [first, second]);
  assert.deepEqual(mergeManifests(merged, manifest(second)), merged);
  assert.throws(() => mergeManifests(merged, manifest(first)), /older/);
  assert.throws(
    () => mergeManifests(manifest(first), manifest({ ...first, assetNote: "Changed meaning." })),
    /metadata/,
  );
});

test("storage settings reject unsafe endpoints and do not need secrets for a dry run", () => {
  const env = {
    SOURCE_S3_BUCKET: "private-source",
    SOURCE_S3_REGION: "auto",
    SOURCE_S3_ACCESS_KEY_ID: "example-access",
    SOURCE_S3_SECRET_ACCESS_KEY: "example-secret",
  };
  assert.equal(sourceStorageSettings(env).endpoint, undefined);
  assert.equal(
    sourceStorageSettings({
      ...env,
      SOURCE_S3_ENDPOINT: "https://example.r2.cloudflarestorage.com",
    }).region,
    "auto",
  );
  for (const endpoint of [
    "http://example.com",
    "https://user:password@example.com",
    "https://example.com?secret=private",
    "https://example.com/path",
    "invalid",
  ]) {
    assert.throws(() => sourceStorageSettings({ ...env, SOURCE_S3_ENDPOINT: endpoint }));
  }
  assert.throws(
    () => sourceStorageSettings({ ...env, SOURCE_S3_SECRET_ACCESS_KEY: "" }),
    /SOURCE_S3_SECRET_ACCESS_KEY/,
  );
});

test("real upload requires committed source and exact build provenance while allowing its generated manifest", () => {
  const { item } = fixture();
  const git =
    (changed = "", untracked = "", commit = item.sourceCommit) =>
    (args) => {
      if (args[0] === "rev-parse") return `${commit}\n`;
      return args[0] === "diff" ? changed : untracked;
    };
  assert.doesNotThrow(() => assertUploadSource(manifest(item), git()));
  assert.doesNotThrow(() =>
    assertUploadSource(manifest(item), git("src/data/source-package-manifest.json\0")),
  );
  assert.throws(
    () => assertUploadSource(manifest(item), git("src/app/page.tsx\0")),
    /Commit your reviewed/,
  );
  assert.throws(
    () => assertUploadSource(manifest(item), git("", "src/new-file.ts\0")),
    /Commit your reviewed/,
  );
  assert.throws(
    () => assertUploadSource(manifest(item), git("", "", "d".repeat(40))),
    /different source commit/,
  );
});

test("local package paths reject traversal and symlinks, including directory ancestors", async (t) => {
  const local = await localFixture(t);
  await assert.rejects(
    readSafeFile(local.packageDirectory, "../source-package-manifest.json"),
    /Unsafe/,
  );
  await assert.rejects(readSafeFile(local.packageDirectory, "C:\\secrets"), /Unsafe/);
  const link = join(local.directory, "linked-packages");
  try {
    await symlink(local.packageDirectory, link, "junction");
  } catch (error) {
    if (error.code === "EPERM") {
      t.skip("Symlink permission unavailable on this host.");
      return;
    }
    throw error;
  }
  await assert.rejects(readSafeFile(link, "manifest.json"), /Symlink/);
});

test("dry run is offline and leaves the storefront manifest and filesystem unchanged", async (t) => {
  const local = await localFixture(t);
  const before = await readFile(local.manifestPath);
  const files = await readdir(local.directory);
  const result = await publishPackages({
    ...local,
    client: {
      send() {
        throw new Error("Must remain offline");
      },
    },
  });
  assert.equal(result.uploaded, false);
  assert.deepEqual(await readFile(local.manifestPath), before);
  assert.deepEqual(await readdir(local.directory), files);
});

test("uploads use conditional creation, private cache policy and SHA metadata without public ACL", async () => {
  const { item, archive } = fixture();
  const storage = storageMock();
  assert.equal(await ensureRemotePackage(storage, "private-source", item, archive), "uploaded");
  assert.equal(storage.writes.length, 1);
  assert.equal(storage.writes[0].IfNoneMatch, "*");
  assert.equal(storage.writes[0].CacheControl, "private, no-store");
  assert.equal(storage.writes[0].ContentType, "application/zip");
  assert.equal(storage.writes[0].Metadata.sha256, item.sha256);
  assert.equal("ACL" in storage.writes[0], false);
  assert.equal(await ensureRemotePackage(storage, "private-source", item, archive), "verified");
  assert.equal(storage.writes.length, 1);
});

test("existing object conflicts and denied HEAD requests never trigger an overwrite", async () => {
  const { item, archive } = fixture();
  const storage = storageMock();
  for (const altered of [
    { ContentLength: item.bytes + 1 },
    { ContentType: "text/plain" },
    { Metadata: { sha256: "f".repeat(64) } },
  ]) {
    storage.objects.set(item.key, { ...headFor(item), ...altered });
    await assert.rejects(
      ensureRemotePackage(storage, "private-source", item, archive),
      /overwrite refused/,
    );
  }
  assert.equal(storage.writes.length, 0);
  const denied = {
    send: async () => {
      throw Object.assign(new Error("credential detail must not escape"), {
        $metadata: { httpStatusCode: 403 },
      });
    },
  };
  await assert.rejects(
    ensureRemotePackage(denied, "private-source", item, archive),
    /Cannot verify private storage/,
  );
});

test("conditional upload races accept only the exact expected object", async () => {
  const { item, archive } = fixture();
  let calls = 0;
  const client = {
    async send() {
      calls += 1;
      if (calls === 1) throw missing();
      if (calls === 2)
        throw Object.assign(new Error("race"), { $metadata: { httpStatusCode: 412 } });
      return headFor(item);
    },
  };
  assert.equal(await ensureRemotePackage(client, "private-source", item, archive), "uploaded");
  assert.equal(calls, 3);
});

test("all local archives are validated before the first remote write", async (t) => {
  const first = fixture();
  const second = fixture("structure");
  const local = await localFixture(t, [first, second]);
  await writeFile(
    join(local.packageDirectory, second.item.designId, second.item.sha256, second.item.filename),
    "corrupt",
  );
  const storage = storageMock();
  await assert.rejects(
    publishPackages({ ...local, upload: true, client: storage, bucket: "private-source" }),
    /integrity/,
  );
  assert.equal(storage.writes.length, 0);
});

test("a partial remote failure leaves all old manifest records untouched and releases its lock", async (t) => {
  const first = fixture();
  const second = fixture("structure");
  const local = await localFixture(t, [first, second]);
  const before = await readFile(local.manifestPath);
  const storage = storageMock();
  const send = storage.send.bind(storage);
  storage.send = async (command) => {
    if (command.constructor.name === "PutObjectCommand" && command.input.Key === second.item.key)
      throw new Error("simulated unavailable service");
    return send(command);
  };
  await assert.rejects(
    publishPackages({ ...local, upload: true, client: storage, bucket: "private-source" }),
    /Private upload failed/,
  );
  assert.deepEqual(await readFile(local.manifestPath), before);
  assert.equal(storage.objects.has(first.item.key), true);
  assert.deepEqual((await readdir(local.directory)).sort(), [
    "packages",
    "source-package-manifest.json",
  ]);
});

test("only successfully verified uploads append the storefront manifest", async (t) => {
  const first = fixture();
  const second = fixture("pigment", "b".repeat(64));
  const local = await localFixture(t, [second], manifest(first.item));
  const storage = storageMock();
  const result = await publishPackages({
    ...local,
    upload: true,
    client: storage,
    bucket: "private-source",
  });
  assert.equal(result.uploaded, true);
  assert.deepEqual(JSON.parse(await readFile(local.manifestPath, "utf8")).packages, [
    first.item,
    second.item,
  ]);
  await publishPackages({ ...local, upload: true, client: storage, bucket: "private-source" });
  assert.equal(storage.writes.length, 1);
});

test("another upload lock or concurrent manifest edit cannot be overwritten", async (t) => {
  const local = await localFixture(t);
  const lockPath = `${local.manifestPath}.upload-lock`;
  await writeFile(lockPath, "another publisher");
  const storage = storageMock();
  await assert.rejects(
    publishPackages({ ...local, upload: true, client: storage, bucket: "private-source" }),
    { code: "EEXIST" },
  );
  assert.equal(await readFile(lockPath, "utf8"), "another publisher");
  assert.equal(storage.writes.length, 0);
  await rm(lockPath);
  const send = storage.send.bind(storage);
  storage.send = async (command) => {
    const response = await send(command);
    if (command.constructor.name === "PutObjectCommand")
      await writeFile(local.manifestPath, '{"schemaVersion":1,"packages":[]}\n');
    return response;
  };
  await assert.rejects(
    publishPackages({ ...local, upload: true, client: storage, bucket: "private-source" }),
    /changed during upload/,
  );
  assert.equal(await readFile(local.manifestPath, "utf8"), '{"schemaVersion":1,"packages":[]}\n');
});
