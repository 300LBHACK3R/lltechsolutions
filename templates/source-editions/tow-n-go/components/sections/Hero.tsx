import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const trustItems = [
  "Commercial-grade trailers",
  "Clean rental options",
  "Ready for real jobs",
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-black">
      <style>
        {`
          @keyframes trailHeroZoom {
            from {
              transform: scale(1.02);
            }

            to {
              transform: scale(1.09);
            }
          }

          @keyframes trailHeroReveal {
            from {
              opacity: 0;
              transform: translateY(24px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .trail-hero-stage {
            min-height: clamp(
              720px,
              calc(100svh - 80px),
              940px
            );
          }

          .trail-hero-image {
            animation: trailHeroZoom 20s
              cubic-bezier(0.22, 1, 0.36, 1)
              infinite alternate;
            transform-origin: 72% 58%;
          }

          .trail-hero-reveal {
            animation: trailHeroReveal 850ms
              cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          @media (min-width: 640px) {
            .trail-hero-stage {
              min-height: clamp(
                740px,
                calc(100svh - 96px),
                960px
              );
            }
          }

          @media (min-width: 1280px) {
            .trail-hero-stage {
              min-height: clamp(
                780px,
                calc(100svh - 112px),
                980px
              );
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .trail-hero-image,
            .trail-hero-reveal {
              animation: none !important;
              transform: none !important;
            }
          }
        `}
      </style>

      <div className="absolute inset-0 -z-30">
        <Image
          src="/images/sample-rentals.webp"
          alt="Generated illustrative equipment-rental scene; not actual fleet photography"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="trail-hero-image object-cover object-[66%_center] brightness-[0.88] contrast-[1.08] saturate-[1.06] sm:object-[68%_center] lg:object-[70%_center]"
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-black/15" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.91)_27%,rgba(0,0,0,0.64)_51%,rgba(0,0,0,0.18)_78%,rgba(0,0,0,0.06)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.05)_42%,rgba(0,0,0,0.76)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-1/2 -z-10 h-[760px] w-[760px] -translate-y-1/2 rounded-full bg-[#d4af37]/11 blur-[170px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12rem] right-[8%] -z-10 h-[520px] w-[760px] rounded-full bg-[#d4af37]/[0.055] blur-[145px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[#050505] via-[#050505]/52 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent"
      />

      <Container className="relative max-w-[1500px]">
        <div className="trail-hero-stage flex items-center py-16 sm:py-20 lg:py-24">
          <div className="w-full max-w-[970px]">
            <p
              className="trail-hero-reveal inline-flex max-w-full rounded-full border border-[#d4af37]/45 bg-black/45 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#e5c451] shadow-[0_14px_42px_rgba(0,0,0,0.38)] backdrop-blur-md sm:px-5 sm:text-xs sm:tracking-[0.3em]"
              style={{ animationDelay: "80ms" }}
            >
              Premium trailer rentals in the Sample Valley
            </p>

            <h1
              className="trail-hero-reveal mt-7 max-w-[960px] text-[clamp(3.35rem,6.25vw,6.65rem)] font-black leading-[0.89] tracking-[-0.065em] text-white [text-shadow:0_10px_38px_rgba(0,0,0,0.72)]"
              style={{ animationDelay: "150ms" }}
            >
              <span className="block">Trailer Rentals</span>

              <span className="block bg-gradient-to-r from-white via-[#f5f5f5] to-[#bcbcbc] bg-clip-text text-transparent">
                That Look Premium
              </span>

              <span className="block">and Work Hard.</span>
            </h1>

            <div className="trail-hero-reveal mt-8 max-w-3xl" style={{ animationDelay: "230ms" }}>
              <p className="text-xl font-semibold text-white sm:text-2xl lg:text-[1.7rem]">
                Trailer rentals starting at{" "}
                <span className="text-[#d4af37]">$115/day · sample rate</span>
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg lg:text-xl lg:leading-9">
                Tow it yourself, have an empty trailer delivered, or let Trail & Co transport your
                prepared load. Serving Sampletown and the Sample Valley.
              </p>
            </div>

            <div
              className="trail-hero-reveal mt-9 grid max-w-[660px] gap-3 sm:grid-cols-2"
              style={{ animationDelay: "310ms" }}
            >
              <Button href="/rentals" className="min-h-14 w-full justify-center px-8 text-base">
                Browse Trailers
              </Button>

              <Button
                href="#service-options"
                variant="secondary"
                className="min-h-14 w-full justify-center border-white/20 bg-black/45 px-8 text-base"
              >
                Choose Your Service
              </Button>
            </div>

            <div
              className="trail-hero-reveal mt-9 w-full max-w-[830px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-md"
              style={{ animationDelay: "390ms" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-stretch">
                {trustItems.map((item, index) => (
                  <div
                    key={item}
                    className={[
                      "flex min-h-14 flex-1 items-center gap-3 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300",
                      index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : "",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37] shadow-[0_0_16px_rgba(212,175,55,0.9)]"
                    />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 lg:flex">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em]">
          Explore the fleet
        </span>

        <span className="h-10 w-px bg-gradient-to-b from-[#d4af37]/80 to-transparent" />
      </div>
    </section>
  );
}
