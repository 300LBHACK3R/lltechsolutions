import Stripe from "stripe";
import { SourceCommerceError } from "./source-commerce-core.ts";

/** No parsing or re-serialization before Stripe validates its timestamped raw-body signature. */
export function verifySourceWebhookSignature(
  body: string,
  signature: string | null,
  secret: string,
) {
  if (!signature || !secret.startsWith("whsec_"))
    throw new SourceCommerceError("invalid_signature", 400);
  try {
    return Stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    throw new SourceCommerceError("invalid_signature", 400);
  }
}
