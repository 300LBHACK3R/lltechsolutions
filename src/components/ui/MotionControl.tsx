"use client";

import { useEffect } from "react";
import { setMotionPaused, useMotion } from "@/lib/use-motion";

export default function MotionControl() {
  const motion = useMotion();
  useEffect(() => {
    document.documentElement.dataset.motion = motion;
  }, [motion]);

  return (
    <button
      type="button"
      className="motion-control"
      aria-pressed={motion !== "running"}
      disabled={motion === "reduced"}
      onClick={() => setMotionPaused(motion === "running")}
      aria-label={
        motion === "reduced" ? "Reduced motion enabled by your device" : "Pause animations"
      }
    >
      <span className="motion-icon" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {motion === "running" ? "Motion on" : motion === "reduced" ? "Reduced motion" : "Motion off"}
    </button>
  );
}
