import StudioMark from "@/components/ui/StudioMark";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import type { ReactNode } from "react";

type PageHeroAction = {
  label: string;
  href: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primary?: PageHeroAction;
  secondary?: PageHeroAction;
  meta?: readonly string[];
};

export default function PageHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  meta = [],
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-blue-rail" />
      <div className="corporate-grid absolute inset-0 opacity-14" />
      <div className="page-hero-glow page-hero-glow-left" />
      <div className="page-hero-glow page-hero-glow-right" />
      <div className="premium-grain" />

      <div className="container-premium relative z-10 py-24 md:py-36">
        <Reveal>
          <div className="max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <p className="page-hero-eyebrow">{eyebrow}</p>
              <StudioMark inverse compact />
            </div>

            <h1 className="page-hero-title mt-12">{title}</h1>

            <p className="mt-9 max-w-3xl text-base leading-8 text-[#dbe6f2]/62 md:text-xl md:leading-9">
              {description}
            </p>

            {primary || secondary ? (
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primary ? (
                  <Link href={primary.href} className="btn-gold">
                    {primary.label}
                  </Link>
                ) : null}

                {secondary ? (
                  <Link href={secondary.href} className="btn-blue-outline">
                    {secondary.label}
                  </Link>
                ) : null}
              </div>
            ) : null}

            {meta.length > 0 ? (
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.08] pt-7">
                {meta.map((item, index) => (
                  <span
                    key={item}
                    className="flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-white/36"
                  >
                    {index > 0 ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2f6fbb]" />
                    ) : null}
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
