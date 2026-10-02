"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumTrailerCard } from "@/components/rentals/PremiumTrailerCard";
import type { TrailerCategory } from "@/data/trailerCategories";
import type { Trailer } from "@/data/trailers";

type TrailerCategoryCardProps = {
  category: TrailerCategory;
  previewImage: string;
  trailerCount: number;
  trailer?: Trailer;
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
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

export function TrailerCategoryCard({
  category,
  previewImage,
  trailerCount,
  trailer,
}: TrailerCategoryCardProps) {
  if (trailer) {
    return <PremiumTrailerCard trailer={trailer} category={category} />;
  }

  const categoryHref = `/rentals/${category.id}`;

  const availabilityText =
    trailerCount > 0
      ? `${trailerCount} available option${trailerCount === 1 ? "" : "s"}`
      : "Category ready for future fleet additions";

  return (
    <Link
      href={categoryHref}
      aria-label={`View ${category.title}`}
      className="group relative flex h-full min-w-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_22px_80px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/55 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/75 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.13),transparent_36%)] opacity-80"
      />

      <article className="relative flex w-full min-w-0 flex-col">
        <div className="relative h-60 overflow-hidden border-b border-white/10 bg-black sm:h-64 md:h-72">
          <Image
            src={previewImage}
            alt="Generated illustrative rental scene; not actual fleet photography"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />

          <div aria-hidden="true" className="absolute inset-0 bg-black/20" />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.22)_42%,rgba(0,0,0,0.82)_100%)]"
          />

          <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-full border border-[#d4af37]/35 bg-black/70 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#d4af37] shadow-lg backdrop-blur-md sm:left-5 sm:top-5 sm:text-xs sm:tracking-[0.18em]">
            {category.eyebrow}
          </div>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              {category.title}
            </h2>

            <p className="mt-2 text-sm font-medium leading-6 text-zinc-300">{availabilityText}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
          <p className="text-base leading-8 text-zinc-300">{category.shortDescription}</p>

          {category.bestFor.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {category.bestFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs leading-5 text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-7">
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <span className="text-sm text-zinc-400">View trailers</span>

              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#d4af37]">
                Open category
                <ArrowIcon />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
