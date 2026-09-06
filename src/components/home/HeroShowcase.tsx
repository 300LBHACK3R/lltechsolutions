"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import InteractiveSurface from "@/components/ui/InteractiveSurface";
import MotionControl from "@/components/ui/MotionControl";

export type FeaturedProject = Pick<
  Project,
  "id" | "title" | "category" | "relationship" | "image" | "imageAlt" | "liveUrl"
>;

export default function HeroShowcase({ projects }: { projects: FeaturedProject[] }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="hero-showcase">
      <div className="showcase-heading">
        <span>Built here. Working out there.</span>
        <span>Selected / 0{selected + 1}</span>
      </div>
      <InteractiveSurface className="project-stage">
        <div className="stage-outline stage-outline-back" aria-hidden="true" />
        <div className="stage-outline stage-outline-front" aria-hidden="true" />
        <div className="stage-coordinate" aria-hidden="true">
          DESIGN × DEVELOPMENT
        </div>
        {projects.map((project, index) => {
          const href = `/projects/${project.category}#${project.id}`;
          return (
            <div
              key={project.id}
              role="tabpanel"
              id={`featured-panel-${project.id}`}
              aria-labelledby={`featured-tab-${project.id}`}
              hidden={selected !== index}
              tabIndex={0}
              className="showcase-panel"
            >
              <div className="browser-chrome" aria-hidden="true">
                <span className="window-dots">
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
              <Link href={href} className="showcase-image" aria-label={`Explore ${project.title}`}>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} website interface`}
                    width={1800}
                    height={1237}
                    sizes="(min-width: 1900px) 820px, (min-width: 1000px) 51vw, (min-width: 700px) 78vw, 90vw"
                    priority={index === 0}
                  />
                )}
                <span className="image-open" aria-hidden="true">
                  Explore the project ↗
                </span>
              </Link>
              <div className="showcase-caption">
                <div>
                  <p>{project.relationship}</p>
                  <Link href={href}>{project.title}</Link>
                </div>
                <Link
                  href={href}
                  className="round-link"
                  aria-label={`View ${project.title} case study`}
                >
                  ↗
                </Link>
              </div>
            </div>
          );
        })}
      </InteractiveSurface>
      <div role="tablist" aria-label="Featured projects" className="showcase-tabs">
        {projects.map((project, index) => (
          <button
            key={project.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`featured-tab-${project.id}`}
            aria-controls={`featured-panel-${project.id}`}
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
            <span>0{index + 1}</span>
            <span>{project.title}</span>
          </button>
        ))}
      </div>
      <div className="showcase-footnote">
        <p>Select a project. Explore what’s possible.</p>
        <MotionControl />
      </div>
    </div>
  );
}
