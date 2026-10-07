import assert from "node:assert/strict";
import test from "node:test";
import { unzipSync } from "fflate";
import ts from "typescript";
import { check as checkFormatting } from "prettier";
import {
  assembleSourcePackage,
  assertSourceBuildState,
  packageDemos,
} from "../scripts/build-source-packages.mjs";
import {
  assertPackagePath,
  auditSourceFiles,
  createSourceArchive,
  sha256,
  textBytes,
} from "../scripts/lib/source-package-tools.mjs";
import { sourceLicense } from "../src/data/source-license.ts";
import { sourceProduct } from "../src/data/source-products.ts";

const commit = "a".repeat(40);
const fixture = () =>
  new Map([
    [
      "package.json",
      textBytes(
        JSON.stringify({ scripts: { build: "next build" }, dependencies: { next: "16.3.8" } }),
      ),
    ],
    ["package-lock.json", textBytes("{}")],
    ["README.md", textBytes("Sample source package")],
    ["LICENSE.txt", textBytes("One business website")],
    [".env.example", textBytes("# No credentials needed")],
    ["app/page.tsx", textBytes("export default function Page() { return <h1>Sample</h1>; }")],
  ]);

test("source build provenance rejects tracked edits, untracked files and changes of HEAD", () => {
  const gitOutput =
    (status, head = commit) =>
    (args) =>
      args[0] === "status" ? status : head;
  for (const status of [
    " M src/data/website-collection.ts\n",
    "?? src/new-feature.ts\n",
    "M  src/config/site.ts\n",
  ]) {
    assert.throws(
      () => assertSourceBuildState({ gitOutput: gitOutput(status) }),
      /clean Git working tree/u,
    );
  }
  assert.equal(assertSourceBuildState({ gitOutput: gitOutput("") }), commit);
  assert.throws(
    () => assertSourceBuildState({ expectedCommit: "b".repeat(40), gitOutput: gitOutput("") }),
    /HEAD changed/u,
  );
});

test("package paths reject traversal, Windows drives, hidden secrets and generated artifacts", () => {
  for (const path of [
    "../secret",
    "/private",
    "C:/Users/test",
    "a\\b",
    "a/./b",
    "a//b",
    "a/../../b",
    ".env.local",
    "app/.env",
    "node_modules/a.js",
    ".git/config",
    ".vercel/project.json",
    "build/out.js",
    "keys/key.pem",
    "file\u0000name",
  ]) {
    assert.throws(() => assertPackagePath(path), /path|Private|generated/u, path);
  }
  for (const path of [".env.example", ".gitignore", "app/page.tsx", "public/images/sample.webp"])
    assert.equal(assertPackagePath(path), path);
});

test("the archive audit rejects secrets, case collisions and studio/client routes", () => {
  for (const [name, content] of [
    ["config.ts", 'const key = "sk_live_exampleCredential123";'],
    ["config.ts", "-----BEGIN PRIVATE KEY-----"],
    ["config.ts", 'const website = "https://mckenziehousemassage.ca";'],
    ["app/page.tsx", '<a href="https://lltechsolutions.ca/contact">Enquire</a>'],
  ]) {
    const files = fixture();
    files.set(name, textBytes(content));
    assert.throws(() => auditSourceFiles(files), /credential|identity|redirect/u);
  }
  const files = fixture();
  files.set("PACKAGE.json", textBytes("{}"));
  assert.throws(() => auditSourceFiles(files), /duplicate/u);
});

test("deterministic ZIPs round-trip the exact audited file bytes", () => {
  const files = fixture();
  const first = createSourceArchive(files);
  const second = createSourceArchive(new Map([...files].reverse()));
  assert.deepEqual(first, second);
  const decoded = unzipSync(first);
  assert.deepEqual(Object.keys(decoded).sort(), [...files.keys()].sort());
  for (const [name, bytes] of files) assert.deepEqual(decoded[name], bytes);
});

test("44 maintained customer editions are package candidates; missing source is not substituted", () => {
  assert.equal(Object.keys(packageDemos).length, 44);
  for (const id of ["calgary-hot-shot", "unknown"]) assert.equal(packageDemos[id], undefined);
});

test("missing reference source and unsafe selections are rejected", async () => {
  for (const id of ["calgary-hot-shot", "../../public"]) {
    await assert.rejects(assembleSourcePackage(id, { sourceCommit: commit }), /No source package/u);
  }
});

test("a direct-contact package contains editable source, own config and customer-only dependencies", async () => {
  const result = await assembleSourcePackage("pigment", { sourceCommit: commit });
  const files = unzipSync(result.archive);
  assert.ok(files["app/[[...view]]/page.tsx"]);
  assert.ok(files["src/components/collection/PaintingTemplate.tsx"]);
  assert.ok(files["src/config/site.ts"]);
  assert.ok(files["app/icon.svg"]);
  assert.equal(files["app/icon.png"], undefined);
  assert.equal(
    files["src/config/site.ts"] &&
      Buffer.from(files["src/config/site.ts"]).toString().includes("hello@example.com"),
    true,
  );
  const pkg = JSON.parse(Buffer.from(files["package.json"]));
  assert.deepEqual(Object.keys(pkg.dependencies).sort(), ["next", "react", "react-dom"]);
  const lock = JSON.parse(Buffer.from(files["package-lock.json"]));
  assert.equal(lock.packages["node_modules/stripe"], undefined);
  assert.equal(lock.packages["node_modules/resend"], undefined);
  assert.equal(lock.packages["node_modules/@aws-sdk/client-s3"], undefined);
  assert.equal(result.manifest.sha256, sha256(result.archive));
  assert.equal(result.manifest.bytes, result.archive.length);
  assert.equal(
    result.manifest.key,
    `source-packages/pigment/${result.manifest.sha256}/pigment.zip`,
  );
  assert.match(result.manifest.version, /^[a-f0-9]{64}$/u);
  assert.equal(
    result.manifest.sourceDirty,
    true,
    "direct helper packages default to non-publishable review provenance",
  );
  assert.equal(JSON.parse(Buffer.from(files["TEMPLATE-PACKAGE.json"])).sourceDirty, true);
});

test("form source remains explicitly local, with licence terms identical to the storefront", async () => {
  const result = await assembleSourcePackage("medical-spa", { sourceCommit: commit });
  const get = (name) => Buffer.from(result.files.get(name)).toString("utf8");
  assert.match(
    get("src/components/collection/DemoEnquiryForm.tsx"),
    /not.*sent|not send|Nothing is sent|nothing was sent|demonstration/iu,
  );
  assert.match(
    get("README.md"),
    /Sample forms validate locally and do not send or save enquiries/u,
  );
  assert.doesNotMatch(get("app/layout.tsx"), /TemplatePrice|demo-bar|Make this my website/u);
  for (const point of sourceLicense.points) assert.ok(get("LICENSE.txt").includes(point));
  assert.match(get("LICENSE.txt"), /hand the finished website and its source/u);
  assert.match(get(".env.example"), /needs no environment variables/u);
});

test("neutral asset substitutions are disclosed and carry correct alternative descriptions", async () => {
  const result = await assembleSourcePackage("earthworks", { sourceCommit: commit });
  assert.match(result.manifest.assetNote, /pictures differ from the preview/u);
  const provenance = JSON.parse(Buffer.from(result.files.get("ASSET-LICENSES.json")));
  assert.ok(
    provenance.assets.every((asset) =>
      ["painting-interior.webp", "construction-home.webp"].includes(asset.sourceAsset),
    ),
  );
  assert.ok(provenance.assets.every((asset) => /^[a-f0-9]{64}$/u.test(asset.sha256)));
  const data = Buffer.from(result.files.get("src/data/website-collection.ts")).toString("utf8");
  assert.match(data, /Generated sample contemporary home/u);
});

test("transport packaging omits sibling website components and client content", async () => {
  const result = await assembleSourcePackage("moving-company", { sourceCommit: commit });
  assert.ok(result.files.has("src/components/collection/MovingTemplate.tsx"));
  for (const component of [
    "CourierTemplate",
    "AutoTransportTemplate",
    "EquipmentRentalsTemplate",
    "ColdChainTemplate",
    "FreightTemplate",
  ]) {
    assert.equal(result.files.has(`src/components/collection/${component}.tsx`), false);
  }
  for (const component of [
    "ColdChainInteractions",
    "FreightInteractions",
    "TransportEquipmentInteractions",
  ]) {
    assert.equal(result.files.has(`src/components/collection/${component}.tsx`), false);
  }
  const layout = Buffer.from(result.files.get("app/layout.tsx")).toString();
  assert.match(layout, /transport-moving\.css/u);
  for (const style of ["courier", "auto", "equipment", "cold", "freight"]) {
    assert.equal(result.files.has(`src/styles/transport-${style}.css`), false);
    assert.doesNotMatch(layout, new RegExp(`transport-${style}\\.css`, "u"));
  }
  for (const [path, bytes] of result.files) {
    assert.doesNotMatch(path, /public\/(?:brand|media|images\/projects)/u);
    if (/\.(?:tsx?|json)$/u.test(path))
      assert.doesNotMatch(
        Buffer.from(bytes).toString(),
        /Tow-N-Go|McKenzie House|Horizon Contracting Group|Crestline Painting/u,
      );
  }
});

test("customer code is formatted, documented and carries neutral sample contact copy", async () => {
  for (const id of ["home-cleaning", "catering-events", "fine-dining", "horizon"]) {
    const result = await assembleSourcePackage(id, { sourceCommit: commit });
    assert.ok(result.files.has("EDITING.md"), id);
    assert.ok(result.files.has(".editorconfig"), id);
    for (const [name, bytes] of result.files) {
      if (!/\.(?:tsx?|css|mjs|json)$/u.test(name)) continue;
      const source = Buffer.from(bytes).toString();
      assert.equal(
        await checkFormatting(source, {
          filepath: name,
          printWidth: 100,
          tabWidth: 2,
          trailingComma: "all",
          endOfLine: "lf",
        }),
        true,
        `${id}/${name}`,
      );
      if (/\.(?:tsx?|mjs)$/u.test(name)) {
        assert.doesNotMatch(source, /<>\s*<\/>/u, `${id}/${name}`);
        assert.doesNotMatch(
          source,
          /L&L website demonstration|follow the L&L|use the L&L enquiry link/u,
          `${id}/${name}`,
        );
      }
    }
  }
});

test("all 44 archives enforce path, content and metadata invariants", async () => {
  for (const id of Object.keys(packageDemos)) {
    const result = await assembleSourcePackage(id, { sourceCommit: commit });
    auditSourceFiles(result.files);
    const decoded = unzipSync(result.archive);
    for (const [name, bytes] of result.files) {
      if (!/\.(?:tsx?|mjs)$/u.test(name)) continue;
      const parsed = ts.createSourceFile(
        name,
        Buffer.from(bytes).toString(),
        ts.ScriptTarget.Latest,
        true,
      );
      assert.equal(
        parsed.parseDiagnostics.length,
        0,
        `${id}/${name} must remain valid after cleanup`,
      );
    }
    assert.equal(decoded["TEMPLATE-PACKAGE.json"] !== undefined, true, id);
    assert.equal(JSON.parse(Buffer.from(decoded["TEMPLATE-PACKAGE.json"])).designId, id);
    assert.equal(result.manifest.bytes, result.archive.length, id);
    if (packageDemos[id].reference) {
      const metadata = JSON.parse(Buffer.from(decoded["TEMPLATE-PACKAGE.json"]));
      assert.equal(metadata.routes.length, sourceProduct(id).pageCount, id);
      assert.equal(metadata.contactMode, "local-demo-only", id);
      assert.ok(decoded["EDITING.md"], `${id} needs its own editing instructions`);
      assert.match(Buffer.from(decoded["README.md"]).toString(), /do not send email/u);
      assert.ok(result.manifest.assetNote.length > 40, id);
      for (const [name, bytes] of result.files) {
        assert.doesNotMatch(name, /^(?:src\/)?app\/api\//u, id);
        if (/^(?:app|src|components|data|lib|utils)\/.*\.(?:ts|tsx|css)$/u.test(name)) {
          assert.doesNotMatch(
            Buffer.from(bytes).toString(),
            /Tow-N-Go|McKenzie House|Crestline Painting|Chad Muxlow|Heather Saunders|api\/contact|resend\.com/u,
            `${id}/${name}`,
          );
        }
      }
    }
    assert.ok(
      result.files.size < (packageDemos[id].reference ? 180 : 70),
      `${id} must not contain the studio source tree`,
    );
  }
});
