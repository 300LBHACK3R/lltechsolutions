"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Purchase = {
  status: "paid" | "pending";
  designId?: string;
  name?: string;
  downloadUrl?: string;
  emailStatus?: string;
};

export default function SourcePurchaseStatus({ sessionId }: { sessionId: string }) {
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [message, setMessage] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    let active = true;
    async function verify() {
      setLoading(true);
      setMessage("");
      try {
        const response = await fetch(
          `/api/source-purchases/status?session_id=${encodeURIComponent(sessionId)}`,
          { signal: controller.signal, cache: "no-store" },
        );
        const result: Purchase & { message?: string } = await response.json();
        if (!response.ok)
          throw new Error(
            result.message ??
              "We couldn’t verify the purchase in this browser. Please check your email for your download link or contact L&L.",
          );
        if (active) setPurchase(result);
      } catch (error) {
        if (active)
          setMessage(
            error instanceof Error && error.name !== "AbortError"
              ? error.message
              : "Verification took longer than expected. Please try again or check your email.",
          );
      } finally {
        window.clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }
    void verify();
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [sessionId, attempt]);

  const download = purchase?.downloadUrl?.startsWith("/api/source-purchases/download?token=")
    ? purchase.downloadUrl
    : null;
  return (
    <div className="source-purchase-status" aria-busy={loading}>
      <div role="status" aria-live="polite">
        {loading ? (
          <p>Checking your payment…</p>
        ) : message ? (
          <p>{message}</p>
        ) : purchase?.status === "paid" ? (
          <>
            <h2>Your source files are ready.</h2>
            <p>{purchase.name}</p>
            <p>
              Save your ZIP and read the included setup guide before getting started. Your download
              link lasts 30 days.
            </p>
            <p>
              {purchase.emailStatus === "sent"
                ? "A download link has also been sent to your checkout email address."
                : "If your download email has not arrived yet, check your junk folder. You can save your files using the button below."}
            </p>
          </>
        ) : (
          <p>
            Your payment hasn’t been confirmed yet. Check again shortly; please don’t make a second
            payment.
          </p>
        )}
      </div>
      {download && purchase?.status === "paid" && (
        <a className="button button-gold" href={download} rel="nofollow">
          Download your source ZIP ↓
        </a>
      )}
      {!loading && (!purchase || purchase.status !== "paid") && (
        <button className="button button-outline" onClick={() => setAttempt((value) => value + 1)}>
          Check again
        </button>
      )}
      <div className="button-row">
        <Link className="text-link" href="/contact">
          Need help? Contact L&L ↗
        </Link>
        <Link className="text-link" href="/website-collection">
          Back to the templates ↗
        </Link>
      </div>
    </div>
  );
}
