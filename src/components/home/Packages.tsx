import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

const engagements = [
  {
    label: "Website Design & Development",
    title: "Custom Website",
    price: "$499+",
    note: "Launch sites from",
    description:
      "A custom-coded website planned around the brand, customer journey, content, conversion goals, and the functionality the business actually needs.",
    tiers: [
      "Launch • $499+",
      "Business • $899+",
      "Advanced • $1,499+",
    ],
    features: [
      "Strategy, UX, UI design, and development",
      "Responsive custom-coded implementation",
      "Technical SEO and analytics foundations",
      "Contact, booking, payment, or inquiry workflows",
      "Launch support and continued-management options",
    ],
    accent: "gold",
  },
  {
    label: "Software Design & Development",
    title: "Custom Software / Web App",
    price: "$1,500+",
    note: "Focused pilots from",
    description:
      "Purpose-built software, portals, dashboards, workflow tools, and web applications scoped around a defined operational or customer problem.",
    tiers: [
      "Focused Pilot • $1,500+",
      "Business Tool • $2,500+",
      "Larger Platform • Custom",
    ],
    features: [
      "Discovery and product architecture",
      "Interface and workflow design",
      "Custom application development",
      "Accounts, data, APIs, and integrations",
      "Testing, deployment, and continued iteration",
    ],
    accent: "blue",
  },
  {
    label: "Social Media Management",
    title: "Managed Social Presence",
    price: "$299+/mo",
    note: "Monthly management from",
    description:
      "Consistent strategy, editing, publishing, content coordination, channel management, campaigns, and reporting without the overhead of a large agency.",
    tiers: [
      "Starter • $299/mo",
      "Growth • $499/mo",
      "Managed • $799/mo",
    ],
    features: [
      "Content strategy and monthly planning",
      "Platform-specific editing and publishing",
      "Captions, graphics, photography, and video",
      "Campaign and promotional support",
      "Reporting, refinement, and website coordination",
    ],
    accent: "dark",
  },
] as const;

export default function Packages() {
  return (
    <section className="section-white relative overflow-hidden py-20 md:py-28">
      <div className="testimonial-gold-orb" />
      <div className="ivory-blue-orb ivory-blue-orb-right" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <span className="section-eyebrow section-eyebrow-dark">
                Investment
              </span>

              <h2 className="font-editorial mt-7 text-5xl font-semibold leading-[0.9] tracking-[-0.045em] text-[#10243a] md:text-7xl">
                Competitive starting points.
                <span className="block italic text-[#17477f]">
                  Serious work without agency overhead.
                </span>
              </h2>
            </div>

            <div className="max-w-xl lg:justify-self-end">
              <p className="text-base leading-8 text-[#31465e]/62 md:text-lg">
                We keep entry pricing lean by staying focused on three services
                and scoping the work properly. Final pricing depends on pages,
                functionality, integrations, content volume, and ongoing
                management requirements.
              </p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#10243a]/42">
                All pricing shown in CAD • Third-party fees and ad spend are separate unless included in writing
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {engagements.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 90}>
              <article
                className={[
                  "investment-card",
                  `investment-card-${item.accent}`,
                ].join(" ")}
              >
                <div className="investment-card-rail" />

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#9b762c]">
                      {item.label}
                    </p>

                    <h3 className="font-editorial mt-4 text-3xl font-semibold leading-[0.95] tracking-[-0.035em] text-[#10243a]">
                      {item.title}
                    </h3>
                  </div>

                  <span className="font-editorial text-5xl font-semibold text-[#2f6fbb]/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-8 border-y border-black/10 py-5">
                  <p className="text-[0.6rem] font-black uppercase tracking-[0.16em] text-[#10243a]/34">
                    {item.note}
                  </p>

                  <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#10243a]">
                    {item.price}
                  </p>
                </div>

                <p className="mt-6 text-sm leading-7 text-[#31465e]/60">
                  {item.description}
                </p>

                <div className="mt-6 grid gap-2">
                  {item.tiers.map((tier) => (
                    <div
                      key={tier}
                      className="rounded-xl border border-[#10243a]/10 bg-[#eef4fb] px-4 py-3 text-xs font-black text-[#17477f]"
                    >
                      {tier}
                    </div>
                  ))}
                </div>

                <ul className="mt-7 grid gap-4">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 border-t border-black/[0.08] pt-4 text-sm text-[#222]/66"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2f6fbb]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <Link
                    href="/contact"
                    className={
                      item.accent === "blue"
                        ? "btn-blue w-full"
                        : "btn-dark-outline w-full"
                    }
                  >
                    Get A Scoped Quote
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={300}>
          <div className="mt-8 rounded-[1.5rem] border border-[#9b762c]/16 bg-[#f5efe2] p-6 text-center md:p-8">
            <p className="text-sm leading-7 text-[#31465e]/66">
              Need more than one service? Website development, custom software,
              and social media management can be combined into one coordinated
              scope with one point of contact.
            </p>

            <Link href="/contact" className="btn-gold mt-6">
              Discuss A Combined Scope
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
