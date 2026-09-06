"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/use-motion";

/** A bounded pointer response: no render loop, no touch interception, no layout-dependent content. */
export default function InteractiveSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useMotion();

  useEffect(() => {
    const element = ref.current;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!element || motion !== "running") return;
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        element.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
        element.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
      });
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    document.addEventListener("visibilitychange", reset);
    pointer.addEventListener("change", reset);
    return () => {
      reset();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      document.removeEventListener("visibilitychange", reset);
      pointer.removeEventListener("change", reset);
    };
  }, [motion]);

  return (
    <div ref={ref} className={`interactive-surface ${className}`}>
      {children}
    </div>
  );
}
