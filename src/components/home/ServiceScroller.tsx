import Reveal from "@/components/ui/Reveal";
import { servicePillars } from "@/data/services";

export default function ServiceScroller() {
  return (
    <section
      id="services"
      className="border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="container-premium">
        <Reveal>
          <div className="max-w-3xl">
            <span className="section-eyebrow">Core Services</span>
            <h2 className="section-title mt-5">
              Three Ways We Help Businesses Grow And Operate Better.
            </h2>
            <p className="section-subtitle mt-5">
              Websites, support, and infrastructure — packaged cleanly under one
              reliable technology partner.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {servicePillars.map((service, index) => (
            <Reveal key={service.title} delayMs={index * 100}>
              <article className="card-premium edge-gold flex h-full flex-col p-7 transition-transform duration-300 hover:scale-[1.01]">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5d77a]/80">
                  {service.eyebrow}
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted">
                  {service.description}
                </p>

                <div className="mt-5 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.05)] p-4 text-sm font-semibold text-white/90">
                  {service.highlight}
                </div>

                <ul className="mt-6 space-y-3 text-sm text-white/76">
                  {service.services.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[2px] text-[#f5d77a]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={300}>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.04)] p-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Not sure which service you need?
              </h3>
              <p className="mt-1 text-sm text-muted">
                Start with a free tech audit. We’ll identify what matters first
                and give you a clear path forward.
              </p>
            </div>

            <a href="#contact" className="btn-gold">
              Request Free Audit
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
