import Link from "next/link";
import { PremiumTrailerCard } from "@/components/rentals/PremiumTrailerCard";
import { Container } from "@/components/ui/Container";
import { trailers } from "@/data/trailers";

const featuredTrailers = trailers.slice(0, 3);

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

export function TrailerPreview() {
  return (
    <section
      aria-labelledby="featured-fleet-heading"
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#050505] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.1),transparent_31%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.035),transparent_27%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.78))]"
      />

      <Container className="max-w-[1500px]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
            Our Fleet
          </p>

          <h2
            id="featured-fleet-heading"
            className="mt-4 text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white [text-wrap:balance]"
          >
            Premium trailers, built for real work.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
            Trail & Co Rentals is growing a blacked-out premium fleet designed to keep hauling
            simple, clean, and dependable. Explore the current lineup and send an inquiry for
            availability.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-7">
          {featuredTrailers.map((trailer) => (
            <PremiumTrailerCard key={trailer.id} trailer={trailer} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/rentals"
            className="group/button inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#d4af37] px-7 py-3.5 text-center text-sm font-bold text-black shadow-[0_18px_55px_rgba(212,175,55,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
          >
            Explore Full Fleet
            <ArrowIcon />
          </Link>
        </div>
      </Container>
    </section>
  );
}
