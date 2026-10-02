"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { faqCategories, type FaqCategoryId } from "@/data/faqDirectory";

const ALL_CATEGORIES = "all";

type ActiveCategory = typeof ALL_CATEGORIES | FaqCategoryId;

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />

      <path d="m16.5 16.5 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 transition-transform duration-200 group-open:rotate-180"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="m7 9.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function FaqDirectory() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(ALL_CATEGORIES);

  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(
    () =>
      faqCategories
        .filter((category) => activeCategory === ALL_CATEGORIES || category.id === activeCategory)
        .map((category) => ({
          ...category,
          items:
            normalizedQuery.length === 0
              ? category.items
              : category.items.filter((item) =>
                  [item.question, item.answer, category.label, category.description]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedQuery),
                ),
        }))
        .filter((category) => category.items.length > 0),
    [activeCategory, normalizedQuery],
  );

  const resultCount = filteredCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  const hasFilters = activeCategory !== ALL_CATEGORIES || normalizedQuery.length > 0;

  function clearFilters() {
    setActiveCategory(ALL_CATEGORIES);

    setSearchQuery("");
  }

  return (
    <section
      id="faq-directory"
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-directory-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(212,175,55,0.10),transparent_30%),radial-gradient(circle_at_86%_70%,rgba(212,175,55,0.06),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.30em] text-[#d4af37]">
            Search the directory
          </p>

          <h2
            id="faq-directory-heading"
            className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl"
          >
            Straight answers before the job starts.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
            Search by question or filter by topic. Every answer is written to help customers arrive
            prepared without promising services or terms that have not been confirmed.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-[#d4af37]">
              <SearchIcon />
            </div>

            <input
              id="faq-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search towing, delivery, deposits, loading, returns..."
              autoComplete="off"
              className="min-h-16 w-full rounded-2xl border border-white/12 bg-black/70 py-4 pl-14 pr-5 text-base text-white shadow-[0_20px_70px_rgba(0,0,0,0.32)] outline-none transition placeholder:text-zinc-500 focus:border-[#d4af37]/70 focus:ring-4 focus:ring-[#d4af37]/10"
            />
          </div>

          <div
            className="mt-5 flex gap-2 overflow-x-auto pb-3 [scrollbar-width:thin] [scrollbar-color:rgba(212,175,55,0.45)_transparent]"
            aria-label="Filter FAQ categories"
          >
            <button
              type="button"
              onClick={() => setActiveCategory(ALL_CATEGORIES)}
              aria-pressed={activeCategory === ALL_CATEGORIES}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition ${
                activeCategory === ALL_CATEGORIES
                  ? "border-[#d4af37] bg-[#d4af37] text-black"
                  : "border-white/12 bg-white/[0.04] text-zinc-300 hover:border-[#d4af37]/45 hover:text-white"
              }`}
            >
              All Questions
            </button>

            {faqCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition ${
                  activeCategory === category.id
                    ? "border-[#d4af37] bg-[#d4af37] text-black"
                    : "border-white/12 bg-white/[0.04] text-zinc-300 hover:border-[#d4af37]/45 hover:text-white"
                }`}
              >
                {category.shortLabel}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
            <p aria-live="polite">
              Showing <strong className="text-white">{resultCount}</strong>{" "}
              {resultCount === 1 ? "answer" : "answers"}
            </p>

            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="font-semibold text-[#d4af37] underline decoration-[#d4af37]/35 underline-offset-4 transition hover:text-[#f0d36e]"
              >
                Clear search and filters
              </button>
            ) : null}
          </div>
        </div>

        {resultCount > 0 ? (
          <div className="mx-auto mt-12 grid max-w-5xl gap-12">
            {filteredCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-heading`}
                className="scroll-mt-28"
              >
                <div className="grid gap-4 border-b border-white/10 pb-6 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
                      FAQ Category
                    </p>

                    <h3
                      id={`${category.id}-heading`}
                      className="mt-3 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl"
                    >
                      {category.label}
                    </h3>
                  </div>

                  <p className="text-sm leading-7 text-zinc-400 sm:text-right">
                    {category.description}
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  {category.items.map((item, itemIndex) => (
                    <details
                      key={item.id}
                      id={item.id}
                      className="group scroll-mt-28 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-[0_18px_65px_rgba(0,0,0,0.30)] transition duration-200 open:border-[#d4af37]/45 open:bg-[#d4af37]/[0.045] hover:border-[#d4af37]/30"
                    >
                      <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-inset sm:px-6">
                        <span className="flex min-w-0 items-start gap-4">
                          <span className="mt-0.5 text-xs font-black tabular-nums text-[#d4af37]">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>

                          <span className="text-base font-bold leading-7 text-white sm:text-lg">
                            {item.question}
                          </span>
                        </span>

                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-black/45 text-[#d4af37]">
                          <ChevronIcon />
                        </span>
                      </summary>

                      <div className="border-t border-white/8 px-5 pb-6 pt-5 sm:px-6 sm:pb-7">
                        <p className="max-w-4xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                          {item.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-3xl rounded-[1.8rem] border border-[#d4af37]/25 bg-[#d4af37]/[0.055] p-8 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              No matching answer
            </p>

            <h3 className="mt-4 text-2xl font-black text-white">
              Try a broader search or send the job details directly.
            </h3>

            <p className="mt-4 text-base leading-8 text-zinc-300">
              Trail & Co can review the load, locations, timing, and trailer requirements with you.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d4af37] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              Show All Questions
            </button>
          </div>
        )}

        <div className="mx-auto mt-16 max-w-5xl rounded-[1.8rem] border border-[#d4af37]/30 bg-[linear-gradient(135deg,rgba(212,175,55,0.12),rgba(255,255,255,0.025))] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.38)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#d4af37]">
                Still not sure?
              </p>

              <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
                Send the load details. We will help match the job.
              </h3>

              <p className="mt-4 text-base leading-8 text-zinc-300">
                Include photos, approximate dimensions and weight, both locations when applicable,
                and the preferred date.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d4af37] px-6 py-3.5 text-center text-sm font-black uppercase tracking-wide text-black shadow-[0_16px_45px_rgba(212,175,55,0.16)] transition hover:-translate-y-0.5 hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Send an Inquiry
              </Link>

              <a
                href="/contact#sample-contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-black/35 px-6 py-3.5 text-center text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:border-[#d4af37]/50 hover:text-[#e4c455] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Contact details (demo)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
