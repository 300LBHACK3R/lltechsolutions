import Reveal from "@/components/ui/Reveal";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <section className="tech-hero-bg relative min-h-[620px] overflow-hidden border-b border-[rgba(212,175,55,0.12)]">
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22),transparent_42%)]" />

        <div className="container-premium relative z-10 flex min-h-[620px] items-center justify-center pt-10 text-center">
          <Reveal>
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-[rgba(212,175,55,0.25)] bg-black/55 shadow-[0_0_60px_rgba(212,175,55,0.22)] backdrop-blur-md md:h-40 md:w-40">
                <Image
                  src="/brand/logo.png"
                  alt="L&L Tech Solutions"
                  width={240}
                  height={240}
                  priority
                  className="h-28 w-auto object-contain md:h-36"
                />
              </div>

              <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
                L&amp;L Tech Solutions
              </h1>

              <p className="mt-4 text-xl font-semibold text-[#f5d77a] md:text-2xl">
                Custom Websites • IT Support • Technical Infrastructure
              </p>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                Premium technology services for modern businesses — from custom
                web builds and online growth to remote support, networks, CCTV,
                rack cleanup, and business systems.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#contact" className="btn-gold">
                  Start With A Free Audit
                </a>
                <a href="#services" className="btn-ghost-gold">
                  View Services
                </a>
              </div>
            </div>
          </Reveal>
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
              We Make Technology Work For Your Business.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
              We build clean custom websites, manage business technology,
              provide remote support, and install organized technical
              infrastructure for companies that want things done properly.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
