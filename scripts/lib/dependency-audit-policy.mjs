export const auditException = Object.freeze({
  advisory: "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm",
  expiresAt: "2026-11-01T06:00:00Z",
});

const chain = [
  { name: "braces", version: "3.0.3" },
  { name: "micromatch", version: "4.0.8", dependencyRange: "^3.0.3" },
  { name: "fast-glob", version: "3.3.1", dependencyRange: "^4.0.4" },
  { name: "@next/eslint-plugin-next", version: "16.3.8", dependencyRange: "3.3.1" },
  { name: "eslint-config-next", version: "16.3.8", dependencyRange: "16.3.8" },
];
const severities = ["info", "low", "moderate", "high", "critical"];
const record = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const strings = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === "string" && item.length > 0);
const sameList = (actual, expected) =>
  actual.length === expected.length && actual.every((item, index) => item === expected[index]);

function requireValid(condition, message) {
  if (!condition) throw new Error(`Invalid npm audit data: ${message}`);
}

function validateReport(report, lock) {
  requireValid(record(report) && !report.error, "missing report or registry error");
  requireValid(report.auditReportVersion === 2, "unsupported report version");
  requireValid(record(report.vulnerabilities), "missing vulnerability records");
  requireValid(record(lock?.packages) && record(lock.packages[""]), "missing lockfile packages");
  const counts = Object.fromEntries(severities.map((severity) => [severity, 0]));
  for (const [name, finding] of Object.entries(report.vulnerabilities)) {
    requireValid(record(finding) && finding.name === name, "invalid package name");
    requireValid(severities.includes(finding.severity), `unknown severity for ${name}`);
    requireValid(typeof finding.isDirect === "boolean", `invalid direct flag for ${name}`);
    requireValid(typeof finding.range === "string", `missing range for ${name}`);
    requireValid(strings(finding.nodes) && finding.nodes.length > 0, `missing nodes for ${name}`);
    requireValid(
      new Set(finding.nodes).size === finding.nodes.length &&
        finding.nodes.every((node) => record(lock.packages[node])),
      `unknown or duplicate affected node for ${name}`,
    );
    requireValid(strings(finding.effects), `invalid effects for ${name}`);
    requireValid(Array.isArray(finding.via) && finding.via.length > 0, `missing cause for ${name}`);
    for (const via of finding.via) {
      if (typeof via === "string") {
        requireValid(record(report.vulnerabilities[via]), `unresolved cause ${via}`);
      } else {
        requireValid(
          record(via) &&
            typeof via.name === "string" &&
            typeof via.dependency === "string" &&
            typeof via.url === "string" &&
            via.url.startsWith("https://") &&
            typeof via.range === "string" &&
            severities.includes(via.severity),
          `malformed advisory for ${name}`,
        );
        requireValid(
          severities.indexOf(via.severity) <= severities.indexOf(finding.severity),
          `understated severity for ${name}`,
        );
      }
    }
    counts[finding.severity] += 1;
  }
  const reportedCounts = report.metadata?.vulnerabilities;
  requireValid(record(reportedCounts), "missing vulnerability totals");
  for (const severity of severities) {
    requireValid(reportedCounts[severity] === counts[severity], `inconsistent ${severity} count`);
  }
  requireValid(
    reportedCounts.total === Object.keys(report.vulnerabilities).length,
    "inconsistent total count",
  );
  return counts;
}

function matchesApprovedChain(report, lock) {
  const root = lock.packages[""];
  if (root.devDependencies?.["eslint-config-next"] !== "16.3.8") return false;
  return chain.every(({ name, version, dependencyRange }, index) => {
    const node = `node_modules/${name}`;
    const pkg = lock.packages[node];
    const finding = report.vulnerabilities[name];
    if (
      !pkg ||
      pkg.version !== version ||
      pkg.dev !== true ||
      root.dependencies?.[name] !== undefined ||
      !finding ||
      finding.severity !== "high" ||
      finding.isDirect !== (index === chain.length - 1) ||
      !sameList(finding.nodes, [node]) ||
      !sameList(finding.effects, index + 1 < chain.length ? [chain[index + 1].name] : []) ||
      finding.via.length !== 1
    ) {
      return false;
    }
    if (
      Object.keys(lock.packages).some(
        (key) => key !== node && key.endsWith(`/node_modules/${name}`),
      )
    ) {
      return false;
    }
    if (index > 0) {
      const dependency = chain[index - 1].name;
      return pkg.dependencies?.[dependency] === dependencyRange && finding.via[0] === dependency;
    }
    const advisory = finding.via[0];
    return (
      record(advisory) &&
      advisory.url === auditException.advisory &&
      advisory.name === "braces" &&
      advisory.dependency === "braces" &&
      advisory.severity === "high" &&
      advisory.range === "<=3.0.3"
    );
  });
}

// The runner supplies the real current time. Tests inject time only into this pure policy.
export function evaluateDependencyAudit(report, lock, now = new Date()) {
  const counts = validateReport(report, lock);
  requireValid(now instanceof Date && Number.isFinite(now.getTime()), "invalid evaluation time");
  const blocking = Object.values(report.vulnerabilities).filter(
    (finding) => finding.severity === "high" || finding.severity === "critical",
  );
  if (blocking.length === 0) return { ok: true, accepted: [], blocked: [], counts };
  const active = now.getTime() < Date.parse(auditException.expiresAt);
  const approved = active && matchesApprovedChain(report, lock);
  const accepted = approved ? chain.map(({ name }) => name) : [];
  const blocked = blocking.map(({ name }) => name).filter((name) => !accepted.includes(name));
  return { ok: blocked.length === 0, accepted, blocked, counts, expired: !active };
}
