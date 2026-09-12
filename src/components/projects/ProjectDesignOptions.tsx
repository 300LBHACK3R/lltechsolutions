"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectDesignOption } from "@/data/projects";

export default function ProjectDesignOptions({
  projectId,
  options,
}: {
  projectId: string;
  options: ProjectDesignOption[];
}) {
  const [active, setActive] = useState<ProjectDesignOption | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = `${projectId}-design-options`;
  const previewId = `${projectId}-design-preview`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!active || !dialog) return;

    const previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [active]);

  return (
    <section className="design-options" aria-labelledby={headingId}>
      <div className="design-options-heading">
        <h3 id={headingId}>Other Design Options</h3>
        <p>Alternative layouts and visual directions. Select an image for a closer look.</p>
      </div>
      <div className="design-options-grid">
        {options.map((option) => (
          <figure className="design-option" key={option.id}>
            <a
              href={option.image}
              className="design-option-image"
              aria-label={`View ${option.title} design option`}
              onClick={(event) => {
                // The original image remains available without JavaScript or dialog support.
                if (typeof dialogRef.current?.showModal !== "function") return;
                event.preventDefault();
                setActive(option);
              }}
            >
              <Image
                src={option.image}
                alt={option.alt}
                width={option.width}
                height={option.height}
                sizes="(max-width: 699px) 94vw, (max-width: 1099px) 46vw, 30vw"
              />
              <span>View layout +</span>
            </a>
            <figcaption>
              <h4>{option.title}</h4>
              <p>{option.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="design-preview"
        aria-labelledby={previewId}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="design-preview-content">
          <div className="design-preview-heading">
            <div>
              <p>Other Design Options</p>
              <h3 id={previewId}>{active?.title}</h3>
            </div>
            <form method="dialog">
              <button type="submit" aria-label="Close design preview">
                Close ×
              </button>
            </form>
          </div>
          {active && (
            <>
              <div className="design-preview-image">
                <Image
                  src={active.image}
                  alt={active.alt}
                  width={active.width}
                  height={active.height}
                  sizes="(max-width: 1499px) 94vw, 1400px"
                  loading="eager"
                />
              </div>
              <p className="design-preview-caption">{active.description}</p>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
