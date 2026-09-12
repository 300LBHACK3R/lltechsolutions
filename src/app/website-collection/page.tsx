import Link from "next/link";
import CollectionCatalog from "@/components/collection/CollectionCatalog";
import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { absoluteUrl } from "@/config/site";
import {
  collectionBenefits,
  collectionCarePlans,
  collectionDescription,
  collectionInquiryHref,
  collectionIndustries,
  collectionQuestions,
  collectionStandards,
  collectionTiers,
  publishedDesigns,
  filterDesigns,
  type CollectionQuery,
} from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website Collection & Managed Launch",
  collectionDescription,
  "/website-collection",
);

export default async function WebsiteCollectionPage({
  searchParams,
}: {
  searchParams: Promise<CollectionQuery>;
}) {
  const designs = publishedDesigns();
  const query = await searchParams;
  const listedDesigns = filterDesigns(designs, query);
  const selectedIndustry = collectionIndustries.find((item) => item.id === query.industry);
  const selectedTier = collectionTiers.find((item) => item.id === query.tier);
  return (
    <div className="website-collection">
      <section className="collection-hero" aria-labelledby="collection-title">
        <div className="container collection-hero-grid">
          <div>
            <p className="eyebrow">L&L / Website Collection</p>
            <h1 id="collection-title">
              A design you love.
              <br />
              <em>The details, handled.</em>
            </h1>
            <p className="collection-hero-copy">
              Choose an original L&L design. We personalize the code for your business, handle the
              launch and offer ongoing care. You stay focused on your customers, your team and what
              comes next.
            </p>
            <div className="button-row">
              <Link href="#collections" className="button button-gold">
                Explore the collections <span aria-hidden="true">↓</span>
              </Link>
              <Link href="#how-it-works" className="text-link">
                How it works <span aria-hidden="true">↓</span>
              </Link>
            </div>
            <p className="collection-hero-note">
              Custom-coded foundations · Personally implemented · Canada-wide
            </p>
          </div>
          <div className="collection-edition" aria-label="The four website collection levels">
            <p className="eyebrow">Four levels. One considered standard.</p>
            <ol>
              {collectionTiers.map((tier, index) => (
                <li key={tier.id}>
                  <a href={`#collection-${tier.id}`}>
                    <span>0{index + 1}</span>
                    <strong>{tier.name}</strong>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ol>
            <p>
              Choose the scope that fits.
              <br />
              <span>We take care of the implementation.</span>
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <nav className="collection-jump-links" aria-label="On this page">
          <a href="#collections">Collection levels</a>
          <a href="#designs">Design library</a>
          <a href="#included">Included at launch</a>
          <a href="#ongoing-care">Monthly care</a>
          <a href="#questions">Questions</a>
        </nav>
        <section className="collection-section" aria-labelledby="collection-benefits-title">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">Your time belongs to your business</p>
              <h2 id="collection-benefits-title">
                Choose your direction.
                <br />
                We’ll take it from there.
              </h2>
            </div>
            <p>
              You do not need to become a web designer to have a professional website. Get a clear
              starting point and a developer who handles the work with you.
            </p>
          </div>
          <div className="collection-benefits">
            {collectionBenefits.map((benefit, index) => (
              <Reveal key={benefit.title}>
                <article>
                  <span className="eyebrow">0{index + 1}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className="collection-section"
          id="collections"
          aria-labelledby="collection-levels-title"
        >
          <div className="collection-heading">
            <div>
              <p className="eyebrow">Find your level</p>
              <h2 id="collection-levels-title">
                Different ambitions.
                <br />A considered fit.
              </h2>
            </div>
            <p>
              From a focused first website to an expansive brand presence. Every level includes the
              same core launch checks; scope and functionality shape the price.
            </p>
          </div>
          <div className="collection-levels">
            {collectionTiers.map((tier, index) => (
              <article className="collection-level" id={`collection-${tier.id}`} key={tier.id}>
                <div>
                  <p className="eyebrow">
                    0{index + 1} / {tier.position}
                  </p>
                  <h3>{tier.name}</h3>
                </div>
                <div>
                  <p className="collection-level-description">{tier.description}</p>
                  <p className="collection-fit">
                    Suited to {tier.fit.charAt(0).toLowerCase() + tier.fit.slice(1)}
                  </p>
                  <ul>
                    {tier.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="collection-level-action">
                  <span>Priced per design</span>
                  <Link
                    href={collectionInquiryHref({ tier: tier.id, industry: selectedIndustry?.id })}
                    className="text-link"
                  >
                    Discuss {tier.name} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="collection-fineprint">
            Collection levels are a guide to scope. Each published design will list its own starting
            price, page count and included work. Added features and substantial layout changes are
            agreed separately.
          </p>
        </section>

        <CollectionCatalog designs={designs} query={query} />
      </div>

      <section
        className="collection-section collection-standard-band"
        id="included"
        aria-labelledby="collection-included-title"
      >
        <div className="container">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">The L&L launch standard</p>
              <h2 id="collection-included-title">
                The work behind
                <br />
                the finished website.
              </h2>
            </div>
            <p>
              Your selected design is the starting point. The value is in the care that takes it
              from a codebase to your business’s working website.
            </p>
          </div>
          <div className="collection-standards">
            {collectionStandards.map((standard) => (
              <article key={standard.title}>
                <h3>{standard.title}</h3>
                <p>{standard.description}</p>
              </article>
            ))}
          </div>
          <p className="collection-build-note">
            Built with React, Next.js and TypeScript. Personalized, configured and reviewed by L&L.
            An existing codebase keeps the starting scope focused; your proposal defines the
            finished work.
          </p>
        </div>
      </section>

      <div className="container">
        <section
          className="collection-section"
          id="how-it-works"
          aria-labelledby="collection-process-title"
        >
          <div className="collection-heading">
            <div>
              <p className="eyebrow">A straightforward way forward</p>
              <h2 id="collection-process-title">
                From a good fit
                <br />
                to a working website.
              </h2>
            </div>
            <p>
              Clear decisions and a guided process. No need to work out hosting, plugins or APIs on
              your own.
            </p>
          </div>
          <ol className="collection-process">
            {[
              [
                "Choose a direction",
                "Explore the available designs and tell us about your business, preferred collection and essential features.",
              ],
              [
                "Agree the details",
                "We confirm the scope, total price, content checklist, revision allowance and delivery window before your deposit.",
              ],
              [
                "Make it yours",
                "We integrate your branding and content, implement the agreed features and prepare a preview for your review.",
              ],
              [
                "Launch with a plan",
                "After approval and launch checks, we connect your domain and deploy your site. Choose ongoing care or an agreed handover.",
              ],
            ].map(([title, description], index) => (
              <li key={title}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="collection-section"
          id="ongoing-care"
          aria-labelledby="collection-care-title"
        >
          <div className="collection-heading">
            <div>
              <p className="eyebrow">Optional monthly partnerships</p>
              <h2 id="collection-care-title">
                Launch is a beginning.
                <br />
                Stay looked after.
              </h2>
            </div>
            <p>
              Keep the website current, improve it over time or bring your social content into the
              same working relationship. Choose the support your business actually needs.
            </p>
          </div>
          <div className="collection-care">
            {collectionCarePlans.map((plan) => (
              <article key={plan.id}>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <p>{plan.scope}</p>
                <Link
                  className="text-link"
                  href={collectionInquiryHref({
                    care: plan.id,
                    tier: selectedTier?.id,
                    industry: selectedIndustry?.id,
                  })}
                >
                  Discuss {plan.name} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
          <p className="collection-fineprint">
            Monthly services are individually scoped. Deliverables, fees and cancellation or
            handover arrangements are agreed before you commit. Hosting, domains, advertising and
            third-party usage charges are identified separately.
          </p>
        </section>

        <section
          className="collection-section collection-questions"
          id="questions"
          aria-labelledby="collection-questions-title"
        >
          <div>
            <p className="eyebrow">Before you choose</p>
            <h2 id="collection-questions-title">A few useful answers.</h2>
            <Link href="/contact" className="text-link">
              Ask us a question ↗
            </Link>
          </div>
          <div>
            {collectionQuestions.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">＋</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="collection-end" aria-labelledby="collection-end-title">
          <div>
            <p className="eyebrow">Let’s find the right fit</p>
            <h2 id="collection-end-title">
              Bring the business.
              <br />
              <em>We’ll handle the website.</em>
            </h2>
            <p>
              Tell us what you do, what you need and the budget you have in mind. We’ll help you
              choose a practical next step.
            </p>
          </div>
          <div>
            <Link
              className="button button-gold"
              href={collectionInquiryHref({
                tier: selectedTier?.id,
                industry: selectedIndustry?.id,
              })}
            >
              Talk about your website <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/services#website-development">
              Prefer a bespoke build? ↗
            </Link>
          </div>
        </section>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "L&L Website Collection",
          description: collectionDescription,
          url: absoluteUrl("/website-collection"),
          inLanguage: "en-CA",
          isPartOf: { "@id": absoluteUrl("/#website") },
          about: {
            "@type": "Service",
            name: "Website design personalization and launch",
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: "Canada",
          },
          ...(listedDesigns.length
            ? {
                mainEntity: {
                  "@type": "ItemList",
                  numberOfItems: listedDesigns.length,
                  itemListElement: listedDesigns.map((design, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: design.name,
                    url: absoluteUrl(`/website-collection#design-${design.id}`),
                  })),
                },
              }
            : {}),
        }}
      />
    </div>
  );
}
