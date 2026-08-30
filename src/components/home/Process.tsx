import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Discover & Define",
    text: "We clarify the audience, business objective, current assets, required functionality, content needs, constraints, and what success should look like.",
    detail:
      "A clear scope, priorities, responsibilities, customer journey, and delivery plan.",
  },
  {
    number: "02",
    title: "Design The Experience",
    text: "We shape the information architecture, interface, visual direction, content hierarchy, responsive behaviour, and conversion paths before final development.",
    detail:
      "A considered experience designed around the business and the people it serves.",
  },
  {
    number: "03",
    title: "Develop, Test & Launch",
    text: "We build the approved system, integrate the required services, test across representative devices and browsers, optimize performance, and prepare a controlled launch.",
    detail:
      "Custom code, integrations, SEO foundations, analytics, quality assurance, and deployment.",
  },
  {
    number: "04",
    title: "Support & Improve",
    text: "After launch, we can continue developing the product, maintaining the website, publishing content, managing channels, and refining performance over time.",
    detail:
      "A long-term digital partnership instead of an abrupt handoff.",
  },
] as const;

export default function Process() {
  return (
    <section className="section-ivory relative overflow-hidden py-20 md:py-28">
      <div className="ivory-blue-orb ivory-blue-orb-left" />
      <div className="ivory-gold-orb" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="section-eyebrow section-eyebrow-dark">
                The L&amp;L Process
              </span>

              <h2 className="font-editorial mt-7 text-5xl font-semibold leading-[0.9] tracking-[-0.045em] text-[#10243a] md:text-7xl">
                Deliberate from
                <span className="block italic text-[#17477f]">
                  first conversation to launch.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-[#31465e]/62 md:text-lg lg:justify-self-end">
              Strong execution is not only visual. It comes from clear scope,
              informed decisions, careful testing, direct communication, and a
              plan for what happens after launch.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 80}>
              <article className="process-corporate-card">
                <div className="flex items-center justify-between">
                  <span className="font-editorial text-5xl font-semibold text-[#2f6fbb]/28">
                    {step.number}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#2f6fbb]" />
                </div>

                <h3 className="font-editorial mt-7 text-3xl font-semibold leading-[0.96] tracking-[-0.035em] text-[#10243a]">
                  {step.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#31465e]/62">
                  {step.text}
                </p>

                <div className="mt-7 border-t border-black/10 pt-5">
                  <p className="text-xs leading-6 text-[#10243a]/42">
                    {step.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
