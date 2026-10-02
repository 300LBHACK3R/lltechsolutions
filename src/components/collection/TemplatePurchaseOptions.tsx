import Link from "next/link";
import { sourceHref, sourceProduct } from "@/data/source-products";
import { formatPriceCad } from "@/data/template-promotion";
import { websiteDesigns } from "@/data/website-collection";

export default function TemplatePurchaseOptions({
  designId,
  compact = false,
}: {
  designId: string;
  compact?: boolean;
}) {
  const product = sourceProduct(designId);
  if (!product) {
    const design = websiteDesigns.find((item) => item.id === designId && item.status !== "draft");
    if (!design) return null;
    return (
      <div className="template-source-option template-source-unavailable">
        <p>Code download not available for this reference design.</p>
      </div>
    );
  }
  const price = formatPriceCad(product.priceCad);

  return (
    <div className={`template-source-option${compact ? " template-source-option--compact" : ""}`}>
      <Link
        className="template-code-button"
        href={sourceHref(designId)}
        aria-label={`Buy code only for ${product.name} — ${price}`}
      >
        <span>
          Buy code only <span aria-hidden="true">↗</span>
        </span>
        <strong>{price}</strong>
      </Link>
      <p>
        Code + editing/setup instructions. Automatic download access after verified payment. You
        customize and launch.
      </p>
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
