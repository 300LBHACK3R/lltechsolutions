import {
  sourceRequestHostAllowed,
  sourceRateLimited,
  sourceResponse,
  sourceErrorResponse,
  sourcePurchaseStatus,
} from "@/lib/source-commerce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: Request) {
  if (!sourceRequestHostAllowed(request))
    return sourceResponse({ message: "Use your L&L purchase confirmation link." }, 403);
  if (sourceRateLimited(request, "status"))
    return sourceResponse({ message: "Please wait a few minutes before trying again." }, 429);
  try {
    return await sourcePurchaseStatus(
      request,
      new URL(request.url).searchParams.get("session_id") ?? "",
    );
  } catch (error) {
    return sourceErrorResponse(error);
  }
}
