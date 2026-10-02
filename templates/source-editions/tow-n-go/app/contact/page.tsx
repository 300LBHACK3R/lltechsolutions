import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { siteConfig, socialImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Trail & Co Rentals to check trailer rental availability, arrange empty-trailer delivery and collection, or request loaded transport for moving, cleanup, equipment hauling, or contractor work across Sampletown and the Sample Valley.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact Trail & Co Rentals",
    description:
      "Ask about trailer rentals, empty-trailer delivery or loaded transport across Sampletown and the Sample Valley.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Trail & Co Rentals",
    description:
      "Ask about trailer rentals, empty-trailer delivery or loaded transport across Sampletown and the Sample Valley.",
    images: [socialImage.url],
  },
};

function ContactFormFallback() {
  return (
    <div
      className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent"
      />

      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
        Service Inquiry
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
        Loading inquiry form...
      </h2>

      <p className="mt-3 text-sm leading-7 text-zinc-400">Preparing your service inquiry form.</p>

      <div className="mt-8 grid gap-5" aria-hidden="true">
        <div className="h-12 animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" />
        <div className="h-12 animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" />
        <div className="h-32 animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" />
      </div>
    </div>
  );
}

function ContactInfoPanel() {
  return (
    <aside
      id="sample-contact"
      className="relative h-fit min-w-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.3)] sm:p-7 xl:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/75 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#d4af37]/[0.05] blur-3xl"
      />

      <div className="relative">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#d4af37]" />

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Get in touch
          </h2>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
          Contact details are placeholders. This demonstration has no active phone, email or social
          destination.
        </p>

        <div className="mt-7 divide-y divide-white/10">
          <div className="pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
              Phone
            </p>

            <a
              href={siteConfig.phoneHref}
              className="mt-2 inline-flex text-lg font-medium text-white transition-colors duration-200 hover:text-[#e4c456] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0b]"
            >
              {siteConfig.phone}
            </a>
          </div>

          <div className="py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
              Email
            </p>

            <a
              href={siteConfig.emailHref}
              className="mt-2 inline-flex max-w-full break-all text-lg font-medium text-white transition-colors duration-200 hover:text-[#e4c456] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0b] sm:break-words"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
              Service Area
            </p>

            <p className="mt-2 max-w-xl leading-7 text-zinc-300">{siteConfig.serviceArea}</p>
          </div>

          <div className="py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
              Payment Methods
            </p>

            <p className="mt-2 max-w-xl leading-7 text-zinc-300">
              Sample payment-method display only. This site processes no payments.
            </p>
          </div>

          <div className="py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
              Delivery &amp; Transport
            </p>

            <p className="mt-2 max-w-xl leading-7 text-zinc-300">
              Choose empty-trailer delivery and collection, or transport for cargo you prepare and
              load. Availability and pricing depend on your load, route, access and schedule.
            </p>
          </div>

          <div className="pt-5">
            <a
              href={siteConfig.social.facebook}
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/[0.045] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/55 hover:bg-[#d4af37]/10 hover:text-[#f0d36e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0b]"
            >
              Social link not configured
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function ContactPage() {
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
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.26)_43%,rgba(0,0,0,0.76)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,0.10),transparent_44%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#050505] to-transparent"
        />

        <Container className="relative">
          <div className="mx-auto flex min-h-[390px] max-w-5xl flex-col items-center justify-center py-16 text-center sm:min-h-[430px] sm:py-20 lg:min-h-[470px]">
            <p className="rounded-full border border-[#d4af37]/35 bg-black/35 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#e4c456] shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-md sm:text-xs sm:tracking-[0.42em]">
              Contact / Booking Inquiry
            </p>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.65rem,5vw,4.85rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white [text-wrap:balance]">
              Let’s plan your next job.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-200 [text-wrap:balance] sm:text-lg lg:text-xl lg:leading-9">
              Explore the sample service choices and form fields. This demo does not send messages,
              request availability, or reserve a trailer.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-10 sm:py-12 lg:py-14 xl:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.09),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.035),transparent_29%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <Container className="max-w-[1500px]">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.32fr)] lg:gap-8 xl:gap-10">
            <div className="min-w-0">
              <ContactInfoPanel />
            </div>

            <div id="inquiry" className="min-w-0 scroll-mt-28">
              <Suspense fallback={<ContactFormFallback />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
