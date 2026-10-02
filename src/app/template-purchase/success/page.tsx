import Link from "next/link";
import ManagedPurchaseStatus from "@/components/collection/ManagedPurchaseStatus";
import { validSourceSessionId } from "@/lib/source-commerce-core";
import "@/styles/template-checkout.css";

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
    <div className="container managed-purchase-success">
      <p className="eyebrow">Your website, with L&L</p>
      <h1>The next step starts here.</h1>
      {validSourceSessionId(sessionId) ? (
        <ManagedPurchaseStatus sessionId={sessionId} />
      ) : (
        <>
          <p>
            Check your purchase confirmation email for your order details. If you need help, contact
            L&L with your order reference or the email address used for your purchase.
          </p>
          <Link className="button button-gold" href="/contact">
            Contact L&L ↗
          </Link>
        </>
      )}
    </div>
  );
}
