"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <p className="eyebrow">Something went wrong</p>
        <h1>This page could not load.</h1>
        <p className="intro-description">
          Please try again, or contact us directly if the issue continues.
        </p>
        <div className="button-row">
          <button className="button button-gold" onClick={reset}>
            Try again
          </button>
          <Link href="/contact" className="text-link">
            Contact L&L →
          </Link>
        </div>
      </div>
    </section>
  );
}
