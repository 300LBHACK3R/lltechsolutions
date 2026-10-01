/** The promotion applies only to the catalogue's base personalization and launch price. */
export const templateSale = {
  percent: 20,
  startsAt: "2026-10-01T23:30:00.000Z",
  endsAt: "2027-01-01T07:00:00.000Z",
  endsLabel: "January 1, 2027 at 12:00 a.m. MT",
} as const;

export function isTemplateSaleActive(now = Date.now()) {
  return now >= Date.parse(templateSale.startsAt) && now < Date.parse(templateSale.endsAt);
}

export function formatPriceCad(price: number) {
  return `$${price.toLocaleString("en-CA", {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  })} CAD`;
}

export function templatePrice(regularPriceCad: number | null, now = Date.now()) {
  const saleActive = regularPriceCad !== null && isTemplateSaleActive(now);
  return {
    regularPriceCad,
    priceCad:
      regularPriceCad === null
        ? null
        : saleActive
          ? Math.round(regularPriceCad * (100 - templateSale.percent)) / 100
          : regularPriceCad,
    saleActive,
  };
}
