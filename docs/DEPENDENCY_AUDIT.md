# Dependency audit

The project runs a real `npm audit --json --audit-level=high` and evaluates its report with
`scripts/audit-dependencies.mjs`. Registry failures, invalid JSON, malformed reports, unknown
severities and inconsistent exit statuses remain failures. Low and moderate findings remain
visible but do not fail the existing high-severity threshold.

## Temporary approved exception

On October 3, 2026, the owner approved a temporary exception for
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), a stack-exhaustion denial of
service in `braces` when processing deeply nested patterns. At review, the official advisory
listed no patched version and npm's latest `braces` release was 3.0.3.

The exception ends **at the start of November 1, 2026 in Edmonton**, exactly
**2026-11-01T06:00:00Z**. The runner uses the current system time; it has no command-line or
environment option to extend the exception. After expiry, the finding fails the gate if it
remains. A clean audit still passes after expiry.

Only this exact, pre-existing development dependency chain is accepted:

| Package                  | Version |
| ------------------------ | ------- |
| braces                   | 3.0.3   |
| micromatch               | 4.0.8   |
| fast-glob                | 3.3.1   |
| @next/eslint-plugin-next | 16.3.8  |
| eslint-config-next       | 16.3.8  |

Every affected lockfile entry must remain `dev: true`, at its approved path and version, with
the expected dependency links and no duplicate installation of these packages. The report
must identify only the approved advisory and the exact four upstream propagated findings.
Another advisory on the same package, a new high/critical finding, changed dependency chain
or a runtime-affected node is not covered.

This is **acceptance of a known development-tool risk**, not a claim of zero vulnerabilities.
Do not supply untrusted glob patterns to the lint toolchain. Do not use `npm audit fix --force`
to downgrade the Next.js ESLint configuration to an incompatible major version. Keep reviewing
the upstream fix; remove the exception when a compatible update is available and validated.

The production-only audit (`npm audit --omit=dev --audit-level=high`) was clean at this review.
It is useful additional evidence, not a replacement for the full gate. The gate never omits
development dependencies or suppresses registry errors.
