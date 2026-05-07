import Reveal from "@/components/ui/Reveal";
import { servicePillars } from "@/data/services";

const serviceNumbers = ["01", "02", "03"];

export default function ServiceScroller() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-[rgba(212,175,55,0.12)] py-16 md:py-24"
    >
      <div className="hero-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="section-eyebrow">Core Services</span>

              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
                Three Ways We Help Businesses Grow And Operate Better.
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base leading-8 text-muted md:text-lg">
                L&amp;L Tech Solutions is built around three clean service
                pillars: custom websites, business tech support, and technical
                infrastructure. Everything is organized, premium, and built to
                make your business look and operate better.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="badge-dark">Web Builds</span>
                <span className="badge-dark">Remote Support</span>
                <span className="badge-dark">Networks & CCTV</span>
                <span className="badge-dark">SEO & Google Setup</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {servicePillars.map((service, index) => (
            <Reveal key={service.title} delayMs={index * 100}>
              <article className="card-premium edge-gold hover-lift flex h-full flex-col overflow-hidden">
                <div className="border-b border-[rgba(212,175,55,0.12)] bg-[linear-gradient(135deg,rgba(212,175,55,0.12),rgba(255,255,255,0.015))] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5d77a]/80">
                        {service.eyebrow}
                      </p>

                      <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.035em]">
                        {service.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-[rgba(212,175,55,0.18)] bg-black/35 px-3 py-1 text-xs font-bold text-[#f5d77a]">
                      {serviceNumbers[index]}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-7 text-muted">
                    {service.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-[rgba(212,175,55,0.16)] bg-[rgba(212,175,55,0.055)] p-4">
                    <p className="text-sm font-semibold text-white/90">
                      {service.highlight}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {service.outcome}
                    </p>
                  </div>

                  <ul className="mt-6 grid gap-3 text-sm text-white/76">
                    {service.services.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[2px] text-[#f5d77a]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <a href="#contact" className="btn-ghost-gold w-full">
                      Ask About This
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={320}>
          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.045)] p-6 md:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5d77a]/80">
                  Not sure where to start?
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                  Start with a free audit and we’ll map the smartest next move.
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
                  We’ll look at your website, systems, support needs, or
                  infrastructure and give you a clear plan before anything moves
                  forward.
                </p>
              </div>

              <a href="#contact" className="btn-gold shrink-0">
                Request Free Audit
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
