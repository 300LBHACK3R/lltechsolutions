"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const HEADER_SELECTOR = ".site-header";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const EXTRA_OFFSET_PX = 12;

function decodeHash(value: string): string {
  const raw = value.replace(/^#/, "");

  if (!raw) {
    return "";
  }

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function findTarget(hash: string): HTMLElement | null {
  const id = decodeHash(hash);

  if (!id) {
    return null;
  }

  return (
    document.getElementById(id) ??
    Array.from(document.getElementsByName(id)).find(
      (element): element is HTMLElement => element instanceof HTMLElement,
    ) ??
    null
  );
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  } catch {
    return true;
  }
}

function getHeaderOffset(): number {
  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);

  return (header?.getBoundingClientRect().height ?? 0) + EXTRA_OFFSET_PX;
}

function scrollToCurrentHash(): void {
  const hash = window.location.hash;

  if (!hash) {
    return;
  }

  const target = findTarget(hash);

  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

/**
 * Keeps fixed-header hash navigation aligned without intercepting or
 * rewriting normal browser/Next.js link clicks. Avoiding delegated click
 * interception makes mobile menus and native navigation substantially more
 * reliable across Safari, Chromium, Firefox, and embedded webviews.
 */
export function PersistentSiteNavigation() {
  const pathname = usePathname();

  const firstFrameRef = useRef<number | null>(null);

  const secondFrameRef = useRef<number | null>(null);

  const cancelFrames = useCallback(() => {
    if (firstFrameRef.current !== null) {
      window.cancelAnimationFrame(firstFrameRef.current);

      firstFrameRef.current = null;
    }

    if (secondFrameRef.current !== null) {
      window.cancelAnimationFrame(secondFrameRef.current);

      secondFrameRef.current = null;
    }
  }, []);

  const scheduleHashScroll = useCallback(() => {
    cancelFrames();

    firstFrameRef.current = window.requestAnimationFrame(() => {
      firstFrameRef.current = null;

      secondFrameRef.current = window.requestAnimationFrame(() => {
        secondFrameRef.current = null;

        scrollToCurrentHash();
      });
    });
  }, [cancelFrames]);

  useEffect(() => {
    scheduleHashScroll();
  }, [pathname, scheduleHashScroll]);

  useEffect(() => {
    window.addEventListener("hashchange", scheduleHashScroll);

    window.addEventListener("popstate", scheduleHashScroll);

    return () => {
      cancelFrames();

      window.removeEventListener("hashchange", scheduleHashScroll);

      window.removeEventListener("popstate", scheduleHashScroll);
    };
  }, [cancelFrames, scheduleHashScroll]);

  return null;
}
