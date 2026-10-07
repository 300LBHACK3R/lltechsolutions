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
        if (!response.ok || !["paid", "pending"].includes(result.status))
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

  const paid = !loading && !message && purchase?.status === "paid";
  const download = purchase?.downloadUrl?.startsWith("/api/source-purchases/download?token=")
    ? purchase.downloadUrl
    : null;
  return (
    <div className="source-purchase-status" aria-busy={loading}>
      <div className={paid ? "purchase-delivery-panel" : "purchase-delivery-message"}>
        <section className="purchase-delivery-order">
          <div role="status" aria-live="polite" aria-atomic="true">
            {loading ? (
              <>
                <p className="purchase-delivery-state">Verifying your order</p>
                <h2>One moment, please.</h2>
                <p>Checking your payment and preparing your purchase details…</p>
              </>
            ) : message ? (
              <>
                <p className="purchase-delivery-state">Order assistance</p>
                <h2>Let’s check your purchase.</h2>
                <p>{message}</p>
                <p>Please don’t make a second payment while we check your existing order.</p>
              </>
            ) : paid ? (
              <>
                <p className="purchase-delivery-state">
                  <span aria-hidden="true">✓</span> Payment confirmed
                </p>
                <h2>
                  Thank you.
                  <br />
                  {download ? "Your source files are ready." : "Your payment is confirmed."}
                </h2>
              </>
            ) : (
              <>
                <p className="purchase-delivery-state">Awaiting confirmation</p>
                <h2>Your order is being checked.</h2>
                <p>
                  Your payment hasn’t been confirmed yet. Check again shortly; please don’t make a
                  second payment.
                </p>
              </>
            )}
          </div>
          {paid && (
            <>
              <dl className="purchase-delivery-details">
                <div>
                  <dt>Your template</dt>
                  <dd>{purchase.name || "Your website template"}</dd>
                </div>
                <div>
                  <dt>Your purchase</dt>
                  <dd>Code-only ZIP download</dd>
                </div>
              </dl>
              {download ? (
                <a
                  className="button button-gold purchase-delivery-primary"
                  href={download}
                  rel="nofollow"
                >
                  Download your source ZIP <span aria-hidden="true">↓</span>
                </a>
              ) : (
                <p>
                  Check your purchase email for your private download link, or contact L&L for help.
                </p>
              )}
              <p className="purchase-delivery-fineprint">
                Your private download link lasts 30 days. Save the ZIP somewhere safe.
              </p>
              <p className="purchase-delivery-email">
                {purchase.emailStatus === "sent"
                  ? "A download link has also been sent to your checkout email address. Check your inbox and junk folder."
                  : download
                    ? "Your download email may still be on its way. You can save your files here without waiting for it."
                    : "Your download email may still be on its way. Contact L&L if you need help accessing your files."}
              </p>
            </>
          )}
          {!loading && !paid && (
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
          <aside className="purchase-delivery-guide" aria-labelledby="source-start-heading">
            <p className="eyebrow">From download to your website</p>
            <h3 id="source-start-heading">Your first three steps.</h3>
            <ol className="purchase-delivery-steps">
              <li>
                <div>
                  <h4>Save &amp; extract</h4>
                  <p>
                    Download the ZIP, keep a backup and extract it into a folder for your project.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h4>Start with the guide</h4>
                  <p>
                    Open README.md for installation, configuration and deployment instructions.
                    Review the included licence and asset notes.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h4>Make it your own</h4>
                  <p>
                    Add your content, configure any services you need and check your finished site
                    before launch.
                  </p>
                </div>
              </li>
            </ol>
            <p className="purchase-delivery-scope">
              This purchase includes source code and setup instructions. Personalization, hosting
              and ongoing care are separate.
            </p>
          </aside>
        )}
      </div>
      <footer className="purchase-delivery-support">
        <div>
          <h3>A real person, when you need one.</h3>
          <p>Contact L&L with the email address used for your purchase.</p>
        </div>
        <nav aria-label="Purchase support">
          <Link className="text-link" href="/contact">
            Contact L&L <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link" href="/website-collection">
            Back to the templates <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
