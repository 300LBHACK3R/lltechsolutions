import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { auditException, evaluateDependencyAudit } from "./lib/dependency-audit-policy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

try {
  // npm run supplies npm_execpath on Windows, macOS and Linux. Avoid shell quoting of .cmd files.
  const npmCli = process.env.npm_execpath;
  if (!npmCli) throw new Error("Run this check through the project's npm audit script.");
  const result = spawnSync(process.execPath, [npmCli, "audit", "--json", "--audit-level=high"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
    timeout: 120_000,
  });
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) throw result.error;
  if (result.signal || ![0, 1].includes(result.status)) {
    throw new Error(`npm audit failed (${result.signal ?? result.status ?? "no exit status"}).`);
  }
  const report = JSON.parse(result.stdout);
  const lock = JSON.parse(await readFile(resolve(root, "package-lock.json"), "utf8"));
  const policy = evaluateDependencyAudit(report, lock);
  const expectedStatus = policy.counts.high + policy.counts.critical > 0 ? 1 : 0;
  if (result.status !== expectedStatus) {
    throw new Error(
      "npm audit exit status does not match its report; refusing to waive the failure.",
    );
  }
  if (policy.accepted.length > 0) {
    console.warn(
      `ACCEPTED TEMPORARY DEVELOPMENT RISK: GHSA-vfj7-8cjw-p6xm and its four propagated findings.\n` +
        `Exact approved development chain only; exception expires ${auditException.expiresAt}.\n` +
        "This is not a zero-vulnerability audit. See docs/DEPENDENCY_AUDIT.md.",
    );
  }
  if (!policy.ok) {
    console.error(`FAIL: unaccepted high/critical findings: ${policy.blocked.join(", ")}.`);
    if (policy.expired) console.error("The approved development-only exception has expired.");
    process.exitCode = 1;
  } else {
    console.log(
      policy.accepted.length > 0
        ? "PASS: no other high/critical findings; the approved temporary exception was applied."
        : "PASS: no high/critical dependency findings.",
    );
    console.log(
      `Reported: ${policy.counts.critical} critical, ${policy.counts.high} high, ` +
        `${policy.counts.moderate} moderate, ${policy.counts.low} low, ${policy.counts.info} info.`,
    );
  }
} catch (error) {
  console.error(`FAIL: dependency audit could not be accepted. ${error.message}`);
  process.exitCode = 1;
}
