import { handleSourceWebhook, sourceResponse, sourceErrorResponse } from "@/lib/source-commerce";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  // Preserve exact raw bytes for Stripe's timestamped signature verification.
  if (Number(request.headers.get("content-length") ?? 0) > 262_144)
    return sourceResponse({ message: "Request too large." }, 413);
  if (!request.body) return sourceResponse({ message: "Missing event." }, 400);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 262_144) {
        await reader.cancel();
        return sourceResponse({ message: "Request too large." }, 413);
      }
      chunks.push(value);
    }
    return await handleSourceWebhook(
      Buffer.concat(chunks).toString("utf8"),
      request.headers.get("stripe-signature"),
    );
  } catch (error) {
    return sourceErrorResponse(error);
  } finally {
    reader.releaseLock();
  }
}
