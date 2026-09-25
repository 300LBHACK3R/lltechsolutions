import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import {
  RidgelineMark,
  SurveyCross,
  EarthworksHeadline,
} from "@/components/collection/EarthworksMarks";

export default function EarthworksCover({ design }: { design: WebsiteDesign }) {
  const concept = design.concept;
  if (!concept) return null;
  return (
    <div className="design-cover earth-cover" aria-hidden="true">
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="earth-cover-header">
        <strong>
          <RidgelineMark />
          <span>
            {concept.brands[0]}
            <small>EARTH & LANDSCAPE</small>
          </span>
        </strong>
        <span>
          Services · Projects · Process <b>Let’s talk ↗</b>
        </span>
      </div>
      <div className="earth-cover-hero">
        <Image src={concept.photo.src} alt="" fill sizes="(max-width:699px) 100vw, 45vw" />
        <span className="earth-cover-survey">
          <SurveyCross />
          <span>BUILT FROM THE GROUND UP.</span>
        </span>
        <div>
          <span>{concept.kicker}</span>
          <strong>
            <EarthworksHeadline text={concept.headlines[0]} />
          </strong>
          <span className="earth-cover-button">
            {concept.action}
            <b>↗</b>
          </span>
        </div>
        <span className="earth-cover-caption">01 / SHAPING WHAT COMES NEXT</span>
      </div>
      <div className="earth-cover-foot">
        <strong>
          THE GROUNDWORK.
          <br />
          THE BIGGER PICTURE.
        </strong>
        <span>Excavation / Grading / Landscape</span>
        <SurveyCross />
      </div>
    </div>
  );
}
