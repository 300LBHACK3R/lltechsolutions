import { NextResponse } from "next/server";

export function proxy() {
  const res = NextResponse.next();

  // ---- Basic hardening ----
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  // ---- CSP ----
  const isProd = process.env.NODE_ENV === "production";

  const csp = isProd
    ? [
        "default-src 'self'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "img-src 'self' data: blob:",
        "style-src 'self' 'unsafe-inline'",
        // Keep relaxed until you implement nonces/hashes
        "script-src 'self' 'unsafe-inline'",
        // ✅ allow Formspree fetch/XHR
        "connect-src 'self' https://formspree.io https://api.formspree.io",
        // ✅ allow posting the form + mailto fallback
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
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        // ✅ dev websockets + Formspree
        "connect-src 'self' ws: wss: https://formspree.io https://api.formspree.io",
        "form-action 'self' https://formspree.io mailto:",
      ].join("; ");

  res.headers.set("Content-Security-Policy", csp);

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
