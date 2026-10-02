import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import Stripe from "stripe";
import { managedTermsVersion, managedFieldLimits } from "../data/managed-purchase.ts";
import { validSourceSessionId } from "./source-commerce-core.ts";

export const MANAGED_PURCHASE_KIND = "landl-managed-v1";
export const managedScopeExclusions =
  "Additional pages, advanced integrations, new photography/videography, provider/domain fees and ongoing care are separately quoted. Supplied media implementation is included within the agreed template scope. L&L confirms content, timing and any extras before work begins.";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class ManagedCommerceError extends Error {
  code: string;
  status: number;
  constructor(code: string, status = 403) {
    super(code);
    this.name = "ManagedCommerceError";
    this.code = code;
    this.status = status;
  }
}
function requireTrue(value: unknown, code: string, status = 403): asserts value {
  if (!value) throw new ManagedCommerceError(code, status);
}
function mac(value: string, secret: string) {
  requireTrue(Buffer.byteLength(secret) >= 32, "managed_unavailable", 503);
  return createHmac("sha256", secret).update(value).digest("base64url");
}
function equal(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);
  return first.length === second.length && timingSafeEqual(first, second);
}

export type ManagedBrief = {
  designId: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  location: string;
  website: string;
  services: string;
  message: string;
  mediaHelp: boolean;
  scopeAccepted: true;
  termsVersion: string;
  requestId: string;
  expectedPriceCad: number;
};
export type ManagedQuote = {
  designId: string;
  name: string;
  priceCents: number;
  regularCents: number;
  pages: number;
  contactScope: string;
  inclusions: string;
  exclusions: string;
  included: string;
};
export type ManagedGrant = {
  sessionId: string;
  reference: string;
  email: string;
  quote: ManagedQuote;
  brief: ManagedBrief;
  taxCents: number;
  totalCents: number;
  metadata: Record<string, string>;
};

/** Business brief only: never request payment details, account passwords or patient/client records. */
function parseBrief(input: unknown, termsVersion: string): ManagedBrief {
  requireTrue(input && typeof input === "object" && !Array.isArray(input), "invalid_request", 400);
  const value = input as Record<string, unknown>;
  const allowed = [
    ...Object.keys(managedFieldLimits),
    "designId",
    "mediaHelp",
    "scopeAccepted",
    "termsVersion",
    "requestId",
    "expectedPriceCad",
  ];
  requireTrue(
    Object.keys(value).every((key) => allowed.includes(key)),
    "invalid_request",
    400,
  );
  requireTrue(
    typeof value.designId === "string" &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.designId) &&
      value.designId.length <= 80,
    "invalid_design",
    400,
  );
  requireTrue(
    value.scopeAccepted === true && value.termsVersion === termsVersion,
    "scope_required",
    400,
  );
  requireTrue(
    typeof value.requestId === "string" && UUID.test(value.requestId),
    "invalid_request",
    400,
  );
  requireTrue(typeof value.mediaHelp === "boolean", "invalid_request", 400);
  requireTrue(
    typeof value.expectedPriceCad === "number" &&
      Number.isFinite(value.expectedPriceCad) &&
      Number.isSafeInteger(Math.round(value.expectedPriceCad * 100)),
    "invalid_request",
    400,
  );
  const fields: Record<string, string> = {};
  const required = new Set(["name", "email", "businessName", "location", "services"]);
  for (const [key, limit] of Object.entries(managedFieldLimits)) {
    const field = value[key] ?? "";
    requireTrue(typeof field === "string" && field.length <= limit, "invalid_brief", 400);
    requireTrue(
      !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(field),
      "invalid_brief",
      400,
    );
    fields[key] = field.trim().replace(/\s+/g, " ");
    requireTrue(!required.has(key) || fields[key].length > 0, "invalid_brief", 400);
  }
  requireTrue(EMAIL.test(fields.email), "invalid_email", 400);
  if (fields.website) {
    try {
      const website = new URL(
        /^https?:\/\//i.test(fields.website) ? fields.website : `https://${fields.website}`,
      );
      requireTrue(
        ["http:", "https:"].includes(website.protocol) &&
          !website.username &&
          !website.password &&
          website.hostname.includes("."),
        "invalid_website",
        400,
      );
      fields.website = website.toString();
      requireTrue(fields.website.length <= managedFieldLimits.website, "invalid_website", 400);
    } catch {
      throw new ManagedCommerceError("invalid_website", 400);
    }
  }
  return {
    designId: value.designId,
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    businessName: fields.businessName,
    location: fields.location,
    website: fields.website,
    services: fields.services,
    message: fields.message,
    mediaHelp: value.mediaHelp,
    scopeAccepted: true,
    termsVersion,
    requestId: value.requestId.toLowerCase(),
    expectedPriceCad: value.expectedPriceCad,
  };
}

export function parseManagedCheckout(input: unknown): ManagedBrief {
  return parseBrief(input, managedTermsVersion);
}

export function assertManagedPrice(expectedPriceCad: number, priceCents: number) {
  requireTrue(
    Number.isSafeInteger(priceCents) && priceCents >= 12000 && priceCents <= 60000,
    "invalid_price",
    503,
  );
  requireTrue(Math.abs(expectedPriceCad * 100 - priceCents) < 0.000001, "price_changed", 409);
}
const SIGNED_FIELDS = [
  "managed_kind",
  "managed_design",
  "managed_name",
  "managed_price",
  "managed_regular",
  "managed_pages",
  "managed_contact",
  "managed_inclusions",
  "managed_exclusions",
  "managed_included_1",
  "managed_included_2",
  "managed_included_3",
  "managed_included_4",
  "managed_origin",
  "managed_live",
  "managed_terms",
  "managed_request",
  "brief_name",
  "brief_email",
  "brief_phone",
  "brief_business",
  "brief_location",
  "brief_website",
  "brief_services",
  "brief_message_1",
  "brief_message_2",
  "brief_message_3",
  "brief_message_4",
  "brief_media",
] as const;
function proofFields(metadata: Record<string, string>) {
  return JSON.stringify(SIGNED_FIELDS.map((key) => metadata[key] ?? ""));
}
/** Keep UTF-16 surrogate pairs together while respecting Stripe's 500-character limit. */
function metadataChunks(value: string) {
  const chunks = [""];
  for (const character of value) {
    if (chunks[chunks.length - 1].length + character.length > 500) chunks.push("");
    chunks[chunks.length - 1] += character;
  }
  return Array.from({ length: 4 }, (_, index) => chunks[index] ?? "");
}
export function managedPurchaseMetadata(
  brief: ManagedBrief,
  quote: ManagedQuote,
  options: { origin: string; live: boolean; secret: string },
) {
  assertManagedPrice(brief.expectedPriceCad, quote.priceCents);
  requireTrue(
    quote.included.length <= 1500 &&
      quote.designId === brief.designId &&
      Number.isSafeInteger(quote.pages) &&
      quote.pages >= 1 &&
      quote.pages <= 10 &&
      quote.regularCents >= 15000 &&
      quote.regularCents <= 60000 &&
      quote.priceCents <= quote.regularCents,
    "invalid_product",
    503,
  );
  const message = metadataChunks(brief.message);
  const included = metadataChunks(quote.included);
  const metadata: Record<string, string> = {
    managed_kind: MANAGED_PURCHASE_KIND,
    managed_design: quote.designId,
    managed_name: quote.name,
    managed_price: String(quote.priceCents),
    managed_regular: String(quote.regularCents),
    managed_pages: String(quote.pages),
    managed_contact: quote.contactScope,
    managed_inclusions: quote.inclusions,
    managed_exclusions: quote.exclusions,
    managed_included_1: included[0],
    managed_included_2: included[1],
    managed_included_3: included[2],
    managed_included_4: included[3],
    managed_origin: options.origin,
    managed_live: String(options.live),
    managed_terms: brief.termsVersion,
    managed_request: brief.requestId,
    brief_name: brief.name,
    brief_email: brief.email,
    brief_phone: brief.phone,
    brief_business: brief.businessName,
    brief_location: brief.location,
    brief_website: brief.website,
    brief_services: brief.services,
    brief_message_1: message[0],
    brief_message_2: message[1],
    brief_message_3: message[2],
    brief_message_4: message[3],
    brief_media: String(brief.mediaHelp),
  };
  metadata.managed_proof = mac(`managed-purchase:${proofFields(metadata)}`, options.secret);
  requireTrue(
    Object.keys(metadata).length + 4 <= 50 &&
      Object.entries(metadata).every(([key, value]) => key.length <= 40 && value.length <= 500),
    "invalid_metadata",
    503,
  );
  return metadata;
}

/** Accept only current, re-fetched session + intent + expanded latest charge. */
export function verifyManagedPayment(
  session: Stripe.Checkout.Session,
  intent: Stripe.PaymentIntent,
  options: { origin: string; live: boolean; secret: string },
): ManagedGrant {
  const m = session.metadata ?? {};
  requireTrue(
    validSourceSessionId(session.id) && m.managed_kind === MANAGED_PURCHASE_KIND,
    "wrong_purchase",
  );
  requireTrue(
    typeof m.managed_proof === "string" &&
      equal(m.managed_proof, mac(`managed-purchase:${proofFields(m)}`, options.secret)),
    "invalid_purchase_proof",
  );
  requireTrue(
    m.managed_origin === options.origin &&
      m.managed_live === String(options.live) &&
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
  const cents = Number(m.managed_price);
  requireTrue(
    /^\d{5}$/.test(m.managed_price ?? "") &&
      cents >= 12000 &&
      cents <= 60000 &&
      session.currency === "cad",
    "wrong_price",
  );
  const item = session.line_items?.data[0];
  requireTrue(
    session.line_items &&
      !session.line_items.has_more &&
      session.line_items.data.length === 1 &&
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
  const chargeIntent =
    typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
  requireTrue(chargeIntent === intent.id, "payment_unavailable");
  const email = session.customer_details?.email;
  requireTrue(
    typeof email === "string" && email.length <= 254 && EMAIL.test(email),
    "delivery_address_unavailable",
    503,
  );
  requireTrue(/^\d{4}-\d{2}-\d{2}$/.test(m.managed_terms ?? ""), "invalid_purchase_proof");
  const brief = parseBrief(
    {
      designId: m.managed_design,
      name: m.brief_name,
      email: m.brief_email,
      phone: m.brief_phone,
      businessName: m.brief_business,
      location: m.brief_location,
      website: m.brief_website,
      services: m.brief_services,
      message: [m.brief_message_1, m.brief_message_2, m.brief_message_3, m.brief_message_4].join(
        "",
      ),
      mediaHelp: m.brief_media === "true",
      scopeAccepted: true,
      termsVersion: m.managed_terms,
      requestId: m.managed_request,
      expectedPriceCad: cents / 100,
    },
    m.managed_terms,
  );
  return {
    sessionId: session.id,
    reference: managedOrderReference(session.id),
    email,
    brief,
    metadata: m,
    taxCents: tax,
    totalCents: cents + tax,
    quote: {
      designId: m.managed_design,
      name: m.managed_name,
      priceCents: cents,
      regularCents: Number(m.managed_regular),
      pages: Number(m.managed_pages),
      contactScope: m.managed_contact,
      inclusions: m.managed_inclusions,
      exclusions: m.managed_exclusions,
      included: [
        m.managed_included_1,
        m.managed_included_2,
        m.managed_included_3,
        m.managed_included_4,
      ].join(""),
    },
  };
}
export function managedOrderReference(sessionId: string) {
  return `LL-${createHash("sha256").update(sessionId).digest("hex").slice(0, 12).toUpperCase()}`;
}
export function managedCookieName(sessionId: string) {
  return `ll_managed_${createHash("sha256").update(sessionId).digest("hex").slice(0, 16)}`;
}
function money(cents: number) {
  return `$${(cents / 100).toFixed(2)} CAD`;
}
export function managedEmailContent(
  grant: ManagedGrant,
  role: "owner" | "buyer",
  ownerEmail: string,
) {
  requireTrue(EMAIL.test(ownerEmail) && !/[\r\n]/.test(ownerEmail), "managed_unavailable", 503);
  const { quote, brief } = grant;
  const purchase = [
    `Order: ${grant.reference}`,
    `Template: ${quote.name} (${quote.designId})`,
    `Website personalization and launch: ${money(quote.priceCents)}`,
    `Regular template price: ${money(quote.regularCents)}`,
    `Tax: ${money(grant.taxCents)}\nTotal paid: ${money(grant.totalCents)}`,
    `Included page count: ${quote.pages}\nContact setup: ${quote.contactScope}`,
    `Listed template scope:\n${quote.included}`,
    `Included personalization and launch work: ${quote.inclusions}`,
    `Separate costs and scope: ${quote.exclusions}`,
    `Photography/videography interest: ${brief.mediaHelp ? "Yes — discuss and quote separately; not included in this payment." : "Not requested in this brief."}`,
  ];
  const details = [
    `Business: ${brief.businessName}`,
    `Contact: ${brief.name}`,
    `Business email: ${brief.email}`,
    `Phone: ${brief.phone || "Not supplied"}`,
    `Business location/service area: ${brief.location}`,
    `Current website: ${brief.website || "Not supplied"}`,
    `Services/products: ${brief.services}`,
    `Project notes: ${brief.message || "Not supplied"}`,
  ];
  return role === "owner"
    ? {
        to: ownerEmail,
        replyTo: brief.email,
        subject: `Paid L&L template project — ${quote.name} — ${grant.reference}`,
        text: [
          "Payment verified. A customer has purchased L&L personalization and launch.",
          ...purchase,
          ...details,
          `Payment contact email: ${grant.email}`,
          `Stripe Checkout session: ${grant.sessionId}`,
          `Scope/terms version accepted: ${brief.termsVersion}`,
          "Next step: contact the buyer to confirm the agreed content, delivery schedule and any separately quoted extras. Collect images, logo and final copy securely; never request passwords or private customer/patient records by email.",
        ].join("\n\n"),
      }
    : {
        to: grant.email,
        replyTo: ownerEmail,
        subject: `Your L&L website project — ${grant.reference}`,
        text: [
          `Thank you, ${brief.name}. Your payment for ${quote.name} has been received.`,
          ...purchase,
          `Business: ${brief.businessName}`,
          "L&L will follow up to confirm your content, timeline and any extras before work starts. Reply to this email with your photos, logo and final copy when you are ready, or ask us for a file-sharing option; do not email passwords or sensitive customer/patient information.",
          `This purchase is for L&L to personalize and launch the selected template. It is not the code-only download option. Reply to ${ownerEmail} with your order reference if you need help.`,
        ].join("\n\n"),
      };
}
export type ManagedEmailDependencies = {
  ownerEmail: string;
  now?: number;
  mark: (sessionId: string, metadata: Record<string, string>) => Promise<void>;
  send: (
    message: { to: string; replyTo: string; subject: string; text: string },
    idempotencyKey: string,
  ) => Promise<string>;
};
/** Separate durable markers prevent an owner-email failure from suppressing buyer confirmation.
 * Resend deduplicates overlapping retries for 24h; uncertain sends beyond 23h require reconciliation. */
export async function fulfillManagedEmail(
  grant: ManagedGrant,
  role: "owner" | "buyer",
  dependencies: ManagedEmailDependencies,
) {
  const delivered = `managed_${role}_delivered`;
  const attempted = `managed_${role}_attempted`;
  if (grant.metadata[delivered]) return "sent" as const;
  const now = dependencies.now ?? Math.floor(Date.now() / 1000);
  const previous = grant.metadata[attempted];
  if (previous)
    requireTrue(
      /^\d{10}$/.test(previous) &&
        Number(previous) <= now + 60 &&
        now - Number(previous) < 23 * 60 * 60,
      "email_reconciliation_required",
      503,
    );
  else {
    await dependencies.mark(grant.sessionId, { [attempted]: String(now) });
    grant.metadata[attempted] = String(now);
  }
  const id = await dependencies.send(
    managedEmailContent(grant, role, dependencies.ownerEmail),
    `managed-${role}-v1/${grant.sessionId}`,
  );
  requireTrue(typeof id === "string" && id.length > 0 && id.length <= 200, "email_failed", 503);
  await dependencies.mark(grant.sessionId, { [delivered]: id });
  grant.metadata[delivered] = id;
  return "sent" as const;
}
export async function processManagedWebhookEvent(
  event: Stripe.Event,
  live: boolean,
  dependencies: {
    load: (sessionId: string) => Promise<ManagedGrant>;
    deliver: (grant: ManagedGrant) => Promise<unknown>;
  },
) {
  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  )
    return false;
  const session = event.data.object;
  if (session.metadata?.managed_kind !== MANAGED_PURCHASE_KIND) return false;
  requireTrue(event.livemode === live, "wrong_environment");
  let grant: ManagedGrant;
  try {
    grant = await dependencies.load(session.id);
  } catch (error) {
    if (error instanceof ManagedCommerceError && error.code === "payment_reversed") return false;
    throw error;
  }
  await dependencies.deliver(grant);
  return true;
}
export function verifyManagedWebhookSignature(
  body: string,
  signature: string | null,
  secret: string,
) {
  requireTrue(Boolean(signature) && secret.startsWith("whsec_"), "invalid_signature", 400);
  try {
    return Stripe.webhooks.constructEvent(body, signature as string, secret);
  } catch {
    throw new ManagedCommerceError("invalid_signature", 400);
  }
}
