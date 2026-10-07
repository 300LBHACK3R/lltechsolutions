import Stripe from "stripe";
import { Resend } from "resend";
import { S3Client, HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes, createHash } from "node:crypto";
import { sourceProduct, sourceHref } from "@/data/source-products";
import manifest from "@/data/source-package-manifest.json";
import {
  SourceCommerceError,
  SOURCE_COOKIE_SECONDS,
  sourcePurchaseMetadata,
  verifySourcePayment,
  validSourcePackage,
  fulfillSourceEmail,
  createSourceDownloadToken,
  readSourceDownloadToken,
  assertSourceTokenMatches,
  createSourceOwnership,
  sourceCookieName,
  verifySourceOwnership,
  validSourceSessionId,
  processSourceWebhookEvent,
  sourceEnvironmentAllowed,
  stripeKeyMode,
  type SourceGrant,
  type SourcePackage,
} from "./source-commerce-core.ts";
import { verifySourceWebhookSignature } from "./source-commerce-webhook.ts";
import {
  SourceConfigurationError,
  reportSourceReadiness,
  sourceEnvironmentFailureField,
  type SourceConfigurationField,
} from "./source-readiness-diagnostic.ts";

const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
};
const attempts = new Map<string, { count: number; expires: number }>();

type SourceSettings = {
  origin: string;
  live: boolean;
  secret: string;
  stripeKey: string;
  bucket: string;
  region: string;
  endpoint?: string;
  accessKey: string;
  secretKey: string;
};

function setting(name: SourceConfigurationField) {
  const value = process.env[name]?.trim();
  if (!value) throw new SourceConfigurationError(name, "missing");
  return value;
}

function accessSettings(): SourceSettings {
  const origin = process.env.SOURCE_CHECKOUT_ORIGIN?.trim() || "https://lltechsolutions.ca";
  const stripeKey = setting("STRIPE_SECRET_KEY");
  const live = stripeKeyMode(stripeKey) === "live";
  if (
    !sourceEnvironmentAllowed({
      origin,
      stripeKey,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    })
  )
    throw new SourceConfigurationError(
      sourceEnvironmentFailureField({ origin, stripeKey }),
      "invalid",
    );
  const secret = setting("SOURCE_DOWNLOAD_SIGNING_SECRET");
  if (Buffer.byteLength(secret) < 32)
    throw new SourceConfigurationError("SOURCE_DOWNLOAD_SIGNING_SECRET", "invalid");
  const endpoint = process.env.SOURCE_S3_ENDPOINT?.trim() || undefined;
  if (endpoint) {
    try {
      const url = new URL(endpoint);
      if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash)
        throw new SourceConfigurationError("SOURCE_S3_ENDPOINT", "invalid");
    } catch {
      throw new SourceConfigurationError("SOURCE_S3_ENDPOINT", "invalid");
    }
  }
  const bucket = setting("SOURCE_S3_BUCKET");
  if (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket))
    throw new SourceConfigurationError("SOURCE_S3_BUCKET", "invalid");
  return {
    origin,
    live,
    secret,
    stripeKey,
    bucket,
    endpoint,
    region: setting("SOURCE_S3_REGION"),
    accessKey: setting("SOURCE_S3_ACCESS_KEY_ID"),
    secretKey: setting("SOURCE_S3_SECRET_ACCESS_KEY"),
  };
}

function checkoutSettings() {
  const settings = accessSettings();
  if (process.env.SOURCE_DOWNLOADS_ENABLED !== "true")
    throw new SourceConfigurationError("SOURCE_DOWNLOADS_ENABLED", "disabled");
  if (!setting("STRIPE_WEBHOOK_SECRET").startsWith("whsec_"))
    throw new SourceConfigurationError("STRIPE_WEBHOOK_SECRET", "invalid");
  if (!setting("RESEND_API_KEY").startsWith("re_"))
    throw new SourceConfigurationError("RESEND_API_KEY", "invalid");
  if (/[\r\n]/.test(setting("SOURCE_FROM_EMAIL")))
    throw new SourceConfigurationError("SOURCE_FROM_EMAIL", "invalid");
  if (!["true", "false"].includes(process.env.SOURCE_STRIPE_AUTOMATIC_TAX ?? ""))
    throw new SourceConfigurationError("SOURCE_STRIPE_AUTOMATIC_TAX", "invalid");
  return settings;
}

function packages(): SourcePackage[] {
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.packages)) return [];
  return (manifest.packages as SourcePackage[]).filter(validSourcePackage);
}

/** Manifest is append-only. The last package for a product is offered for new sales. */
function currentPackage(designId: string) {
  return packages()
    .filter((entry) => entry.designId === designId)
    .at(-1);
}

export function isSourceCheckoutConfigured(designId?: string) {
  try {
    checkoutSettings();
    return designId
      ? Boolean(sourceProduct(designId) && currentPackage(designId))
      : packages().length > 0;
  } catch (error) {
    reportSourceReadiness(error, {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    });
    return false;
  }
}

function providers(settings: SourceSettings) {
  const stripe = new Stripe(settings.stripeKey, { maxNetworkRetries: 2, timeout: 10_000 });
  const s3 = new S3Client({
    region: settings.region,
    endpoint: settings.endpoint,
    forcePathStyle: true,
    maxAttempts: 2,
    credentials: { accessKeyId: settings.accessKey, secretAccessKey: settings.secretKey },
  });
  return { stripe, s3 };
}

async function verifyStoredPackage(archive: SourcePackage, settings: SourceSettings, s3: S3Client) {
  const head = await s3.send(new HeadObjectCommand({ Bucket: settings.bucket, Key: archive.key }), {
    abortSignal: AbortSignal.timeout(10_000),
  });
  if (
    head.ContentLength !== archive.bytes ||
    head.Metadata?.sha256 !== archive.sha256 ||
    head.ContentType !== "application/zip"
  )
    throw new SourceCommerceError("archive_unavailable", 503);
}

export function sourceRequestOriginAllowed(request: Request) {
  try {
    const { origin } = accessSettings();
    return (
      request.headers.get("origin") === origin &&
      request.headers.get("sec-fetch-site") !== "cross-site" &&
      sourceRequestHostAllowed(request)
    );
  } catch {
    return false;
  }
}

export function sourceRequestHostAllowed(request: Request) {
  try {
    const { origin } = accessSettings();
    const host = request.headers.get("host") ?? new URL(request.url).host;
    return host === new URL(origin).host;
  } catch {
    return false;
  }
}

/** Best-effort per-instance cap, deliberately separate from contact-form attempts.
 * Deploy a provider/WAF rate rule for cross-instance enforcement. */
export function sourceRateLimited(
  request: Request,
  purpose: "checkout" | "status" | "download",
  now = Date.now(),
) {
  const ip =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const key = `${purpose}:${createHash("sha256").update(ip).digest("hex")}`;
  for (const [entry, value] of attempts) if (value.expires <= now) attempts.delete(entry);
  const cap = purpose === "checkout" ? 10 : 90;
  const active = attempts.get(key);
  if (active) return ++active.count > cap;
  if (attempts.size >= 2000) return true;
  attempts.set(key, { count: 1, expires: now + 600_000 });
  return false;
}

export function sourceResponse(value: unknown, status = 200, extraHeaders?: HeadersInit) {
  const headers = new Headers(PRIVATE_HEADERS);
  if (status === 429) headers.set("Retry-After", "600");
  new Headers(extraHeaders).forEach((value, key) => headers.set(key, value));
  return Response.json(value, { status, headers });
}

export function sourceErrorResponse(error: unknown) {
  const code = error instanceof SourceCommerceError ? error.code : "source_unavailable";
  const status = error instanceof SourceCommerceError ? error.status : 503;
  const message =
    code === "payment_pending"
      ? "Payment is still being confirmed. Please check again shortly."
      : code === "license_required"
        ? "Please accept the source-code licence before continuing."
        : status === 410
          ? "This download link has expired. Please contact L&L with your order confirmation."
          : status === 403
            ? "This purchase link could not be verified. Use the private link in your purchase email."
            : status === 400
              ? "Please check your request and try again."
              : "Source downloads are temporarily unavailable. Please contact L&L for help.";
  return sourceResponse({ message }, status);
}

export async function createSourceCheckout(designId: string) {
  const settings = checkoutSettings();
  const product = sourceProduct(designId);
  const archive = currentPackage(designId);
  if (!product || !archive) throw new SourceCommerceError("product_unavailable", 503);
  const { stripe, s3 } = providers(settings);
  // Confirm stock before creating a payable session. Storage remains private.
  await verifyStoredPackage(archive, settings, s3);
  const metadata = sourcePurchaseMetadata(product, archive, {
    ...settings,
    nonce: randomBytes(32).toString("hex"),
  });
  const automaticTax = process.env.SOURCE_STRIPE_AUTOMATIC_TAX === "true";
  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      ui_mode: "hosted_page",
      allowed_payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "cad",
            unit_amount: Math.round(product.priceCad * 100),
            tax_behavior: "exclusive",
            product_data: {
              name: `${product.name} — source code`,
              description:
                "Downloadable source ZIP. Single-business licence. Personalization, hosting and launch are not included.",
            },
          },
        },
      ],
      metadata,
      payment_intent_data: { metadata },
      allow_promotion_codes: false,
      automatic_tax: { enabled: automaticTax },
      billing_address_collection: automaticTax ? "required" : "auto",
      success_url: `${settings.origin}/source-purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${settings.origin}${sourceHref(designId)}?checkout=cancelled`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    },
    { idempotencyKey: `source-checkout/${metadata.source_nonce}` },
  );
  if (!session.url || new URL(session.url).origin !== "https://checkout.stripe.com")
    throw new SourceCommerceError("checkout_unavailable", 503);
  const ownership = createSourceOwnership(session.id, settings.secret);
  const cookie = `${sourceCookieName(session.id)}=${ownership}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SOURCE_COOKIE_SECONDS}${settings.origin.startsWith("https:") ? "; Secure" : ""}`;
  return sourceResponse({ url: session.url }, 200, { "Set-Cookie": cookie });
}

async function loadPurchase(sessionId: string, settings: SourceSettings, stripe: Stripe) {
  if (!validSourceSessionId(sessionId)) throw new SourceCommerceError("invalid_session");
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
  const intentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
  if (!intentId) throw new SourceCommerceError("payment_pending", 409);
  const intent = await stripe.paymentIntents.retrieve(intentId, { expand: ["latest_charge"] });
  return verifySourcePayment(session, intent, { ...settings, packages: packages() });
}

async function deliverEmail(grant: SourceGrant, settings: SourceSettings, stripe: Stripe) {
  const resend = new Resend(setting("RESEND_API_KEY"));
  const from = setting("SOURCE_FROM_EMAIL");
  return fulfillSourceEmail(grant, {
    ...settings,
    mark: async (sessionId, metadata) => {
      await stripe.checkout.sessions.update(sessionId, { metadata });
    },
    send: async (message, idempotencyKey) => {
      const result = await resend.emails.send(
        { ...message, from, replyTo: "LandLTechSolutions@protonmail.com" },
        { idempotencyKey },
      );
      if (result.error || !result.data?.id) throw new SourceCommerceError("email_failed", 503);
      return result.data.id;
    },
  });
}

export async function sourcePurchaseStatus(request: Request, sessionId: string) {
  const settings = accessSettings();
  const name = sourceCookieName(sessionId);
  const cookie =
    request.headers
      .get("cookie")
      ?.split(";")
      .map((value) => value.trim())
      .find((value) => value.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? "";
  if (!verifySourceOwnership(sessionId, cookie, settings.secret))
    throw new SourceCommerceError("ownership_required");
  const { stripe, s3 } = providers(settings);
  let grant: SourceGrant;
  try {
    grant = await loadPurchase(sessionId, settings, stripe);
  } catch (error) {
    if (error instanceof SourceCommerceError && error.code === "payment_pending")
      return sourceResponse({ status: "pending" });
    throw error;
  }
  await verifyStoredPackage(grant.package, settings, s3);
  let emailStatus = "sent";
  try {
    await deliverEmail(grant, settings, stripe);
  } catch {
    emailStatus = "pending";
  } // Stripe's signed webhook retries delivery independently.
  const token = createSourceDownloadToken(grant, settings.secret);
  return sourceResponse({
    status: "paid",
    designId: grant.designId,
    name: grant.name,
    downloadUrl: `/api/source-purchases/download?token=${encodeURIComponent(token)}`,
    emailStatus,
  });
}

export async function sourceDownload(token: string) {
  // New-sales kill switch intentionally does not revoke existing paid access.
  const settings = accessSettings();
  const payload = readSourceDownloadToken(token, settings.secret);
  const { stripe, s3 } = providers(settings);
  const grant = await loadPurchase(payload.sessionId, settings, stripe);
  assertSourceTokenMatches(payload, grant);
  await verifyStoredPackage(grant.package, settings, s3);
  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: settings.bucket,
      Key: grant.package.key,
      ResponseContentDisposition: `attachment; filename="${grant.package.filename}"`,
      ResponseContentType: "application/zip",
      ResponseCacheControl: "private, no-store",
    }),
    { expiresIn: 300 },
  );
  return new Response(null, { status: 307, headers: { ...PRIVATE_HEADERS, Location: url } });
}

export async function handleSourceWebhook(body: string, signature: string | null) {
  const settings = accessSettings();
  const { stripe, s3 } = providers(settings);
  const event = verifySourceWebhookSignature(body, signature, setting("STRIPE_WEBHOOK_SECRET"));
  await processSourceWebhookEvent(event, settings.live, {
    load: (sessionId) => loadPurchase(sessionId, settings, stripe),
    deliver: async (grant) => {
      await verifyStoredPackage(grant.package, settings, s3);
      await deliverEmail(grant, settings, stripe);
    },
  });
  return sourceResponse({ received: true });
}
