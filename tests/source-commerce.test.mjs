import test from "node:test";
import assert from "node:assert/strict";
import Stripe from "stripe";
import {
  SOURCE_LICENSE_VERSION,
  SOURCE_ACCESS_SECONDS,
  SourceCommerceError,
  parseSourceCheckout,
  sourcePurchaseMetadata,
  verifySourcePayment,
  createSourceDownloadToken,
  readSourceDownloadToken,
  assertSourceTokenMatches,
  createSourceOwnership,
  verifySourceOwnership,
  sourceCookieName,
  fulfillSourceEmail,
  processSourceWebhookEvent,
  validSourcePackage,
  sourceEnvironmentAllowed,
} from "../src/lib/source-commerce-core.ts";
import { verifySourceWebhookSignature } from "../src/lib/source-commerce-webhook.ts";

const secret = "test-signing-secret-DO-NOT-USE-IN-PRODUCTION";
const now = 1790900000;
const archive = {
  designId: "pigment",
  version: "v1",
  filename: "pigment.zip",
  sha256: "a".repeat(64),
  bytes: 1234,
  sourceCommit: "b".repeat(40),
  key: `source-packages/pigment/${"a".repeat(64)}/pigment.zip`,
};
const product = { designId: "pigment", name: "Painting Company", priceCad: 99 };
const options = {
  secret,
  origin: "https://lltechsolutions.ca",
  live: false,
  packages: [archive],
  now,
};
const sessionId = `cs_test_${"a".repeat(32)}`;

test("public production accepts live mode only, and test-card source delivery is local-development only", () => {
  const production = {
    origin: "https://lltechsolutions.ca",
    stripeKey: "sk_live_testfixture",
    nodeEnv: "production",
    vercelEnv: "production",
  };
  assert.equal(sourceEnvironmentAllowed(production), true);
  assert.equal(
    sourceEnvironmentAllowed({ ...production, stripeKey: "sk_test_testfixture" }),
    false,
  );
  assert.equal(sourceEnvironmentAllowed({ ...production, vercelEnv: "preview" }), false);
  assert.equal(
    sourceEnvironmentAllowed({ ...production, origin: "https://preview.vercel.app" }),
    false,
  );
  const local = {
    origin: "http://localhost:3000",
    stripeKey: "sk_test_testfixture",
    nodeEnv: "development",
  };
  assert.equal(sourceEnvironmentAllowed(local), true);
  assert.equal(sourceEnvironmentAllowed({ ...local, origin: "http://127.0.0.1:3000" }), true);
  assert.equal(sourceEnvironmentAllowed({ ...local, nodeEnv: "production" }), false);
  assert.equal(
    sourceEnvironmentAllowed({
      ...local,
      stripeKey: "sk_live_testfixture",
      vercelEnv: "production",
    }),
    false,
  );
  assert.equal(
    sourceEnvironmentAllowed({ ...local, origin: "http://localhost:3000/attacker" }),
    false,
  );
});

function paidFixture() {
  const metadata = sourcePurchaseMetadata(product, archive, { ...options, nonce: "c".repeat(64) });
  const session = {
    id: sessionId,
    metadata,
    livemode: false,
    mode: "payment",
    status: "complete",
    payment_status: "paid",
    currency: "cad",
    amount_subtotal: 9900,
    amount_total: 10395,
    total_details: { amount_tax: 495, amount_discount: 0, amount_shipping: 0 },
    line_items: {
      has_more: false,
      data: [
        {
          quantity: 1,
          currency: "cad",
          amount_subtotal: 9900,
          amount_discount: 0,
          amount_total: 10395,
          price: { unit_amount: 9900, currency: "cad", tax_behavior: "exclusive" },
        },
      ],
    },
    payment_intent: "pi_test",
    customer_details: { email: "buyer@example.invalid" },
    created: now - 60,
  };
  const intent = {
    id: "pi_test",
    status: "succeeded",
    livemode: false,
    currency: "cad",
    amount: 10395,
    amount_received: 10395,
    latest_charge: {
      status: "succeeded",
      paid: true,
      captured: true,
      currency: "cad",
      amount: 10395,
      amount_captured: 10395,
      refunded: false,
      amount_refunded: 0,
      disputed: false,
    },
  };
  return { session, intent };
}

function grant() {
  const { session, intent } = paidFixture();
  return verifySourcePayment(session, intent, options);
}

test("source checkout accepts only product identity and explicit current licence consent", () => {
  const input = {
    designId: "pigment",
    licenseAccepted: true,
    licenseVersion: SOURCE_LICENSE_VERSION,
  };
  assert.equal(parseSourceCheckout(input), "pigment");
  for (const body of [
    null,
    [],
    "pigment",
    { ...input, price: 1 },
    { ...input, amount: 0 },
    { ...input, licenseAccepted: "true" },
    { ...input, licenseAccepted: false },
    { ...input, licenseVersion: "old" },
    { ...input, designId: "../private" },
  ])
    assert.throws(() => parseSourceCheckout(body));
});

test("immutable package keys cannot reference paths outside the product archive", () => {
  assert.equal(validSourcePackage(archive), true);
  for (const value of [
    { ...archive, key: "private/customer.csv" },
    { ...archive, filename: "../../x.zip" },
    { ...archive, sha256: "invalid" },
    { ...archive, bytes: 0 },
    { ...archive, sourceCommit: "short" },
  ])
    assert.equal(validSourcePackage(value), false);
});

test("paid purchase validates exact CAD subtotal plus tax and pinned immutable package", () => {
  const verified = grant();
  assert.equal(verified.priceCents, 9900);
  assert.equal(verified.package.key, archive.key);
  assert.equal(verified.expiresAt, now - 60 + SOURCE_ACCESS_SECONDS);
  // A later catalogue price is not consulted: original signed checkout price is authoritative.
  assert.equal(verified.name, product.name);
});

test("unpaid, incomplete and subscription sessions cannot obtain source files", () => {
  for (const mutation of [
    { payment_status: "unpaid" },
    { status: "open" },
    { mode: "subscription" },
  ]) {
    const { session, intent } = paidFixture();
    assert.throws(
      () => verifySourcePayment({ ...session, ...mutation }, intent, options),
      /payment_pending/,
    );
  }
});

test("tampered metadata cannot lower a price, swap an archive, product, origin or licence", () => {
  for (const [key, value] of [
    ["source_price_cents", "4900"],
    ["source_design", "earthworks"],
    ["source_sha256", "d".repeat(64)],
    ["source_version", "v2"],
    ["source_origin", "https://attacker.invalid"],
    ["source_license", "different"],
    ["source_name", "Different"],
    ["source_proof", "forged"],
  ]) {
    const { session, intent } = paidFixture();
    session.metadata[key] = value;
    assert.throws(() => verifySourcePayment(session, intent, options), /invalid_purchase_proof/);
  }
});

test("line count, quantities, currency, discounts and underpayment are rejected", () => {
  const mutations = [
    (s) => {
      s.line_items.has_more = true;
    },
    (s) => {
      s.line_items.data.push(s.line_items.data[0]);
    },
    (s) => {
      s.line_items.data[0].quantity = 2;
    },
    (s) => {
      s.line_items.data[0].price.unit_amount = 1;
    },
    (s) => {
      s.currency = "usd";
    },
    (s) => {
      s.amount_total = 1;
    },
    (s) => {
      s.total_details.amount_discount = 100;
    },
    (s) => {
      s.line_items.data[0].amount_discount = 100;
    },
    (s) => {
      s.total_details.amount_shipping = 100;
    },
    (s) => {
      s.total_details.amount_tax = -1;
    },
  ];
  for (const mutate of mutations) {
    const { session, intent } = paidFixture();
    mutate(session);
    assert.throws(() => verifySourcePayment(session, intent, options));
  }
});

test("an unrelated payment intent, uncaptured charge and incomplete receipt cannot authorize delivery", () => {
  for (const mutate of [
    (i) => {
      i.id = "pi_unrelated";
    },
    (i) => {
      i.status = "processing";
    },
    (i) => {
      i.amount_received = 1;
    },
    (i) => {
      i.latest_charge = "ch_unexpanded";
    },
    (i) => {
      i.latest_charge.captured = false;
    },
    (i) => {
      i.latest_charge.paid = false;
    },
    (i) => {
      i.latest_charge.amount_captured = 1;
    },
  ]) {
    const { session, intent } = paidFixture();
    mutate(intent);
    assert.throws(() => verifySourcePayment(session, intent, options));
  }
});

test("full refunds, partial refunds and current disputes revoke download access", () => {
  for (const mutation of [{ refunded: true }, { amount_refunded: 1 }, { disputed: true }]) {
    const { session, intent } = paidFixture();
    Object.assign(intent.latest_charge, mutation);
    assert.throws(() => verifySourcePayment(session, intent, options), /payment_reversed/);
  }
});

test("test and live environments cannot cross-authorize purchases", () => {
  const { session, intent } = paidFixture();
  assert.throws(
    () => verifySourcePayment({ ...session, livemode: true }, intent, options),
    /wrong_environment/,
  );
  assert.throws(
    () => verifySourcePayment(session, intent, { ...options, live: true }),
    /wrong_environment/,
  );
});

test("missing historical package and expired access fail closed", () => {
  const { session, intent } = paidFixture();
  assert.throws(
    () => verifySourcePayment(session, intent, { ...options, packages: [] }),
    /archive_unavailable/,
  );
  assert.throws(
    () => verifySourcePayment(session, intent, { ...options, now: now + SOURCE_ACCESS_SECONDS }),
    /access_expired/,
  );
});

test("download links are deterministic, expiring and contain no email or object key", () => {
  const purchase = grant();
  const token = createSourceDownloadToken(purchase, secret);
  assert.equal(token, createSourceDownloadToken(purchase, secret));
  const decoded = readSourceDownloadToken(token, secret, now);
  assertSourceTokenMatches(decoded, purchase);
  assert.equal(JSON.stringify(decoded).includes("buyer@"), false);
  assert.equal(JSON.stringify(decoded).includes("source-packages/"), false);
  assert.throws(() => readSourceDownloadToken(token, secret, purchase.expiresAt), /expired/);
});

test("download signature tampering, alternate secrets, excess input and package swaps fail", () => {
  const purchase = grant();
  const token = createSourceDownloadToken(purchase, secret);
  for (const value of [
    token + "x",
    "fake.signature",
    token.split(".")[0] + ".forged",
    "x".repeat(1401),
  ])
    assert.throws(() => readSourceDownloadToken(value, secret, now));
  assert.throws(() =>
    readSourceDownloadToken(token, "different-secret-with-more-than-32-bytes", now),
  );
  assert.throws(() =>
    assertSourceTokenMatches(
      { ...readSourceDownloadToken(token, secret, now), sha256: "f".repeat(64) },
      purchase,
    ),
  );
});

test("checkout browser ownership is bound to a session and expires independently of email link", () => {
  const cookie = createSourceOwnership(sessionId, secret, now);
  assert.equal(verifySourceOwnership(sessionId, cookie, secret, now), true);
  assert.equal(verifySourceOwnership(`cs_test_${"z".repeat(32)}`, cookie, secret, now), false);
  assert.equal(verifySourceOwnership(sessionId, cookie + "forged", secret, now), false);
  assert.equal(verifySourceOwnership(sessionId, cookie, secret, now + 86400), false);
  assert.notEqual(sourceCookieName(sessionId), sourceCookieName(`cs_test_${"z".repeat(32)}`));
});

function emailHarness(purchase = grant()) {
  const emails = new Map();
  const marks = [];
  let deliveries = 0;
  const dependencies = {
    ...options,
    mark: async (_id, metadata) => {
      marks.push(metadata);
      Object.assign(purchase.metadata, metadata);
    },
    send: async (message, key) => {
      if (!emails.has(key)) {
        deliveries++;
        emails.set(key, JSON.stringify(message));
      } else assert.equal(emails.get(key), JSON.stringify(message));
      return "email-accepted-id";
    },
  };
  return { purchase, dependencies, marks, emails, deliveries: () => deliveries };
}

test("source HTML delivers the exact signed link and expiry from its plain-text fallback", async () => {
  for (const origin of ["https://lltechsolutions.ca", "http://localhost:3000"]) {
    const h = emailHarness();
    await fulfillSourceEmail(h.purchase, { ...h.dependencies, origin });
    const message = JSON.parse([...h.emails.values()][0]);
    const textUrl = message.text.match(/Download your ZIP: (\S+)/)[1];
    const htmlUrl = message.html.match(/<a href="([^"]+)"/)[1].replaceAll("&amp;", "&");
    assert.equal(htmlUrl, textUrl);
    const url = new URL(htmlUrl);
    assert.equal(url.origin, origin);
    const token = readSourceDownloadToken(url.searchParams.get("token"), secret, now);
    assertSourceTokenMatches(token, h.purchase);
    assert.ok(
      message.html.includes(new Date(h.purchase.expiresAt * 1000).toISOString().slice(0, 10)),
    );
    assert.ok(message.html.includes(h.purchase.package.sha256));
    assert.ok(message.text.includes("hosting, paid providers and maintenance are separate"));
    // Private grants stay on the button, never as a long visible URL or remote image.
    assert.ok(!message.html.replace(/<[^>]+>/g, "").includes(url.searchParams.get("token")));
    assert.doesNotMatch(message.html, /<(?:img|script|iframe|form)\b/i);
    assert.ok(Buffer.byteLength(message.html) < 30_000);
  }
});

test("source HTML treats design and package labels as text without altering the grant", async () => {
  const purchase = grant();
  purchase.name = 'Paint <img src=x onerror="alert(1)"> & Co';
  const h = emailHarness(purchase);
  await fulfillSourceEmail(purchase, h.dependencies);
  const message = JSON.parse([...h.emails.values()][0]);
  assert.ok(message.html.includes("Paint &lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; Co"));
  assert.doesNotMatch(message.html, /<img\b/i);
  assert.ok(message.text.includes(purchase.name));
});

test("duplicate and concurrent fulfilment use a stable idempotency key and durable sent marker", async () => {
  const h = emailHarness();
  await Promise.all([
    fulfillSourceEmail(h.purchase, h.dependencies),
    fulfillSourceEmail(h.purchase, h.dependencies),
  ]);
  await fulfillSourceEmail(h.purchase, h.dependencies);
  assert.equal(h.deliveries(), 1);
  assert.equal(h.purchase.metadata.source_email_delivered, "email-accepted-id");
  assert.equal([...h.emails.keys()][0], `source-delivery-v1/${sessionId}`);
});

test("a failed marker write sends nothing; a provider error does not mark delivery successful", async () => {
  const h = emailHarness();
  await assert.rejects(
    fulfillSourceEmail(h.purchase, {
      ...h.dependencies,
      mark: async () => {
        throw Error("Stripe unavailable");
      },
    }),
  );
  assert.equal(h.deliveries(), 0);
  await assert.rejects(
    fulfillSourceEmail(h.purchase, {
      ...h.dependencies,
      send: async () => {
        throw Error("Resend unavailable");
      },
    }),
  );
  assert.equal(h.purchase.metadata.source_email_delivered, undefined);
  assert.equal(h.purchase.metadata.source_email_attempted_at, String(now));
});

test("uncertain delivery retries use identical content; older-than-23-hour uncertainty requires reconciliation", async () => {
  const h = emailHarness();
  let failMarker = true;
  const dependencies = {
    ...h.dependencies,
    mark: async (id, metadata) => {
      if (metadata.source_email_delivered && failMarker) throw Error("Stripe marker write failed");
      await h.dependencies.mark(id, metadata);
    },
  };
  await assert.rejects(fulfillSourceEmail(h.purchase, dependencies));
  assert.equal(h.deliveries(), 1);
  failMarker = false;
  await fulfillSourceEmail(h.purchase, { ...dependencies, now: now + 60 });
  assert.equal(h.deliveries(), 1);
  const uncertain = grant();
  uncertain.metadata.source_email_attempted_at = String(now - 23 * 3600);
  await assert.rejects(
    fulfillSourceEmail(uncertain, h.dependencies),
    /email_reconciliation_required/,
  );
  assert.equal(h.deliveries(), 1);
});

test("Stripe webhook requires the original signed body and a recent valid signature", () => {
  const body = JSON.stringify({
    id: "evt_test",
    type: "checkout.session.completed",
    livemode: false,
    data: { object: { id: sessionId } },
  });
  const webhookSecret = "whsec_test_only";
  const header = Stripe.webhooks.generateTestHeaderString({ payload: body, secret: webhookSecret });
  assert.equal(verifySourceWebhookSignature(body, header, webhookSecret).id, "evt_test");
  assert.throws(() => verifySourceWebhookSignature(body + " ", header, webhookSecret));
  assert.throws(() => verifySourceWebhookSignature(body, header, "whsec_wrong"));
  assert.throws(() => verifySourceWebhookSignature(body, null, webhookSecret));
  const stale = Stripe.webhooks.generateTestHeaderString({
    payload: body,
    secret: webhookSecret,
    timestamp: Math.floor(Date.now() / 1000) - 600,
  });
  assert.throws(() => verifySourceWebhookSignature(body, stale, webhookSecret));
});

test("webhook reloads current payment state and duplicates do not resend completed orders", async () => {
  const h = emailHarness();
  let reloads = 0;
  const event = {
    livemode: false,
    type: "checkout.session.completed",
    data: { object: { id: sessionId, metadata: { source_kind: "landl-source-v1" } } },
  };
  const dependencies = {
    load: async () => {
      reloads++;
      return h.purchase;
    },
    deliver: (value) => fulfillSourceEmail(value, h.dependencies),
  };
  await processSourceWebhookEvent(event, false, dependencies);
  await processSourceWebhookEvent(event, false, dependencies);
  assert.equal(reloads, 2);
  assert.equal(h.deliveries(), 1);
  assert.equal(
    await processSourceWebhookEvent(event, false, {
      ...dependencies,
      load: async () => {
        throw new SourceCommerceError("payment_reversed");
      },
    }),
    false,
  );
  assert.equal(h.deliveries(), 1);
  await assert.rejects(
    processSourceWebhookEvent(event, false, {
      ...dependencies,
      load: async () => {
        throw new SourceCommerceError("payment_pending", 409);
      },
    }),
  );
  assert.equal(h.deliveries(), 1);
});

test("unrelated webhook events are ignored; wrong environment and provider failures are retryable errors", async () => {
  const h = emailHarness();
  const event = {
    livemode: false,
    type: "checkout.session.completed",
    data: { object: { id: sessionId, metadata: { source_kind: "landl-source-v1" } } },
  };
  const dependencies = {
    load: async () => h.purchase,
    deliver: async () => {
      throw Error("Email unavailable");
    },
  };
  assert.equal(
    await processSourceWebhookEvent({ ...event, type: "invoice.paid" }, false, dependencies),
    false,
  );
  assert.equal(
    await processSourceWebhookEvent(
      { ...event, data: { object: { id: sessionId, metadata: {} } } },
      false,
      dependencies,
    ),
    false,
  );
  await assert.rejects(processSourceWebhookEvent(event, true, dependencies), /wrong_environment/);
  await assert.rejects(processSourceWebhookEvent(event, false, dependencies), /Email unavailable/);
});
