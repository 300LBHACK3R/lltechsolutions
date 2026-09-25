import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import ProductionExample from "@/components/ui/ProductionExample";
import { pageMetadata } from "@/lib/metadata";
import { investments, investmentDescription } from "@/data/investments";
export const metadata = pageMetadata(
  "Pricing & Project Options",
  investmentDescription,
  "/packages",
);
export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pricing"
        title="A clear starting point."
        description="Every project has different requirements. These starting points help frame the conversation; your proposal defines exactly what is included."
      />
      <div className="container">
        {investments.map((item) => (
          <section className="investment-row" key={item.title}>
            <div>
              <p className="eyebrow">{item.label}</p>
              <h2>{item.title}</h2>
            </div>
            <p>{item.description}</p>
            <div className="investment-action">
              <p className="investment-price">
                {item.amount === null ? "Scoped" : `$${item.amount}+`}
                <small>{item.period}</small>
              </p>
              <Link
                className="text-link"
                href={`/contact?service=${encodeURIComponent(item.service)}`}
              >
                Discuss the scope ↗
              </Link>
            </div>
          </section>
        ))}
        <p className="investment-note">
          Starting prices are in CAD. Strategy, design, features, integrations, content, timeline
          and ongoing support affect the final quote. Your proposal will identify applicable taxes
          and any separate hosting, domain, platform, advertising or usage fees before approval.
        </p>
        <ProductionExample />
        <p className="investment-note">
          Photography and videography are also available as standalone projects for websites, social
          media and promotional content.{" "}
          <Link href="/services#photography-videography" className="text-link">
            Explore photo & video services ↗
          </Link>
        </p>
        <section className="collection-pricing-link" aria-labelledby="pricing-collection-title">
          <div>
            <p className="eyebrow">Another way to get started</p>
            <h2 id="pricing-collection-title">The Website Templates.</h2>
            <p>
              Choose an existing L&L design foundation and have it personalized and launched for
              your business. Four levels of scope, with individual design pricing and optional
              ongoing care as the collection grows.
            </p>
          </div>
          <Link href="/website-collection" className="button button-outline">
            Explore the collection ↗
          </Link>
        </section>
      </div>
      <ProjectCTA />
    </>
  );
}
