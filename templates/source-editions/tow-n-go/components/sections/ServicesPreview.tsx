import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  serviceAvailabilityNote,
  serviceInquiryHref,
  servicePathways,
} from "@/data/servicePathways";

export function ServicesPreview({ details = false }: { details?: boolean }) {
  return (
    <section
      id="service-options"
      aria-labelledby="service-options-heading"
      className="scroll-mt-28 border-b border-white/10 bg-[#090909] py-14 sm:py-20"
    >
      <Container className="max-w-[1500px]">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
            Three ways to get moving
          </p>
          <h2
            id="service-options-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Your job. Your choice.
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-300">
            Rent a trailer, have an empty trailer delivered, or arrange transport for your prepared
            load across Sampletown and the Sample Valley.
          </p>
        </div>
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {servicePathways.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className="flex min-w-0 scroll-mt-28 flex-col rounded-3xl border border-white/15 bg-white/[0.025] p-6 transition-colors hover:border-[#d4af37]/60 motion-reduce:transition-none sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="text-sm font-semibold text-[#d4af37]">
                  0{index + 1}
                </span>
                <p className="text-xs font-semibold uppercase leading-6 tracking-widest text-zinc-300">
                  {service.title}
                </p>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                {service.heading}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">{service.description}</p>
              {details && (
                <ol className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  {service.steps.map((step, stepIndex) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-300">
                      <span className="text-[#d4af37]">{stepIndex + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              )}
              <div className="mt-auto pt-7">
                <Button
                  href={serviceInquiryHref(service.id)}
                  variant="secondary"
                  className="w-full"
                >
                  {service.action}
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-5xl text-sm leading-7 text-zinc-400">{serviceAvailabilityNote}</p>
        {!details && (
          <Link
            href="/services"
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-[#d4af37] underline-offset-4 hover:underline"
          >
            Explore services and accessories{" "}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        )}
      </Container>
    </section>
  );
}
