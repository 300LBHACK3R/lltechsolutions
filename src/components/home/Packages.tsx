import Reveal from "@/components/ui/Reveal";

const packages = [
  {
    label: "Most Popular",
    title: "Website Build",
    price: "$499+",
    description:
      "Custom-coded business websites, landing pages, SEO setup, Google/Facebook setup, and professional online presence.",
    features: [
      "Custom React / Next.js build",
      "Mobile-first responsive design",
      "SEO metadata foundation",
      "Google-facing page structure",
      "Contact flow and conversion setup",
    ],
  },
  {
    label: "Fast Start",
    title: "Tech Support",
    price: "$50+",
    description:
      "Remote troubleshooting, cleanup, optimization, account setup, and practical business tech support.",
    features: [
      "Remote computer support",
      "System cleanup and optimization",
      "Account, email, and software setup",
      "Small business troubleshooting",
      "Clear next-step recommendations",
    ],
    featured: true,
  },
  {
    label: "Best For Growth",
    title: "Monthly Partner",
    price: "$199+/mo",
    description:
      "Ongoing website updates, SEO, support, management, improvements, and technical direction.",
    features: [
      "Website updates and maintenance",
      "SEO and Google-facing improvements",
      "Ongoing support and optimization",
      "Digital presence improvements",
      "Priority planning and guidance",
    ],
  },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="relative overflow-hidden border-y border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="hero-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="section-eyebrow">Starting Points</span>

              <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl">
                Simple Ways
                <br />
                To Start.
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base leading-8 text-muted md:text-lg">
                Start with a custom build, technical cleanup, or ongoing
                technology partner plan. Every project is scoped properly before
                work begins.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="badge-dark">Clear Pricing</span>
                <span className="badge-dark">Professional Scope</span>
                <span className="badge-dark">No Template Work</span>
                <span className="badge-dark">Business Focused</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 100}>
              <article
                className={[
                  "card-premium edge-gold hover-lift flex h-full flex-col overflow-hidden p-6 md:p-7",
                  item.featured
                    ? "border-[rgba(245,215,122,0.35)] shadow-[0_0_70px_rgba(212,175,55,0.12)]"
                    : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-[#f5d77a]/80">
                      {item.label}
                    </span>

                    <h3 className="mt-4 text-2xl font-black tracking-[-0.035em]">
                      {item.title}
                    </h3>
                  </div>

                  <span className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.07)] px-3 py-1 text-xs font-black text-[#f5d77a]">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-6 text-5xl font-black tracking-[-0.06em] text-[#f5d77a]">
                  {item.price}
                </p>

                <p className="mt-5 text-sm leading-7 text-muted">
                  {item.description}
                </p>

                <div className="mt-6 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.045)] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f5d77a]/80">
                    Includes
                  </p>

                  <ul className="mt-4 grid gap-3 text-sm text-white/78">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-[2px] text-[#f5d77a]">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-7">
                  <a
                    href="#contact"
                    className={
                      item.featured
                        ? "btn-gold w-full"
                        : "btn-ghost-gold w-full"
                    }
                  >
                    Ask About This
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
