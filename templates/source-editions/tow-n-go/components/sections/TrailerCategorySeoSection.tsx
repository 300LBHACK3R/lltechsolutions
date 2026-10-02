import { Container } from "@/components/ui/Container";
import type { TrailerCategory } from "@/data/trailerCategories";
import { getTrailerCategorySeoContent } from "@/data/trailerCategorySeoContent";

type TrailerCategorySeoSectionProps = {
  category: TrailerCategory;
};

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
      <path
        d="m5 12.5 4.25 4.25L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function GuideList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 grid gap-3 text-sm leading-7 text-zinc-300">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 items-start gap-3">
          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#d4af37]">
            <CheckIcon />
          </span>

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrailerCategorySeoSection({ category }: TrailerCategorySeoSectionProps) {
  const content = getTrailerCategorySeoContent(category.id);

  if (!content) {
    return null;
  }

  const headingId = `${category.id}-rental-guide-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#050505] py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(140deg,#030303_0%,#090806_48%,#000000_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.1),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.78))]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[74vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37]/55 to-transparent"
      />

      <Container className="max-w-[1500px]">
        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] xl:gap-12">
          <div className="min-w-0 xl:sticky xl:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
              Trailer Rental Guide
            </p>

            <h2
              id={headingId}
              className="mt-4 max-w-3xl text-[clamp(2.25rem,4.2vw,4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white [text-wrap:balance]"
            >
              {content.heading}
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
              {content.intro}
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <article className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.016))] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] transition duration-300 hover:border-[#d4af37]/35">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
                  Service Area
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-300">{content.serviceNote}</p>
              </article>

              <article className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.016))] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] transition duration-300 hover:border-[#d4af37]/35">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
                  Add-Ons / Support
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-300">{content.addOnsNote}</p>
              </article>
            </div>
          </div>

          <div className="grid min-w-0 gap-5 md:grid-cols-2">
            <article className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-6 shadow-[0_22px_75px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40 motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/75 to-transparent"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#d4af37]/[0.045] blur-3xl transition duration-300 group-hover:bg-[#d4af37]/[0.075]"
              />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-9 shrink-0 bg-[#d4af37]" />

                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {content.bestUsesTitle}
                  </h3>
                </div>

                <GuideList items={content.bestUses} />
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-6 shadow-[0_22px_75px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40 motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/75 to-transparent"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#d4af37]/[0.045] blur-3xl transition duration-300 group-hover:bg-[#d4af37]/[0.075]"
              />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-9 shrink-0 bg-[#d4af37]" />

                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {content.customerTypesTitle}
                  </h3>
                </div>

                <GuideList items={content.customerTypes} />
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.016))] p-5 shadow-[0_22px_75px_rgba(0,0,0,0.32)] sm:p-7 md:col-span-2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/75 to-transparent"
              />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-9 shrink-0 bg-[#d4af37]" />

                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Common questions
                  </h3>
                </div>

                <div className="mt-6 grid gap-3">
                  {content.faq.map((item) => (
                    <details
                      key={item.question}
                      className="group relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/35 transition duration-200 open:border-[#d4af37]/30 hover:border-[#d4af37]/35"
                    >
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-[1.2rem] px-4 py-4 text-left outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4af37]/70 sm:px-5 [&::-webkit-details-marker]:hidden">
                        <span className="min-w-0 text-sm font-semibold leading-6 text-white sm:text-base">
                          {item.question}
                        </span>

                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-black/50 text-[#d4af37] transition duration-200 group-open:border-[#d4af37]/35 group-open:bg-[#d4af37]/10">
                          <PlusIcon />
                        </span>
                      </summary>

                      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                        <div className="border-t border-white/10 pt-4">
                          <p className="max-w-5xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
