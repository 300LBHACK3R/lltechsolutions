import Link from "next/link";
import DesignCover from "@/components/collection/DesignCover";
import {
  categoryHref,
  collectionInquiryHref,
  collectionIndustries,
  collectionPricingNote,
  collectionTiers,
  designHref,
  designPrice,
  designPriceContext,
  designStatusLabel,
  designInquiryLabel,
  designScopeLabel,
  filterDesigns,
  type CollectionQuery,
  type TemplateCategory,
  type WebsiteDesign,
} from "@/data/website-collection";

export default function CollectionCatalog({
  designs,
  query,
  category,
}: {
  designs: readonly WebsiteDesign[];
  query: CollectionQuery;
  category: TemplateCategory;
}) {
  const filtered = filterDesigns(designs, query);
  const industries = collectionIndustries.filter((item) => category.industries.includes(item.id));
  const industry = industries.find((item) => item.id === query.industry);
  const tier = collectionTiers.find((item) => item.id === query.tier);
  const inquiryHref = collectionInquiryHref({
    industry: industry?.id,
    category: category.id,
    tier: tier?.id,
  });
  const href = `${categoryHref(category)}#designs`;
  return (
    <section
      className="collection-section template-gallery"
      id="designs"
      aria-labelledby="template-gallery-title"
    >
      <div className="template-gallery-heading">
        <div>
          <p className="eyebrow">Choose a look. We handle the rest.</p>
          <h2 id="template-gallery-title">Explore the templates.</h2>
        </div>
        <p>
          {filtered.length} {filtered.length === 1 ? "template" : "templates"} to explore
        </p>
      </div>
      {designs.length > 0 && (
        <form
          action={href}
          method="get"
          className="collection-filters"
          aria-label="Filter website templates"
        >
          <label>
            Business type
            <select name="industry" defaultValue={industry?.id ?? ""}>
              <option value="">All in {category.name}</option>
              {industries.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort by price
            <select
              name="sort"
              defaultValue={query.sort === "price-high" ? "price-high" : "price-low"}
            >
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
          <details className="collection-extra-filters" open={!!tier}>
            <summary>Design level</summary>
            <label>
              <span className="sr-only">Design level</span>
              <select name="tier" defaultValue={tier?.id ?? ""}>
                <option value="">All levels</option>
                {collectionTiers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </details>
          <button className="button button-outline" type="submit">
            Apply filters
          </button>
          <Link className="text-link" href={href}>
            Clear filters
          </Link>
        </form>
      )}
      {designs.length > 0 && <p className="collection-result-count">{collectionPricingNote}</p>}
      {filtered.length === 0 ? (
        <div className="collection-no-results">
          <h3>
            {designs.length
              ? "No templates match those filters."
              : "Your category is ready for its first templates."}
          </h3>
          <p>
            {designs.length
              ? "Try another selection, or tell us what you have in mind."
              : "No templates have been added here yet. Tell us about your business and we can discuss a custom design."}
          </p>
          <div className="button-row">
            <Link className="button button-outline" href={inquiryHref}>
              Talk about my website ↗
            </Link>
            <Link
              className="text-link"
              href={designs.length ? href : "/website-collection#designs"}
            >
              {designs.length ? "Clear filters" : "Browse other categories"}
            </Link>
          </div>
        </div>
      ) : (
        <div className="collection-design-grid">
          {filtered.map((design) => (
            <article className="collection-design" id={`design-${design.id}`} key={design.id}>
              <Link
                className="template-preview-link"
                href={designHref(design)}
                aria-label={`Preview ${design.name} website ${design.status === "client-example" ? "example" : "template"}`}
              >
                <DesignCover design={design} />
                <span className="template-preview-caption">
                  {design.status === "client-example" ? "View client example" : "View template"}{" "}
                  <span aria-hidden="true">↗</span>
                </span>
              </Link>
              <div className="collection-design-copy">
                <p className="eyebrow">
                  {collectionTiers.find((item) => item.id === design.tier)?.name}
                  {" · "}
                  {designStatusLabel(design)}
                </p>
                <h3>
                  <Link href={designHref(design)}>{design.name}</Link>
                </h3>
                <p>{design.description}</p>
                <p className="collection-design-price">
                  {designPrice(design)}
                  <span>{designPriceContext(design)}</span>
                  <span>{designScopeLabel(design)} · Personalized with L&L</span>
                </p>
                <div className="template-card-actions">
                  <Link className="button button-outline" href={designHref(design)}>
                    {design.status === "client-example" ? "View client example" : "View template"} ↗
                  </Link>
                  <Link className="text-link" href={collectionInquiryHref({ design: design.id })}>
                    {designInquiryLabel(design)} ↗
                  </Link>
                </div>
                {designs.length >= 2 && (
                  <label className="template-shortlist-choice">
                    <input
                      form="template-shortlist"
                      type="checkbox"
                      name="design"
                      value={design.id}
                    />{" "}
                    Compare this design
                  </label>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      {designs.length >= 2 && filtered.length > 0 && (
        <form
          id="template-shortlist"
          action="/website-collection/compare"
          method="get"
          className="template-shortlist"
        >
          <p>Like more than one? Select up to three templates to compare their scope.</p>
          <button className="button button-outline" type="submit">
            Compare selected templates ↗
          </button>
        </form>
      )}
      <p className="collection-fineprint">
        Your business details, branding and agreed features are added by L&L. Scope and pricing are
        confirmed before booking.{" "}
        <Link className="text-link" href={inquiryHref}>
          Ask about your website ↗
        </Link>
      </p>
    </section>
  );
}
