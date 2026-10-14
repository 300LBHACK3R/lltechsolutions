import test from "node:test";
import assert from "node:assert/strict";
import {
  createSourceProviderReporter,
  createSourceStorageProbe,
} from "../src/lib/source-provider-diagnostic.ts";

const environment = { nodeEnv: "production", vercelEnv: "production" };
const settings = {
  endpoint: `https://${"a".repeat(32)}.r2.cloudflarestorage.com`,
  region: "auto",
  accessKey: "b".repeat(32),
  secretKey: "c".repeat(64),
};
const badHead = { name: "BadRequest", $metadata: { httpStatusCode: 400 } };
const canary = "DO-NOT-LOG-PRIVATE-PATH-OR-CREDENTIAL";
function fixture() {
  let clock = 1000;
  const lines = [];
  const report = createSourceProviderReporter({
    now: () => clock,
    log: (line) => lines.push(line),
  });
  return {
    probe: createSourceStorageProbe({ report, now: () => clock }),
    advance: (milliseconds) => {
      clock += milliseconds;
    },
    lines,
    records: () => lines.map((line) => JSON.parse(line.slice("[source-provider] ".length))),
  };
}

test("R2 probe reports static error code without raw provider content or credentials", async () => {
  const f = fixture();
  let calls = 0;
  await f.probe({
    error: badHead,
    settings,
    environment,
    read: async (signal) => {
      calls++;
      assert.ok(signal instanceof AbortSignal);
      throw Object.assign(new Error(canary), {
        name: "AuthorizationHeaderMalformed",
        requestId: canary,
        $metadata: { httpStatusCode: 400, requestId: canary },
        request: { headers: { authorization: canary }, path: canary },
      });
    },
  });
  assert.equal(calls, 1);
  assert.deepEqual(f.records(), [
    { stage: "storage_config", category: "format_valid" },
    { stage: "storage_probe", category: "AuthorizationHeaderMalformed", status: 400 },
  ]);
  for (const value of [canary, settings.accessKey, settings.secretKey, settings.endpoint])
    assert.ok(!f.lines.join("\n").includes(value));
});

test("malformed R2 fields are identified by static labels and skip the extra request", async () => {
  for (const [field, value, category] of [
    ["accessKey", `SOURCE_S3_ACCESS_KEY_ID=${settings.accessKey}`, "access_key_format"],
    ["accessKey", `"${settings.accessKey}"`, "access_key_format"],
    ["secretKey", "raw-api-token-instead-of-s3-secret", "secret_key_format"],
    ["endpoint", settings.endpoint + "/bucket", "endpoint_format"],
    ["endpoint", `https://abc.r2.cloudflarestorage.com`, "endpoint_format"],
    ["region", '"auto"', "region_format"],
  ]) {
    const f = fixture();
    let calls = 0;
    await f.probe({
      error: badHead,
      settings: { ...settings, [field]: value },
      environment,
      read: async () => {
        calls++;
        return "object_found";
      },
    });
    assert.equal(calls, 0);
    assert.deepEqual(f.records(), [{ stage: "storage_config", category }]);
  }
});

test("no probes run for development, preview, non-400 failures or other S3 providers", async () => {
  const f = fixture();
  let calls = 0;
  const base = {
    error: badHead,
    settings,
    environment,
    read: async () => {
      calls++;
      return "object_found";
    },
  };
  for (const change of [
    { environment: { nodeEnv: "development" } },
    { environment: { nodeEnv: "production", vercelEnv: "preview" } },
    ...[200, 401, 403, 404, 500, "400"].map((status) => ({
      error: { $metadata: { httpStatusCode: status } },
    })),
    { settings: { ...settings, endpoint: undefined } },
    { settings: { ...settings, endpoint: "https://s3.example.invalid" } },
    { settings: { ...settings, endpoint: settings.endpoint + ".example.invalid" } },
  ])
    await f.probe({ ...base, ...change });
  assert.equal(calls, 0);
  assert.equal(f.lines.length, 0);
});

test("concurrent failures reserve one probe per minute before making a request", async () => {
  const f = fixture();
  let calls = 0;
  let finish;
  const pending = new Promise((resolve) => {
    finish = resolve;
  });
  const base = {
    error: badHead,
    settings,
    environment,
    read: async () => {
      calls++;
      await pending;
      return "object_found";
    },
  };
  const first = f.probe(base);
  await Promise.all(Array.from({ length: 20 }, () => f.probe(base)));
  assert.equal(calls, 1);
  finish();
  await first;
  f.advance(59_999);
  await f.probe(base);
  assert.equal(calls, 1);
  f.advance(1);
  await f.probe(base);
  assert.equal(calls, 2);
});

test("found/missing results and unknown errors expose no object details", async () => {
  for (const name of ["object_found", "object_missing"]) {
    const f = fixture();
    const result = await f.probe({ error: badHead, settings, environment, read: async () => name });
    assert.equal(result, undefined);
    assert.deepEqual(f.records().at(-1), { stage: "storage_probe", category: name, status: 200 });
  }
  const f = fixture();
  await f.probe({
    error: badHead,
    settings,
    environment,
    read: async () => {
      throw Object.assign(new Error(canary), { name: canary, $metadata: { httpStatusCode: 400 } });
    },
  });
  assert.deepEqual(f.records().at(-1), {
    stage: "storage_probe",
    category: "unexpected",
    status: 400,
  });
  assert.ok(!f.lines.join("\n").includes(canary));
});

test("logger/getter failures cannot replace the original checkout error", async () => {
  const probe = createSourceStorageProbe({
    report: () => {
      throw new Error(canary);
    },
  });
  const base = {
    error: badHead,
    settings,
    environment,
    read: async () => {
      throw new Error("must not run");
    },
  };
  await assert.doesNotReject(probe(base));
  await assert.doesNotReject(
    probe({
      ...base,
      error: {
        get $metadata() {
          throw new Error(canary);
        },
      },
    }),
  );
});
