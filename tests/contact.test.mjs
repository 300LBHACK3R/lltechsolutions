import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, serviceOptions, timelineOptions } from "../src/lib/contact-validation.ts";
import {
  hasTrustedOrigin,
  readLimitedJson,
  MAX_BODY_BYTES,
  isRateLimited,
} from "../src/lib/contact-security.ts";

const valid = {
  name: "Test Person",
  business: "Example",
  email: "test@example.com",
  website: "example.ca",
  service: serviceOptions[0],
  timeline: timelineOptions[0],
  message: "Please discuss a website project.",
};
test("valid inquiry normalizes whitespace and a bare domain", () => {
  const result = validateContact({ ...valid, name: "  Test Person  " });
  assert.equal(result.ok, true);
  assert.equal(result.value.website, "https://example.ca/");
  assert.equal(result.value.name, "Test Person");
});
test("rejects non-object bodies, invalid field types, oversized details and unknown options", () => {
  for (const input of [
    null,
    [],
    "text",
    { ...valid, name: 42 },
    { ...valid, message: "x".repeat(5001) },
    { ...valid, service: "Remote IT" },
    { ...valid, timeline: "Yesterday" },
    { ...valid, email: "a@b.com\nBcc:other@example.com" },
  ])
    assert.equal(validateContact(input).ok, false);
});
test("rejects unsafe URL schemes and credentials without fetching URLs", () => {
  for (const website of [
    "javascript:alert(1)",
    "ftp://example.ca",
    "https://user:password@example.ca",
    "http://",
  ])
    assert.equal(validateContact({ ...valid, website }).ok, false);
});
test("honeypot is detected separately from valid user inquiries", () => {
  assert.equal(validateContact({ companyWebsite: "spam" }).spam, true);
  assert.equal(validateContact(valid).spam, false);
});
test("requires exact same origin and rejects cross-site metadata", () => {
  const req = (headers) => new Request("https://lltechsolutions.ca/api/contact", { headers });
  assert.equal(
    hasTrustedOrigin(
      req({ origin: "https://lltechsolutions.ca", "sec-fetch-site": "same-origin" }),
    ),
    true,
  );
  assert.equal(
    hasTrustedOrigin(req({ origin: "https://lltechsolutions.ca.attacker.example" })),
    false,
  );
  assert.equal(
    hasTrustedOrigin(req({ origin: "https://lltechsolutions.ca", "sec-fetch-site": "cross-site" })),
    false,
  );
  assert.equal(hasTrustedOrigin(req({})), false);
});
test("limits chunked bodies even without Content-Length", async () => {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(MAX_BODY_BYTES));
      controller.enqueue(new Uint8Array(1));
      controller.close();
    },
  });
  const request = new Request("https://example.com", {
    method: "POST",
    body: stream,
    duplex: "half",
  });
  await assert.rejects(readLimitedJson(request), RangeError);
  await assert.rejects(
    readLimitedJson(new Request("https://example.com", { method: "POST", body: "{broken" })),
    SyntaxError,
  );
});
test("rate limit expires and does not share a counter across independent client addresses", () => {
  const req = (ip) =>
    new Request("https://example.com", { headers: { "x-vercel-forwarded-for": ip } });
  for (let i = 0; i < 5; i++) assert.equal(isRateLimited(req("192.0.2.1"), 1000), false);
  assert.equal(isRateLimited(req("192.0.2.1"), 1000), true);
  assert.equal(isRateLimited(req("192.0.2.2"), 1000), false);
  assert.equal(isRateLimited(req("192.0.2.1"), 601001), false);
});

test("same-origin comparison handles Next's internal URL normalization", () => {
  const request = new Request("http://localhost:3198/api/contact", {
    headers: { host: "127.0.0.1:3198", origin: "http://127.0.0.1:3198" },
  });
  assert.equal(hasTrustedOrigin(request), true);
  const wrong = new Request("https://internal.example/api/contact", {
    headers: { host: "lltechsolutions.ca", origin: "https://attacker.example" },
  });
  assert.equal(hasTrustedOrigin(wrong), false);
});
