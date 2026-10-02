"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ROOT_SELECTOR = ".scroll-reveal";

const ITEM_SELECTOR = "[data-reveal-item]";

const MOBILE_QUERY = "(max-width: 1024px)";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const PREPARED_CLASS = "is-reveal-prepared";

const VISIBLE_CLASS = "is-visible";

const DEFAULT_STAGGER_MS = 65;
const MAX_STAGGER_MS = 180;
const FAILSAFE_MS = 2_000;

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function parseNumber(value: string | undefined, fallback: number, maximum: number): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? clamp(parsed, 0, maximum) : fallback;
}

function reveal(element: HTMLElement): void {
  element.classList.add(VISIBLE_CLASS);
}

function revealAll(elements: readonly HTMLElement[]): void {
  for (const element of elements) {
    element.classList.add(VISIBLE_CLASS);

    element.classList.remove(PREPARED_CLASS);

    for (const item of element.querySelectorAll<HTMLElement>(ITEM_SELECTOR)) {
      item.style.removeProperty("--reveal-delay");
    }
  }
}

function prepare(element: HTMLElement): void {
  const delay = parseNumber(element.dataset.revealDelay, 0, 1_000);

  const stagger = parseNumber(element.dataset.revealStagger, DEFAULT_STAGGER_MS, MAX_STAGGER_MS);

  const directItems = Array.from(element.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
    (item) => item.closest(ROOT_SELECTOR) === element,
  );

  directItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${delay + index * stagger}ms`);
  });

  element.classList.add(PREPARED_CLASS);
}

export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(ROOT_SELECTOR));

    if (elements.length === 0) {
      return;
    }

    let mobile = false;
    let reducedMotion = false;

    try {
      mobile = window.matchMedia(MOBILE_QUERY).matches;

      reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    } catch {
      revealAll(elements);
      return;
    }

    if (mobile || reducedMotion || !("IntersectionObserver" in window)) {
      revealAll(elements);
      return;
    }

    for (const element of elements) {
      prepare(element);

      const rectangle = element.getBoundingClientRect();

      if (rectangle.top <= window.innerHeight * 0.92 && rectangle.bottom >= 0) {
        reveal(element);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const element = entry.target as HTMLElement;

          reveal(element);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -48px 0px",
      },
    );

    for (const element of elements) {
      if (!element.classList.contains(VISIBLE_CLASS)) {
        observer.observe(element);
      }
    }

    const failsafe = window.setTimeout(() => {
      for (const element of elements) {
        reveal(element);
      }

      observer.disconnect();
    }, FAILSAFE_MS);

    const onPageShow = () => {
      for (const element of elements) {
        reveal(element);
      }
    };

    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();

      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
