import Image from "next/image";
import Link from "next/link";
import type { GalleryEntry } from "@/data/projectGallery";
import { getServiceLabel, serviceInquiryHref } from "@/data/servicePathways";

type JobCardProps = {
  entry: GalleryEntry;
  fullPage: boolean;
  imageSizes: string;
  detailImageSizes: string;
};

export function JobCard({ entry, fullPage, imageSizes, detailImageSizes }: JobCardProps) {
  const { project } = entry;
  const Heading = fullPage ? "h2" : "h3";
  const headingId = `project-${project.id}-heading`;
  const additionalPhotos = entry.kind === "job" ? (entry.project.photos ?? []) : [];
  const photoClassName =
    "relative block aspect-[3/2] overflow-hidden rounded-lg bg-[#0b0b0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]";
  const photo = (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      fill
      sizes={imageSizes}
      className="object-contain"
    />
  );

  return (
    <article id={project.id} aria-labelledby={headingId} className="min-w-0 scroll-mt-32">
      {fullPage ? (
        <a
          href={project.image.src}
          target="_blank"
          rel="noopener noreferrer"
          className={photoClassName}
        >
          {photo}
          <span className="sr-only">Open full-size image in a new tab</span>
        </a>
      ) : (
        <Link href={`/recent-jobs#${project.id}`} className={photoClassName}>
          {photo}
          <span className="sr-only">View project: {project.title}</span>
        </Link>
      )}

      <div className="pt-5 sm:pt-6">
        <Heading
          id={headingId}
          className="text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl"
        >
          {project.title}
        </Heading>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm leading-6 text-zinc-400">
          <span>{entry.kind === "job" ? entry.project.location : project.trailer}</span>
          <span aria-hidden="true" className="text-[#d4af37]/70">
            /
          </span>
          <span>{getServiceLabel(project.service)}</span>
        </p>

        {fullPage && entry.kind === "example" && (
          <>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300">{project.summary}</p>
            <Link
              href={`/services#${project.service}`}
              className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-[#e6c354] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            >
              Explore this service
              <span className="sr-only">: {getServiceLabel(project.service)}</span>
            </Link>
          </>
        )}

        {fullPage && entry.kind === "job" && (
          <details className="mt-3">
            <summary className="w-fit min-h-11 cursor-pointer py-3 text-sm font-medium text-[#e6c354] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]">
              Project details
              {additionalPhotos.length > 0
                ? ` & ${additionalPhotos.length} more ${additionalPhotos.length === 1 ? "photo" : "photos"}`
                : ""}
              <span className="sr-only">: {project.title}</span>
            </summary>
            <div className="pb-1 pt-2">
              <p className="max-w-xl text-sm leading-7 text-zinc-300">{project.summary}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                <span className="text-zinc-300">Trailer:</span> {project.trailer}
              </p>
              {additionalPhotos.length > 0 && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {additionalPhotos.map((image) => (
                    <figure key={image.src} className="min-w-0">
                      <a
                        href={image.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={photoClassName}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes={detailImageSizes}
                          className="object-contain"
                        />
                        <span className="sr-only">Open full-size photo in a new tab</span>
                      </a>
                      {image.caption && (
                        <figcaption className="mt-2 text-xs leading-6 text-zinc-400">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
              <Link
                href={serviceInquiryHref(project.service, project.trailer)}
                className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-[#e6c354] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              >
                Plan a similar job<span className="sr-only">: {project.title}</span>
              </Link>
            </div>
          </details>
        )}
      </div>
    </article>
  );
}
