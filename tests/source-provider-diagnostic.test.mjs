import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { createSourceProviderReporter } from "../src/lib/source-provider-diagnostic.ts";

const production = { nodeEnv: "production", vercelEnv: "production" };
const canary = "PRIVATE-PROVIDER-CANARY-DO-NOT-LOG";
const prefix = "[source-provider] ";
const parseLine = (line) => {
  assert.ok(line.startsWith(prefix));
  return JSON.parse(line.slice(prefix.length));
};

test("provider diagnostics expose only static stages, allowlisted categories and numeric status", () => {
  const lines = [];
  const report = createSourceProviderReporter({ log: (line) => lines.push(line) });
  const failure = Object.assign(new Error(canary), {
    name: "AccessDenied",
    stack: canary,
    cause: { secret: canary },
    request: { body: canary },
    raw: { message: canary },
    bucket: canary,
    key: canary,
    headers: { authorization: canary },
    $metadata: { httpStatusCode: 403, requestId: canary },
  });
  report("storage_head", failure, production);
  report("stripe_checkout", { name: "StripeAuthenticationError", statusCode: 401 }, production);
  report("storage_head", { Code: "NoSuchKey", $metadata: { httpStatusCode: 404 } }, production);
  report("storage_head", { code: "ENOTFOUND", message: canary }, production);
  report("archive_metadata", { name: "checksum_mismatch", metadata: canary }, production);
  report(canary, { name: canary, code: canary, statusCode: canary }, production);
  assert.deepEqual(lines.map(parseLine), [
    { stage: "storage_head", category: "AccessDenied", status: 403 },
    { stage: "stripe_checkout", category: "StripeAuthenticationError", status: 401 },
    { stage: "storage_head", category: "NoSuchKey", status: 404 },
    { stage: "storage_head", category: "ENOTFOUND" },
    { stage: "archive_metadata", category: "checksum_mismatch" },
    { stage: "provider", category: "unexpected" },
  ]);
  assert.ok(!lines.join("\n").includes(canary));
});

test("provider status cannot contain coercible, noninteger, nonfinite or out-of-range values", () => {
  for (const status of ["403", canary, null, {}, 99, 600, 403.5, NaN, Infinity]) {
    for (const field of ["aws", "stripe"]) {
      const lines = [];
      const report = createSourceProviderReporter({ log: (line) => lines.push(line) });
      report(
        "storage_head",
        field === "aws" ? { $metadata: { httpStatusCode: status } } : { statusCode: status },
        production,
      );
      assert.deepEqual(lines.map(parseLine), [{ stage: "storage_head", category: "unexpected" }]);
    }
  }
});

test("provider diagnostics are production-only, throttle by stage/category, and cannot throw", () => {
  const lines = [];
  let timestamp = 0;
  const report = createSourceProviderReporter({
    log: (line) => lines.push(line),
    now: () => timestamp,
  });
  const failure = { name: "AccessDenied", statusCode: 403 };
  report("storage_head", failure, { nodeEnv: "development", vercelEnv: "preview" });
  assert.equal(lines.length, 0);
  report("storage_head", failure, { vercelEnv: "production" });
  for (let statusCode = 400; statusCode < 500; statusCode++)
    report("storage_head", { ...failure, statusCode }, production);
  timestamp = 59_999;
  report("storage_head", failure, production);
  assert.equal(lines.length, 1);
  report("stripe_checkout", failure, production);
  report("storage_head", { name: "TimeoutError" }, production);
  assert.equal(lines.length, 3);
  timestamp = 60_000;
  report("storage_head", failure, { nodeEnv: "production" });
  assert.equal(lines.length, 4);

  const brokenLogger = createSourceProviderReporter({
    log: () => {
      throw new Error(canary);
    },
  });
  assert.doesNotThrow(() => brokenLogger("storage_head", failure, production));
  const throwingProperty = {
    get name() {
      throw new Error(canary);
    },
  };
  assert.doesNotThrow(() => report("storage_head", throwingProperty, production));
});

// Replace every external provider with an in-process stub before importing commerce.
// No fixture credentials can reach a real SDK or network transport.
const fixture = { head: null, storageError: null, stripeError: null, calls: [] };
const stateKey = Symbol.for("landl.source-provider-diagnostic.test");
globalThis[stateKey] = fixture;
const manifestUrl = new URL("../src/data/source-package-manifest.json", import.meta.url);
const manifest = JSON.parse(readFileSync(manifestUrl, "utf8"));
const archive = manifest.packages.filter((entry) => entry.designId === "pigment").at(-1);
assert.ok(archive, "a real manifest entry is required for the checkout fixture");
const stubs = {
  stripe: `
    const state = globalThis[Symbol.for("landl.source-provider-diagnostic.test")];
    export default class Stripe {
      checkout = { sessions: { create: async () => {
        state.calls.push("stripe");
        if (state.stripeError) throw state.stripeError;
        return { id: "cs_live_providerfixture123456", url: "https://checkout.stripe.com/c/pay/fixture" };
      } } };
    }
  `,
  "@aws-sdk/client-s3": `
    const state = globalThis[Symbol.for("landl.source-provider-diagnostic.test")];
    export class S3Client {
      async send() {
        state.calls.push("storage");
        if (state.storageError) throw state.storageError;
        return state.head;
      }
    }
    export class HeadObjectCommand {}
    export class GetObjectCommand {}
  `,
  "@aws-sdk/s3-request-presigner": `export function getSignedUrl() { throw new Error("Unexpected signing call"); }`,
  resend: `export class Resend { constructor() { throw new Error("Unexpected email call"); } }`,
};
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (Object.hasOwn(stubs, specifier))
      return { url: `source-provider-test:${specifier}`, shortCircuit: true };
    if (specifier === "@/data/source-products")
      return nextResolve(new URL("../src/data/source-products.ts", import.meta.url).href, context);
    if (specifier === "@/data/source-package-manifest.json")
      return { url: manifestUrl.href, shortCircuit: true };
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith("source-provider-test:"))
      return {
        format: "module",
        source: stubs[url.slice("source-provider-test:".length)],
        shortCircuit: true,
      };
    if (url === manifestUrl.href)
      return {
        format: "module",
        source: `export default ${JSON.stringify(manifest)}`,
        shortCircuit: true,
      };
    return nextLoad(url, context);
  },
});
let commerce;
try {
  commerce = await import("../src/lib/source-commerce.ts");
} finally {
  hooks.deregister();
  delete globalThis[stateKey];
}

test("actual checkout keeps provider failures private and verifies the archive before Stripe", async () => {
  const validEnvironment = {
    NODE_ENV: "production",
    VERCEL_ENV: "production",
    SOURCE_CHECKOUT_ORIGIN: "https://lltechsolutions.ca",
    STRIPE_SECRET_KEY: "rk_live_fixture",
    SOURCE_DOWNLOAD_SIGNING_SECRET: "synthetic-test-signing-secret-at-least-32-bytes",
    SOURCE_S3_ENDPOINT: "https://storage.example.invalid",
    SOURCE_S3_BUCKET: "test-source-bucket",
    SOURCE_S3_REGION: "auto",
    SOURCE_S3_ACCESS_KEY_ID: canary,
    SOURCE_S3_SECRET_ACCESS_KEY: canary,
    SOURCE_DOWNLOADS_ENABLED: "true",
    STRIPE_WEBHOOK_SECRET: "whsec_fixture",
    RESEND_API_KEY: "re_fixture",
    SOURCE_FROM_EMAIL: "fixture@example.invalid",
    SOURCE_STRIPE_AUTOMATIC_TAX: "false",
  };
  const previous = Object.fromEntries(
    Object.keys(validEnvironment).map((key) => [key, process.env[key]]),
  );
  const originalError = console.error;
  const lines = [];
  const reset = () => {
    fixture.calls.length = 0;
    fixture.storageError = null;
    fixture.stripeError = null;
    fixture.head = {
      ContentLength: archive.bytes,
      Metadata: { sha256: archive.sha256 },
      ContentType: "application/zip",
    };
  };
  const assertPrivate503 = async (error) => {
    const response = commerce.sourceErrorResponse(error);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      message: "Source downloads are temporarily unavailable. Please contact L&L for help.",
    });
    assert.equal(response.headers.get("cache-control"), "private, no-store, max-age=0");
  };
  try {
    Object.assign(process.env, validEnvironment);
    console.error = (line) => lines.push(line);
    reset();
    fixture.storageError = Object.assign(new Error(canary), {
      name: "AccessDenied",
      $metadata: { httpStatusCode: 403, requestId: canary },
    });
    await assert.rejects(
      commerce.createSourceCheckout("pigment"),
      (error) => error === fixture.storageError,
    );
    assert.deepEqual(fixture.calls, ["storage"]);
    assert.deepEqual(parseLine(lines.at(-1)), {
      stage: "storage_head",
      category: "AccessDenied",
      status: 403,
    });
    await assertPrivate503(fixture.storageError);

    for (const [field, value, category] of [
      ["ContentLength", archive.bytes + 1, "size_mismatch"],
      ["Metadata", { sha256: canary }, "checksum_mismatch"],
      ["ContentType", canary, "content_type_mismatch"],
    ]) {
      reset();
      fixture.head[field] = value;
      let rejected;
      await assert.rejects(commerce.createSourceCheckout("pigment"), (error) => {
        rejected = error;
        return error.code === "archive_unavailable" && error.status === 503;
      });
      assert.deepEqual(fixture.calls, ["storage"]);
      assert.deepEqual(parseLine(lines.at(-1)), { stage: "archive_metadata", category });
      await assertPrivate503(rejected);
    }

    reset();
    fixture.stripeError = Object.assign(new Error(canary), {
      name: "StripePermissionError",
      statusCode: 403,
    });
    await assert.rejects(
      commerce.createSourceCheckout("pigment"),
      (error) => error === fixture.stripeError,
    );
    assert.deepEqual(fixture.calls, ["storage", "stripe"]);
    assert.deepEqual(parseLine(lines.at(-1)), {
      stage: "stripe_checkout",
      category: "StripePermissionError",
      status: 403,
    });
    await assertPrivate503(fixture.stripeError);

    reset();
    const count = lines.length;
    const response = await commerce.createSourceCheckout("pigment");
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { url: "https://checkout.stripe.com/c/pay/fixture" });
    assert.deepEqual(fixture.calls, ["storage", "stripe"]);
    assert.match(response.headers.get("set-cookie"), /HttpOnly; SameSite=Lax/);
    assert.equal(lines.length, count);
    assert.ok(!lines.join("\n").includes(canary));
  } finally {
    console.error = originalError;
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
