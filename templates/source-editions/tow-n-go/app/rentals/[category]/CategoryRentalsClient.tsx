"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TrailerCategorySeoSection } from "@/components/sections/TrailerCategorySeoSection";
import { siteConfig } from "@/lib/site";
import type { Trailer } from "@/data/trailers";
import type { TrailerCategory } from "@/data/trailerCategories";

type CategoryRentalsClientProps = {
  category: TrailerCategory;
  trailers: Trailer[];
};

type TrailerGalleryCardProps = {
  trailer: Trailer;
};

function TrailerGalleryCard({ trailer }: TrailerGalleryCardProps) {
  const galleryImages =
    trailer.images && trailer.images.length > 0 ? trailer.images : [trailer.image];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const totalImages = galleryImages.length;
  const selectedImage = galleryImages[selectedIndex] ?? galleryImages[0] ?? trailer.image;

  const goToPreviousImage = () => {
    setSelectedIndex((currentIndex) => (currentIndex === 0 ? totalImages - 1 : currentIndex - 1));
  };

  const goToNextImage = () => {
    setSelectedIndex((currentIndex) => (currentIndex === totalImages - 1 ? 0 : currentIndex + 1));
  };

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
        return;
      }

      if (totalImages <= 1) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((currentIndex) =>
          currentIndex === 0 ? totalImages - 1 : currentIndex - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((currentIndex) =>
          currentIndex === totalImages - 1 ? 0 : currentIndex + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, totalImages]);

  return (
    <>
      <article
        id={trailer.id}
        className="group scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors duration-300 hover:border-[#d4af37]/35"
      >
        <div className="grid xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          <div className="min-w-0 border-b border-white/10 xl:border-b-0 xl:border-r">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label={`Open image ${selectedIndex + 1} of ${totalImages} for ${trailer.name}`}
              className="relative block h-[340px] w-full overflow-hidden bg-black text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4af37] sm:h-[420px] md:h-[500px]"
            >
              <Image
                src={selectedImage}
                alt={`Generated rental illustration for ${trailer.shortName}; not an actual fleet photo`}
                fill
                sizes="(max-width: 1279px) 100vw, 56vw"
                className="bg-black object-contain transition-transform duration-500 group-hover:scale-[1.015]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10"
              />

              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:left-5 sm:top-5">
                {trailer.status}
              </div>

              {totalImages > 1 && (
                <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:right-5 sm:top-5">
                  {selectedIndex + 1} / {totalImages}
                </div>
              )}

              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d4af37]">
                  Trail & Co Fleet
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {trailer.shortName}
                </h2>
              </div>
            </button>

            {totalImages > 1 && (
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-4 sm:grid-cols-4">
                {galleryImages.map((image, index) => {
                  const isActive = selectedIndex === index;

                  return (
                    <button
                      key={`${trailer.id}-gallery-${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`View ${trailer.shortName} photo ${index + 1}`}
                      aria-pressed={isActive}
                      className={`relative h-24 overflow-hidden rounded-xl border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] sm:h-28 md:h-32 ${
                        isActive
                          ? "border-[#d4af37] ring-1 ring-[#d4af37]/40"
                          : "border-white/10 bg-black/30 hover:border-white/25"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Generated sample rental image ${index + 1}`}
                        fill
                        sizes="(max-width: 639px) 50vw, (max-width: 1279px) 25vw, 14vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="min-w-0 p-6 sm:p-7 md:p-8 xl:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
              Trailer Details
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">{trailer.name}</h2>

            <p className="mt-5 text-base leading-8 text-zinc-300">{trailer.description}</p>

            <div className="mt-5 flex flex-wrap gap-2.5 text-xs text-zinc-400">
              {trailer.specs.slice(0, 3).map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5"
                >
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
                  Key Specs
                </h3>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                  {trailer.specs.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
                  Best For
                </h3>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                  {trailer.bestFor.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
                Available Add-Ons
              </h3>

              <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-300 sm:grid-cols-2 xl:grid-cols-1">
                {trailer.accessories.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]"
                    />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <Link
                href={`/contact?trailer=${encodeURIComponent(trailer.name)}`}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#d4af37] px-6 py-3.5 text-center text-sm font-semibold text-black shadow-[0_18px_55px_rgba(212,175,55,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f0c94a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c94a] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Request This Trailer
              </Link>

              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.045] px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Contact details (demo)
              </a>
            </div>

            <p className="mt-5 text-xs leading-5 text-zinc-500">
              Commercial-grade trailers • Clean, maintained, and ready for real jobs
            </p>
          </div>
        </div>
      </article>

      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${trailer.name} photo gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close image gallery"
            className="absolute right-4 top-4 z-[120] inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-black/70 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:border-[#d4af37]/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] sm:right-6 sm:top-6"
          >
            Close
          </button>

          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPreviousImage();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-[120] -translate-y-1/2 rounded-full border border-white/20 bg-black/70 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:border-[#d4af37]/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] sm:left-6 sm:text-base"
              >
                Prev
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNextImage();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-[120] -translate-y-1/2 rounded-full border border-white/20 bg-black/70 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:border-[#d4af37]/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] sm:right-6 sm:text-base"
              >
                Next
              </button>

              <div className="absolute left-1/2 top-4 z-[120] -translate-x-1/2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur sm:top-6">
                {selectedIndex + 1} / {totalImages}
              </div>
            </>
          )}

          <div
            className="relative h-[calc(100dvh-2rem)] w-full max-w-[1600px] sm:h-[calc(100dvh-3rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={`Generated rental illustration for ${trailer.shortName}; not an actual fleet photo`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

export function CategoryRentalsClient({ category, trailers }: CategoryRentalsClientProps) {
  return (
    <main className="overflow-x-clip bg-[#050505]">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/sample-rentals.webp"
            alt="Generated illustrative rental scene; not actual fleet photography"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.25)_43%,rgba(0,0,0,0.76)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,0.10),transparent_44%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#050505] to-transparent"
        />

        <Container className="relative">
          <div className="mx-auto flex min-h-[420px] max-w-5xl flex-col items-center justify-center py-16 text-center sm:min-h-[460px] sm:py-20 lg:min-h-[500px]">
            <p className="rounded-full border border-[#d4af37]/35 bg-black/40 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#e4c456] shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-md sm:text-xs sm:tracking-[0.35em]">
              {category.eyebrow}
            </p>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.65rem,5.5vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white [text-wrap:balance]">
              {category.title}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-zinc-200 [text-wrap:balance] sm:text-lg lg:text-xl lg:leading-9">
              {category.description}
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/rentals"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-black/50 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/60 hover:text-[#e4c456] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                Back to Trailer Categories
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <TrailerCategorySeoSection category={category} />

      <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.1),transparent_27%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_23%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.68))]"
        />

        <Container className="max-w-[1500px]">
          {trailers.length > 0 ? (
            <div className="space-y-10 lg:space-y-12">
              {trailers.map((trailer) => (
                <TrailerGalleryCard key={trailer.id} trailer={trailer} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center leading-7 text-zinc-400 sm:p-10">
              This trailer category is ready for future fleet expansion. As Trail & Co adds more
              trailers, this page can be filled without redesigning the rental structure.
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
