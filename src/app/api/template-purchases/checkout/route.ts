import { parseManagedCheckout } from "@/lib/managed-commerce-core";
import { readLimitedJson } from "@/lib/contact-security";
import {
  createManagedCheckout,
  isManagedCheckoutConfigured,
  managedRequestOriginAllowed,
  managedRateLimited,
  managedResponse,
  managedErrorResponse,
} from "@/lib/managed-commerce";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  if (!isManagedCheckoutConfigured())
    return managedResponse(
      {
        message:
          "Online template checkout is not open yet. Ask L&L to arrange your website project.",
      },
      503,
    );
  if (!managedRequestOriginAllowed(request))
    return managedResponse({ message: "Please begin your purchase on the L&L website." }, 403);
  if (
    request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json"
  )
    return managedResponse({ message: "Please send a JSON request." }, 415);
  if (managedRateLimited(request, "checkout"))
    return managedResponse({ message: "Please wait a few minutes before trying again." }, 429);
  try {
    return await createManagedCheckout(parseManagedCheckout(await readLimitedJson(request)));
  } catch (error) {
    if (error instanceof RangeError || error instanceof SyntaxError)
      return managedResponse(
        { message: "Please send a valid project brief." },
        error instanceof RangeError ? 413 : 400,
      );
    return managedErrorResponse(error);
  }
}
