import { createHash } from "node:crypto";

export const MAX_BODY_BYTES = 16_384;
const windowMs = 10 * 60 * 1000;
const attempts = new Map<string, { count: number; expires: number }>();

/** Best effort, per-instance limit. Use a shared store or WAF rule for global enforcement. */
export function isRateLimited(request: Request, now = Date.now()) {
  const address =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const key = createHash("sha256").update(address).digest("hex");
  for (const [ip, entry] of attempts) if (entry.expires <= now) attempts.delete(ip);
  const current = attempts.get(key);
  if (current) {
    current.count += 1;
    return current.count > 5;
  }
  if (attempts.size >= 1000) return true;
  attempts.set(key, { count: 1, expires: now + windowMs });
  return false;
}

export function hasTrustedOrigin(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  // Next may normalize the internal request URL to localhost behind a proxy.
  // Host remains the browser-requested authority; the hosting boundary must validate it.
  const expected = new URL(request.url);
  const host = request.headers.get("host");
  if (host) expected.host = host;
  return origin === expected.origin;
}

export async function readLimitedJson(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES)
    throw new RangeError("Body too large");
  if (!request.body) throw new SyntaxError("Empty body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
