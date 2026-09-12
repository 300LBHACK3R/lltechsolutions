import type { WebsiteDesign } from "@/data/website-collection";

/** Original typographic artwork, not a screenshot or a client project. */
export default function DesignCover({ design }: { design: WebsiteDesign }) {
  return (
    <div
      className={`design-cover design-theme-${design.concept?.theme ?? "pigment"}`}
      aria-hidden="true"
    >
      <span className="design-cover-label">L&L / Design study</span>
      <div className="design-art">
        <i />
        <i />
        <i />
      </div>
      <strong>
        {design.name}
        <span>
          Designed around
          <br />
          your business.
        </span>
      </strong>
      <span className="design-cover-foot">Explore the interactive concept ↗</span>
    </div>
  );
}
