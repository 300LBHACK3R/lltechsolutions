import Reveal from "@/components/ui/Reveal";
import Image from "next/image";

const metrics = [
  ["Web Builds", "Custom React / Next.js websites built properly"],
  ["Business Tech", "Remote support, cleanup, setup, and systems"],
  ["Infrastructure", "Networks, CCTV, racks, cabling, and installs"],
];

const trustItems = [
  "Custom builds",
  "SEO-ready",
  "Remote support",
  "On-site systems",
];

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="tech-hero-bg relative min-h-[720px] overflow-hidden border-b border-[rgba(212,175,55,0.12)]"
      >
        <div className="absolute inset-0 bg-black/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.24),transparent_42%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,215,122,0.55)] to-transparent" />

        <div className="container-premium relative z-10 flex min-h-[720px] items-center py-20">
          <div className="grid w-full gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <div className="max-w-3xl">
                <span className="badge-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Canada Wide • Premium Technology Partner
                </span>

                <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl">
                  Websites,
                  <br />
                  Support &
                  <br />
                  Infrastructure
                  <span className="text-[#f5d77a]">.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
                  L&amp;L Tech Solutions builds custom websites, manages
                  business technology, and installs clean technical systems for
                  companies that want things done properly.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="btn-gold">
                    Request A Quote
                  </a>
                  <a href="#projects" className="btn-ghost-gold">
                    View Our Work
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {trustItems.map((item) => (
                    <span key={item} className="badge-dark">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="relative">
                <div className="absolute -inset-8 rounded-[2.5rem] bg-[rgba(212,175,55,0.10)] blur-3xl" />

                <div className="card-premium edge-gold relative overflow-hidden rounded-[2rem] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.72)] md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        L&amp;L Technology Stack
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Web, support, and infrastructure under one partner.
                      </p>
                    </div>

                    <span className="badge-gold">Project Ready</span>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[rgba(212,175,55,0.14)] bg-black/40">
                    <Image
                      src="/images/hero/tech-hero.jpg"
                      alt="Premium technical infrastructure and server systems"
                      width={1400}
                      height={900}
                      priority
                      className="h-[260px] w-full object-cover opacity-85 md:h-[340px]"
                    />
                  </div>

                  <div className="mt-6 grid gap-3">
                    {metrics.map(([title, text]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/8 bg-white/[0.025] p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {title}
                            </p>
                            <p className="mt-1 text-xs text-muted">{text}</p>
                          </div>

                          <div className="h-2 w-16 rounded-full bg-[linear-gradient(90deg,#d4af37,#f5d77a)]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="hero-wave" />
      </section>

      <section className="relative bg-[var(--bg-main)] py-16 text-center md:py-20">
        <div className="container-premium">
          <Reveal delayMs={100}>
            <span className="section-eyebrow">
              Welcome To L&amp;L Tech Solutions
            </span>

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-5xl">
              We Make Technology Look Better, Work Better, And Sell Better.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
              From custom web builds and SEO to remote tech support, networks,
              CCTV, rack cleanup, and on-site infrastructure — we help
              businesses present stronger and operate cleaner.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
