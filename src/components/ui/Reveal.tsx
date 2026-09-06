"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Content is visible without JS. Motion only enhances sections below the fold. */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.IntersectionObserver) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.animate(
            [
              { opacity: 0.5, transform: "translateY(16px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 500, easing: "ease-out" },
          );
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (el.getBoundingClientRect().top > window.innerHeight) observer.observe(el);
    const stop = () => {
      if (preference.matches) {
        observer.disconnect();
        el.getAnimations().forEach((animation) => animation.cancel());
      }
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
      el.getAnimations().forEach((animation) => animation.cancel());
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
