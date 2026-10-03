import assert from "node:assert/strict";
import test from "node:test";
import {
  auditException,
  evaluateDependencyAudit,
} from "../scripts/lib/dependency-audit-policy.mjs";

const active = new Date("2026-10-03T16:00:00Z");
const expires = new Date("2026-11-01T06:00:00Z");
const packages = [
  ["braces", "3.0.3"],
  ["micromatch", "4.0.8", "^3.0.3"],
  ["fast-glob", "3.3.1", "^4.0.4"],
  ["@next/eslint-plugin-next", "16.3.8", "3.3.1"],
  ["eslint-config-next", "16.3.8", "16.3.8"],
];

function fixture() {
  const lock = { packages: { "": { devDependencies: { "eslint-config-next": "16.3.8" } } } };
  const report = {
    auditReportVersion: 2,
    vulnerabilities: {},
    metadata: { vulnerabilities: { info: 0, low: 0, moderate: 0, high: 5, critical: 0, total: 5 } },
  };
  for (const [index, [name, version, range]] of packages.entries()) {
    const previous = packages[index - 1]?.[0];
    const next = packages[index + 1]?.[0];
    const node = `node_modules/${name}`;
    lock.packages[node] = {
      version,
      dev: true,
      dependencies: previous ? { [previous]: range } : {},
    };
    report.vulnerabilities[name] = {
      name,
      severity: "high",
      isDirect: index === packages.length - 1,
      range: "*",
      nodes: [node],
      effects: next ? [next] : [],
      via: previous
        ? [previous]
        : [
            {
              name,
              dependency: name,
              url: auditException.advisory,
              severity: "high",
              range: "<=3.0.3",
            },
          ],
    };
  }
  return { report, lock };
}

function evaluate({ report, lock }, now = active) {
  return evaluateDependencyAudit(report, lock, now);
}

test("accepts only the reviewed development risk before the exact Edmonton expiry", () => {
  const data = fixture();
  assert.equal(evaluate(data).accepted.length, 5);
  assert.equal(evaluate(data).ok, true);
  assert.equal(evaluate(data, new Date(expires.getTime() - 1)).ok, true);
  assert.equal(evaluate(data, expires).ok, false);
  assert.equal(evaluate(data, new Date("2027-01-01T00:00:00Z")).ok, false);
  assert.equal(evaluate(data, expires).accepted.length, 0);
});

test("a genuinely clean report passes after expiry without an exception", () => {
  const { report, lock } = fixture();
  report.vulnerabilities = {};
  report.metadata.vulnerabilities = {
    info: 0,
    low: 0,
    moderate: 0,
    high: 0,
    critical: 0,
    total: 0,
  };
  assert.deepEqual(evaluateDependencyAudit(report, lock, expires).accepted, []);
  assert.equal(evaluateDependencyAudit(report, lock, expires).ok, true);
});

test("does not accept another advisory, mixed cause or changed propagation", () => {
  for (const mutate of [
    (data) => {
      data.report.vulnerabilities.braces.via[0].url = "https://github.com/advisories/GHSA-other";
    },
    (data) => {
      data.report.vulnerabilities.braces.via.push({
        ...data.report.vulnerabilities.braces.via[0],
        url: "https://github.com/advisories/GHSA-other",
      });
    },
    (data) => {
      data.report.vulnerabilities.micromatch.via = ["fast-glob"];
    },
    (data) => {
      data.report.vulnerabilities.braces.effects = [];
    },
  ]) {
    const data = fixture();
    mutate(data);
    assert.equal(evaluate(data).ok, false);
    assert.equal(evaluate(data).accepted.length, 0);
  }
});

test("runtime exposure, version changes, nested copies and different dependency edges fail", () => {
  for (const mutate of [
    (data) => {
      data.lock.packages["node_modules/braces"].dev = false;
    },
    (data) => {
      delete data.lock.packages["node_modules/micromatch"].dev;
    },
    (data) => {
      data.lock.packages["node_modules/braces"].version = "3.0.4";
    },
    (data) => {
      data.lock.packages["node_modules/fast-glob"].dependencies.micromatch = "*";
    },
    (data) => {
      data.lock.packages[""].dependencies = { braces: "3.0.3" };
    },
    (data) => {
      data.lock.packages["node_modules/other/node_modules/braces"] = {
        version: "3.0.3",
        dev: false,
      };
    },
  ]) {
    const data = fixture();
    mutate(data);
    assert.equal(evaluate(data).ok, false);
  }
});

test("unrelated high and critical findings still block an otherwise approved exception", () => {
  for (const severity of ["high", "critical"]) {
    const data = fixture();
    data.lock.packages["node_modules/new-package"] = { version: "1.0.0", dev: true };
    data.report.vulnerabilities["new-package"] = {
      name: "new-package",
      severity,
      isDirect: false,
      range: "*",
      effects: [],
      nodes: ["node_modules/new-package"],
      via: [
        {
          name: "new-package",
          dependency: "new-package",
          url: "https://github.com/advisories/GHSA-other",
          severity,
          range: "*",
        },
      ],
    };
    data.report.metadata.vulnerabilities[severity] += 1;
    data.report.metadata.vulnerabilities.total += 1;
    assert.equal(evaluate(data).ok, false);
    assert.deepEqual(evaluate(data).blocked, ["new-package"]);
  }
});

test("fails closed on registry errors and malformed or contradictory reports", () => {
  for (const mutate of [
    (data) => {
      data.report.error = { message: "registry unavailable" };
    },
    (data) => {
      data.report.auditReportVersion = 1;
    },
    (data) => {
      data.report.vulnerabilities.braces.severity = "unknown";
    },
    (data) => {
      data.report.vulnerabilities.braces.via[0].severity = "critical";
    },
    (data) => {
      data.report.vulnerabilities.braces.nodes = [];
    },
    (data) => {
      data.report.vulnerabilities.braces.nodes = ["node_modules/missing"];
    },
    (data) => {
      data.report.vulnerabilities.braces.via = ["missing"];
    },
    (data) => {
      delete data.report.vulnerabilities.braces.via;
    },
    (data) => {
      data.report.metadata.vulnerabilities.high = 0;
    },
    (data) => {
      delete data.report.metadata;
    },
    (data) => {
      data.lock.packages = {};
    },
  ]) {
    const data = fixture();
    mutate(data);
    assert.throws(() => evaluate(data), /Invalid npm audit data/);
  }
  assert.throws(() => evaluate(fixture(), new Date("invalid")), /invalid evaluation time/);
});
