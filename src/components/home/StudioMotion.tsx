"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/use-motion";

/** The composition and links render on the server; pointer depth is an enhancement. */
export default function StudioMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || motion !== "running") return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const reset = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      element.style.removeProperty("--studio-x");
      element.style.removeProperty("--studio-y");
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== "mouse") return;
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        element.style.setProperty("--studio-x", `${x * 5}px`);
        element.style.setProperty("--studio-y", `${y * 4}px`);
        frame = 0;
      });
    };
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    pointer.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      pointer.removeEventListener("change", reset);
      window.removeEventListener("blur", reset);
      reset();
    };
  }, [motion]);

  return (
    <div className="studio-canvas" ref={ref}>
      {children}
    </div>
  );
}
