/** Small, decorative marks shared by the painting demo and its catalogue cover. */
export function PaintingHeadline({ text }: { text: string }) {
  const separator = text.indexOf(". ");
  if (separator === -1) return <>{text}</>;
  return (
    <>
      <span className="paint-heading-lead">{text.slice(0, separator + 1)}</span>
      <em>
        {text.slice(separator + 2)}
        <PaintStroke />
      </em>
    </>
  );
}

export function PaintStroke() {
  return (
    <svg
      className="paint-stroke"
      viewBox="0 0 240 22"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M2 9 17 5 54 6 83 3 119 5 157 2 196 5 231 4 237 7 226 9 240 11 229 15 205 16 183 14 152 18 115 16 78 19 47 16 15 18 3 14 14 12Z"
      />
      <path fill="currentColor" opacity=".45" d="m9 20 68-1 56 1 49-2 51 1-37 2-89 1Z" />
    </svg>
  );
}

export function PaintBrush() {
  return (
    <svg className="paint-brush" viewBox="0 0 40 48" fill="none" aria-hidden="true">
      <path d="m24 3-9 21 9 4 11-20c3-6-8-10-11-5Z" fill="#193d63" />
      <path d="m15 21-4 8 15 7 4-9-15-6Z" fill="#bac4c5" />
      <path d="m12 28-9 13 3 4 5-1 3 3 4-2 3 1 6-12-15-6Z" fill="#f5dfab" />
      <path d="m3 41 3 4 5-1 3 3 4-2 3 1 3-6-7 1-6-4-8 4Z" fill="currentColor" />
      <path d="m13 31-5 9m10-7-4 8m9-5-3 6" stroke="#a89161" strokeWidth="1.2" />
    </svg>
  );
}
