"use client";

import { formatPriceCad, templatePrice, templateSale } from "@/data/template-promotion";
import { useTemplateSale } from "@/lib/use-template-sale";

export default function TemplatePrice({
  price,
  initialSaleActive = false,
  compact = false,
}: {
  price: number | null;
  initialSaleActive?: boolean;
  compact?: boolean;
}) {
  const saleActive = useTemplateSale(initialSaleActive);
  const endsAt = Date.parse(templateSale.endsAt);
  // Use the subscribed state for both server HTML and hydration, without reading a second clock.
  const quote = templatePrice(price, saleActive ? endsAt - 1 : endsAt);
  const endNote = `Offer ends ${templateSale.endsLabel}`;

  return (
    <span
      className={`template-price${quote.saleActive ? " template-price--sale" : ""}${compact ? " template-price--compact" : ""}`}
      data-template-price={price ?? undefined}
      data-sale-end={templateSale.endsAt}
      title={quote.saleActive ? `${templateSale.percent}% off. ${endNote}.` : undefined}
    >
      {quote.saleActive && quote.regularPriceCad !== null ? (
        <>
          <del className="template-price-regular">{formatPriceCad(quote.regularPriceCad)}</del>{" "}
        </>
      ) : null}
      <span className="template-price-current">
        {quote.priceCad === null
          ? "Quoted after a conversation"
          : `From ${formatPriceCad(quote.priceCad)}`}
      </span>
      {quote.saleActive ? (
        <>
          {" "}
          <span className="template-price-badge">{templateSale.percent}% off</span>
          {!compact ? (
            <>
              {" "}
              <time className="template-price-note" dateTime={templateSale.endsAt}>
                {endNote}
              </time>
            </>
          ) : null}
        </>
      ) : null}
    </span>
  );
}
