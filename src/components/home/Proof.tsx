import Reveal from "@/components/ui/Reveal";
import { servicePillars } from "@/data/services";
import Link from "next/link";

export default function Proof() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden border-y border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="hero-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-5xl">
              <span className="section-eyebrow">Three Connected Divisions</span>

              <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl">
                One Technology Partner.
                <br />
                Three Clear Ways To Work Together.
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base leading-8 text-muted md:text-lg">
                Build the digital platform, support the people using it, and
                connect the physical infrastructure underneath it—all with one
                organized technical partner.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="badge-dark">Build</span>
                <span className="badge-dark">Secure</span>
                <span className="badge-dark">Connect</span>
                <span className="badge-dark">Manage</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {servicePillars.map((pillar, index) => (
            <Reveal key={pillar.id} delayMs={index * 100}>
              <article className="card-premium edge-gold hover-lift flex h-full flex-col overflow-hidden">
                <div className="border-b border-[rgba(212,175,55,0.12)] bg-[linear-gradient(135deg,rgba(212,175,55,0.14),rgba(255,255,255,0.015))] p-6 md:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f5d77a]/82">
                        {pillar.eyebrow}
                      </p>
                      <h3 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-0.045em]">
                        {pillar.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-[rgba(212,175,55,0.2)] bg-black/35 px-3 py-1 text-xs font-black text-[#f5d77a]">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-sm leading-7 text-muted">
                    {pillar.description}
                  </p>

                  <div className="mt-6 rounded-2xl border border-[rgba(212,175,55,0.16)] bg-[rgba(212,175,55,0.055)] p-5">
                    <p className="text-sm font-black text-white/92">
                      {pillar.highlight}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {pillar.outcome}
                    </p>
                  </div>

                  <ul className="mt-6 grid gap-3 text-sm text-white/78">
                    {pillar.services.slice(0, 6).map((service) => (
                      <li key={service} className="flex gap-3">
                        <span className="mt-[2px] text-[#f5d77a]">•</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-white/8 pt-5 text-xs leading-6 text-white/52">
                    {pillar.availability}
                  </p>

                  <div className="mt-auto pt-7">
                    <Link href={pillar.href} className="btn-ghost-gold w-full">
                      {pillar.cta}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
