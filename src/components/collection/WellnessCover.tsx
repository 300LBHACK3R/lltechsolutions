import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { wellnessBrand } from "@/data/wellness-content";
import { WellnessArrow, WellnessMark } from "@/components/collection/WellnessMarks";

export default function WellnessCover({ design }: { design: WebsiteDesign }) {
  return (
    <div className="design-cover wellness-cover" aria-hidden="true" data-wellness-cover={design.id}>
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="wellness-cover-header">
        <strong>
          <WellnessMark />
          {wellnessBrand}
        </strong>
        <span>
          Home · Treatments · Pricing · About <b>Contact ↗</b>
        </span>
      </div>
      <div className="wellness-cover-hero">
        <div className="wellness-cover-copy">
          <span>MASSAGE · REST · RENEW</span>
          <strong>
            A little space.
            <br />
            <em>A deeper breath.</em>
          </strong>
          <p>
            A quieter pace. A thoughtful touch.
            <br />A little room to simply be.
          </p>
          <span className="wellness-cover-button">
            Find your moment
            <WellnessArrow />
          </span>
        </div>
        <div className="wellness-cover-image">
          <Image
            src="/images/collection/massage-room.webp"
            alt=""
            fill
            sizes="(max-width: 700px) 55vw, 28vw"
          />
          <span>THE ART OF SLOWING DOWN</span>
        </div>
      </div>
      <div className="wellness-cover-rail">
        <span>Space to settle</span>
        <i />
        <span>Careful attention</span>
        <i />
        <span>Your own pace</span>
      </div>
      <div className="wellness-cover-bottom">
        <strong>
          Less hurry.
          <br />
          <em>More here.</em>
        </strong>
        <p>
          Some moments ask nothing of you.
          <br />
          This can be one of them.
        </p>
        <WellnessMark />
      </div>
    </div>
  );
}
