/** Decorative marks for a generic landscape template, not a client identity. */
export function HorizonMark() {
  return (
    <svg className="horizon-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M5 33a19 19 0 0 1 38 0H5Z" fill="currentColor" />
      <path d="M4 38h40M11 43h26" stroke="currentColor" strokeWidth="2" />
      <path
        d="m13 33 10-13 7 13m-8 0 8-9 8 9"
        stroke="var(--horizon-forest, #102e26)"
        strokeWidth="2"
      />
    </svg>
  );
}

export function HorizonArrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className={`horizon-arrow${diagonal ? " horizon-arrow-diagonal" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function HorizonContours() {
  return (
    <svg className="horizon-contours" viewBox="0 0 600 440" fill="none" aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => (
        <ellipse
          key={index}
          cx="332"
          cy="212"
          rx={70 + index * 28}
          ry={37 + index * 22}
          transform="rotate(-24 332 212)"
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
