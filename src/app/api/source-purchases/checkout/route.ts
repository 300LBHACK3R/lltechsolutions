import { parseSourceCheckout } from "@/lib/source-commerce-core";
import { readLimitedJson } from "@/lib/contact-security";
import {
  createSourceCheckout,
  isSourceCheckoutConfigured,
  sourceRequestOriginAllowed,
  sourceRateLimited,
  sourceResponse,
  sourceErrorResponse,
} from "@/lib/source-commerce";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  if (!isSourceCheckoutConfigured())
    return sourceResponse(
      {
        message:
          "Online source purchases are not available yet. Please ask L&L about this template.",
      },
      503,
    );
  if (!sourceRequestOriginAllowed(request))
    return sourceResponse({ message: "Please begin your purchase on the L&L website." }, 403);
  if (
    request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json"
  )
    return sourceResponse({ message: "Please send a JSON request." }, 415);
  if (sourceRateLimited(request, "checkout"))
    return sourceResponse({ message: "Please wait a few minutes before trying again." }, 429);
  try {
    return await createSourceCheckout(parseSourceCheckout(await readLimitedJson(request)));
  } catch (error) {
    if (error instanceof RangeError || error instanceof SyntaxError)
      return sourceResponse(
        { message: "Please send a valid purchase request." },
        error instanceof RangeError ? 413 : 400,
      );
    return sourceErrorResponse(error);
  }
}
