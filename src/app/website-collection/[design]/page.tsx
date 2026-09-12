import Link from "next/link";
import { notFound } from "next/navigation";
import DesignPreview from "@/components/collection/DesignPreview";
import CollectionMedia from "@/components/collection/CollectionMedia";
import CostSummary from "@/components/collection/CostSummary";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/config/site";
import {
  availableDesigns,
  collectionIndustries,
  collectionTiers,
  designHref,
  designPrice,
} from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ design: string }> };
export function generateStaticParams() {
  return availableDesigns().map((design) => ({ design: design.id }));
}
export async function generateMetadata({ params }: Props) {
  const { design: id } = await params;
  const selected = availableDesigns().find((item) => item.id === id);
  if (!selected) notFound();
  return pageMetadata(
    `${selected.name} Website Design`,
    selected.description,
    designHref(selected),
  );
}
export default async function DesignPage({ params }: Props) {
  const { design: id } = await params;
  const design = availableDesigns().find((item) => item.id === id);
  if (!design) notFound();
  return (
    <div className="website-collection">
      <section className="collection-hero">
        <div className="container">
          <Link className="text-link" href="/website-collection#designs">
            ← Website Collection
          </Link>
          <p className="eyebrow">
            {collectionTiers.find((tier) => tier.id === design.tier)?.name} /{" "}
            {collectionIndustries.find((industry) => industry.id === design.industry)?.name}
          </p>
          <h1>
            {design.name}
            <em>. Made yours.</em>
          </h1>
          <p className="collection-hero-copy">{design.description}</p>
          <p className="collection-hero-note">
            {design.status === "concept" ? "Interactive design concept · " : ""}
            {designPrice(design)}
          </p>
          <div className="button-row">
            <Link
              className="button button-gold"
              href={`/website-collection/start?design=${design.id}`}
            >
              Make this my starting point ↗
            </Link>
            <a href="#preview" className="text-link">
              Explore the design ↓
            </a>
          </div>
        </div>
      </section>
      <div className="container">
        <section id="preview" className="collection-section" aria-labelledby="preview-title">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">Look around, right here</p>
              <h2 id="preview-title">See how it feels.</h2>
            </div>
            <p>
              Try two sample identities, switch to a phone width and explore the services and{" "}
              {design.concept?.theme === "still" ? "approach" : "project"} layouts.
            </p>
          </div>
          {design.concept ? (
            <DesignPreview design={design} />
          ) : (
            <a
              href={design.demoUrl}
              className="button button-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the live demo <span className="sr-only">in a new tab</span> ↗
            </a>
          )}
          {design.walkthrough && (
            <CollectionMedia
              video={design.walkthrough}
              title={`${design.name} website walkthrough`}
            />
          )}
        </section>
        <section className="collection-section design-detail-scope" aria-labelledby="scope-title">
          <div>
            <p className="eyebrow">The proposed starting scope</p>
            <h2 id="scope-title">What we build with you.</h2>
            <p>
              {design.pageCount} page structures. {design.deliveryWindow}
            </p>
            <ul>
              {design.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Make it your own</h3>
            <ul>
              {design.customization?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              React, Next.js and TypeScript, with deployment through Vercel. Your proposal confirms
              the finished pages, revisions, integrations and content responsibilities.
            </p>
            <p>
              The design foundation is reusable. Your real identity and content make the finished
              website yours; an exclusive bespoke layout can be scoped separately.
            </p>
          </div>
        </section>
        <section
          className="collection-section journey-disclosures"
          aria-label="Useful details before enquiring"
        >
          <details>
            <summary>Pricing, monthly care and separate costs</summary>
            <CostSummary design={design} />
          </details>
          <details>
            <summary>Performance evidence & launch checks</summary>
            {design.performance?.length ? (
              design.performance.map((result) => (
                <article key={`${result.measuredAt}-${result.device}`} className="design-evidence">
                  <h3>
                    {result.device} · {result.measuredAt}
                  </h3>
                  <p>
                    Tested page:{" "}
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      {result.url} ↗
                    </a>
                  </p>
                  <p>
                    Lighthouse {result.lighthouseVersion} · {result.conditions}
                  </p>
                  <dl>
                    {Object.entries(result.scores).map(([label, value]) => (
                      <div key={label}>
                        <dt>
                          {label === "bestPractices"
                            ? "Best practices"
                            : label === "seo"
                              ? "SEO"
                              : label}
                        </dt>
                        <dd>{value}/100</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    className="text-link"
                    href={result.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the recorded report ↗
                  </a>
                </article>
              ))
            ) : (
              <p>
                No published performance measurements for this design yet. Your personalized website
                is checked before launch; dated reports can be added here when available.
              </p>
            )}
            <p>
              Results describe the tested URL, content and conditions. Personalization, media,
              integrations and connection speed can change them. Every launch includes agreed
              responsive, accessibility, metadata, form and security checks.
            </p>
          </details>
          <details>
            <summary>What happens after booking?</summary>
            <p>
              Once the scope is agreed, we guide you through your business details, content and
              brand assets. You can ask for help anywhere you need it.
            </p>
            <Link className="text-link" href="/website-collection/brief">
              See the content handover guide ↗
            </Link>
          </details>
        </section>
        <section className="collection-end">
          <div>
            <p className="eyebrow">A few easy choices</p>
            <h2>Like this direction?</h2>
            <p>Choose any extra help and support you want, then send a short enquiry.</p>
          </div>
          <Link
            className="button button-gold"
            href={`/website-collection/start?design=${design.id}`}
          >
            Personalize my enquiry ↗
          </Link>
        </section>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${design.name} — L&L website design${design.status === "concept" ? " concept" : ""}`,
          description: design.description,
          url: absoluteUrl(designHref(design)),
          creator: { "@id": absoluteUrl("/#organization") },
          inLanguage: "en-CA",
        }}
      />
    </div>
  );
}
