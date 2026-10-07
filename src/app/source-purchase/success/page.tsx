import Link from "next/link";
import SourcePurchaseStatus from "@/components/collection/SourcePurchaseStatus";
import SignalArtwork from "@/components/ui/SignalArtwork";
import "@/styles/template-purchase.css";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Your template download | L&L Tech Solutions",
  robots: { index: false, follow: false },
};

export default async function PurchaseSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const valid =
    typeof sessionId === "string" && /^cs_(test_|live_)?[A-Za-z0-9]{8,240}$/.test(sessionId);
  return (
    <div className="container source-success purchase-delivery">
      <header className="purchase-delivery-heading signal-surface signal-surface-quiet">
        <SignalArtwork className="surface-signals" />
        <p className="eyebrow">Your template purchase</p>
        <h1>
          A strong start.<span>Made yours.</span>
        </h1>
        <p>Your purchase, your files and a clear path to getting started.</p>
      </header>
      {valid ? (
        <SourcePurchaseStatus key={sessionId} sessionId={sessionId} />
      ) : (
        <section className="purchase-delivery-message">
          <p className="eyebrow">Find your order</p>
          <h2>Let’s find your download.</h2>
          <p>
            Open the download link in your purchase email, or contact L&L if you need help locating
            your order.
          </p>
          <Link className="button button-gold" href="/contact">
            Contact L&L ↗
          </Link>
        </section>
      )}
    </div>
  );
}
