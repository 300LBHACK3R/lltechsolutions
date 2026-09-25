import Link from "next/link";
import { redirect } from "next/navigation";
import TemplateCategories from "@/components/collection/TemplateCategories";
import CollectionContactOptions from "@/components/collection/CollectionContactOptions";
import CollectionCustomization from "@/components/collection/CollectionCustomization";
import CollectionMedia from "@/components/collection/CollectionMedia";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/config/site";
import {
  categoryForIndustry,
  categoryHref,
  templateCategories,
  collectionCarePlans,
  collectionDescription,
  collectionInquiryHref,
  collectionIndustries,
  collectionQuestions,
  collectionStandards,
  collectionTiers,
  developerIntroduction,
  type CollectionQuery,
} from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website Templates & Managed Launch",
  collectionDescription,
  "/website-collection",
);
export default async function WebsiteCollectionPage({
  searchParams,
}: {
  searchParams: Promise<CollectionQuery>;
}) {
  const query = await searchParams;
  const category = categoryForIndustry(query.industry);
  if (category) {
    const filters = new URLSearchParams();
    for (const key of ["industry", "tier", "budget", "sort"]) {
      const value = query[key];
      if (typeof value === "string" && value.length < 80) filters.set(key, value);
    }
    redirect(`${categoryHref(category)}?${filters.toString()}#designs`);
  }
  const industry = collectionIndustries.find((item) => item.id === query.industry);
  const tier = collectionTiers.find((item) => item.id === query.tier);
  return (
    <div className="website-collection">
      <section className="collection-intro" aria-labelledby="collection-title">
        <div className="container">
          <p className="eyebrow">L&L / Website Templates</p>
          <h1 id="collection-title">
            A design you love. <em>The details, handled.</em>
          </h1>
          <p className="collection-intro-copy">
            Start with a design that feels right for your business. We tailor the code, bring your
            brand into it, and handle the launch.
          </p>
          <p className="collection-intro-note">
            Custom-coded. Personally handled. <span>Calgary-based · Canada-wide</span>
          </p>
        </div>
      </section>
      <div className="container">
        <TemplateCategories />
      </div>
      <section
        className="collection-process-strip collection-roadmap"
        id="how-it-works"
        aria-labelledby="collection-process-title"
      >
        <div className="container">
          <div className="collection-process-heading">
            <p className="eyebrow" id="collection-process-title">
              One easy step at a time
            </p>
            <p>You focus on your business. We handle the website.</p>
          </div>
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
        </div>
      </section>
      <div className="container">
        <CollectionContactOptions />
        <CollectionCustomization />
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
          name: "L&L Website Templates",
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
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: templateCategories.length,
            itemListElement: templateCategories.map((category, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: category.name,
              url: absoluteUrl(categoryHref(category)),
            })),
          },
        }}
      />
    </div>
  );
}
