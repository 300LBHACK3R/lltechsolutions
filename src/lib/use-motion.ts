"use client";

import { useSyncExternalStore } from "react";

const preferenceKey = "landl-motion";
const preferenceEvent = "landl:motion";
let memoryPaused = false;

function subscribe(notify: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  window.addEventListener("storage", notify);
  window.addEventListener(preferenceEvent, notify);
  return () => {
    media.removeEventListener("change", notify);
    window.removeEventListener("storage", notify);
    window.removeEventListener(preferenceEvent, notify);
  };
}

function snapshot(): "running" | "paused" | "reduced" {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  let paused = memoryPaused;
  try {
    paused = window.localStorage.getItem(preferenceKey) === "paused";
  } catch {
    // Motion controls still work when storage is unavailable.
  }
  return paused ? "paused" : "running";
}

export function useMotion() {
  return useSyncExternalStore(subscribe, snapshot, () => "paused" as const);
}

export function setMotionPaused(paused: boolean) {
  memoryPaused = paused;
  try {
    window.localStorage.setItem(preferenceKey, paused ? "paused" : "running");
  } catch {
    // The in-memory preference is sufficient for this visit.
  }
  window.dispatchEvent(new Event(preferenceEvent));
}
