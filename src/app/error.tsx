"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route rendering failed", {
      name: error.name,
      digest: error.digest,
    });
  }, [error]);

  return (
    <section className="page-hero min-h-[70svh]">
      <div className="page-hero-blue-rail" />
      <div className="corporate-grid absolute inset-0 opacity-14" />
      <div className="page-hero-glow page-hero-glow-left" />
      <div className="premium-grain" />

      <div className="container-premium relative z-10 flex min-h-[70svh] items-center py-24">
        <div className="max-w-4xl">
          <p className="page-hero-eyebrow">Temporary Error</p>
          <h1 className="page-hero-title mt-10">
            Something interrupted this page.
            <span className="page-title-accent"> Let&apos;s try it again.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#dbe6f2]/62 md:text-lg">
            No information was submitted. Retry the page, or return to the
            homepage and continue from there.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={reset} className="btn-gold">
              Retry Page
            </button>
            <Link href="/" className="btn-blue-outline">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
