import Image from "next/image";
import Link from "next/link";
import {
  collectionInquiryHref,
  collectionIndustries,
  collectionTiers,
  filterDesigns,
  type CollectionQuery,
  type WebsiteDesign,
} from "@/data/website-collection";

export default function CollectionCatalog({
  designs,
  query,
}: {
  designs: readonly WebsiteDesign[];
  query: CollectionQuery;
}) {
  const filtered = filterDesigns(designs, query);
  const industry = collectionIndustries.find((item) => item.id === query.industry);
  const tier = collectionTiers.find((item) => item.id === query.tier);
  const inquiryHref = collectionInquiryHref({ industry: industry?.id, tier: tier?.id });
  const selectionLabel = [industry?.name, tier?.name].filter(Boolean).join(" · ");
  const value = (key: string, allowed: readonly string[]) =>
    typeof query[key] === "string" && allowed.includes(query[key]) ? query[key] : "";
  return (
    <section className="collection-section" id="designs" aria-labelledby="collection-designs-title">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">The design library</p>
          <h2 id="collection-designs-title">Find your starting point.</h2>
        </div>
        <p>
          Find your industry, then compare collection levels and budget. Each design will make its
          price and included work clear before you enquire.
        </p>
      </div>
      <form
        action="/website-collection#designs"
        method="get"
        className="collection-filters"
        aria-label="Filter website designs"
      >
        <label>
          Business type
          <select name="industry" defaultValue={industry?.id ?? ""}>
            <option value="">All business types</option>
            {collectionIndustries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Collection
          <select
            name="tier"
            defaultValue={value(
              "tier",
              collectionTiers.map((tier) => tier.id),
            )}
          >
            <option value="">All collections</option>
            {collectionTiers.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Starting price
          <select
            name="budget"
            defaultValue={value("budget", ["under-500", "under-1000", "under-2000"])}
          >
            <option value="">Any budget</option>
            <option value="under-500">Under $500 CAD</option>
            <option value="under-1000">Under $1,000 CAD</option>
            <option value="under-2000">Under $2,000 CAD</option>
          </select>
        </label>
        <label>
          Sort by
          <select
            name="sort"
            defaultValue={value("sort", ["price-low", "price-high"]) || "price-low"}
          >
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
        <button className="button button-outline" type="submit">
          Apply filters
        </button>
        <Link className="text-link" href="/website-collection#designs">
          Clear filters
        </Link>
      </form>
      {selectionLabel && (
        <p className="collection-result-count">
          Your selection: <strong>{selectionLabel}</strong>
        </p>
      )}
      {designs.length === 0 ? (
        <div className="collection-opening">
          <div className="collection-opening-mark" aria-hidden="true">
            01<span>In the making</span>
          </div>
          <div>
            <p className="eyebrow">The collection is taking shape</p>
            <h3>Our first designs are being prepared.</h3>
            <p>
              We’re building a considered selection of original L&L designs. Working demos,
              individual prices and included features will appear here as each design is ready. Tell
              us what your business needs in the meantime.
            </p>
            <Link className="button button-gold" href={inquiryHref}>
              Discuss a collection website <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="collection-result-count">
            {filtered.length} {filtered.length === 1 ? "design" : "designs"} shown. Starting prices
            in CAD; final scope and separate costs are confirmed before purchase.
          </p>
          {filtered.length === 0 ? (
            <div className="collection-no-results">
              <h3>No designs match those filters yet.</h3>
              <p>Try another collection or tell us what you’re looking for.</p>
              <Link className="text-link" href={inquiryHref}>
                Talk with L&L ↗
              </Link>
            </div>
          ) : (
            <div className="collection-design-grid">
              {filtered.map((design) => (
                <article className="collection-design" id={`design-${design.id}`} key={design.id}>
                  <Image
                    src={design.preview.src}
                    alt={design.preview.alt}
                    width={design.preview.width}
                    height={design.preview.height}
                    sizes="(max-width: 699px) 100vw, (max-width: 1899px) 50vw, 900px"
                  />
                  <div className="collection-design-copy">
                    <p className="eyebrow">
                      {collectionTiers.find((tier) => tier.id === design.tier)?.name} ·{" "}
                      {collectionIndustries.find((item) => item.id === design.industry)?.name}
                    </p>
                    <h3>{design.name}</h3>
                    <p>{design.description}</p>
                    <p className="collection-design-price">
                      From ${design.startingPriceCad.toLocaleString("en-CA")} CAD{" "}
                      <span>Personalization & launch</span>
                    </p>
                    <details>
                      <summary>What’s included</summary>
                      <p>
                        {design.pageCount} {design.pageCount === 1 ? "page" : "pages"} ·{" "}
                        {design.deliveryWindow}
                      </p>
                      <ul>
                        {design.included.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </details>
                    <div className="button-row">
                      <a
                        href={design.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-outline"
                      >
                        View demo{" "}
                        <span className="sr-only">for {design.name} (opens a new tab)</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                      <Link
                        className="text-link"
                        href={collectionInquiryHref({ design: design.id })}
                      >
                        Choose this design <span className="sr-only">— {design.name}</span>↗
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
