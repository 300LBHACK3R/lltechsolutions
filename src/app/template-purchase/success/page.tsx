import Link from "next/link";
import ManagedPurchaseStatus from "@/components/collection/ManagedPurchaseStatus";
import SignalArtwork from "@/components/ui/SignalArtwork";
import { validSourceSessionId } from "@/lib/source-commerce-core";
import "@/styles/template-purchase.css";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Your website purchase | L&L Tech Solutions",
  robots: { index: false, follow: false },
};

export default async function ManagedPurchaseSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  return (
    <div className="container managed-purchase-success purchase-delivery">
      <header className="purchase-delivery-heading signal-surface signal-surface-quiet">
        <SignalArtwork className="surface-signals" />
        <p className="eyebrow">Your website, with L&L</p>
        <h1>
          Your next chapter.<span>Built together.</span>
        </h1>
        <p>Your order details and the next steps for making this website your own.</p>
      </header>
      {validSourceSessionId(sessionId) ? (
        <ManagedPurchaseStatus key={sessionId} sessionId={sessionId} />
      ) : (
        <section className="purchase-delivery-message">
          <p className="eyebrow">Find your order</p>
          <h2>Let’s get you connected.</h2>
          <p>
            Check your purchase confirmation email for your order details. If you need help, contact
            L&L with your order reference or the email address used for your purchase.
          </p>
          <Link className="button button-gold" href="/contact">
            Contact L&L ↗
          </Link>
        </section>
      )}
    </div>
  );
}
