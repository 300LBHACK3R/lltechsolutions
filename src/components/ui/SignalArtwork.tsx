/** Decorative circuit paths. All meaningful content lives in accessible HTML. */
export default function SignalArtwork({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`signal-artwork ${className}`}
      viewBox="0 0 800 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="signal-lines">
        <path d="M0 120H180L280 220H800" />
        <path d="M0 460H120L280 300H600L720 420H800" />
        <path d="M80 0V90L360 370H680V600" />
        <path d="M620 0V130L500 250V600" />
        <path d="M0 540H330L430 440H800" />
      </g>
      <path className="signal-pulse" pathLength="100" d="M0 460H120L280 300H600L720 420H800" />
      <g className="signal-nodes">
        <circle cx="280" cy="300" r="4" />
        <circle cx="500" cy="300" r="4" />
        <circle cx="620" cy="130" r="4" />
      </g>
    </svg>
  );
}
