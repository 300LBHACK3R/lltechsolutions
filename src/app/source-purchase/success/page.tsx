import Link from "next/link";
import SourcePurchaseStatus from "@/components/collection/SourcePurchaseStatus";
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
    <div className="container source-success">
      <p className="eyebrow">Your template purchase</p>
      <h1>Let’s get you started.</h1>
      {valid ? (
        <SourcePurchaseStatus sessionId={sessionId} />
      ) : (
        <>
          <p>
            Open the download link in your purchase email, or contact L&L if you need help locating
            your order.
          </p>
          <Link className="button button-gold" href="/contact">
            Contact L&L ↗
          </Link>
        </>
      )}
    </div>
  );
}
