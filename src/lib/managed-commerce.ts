import Stripe from "stripe";
import { Resend } from "resend";
import { createHash } from "node:crypto";
import { siteConfig } from "@/config/site";
import {
  availableDesigns,
  contactScopeDetails,
  templatePrice,
  websiteDesigns,
} from "@/data/website-collection";
import { templateManagedOffer } from "@/data/template-purchase";
import {
  SOURCE_COOKIE_SECONDS,
  createSourceOwnership,
  verifySourceOwnership,
  validSourceSessionId,
  sourceEnvironmentAllowed,
  stripeKeyMode,
} from "./source-commerce-core.ts";
import {
  ManagedCommerceError,
  managedScopeExclusions,
  assertManagedPrice,
  managedPurchaseMetadata,
  verifyManagedPayment,
  managedCookieName,
  fulfillManagedEmail,
  processManagedWebhookEvent,
  verifyManagedWebhookSignature,
  type ManagedBrief,
  type ManagedQuote,
  type ManagedGrant,
} from "./managed-commerce-core.ts";

const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
};
const attempts = new Map<string, { count: number; expires: number }>();
type ManagedSettings = { origin: string; stripeKey: string; secret: string; live: boolean };
function setting(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new ManagedCommerceError("managed_unavailable", 503);
  return value;
}
function accessSettings(): ManagedSettings {
  const origin = process.env.SOURCE_CHECKOUT_ORIGIN?.trim() || siteConfig.url;
  const stripeKey = setting("STRIPE_SECRET_KEY");
  const secret = setting("MANAGED_PURCHASE_SIGNING_SECRET");
  if (
    !sourceEnvironmentAllowed({
      origin,
      stripeKey,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    }) ||
    Buffer.byteLength(secret) < 32
  )
    throw new ManagedCommerceError("managed_unavailable", 503);
  return { origin, stripeKey, secret, live: stripeKeyMode(stripeKey) === "live" };
}
function emailSettings() {
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || process.env.SOURCE_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;
  const key = setting("RESEND_API_KEY");
  if (
    !from ||
    /[\r\n]/.test(from) ||
    !from.includes("@") ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to) ||
    !key.startsWith("re_")
  )
    throw new ManagedCommerceError("managed_unavailable", 503);
  return { from, to, key };
}
function checkoutSettings() {
  const settings = accessSettings();
  if (
    process.env.MANAGED_TEMPLATE_PURCHASES_ENABLED !== "true" ||
    !setting("MANAGED_STRIPE_WEBHOOK_SECRET").startsWith("whsec_") ||
    !["true", "false"].includes(process.env.SOURCE_STRIPE_AUTOMATIC_TAX ?? "")
  )
    throw new ManagedCommerceError("managed_unavailable", 503);
  emailSettings();
  return settings;
}
export function isManagedCheckoutConfigured(designId?: string) {
  try {
    checkoutSettings();
    return designId
      ? Boolean(
          availableDesigns().find(
            (design) =>
              design.id === designId &&
              design.startingPriceCad !== null &&
              design.pageCount !== null,
          ),
        )
      : true;
  } catch {
    return false;
  }
}
function provider(settings: ManagedSettings) {
  return new Stripe(settings.stripeKey, { maxNetworkRetries: 2, timeout: 10_000 });
}
function requestCookie(request: Request, name: string) {
  return (
    request.headers
      .get("cookie")
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? ""
  );
}
function cookie(name: string, value: string, seconds: number, settings: ManagedSettings) {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${seconds}${settings.origin.startsWith("https:") ? "; Secure" : ""}`;
}
export function managedRequestHostAllowed(request: Request) {
  try {
    const { origin } = accessSettings();
    return (request.headers.get("host") ?? new URL(request.url).host) === new URL(origin).host;
  } catch {
    return false;
  }
}
export function managedRequestOriginAllowed(request: Request) {
  try {
    return (
      request.headers.get("origin") === accessSettings().origin &&
      request.headers.get("sec-fetch-site") !== "cross-site" &&
      managedRequestHostAllowed(request)
    );
  } catch {
    return false;
  }
}
/** Best-effort per-instance cap. A production WAF rule provides cross-instance enforcement. */
export function managedRateLimited(
  request: Request,
  purpose: "checkout" | "status",
  now = Date.now(),
) {
  const ip =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const key = `${purpose}:${createHash("sha256").update(ip).digest("hex")}`;
  for (const [entry, value] of attempts) if (value.expires <= now) attempts.delete(entry);
  const active = attempts.get(key);
  if (active) return ++active.count > (purpose === "checkout" ? 10 : 90);
  if (attempts.size >= 2000) return true;
  attempts.set(key, { count: 1, expires: now + 600_000 });
  return false;
}
export function managedResponse(value: unknown, status = 200, extraHeaders?: HeadersInit) {
  const headers = new Headers(PRIVATE_HEADERS);
  if (status === 429) headers.set("Retry-After", "600");
  new Headers(extraHeaders).forEach((value, key) => headers.set(key, value));
  return Response.json(value, { status, headers });
}
export function managedErrorResponse(error: unknown) {
  const code = error instanceof ManagedCommerceError ? error.code : "managed_unavailable";
  const status = error instanceof ManagedCommerceError ? error.status : 503;
  const message =
    code === "inquiry_required"
      ? "This client-reference design needs an agreed scope before booking. Please send L&L your enquiry before payment."
      : code === "price_changed"
        ? "This template’s price has changed. Reload the page to review the current price before paying."
        : code === "scope_required"
          ? "Please accept the included template scope and terms before continuing."
          : status === 409
            ? "This checkout attempt needs refreshing. Reload the page and review your details before trying again."
            : status === 400
              ? "Please check your business details and try again."
              : status === 403
                ? "This order could not be verified. Open the confirmation in the browser used for payment or contact L&L with your receipt."
                : "Online template checkout is temporarily unavailable. Your details have not been submitted as an enquiry. Please contact L&L for help.";
  return managedResponse({ message }, status);
}
function quoteFor(brief: ManagedBrief, now = Date.now()): ManagedQuote {
  const design = websiteDesigns.find(
    (item) => item.id === brief.designId && item.status !== "draft",
  );
  if (!design || design.startingPriceCad === null)
    throw new ManagedCommerceError("invalid_design", 400);
  if (design.pageCount === null) throw new ManagedCommerceError("inquiry_required", 400);
  const price = templatePrice(design.startingPriceCad, now).priceCad;
  if (price === null) throw new ManagedCommerceError("invalid_design", 400);
  assertManagedPrice(brief.expectedPriceCad, Math.round(price * 100));
  return {
    designId: design.id,
    name: design.name,
    priceCents: Math.round(price * 100),
    regularCents: Math.round(design.startingPriceCad * 100),
    pages: design.pageCount,
    contactScope: contactScopeDetails[design.contactMode].description,
    inclusions: templateManagedOffer.summary,
    exclusions: managedScopeExclusions,
    included: design.included.join("\n"),
  };
}
export async function createManagedCheckout(brief: ManagedBrief) {
  const settings = checkoutSettings();
  const quote = quoteFor(brief);
  try {
    const stripe = provider(settings);
    const metadata = managedPurchaseMetadata(brief, quote, settings);
    const automaticTax = process.env.SOURCE_STRIPE_AUTOMATIC_TAX === "true";
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        ui_mode: "hosted_page",
        allowed_payment_method_types: ["card"],
        customer_email: brief.email,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "cad",
              unit_amount: quote.priceCents,
              tax_behavior: "exclusive",
              product_data: {
                name: `${quote.name} — L&L personalization & launch`,
                description: `${quote.pages} page${quote.pages === 1 ? "" : "s"}. Supplied content and branding, page-speed optimization, technical SEO, responsive checks and launch within the listed scope. Extras and provider fees separate.`,
              },
            },
          },
        ],
        metadata,
        payment_intent_data: { metadata },
        allow_promotion_codes: false,
        automatic_tax: { enabled: automaticTax },
        billing_address_collection: automaticTax ? "required" : "auto",
        success_url: `${settings.origin}/template-purchase/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${settings.origin}/website-collection/${brief.designId}/purchase?checkout=cancelled`,
      },
      { idempotencyKey: `managed-checkout-v1/${brief.requestId}` },
    );
    if (
      !session.url ||
      new URL(session.url).origin !== "https://checkout.stripe.com" ||
      session.status !== "open"
    )
      throw new ManagedCommerceError("checkout_unavailable", 409);
    const response = managedResponse({ url: session.url });
    response.headers.append(
      "Set-Cookie",
      cookie(
        managedCookieName(session.id),
        createSourceOwnership(session.id, settings.secret),
        SOURCE_COOKIE_SECONDS,
        settings,
      ),
    );
    return response;
  } catch (error) {
    if (error instanceof Stripe.errors.StripeIdempotencyError)
      return managedResponse(
        {
          message:
            "An earlier checkout attempt uses different details. Reload and review your brief before starting again; if you already paid, contact L&L with your receipt instead.",
        },
        409,
      );
    return managedErrorResponse(error);
  }
}
async function loadPurchase(sessionId: string, settings: ManagedSettings, stripe: Stripe) {
  if (!validSourceSessionId(sessionId)) throw new ManagedCommerceError("invalid_session");
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
  if (session.metadata?.managed_kind !== "landl-managed-v1")
    throw new ManagedCommerceError("wrong_purchase");
  const intentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
  if (!intentId) throw new ManagedCommerceError("payment_pending", 409);
  const intent = await stripe.paymentIntents.retrieve(intentId, { expand: ["latest_charge"] });
  return verifyManagedPayment(session, intent, settings);
}
async function deliverEmails(grant: ManagedGrant, stripe: Stripe, requireAll: boolean) {
  const settings = emailSettings();
  const resend = new Resend(settings.key);
  const dependencies = {
    ownerEmail: settings.to,
    mark: async (sessionId: string, metadata: Record<string, string>) => {
      await stripe.checkout.sessions.update(sessionId, { metadata });
    },
    send: async (
      message: { to: string; replyTo: string; subject: string; text: string },
      idempotencyKey: string,
    ) => {
      const result = await resend.emails.send(
        { ...message, from: settings.from },
        { idempotencyKey },
      );
      if (result.error || !result.data?.id) throw new ManagedCommerceError("email_failed", 503);
      return result.data.id;
    },
  };
  const [owner, buyer] = await Promise.allSettled([
    fulfillManagedEmail(grant, "owner", dependencies),
    fulfillManagedEmail(grant, "buyer", dependencies),
  ]);
  if (requireAll && (owner.status === "rejected" || buyer.status === "rejected"))
    throw new ManagedCommerceError("email_failed", 503);
  return {
    ownerEmailStatus: owner.status === "fulfilled" ? "sent" : "pending",
    buyerEmailStatus: buyer.status === "fulfilled" ? "sent" : "pending",
  };
}
export async function managedPurchaseStatus(request: Request, sessionId: string) {
  const settings = accessSettings();
  if (
    !verifySourceOwnership(
      sessionId,
      requestCookie(request, managedCookieName(sessionId)),
      settings.secret,
    )
  )
    throw new ManagedCommerceError("ownership_required");
  const stripe = provider(settings);
  let grant: ManagedGrant;
  try {
    grant = await loadPurchase(sessionId, settings, stripe);
  } catch (error) {
    if (error instanceof ManagedCommerceError && error.code === "payment_pending")
      return managedResponse({ status: "pending" });
    throw error;
  }
  let emailStatus = { ownerEmailStatus: "pending", buyerEmailStatus: "pending" };
  try {
    emailStatus = await deliverEmails(grant, stripe, false);
  } catch {
    /* Signed webhooks retry independently; a paid order remains paid when email is unavailable. */
  }
  return managedResponse({
    status: "paid",
    name: grant.quote.name,
    reference: grant.reference,
    priceCad: grant.quote.priceCents / 100,
    totalCad: grant.totalCents / 100,
    ...emailStatus,
  });
}
export async function handleManagedWebhook(body: string, signature: string | null) {
  // Existing paid orders continue through this endpoint even if new sales are paused.
  const settings = accessSettings();
  const event = verifyManagedWebhookSignature(
    body,
    signature,
    setting("MANAGED_STRIPE_WEBHOOK_SECRET"),
  );
  const stripe = provider(settings);
  await processManagedWebhookEvent(event, settings.live, {
    load: (sessionId) => loadPurchase(sessionId, settings, stripe),
    deliver: (grant) => deliverEmails(grant, stripe, true),
  });
  return managedResponse({ received: true });
}
