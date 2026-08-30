type StudioMarkProps = {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
};

export default function StudioMark({
  inverse = false,
  compact = false,
  className = "",
}: StudioMarkProps) {
  return (
    <div
      className={[
        "studio-mark",
        inverse ? "studio-mark-inverse" : "",
        compact ? "studio-mark-compact" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="studio-mark-symbol" aria-hidden="true">
        <span className="studio-mark-blue" />
        <span className="studio-mark-gold" />
      </span>

      <span className="studio-mark-copy">
        <strong>Calgary-based</strong>
        <i aria-hidden="true" />
        <span>Canada-wide digital studio</span>
      </span>
    </div>
  );
}
