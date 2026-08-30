import Reveal from "@/components/ui/Reveal";
import StudioMark from "@/components/ui/StudioMark";
import Link from "next/link";

export default function HomeFinalCTA() {
  return (
    <section className="studio-cta relative overflow-hidden py-28 md:py-40">
      <div className="corporate-grid absolute inset-0 opacity-10" />
      <div className="studio-cta-glow" />
      <div className="premium-grain" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex justify-center">
              <StudioMark inverse />
            </div>

            <h2 className="font-editorial mt-10 text-6xl font-semibold leading-[0.89] tracking-[-0.05em] text-[#f3f7fb] md:text-8xl">
              Ready for a digital presence
              <span className="block italic text-[#e4c77f]">
                that feels unmistakably yours?
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#dbe6f2]/58 md:text-lg">
              Share what the business needs to launch, replace, automate, or
              manage. We will define the clearest scope and build a system that
              reflects the company behind it.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-gold">
                Start A Project
              </Link>
              <Link href="/services" className="btn-blue-outline">
                Review Services
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
