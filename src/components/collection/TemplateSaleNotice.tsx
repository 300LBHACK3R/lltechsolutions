"use client";

import { templateSale } from "@/data/template-promotion";
import { useTemplateSale } from "@/lib/use-template-sale";

export default function TemplateSaleNotice({
  initialSaleActive = false,
}: {
  initialSaleActive?: boolean;
}) {
  const active = useTemplateSale(initialSaleActive);
  if (!active) return null;
  return (
    <p className="template-sale-notice">
      <strong>{templateSale.percent}% off every template.</strong> Ends January 1, 2027 at midnight
      Alberta time. Applies to personalization & launch; code-only downloads, extras and ongoing
      plans are separate.
    </p>
  );
}
