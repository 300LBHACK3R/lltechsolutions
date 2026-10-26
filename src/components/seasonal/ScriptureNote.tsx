import { christmasScriptures, christmasThemeEnabled } from "@/config/seasonal";

export default function ScriptureNote({ verse }: { verse: keyof typeof christmasScriptures }) {
  if (!christmasThemeEnabled) return null;
  const scripture = christmasScriptures[verse];
  return (
    <details className="scripture-note">
      <summary>
        <span className="scripture-star" aria-hidden="true">
          ✧
        </span>
        <span>{scripture.invitation}</span>
        <span className="scripture-toggle" aria-hidden="true">
          ＋
        </span>
      </summary>
      <blockquote>
        <p>“{scripture.text}”</p>
        <cite>{scripture.reference} · KJV</cite>
      </blockquote>
    </details>
  );
}
