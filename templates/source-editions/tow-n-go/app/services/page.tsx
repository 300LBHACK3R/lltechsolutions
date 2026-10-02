import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { siteConfig, socialImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trailer Rentals, Delivery & Transport",
  description:
    "Rent a trailer, arrange empty-trailer delivery and collection, or request loaded transport with Trail & Co Rentals in Sampletown and the Sample Valley.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Trailer Rentals, Delivery & Transport | Trail & Co Rentals",
    description:
      "Trailer rentals, empty-trailer delivery and collection, and pickup, transport and delivery across Sampletown and the Sample Valley.",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trailer Rentals, Delivery & Transport | Trail & Co Rentals",
    description:
      "Trailer rentals, empty-trailer delivery and collection, and pickup, transport and delivery across Sampletown and the Sample Valley.",
    images: [socialImage.url],
  },
};

export default function ServicesPage() {
  return (
    <main className="overflow-x-clip bg-[#050505]">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/sample-rentals.webp"
            alt="Generated illustrative equipment-rental scene; not actual fleet photography"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.25)_42%,rgba(0,0,0,0.76)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,0.11),transparent_45%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#050505] to-transparent"
        />

        <Container className="relative">
          <div className="mx-auto flex min-h-[410px] max-w-5xl flex-col items-center justify-center py-16 text-center sm:min-h-[450px] sm:py-20 lg:min-h-[490px]">
            <p className="rounded-full border border-[#d4af37]/35 bg-black/40 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#e4c456] shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-md sm:text-xs sm:tracking-[0.35em]">
              Rentals / Delivery / Transport
            </p>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,5.5vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white [text-wrap:balance]">
              Three ways to get the job moving.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-zinc-200 [text-wrap:balance] sm:text-lg lg:text-xl lg:leading-9">
              Tow it yourself, have an empty rental trailer brought to you, or arrange transport for
              cargo you prepare and load. Choose the service that fits your job.
            </p>
          </div>
        </Container>
      </section>

      <ServicesPreview details />
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid items-center gap-7 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-9 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-semibold text-white">Need the extras?</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300">
                Ask about a hitch, ratchet straps, cargo nets, boxes or moving blankets with your
                inquiry. Accessory availability and pricing depend on the trailer and your
                requirements.
              </p>
            </div>
            <Button href="/contact#inquiry">Ask about accessories</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
