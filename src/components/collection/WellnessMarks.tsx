export function WellnessMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 66" fill="none" aria-hidden="true">
      <path
        d="M28 61V9M28 49C11 50 7 38 8 28c13 1 21 7 20 21ZM28 35C44 36 50 24 48 14c-13 1-21 8-20 21ZM28 22C18 19 17 9 23 3c7 4 9 10 5 19Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m13 35 15 14m14-27L28 35M17 61h22"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WellnessArrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="wellness-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M3 12h17m-6-6 6 6-6 6" />}
    </svg>
  );
}

export function WellnessBotanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`wellness-botanical ${className}`}
      viewBox="0 0 260 370"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M105 367C112 278 167 191 147 59M140 306C168 270 182 247 190 204M118 271C93 241 68 218 45 205M145 218C165 181 182 149 221 123M143 148C112 126 91 99 82 61M149 107C159 75 175 52 197 30" />
        <path d="M133 327C174 321 205 286 205 254c-30 6-68 39-72 73ZM108 300C72 282 48 249 51 228c38 8 60 40 57 72ZM148 264c35-10 62-29 68-55-35-2-61 20-68 55ZM127 233c-29-17-38-43-33-63 28 16 36 40 33 63ZM158 195c35 1 69-21 79-49-35-6-65 14-79 49ZM146 157c-35-14-58-49-52-69 31 10 49 37 52 69ZM156 111c36-4 62-27 63-52-31 2-56 23-63 52ZM148 91c-18-25-22-62-8-83 17 19 22 55 8 83Z" />
      </g>
    </svg>
  );
}
