"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const work = [
  {
    id: "tow-n-go",
    name: "Tow-N-Go Trailers",
    discipline: "Website + ongoing digital partner",
    image: "/images/projects/tow-n-go.webp",
    href: "/projects/web-builds#tow-n-go",
  },
  {
    id: "mckenzie-house",
    name: "McKenzie House Massage",
    discipline: "Website + content + digital launch",
    image: "/images/projects/mckenzie-house.webp",
    href: "/projects/web-builds#mckenzie-house",
  },
  {
    id: "tates-tv",
    name: "Tate’s TV",
    discipline: "Custom software + ongoing development",
    image: "/images/projects/tates-tv.webp",
    href: "/projects/software-development#tates-tv",
  },
] as const;

export default function HeroShowcase() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="hero-showcase">
      <div className="showcase-heading">
        <span>Selected work / L&L</span>
        <span>0{selected + 1} — 03</span>
      </div>
      {work.map((project, index) => (
        <div
          key={project.id}
          role="tabpanel"
          id={`panel-${project.id}`}
          aria-labelledby={`tab-${project.id}`}
          hidden={selected !== index}
          tabIndex={0}
          className="showcase-panel"
        >
          <Link
            href={project.href}
            className="showcase-image"
            aria-label={`Explore ${project.name}`}
          >
            <Image
              src={project.image}
              alt={`${project.name} website interface`}
              width={1800}
              height={1013}
              sizes="(min-width: 1440px) 610px, (min-width: 900px) 46vw, 94vw"
              priority={index === 0}
            />
          </Link>
          <div className="showcase-caption">
            <div>
              <p>{project.discipline}</p>
              <Link href={project.href}>{project.name}</Link>
            </div>
            <Link
              href={project.href}
              className="round-link"
              aria-label={`View ${project.name} case study`}
            >
              ↗
            </Link>
          </div>
        </div>
      ))}
      <div role="tablist" aria-label="Featured projects" className="showcase-tabs">
        {work.map((project, index) => (
          <button
            key={project.id}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            role="tab"
            id={`tab-${project.id}`}
            aria-controls={`panel-${project.id}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % work.length;
              else if (event.key === "ArrowLeft") next = (index + work.length - 1) % work.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = work.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              tabs.current[next]?.focus();
            }}
          >
            <span>0{index + 1}</span>
            {["Websites", "Content", "Software"][index]}
          </button>
        ))}
      </div>
    </div>
  );
}
