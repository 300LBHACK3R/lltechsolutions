"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPriceCad } from "@/data/template-promotion";

type Purchase = {
  status: "paid" | "pending";
  name?: string;
  reference?: string;
  priceCad?: number;
  totalCad?: number;
  ownerEmailStatus?: "sent" | "pending";
  buyerEmailStatus?: "sent" | "pending";
};

export default function ManagedPurchaseStatus({ sessionId }: { sessionId: string }) {
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    let active = true;
    async function verify() {
      setLoading(true);
      setMessage("");
      try {
        const response = await fetch(
          `/api/template-purchases/status?session_id=${encodeURIComponent(sessionId)}`,
          { signal: controller.signal, cache: "no-store" },
        );
        const result: Purchase & { message?: string } = await response.json();
        if (!response.ok || !["paid", "pending"].includes(result.status))
          throw new Error(
            result.message ??
              "We couldn’t verify your order in this browser. Check your purchase email or contact L&L for help.",
          );
        if (active) setPurchase(result);
      } catch (error) {
        if (active)
          setMessage(
            error instanceof Error && error.name !== "AbortError"
              ? error.message
              : "Payment verification took longer than expected. Please check again shortly.",
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
  }, [attempt, sessionId]);

  const paid = purchase?.status === "paid" && !message;
  const needsRefresh =
    !paid || purchase?.ownerEmailStatus !== "sent" || purchase?.buyerEmailStatus !== "sent";

  return (
    <div className="managed-purchase-status" aria-busy={loading}>
      <div role="status" aria-live="polite">
        {loading ? (
          <p>Checking your payment and project handover…</p>
        ) : message ? (
          <p>{message} Please don’t pay again while we check your existing order.</p>
        ) : paid ? (
          <>
            <h2>Your payment is confirmed.</h2>
            <dl className="managed-order-details">
              <div>
                <dt>Your website</dt>
                <dd>{purchase.name}</dd>
              </div>
              <div>
                <dt>Order reference</dt>
                <dd>{purchase.reference}</dd>
              </div>
              {typeof purchase.totalCad === "number" && Number.isFinite(purchase.totalCad) && (
                <div>
                  <dt>Paid, including applicable tax</dt>
                  <dd>{formatPriceCad(purchase.totalCad)}</dd>
                </div>
              )}
            </dl>
            <p>
              {purchase.ownerEmailStatus === "sent"
                ? "Your project details have been emailed to L&L. Tate will follow up to arrange your content handover and confirm the delivery plan."
                : "Your paid order and project details are saved. The notification to L&L is still pending; you can check again or contact us with your order reference."}
            </p>
            <p>
              {purchase.buyerEmailStatus === "sent"
                ? "Your confirmation has also been sent to the email address you supplied. Keep it for your records, and check your junk folder if it hasn’t appeared."
                : "Your confirmation email is still pending. Save your order reference here so we can help if it doesn’t arrive."}
            </p>
            <p>
              Gather your logo, approved website text and the photos or videos you want us to use.
              We’ll arrange how to share them. Extra pages, original media production and other
              additions are discussed and quoted separately before any extra work begins.
            </p>
          </>
        ) : (
          <p>
            Your payment has not been confirmed yet. Check again shortly; please don’t make a second
            payment.
          </p>
        )}
      </div>
      {!loading && needsRefresh && (
        <button
          type="button"
          className="button button-outline"
          onClick={() => setAttempt((value) => value + 1)}
        >
          Check again
        </button>
      )}
      <div className="managed-success-actions">
        <Link href="/contact" className="button button-gold">
          Contact L&L ↗
        </Link>
        <Link href="/website-collection" className="text-link">
          Back to the templates ↗
        </Link>
      </div>
    </div>
  );
}
