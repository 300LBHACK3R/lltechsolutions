import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { SourceCommerceError } from "../src/lib/source-commerce-core.ts";
import {
  SourceConfigurationError,
  createSourceReadinessReporter,
  sourceEnvironmentFailureField,
} from "../src/lib/source-readiness-diagnostic.ts";

const production = { nodeEnv: "production", vercelEnv: "production" };
const canary = "PRIVATE-CANARY-DO-NOT-LOG";
const parseLine = (line) => JSON.parse(line.slice("[source-readiness] ".length));

test("readiness logs only allowlisted fields and reasons, never error details", () => {
  const lines = [];
  const report = createSourceReadinessReporter({ log: (line) => lines.push(line) });
  const known = new SourceConfigurationError("STRIPE_SECRET_KEY", "invalid");
  known.message = canary;
  known.stack = canary;
  known.cause = { token: canary };
  report(known, production);
  report(new Error(canary), production);
  const forged = new SourceConfigurationError(canary, canary);
  report(forged, production);
  assert.deepEqual(lines.map(parseLine), [
    { field: "STRIPE_SECRET_KEY", reason: "invalid" },
    { field: "SOURCE_CONFIGURATION", reason: "unexpected" },
  ]);
  assert.ok(lines.every((line) => line.startsWith("[source-readiness] ")));
  assert.ok(!lines.join("\n").includes(canary));
  assert.ok(known instanceof SourceCommerceError);
  assert.equal(known.code, "source_unavailable");
  assert.equal(known.status, 503);
});

test("production logging is bounded per distinct failure and cannot break readiness", () => {
  const lines = [];
  let timestamp = 0;
  const report = createSourceReadinessReporter({
    log: (line) => lines.push(line),
    now: () => timestamp,
  });
  const failure = new SourceConfigurationError("RESEND_API_KEY", "missing");
  report(failure, { nodeEnv: "development" });
  assert.equal(lines.length, 0);
  report(failure, { vercelEnv: "production" });
  for (let i = 0; i < 100; i++) report(failure, production);
  timestamp = 59_999;
  report(failure, production);
  assert.equal(lines.length, 1);
  report(new SourceConfigurationError("SOURCE_S3_BUCKET", "missing"), production);
  assert.equal(lines.length, 2);
  timestamp = 60_000;
  report(failure, { nodeEnv: "production" });
  assert.equal(lines.length, 3);
  const brokenLogger = createSourceReadinessReporter({
    log: () => {
      throw new Error(canary);
    },
  });
  assert.doesNotThrow(() => brokenLogger(failure, production));
});

test("environment failure attribution keeps test-mode and live-origin restrictions distinct", () => {
  assert.equal(
    sourceEnvironmentFailureField({ origin: "https://lltechsolutions.ca", stripeKey: canary }),
    "STRIPE_SECRET_KEY",
  );
  assert.equal(
    sourceEnvironmentFailureField({
      origin: "https://lltechsolutions.ca",
      stripeKey: "rk_test_fixture",
    }),
    "STRIPE_SECRET_KEY",
  );
  assert.equal(
    sourceEnvironmentFailureField({
      origin: "https://lltechsolutions.ca/",
      stripeKey: "rk_live_fixture",
    }),
    "SOURCE_CHECKOUT_ORIGIN",
  );
  assert.equal(
    sourceEnvironmentFailureField({
      origin: "https://lltechsolutions.ca",
      stripeKey: "rk_live_fixture",
    }),
    "VERCEL_ENV",
  );
});

// Node's test runner needs the same two aliases and JSON loading that Next supplies.
const manifestUrl = new URL("../src/data/source-package-manifest.json", import.meta.url);
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/data/source-products")
      return nextResolve(new URL("../src/data/source-products.ts", import.meta.url).href, context);
    if (specifier === "@/data/source-package-manifest.json")
      return { url: manifestUrl.href, shortCircuit: true };
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url === manifestUrl.href)
      return {
        format: "module",
        source: `export default ${readFileSync(manifestUrl, "utf8")}`,
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
}

test("real readiness preserves gates, diagnoses configuration privately, and leaves absent packages silent", async () => {
  const valid = {
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
  const previous = Object.fromEntries(Object.keys(valid).map((key) => [key, process.env[key]]));
  const originalError = console.error;
  const lines = [];
  const configure = (overrides = {}) => {
    for (const [key, value] of Object.entries({ ...valid, ...overrides })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
  try {
    console.error = (line) => lines.push(line);
    configure();
    assert.equal(commerce.isSourceCheckoutConfigured("pigment"), true);
    assert.equal(commerce.isSourceCheckoutConfigured("calgary-hot-shot"), false);
    assert.equal(commerce.isSourceCheckoutConfigured("unknown-design"), false);
    assert.equal(lines.length, 0);
    for (const field of [
      "STRIPE_SECRET_KEY",
      "SOURCE_DOWNLOAD_SIGNING_SECRET",
      "SOURCE_S3_BUCKET",
      "SOURCE_S3_REGION",
      "SOURCE_S3_ACCESS_KEY_ID",
      "SOURCE_S3_SECRET_ACCESS_KEY",
      "STRIPE_WEBHOOK_SECRET",
      "RESEND_API_KEY",
      "SOURCE_FROM_EMAIL",
    ]) {
      configure({ [field]: undefined });
      assert.equal(commerce.isSourceCheckoutConfigured("pigment"), false, field);
      assert.deepEqual(parseLine(lines.at(-1)), { field, reason: "missing" });
    }
    for (const [field, value, reason = "invalid"] of [
      ["SOURCE_CHECKOUT_ORIGIN", "https://lltechsolutions.ca/"],
      ["STRIPE_SECRET_KEY", "rk_test_fixture"],
      ["VERCEL_ENV", undefined],
      ["SOURCE_DOWNLOAD_SIGNING_SECRET", canary],
      ["SOURCE_S3_ENDPOINT", `not-a-url-${canary}`],
      ["SOURCE_S3_BUCKET", canary],
      ["SOURCE_DOWNLOADS_ENABLED", "false", "disabled"],
      ["STRIPE_WEBHOOK_SECRET", canary],
      ["RESEND_API_KEY", canary],
      ["SOURCE_FROM_EMAIL", `fixture@example.invalid\n${canary}`],
      ["SOURCE_STRIPE_AUTOMATIC_TAX", "TRUE"],
    ]) {
      configure({ [field]: value });
      assert.equal(commerce.isSourceCheckoutConfigured("pigment"), false, field);
      assert.deepEqual(parseLine(lines.at(-1)), { field, reason });
    }
    const count = lines.length;
    for (let i = 0; i < 100; i++)
      assert.equal(commerce.isSourceCheckoutConfigured("pigment"), false);
    assert.equal(lines.length, count);
    assert.ok(!lines.join("\n").includes(canary));
    configure({ SOURCE_S3_ENDPOINT: undefined, STRIPE_SECRET_KEY: "sk_live_fixture" });
    assert.equal(commerce.isSourceCheckoutConfigured("pigment"), true);
    configure({
      NODE_ENV: "development",
      VERCEL_ENV: undefined,
      SOURCE_CHECKOUT_ORIGIN: "http://localhost:3000",
      STRIPE_SECRET_KEY: "rk_test_fixture",
    });
    assert.equal(commerce.isSourceCheckoutConfigured("pigment"), true);
    process.env.VERCEL_ENV = "preview";
    assert.equal(commerce.isSourceCheckoutConfigured("pigment"), false);
    assert.equal(lines.length, count);
    const response = commerce.sourceErrorResponse(
      new SourceConfigurationError("STRIPE_SECRET_KEY", "invalid"),
    );
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      message: "Source downloads are temporarily unavailable. Please contact L&L for help.",
    });
  } finally {
    console.error = originalError;
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
