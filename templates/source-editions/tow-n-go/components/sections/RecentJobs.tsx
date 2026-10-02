import Link from "next/link";
import { JobCard } from "@/components/jobs/JobCard";
import { Container } from "@/components/ui/Container";
import { getGalleryEntries } from "@/data/projectGallery";

export function RecentJobs({ fullPage = false }: { fullPage?: boolean }) {
  const allEntries = getGalleryEntries();
  const entries = fullPage ? allEntries : allEntries.slice(0, 2);
  const hasEntries = entries.length > 0;
  const hasExamples = entries.some((entry) => entry.kind === "example");
  const EmptyHeading = fullPage ? "h2" : "h3";
  const imageSizes =
    entries.length === 1
      ? "(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 48px), 700px"
      : "(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(50vw - 44px), (max-width: 1500px) calc(50vw - 56px), 700px";
  const detailImageSizes =
    entries.length === 1
      ? "(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc(50vw - 34px), 340px"
      : "(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc(50vw - 34px), (max-width: 1023px) calc(25vw - 32px), (max-width: 1500px) calc(25vw - 39px), 340px";

  return (
    <section
      id={fullPage ? "project-gallery" : "recent-jobs"}
      aria-label={hasExamples ? "Hauling ideas" : "Recent jobs"}
      className={`bg-[#050505] ${fullPage ? "pb-16 pt-6 sm:pb-24 sm:pt-8" : "py-16 sm:py-24"}`}
    >
      <Container className="max-w-[1500px]">
        {!fullPage && (
          <div className="mb-9 flex flex-col items-start justify-between gap-5 sm:mb-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                {hasExamples ? "Hauling ideas" : "Recent jobs"}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {hasExamples
                  ? "Picture your next project."
                  : hasEntries
                    ? "A closer look at the work."
                    : "Your next project starts here."}
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
                {hasExamples
                  ? "Illustrative scenes, not completed customer jobs."
                  : hasEntries
                    ? "Recent trailer projects around the Sample Valley."
                    : "A move, a cleanup or a load to deliver. We’ll help you find the right setup."}
              </p>
            </div>
            <Link
              href="/recent-jobs"
              className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-[#e6c354] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            >
              View gallery <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        {fullPage && hasExamples && (
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Hauling ideas
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Illustrative scenes, not completed customer jobs.
            </p>
          </div>
        )}

        {hasEntries ? (
          <div
            className={`grid items-start gap-x-10 gap-y-12 sm:gap-y-16 lg:gap-x-12 ${entries.length === 1 ? "max-w-[700px]" : "md:grid-cols-2"}`}
          >
            {entries.map((entry) => (
              <JobCard
                key={entry.project.id}
                entry={entry}
                fullPage={fullPage}
                imageSizes={imageSizes}
                detailImageSizes={detailImageSizes}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl py-6">
            <EmptyHeading className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Project photos are on their way.
            </EmptyHeading>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Explore the fleet while we put together our customer project gallery.
            </p>
            <Link
              href="/rentals"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-[#e6c354] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            >
              Explore the fleet
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
