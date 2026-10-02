import Link from "next/link";
import { sourceHref, sourceProduct } from "@/data/source-products";
import { formatPriceCad } from "@/data/template-promotion";

export default function TemplatePurchaseOptions({
  designId,
  compact = false,
}: {
  designId: string;
  compact?: boolean;
}) {
  const product = sourceProduct(designId);
  if (!product) return null;

  return (
    <div className={`template-source-option${compact ? " template-source-option--compact" : ""}`}>
      <Link
        className="template-source-link"
        href={sourceHref(designId)}
        aria-label={`Download source code for ${product.name} — ${formatPriceCad(product.priceCad)}`}
      >
        <span>
          Download source code <span aria-hidden="true">↗</span>
        </span>
        <strong>{formatPriceCad(product.priceCad)}</strong>
      </Link>
      {compact ? (
        <p>DIY files · One-time purchase</p>
      ) : (
        <>
          <p>Prefer to build it yourself? Get the template files and setup guide.</p>
          <details className="template-source-disclosure">
            <summary>What’s different about code only?</summary>
            <p>
              A license for one business website. You handle the content, customization, hosting and
              launch. Personalization, email setup and ongoing maintenance are not included. The
              download price is separate from the personalization and launch offer above.
            </p>
          </details>
        </>
      )}
    </div>
  );
}
