import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    title: "Custom Web Builds",
    description:
      "Modern websites built from scratch with responsive layouts, SEO foundations, clean metadata, performance structure, and conversion-focused pages.",
    points: [
      "React / Next.js builds",
      "SEO-ready structure",
      "Lead-focused pages",
    ],
  },
  {
    title: "Business Tech Support",
    description:
      "Remote support, cleanup, optimization, account setup, systems management, troubleshooting, and practical ongoing technical help.",
    points: ["Remote troubleshooting", "System cleanup", "Ongoing support"],
  },
  {
    title: "Infrastructure Work",
    description:
      "Rack cleanup, structured cabling, switches, patch panels, CCTV, network setup, and clean on-site technical systems.",
    points: ["Networks & CCTV", "Rack cleanup", "Structured cabling"],
  },
];

export default function Proof() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden border-y border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="hero-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="max-w-5xl">
            <span className="section-eyebrow">Why It Works</span>

            <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl">
              We Don’t Just Do Tech.
              <br />
              We Build Systems That Make Businesses Look And Operate Better.
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
              The goal is simple: stronger presentation, cleaner systems, fewer
              technical problems, and a better customer experience from first
              impression to daily operation.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delayMs={index * 100}>
              <article className="card-premium edge-gold hover-lift h-full overflow-hidden p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-black tracking-[-0.035em]">
                    {pillar.title}
                  </h3>

                  <span className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.07)] px-3 py-1 text-xs font-black text-[#f5d77a]">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-muted">
                  {pillar.description}
                </p>

                <div className="mt-6 grid gap-3">
                  {pillar.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-[rgba(212,175,55,0.12)] bg-[rgba(212,175,55,0.04)] px-4 py-3"
                    >
                      <p className="text-sm font-semibold text-white/86">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={260}>
          <div className="mt-10 rounded-[2rem] border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.04)] p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                [
                  "One Partner",
                  "Websites, support, and infrastructure handled together.",
                ],
                [
                  "Cleaner Execution",
                  "Organized scope, cleaner delivery, better documentation.",
                ],
                [
                  "Business Focused",
                  "Everything is built around trust, leads, and operations.",
                ],
              ].map(([title, text]) => (
                <div key={title}>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-[#f5d77a]/85">
                    {title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
