import TemplateSaleNotice from "@/components/collection/TemplateSaleNotice";
import { isTemplateSaleActive } from "@/data/template-promotion";
import Image from "next/image";
import Link from "next/link";
import ProductionExample from "@/components/ui/ProductionExample";
import { investments, investmentDescription, pricingQuestions } from "@/data/investments";
import { getProject, projectPath } from "@/data/projects";
import { contentProduction } from "@/data/services";
import { collectionPriceRange } from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Pricing & Project Options",
  investmentDescription,
  "/packages",
);

export default function PricingPage() {
  const contentProject = getProject("mckenzie-house");
  const contentImage = contentProject.gallery?.[0];

  return (
    <div className="pricing-page">
      <header className="pricing-intro">
        <div className="container">
          <p className="eyebrow">L&L / Pricing</p>
          <div className="pricing-intro-layout">
            <h1>
              A clear starting point.
              <span>A plan that fits.</span>
            </h1>
            <div className="pricing-intro-copy">
              <p>
                A website, custom software or ongoing content. Choose where to begin; we’ll agree
                the scope and cost before work starts.
              </p>
              <a href="#project-options" className="text-link">
                Find your starting point <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <section
          className="pricing-options"
          id="project-options"
          aria-labelledby="pricing-options-title"
        >
          <div className="pricing-section-label">
            <h2 id="pricing-options-title">Three ways to work together</h2>
            <p>Starting prices in CAD · Final scope agreed with you</p>
          </div>
          <div className="pricing-grid">
            {investments.map((item, index) => (
              <article
                className={`pricing-offer pricing-offer-${item.id}`}
                aria-labelledby={`pricing-${item.id}-title`}
                key={item.id}
              >
                <div className="pricing-offer-heading">
                  <span className="pricing-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 id={`pricing-${item.id}-title`}>{item.title}</h3>
                </div>
                <div className="pricing-amount-block">
                  <p className="pricing-price-label">{item.label}</p>
                  <p
                    className={`pricing-amount${item.amount === null ? " pricing-amount-scoped" : ""}`}
                  >
                    <strong>{item.amount === null ? "Scoped" : `$${item.amount}+`}</strong>
                    {item.amount !== null && (
                      <span>CAD{item.period === "/month" ? " / month" : " · one-time"}</span>
                    )}
                  </p>
                </div>
                <p className="pricing-offer-description">{item.description}</p>
                <div className="pricing-offer-scope">
                  <p>{item.scopeLabel}</p>
                  <ul>
                    {item.scope.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <p className="pricing-offer-note">{item.note}</p>
                <Link
                  className={`button ${item.id === "website" ? "button-gold" : "button-outline"}`}
                  href={`/contact?service=${encodeURIComponent(item.service)}`}
                >
                  {item.action} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
          <p className="pricing-scope-note">
            These are starting points, not fixed packages for every project. Your proposal confirms
            the deliverables, timeline, applicable taxes and any separate costs.
          </p>
        </section>
        <section className="pricing-template-route" aria-labelledby="pricing-templates-title">
          <div className="pricing-template-copy">
            <p className="eyebrow">Find a look you love</p>
            <TemplateSaleNotice initialSaleActive={isTemplateSaleActive()} />
            <h2 id="pricing-templates-title">Start with a design. Make it yours.</h2>
            <p>
              Explore our website templates with regular starting prices of {collectionPriceRange}.
              We personalize your chosen design with your information and handle the agreed launch
              work. Extra features, original content and ongoing care are quoted separately.
            </p>
            <p>
              Prefer to do it yourself? Selected templates also offer a source-code download with
              its own price and setup guide. You handle personalization, hosting and launch; ongoing
              support is separate. Look for “Download source code” on a template.
            </p>
          </div>
          <div className="pricing-template-actions">
            <Link href="/website-collection" className="button button-outline">
              Browse website templates <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/website-collection/massage-one-page" className="text-link">
              See the one-page example <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="pricing-production" aria-label="A real website and content project">
          {contentImage && (
            <figure className="pricing-project-figure">
              <Link
                href={projectPath(contentProject)}
                aria-label="Explore the McKenzie House Massage project"
              >
                <Image
                  src={contentImage.src}
                  alt={contentImage.alt}
                  width={contentImage.width}
                  height={contentImage.height}
                  sizes="(min-width: 1600px) 640px, (min-width: 900px) 42vw, 92vw"
                />
              </Link>
              <figcaption>
                <span>McKenzie House Massage</span>
                <Link href={projectPath(contentProject)} className="text-link">
                  Explore the project <span aria-hidden="true">↗</span>
                </Link>
              </figcaption>
            </figure>
          )}
          <div className="pricing-production-copy">
            <ProductionExample />
            <Link href="/services#photography-videography" className="text-link">
              Explore photo & video services <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href={`/contact?service=${encodeURIComponent(contentProduction.inquiry)}`}
              className="text-link"
            >
              Discuss a content project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="pricing-questions" aria-labelledby="pricing-questions-title">
          <div>
            <p className="eyebrow">The details, upfront</p>
            <h2 id="pricing-questions-title">
              A little clarity
              <br />
              before we begin.
            </h2>
            <Link href="/contact" className="text-link">
              Have another question? <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="pricing-answers">
            {pricingQuestions.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span className="pricing-disclosure-icon" aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
