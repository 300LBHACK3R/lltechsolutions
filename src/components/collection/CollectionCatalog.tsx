import Image from "next/image";
import Link from "next/link";
import DesignCover from "@/components/collection/DesignCover";
import {
  availableDesigns,
  collectionInquiryHref,
  collectionIndustries,
  collectionTiers,
  designHref,
  designPrice,
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
  const value = (key: string, allowed: readonly string[]) =>
    typeof query[key] === "string" && allowed.includes(query[key]) ? query[key] : "";
  return (
    <section className="collection-section" id="designs" aria-labelledby="collection-designs-title">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">01 / Find your starting point</p>
          <h2 id="collection-designs-title">
            A small collection.
            <br />
            Room to make it yours.
          </h2>
        </div>
        <p>
          Start with a look you like. Explore it here, then tell us what your business needs.
          Concepts are clearly labelled; your finished scope and price are agreed before booking.
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
        <details className="collection-extra-filters" open={!!(tier || query.budget || query.sort)}>
          <summary>More filters</summary>
          <div>
            <label>
              Collection
              <select name="tier" defaultValue={tier?.id ?? ""}>
                <option value="">All collections</option>
                {collectionTiers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            {designs.some((design) => design.startingPriceCad !== null) && (
              <>
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
              </>
            )}
          </div>
        </details>
        <button className="button button-outline" type="submit">
          Apply filters
        </button>
        <Link className="text-link" href="/website-collection#designs">
          Clear filters
        </Link>
      </form>
      <div className="collection-result-line">
        <p className="collection-result-count">
          {filtered.length} {filtered.length === 1 ? "design" : "designs"}
          {industry ? ` · ${industry.name}` : " to explore"}
          {tier ? ` · ${tier.name}` : ""}
        </p>
        {availableDesigns(designs).length >= 2 && (
          <Link href="/website-collection/compare" className="text-link">
            Compare designs ↗
          </Link>
        )}
      </div>
      {filtered.length === 0 ? (
        <div className="collection-no-results">
          <h3>We can help you find a direction.</h3>
          <p>
            No design matches those filters yet. Try a different selection, or tell us about your
            business.
          </p>
          <Link className="text-link" href={inquiryHref}>
            Talk with L&L ↗
          </Link>
        </div>
      ) : (
        <div className="collection-design-grid">
          {filtered.map((design) => (
            <article className="collection-design" id={`design-${design.id}`} key={design.id}>
              <Link
                href={designHref(design)}
                aria-label={`Explore the ${design.name} website design`}
              >
                {design.preview ? (
                  <Image
                    src={design.preview.src}
                    alt={design.preview.alt}
                    width={design.preview.width}
                    height={design.preview.height}
                    sizes="(max-width: 699px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                ) : (
                  <DesignCover design={design} />
                )}
              </Link>
              <div className="collection-design-copy">
                <p className="eyebrow">
                  {collectionTiers.find((item) => item.id === design.tier)?.name}
                  {design.status === "concept" ? " · Design concept" : ""}
                </p>
                <h3>{design.name}</h3>
                <p>{design.description}</p>
                <p className="collection-design-price">
                  {designPrice(design)}
                  <span>{design.pageCount} page structures · Personalized with L&L</span>
                </p>
                <Link className="button button-outline" href={designHref(design)}>
                  Explore {design.name} ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="collection-fineprint">
        Not sure what fits?{" "}
        <Link className="text-link" href={inquiryHref}>
          Let Tate help you choose ↗
        </Link>
      </p>
    </section>
  );
}
