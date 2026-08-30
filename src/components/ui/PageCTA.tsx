import StudioMark from "@/components/ui/StudioMark";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

type PageCTAProps = {
  eyebrow?: string;
  title: string;
  accent: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function PageCTA({
  eyebrow = "Start A Conversation",
  title,
  accent,
  description,
  primaryLabel = "Start A Project",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: PageCTAProps) {
  return (
    <section className="studio-cta">
      <div className="corporate-grid absolute inset-0 opacity-10" />
      <div className="studio-cta-glow" />
      <div className="premium-grain" />

      <div className="container-premium relative z-10 py-28 md:py-40">
        <Reveal>
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex justify-center">
              <StudioMark inverse />
            </div>

            <p className="mt-10 text-[0.66rem] font-semibold uppercase tracking-[0.21em] text-[#ead39a]">
              {eyebrow}
            </p>

            <h2 className="font-editorial mt-7 text-5xl font-semibold leading-[0.9] tracking-[-0.045em] text-white md:text-7xl">
              {title}
              <span className="block italic text-[#e4c77f]">{accent}</span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#dbe6f2]/56 md:text-lg">
              {description}
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={primaryHref} className="btn-gold">
                {primaryLabel}
              </Link>

              {secondaryLabel && secondaryHref ? (
                <Link href={secondaryHref} className="btn-blue-outline">
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
