const stages = ["storage_head", "archive_metadata", "stripe_checkout"] as const;
const categories = [
  "AccessDenied",
  "InvalidAccessKeyId",
  "SignatureDoesNotMatch",
  "NotFound",
  "NoSuchKey",
  "NoSuchBucket",
  "AuthorizationHeaderMalformed",
  "InvalidArgument",
  "CredentialsProviderError",
  "TimeoutError",
  "AbortError",
  "ECONNRESET",
  "ETIMEDOUT",
  "ENOTFOUND",
  "StripeAuthenticationError",
  "StripePermissionError",
  "StripeInvalidRequestError",
  "StripeAPIError",
  "StripeConnectionError",
  "StripeRateLimitError",
  "size_mismatch",
  "checksum_mismatch",
  "content_type_mismatch",
] as const;

type Stage = (typeof stages)[number];
type Environment = { nodeEnv?: string; vercelEnv?: string };

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

/** Private, bounded diagnostics. Never serialize provider errors or request data. */
export function createSourceProviderReporter({
  log = (line: string) => console.error(line),
  now = Date.now,
} = {}) {
  const lastReported = new Map<string, number>();
  return (stage: Stage, error: unknown, environment: Environment) => {
    if (environment.vercelEnv !== "production" && environment.nodeEnv !== "production") return;
    try {
      const detail = record(error);
      const candidates = [detail.Code, detail.code, detail.type, detail.name];
      const category = categories.find((value) => candidates.includes(value)) ?? "unexpected";
      const safeStage = stages.includes(stage) ? stage : "provider";
      const status = record(detail.$metadata).httpStatusCode ?? detail.statusCode;
      const diagnostic = {
        stage: safeStage,
        category,
        ...(typeof status === "number" && Number.isInteger(status) && status >= 100 && status <= 599
          ? { status }
          : {}),
      };
      // The key space is limited to the static allowlists, even for malformed errors.
      const key = `${safeStage}:${category}`;
      const timestamp = now();
      const previous = lastReported.get(key);
      if (previous !== undefined && timestamp - previous < 60_000) return;
      lastReported.set(key, timestamp);
      log(`[source-provider] ${JSON.stringify(diagnostic)}`);
    } catch {
      // A diagnostic failure must never change payment or download behavior.
    }
  };
}

export const reportSourceProvider = createSourceProviderReporter();
