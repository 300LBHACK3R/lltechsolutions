import Reveal from "@/components/ui/Reveal";
import { servicePillars } from "@/data/services";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Development, Remote IT & Network Infrastructure",
  description:
    "Explore L&L Tech Solutions services: custom websites and software, SEO and social media, remote IT and cybersecurity, Cat6 cabling, Ethernet activation, racks, Wi-Fi, CCTV, and low-voltage infrastructure.",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "L&L Tech Solutions Service Divisions",
  itemListElement: servicePillars.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "ProfessionalService",
        name: "L&L Tech Solutions",
        url: "https://lltechsolutions.ca",
      },
      areaServed:
        service.id === "network-infrastructure"
          ? "Calgary and surrounding communities"
          : "Canada",
    },
  })),
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
            <div className="mx-auto max-w-6xl text-center">
              <span className="section-eyebrow">
                L&amp;L Tech Solutions Services
              </span>

              <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl">
                Build The Platform.
                <br />
                Support The People.
                <br />
                Connect The Infrastructure.
              </h1>

              <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-muted md:text-xl md:leading-9">
                Three focused service divisions covering custom development and
                digital growth, remote IT and cybersecurity, and professional
                network infrastructure and low-voltage systems.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-gold">
                  Start A Project
                </Link>
                <Link href="/projects" className="btn-ghost-gold">
                  View Our Work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container-premium">
          <div className="grid gap-8">
            {servicePillars.map((service, index) => (
              <Reveal key={service.id} delayMs={index * 80}>
                <article
                  id={service.id}
                  className="card-premium edge-gold scroll-mt-32 overflow-hidden"
                >
                  <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="border-b border-[rgba(212,175,55,0.12)] bg-[linear-gradient(145deg,rgba(212,175,55,0.16),rgba(255,255,255,0.015))] p-7 lg:border-b-0 lg:border-r lg:p-10">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f5d77a]/82">
                            {service.eyebrow}
                          </p>
                          <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.055em] md:text-5xl">
                            {service.title}
                          </h2>
                        </div>

                        <span className="rounded-full border border-[rgba(212,175,55,0.2)] bg-black/35 px-3 py-1 text-xs font-black text-[#f5d77a]">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="mt-6 text-base leading-8 text-white/72">
                        {service.description}
                      </p>

                      <div className="mt-7 rounded-2xl border border-[rgba(212,175,55,0.16)] bg-black/30 p-5">
                        <p className="text-sm font-black text-white/92">
                          {service.highlight}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          {service.outcome}
                        </p>
                      </div>

                      <p className="mt-6 text-sm leading-7 text-white/52">
                        {service.availability}
                      </p>

                      <div className="mt-8">
                        <Link href="/contact" className="btn-gold">
                          Ask About This Division
                        </Link>
                      </div>
                    </div>

                    <div className="p-7 lg:p-10">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f5d77a]/82">
                        Services & Capabilities
                      </p>

                      <ul className="mt-6 grid gap-4 md:grid-cols-2">
                        {service.services.map((item) => (
                          <li
                            key={item}
                            className="rounded-2xl border border-[rgba(212,175,55,0.12)] bg-[rgba(212,175,55,0.04)] p-5"
                          >
                            <div className="flex gap-3">
                              <span className="mt-[2px] text-[#f5d77a]">•</span>
                              <span className="text-sm leading-7 text-white/80">
                                {item}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {service.id === "network-infrastructure" ? (
                        <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5">
                          <p className="text-sm font-black text-amber-100">
                            Low-voltage scope
                          </p>
                          <p className="mt-2 text-sm leading-7 text-white/58">
                            Electrical outlet installation, circuit
                            modification, and regulated electrical work are not
                            included. RJ11-to-RJ45 conversion depends on the
                            existing cable type, topology, condition, and
                            available wire pairs.
                          </p>
                        </div>
                      ) : null}
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
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-[rgba(212,175,55,0.14)] bg-black/35 p-7 md:p-9">
                <span className="section-eyebrow">Canada-Wide</span>
                <h2 className="mt-5 text-3xl font-black tracking-[-0.045em]">
                  Digital Projects & Remote Support
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Website development, web applications, SEO, Google Business,
                  social media, content editing, remote IT, Microsoft 365,
                  cloud support, VPNs, and cybersecurity guidance.
                </p>
              </div>

              <div className="rounded-[2rem] border border-[rgba(212,175,55,0.14)] bg-black/35 p-7 md:p-9">
                <span className="section-eyebrow">Calgary Area</span>
                <h2 className="mt-5 text-3xl font-black tracking-[-0.045em]">
                  On-Site Networks & Content Production
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Cat6 cabling, Ethernet activation, switches, Wi-Fi, network
                  racks, CCTV, on-site assessments, and professional photo and
                  video sessions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <Reveal>
            <div className="rounded-[2rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(10,10,10,0.88)] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.55)] md:p-12">
              <span className="section-eyebrow">Start With The Right Scope</span>

              <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
                Tell Us What Needs To Be Built, Supported, Secured, Or Connected.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
                We will identify the correct starting point, define the scope,
                and provide the clearest next step for the project.
              </p>

              <div className="mt-8 flex justify-center">
                <Link href="/contact" className="btn-gold">
                  Start A Conversation
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
