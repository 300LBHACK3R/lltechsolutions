"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useState,
  type KeyboardEvent,
} from "react";

const featuredProjects = [
  {
    id: "tow-n-go",
    tab: "Tow-N-Go",
    title: "Tow-N-Go Trailers",
    category: "Website & ongoing digital management",
    description:
      "A custom rental platform supported by local search, Google Business, Facebook, TikTok, and continued website growth.",
    image: "/images/projects/tow-n-go.webp",
    href: "https://www.towandgotrailers.ca/",
  },
  {
    id: "tates-tv",
    tab: "Tate's TV",
    title: "Tate's TV",
    category: "Custom software product",
    description:
      "A purpose-built streaming platform with live scheduling, 23 channels, interactive controls, and continued product development.",
    image: "/images/projects/tates-tv.webp",
    href: "https://www.tatestv.ca/",
  },
  {
    id: "mckenzie-house",
    tab: "McKenzie House",
    title: "McKenzie House Massage",
    category: "Brand, website & booking journey",
    description:
      "A cohesive wellness presence connecting brand direction, local discovery, trust content, and a streamlined booking experience.",
    image: "/images/projects/mckenzie-house.webp",
    href: "https://mckenziehousemassage.ca/",
  },
] as const;

export default function HeroShowcase() {
  const panelId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = featuredProjects[activeIndex];

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    const lastIndex = featuredProjects.length - 1;
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    document.getElementById(
      `${panelId}-tab-${featuredProjects[nextIndex].id}`,
    )?.focus();
  }

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let interval: number | undefined;

    const startRotation = () => {
      if (
        paused ||
        motionPreference.matches ||
        document.visibilityState !== "visible"
      ) {
        return;
      }

      interval = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % featuredProjects.length);
      }, 6500);
    };

    const restartRotation = () => {
      if (interval !== undefined) {
        window.clearInterval(interval);
        interval = undefined;
      }

      startRotation();
    };

    startRotation();
    document.addEventListener("visibilitychange", restartRotation);
    motionPreference.addEventListener("change", restartRotation);

    return () => {
      if (interval !== undefined) {
        window.clearInterval(interval);
      }

      document.removeEventListener("visibilitychange", restartRotation);
      motionPreference.removeEventListener("change", restartRotation);
    };
  }, [paused]);

  return (
    <div
      className="hero-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-showcase-frame">
        <div className="hero-showcase-toolbar">
          <span className="hero-showcase-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>

          <p>{active.href.replace(/^https:\/\/(www\.)?/, "")}</p>

          <span className="hero-showcase-live">
            <i aria-hidden="true" />
            Live project
          </span>
        </div>

        <a
          id={`${panelId}-panel`}
          key={active.id}
          role="tabpanel"
          aria-labelledby={`${panelId}-tab-${active.id}`}
          href={active.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-showcase-media"
          aria-label={`Open ${active.title} in a new tab`}
        >
          <Image
            src={active.image}
            alt={`${active.title} project showcase`}
            fill
            priority={activeIndex === 0}
            sizes="(min-width: 1920px) 760px, (min-width: 1024px) 54vw, 100vw"
            className="object-cover object-top"
          />

          <div className="hero-showcase-overlay" />

          <div className="hero-showcase-copy">
            <p>{active.category}</p>
            <h2>{active.title}</h2>
            <span>View live project ↗</span>
          </div>
        </a>
      </div>

      <div
        className="hero-project-tabs"
        role="tablist"
        aria-label="Featured client projects"
      >
        {featuredProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            id={`${panelId}-tab-${project.id}`}
            role="tab"
            aria-controls={`${panelId}-panel`}
            aria-selected={activeIndex === index}
            className={activeIndex === index ? "is-active" : ""}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{project.tab}</strong>
          </button>
        ))}
      </div>

      <div className="hero-project-summary">
        <p>{active.description}</p>
        <span aria-hidden="true" />
      </div>
    </div>
  );
}
