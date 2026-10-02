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
  const price = formatPriceCad(product.priceCad);

  return (
    <div className={`template-source-option${compact ? " template-source-option--compact" : ""}`}>
      <p className="template-purchase-label">Code only</p>
      <Link
        className="template-code-button"
        href={sourceHref(designId)}
        aria-label={`Purchase ${product.name} source code — ${price}`}
      >
        <span>Purchase</span>
        <strong>{price}</strong>
      </Link>
      <p>
        Editable code + setup instructions. A secure ZIP download link is emailed automatically
        after verified payment. You customize and launch.
      </p>
      {product.editionNote && <p>{product.editionNote}</p>}
      {!compact && (
        <details className="template-source-disclosure">
          <summary>What’s different about code only?</summary>
          <p>
            The lower price covers the template files and a licence for one business website. L&L
            personalization, launch checks, hosting, email setup and ongoing maintenance are not
            included.
          </p>
        </details>
      )}
    </div>
  );
}
