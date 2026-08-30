import HeroShowcase from "@/components/home/HeroShowcase";
import Reveal from "@/components/ui/Reveal";
import StudioMark from "@/components/ui/StudioMark";
import Link from "next/link";

const proofPoints = [
  { label: "Strategy", value: "Designed around the business" },
  { label: "Execution", value: "Custom code and content" },
  { label: "Continuity", value: "Managed beyond launch" },
] as const;

export default function Hero() {
  return (
    <section
      id="home"
      className="studio-hero relative overflow-hidden border-b border-white/[0.07]"
    >
      <div className="hero-blue-orb hero-blue-orb-left" />
      <div className="hero-blue-orb hero-blue-orb-right" />
      <div className="hero-gold-orb" />
      <div className="hero-ambient-line" />
      <div className="premium-grain" />

      <div className="container-premium relative z-10 grid min-h-[min(980px,100svh)] gap-14 py-20 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16 lg:py-28 2xl:min-h-[900px]">
        <Reveal>
          <div className="max-w-[760px]">
            <StudioMark inverse />

            <p className="mt-9 text-[0.66rem] font-semibold uppercase tracking-[0.21em] text-[#d9c388]/80">
              Website Design &amp; Development
              <span className="mx-3 text-white/18">/</span>
              Software Design &amp; Development
              <span className="mx-3 text-white/18">/</span>
              Social Media Management
            </p>

            <h1 className="mt-8 max-w-[800px] text-[clamp(3.7rem,6vw,6.55rem)] font-black leading-[0.91] tracking-[-0.066em] text-[#f8fbff]">
              Your business has outgrown ordinary.
              <span className="font-editorial mt-2 block font-semibold italic text-[#e3ca8c]">
                Its digital presence should too.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#dbe6f2]/68 md:text-lg md:leading-9">
              L&amp;L Tech Solutions creates high-performance websites,
              purpose-built software, and managed content systems for
              businesses ready to look established, operate intelligently,
              and stay visible.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="btn-gold">
                Start A Project
              </Link>
              <Link href="/projects" className="btn-blue-outline">
                Explore Selected Work
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-1 border-y border-white/[0.08] py-2 sm:grid-cols-3 sm:py-5">
              {proofPoints.map((item, index) => (
                <div
                  key={item.label}
                  className={[
                    "py-3 sm:px-4 sm:py-0 sm:first:pl-0 sm:last:pr-0",
                    index > 0
                      ? "border-t border-white/[0.08] sm:border-l sm:border-t-0"
                      : "",
                  ].join(" ")}
                >
                  <p className="text-[0.59rem] font-semibold uppercase tracking-[0.18em] text-white/30">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#f0e6cf] sm:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={130}>
          <HeroShowcase />
        </Reveal>
      </div>

      <div className="hero-wave" />
    </section>
  );
}
