import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

const trustItems = [
  "Flexible rental options",
  "Delivery available",
  "Sample Valley-based service",
] as const;

export function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050505] py-14 sm:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.13),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.16),rgba(0,0,0,0.72))]"
      />

      <Container className="max-w-[1500px]">
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(0,0,0,0.42))] px-6 py-10 text-center shadow-[0_30px_110px_rgba(0,0,0,0.52)] backdrop-blur-xl sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/85 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#d4af37]/[0.055] blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl"
          />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
              Rental Inquiry
            </p>

            <h2 className="mx-auto mt-4 max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white [text-wrap:balance]">
              Need a trailer for your next job?
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
              Explore the enquiry layout with sample dates, trailer needs and delivery details. This
              demonstration keeps everything in your browser and does not send a message or make a
              booking.
            </p>

            <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <Button href="/contact" className="min-h-12 w-full justify-center">
                Request a Rental
              </Button>

              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/[0.045] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_14px_38px_rgba(0,0,0,0.2)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:bg-[#d4af37]/10 hover:text-[#e6c354] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
              >
                Contact details (demo)
              </a>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex min-h-14 items-center justify-center rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-medium text-zinc-300 shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
