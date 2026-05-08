import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Audit",
    text: "We review your website, systems, support needs, and technical environment.",
    detail: "Website, SEO, Google/Facebook, support, infrastructure.",
  },
  {
    number: "02",
    title: "Plan",
    text: "You get clear priorities, realistic scope, pricing, and next steps.",
    detail: "No guessing. No messy scope. No scattered direction.",
  },
  {
    number: "03",
    title: "Build / Fix",
    text: "We execute cleanly across websites, support, systems, and infrastructure.",
    detail:
      "Custom builds, support cleanup, setup, installs, and optimization.",
  },
  {
    number: "04",
    title: "Maintain",
    text: "Ongoing support, updates, SEO, monitoring, and future improvements.",
    detail: "Keep the business running cleaner after the project is done.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-y border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="hero-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="section-eyebrow">Process</span>

              <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl">
                Clean Process.
                <br />
                Clear Outcomes.
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base leading-8 text-muted md:text-lg">
                No confusion, no scattered vendors, no guessing. Just a clean
                technical process that moves from audit to execution to ongoing
                improvement.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="badge-dark">Clear Scope</span>
                <span className="badge-dark">Clean Execution</span>
                <span className="badge-dark">Documented Work</span>
                <span className="badge-dark">Ongoing Support</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[rgba(245,215,122,0.28)] to-transparent lg:block" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 90}>
                <article className="card-premium edge-gold hover-lift relative h-full overflow-hidden p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,215,122,0.45)] to-transparent" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.08)] text-sm font-black text-[#f5d77a] shadow-[0_0_25px_rgba(212,175,55,0.12)]">
                        {step.number}
                      </span>

                      <span className="h-2 w-14 rounded-full bg-[linear-gradient(90deg,#d4af37,#f5d77a)] opacity-80" />
                    </div>

                    <h3 className="mt-8 text-2xl font-black tracking-[-0.035em]">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/78">
                      {step.text}
                    </p>

                    <div className="mt-6 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.045)] p-4">
                      <p className="text-sm leading-6 text-muted">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
