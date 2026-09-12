import Link from "next/link";
import CollectionCatalog from "@/components/collection/CollectionCatalog";
import CollectionMedia from "@/components/collection/CollectionMedia";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/config/site";
import {
  availableDesigns,
  collectionCarePlans,
  collectionDescription,
  collectionInquiryHref,
  collectionIndustries,
  collectionQuestions,
  collectionStandards,
  collectionTiers,
  developerIntroduction,
  designHref,
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
  const designs = availableDesigns();
  const query = await searchParams;
  const listed = filterDesigns(designs, query);
  const industry = collectionIndustries.find((item) => item.id === query.industry);
  const tier = collectionTiers.find((item) => item.id === query.tier);
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
              Choose an original L&L design. We personalize the code, handle the launch and offer
              ongoing care. You stay focused on your customers, your team and what comes next.
            </p>
            <div className="button-row">
              <a href="#designs" className="button button-gold">
                Explore the designs ↓
              </a>
              <a href="#how-it-works" className="text-link">
                How it works ↓
              </a>
            </div>
            <p className="collection-hero-note">
              Custom-coded foundations · A real person to help · Canada-wide
            </p>
          </div>
          <div className="collection-edition collection-roadmap" id="how-it-works">
            <p className="eyebrow">One easy step at a time</p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Find your design.</strong>
                  <p>Explore the look and layout.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Make it personal.</strong>
                  <p>Choose any extra help you need.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Let’s talk it through.</strong>
                  <p>Agree the scope and costs before booking.</p>
                </div>
              </li>
            </ol>
            <p>
              You do not need to know the technology.
              <br />
              <span>That part is ours to handle.</span>
            </p>
          </div>
        </div>
      </section>
      <div className="container">
        <CollectionCatalog designs={designs} query={query} />
        <section
          className="collection-section journey-disclosures"
          id="collections"
          aria-labelledby="collection-levels-title"
        >
          <div className="collection-heading">
            <div>
              <p className="eyebrow">Clear scope. A considered fit.</p>
              <h2 id="collection-levels-title">
                Choose the scale
                <br />
                that suits you.
              </h2>
            </div>
            <p>
              Essential, Signature, Premier and Flagship describe the breadth of the design. Every
              level includes the same core launch checks.
            </p>
          </div>
          {collectionTiers.map((item) => (
            <details id={`collection-${item.id}`} key={item.id}>
              <summary>
                {item.name}
                <span>{item.position}</span>
              </summary>
              <p>{item.description}</p>
              <p>Suited to {item.fit.charAt(0).toLowerCase() + item.fit.slice(1)}</p>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                className="text-link"
                href={collectionInquiryHref({ tier: item.id, industry: industry?.id })}
              >
                Discuss {item.name} ↗
              </Link>
            </details>
          ))}
        </section>
        <section
          className="collection-section collection-developer"
          aria-labelledby="developer-title"
        >
          <div>
            <p className="eyebrow">You’ll work with Tate</p>
            <h2 id="developer-title">
              A person to ask.
              <br />A partner to build with.
            </h2>
            <p>
              I’m Tate, the person behind L&L Tech Solutions. I’ll help you choose a practical
              direction, explain the decisions and bring your business into the design.
            </p>
            <p>
              From the first conversation through your preview and launch, you have someone to ask.
              After launch, we can agree on the ongoing website and content support your business
              needs.
            </p>
            <Link className="text-link" href={collectionInquiryHref()}>
              Start a conversation ↗
            </Link>
          </div>
          {developerIntroduction ? (
            <CollectionMedia
              video={developerIntroduction}
              title="Meet Tate at L&L Tech Solutions"
            />
          ) : (
            <div className="collection-developer-note">
              <p className="eyebrow">Built around your business</p>
              <p>
                You bring the services, the story and the goals.
                <br />
                <strong>We guide the website work.</strong>
              </p>
              <Link className="text-link" href="/website-collection/brief">
                See the simple content guide ↗
              </Link>
            </div>
          )}
        </section>
        <section
          className="collection-section journey-disclosures"
          id="included"
          aria-labelledby="included-title"
        >
          <div className="collection-heading">
            <div>
              <p className="eyebrow">Behind the finished website</p>
              <h2 id="included-title">The details are part of the work.</h2>
            </div>
          </div>
          {collectionStandards.map((item) => (
            <details key={item.title}>
              <summary>{item.title}</summary>
              <p>{item.description}</p>
            </details>
          ))}
          <p className="collection-build-note">
            Built with React, Next.js and TypeScript. Personalized and configured by L&L, with
            deployment through Vercel. Your proposal defines the finished pages, revisions, timeline
            and separate costs.
          </p>
        </section>
        <section
          className="collection-section journey-disclosures"
          id="ongoing-care"
          aria-labelledby="care-title"
        >
          <div className="collection-heading">
            <div>
              <p className="eyebrow">Optional monthly support</p>
              <h2 id="care-title">Stay looked after.</h2>
            </div>
            <p>
              You can choose website care, ongoing improvements or website and social content
              together. No monthly plan is selected for you.
            </p>
          </div>
          {collectionCarePlans.map((plan) => (
            <details key={plan.id}>
              <summary>{plan.name}</summary>
              <p>{plan.description}</p>
              <p>{plan.scope}</p>
              <Link
                className="text-link"
                href={collectionInquiryHref({
                  care: plan.id,
                  tier: tier?.id,
                  industry: industry?.id,
                })}
              >
                Discuss {plan.name} ↗
              </Link>
            </details>
          ))}
          <p className="collection-fineprint">
            Fees, deliverables and handover or cancellation arrangements are agreed before you
            commit. Hosting, domains, advertising and provider usage are identified separately.
          </p>
        </section>
        <section
          className="collection-section collection-questions"
          id="questions"
          aria-labelledby="questions-title"
        >
          <div>
            <p className="eyebrow">Before you choose</p>
            <h2 id="questions-title">A few useful answers.</h2>
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
        <section className="collection-end">
          <div>
            <p className="eyebrow">Let’s find the right fit</p>
            <h2>
              Bring the business.
              <br />
              <em>We’ll handle the website.</em>
            </h2>
            <p>You don’t need to have everything figured out to start a conversation.</p>
          </div>
          <div>
            <Link
              className="button button-gold"
              href={collectionInquiryHref({ tier: tier?.id, industry: industry?.id })}
            >
              Talk about your website ↗
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
          ...(listed.length
            ? {
                mainEntity: {
                  "@type": "ItemList",
                  numberOfItems: listed.length,
                  itemListElement: listed.map((design, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: design.name,
                    url: absoluteUrl(designHref(design)),
                  })),
                },
              }
            : {}),
        }}
      />
    </div>
  );
}
