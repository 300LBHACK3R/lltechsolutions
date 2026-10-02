import {
  handleManagedWebhook,
  managedResponse,
  managedErrorResponse,
} from "@/lib/managed-commerce";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 262_144)
    return managedResponse({ message: "Request too large." }, 413);
  if (!request.body) return managedResponse({ message: "Missing event." }, 400);
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
        return managedResponse({ message: "Request too large." }, 413);
      }
      chunks.push(value);
    }
    return await handleManagedWebhook(
      Buffer.concat(chunks).toString("utf8"),
      request.headers.get("stripe-signature"),
    );
  } catch (error) {
    return managedErrorResponse(error);
  } finally {
    reader.releaseLock();
  }
}
