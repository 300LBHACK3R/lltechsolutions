import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { PipeMark, PipeValve, PlumbingHeadline } from "@/components/collection/PlumbingMarks";

/** A non-interactive miniature using the same brand, copy and photograph as the demo. */
export default function PlumbingCover({ design }: { design: WebsiteDesign }) {
  const concept = design.concept;
  if (!concept) return null;
  return (
    <div className="design-cover plumb-cover" aria-hidden="true">
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="plumb-cover-header">
        <strong>
          <PipeMark />
          <span>
            {concept.brands[0]}
            <small>PLUMBING</small>
          </span>
        </strong>
        <span className="plumb-cover-nav">
          <b>
            Home
            <PipeValve />
          </b>
          <span>Services</span>
          <span>Projects</span>
          <span>Contact</span>
        </span>
      </div>
      <div className="plumb-cover-hero">
        <div className="plumb-cover-copy">
          <span>{concept.kicker}</span>
          <strong>
            <PlumbingHeadline text={concept.headlines[0]} />
          </strong>
          <span className="plumb-cover-button">
            {concept.action} <span>↗</span>
          </span>
          <small>THE DETAILS MAKE THE DIFFERENCE.</small>
        </div>
        <div className="plumb-cover-photo">
          <Image src={concept.photo.src} alt="" fill sizes="(max-width: 699px) 55vw, 30vw" />
          <span>
            Good design.
            <br />
            <em>From the inside out.</em>
          </span>
        </div>
      </div>
      <div className="plumb-cover-services">
        <span>01 / REPAIR</span>
        <span>02 / INSTALL</span>
        <span>03 / RENOVATE</span>
      </div>
    </div>
  );
}
