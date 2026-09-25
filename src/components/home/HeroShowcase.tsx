"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { Project } from "@/data/projects";

export type FeaturedProject = Pick<
  Project,
  "id" | "title" | "category" | "relationship" | "image" | "imageAlt" | "liveUrl"
>;

export default function HeroShowcase({ projects }: { projects: FeaturedProject[] }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  if (!projects.length) return null;

  return (
    <div className="premium-hero-showcase">
      <div className="premium-showcase-heading">
        <p>Our work, out in the world.</p>
        <span aria-hidden="true">
          0{selected + 1} <i>/</i> 0{projects.length}
        </span>
      </div>
      <div className="premium-showcase-stage">
        {projects.map((project, index) => {
          const href = `/projects/${project.category}#${project.id}`;
          return (
            <div
              key={project.id}
              role="tabpanel"
              id={`${id}-featured-panel-${project.id}`}
              aria-labelledby={`${id}-featured-tab-${project.id}`}
              hidden={selected !== index}
              tabIndex={0}
              className="premium-showcase-panel"
            >
              <div className="premium-showcase-chrome" aria-hidden="true">
                <span className="premium-showcase-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>
                  {project.liveUrl
                    ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
                    : project.title}
                </span>
                <span>↗</span>
              </div>
              <Link
                href={href}
                className="premium-showcase-image"
                aria-label={`Explore ${project.title}`}
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} website interface`}
                    fill
                    sizes="(min-width:2560px) 1120px, (min-width:1900px) 940px, (min-width:1100px) 54vw, (min-width:700px) 90vw, 94vw"
                    preload={index === 0}
                  />
                )}
              </Link>
              <div className="premium-showcase-caption">
                <div>
                  <p>{project.relationship}</p>
                  <Link href={href}>{project.title}</Link>
                </div>
                <Link
                  href={href}
                  className="premium-showcase-case"
                  aria-label={`View ${project.title} case study`}
                >
                  <span>View project</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div role="tablist" aria-label="Featured projects" className="premium-showcase-tabs">
        {projects.map((project, index) => (
          <button
            key={project.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${id}-featured-tab-${project.id}`}
            aria-controls={`${id}-featured-panel-${project.id}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % projects.length;
              else if (event.key === "ArrowLeft")
                next = (index + projects.length - 1) % projects.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = projects.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              tabs.current[next]?.focus();
            }}
          >
            <span aria-hidden="true">0{index + 1}</span>
            <span>{project.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
