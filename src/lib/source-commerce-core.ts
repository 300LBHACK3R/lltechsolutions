import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type Stripe from "stripe";
import { sourceLicenseVersion } from "../data/source-license.ts";

export const SOURCE_LICENSE_VERSION = sourceLicenseVersion;
export const SOURCE_ACCESS_SECONDS = 30 * 24 * 60 * 60;
export const SOURCE_COOKIE_SECONDS = 24 * 60 * 60;
const SESSION_ID = /^cs_(?:test_|live_)?[A-Za-z0-9]{12,200}$/;
const DESIGN_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HASH = /^[a-f0-9]{64}$/;

export type SourceProduct = { designId: string; name: string; priceCad: number };
export type SourcePackage = {
  designId: string;
  version: string;
  filename: string;
  sha256: string;
  bytes: number;
  sourceCommit: string;
  key: string;
};
export type SourceGrant = {
  sessionId: string;
  designId: string;
  name: string;
  priceCents: number;
  email: string;
  expiresAt: number;
  package: SourcePackage;
  metadata: Record<string, string>;
};

export class SourceCommerceError extends Error {
  code: string;
  status: number;
  constructor(code: string, status = 403) {
    super(code);
    this.name = "SourceCommerceError";
    this.code = code;
    this.status = status;
  }
}

function requireTrue(condition: unknown, code: string, status = 403): asserts condition {
  if (!condition) throw new SourceCommerceError(code, status);
}

function mac(value: string, secret: string) {
  requireTrue(Buffer.byteLength(secret) >= 32, "signing_unavailable", 503);
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function equal(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);
  return first.length === second.length && timingSafeEqual(first, second);
}

export function validSourceSessionId(id: unknown): id is string {
  return typeof id === "string" && SESSION_ID.test(id);
}

/** Shared parsing keeps restricted and standard keys on the same payment-mode rules. */
export function stripeKeyMode(key: string): "live" | "test" | null {
  if (key !== key.trim()) return null;
  const match = /^(?:sk|rk)_(live|test)_[A-Za-z0-9]+$/.exec(key);
  if (match?.[1] === "live") return "live";
  if (match?.[1] === "test") return "test";
  return null;
}

/** Test-card purchases must never unlock real files on a public production domain. */
export function sourceEnvironmentAllowed(options: {
  origin: string;
  stripeKey: string;
  nodeEnv?: string;
  vercelEnv?: string;
}) {
  try {
    const url = new URL(options.origin);
    const mode = stripeKeyMode(options.stripeKey);
    if (url.origin !== options.origin || mode === null) return false;
    const local =
      options.nodeEnv !== "production" &&
      !options.vercelEnv &&
      ["localhost", "127.0.0.1"].includes(url.hostname) &&
      url.protocol === "http:";
    if (mode === "test") return local;
    return options.origin === "https://lltechsolutions.ca" && options.vercelEnv === "production";
  } catch {
    return false;
  }
}

export function validSourcePackage(item: SourcePackage) {
  return (
    item &&
    typeof item === "object" &&
    DESIGN_ID.test(item.designId) &&
    /^[A-Za-z0-9._-]{1,80}$/.test(item.version) &&
    item.filename === `${item.designId}.zip` &&
    HASH.test(item.sha256) &&
    Number.isSafeInteger(item.bytes) &&
    item.bytes > 0 &&
    /^[a-f0-9]{40}$/.test(item.sourceCommit) &&
    item.key === `source-packages/${item.designId}/${item.sha256}/${item.filename}`
  );
}

export function parseSourceCheckout(input: unknown) {
  requireTrue(input && typeof input === "object" && !Array.isArray(input), "invalid_request", 400);
  const value = input as Record<string, unknown>;
  requireTrue(
    Object.keys(value).every((key) =>
      ["designId", "licenseAccepted", "licenseVersion"].includes(key),
    ) &&
      typeof value.designId === "string" &&
      value.designId.length <= 80 &&
      DESIGN_ID.test(value.designId) &&
      value.licenseAccepted === true &&
      value.licenseVersion === SOURCE_LICENSE_VERSION,
    "license_required",
    400,
  );
  return value.designId;
}

function proofFields(metadata: Record<string, string>) {
  return JSON.stringify([
    metadata.source_design,
    metadata.source_name,
    metadata.source_price_cents,
    metadata.source_version,
    metadata.source_sha256,
    metadata.source_license,
    metadata.source_origin,
    metadata.source_live,
    metadata.source_nonce,
  ]);
}

export function sourcePurchaseMetadata(
  product: SourceProduct,
  archive: SourcePackage,
  options: { origin: string; live: boolean; nonce: string; secret: string },
) {
  const cents = Math.round(product.priceCad * 100);
  requireTrue(
    product.designId === archive.designId &&
      validSourcePackage(archive) &&
      Number.isSafeInteger(cents) &&
      cents >= 4900 &&
      cents <= 19900 &&
      product.name.length > 0 &&
      product.name.length <= 150 &&
      /^[a-f0-9]{64}$/.test(options.nonce),
    "invalid_product",
    503,
  );
  const metadata: Record<string, string> = {
    source_kind: "landl-source-v1",
    source_design: product.designId,
    source_name: product.name,
    source_price_cents: String(cents),
    source_version: archive.version,
    source_sha256: archive.sha256,
    source_license: SOURCE_LICENSE_VERSION,
    source_origin: options.origin,
    source_live: String(options.live),
    source_nonce: options.nonce,
  };
  metadata.source_proof = mac(`purchase:${proofFields(metadata)}`, options.secret);
  return metadata;
}

/** Re-fetch Stripe objects before calling; webhook payloads alone never authorize delivery. */
export function verifySourcePayment(
  session: Stripe.Checkout.Session,
  intent: Stripe.PaymentIntent,
  options: {
    secret: string;
    origin: string;
    live: boolean;
    packages: readonly SourcePackage[];
    now?: number;
  },
): SourceGrant {
  const now = options.now ?? Math.floor(Date.now() / 1000);
  const m = session.metadata ?? {};
  requireTrue(validSourceSessionId(session.id), "invalid_session");
  requireTrue(m.source_kind === "landl-source-v1", "wrong_purchase");
  requireTrue(
    typeof m.source_proof === "string" &&
      equal(m.source_proof, mac(`purchase:${proofFields(m)}`, options.secret)),
    "invalid_purchase_proof",
  );
  requireTrue(
    m.source_origin === options.origin &&
      m.source_live === String(options.live) &&
      session.livemode === options.live &&
      intent.livemode === options.live,
    "wrong_environment",
  );
  requireTrue(
    session.mode === "payment" &&
      session.status === "complete" &&
      session.payment_status === "paid",
    "payment_pending",
    409,
  );
  requireTrue(
    session.currency === "cad" && /^\d{4,5}$/.test(m.source_price_cents ?? ""),
    "wrong_price",
  );
  const cents = Number(m.source_price_cents);
  requireTrue(cents >= 4900 && cents <= 19900, "wrong_price");
  const lines = session.line_items;
  const item = lines?.data[0];
  requireTrue(
    lines &&
      !lines.has_more &&
      lines.data.length === 1 &&
      item &&
      item.quantity === 1 &&
      item.currency === "cad" &&
      item.amount_subtotal === cents &&
      item.amount_discount === 0 &&
      item.price?.unit_amount === cents &&
      item.price.currency === "cad" &&
      item.price.tax_behavior === "exclusive",
    "wrong_line_items",
  );
  const tax = session.total_details?.amount_tax ?? 0;
  requireTrue(
    Number.isSafeInteger(tax) &&
      tax >= 0 &&
      session.amount_subtotal === cents &&
      session.amount_total === cents + tax &&
      (session.total_details?.amount_discount ?? 0) === 0 &&
      (session.total_details?.amount_shipping ?? 0) === 0 &&
      item.amount_total === session.amount_total,
    "wrong_total",
  );
  const intentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
  const charge = intent.latest_charge;
  requireTrue(
    intent.id === intentId &&
      intent.status === "succeeded" &&
      intent.currency === "cad" &&
      intent.amount === session.amount_total &&
      intent.amount_received === session.amount_total &&
      charge &&
      typeof charge !== "string",
    "payment_unavailable",
  );
  requireTrue(
    charge.status === "succeeded" &&
      charge.paid &&
      charge.captured &&
      charge.currency === "cad" &&
      charge.amount === session.amount_total &&
      charge.amount_captured === session.amount_total &&
      !charge.refunded &&
      charge.amount_refunded === 0 &&
      !charge.disputed,
    "payment_reversed",
  );
  const archive = options.packages.find(
    (entry) =>
      entry.designId === m.source_design &&
      entry.version === m.source_version &&
      entry.sha256 === m.source_sha256,
  );
  requireTrue(archive && validSourcePackage(archive), "archive_unavailable", 503);
  requireTrue(
    Number.isSafeInteger(session.created) && session.created <= now + 60,
    "invalid_session_date",
  );
  const expiresAt = session.created + SOURCE_ACCESS_SECONDS;
  requireTrue(expiresAt > now, "access_expired", 410);
  const email = session.customer_details?.email;
  requireTrue(
    typeof email === "string" && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    "delivery_address_unavailable",
    503,
  );
  return {
    sessionId: session.id,
    designId: archive.designId,
    name: m.source_name,
    priceCents: cents,
    email,
    expiresAt,
    package: archive,
    metadata: m,
  };
}

type DownloadPayload = {
  sessionId: string;
  designId: string;
  sha256: string;
  version: string;
  exp: number;
};

export function createSourceDownloadToken(grant: SourceGrant, secret: string) {
  const payload: DownloadPayload = {
    sessionId: grant.sessionId,
    designId: grant.designId,
    sha256: grant.package.sha256,
    version: grant.package.version,
    exp: grant.expiresAt,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${mac(`download:${encoded}`, secret)}`;
}

export function readSourceDownloadToken(
  token: string,
  secret: string,
  now = Math.floor(Date.now() / 1000),
) {
  requireTrue(token.length <= 1400, "invalid_link");
  const parts = token.split(".");
  requireTrue(
    parts.length === 2 &&
      /^[A-Za-z0-9_-]+$/.test(parts[0]) &&
      equal(parts[1], mac(`download:${parts[0]}`, secret)),
    "invalid_link",
  );
  let payload: DownloadPayload;
  try {
    payload = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
  } catch {
    throw new SourceCommerceError("invalid_link");
  }
  requireTrue(
    payload &&
      validSourceSessionId(payload.sessionId) &&
      typeof payload.designId === "string" &&
      DESIGN_ID.test(payload.designId) &&
      typeof payload.sha256 === "string" &&
      HASH.test(payload.sha256) &&
      typeof payload.version === "string" &&
      /^[A-Za-z0-9._-]{1,80}$/.test(payload.version) &&
      Number.isSafeInteger(payload.exp) &&
      payload.exp > now &&
      payload.exp <= now + SOURCE_ACCESS_SECONDS + 60,
    "invalid_or_expired_link",
    410,
  );
  return payload;
}

export function assertSourceTokenMatches(payload: DownloadPayload, grant: SourceGrant) {
  requireTrue(
    payload.sessionId === grant.sessionId &&
      payload.designId === grant.designId &&
      payload.sha256 === grant.package.sha256 &&
      payload.version === grant.package.version &&
      payload.exp === grant.expiresAt,
    "wrong_download",
  );
}

export function sourceCookieName(sessionId: string) {
  return `ll_source_${createHash("sha256").update(sessionId).digest("hex").slice(0, 16)}`;
}

export function createSourceOwnership(
  sessionId: string,
  secret: string,
  now = Math.floor(Date.now() / 1000),
) {
  requireTrue(validSourceSessionId(sessionId), "invalid_session");
  const expiry = now + SOURCE_COOKIE_SECONDS;
  return `${expiry}.${mac(`ownership:${sessionId}:${expiry}`, secret)}`;
}

export function verifySourceOwnership(
  sessionId: string,
  cookie: string,
  secret: string,
  now = Math.floor(Date.now() / 1000),
) {
  if (!validSourceSessionId(sessionId) || cookie.length > 120) return false;
  const [expiry, signature, extra] = cookie.split(".");
  return (
    !extra &&
    /^\d{10}$/.test(expiry ?? "") &&
    Number(expiry) > now &&
    Number(expiry) <= now + SOURCE_COOKIE_SECONDS + 60 &&
    typeof signature === "string" &&
    equal(signature, mac(`ownership:${sessionId}:${expiry}`, secret))
  );
}

export type SourceEmailDependencies = {
  mark: (sessionId: string, metadata: Record<string, string>) => Promise<void>;
  send: (
    message: { to: string; subject: string; text: string },
    idempotencyKey: string,
  ) => Promise<string>;
  secret: string;
  origin: string;
  now?: number;
};

/** Stripe is the durable marker; Resend deduplicates concurrency/retries for 24 hours.
 * An uncertain send older than 23 hours is held for manual reconciliation, never blindly resent.
 * This deliberately does not claim cross-provider exactly-once semantics. */
export async function fulfillSourceEmail(
  grant: SourceGrant,
  dependencies: SourceEmailDependencies,
) {
  if (grant.metadata.source_email_delivered) return "sent" as const;
  const now = dependencies.now ?? Math.floor(Date.now() / 1000);
  const prior = grant.metadata.source_email_attempted_at;
  if (prior)
    requireTrue(
      /^\d{10}$/.test(prior) && Number(prior) <= now + 60 && now - Number(prior) < 23 * 60 * 60,
      "email_reconciliation_required",
      503,
    );
  else await dependencies.mark(grant.sessionId, { source_email_attempted_at: String(now) });
  const token = createSourceDownloadToken(grant, dependencies.secret);
  const url = `${dependencies.origin}/api/source-purchases/download?token=${encodeURIComponent(token)}`;
  const date = new Date(grant.expiresAt * 1000).toISOString().slice(0, 10);
  const id = await dependencies.send(
    {
      to: grant.email,
      subject: `Your L&L source files — ${grant.name}`,
      text: [
        `Thank you for purchasing the source code for ${grant.name}.`,
        `Download your ZIP: ${url}`,
        `This private link expires on ${date} (UTC). Keep it private. A download verifies payment each time; refunded or disputed purchases lose access.`,
        `Package version: ${grant.package.version}\nSHA-256: ${grant.package.sha256}`,
        "Start with README.md inside the ZIP. This is source code with setup instructions, not a hosted or personalized website. You handle content, configuration and deployment; hosting, paid providers and maintenance are separate.",
        "Your single-business licence and included-asset notes are in the ZIP. Need help? Reply to L&L at LandLTechSolutions@protonmail.com.",
      ].join("\n\n"),
    },
    `source-delivery-v1/${grant.sessionId}`,
  );
  requireTrue(typeof id === "string" && id.length > 0 && id.length <= 200, "email_failed", 503);
  await dependencies.mark(grant.sessionId, { source_email_delivered: id });
  return "sent" as const;
}

export async function processSourceWebhookEvent(
  event: Stripe.Event,
  live: boolean,
  dependencies: {
    load: (sessionId: string) => Promise<SourceGrant>;
    deliver: (grant: SourceGrant) => Promise<unknown>;
  },
) {
  requireTrue(event.livemode === live, "wrong_environment");
  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  )
    return false;
  const session = event.data.object;
  if (session.metadata?.source_kind !== "landl-source-v1") return false;
  // Always retrieve current payment state. A genuine old event may describe a now-refunded payment.
  let grant: SourceGrant;
  try {
    grant = await dependencies.load(session.id);
  } catch (error) {
    if (
      error instanceof SourceCommerceError &&
      ["payment_reversed", "access_expired"].includes(error.code)
    )
      return false;
    throw error;
  }
  await dependencies.deliver(grant);
  return true;
}
