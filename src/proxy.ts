import { NextResponse } from "next/server";

export function proxy() {
  const res = NextResponse.next();

  // ---- Basic hardening ----
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // ---- CSP ----
  // In DEV, Next/Turbopack needs inline scripts and often eval.
  // In PROD, you can tighten this later using nonces/hashes.
  const isProd = process.env.NODE_ENV === "production";

  const csp = isProd
    ? [
        "default-src 'self'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "img-src 'self' data: blob:",
        "style-src 'self' 'unsafe-inline'",
        // NOTE: strict script-src in prod will require nonces/hashes for Next inline scripts.
        // Keep it relaxed until we implement nonces.
        "script-src 'self' 'unsafe-inline'",
        "connect-src 'self'",
        "form-action 'self' https://formspree.io mailto:",
        "upgrade-insecure-requests",
      ].join("; ")
    : [
        "default-src 'self'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "img-src 'self' data: blob:",
        "style-src 'self' 'unsafe-inline'",
        // Dev requirements
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "connect-src 'self' ws: wss:",
        "form-action 'self' https://formspree.io mailto:",
      ].join("; ");

  res.headers.set("Content-Security-Policy", csp);

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
