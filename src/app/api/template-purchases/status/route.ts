import {
  managedRequestHostAllowed,
  managedRateLimited,
  managedResponse,
  managedErrorResponse,
  managedPurchaseStatus,
} from "@/lib/managed-commerce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: Request) {
  if (!managedRequestHostAllowed(request))
    return managedResponse({ message: "Use your L&L order confirmation link." }, 403);
  if (managedRateLimited(request, "status"))
    return managedResponse({ message: "Please wait a few minutes before trying again." }, 429);
  try {
    return await managedPurchaseStatus(
      request,
      new URL(request.url).searchParams.get("session_id") ?? "",
    );
  } catch (error) {
    return managedErrorResponse(error);
  }
}
