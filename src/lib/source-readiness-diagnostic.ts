import { SourceCommerceError, stripeKeyMode } from "./source-commerce-core.ts";

const configurationFields = [
  "SOURCE_CHECKOUT_ORIGIN",
  "STRIPE_SECRET_KEY",
  "VERCEL_ENV",
  "SOURCE_DOWNLOAD_SIGNING_SECRET",
  "SOURCE_S3_ENDPOINT",
  "SOURCE_S3_BUCKET",
  "SOURCE_S3_REGION",
  "SOURCE_S3_ACCESS_KEY_ID",
  "SOURCE_S3_SECRET_ACCESS_KEY",
  "SOURCE_DOWNLOADS_ENABLED",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "SOURCE_FROM_EMAIL",
  "SOURCE_STRIPE_AUTOMATIC_TAX",
] as const;
const configurationReasons = ["missing", "invalid", "disabled"] as const;

export type SourceConfigurationField = (typeof configurationFields)[number];
type ConfigurationReason = (typeof configurationReasons)[number];
type Environment = { nodeEnv?: string; vercelEnv?: string };

/** Internal detail only: public responses still use source_unavailable / 503. */
export class SourceConfigurationError extends SourceCommerceError {
  readonly field: SourceConfigurationField;
  readonly reason: ConfigurationReason;

  constructor(field: SourceConfigurationField, reason: ConfigurationReason) {
    super("source_unavailable", 503);
    this.name = "SourceConfigurationError";
    this.field = field;
    this.reason = reason;
  }
}

/** Called only after the existing environment guard rejects the configuration. */
export function sourceEnvironmentFailureField(options: {
  origin: string;
  stripeKey: string;
}): SourceConfigurationField {
  if (stripeKeyMode(options.stripeKey) !== "live") return "STRIPE_SECRET_KEY";
  if (options.origin !== "https://lltechsolutions.ca") return "SOURCE_CHECKOUT_ORIGIN";
  return "VERCEL_ENV";
}

export function createSourceReadinessReporter({
  log = (line: string) => console.error(line),
  now = Date.now,
} = {}) {
  // Keys are limited to the static allowlists below; no request or secret data is retained.
  const lastReported = new Map<string, number>();
  return (error: unknown, environment: Environment) => {
    if (environment.vercelEnv !== "production" && environment.nodeEnv !== "production") return;
    try {
      const known =
        error instanceof SourceConfigurationError &&
        configurationFields.includes(error.field) &&
        configurationReasons.includes(error.reason);
      const diagnostic = known
        ? { field: error.field, reason: error.reason }
        : { field: "SOURCE_CONFIGURATION", reason: "unexpected" };
      const key = `${diagnostic.field}:${diagnostic.reason}`;
      const timestamp = now();
      const previous = lastReported.get(key);
      if (previous !== undefined && timestamp - previous < 60_000) return;
      lastReported.set(key, timestamp);
      log(`[source-readiness] ${JSON.stringify(diagnostic)}`);
    } catch {
      // Diagnostics must never change checkout readiness or expose the original error.
    }
  };
}

export const reportSourceReadiness = createSourceReadinessReporter();
