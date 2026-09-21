import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { PaintBrush, PaintStroke, PaintingHeadline } from "@/components/collection/PaintMarks";

/** A static miniature of the actual demo, not a second interactive website. */
export default function PaintingCover({ design }: { design: WebsiteDesign }) {
  const concept = design.concept;
  if (!concept) return null;
  return (
    <div className="design-cover paint-cover" aria-hidden="true">
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="paint-cover-header">
        <strong>
          <PaintBrush />
          {concept.brands[0]}
        </strong>
        <span>
          <b>
            Home
            <PaintStroke />
          </b>
          Services · Projects · Contact
        </span>
      </div>
      <div className="paint-cover-hero">
        <div className="paint-cover-copy">
          <span>{concept.kicker}</span>
          <strong>
            <PaintingHeadline text={concept.headlines[0]} />
          </strong>
          <span className="paint-cover-button">{concept.action} ↗</span>
        </div>
        <div className="paint-cover-photo">
          <Image src={concept.photo.src} alt="" fill sizes="(max-width: 699px) 55vw, 28vw" />
          <span>
            A little colour.
            <br />
            <em>A different feeling.</em>
          </span>
        </div>
      </div>
      <div className="paint-cover-services">
        {concept.services.map((item, index) => (
          <span key={item.name}>
            0{index + 1} / {item.name} ↗
          </span>
        ))}
      </div>
    </div>
  );
}
