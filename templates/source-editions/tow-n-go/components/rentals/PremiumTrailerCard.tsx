"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Trailer } from "@/data/trailers";
import { getTrailerDetailHref, type TrailerCategory } from "@/data/trailerCategories";

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={[
        "h-4 w-4 shrink-0 transition-transform duration-500",
        "motion-reduce:transition-none",
        expanded ? "rotate-180" : "xl:group-hover/card:rotate-180",
      ].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transition-none"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function PremiumTrailerCard({
  trailer,
}: {
  trailer: Trailer;
  category?: Pick<TrailerCategory, "id" | "title">;
}) {
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);

  const presentation = {
    title: trailer.shortName || trailer.name,
    description: trailer.summary || trailer.description,
    detailsHref: getTrailerDetailHref(trailer),
  };
  const previewSpecs = trailer.specs.slice(0, 3);
  const detailSpecs = trailer.specs.slice(0, 4);

  const requestHref = `/contact?trailer=${encodeURIComponent(trailer.name)}`;

  const imageLayerClassName = [
    "relative h-[350px] overflow-hidden bg-zinc-950",
    "sm:h-[410px] md:h-[460px]",
    "xl:absolute xl:inset-0 xl:h-full",
    "transition-transform duration-[550ms]",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
    "motion-reduce:transform-none motion-reduce:transition-none",
    isPinnedOpen
      ? "xl:-translate-y-20 xl:scale-[1.045]"
      : [
          "xl:translate-y-0 xl:scale-100",
          "xl:group-hover/card:-translate-y-20",
          "xl:group-hover/card:scale-[1.045]",
        ].join(" "),
  ].join(" ");

  const previewContentClassName = [
    "absolute inset-x-5 bottom-6 z-20",
    "sm:inset-x-6 sm:bottom-7",
    "xl:bottom-24",
    "transition duration-[450ms]",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
    "motion-reduce:transform-none motion-reduce:transition-none",
    isPinnedOpen
      ? "xl:-translate-y-20 xl:opacity-0"
      : [
          "xl:translate-y-0 xl:opacity-100",
          "xl:group-hover/card:-translate-y-20",
          "xl:group-hover/card:opacity-0",
        ].join(" "),
  ].join(" ");

  const detailsPanelClassName = [
    "relative z-30 flex flex-col",
    "border-t border-white/10",
    "bg-[linear-gradient(165deg,rgba(18,18,18,0.99),rgba(4,4,4,0.99))]",
    "xl:absolute xl:inset-x-0 xl:bottom-0 xl:h-[430px]",
    "transition-transform duration-[500ms]",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
    "motion-reduce:transform-none motion-reduce:transition-none",
    isPinnedOpen
      ? "xl:translate-y-0"
      : ["xl:translate-y-[366px]", "xl:group-hover/card:translate-y-0"].join(" "),
  ].join(" ");

  return (
    <article
      onFocusCapture={(event) => {
        const target = event.target as HTMLElement;

        if (target.dataset.revealToggle !== "true") {
          setIsPinnedOpen(true);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsPinnedOpen(false);
        }
      }}
      className={[
        "group/card relative flex min-w-0 flex-col overflow-hidden",
        "rounded-[1.75rem] border bg-black",
        "shadow-[0_28px_90px_rgba(0,0,0,0.46)]",
        "transition duration-500",
        "motion-reduce:transform-none motion-reduce:transition-none",
        "xl:h-[720px]",
        isPinnedOpen
          ? [
              "border-[#d4af37]/55",
              "-translate-y-1",
              "shadow-[0_34px_110px_rgba(0,0,0,0.62),0_18px_60px_rgba(212,175,55,0.12)]",
            ].join(" ")
          : [
              "border-white/10",
              "hover:-translate-y-1.5",
              "hover:border-[#d4af37]/50",
              "hover:shadow-[0_34px_110px_rgba(0,0,0,0.62),0_18px_60px_rgba(212,175,55,0.11)]",
            ].join(" "),
      ].join(" ")}
    >
      <div className={imageLayerClassName}>
        <Image
          src={trailer.image}
          alt="Generated illustrative rental scene; not actual fleet photography"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover/card:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
        />

        <div aria-hidden="true" className="absolute inset-0 bg-black/10" />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.12)_40%,rgba(0,0,0,0.94)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        />

        <div className="absolute left-5 top-5 z-20 rounded-full border border-white/15 bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:left-6 sm:top-6">
          {trailer.status}
        </div>

        <div className={previewContentClassName}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d4af37]">
            Trail & Co Fleet
          </p>

          <h3 className="mt-2 text-3xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
            {presentation.title}
          </h3>

          <p className="mt-2 text-sm font-semibold text-[#d4af37] sm:text-base">
            Pricing starting at {trailer.startingPrice}
          </p>

          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-200 sm:text-base sm:leading-7">
            {presentation.description}
          </p>
        </div>
      </div>

      <div className={detailsPanelClassName}>
        <button
          type="button"
          data-reveal-toggle="true"
          aria-expanded={isPinnedOpen}
          aria-label={
            isPinnedOpen
              ? `Hide details for ${presentation.title}`
              : `View details for ${presentation.title}`
          }
          onClick={() => {
            setIsPinnedOpen((current) => !current);
          }}
          className="hidden h-16 shrink-0 items-center justify-between border-b border-white/10 px-6 text-left text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.045] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4af37]/70 xl:flex"
        >
          <span>{isPinnedOpen ? "Hide details" : "View details"}</span>

          <span className="inline-flex items-center gap-2 text-[#d4af37]">
            Explore
            <ChevronIcon expanded={isPinnedOpen} />
          </span>
        </button>

        <div className="flex flex-1 flex-col p-5 sm:p-6 xl:h-[366px]">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
              Trailer Details
            </p>

            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-tight text-white">{presentation.title}</h3>

              <span className="shrink-0 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-semibold text-[#e5c451]">
                From {trailer.startingPrice}
              </span>
            </div>

            {previewSpecs.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {previewSpecs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[0.7rem] leading-4 text-zinc-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d4af37]">
                Key Specs
              </p>

              <ul className="mt-3 grid gap-2.5 text-sm leading-5 text-zinc-300">
                {detailSpecs.map((spec) => (
                  <li key={spec} className="flex min-w-0 items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]"
                    />

                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:mt-auto">
            <Link
              href={requestHref}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#d4af37] px-5 py-3.5 text-center text-sm font-bold text-black shadow-[0_16px_45px_rgba(212,175,55,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-3 focus-visible:ring-offset-black"
            >
              Request This Trailer
            </Link>

            <Link
              href={presentation.detailsHref}
              className="group/button inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.045] px-5 py-3.5 text-center text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:bg-[#d4af37]/10 hover:text-[#e5c451] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-3 focus-visible:ring-offset-black"
            >
              View Details
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
