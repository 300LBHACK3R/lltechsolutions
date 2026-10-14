const stages = [
  "storage_head",
  "storage_config",
  "storage_probe",
  "archive_metadata",
  "stripe_checkout",
] as const;
const categories = [
  "BadRequest",
  "InvalidRequest",
  "Unauthorized",
  "InvalidBucketName",
  "InvalidObjectName",
  "ExpiredRequest",
  "RequestTimeTooSkewed",
  "NotEntitled",
  "NotImplemented",
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
  "endpoint_format",
  "region_format",
  "access_key_format",
  "secret_key_format",
  "format_valid",
  "object_found",
  "object_missing",
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

type StorageSettings = {
  endpoint?: string;
  region: string;
  accessKey: string;
  secretKey: string;
};

/** HEAD errors have no response body. A narrow list can reveal R2's error code.
 * This diagnostic never authorizes a purchase or replaces archive verification.
 */
export function createSourceStorageProbe({ report = reportSourceProvider, now = Date.now } = {}) {
  let nextProbeAt = 0;
  return async ({
    error,
    settings,
    environment,
    read,
  }: {
    error: unknown;
    settings: StorageSettings;
    environment: Environment;
    read: (signal: AbortSignal) => Promise<"object_found" | "object_missing">;
  }) => {
    try {
      if (
        environment.vercelEnv !== "production" ||
        record(record(error).$metadata).httpStatusCode !== 400 ||
        !settings.endpoint
      )
        return;
      const endpoint = new URL(settings.endpoint);
      // Do not add R2-specific requests or credential assumptions for other S3 providers.
      if (!endpoint.hostname.endsWith(".r2.cloudflarestorage.com")) return;
      const timestamp = now();
      if (timestamp < nextProbeAt) return;
      // Reserve before awaiting: concurrent failures cannot start concurrent probes.
      nextProbeAt = timestamp + 60_000;
      const checks = [
        [
          "endpoint_format",
          endpoint.protocol === "https:" &&
            /^[a-f0-9]{32}(?:\.(?:eu|us|fedramp))?\.r2\.cloudflarestorage\.com$/.test(
              endpoint.hostname,
            ) &&
            endpoint.pathname === "/" &&
            !endpoint.username &&
            !endpoint.password &&
            !endpoint.port &&
            !endpoint.search &&
            !endpoint.hash,
        ],
        ["region_format", ["auto", "us-east-1"].includes(settings.region)],
        ["access_key_format", /^[a-f0-9]{32}$/i.test(settings.accessKey)],
        ["secret_key_format", /^[a-f0-9]{64}$/i.test(settings.secretKey)],
      ] as const;
      const failures = checks.filter(([, valid]) => !valid);
      for (const [name] of failures) report("storage_config", { name }, environment);
      if (failures.length) return;
      report("storage_config", { name: "format_valid" }, environment);
      try {
        const name = await read(AbortSignal.timeout(5000));
        report("storage_probe", { name, statusCode: 200 }, environment);
      } catch (detail) {
        report("storage_probe", detail, environment);
      }
    } catch {
      // Diagnostics must preserve the original failure even if a getter/logger throws.
    }
  };
}

export const probeSourceStorageFailure = createSourceStorageProbe();
