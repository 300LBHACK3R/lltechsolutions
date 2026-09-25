/** An illustrative lawn-care identity and small, decorative garden details. */
export function LawnMark() {
  return (
    <svg className="lawn-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 41C24 24 18 12 8 8c0 16 6 28 16 33Z" fill="currentColor" />
      <path d="M25 41c0-14 5-24 15-30 1 15-4 26-15 30Z" fill="currentColor" />
      <path d="M24 23C22 13 25 6 30 2c4 9 2 16-6 21Z" fill="currentColor" />
      <path d="M8 45h33" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function LawnArrow() {
  return (
    <svg className="lawn-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function LawnServiceMark({ kind }: { kind: "mow" | "edge" | "leaf" }) {
  return (
    <svg className="lawn-service-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {kind === "mow" ? (
        <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 48h46M15 44V21m8 23V15m9 29V24m9 20V13m8 31V20M9 55h46" />
          <path d="m11 17 4 4 4-4m0-6 4 4 4-4m1 9 4 4 4-4m1-15 4 4 4-4m0 3 4 4 4-4" />
        </g>
      ) : kind === "edge" ? (
        <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 54h45V9M9 46h37V9M9 18h28M9 28h28M9 38h28" />
          <path d="m14 12 4 6m7-6 4 6m-14 4 4 6m7-6 4 6m-16 4 4 6m7-6 4 6" />
        </g>
      ) : (
        <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 46C4 29 17 12 51 10c-1 32-17 45-35 36Zm-7 9 32-34M24 39l-1-13m1 13 15 1m-7-9V20" />
        </g>
      )}
    </svg>
  );
}

export function LawnGrassRail({ animated = false }: { animated?: boolean }) {
  return (
    <div
      className={`lawn-grass-rail${animated ? " lawn-grass-rail-animated" : ""}`}
      aria-hidden="true"
    >
      <svg className="lawn-grass lawn-grass-tall" viewBox="0 0 1200 32" preserveAspectRatio="none">
        {Array.from({ length: 60 }, (_, index) => (
          <path
            key={index}
            d={`M${index * 20} 32l-3-14 8 9 1-22 6 21 7-12-3 18Z`}
            fill="currentColor"
          />
        ))}
      </svg>
      <svg className="lawn-grass lawn-grass-short" viewBox="0 0 1200 12" preserveAspectRatio="none">
        {Array.from({ length: 80 }, (_, index) => (
          <path key={index} d={`M${index * 15} 12V7l4 2 3-7 3 7 5-3v6Z`} fill="currentColor" />
        ))}
      </svg>
      {animated ? (
        <div className="lawn-mower-track">
          <svg className="lawn-mower" viewBox="0 0 76 48" fill="none">
            <path d="m7 5 8 1 22 31" stroke="#dbe8bc" strokeWidth="3" strokeLinecap="round" />
            <path d="m7 5-3 4" stroke="#dbe8bc" strokeWidth="4" strokeLinecap="round" />
            <path d="M26 26h16v13H25l-6-8 7-5Z" fill="#b6ca94" />
            <path d="M37 30h20l12 8v4H29v-5l8-7Z" fill="#e0edba" />
            <path d="M42 24h13v9H39l3-9Z" fill="#789c50" />
            <path d="M46 20h7v5h-7z" fill="#dbe8bc" />
            <circle cx="36" cy="41" r="6" fill="#183b2c" stroke="#dbe8bc" strokeWidth="2" />
            <circle cx="62" cy="41" r="5" fill="#183b2c" stroke="#dbe8bc" strokeWidth="2" />
            <circle cx="36" cy="41" r="1.5" fill="#dbe8bc" />
            <circle cx="62" cy="41" r="1.5" fill="#dbe8bc" />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
