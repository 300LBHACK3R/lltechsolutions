import assert from "node:assert/strict";
import { after, mock, test } from "node:test";
import { registerHooks } from "node:module";

const state = { calls: [], result: { data: { id: "accepted-test-message" }, error: null } };
globalThis.contactDeliveryFixture = state;
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "resend") return { url: "contact-fixture:resend", shortCircuit: true };
    if (specifier.startsWith("@/lib/"))
      return nextResolve(
        new URL(`../src/lib/${specifier.slice(6)}.ts`, import.meta.url).href,
        context,
      );
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url === "contact-fixture:resend")
      return {
        format: "module",
        source: `const state = globalThis.contactDeliveryFixture;
          export class Resend {
            emails = { send: async (payload) => {
              state.calls.push(payload);
              if (state.result instanceof Error) throw state.result;
              return state.result;
            } };
          }`,
        shortCircuit: true,
      };
    return nextLoad(url, context);
  },
});
let POST;
try {
  ({ POST } = await import("../src/app/api/contact/route.ts"));
} finally {
  hooks.deregister();
  delete globalThis.contactDeliveryFixture;
}
const saved = { ...process.env };
process.env.RESEND_API_KEY = "re_fixture";
process.env.CONTACT_FROM_EMAIL = "website@example.invalid";
process.env.CONTACT_TO_EMAIL = "owner@example.invalid";
mock.method(console, "error", () => {});
after(() => {
  for (const key of ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"]) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

let client = 0;
function request(extra = {}) {
  return new Request("https://lltechsolutions.ca/api/contact", {
    method: "POST",
    headers: {
      Origin: "https://lltechsolutions.ca",
      "Content-Type": "application/json",
      "x-forwarded-for": `192.0.2.${++client}`,
    },
    body: JSON.stringify({
      name: "Local test",
      email: "buyer@example.invalid",
      service: "Website Design & Development",
      timeline: "This month",
      message: "Local fixture only — no external delivery.",
      ...extra,
    }),
  });
}

test("contact delivery routes to the owner and confirms only provider-accepted sends", async () => {
  const response = await POST(request({ to: "untrusted@example.invalid" }));
  assert.equal(response.status, 200);
  assert.equal(state.calls.at(-1).to, "owner@example.invalid");
  assert.equal(state.calls.at(-1).replyTo, "buyer@example.invalid");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.ok((await response.json()).requestId);
});

test("rejected, ambiguous and failed sends retain an error instead of claiming delivery", async () => {
  for (const result of [
    { data: null, error: { message: "private provider detail" } },
    { data: null, error: null },
    new Error("private provider detail"),
  ]) {
    state.result = result;
    const response = await POST(request());
    assert.equal(response.status, 502);
    const body = await response.text();
    assert.match(body, /Your details are still in the form/u);
    assert.ok(!body.includes("private provider detail"));
  }
});

test("honeypot and invalid submissions never reach the mail provider", async () => {
  const before = state.calls.length;
  assert.equal((await POST(request({ companyWebsite: "bot" }))).status, 200);
  assert.equal((await POST(request({ email: "invalid" }))).status, 400);
  assert.equal(state.calls.length, before);
});
