import assert from "node:assert/strict";
import test from "node:test";
import { stripeKeyMode, sourceEnvironmentAllowed } from "../src/lib/source-commerce-core.ts";
import { auditSourceFiles, textBytes } from "../scripts/lib/source-package-tools.mjs";

const production = {
  origin: "https://lltechsolutions.ca",
  nodeEnv: "production",
  vercelEnv: "production",
};
const local = { origin: "http://localhost:3000", nodeEnv: "development" };

for (const family of ["sk", "rk"]) {
  const liveKey = `${family}_live_testfixture`;
  const testKey = `${family}_test_testfixture`;

  test(`${family} live keys retain the production origin and deployment restrictions`, () => {
    assert.equal(stripeKeyMode(liveKey), "live");
    assert.equal(sourceEnvironmentAllowed({ ...production, stripeKey: liveKey }), true);
    for (const vercelEnv of [undefined, "", "preview", "development"]) {
      assert.equal(
        sourceEnvironmentAllowed({ ...production, stripeKey: liveKey, vercelEnv }),
        false,
      );
    }
    for (const origin of [
      "http://lltechsolutions.ca",
      "https://www.lltechsolutions.ca",
      "https://preview.vercel.app",
      "https://lltechsolutions.ca.attacker.invalid",
      "https://lltechsolutions.ca/",
      "https://lltechsolutions.ca/path",
      "https://lltechsolutions.ca?checkout=test",
      "https://lltechsolutions.ca#test",
      "https://user:password@lltechsolutions.ca",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ]) {
      assert.equal(
        sourceEnvironmentAllowed({ ...production, stripeKey: liveKey, origin }),
        false,
        origin,
      );
    }
  });

  test(`${family} test keys work only in local development, never hosted checkout`, () => {
    assert.equal(stripeKeyMode(testKey), "test");
    for (const origin of ["http://localhost:3000", "http://127.0.0.1:3000"]) {
      const settings = { ...local, stripeKey: testKey, origin };
      assert.equal(sourceEnvironmentAllowed(settings), true);
      assert.equal(sourceEnvironmentAllowed({ ...settings, nodeEnv: "production" }), false);
      for (const vercelEnv of ["production", "preview", "development"]) {
        assert.equal(sourceEnvironmentAllowed({ ...settings, vercelEnv }), false);
      }
    }
    assert.equal(sourceEnvironmentAllowed({ ...production, stripeKey: testKey }), false);
    for (const origin of [
      "https://preview.vercel.app",
      "http://localhost.attacker.invalid:3000",
      "https://localhost:3000",
      "http://localhost:3000/",
      "http://localhost:3000/path",
      "http://localhost:3000?x=1",
      "http://localhost:3000#fragment",
      "http://user:password@localhost:3000",
      "not a URL",
    ]) {
      assert.equal(sourceEnvironmentAllowed({ ...local, stripeKey: testKey, origin }), false);
    }
  });
}

test("malformed and publishable keys cannot authorize checkout in either environment", () => {
  for (const stripeKey of [
    "",
    "pk_live_testfixture",
    "pk_test_testfixture",
    "rk_live_",
    "sk_test_",
    "rk_sandbox_testfixture",
    "sk_live_rk_live_testfixture",
    "prefixrk_live_testfixture",
    "RK_live_testfixture",
    "rk_live_test-fixture",
    " rk_live_testfixture",
    "rk_live_testfixture ",
    "rk_live_testfixture\n",
    "rk_test_testfixture\r\n",
    "rk_live_testfixture\u0000",
  ]) {
    assert.equal(stripeKeyMode(stripeKey), null);
    assert.equal(sourceEnvironmentAllowed({ ...production, stripeKey }), false);
    assert.equal(sourceEnvironmentAllowed({ ...local, stripeKey }), false);
  }
});

test("customer archives reject all accepted Stripe server-key families and modes", () => {
  const files = new Map([
    ["package.json", textBytes(JSON.stringify({ scripts: { build: "next build" } }))],
    ["package-lock.json", textBytes("{}")],
    ["README.md", textBytes("Sample source")],
    ["LICENSE.txt", textBytes("One business website")],
    [".env.example", textBytes("STRIPE_SECRET_KEY=")],
  ]);
  assert.doesNotThrow(() => auditSourceFiles(files));
  for (const prefix of ["sk_live_", "sk_test_", "rk_live_", "rk_test_"]) {
    files.set("config.ts", textBytes(`export const credential = "${prefix}testfixture";`));
    assert.throws(() => auditSourceFiles(files), /Possible credential detected/);
  }
});
