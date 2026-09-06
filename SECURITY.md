# Security

Report concerns to LandLTechSolutions@protonmail.com with the affected URL and non-sensitive reproduction details. Do not publish credentials or personal information in an issue.

## Controls

Production headers are centralized in `next.config.ts`. The old proxy was removed because it duplicated and conflicted with those headers. Production does not permit `unsafe-eval`. Static Next.js bootstrap scripts still require the documented `unsafe-inline` script allowance; this release does not claim nonce-based CSP protection. Moving to nonces requires a separate rendering/caching decision.

Inquiry requests require an exact same-origin Origin header and reject cross-site Fetch Metadata, non-JSON content, oversized streamed bodies, invalid field types/lengths, invalid email/website values and unknown service/timeline selections. The honeypot is separate from validation. Responses are no-store and noindex, with request IDs for non-sensitive diagnostics.

Throttling is bounded and per-process, not a durable distributed rate limiter. Vercel/proxy forwarding headers must be trusted at the hosting boundary. Configure a WAF rule or shared rate store if traffic requires stronger enforcement.

HTTPS redirection is provided by production hosting. HSTS is set in production without opting unrelated subdomains into HSTS. Verify the deployed domain redirects before launch.

Secrets belong in `.env.local` or Vercel environment settings. Only the blank `.env.example` is committed. The smoke test explicitly removes the email key from its child server; successful inbox delivery requires a separate authorized test.
