import Link from "next/link";
import DesignCover from "@/components/collection/DesignCover";
import {
  availableDesigns,
  collectionTiers,
  collectionPricingNote,
  compareSelection,
  designHref,
  designPrice,
  designPriceContext,
  designScopeLabel,
  designStatusLabel,
  type CollectionQuery,
} from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Compare Website Designs",
    "Compare a small shortlist of L&L website designs, scope and pricing.",
    "/website-collection/compare",
  ),
  robots: { index: false, follow: true },
};
export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<CollectionQuery>;
}) {
  const selection = compareSelection((await searchParams).design);
  const valid = !selection.tooMany && selection.designs.length >= 2;
  return (
    <div className="website-collection container journey-page">
      <Link className="text-link" href="/website-collection#designs">
        ← All business categories
      </Link>
      <p className="eyebrow">A little clarity</p>
      <h1>Find your fit.</h1>
      <p>Compare two or three designs. Every level includes the same core launch checks.</p>
      <p className="collection-fineprint">{collectionPricingNote}</p>
      <details className="compare-picker" open={!valid}>
        <summary>{valid ? "Change your shortlist" : "Choose two or three designs"}</summary>
        {selection.tooMany && (
          <p>Please choose up to three designs so the comparison stays easy to read.</p>
        )}
        <form method="get" action="/website-collection/compare">
          <fieldset className="journey-options">
            <legend className="sr-only">Design shortlist</legend>
            {availableDesigns().map((design) => (
              <label key={design.id}>
                <input
                  type="checkbox"
                  name="design"
                  value={design.id}
                  defaultChecked={selection.designs.some((item) => item.id === design.id)}
                />
                <span>
                  {design.name} · {collectionTiers.find((tier) => tier.id === design.tier)?.name}
                </span>
              </label>
            ))}
          </fieldset>
          <button className="button button-gold" type="submit">
            Compare my choices
          </button>
        </form>
      </details>
      {valid && (
        <div className="design-comparison">
          {selection.designs.map((design) => (
            <article key={design.id}>
              <DesignCover design={design} />
              <div>
                <p className="eyebrow">{designStatusLabel(design)}</p>
                <h2>{design.name}</h2>
                <dl>
                  <dt>Design direction</dt>
                  <dd>{design.description}</dd>
                  <dt>Collection</dt>
                  <dd>{collectionTiers.find((tier) => tier.id === design.tier)?.name}</dd>
                  <dt>Starting scope</dt>
                  <dd>{designScopeLabel(design)}</dd>
                  <dt>{designPriceContext(design)}</dt>
                  <dd>{designPrice(design)}</dd>
                  <dt>Key inclusions</dt>
                  <dd>
                    <ul>
                      {design.included.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                  <dt>Timing</dt>
                  <dd>{design.deliveryWindow}</dd>
                </dl>
                <Link href={designHref(design)} className="button button-outline">
                  Explore {design.name} ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
