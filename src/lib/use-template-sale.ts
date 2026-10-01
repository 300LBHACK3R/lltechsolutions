"use client";

import { useSyncExternalStore } from "react";
import { isTemplateSaleActive, templateSale } from "@/data/template-promotion";

const listeners = new Set<() => void>();
const maximumCheckDelay = 24 * 60 * 60 * 1000;
let timer: number | undefined;

function scheduleCheck() {
  window.clearTimeout(timer);
  const now = Date.now();
  const nextBoundary = [Date.parse(templateSale.startsAt), Date.parse(templateSale.endsAt)].find(
    (boundary) => boundary > now,
  );
  timer =
    nextBoundary === undefined || listeners.size === 0
      ? undefined
      : window.setTimeout(refresh, Math.min(nextBoundary - now, maximumCheckDelay));
}

function refresh() {
  for (const notify of listeners) notify();
  scheduleCheck();
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  if (listeners.size === 1) {
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    document.addEventListener("visibilitychange", refresh);
    scheduleCheck();
  }
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) {
      window.clearTimeout(timer);
      timer = undefined;
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
      document.removeEventListener("visibilitychange", refresh);
    }
  };
}

/** Static demos keep regular prices in their HTML, then use the current clock after hydration. */
export function useTemplateSale(initialSaleActive = false) {
  return useSyncExternalStore(subscribe, isTemplateSaleActive, () => initialSaleActive);
}
