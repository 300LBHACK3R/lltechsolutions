import test from "node:test";
import assert from "node:assert/strict";
import { renderPurchaseEmail } from "../src/lib/purchase-email.ts";

const email = {
  preview: "Purchase confirmed",
  eyebrow: "Your source purchase",
  title: "Thank you.",
  design: "Painting Company",
  introduction: "Your files are ready.",
  action: {
    label: "Download your source ZIP",
    url: "https://lltechsolutions.ca/api/source-purchases/download?token=test&mode=fixture",
  },
  actionNote: "Keep the download link private.",
  sections: [],
  supportEmail: "owner@example.invalid",
  footer: "Your purchase record",
};

test("email actions reject unsafe schemes, external hosts and embedded credentials", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,test",
    "https://example.invalid/file.zip",
    "https://lltechsolutions.ca.example.invalid/file.zip",
    "https://user:password@lltechsolutions.ca/file.zip",
    "https://lltechsolutions.ca/\nfile.zip",
  ]) {
    assert.throws(() => renderPurchaseEmail({ ...email, action: { ...email.action, url } }));
  }
  const html = renderPurchaseEmail(email);
  assert.ok(
    html.includes(
      'href="https://lltechsolutions.ca/api/source-purchases/download?token=test&amp;mode=fixture"',
    ),
  );
});

test("email renderer escapes attributes and presentation text without loading remote assets", () => {
  const hostile = '\"><script>alert("test")</script>&';
  const html = renderPurchaseEmail({
    ...email,
    preview: hostile,
    eyebrow: hostile,
    title: hostile,
    design: hostile,
    introduction: hostile,
    actionNote: hostile,
    footer: hostile,
    action: { ...email.action, label: hostile },
    sections: [
      {
        title: hostile,
        details: [{ label: hostile, value: hostile }],
        steps: [{ title: hostile, text: hostile }],
        paragraphs: [hostile],
      },
    ],
  });
  assert.doesNotMatch(html, /<(?:script|img|iframe|form)\b/i);
  assert.ok(html.includes("&quot;&gt;&lt;script&gt;alert(&quot;test&quot;)&lt;/script&gt;&amp;"));
  assert.doesNotMatch(html, /<(?:link|style)\b|url\(/i);
});
