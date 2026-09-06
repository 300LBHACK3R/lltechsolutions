"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/use-motion";

/** Content is visible without JS. Motion only enhances sections below the fold. */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);
  const motion = useMotion();
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !window.IntersectionObserver ||
      !el.animate ||
      motion !== "running" ||
      revealed.current
    )
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          revealed.current = true;
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
    return () => {
      observer.disconnect();
      el.getAnimations().forEach((animation) => animation.cancel());
    };
  }, [motion]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
