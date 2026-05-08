import Reveal from "@/components/ui/Reveal";
import { servicePillars } from "@/data/services";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore L&L Tech Solutions services including custom websites, SEO, Google and Facebook setup, social media management, ads, remote tech support, networking, CCTV, rack cleanup, and infrastructure.",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "L&L Tech Solutions Services",
  provider: {
    "@type": "LocalBusiness",
    name: "L&L Tech Solutions",
    url: "https://lltechsolutions.ca",
  },
  areaServed: "Canada",
  serviceType: [
    "Custom Website Development",
    "SEO",
    "Google Business Setup",
    "Facebook Setup",
    "Social Media Management",
    "Ads and Lead Generation",
    "Remote Tech Support",
    "Network Infrastructure",
    "CCTV Setup",
    "Rack Cleanup",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />

      <section className="relative overflow-hidden border-b border-[rgba(212,175,55,0.12)] py-20 md:py-28">
        <div className="hero-glow" />

        <div className="container-premium relative z-10">
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <span className="section-eyebrow">
                L&amp;L Tech Solutions Services
              </span>

              <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl">
                Websites, Marketing, IT Support & Infrastructure.
              </h1>

              <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-muted md:text-xl md:leading-9">
                One technology partner for custom websites, SEO, Google and
                Facebook setup, social media management, ads, remote tech
                support, networks, CCTV, rack cleanup, and on-site technical
                systems.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/#contact" className="btn-gold">
                  Request A Quote
                </Link>
                <Link href="/#projects" className="btn-ghost-gold">
                  View Our Work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container-premium">
          <div className="grid gap-6 lg:grid-cols-3">
            {servicePillars.map((service, index) => (
              <Reveal key={service.title} delayMs={index * 100}>
                <article className="card-premium edge-gold hover-lift flex h-full flex-col overflow-hidden">
                  <div className="border-b border-[rgba(212,175,55,0.12)] bg-[linear-gradient(135deg,rgba(212,175,55,0.12),rgba(255,255,255,0.015))] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5d77a]/80">
                          {service.eyebrow}
                        </p>

                        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.035em]">
                          {service.title}
                        </h2>
                      </div>

                      <span className="rounded-full border border-[rgba(212,175,55,0.18)] bg-black/35 px-3 py-1 text-xs font-bold text-[#f5d77a]">
                        0{index + 1}
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
                      <Link href="/#contact" className="btn-ghost-gold w-full">
                        Ask About This
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(212,175,55,0.12)] bg-[rgba(212,175,55,0.035)] py-16 md:py-20">
        <div className="container-premium">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <span className="section-eyebrow">How We Fit In</span>
                <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
                  Built For Businesses That Need More Than A Basic Website.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "You need a stronger online presence.",
                  "You need better Google and Facebook setup.",
                  "You need social media, ads, and lead generation cleaned up.",
                  "You need remote tech support without chasing random help.",
                  "You need networking, CCTV, cabling, or rack work done properly.",
                  "You want one reliable partner managing the technical side.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[rgba(212,175,55,0.14)] bg-black/35 p-5"
                  >
                    <p className="text-sm leading-7 text-white/82">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <Reveal>
            <div className="rounded-[2rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(10,10,10,0.88)] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.55)] md:p-12">
              <span className="section-eyebrow">Start Properly</span>

              <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
                Tell Us What You Need Built, Fixed, Cleaned Up, Or Managed.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
                We’ll help map the smartest next step — whether that is a new
                website, SEO cleanup, social media support, ads, remote tech
                support, or on-site infrastructure work.
              </p>

              <div className="mt-8 flex justify-center">
                <Link href="/#contact" className="btn-gold">
                  Request A Quote
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
