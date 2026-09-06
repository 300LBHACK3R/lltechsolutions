import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Investment & Starting Prices",
  "Custom business websites from $499, scoped software development and social management from $199 per month. Every engagement is quoted around its requirements.",
  "/packages",
);
const investments = [
  {
    title: "Custom Business Website",
    label: "Starting point",
    price: "$499+",
    period: "",
    description:
      "For a focused business website with a clear scope. Content, page count, integrations and custom features shape the final quote.",
    service: "Website Design & Development",
  },
  {
    title: "Custom Software / Web App",
    label: "Quoted after discovery",
    price: "Scoped",
    period: "",
    description:
      "For portals, dashboards, customer experiences and business tools. Workflows, users, integrations and ongoing needs define the investment.",
    service: "Custom Software / Web Application",
  },
  {
    title: "Social Management Partner",
    label: "Starting point",
    price: "$199+",
    period: "/month",
    description:
      "For a consistent managed presence. Channels, posting cadence, original content and reporting are agreed in your monthly scope.",
    service: "Social Media Management",
  },
];
export default function InvestmentPage() {
  return (
    <>
      <PageIntro
        eyebrow="Investment"
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
                {item.price}
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
      </div>
      <ProjectCTA />
    </>
  );
}
