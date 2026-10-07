import test from "node:test";
import assert from "node:assert/strict";
import Stripe from "stripe";
import {
  parseManagedCheckout,
  assertManagedPrice,
  managedPurchaseMetadata,
  verifyManagedPayment,
  managedEmailContent,
  fulfillManagedEmail,
  processManagedWebhookEvent,
  verifyManagedWebhookSignature,
  ManagedCommerceError,
  managedCookieName,
  managedScopeExclusions,
} from "../src/lib/managed-commerce-core.ts";
import {
  availableDesigns,
  templatePrice,
  contactScopeDetails,
} from "../src/data/website-collection.ts";
import { templateManagedOffer } from "../src/data/template-purchase.ts";
import { managedTermsVersion } from "../src/data/managed-purchase.ts";
import {
  sourceCookieName,
  createSourceOwnership,
  verifySourceOwnership,
} from "../src/lib/source-commerce-core.ts";

const secret = "test-managed-signing-key-do-not-use-for-production";
const options = { origin: "https://lltechsolutions.ca", live: false, secret };
const sessionId = `cs_test_${"a".repeat(32)}`;
const now = 1790900000;
function input(extra = {}) {
  return {
    designId: "pigment",
    name: "Buyer Person",
    email: "business@example.invalid",
    phone: "",
    businessName: "Sample Painting",
    location: "Calgary, AB",
    website: "",
    services: "Interior painting",
    message: "",
    mediaHelp: false,
    scopeAccepted: true,
    termsVersion: managedTermsVersion,
    requestId: "1beff394-d899-4d28-9bf8-da6c6066bc08",
    expectedPriceCad: 319.2,
    ...extra,
  };
}
function quote(extra = {}) {
  return {
    designId: "pigment",
    name: "Painting Company",
    priceCents: 31920,
    regularCents: 39900,
    pages: 4,
    contactScope: contactScopeDetails.direct.description,
    inclusions: templateManagedOffer.summary,
    exclusions: managedScopeExclusions,
    included: "Home, Services, Projects and Contact\nSupplied images and branding",
    ...extra,
  };
}
function paidFixture(extraBrief = {}, extraQuote = {}) {
  const brief = parseManagedCheckout(input(extraBrief));
  const metadata = managedPurchaseMetadata(brief, quote(extraQuote), options);
  const session = {
    id: sessionId,
    metadata,
    livemode: false,
    mode: "payment",
    status: "complete",
    payment_status: "paid",
    currency: "cad",
    amount_subtotal: 31920,
    amount_total: 33516,
    total_details: { amount_tax: 1596, amount_discount: 0, amount_shipping: 0 },
    line_items: {
      has_more: false,
      data: [
        {
          quantity: 1,
          currency: "cad",
          amount_subtotal: 31920,
          amount_discount: 0,
          amount_total: 33516,
          price: { currency: "cad", unit_amount: 31920, tax_behavior: "exclusive" },
        },
      ],
    },
    payment_intent: "pi_fixture",
    customer_details: { email: "payer@example.invalid" },
    created: now - 60,
  };
  const intent = {
    id: "pi_fixture",
    livemode: false,
    status: "succeeded",
    currency: "cad",
    amount: 33516,
    amount_received: 33516,
    latest_charge: {
      payment_intent: "pi_fixture",
      status: "succeeded",
      paid: true,
      captured: true,
      currency: "cad",
      amount: 33516,
      amount_captured: 33516,
      refunded: false,
      amount_refunded: 0,
      disputed: false,
    },
  };
  return { session, intent };
}
function grant(extraBrief) {
  const { session, intent } = paidFixture(extraBrief);
  return verifyManagedPayment(session, intent, options);
}

test("managed checkout normalizes the business brief and requires exact current consent", () => {
  const brief = parseManagedCheckout(
    input({ name: "  Buyer  Person ", website: "example.com", services: "Painting\n & prep" }),
  );
  assert.equal(brief.name, "Buyer Person");
  assert.equal(brief.website, "https://example.com/");
  assert.equal(brief.services, "Painting & prep");
  for (const invalid of [
    null,
    [],
    "bad",
    input({ businessName: " " }),
    input({ name: 4 }),
    input({ services: "x".repeat(501) }),
    input({ message: "x".repeat(1501) }),
    input({ email: "bad" }),
    input({ email: "a@b.ca\nInjected:yes" }),
    input({ scopeAccepted: false }),
    input({ termsVersion: "old" }),
    input({ mediaHelp: "yes" }),
    input({ requestId: "guessable" }),
    input({ ownerEmail: "attacker@example.invalid" }),
    input({ amount: 1 }),
    input({ website: "javascript:alert(1)" }),
    input({ website: "https://user:password@example.com" }),
    input({ name: "Bad\u0000name" }),
  ]) {
    assert.throws(() => parseManagedCheckout(invalid));
  }
});

test("42 fixed-scope offers fit signed metadata limits; three client references remain quote-first", () => {
  assert.equal(availableDesigns().length, 45);
  for (const date of [Date.parse("2026-10-02T00:00:00Z"), Date.parse("2027-01-01T07:00:00Z")]) {
    assert.equal(availableDesigns().filter((design) => design.pageCount !== null).length, 42);
    assert.deepEqual(
      availableDesigns()
        .filter((design) => design.pageCount === null)
        .map((design) => design.id)
        .sort(),
      ["crestline", "mckenzie-house", "tow-n-go"],
    );
    for (const design of availableDesigns().filter((design) => design.pageCount !== null)) {
      const priceCad = templatePrice(design.startingPriceCad, date).priceCad;
      const brief = parseManagedCheckout(
        input({ designId: design.id, expectedPriceCad: priceCad }),
      );
      const snapshot = quote({
        designId: design.id,
        name: design.name,
        priceCents: Math.round(priceCad * 100),
        regularCents: Math.round(design.startingPriceCad * 100),
        pages: design.pageCount,
        contactScope: contactScopeDetails[design.contactMode].description,
        included: design.included.join("\n"),
      });
      const metadata = managedPurchaseMetadata(brief, snapshot, options);
      assert.ok(Object.keys(metadata).length + 4 <= 50);
      assert.ok(
        Object.entries(metadata).every(([key, value]) => key.length <= 40 && value.length <= 500),
      );
    }
  }
});

test("a client supplied amount is comparison-only and a stale or altered amount is rejected", () => {
  assertManagedPrice(319.2, 31920);
  for (const amount of [0, 1, 319.21, 319.199, 399, NaN, Infinity])
    assert.throws(() => assertManagedPrice(amount, 31920), /price_changed/);
  assert.throws(() => assertManagedPrice(1, 100), /invalid_price/);
});

test("signed business fields, selected scope and price cannot be changed before notification", () => {
  for (const [key, value] of [
    ["managed_price", "15000"],
    ["managed_design", "medical-spa"],
    ["managed_pages", "7"],
    ["managed_contact", "Advanced portal"],
    ["managed_included_1", "Free videography"],
    ["brief_email", "attacker@example.invalid"],
    ["brief_business", "Other company"],
    ["brief_media", "true"],
    ["managed_terms", "other"],
    ["managed_origin", "https://attacker.invalid"],
  ]) {
    const { session, intent } = paidFixture();
    session.metadata[key] = value;
    assert.throws(() => verifyManagedPayment(session, intent, options), /invalid_purchase_proof/);
  }
});

test("Stripe omission of empty metadata preserves optional brief fields and the proof", () => {
  const { session, intent } = paidFixture();
  session.metadata = Object.fromEntries(
    Object.entries(session.metadata).filter(([, value]) => value !== ""),
  );
  const order = verifyManagedPayment(session, intent, options);
  assert.equal(order.brief.phone, "");
  assert.equal(order.brief.message, "");
  assert.equal(order.quote.included, quote().included);
});

test("long Unicode notes stay intact and never split a surrogate pair in metadata", () => {
  const message = "x".repeat(499) + "🎨" + "y".repeat(499) + "🚀" + "z".repeat(498);
  assert.equal(message.length, 1500);
  const { session, intent } = paidFixture({ message });
  for (const [key, value] of Object.entries(session.metadata)) {
    if (key.startsWith("brief_message"))
      assert.ok(!/[\uD800-\uDBFF]$|^[\uDC00-\uDFFF]/.test(value));
  }
  assert.equal(verifyManagedPayment(session, intent, options).brief.message, message);
});

test("paid order retains its purchased scope and historical consent version", () => {
  const { session, intent } = paidFixture();
  const brief = { ...parseManagedCheckout(input()), termsVersion: "2026-09-01" };
  session.metadata = managedPurchaseMetadata(
    brief,
    quote({ included: "Previously agreed pages and inclusions" }),
    options,
  );
  const order = verifyManagedPayment(session, intent, options);
  assert.equal(order.brief.termsVersion, "2026-09-01");
  assert.equal(order.quote.included, "Previously agreed pages and inclusions");
  assert.equal(order.quote.priceCents, 31920);
  assert.equal(order.email, "payer@example.invalid");
  assert.equal(order.brief.email, "business@example.invalid");
});

test("pending, incomplete, subscription and cross-environment orders cannot notify owners", () => {
  for (const patch of [
    { payment_status: "unpaid" },
    { status: "open" },
    { mode: "subscription" },
    { livemode: true },
  ]) {
    const { session, intent } = paidFixture();
    assert.throws(() => verifyManagedPayment({ ...session, ...patch }, intent, options));
  }
});

test("exact CAD item, quantity, subtotal, tax and captured total are required", () => {
  const mutations = [
    (s) => {
      s.currency = "usd";
    },
    (s) => {
      s.amount_total += 1;
    },
    (s) => {
      s.total_details.amount_tax = -1;
    },
    (s) => {
      s.total_details.amount_discount = 1;
    },
    (s) => {
      s.total_details.amount_shipping = 1;
    },
    (s) => {
      s.line_items.has_more = true;
    },
    (s) => {
      s.line_items.data[0].quantity = 2;
    },
    (s) => {
      s.line_items.data[0].price.unit_amount = 1;
    },
    (s) => {
      s.line_items.data[0].price.tax_behavior = "inclusive";
    },
    (s) => {
      s.line_items.data[0].amount_discount = 1;
    },
    (s) => {
      s.line_items.data.push(s.line_items.data[0]);
    },
  ];
  for (const mutate of mutations) {
    const { session, intent } = paidFixture();
    mutate(session);
    assert.throws(() => verifyManagedPayment(session, intent, options));
  }
});

test("current associated successful payment blocks swapped intents, partial refunds and disputes", () => {
  const mutations = [
    (p) => {
      p.id = "pi_other";
    },
    (p) => {
      p.status = "processing";
    },
    (p) => {
      p.amount_received -= 1;
    },
    (p) => {
      p.latest_charge = "ch_not_expanded";
    },
    (p) => {
      p.latest_charge.payment_intent = "pi_other";
    },
    (p) => {
      p.latest_charge.amount_refunded = 1;
    },
    (p) => {
      p.latest_charge.refunded = true;
    },
    (p) => {
      p.latest_charge.disputed = true;
    },
    (p) => {
      p.latest_charge.captured = false;
    },
    (p) => {
      p.latest_charge.amount_captured -= 1;
    },
  ];
  for (const mutate of mutations) {
    const { session, intent } = paidFixture();
    mutate(intent);
    assert.throws(() => verifyManagedPayment(session, intent, options));
  }
});

test("owner notification contains signed business/project details and optional media is quoted separately", () => {
  const order = grant({
    phone: "+1 403 555 0101",
    website: "example.com",
    message: "Use our gold branding.",
    mediaHelp: true,
  });
  const message = managedEmailContent(order, "owner", "owner@example.invalid");
  assert.equal(message.to, "owner@example.invalid");
  assert.equal(message.replyTo, "business@example.invalid");
  for (const value of [
    "Sample Painting",
    "Buyer Person",
    "+1 403 555 0101",
    "Calgary, AB",
    "Interior painting",
    "Use our gold branding.",
    "payer@example.invalid",
    "4",
    "$319.20 CAD",
    "$15.96 CAD",
    "$335.16 CAD",
    "discuss and quote separately; not included in this payment",
    "Home, Services, Projects and Contact",
  ])
    assert.ok(message.text.includes(value), value);
  const buyer = managedEmailContent(order, "buyer", "owner@example.invalid");
  assert.equal(buyer.to, "payer@example.invalid");
  assert.equal(buyer.replyTo, "owner@example.invalid");
  assert.ok(!buyer.text.includes(order.sessionId));
});

test("managed HTML preserves order scope, recipient separation and multiline business briefs", () => {
  const order = grant({ mediaHelp: true });
  // Exercise renderer input directly: checkout currently normalizes brief whitespace.
  order.brief.message = 'First line\nSecond line with <b>untrusted HTML</b> & "quotes".';
  const owner = managedEmailContent(order, "owner", "owner@example.invalid");
  const buyer = managedEmailContent(order, "buyer", "owner@example.invalid");
  assert.ok(
    owner.html.includes(
      "First line<br>Second line with &lt;b&gt;untrusted HTML&lt;/b&gt; &amp; &quot;quotes&quot;.",
    ),
  );
  assert.ok(owner.html.includes(order.sessionId));
  assert.ok(!buyer.html.includes(order.sessionId));
  assert.ok(!buyer.html.includes("First line"));
  assert.ok(owner.html.includes("mailto:business%40example.invalid?subject="));
  assert.ok(buyer.html.includes("mailto:owner%40example.invalid?subject="));
  for (const message of [owner, buyer]) {
    for (const value of [
      order.reference,
      "$319.20 CAD",
      "$399.00 CAD",
      "$15.96 CAD",
      "$335.16 CAD",
      "Home, Services, Projects and Contact<br>Supplied images and branding",
      "discuss and quote separately; not included in this payment",
    ])
      assert.ok(message.html.includes(value), value);
    assert.doesNotMatch(message.html, /<(?:img|script|iframe|form)\b/i);
    assert.ok(Buffer.byteLength(message.html) < 50_000);
  }
});

test("every dynamic managed HTML field is escaped while plain-text contents remain literal", () => {
  const order = grant();
  const hostile = "<svg onload=\"alert(1)\"> & 'not markup'";
  for (const key of [
    "name",
    "businessName",
    "location",
    "website",
    "services",
    "message",
    "phone",
    "termsVersion",
  ])
    order.brief[key] = hostile;
  for (const key of ["name", "contactScope", "inclusions", "exclusions", "included"])
    order.quote[key] = hostile;
  for (const role of ["owner", "buyer"]) {
    const message = managedEmailContent(order, role, "owner@example.invalid");
    assert.ok(
      message.html.includes("&lt;svg onload=&quot;alert(1)&quot;&gt; &amp; &#39;not markup&#39;"),
    );
    assert.doesNotMatch(message.html, /<svg\b/i);
    assert.ok(message.text.includes(hostile));
  }
});

test("independent email markers allow buyer confirmation despite owner failure and then retry owner only", async () => {
  const order = grant();
  const sent = [];
  let ownerFails = true;
  const dependencies = {
    ownerEmail: "owner@example.invalid",
    now,
    mark: async (_, patch) => Object.assign(order.metadata, patch),
    send: async (message, key) => {
      if (message.to === "owner@example.invalid" && ownerFails) throw new Error("temporary");
      sent.push(key);
      return `email_${sent.length}`;
    },
  };
  const first = await Promise.allSettled([
    fulfillManagedEmail(order, "owner", dependencies),
    fulfillManagedEmail(order, "buyer", dependencies),
  ]);
  assert.equal(first[0].status, "rejected");
  assert.equal(first[1].status, "fulfilled");
  ownerFails = false;
  await fulfillManagedEmail(order, "owner", dependencies);
  await fulfillManagedEmail(order, "buyer", dependencies);
  assert.equal(sent.length, 2);
  assert.ok(sent[0].startsWith("managed-buyer-v1/"));
  assert.ok(sent[1].startsWith("managed-owner-v1/"));
});

test("overlapping webhook retries use the same idempotency key per email recipient", async () => {
  const sent = new Map();
  const dependencies = {
    ownerEmail: "owner@example.invalid",
    now,
    mark: async () => {},
    send: async (_, key) => {
      sent.set(key, "one-provider-email");
      return sent.get(key);
    },
  };
  await Promise.all([
    fulfillManagedEmail(grant(), "owner", dependencies),
    fulfillManagedEmail(grant(), "owner", dependencies),
  ]);
  assert.equal(sent.size, 1);
});

test("uncertain old email attempts require reconciliation while independently completed mail remains sent", async () => {
  const order = grant();
  order.metadata.managed_owner_attempted = String(now - 24 * 3600);
  order.metadata.managed_buyer_delivered = "existing-email";
  let calls = 0;
  const dependencies = {
    ownerEmail: "owner@example.invalid",
    now,
    mark: async () => {
      calls++;
    },
    send: async () => {
      calls++;
      return "new-email";
    },
  };
  await assert.rejects(
    fulfillManagedEmail(order, "owner", dependencies),
    /email_reconciliation_required/,
  );
  assert.equal(await fulfillManagedEmail(order, "buyer", dependencies), "sent");
  assert.equal(calls, 0);
});

test("a delivery-marker write failure retains its same recipient idempotency key on retry", async () => {
  const order = grant();
  const keys = [];
  let fail = true;
  const dependencies = {
    ownerEmail: "owner@example.invalid",
    now,
    mark: async (_, patch) => {
      if (patch.managed_owner_delivered && fail) throw new Error("marker unavailable");
      Object.assign(order.metadata, patch);
    },
    send: async (_, key) => {
      keys.push(key);
      return "same-provider-email";
    },
  };
  await assert.rejects(fulfillManagedEmail(order, "owner", dependencies));
  fail = false;
  await fulfillManagedEmail(order, "owner", dependencies);
  assert.equal(keys.length, 2);
  assert.equal(keys[0], keys[1]);
});

test("raw signed webhook validation rejects changed bodies and missing or invalid signatures", () => {
  const body = JSON.stringify({
    id: "evt_fixture",
    object: "event",
    type: "checkout.session.completed",
    data: { object: { id: sessionId } },
  });
  const key = "whsec_managed_fixture_only";
  const signature = Stripe.webhooks.generateTestHeaderString({ payload: body, secret: key });
  assert.equal(verifyManagedWebhookSignature(body, signature, key).id, "evt_fixture");
  assert.throws(
    () => verifyManagedWebhookSignature(body + " ", signature, key),
    /invalid_signature/,
  );
  assert.throws(() => verifyManagedWebhookSignature(body, null, key), /invalid_signature/);
  assert.throws(
    () => verifyManagedWebhookSignature(body, signature, "whsec_wrong"),
    /invalid_signature/,
  );
});

test("webhooks ignore source orders before fulfilment and re-fetch managed payment before every delivery", async () => {
  const calls = [];
  const dependencies = {
    load: async (id) => {
      calls.push(`load:${id}`);
      return grant();
    },
    deliver: async () => {
      calls.push("deliver");
    },
  };
  const event = {
    type: "checkout.session.completed",
    livemode: false,
    data: { object: { id: sessionId, metadata: { managed_kind: "landl-managed-v1" } } },
  };
  assert.equal(
    await processManagedWebhookEvent(
      {
        ...event,
        livemode: true,
        data: { object: { id: sessionId, metadata: { source_kind: "landl-source-v1" } } },
      },
      false,
      dependencies,
    ),
    false,
  );
  assert.deepEqual(calls, []);
  assert.equal(await processManagedWebhookEvent(event, false, dependencies), true);
  assert.deepEqual(calls, [`load:${sessionId}`, "deliver"]);
  assert.equal(
    await processManagedWebhookEvent(event, false, {
      ...dependencies,
      load: async () => {
        throw new ManagedCommerceError("payment_reversed");
      },
    }),
    false,
  );
  await assert.rejects(
    processManagedWebhookEvent(event, false, {
      ...dependencies,
      load: async () => {
        throw new Error("provider down");
      },
    }),
  );
});

test("managed browser ownership is private, expires and cannot be reused for another order", () => {
  const other = `cs_test_${"b".repeat(32)}`;
  const token = createSourceOwnership(sessionId, secret, now);
  assert.equal(verifySourceOwnership(sessionId, token, secret, now), true);
  assert.equal(verifySourceOwnership(other, token, secret, now), false);
  assert.equal(verifySourceOwnership(sessionId, token, secret, now + 86401), false);
  assert.notEqual(managedCookieName(sessionId), sourceCookieName(sessionId));
});
