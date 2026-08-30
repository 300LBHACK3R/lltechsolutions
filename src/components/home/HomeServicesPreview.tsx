import Reveal from "@/components/ui/Reveal";
import { servicePillars } from "@/data/services";
import Link from "next/link";

export default function HomeServicesPreview() {
  return (
    <section className="section-ivory relative overflow-hidden py-28 md:py-40">
      <div className="ivory-blue-orb ivory-blue-orb-left" />
      <div className="ivory-gold-orb" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <span className="section-eyebrow section-eyebrow-dark">
                Focused Expertise
              </span>

              <h2 className="font-editorial mt-8 text-5xl font-semibold leading-[0.91] tracking-[-0.045em] text-[#10243a] md:text-7xl">
                Three disciplines.
                <span className="block italic text-[#2f6fbb]">
                  One accountable partner.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-base leading-8 text-[#31465e]/72 md:text-lg">
                The website, the product behind it, and the content published
                after launch should reinforce the same business. L&amp;L keeps
                the strategy, execution, and long-term direction connected.
              </p>

              <Link href="/services" className="btn-blue mt-9">
                Review All Services
              </Link>
            </div>

            <div className="border-t border-[#10243a]/10">
              {servicePillars.map((service, index) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="executive-service-row group"
                >
                  <p className="font-editorial text-5xl font-semibold text-[#2f6fbb]/22 transition group-hover:text-[#2f6fbb]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div>
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#9b762c]">
                      {service.eyebrow}
                    </p>

                    <h3 className="font-editorial mt-3 text-3xl font-semibold leading-[0.98] tracking-[-0.035em] text-[#10243a] md:text-4xl">
                      {service.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31465e]/62">
                      {service.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {service.services.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#10243a]/36"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-xs font-black uppercase tracking-[0.15em] text-[#245fa4] transition group-hover:translate-x-1 group-hover:text-[#10243a]">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
