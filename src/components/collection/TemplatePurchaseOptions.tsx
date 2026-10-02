import Link from "next/link";
import { sourceHref, sourceProduct, sourceVersionRequest } from "@/data/source-products";
import { formatPriceCad } from "@/data/template-promotion";

export default function TemplatePurchaseOptions({
  designId,
  compact = false,
}: {
  designId: string;
  compact?: boolean;
}) {
  const product = sourceProduct(designId);
  const request = product ? null : sourceVersionRequest(designId);
  if (!product && !request) return null;
  const label = product ? "Download source code" : "Request a code-only version";
  const name = product?.name ?? request!.name;
  const href = product ? sourceHref(designId) : request!.href;
  const price = product ? formatPriceCad(product.priceCad) : "Quoted separately";

  return (
    <div className={`template-source-option${compact ? " template-source-option--compact" : ""}`}>
      <Link
        className="template-source-link"
        href={href}
        aria-label={`${label} for ${name} — ${price}`}
      >
        <span>
          {label} <span aria-hidden="true">↗</span>
        </span>
        <strong>{price}</strong>
      </Link>
      {compact ? (
        <p>Code + editing/setup instructions. You customize and launch.</p>
      ) : (
        <>
          <p>
            Source code only: editable files and editing/setup instructions. You customize, test and
            launch.
          </p>
          <details className="template-source-disclosure">
            <summary>What’s different about code only?</summary>
            <p>
              {product
                ? "The lower price covers the template files and a licence for one business website. L&L personalization, launch checks, hosting, email setup and ongoing maintenance are not included."
                : "Ask about a clean reusable version with sample content. Availability and price are confirmed first; the original business branding, photos and private client files are not part of this request."}
            </p>
          </details>
        </>
      )}
    </div>
  );
}
