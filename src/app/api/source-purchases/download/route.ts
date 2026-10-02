import {
  sourceRequestHostAllowed,
  sourceRateLimited,
  sourceResponse,
  sourceErrorResponse,
  sourceDownload,
} from "@/lib/source-commerce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: Request) {
  if (!sourceRequestHostAllowed(request))
    return sourceResponse({ message: "Use your private L&L download link." }, 403);
  if (sourceRateLimited(request, "download"))
    return sourceResponse({ message: "Please wait a few minutes before trying again." }, 429);
  try {
    return await sourceDownload(new URL(request.url).searchParams.get("token") ?? "");
  } catch (error) {
    return sourceErrorResponse(error);
  }
}
