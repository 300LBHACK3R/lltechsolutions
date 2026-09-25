/** Decorative linework drawn in code; these marks are not a client identity or accreditation. */
export function PipeMark() {
  return (
    <svg className="plumb-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M35 11H20a9 9 0 0 0-9 9v10a9 9 0 0 0 9 9h15" stroke="currentColor" strokeWidth="5" />
      <path d="M33 6v10M33 34v10M6 23h10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M35 11H20a9 9 0 0 0-9 9v10a9 9 0 0 0 9 9h15"
        stroke="#fff"
        strokeOpacity=".35"
        strokeWidth="1"
      />
      <circle cx="30" cy="25" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 17v16m-8-8h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PipeValve() {
  return (
    <svg className="plumb-valve" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="14" r="3" fill="currentColor" />
      <path d="M14 4v7m0 6v7M4 14h7m6 0h7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function PlumbingHeadline({ text }: { text: string }) {
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
