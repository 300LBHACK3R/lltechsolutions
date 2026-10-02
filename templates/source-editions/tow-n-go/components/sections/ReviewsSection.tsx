import Link from "next/link";
import { Container } from "@/components/ui/Container";

const googleReviewsUrl = "/contact#sample-contact";
const reviews = Array.from({ length: 6 }, (_, index) => ({
  name: `Review slot ${index + 1}`,
  meta: "Empty content placeholder",
  quote:
    "Add an approved customer review here after obtaining permission. This is layout guidance, not a customer testimonial.",
  tag: "Placeholder",
}));
const trustSignals = [
  "Add your verified service area",
  "Explain your rental process",
  "List actual equipment",
  "Describe confirmed delivery options",
  "Use approved customer feedback",
];
function Stars() {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
      No rating supplied
    </span>
  );
}

function QuoteIcon() {
  return (
    <svg aria-hidden="true" className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <path
        d="M9 27.5c0-7.8 4.1-14 12.2-18.5l2.4 4.1c-4.4 2.8-7 6-7.8 9.7h7.4V39H9V27.5Zm21 0C30 19.7 34.1 13.5 42.2 9l2.4 4.1c-4.4 2.8-7 6-7.8 9.7h7.4V39H30V27.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
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

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
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

function SecondaryReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.018))] p-5 shadow-[0_20px_65px_rgba(0,0,0,0.27)] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40 hover:shadow-[0_26px_75px_rgba(0,0,0,0.38),0_12px_40px_rgba(212,175,55,0.07)] motion-reduce:transform-none motion-reduce:transition-none sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/[0.045] blur-3xl transition duration-300 group-hover:bg-[#d4af37]/[0.075]"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Stars />

          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#d4af37]">
            {review.tag}
          </span>
        </div>

        <blockquote className="mt-5 flex-1 text-sm leading-7 text-zinc-300">
          {review.quote}
        </blockquote>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-lg font-bold tracking-tight text-white">{review.name}</p>

          <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-zinc-500">
            {review.meta}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ReviewsSection() {
  const featuredReview = reviews[0];
  const secondaryReviews = reviews.slice(1);

  return (
    <section className="relative isolate overflow-hidden border-y border-white/10 bg-black py-16 text-white sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(135deg,#050505_0%,#0c0902_50%,#000000_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_18%,rgba(212,175,55,0.15),transparent_32%),radial-gradient(circle_at_88%_38%,rgba(212,175,55,0.09),transparent_34%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[75vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent"
      />

      <Container className="max-w-[1500px]">
        <div className="grid gap-10 xl:grid-cols-[minmax(340px,0.76fr)_minmax(0,1.24fr)] xl:gap-14">
          <div className="xl:sticky xl:top-32 xl:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d4af37]">
              Customer Feedback
            </p>

            <h2 className="mt-4 max-w-3xl text-[clamp(2.5rem,4.8vw,4.75rem)] font-black leading-[0.95] tracking-[-0.055em] text-white [text-wrap:balance]">
              A place for your customer feedback.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              This layout provides space for genuine, approved customer feedback. No reviews,
              ratings or customer counts are included in the source edition.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-5">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#d4af37]/10 blur-2xl"
                />

                <p className="relative text-3xl font-black text-[#e4c455]">—</p>

                <p className="relative mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-300">
                  No rating supplied
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-3xl font-black text-white">—</p>

                <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-300">
                  Customer Reviews
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-3xl font-black text-white">Local</p>

                <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-300">
                  Sample Valley Service
                </p>
              </div>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[1.6rem] border border-white/10 bg-zinc-950/75 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/65 to-transparent"
              />

              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d4af37]">
                Trust Signals
              </p>

              <div className="mt-5 space-y-3.5">
                {trustSignals.map((signal) => (
                  <div
                    key={signal}
                    className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37]">
                      <CheckIcon />
                    </span>

                    <span>{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <article className="group relative overflow-hidden rounded-[1.85rem] border border-[#d4af37]/25 bg-[linear-gradient(145deg,rgba(212,175,55,0.095),rgba(20,20,20,0.92)_42%,rgba(5,5,5,0.98))] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.5),0_18px_60px_rgba(212,175,55,0.08)] transition duration-300 hover:border-[#d4af37]/45 sm:p-8 lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/90 to-transparent"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d4af37]/10 blur-3xl"
              />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Stars />

                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-300 backdrop-blur">
                    Review placeholder
                  </span>
                </div>

                <div className="mt-7 flex items-start gap-5">
                  <div className="hidden shrink-0 text-[#d4af37]/45 sm:block">
                    <QuoteIcon />
                  </div>

                  <blockquote className="text-xl font-medium leading-9 tracking-[-0.015em] text-zinc-100 sm:text-2xl sm:leading-10">
                    {featuredReview.quote}
                  </blockquote>
                </div>

                <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xl font-bold tracking-tight text-white">
                      {featuredReview.name}
                    </p>

                    <p className="mt-1.5 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-zinc-500">
                      {featuredReview.meta}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#d4af37]">
                    {featuredReview.tag}
                  </span>
                </div>

                <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <a
                    href={googleReviewsUrl}
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#d4af37] px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black shadow-[0_16px_45px_rgba(212,175,55,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0b]"
                  >
                    Configure review link
                    <ArrowIcon />
                  </a>

                  <Link
                    href="/contact"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:bg-[#d4af37]/10 hover:text-[#e4c455] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0b]"
                  >
                    Request Rental
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </article>

            <div className="mt-5 grid items-stretch gap-4 md:grid-cols-2">
              {secondaryReviews.map((review) => (
                <SecondaryReviewCard key={review.name} review={review} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
