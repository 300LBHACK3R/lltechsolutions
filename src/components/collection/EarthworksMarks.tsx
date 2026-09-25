/** A drawn demo identity and surveying details, never a client accreditation. */
export function RidgelineMark() {
  return (
    <svg className="earth-mark" viewBox="0 0 48 42" fill="none" aria-hidden="true">
      <path
        d="M3 28 15 10l9 13 7-10 14 20H3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M3 38h42M14 28h9m8 0h4" stroke="currentColor" strokeWidth="2" />
      <path d="M15 10v-5m16 8V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function SurveyCross() {
  return (
    <svg className="earth-survey-cross" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1" />
      <path d="M14 0v9m0 10v9M0 14h9m10 0h9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
export function TerrainContours() {
  return (
    <svg className="earth-contours" viewBox="0 0 600 420" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M-70 385C14 267 121 425 207 299S235 77 364 55s138 81 281-49" />
        <path d="M-67 353C25 242 127 390 203 275S242 62 360 29s148 90 286-53" />
        <path d="M-65 321C39 215 135 355 199 251S249 46 356 3s158 100 290-55" />
        <path d="M-74 417C2 292 114 460 211 323S228 92 368 81s128 72 273-17" />
        <path d="M-77 449C-10 317 107 495 215 347S221 107 372 107s118 63 265 15" />
        <path d="M-80 481C-23 342 100 530 219 371S214 122 376 133s108 54 257 47" />
        <path d="M-83 513C-36 367 93 565 223 395S207 137 380 159s98 45 249 79" />
        <path d="M-86 545C-49 392 86 600 227 419S200 152 384 185s88 36 241 111" />
      </g>
    </svg>
  );
}
export function EarthworksHeadline({ text }: { text: string }) {
  const split = text.indexOf(". ");
  return split < 0 ? (
    <>{text}</>
  ) : (
    <>
      <span>{text.slice(0, split + 1)}</span>
      <em>{text.slice(split + 2)}</em>
    </>
  );
}
