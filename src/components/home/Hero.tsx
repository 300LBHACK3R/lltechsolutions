import Reveal from "@/components/ui/Reveal";

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="badge-dark">{children}</span>;
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="hero-glow" />

      <div className="container-premium">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div>
              <span className="badge-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Canada Wide • Premium Technology Partner
              </span>

              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
                Custom Websites,
                <br />
                IT Support &
                <br />
                On-Site Systems.
              </h1>

              <div className="mt-5 h-[2px] w-20 rounded-full bg-[linear-gradient(90deg,#d4af37,#f5d77a)]" />

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                L&amp;L Tech Solutions helps businesses build better websites,
                clean up their technology, automate workflows, and manage their
                digital and physical systems properly.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="btn-gold">
                  Start With A Free Audit
                </a>
                <a href="#services" className="btn-ghost-gold">
                  View Services
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Pill>Custom React Builds</Pill>
                <Pill>SEO & Google Setup</Pill>
                <Pill>Remote Tech Support</Pill>
                <Pill>Networks & CCTV</Pill>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="card-premium edge-gold p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Technology Partner Snapshot
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Example of how we approach business systems.
                  </p>
                </div>

                <span className="badge-gold">Live Ready</span>
              </div>

              <div className="mt-6 grid gap-4">
                {[
                  [
                    "Website",
                    "Custom build, SEO, performance, lead flow",
                    "92%",
                  ],
                  [
                    "Support",
                    "Remote troubleshooting and business systems",
                    "86%",
                  ],
                  ["Infrastructure", "Networks, CCTV, racks, cabling", "79%"],
                ].map(([label, text, value]) => (
                  <div key={label} className="card-soft p-4">
                    <div className="flex justify-between text-xs text-muted">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <p className="mt-2 text-sm text-white/90">{text}</p>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-[linear-gradient(90deg,#d4af37,#f5d77a)]"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
