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
