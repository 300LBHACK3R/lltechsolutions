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

  const paid = !loading && purchase?.status === "paid" && !message;
  const needsRefresh =
    !paid || purchase?.ownerEmailStatus !== "sent" || purchase?.buyerEmailStatus !== "sent";

  return (
    <div className="managed-purchase-status" aria-busy={loading}>
      <div className={paid ? "purchase-delivery-panel" : "purchase-delivery-message"}>
        <section className="purchase-delivery-order">
          <div role="status" aria-live="polite" aria-atomic="true">
            {loading ? (
              <>
                <p className="purchase-delivery-state">Verifying your order</p>
                <h2>One moment, please.</h2>
                <p>Checking your payment and project handover…</p>
              </>
            ) : message ? (
              <>
                <p className="purchase-delivery-state">Order assistance</p>
                <h2>Let’s check your purchase.</h2>
                <p>{message} Please don’t pay again while we check your existing order.</p>
              </>
            ) : paid ? (
              <>
                <p className="purchase-delivery-state">
                  <span aria-hidden="true">✓</span> Payment confirmed
                </p>
                <h2>
                  Thank you.
                  <br />
                  Let’s build your website.
                </h2>
              </>
            ) : (
              <>
                <p className="purchase-delivery-state">Awaiting confirmation</p>
                <h2>Your order is being checked.</h2>
                <p>
                  Your payment has not been confirmed yet. Check again shortly; please don’t make a
                  second payment.
                </p>
              </>
            )}
          </div>
          {paid && (
            <>
              <dl className="managed-order-details purchase-delivery-details">
                <div>
                  <dt>Your website</dt>
                  <dd>{purchase.name}</dd>
                </div>
                <div>
                  <dt>Your purchase</dt>
                  <dd>Personalize &amp; launch</dd>
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
              <p className="purchase-delivery-email">
                {purchase.ownerEmailStatus === "sent"
                  ? "Your project details have been emailed to L&L. Tate will follow up to arrange your content handover and confirm the delivery plan."
                  : "Your paid order and project details are saved. The notification to L&L is still pending; check again or contact us with your order reference."}
              </p>
              <p className="purchase-delivery-fineprint">
                {purchase.buyerEmailStatus === "sent"
                  ? "Your confirmation has also been sent to the email address you supplied. Keep it for your records, and check your junk folder if it hasn’t appeared."
                  : "Your confirmation email is still pending. Save your order reference here so we can help if it doesn’t arrive."}
              </p>
            </>
          )}
          {!loading && needsRefresh && (
            <button
              type="button"
              className="button button-outline"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Check again
            </button>
          )}
        </section>
        {paid && (
          <aside className="purchase-delivery-guide" aria-labelledby="managed-start-heading">
            <p className="eyebrow">From your design to launch</p>
            <h3 id="managed-start-heading">Here’s what comes next.</h3>
            <ol className="purchase-delivery-steps">
              <li>
                <div>
                  <h4>We connect</h4>
                  <p>
                    Tate reviews your brief with you and confirms the content handover, agreed scope
                    and delivery plan.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h4>We make it yours</h4>
                  <p>
                    Gather your logo, approved text and chosen photos or videos. We’ll arrange how
                    to share them and personalize your website.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h4>We review &amp; launch</h4>
                  <p>
                    We check the agreed pages, mobile layout, performance and technical SEO, then
                    coordinate your review and launch.
                  </p>
                </div>
              </li>
            </ol>
            <p className="purchase-delivery-scope">
              Extra pages, original photography or video, integrations and ongoing care are
              discussed and quoted separately before additional work begins.
            </p>
          </aside>
        )}
      </div>
      <footer className="purchase-delivery-support">
        <div>
          <h3>Your project, with a person behind it.</h3>
          <p>Reach Tate at L&L with your order reference whenever you need help.</p>
        </div>
        <nav aria-label="Order support">
          <Link href="/contact" className="text-link">
            Contact L&L <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/website-collection" className="text-link">
            Back to the templates <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
