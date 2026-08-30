# Security Policy

## Supported version

Security fixes are applied to the current production branch. Abandoned branches, local backups, and historical deployments are not supported.

## Reporting a vulnerability

Do not publish a suspected vulnerability in a public issue.

Send a concise report to **LandLTechSolutions@protonmail.com** with:

- the affected page or endpoint;
- clear reproduction steps;
- the observed security impact;
- relevant request or response details;
- supporting screenshots when useful; and
- your preferred contact information.

Please avoid including personal information, production credentials, or data belonging to another user.

## Good-faith testing boundaries

Do not perform denial-of-service testing, destructive actions, credential attacks, social engineering, persistence, spam, or testing that accesses more data than required to demonstrate the issue. Stop if sensitive information is encountered.

L&L Tech Solutions will acknowledge a credible report as soon as practical and prioritize remediation according to severity.

## Current controls

The production application uses HTTPS, browser-security headers, a Content Security Policy, restrictive framing and resource policies, server-side form validation, origin and Fetch Metadata checks, request-size limits, honeypot filtering, best-effort request throttling, dependency auditing, and automated build validation.

Security is an ongoing process; these controls reduce risk but do not guarantee that every vulnerability or third-party incident can be prevented.
