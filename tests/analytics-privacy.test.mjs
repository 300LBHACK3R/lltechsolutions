import assert from "node:assert/strict";
import test from "node:test";
import { filterAnalyticsEvent } from "../src/lib/analytics-privacy.ts";

test("analytics strips URL parameters and fragments without changing the original event", () => {
  const event = {
    type: "pageview",
    url: "https://lltechsolutions.ca/contact?email=private%40example.com&token=secret#details",
  };
  assert.deepEqual(filterAnalyticsEvent(event), {
    type: "pageview",
    url: "https://lltechsolutions.ca/contact",
  });
  assert.ok(event.url.includes("token=secret"));
});

test("both analytics event types exclude checkout results and private downloads", () => {
  for (const type of ["pageview", "vital"]) {
    for (const path of [
      "/source-purchase/success?session_id=cs_private",
      "/template-purchase/success?session_id=cs_private",
      "/api/source-purchases/download?token=private",
      "/api/template-purchases/checkout",
      "/source-purchase",
      "/%73ource-purchase/success",
    ]) {
      assert.equal(filterAnalyticsEvent({ type, url: `https://lltechsolutions.ca${path}` }), null);
    }
  }
});

test("public template performance keeps its route grouping", () => {
  assert.deepEqual(
    filterAnalyticsEvent({
      type: "vital",
      route: "/website-collection/[design]",
      url: "https://lltechsolutions.ca/website-collection/pigment?ref=facebook#preview",
    }),
    {
      type: "vital",
      route: "/website-collection/[design]",
      url: "https://lltechsolutions.ca/website-collection/pigment",
    },
  );
});

test("unparseable URLs are dropped instead of sent unfiltered", () => {
  for (const url of ["invalid", "javascript:alert(1)", "https://example.com/%zz"]) {
    assert.equal(filterAnalyticsEvent({ type: "pageview", url }), null);
  }
});
