import test from "node:test";
import assert from "node:assert/strict";
import {
  parseBrief,
  briefText,
  emptyBrief,
  briefFieldLimit,
} from "../src/data/collection-brief.ts";

test("saved content briefs tolerate unavailable, outdated or malformed browser data", () => {
  for (const value of [null, [], "text", { version: 2, values: {} }, { version: 1, values: [] }])
    assert.equal(parseBrief(value), null);
  const restored = parseBrief({
    version: 1,
    values: {
      businessName: "My Business",
      notes: "x".repeat(5000),
      unknown: "not included",
      imagery: { invalid: true },
    },
    help: ["brand", "brand", "unknown"],
  });
  assert.equal(restored.values.businessName, "My Business");
  assert.equal(restored.values.notes.length, briefFieldLimit);
  assert.ok(!("unknown" in restored.values) && !("imagery" in restored.values));
  assert.deepEqual(restored.help, ["brand"]);
});

test("content export preserves client notes and help requests without inventing missing content", () => {
  const draft = emptyBrief();
  draft.values.businessName = "Our Painting Company";
  draft.values.services = "Interior painting\nExterior painting";
  draft.help = ["brand"];
  const output = briefText(draft);
  assert.ok(
    output.includes("Our Painting Company") &&
      output.includes("Interior painting\nExterior painting"),
  );
  assert.ok(
    output.includes("I would like help with this section.") && output.includes("To discuss"),
  );
  assert.equal(draft.values.businessName, "Our Painting Company");
});
