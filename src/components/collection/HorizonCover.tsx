import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { HorizonArrow, HorizonMark } from "@/components/collection/HorizonMarks";

export default function HorizonCover({ design }: { design: WebsiteDesign }) {
  return (
    <div className="design-cover horizon-cover" aria-hidden="true">
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="horizon-cover-header">
        <strong>
          <HorizonMark />
          {design.concept?.brands[0] ?? "LANDSCAPE STUDIO"}
        </strong>
        <span>
          Home · Services · Projects <b>Contact ↗</b>
        </span>
      </div>
      <div className="horizon-cover-hero">
        <Image
          src="/images/collection/earthworks-landscape.webp"
          alt=""
          fill
          sizes="(max-width: 699px) 100vw, 50vw"
        />
        <div className="horizon-cover-copy">
          <span>LANDSCAPE. BUILD. CARE.</span>
          <strong>
            Outdoor work.
            <br />
            <em>Built to perform.</em>
          </strong>
          <p>
            Considered landscapes. Practical foundations.
            <br />
            Make more of your outdoors.
          </p>
          <span className="horizon-cover-button">
            Discuss your project
            <HorizonArrow />
          </span>
        </div>
        <span className="horizon-cover-caption">GROUNDED IN PURPOSE. MADE FOR EVERYDAY LIFE.</span>
      </div>
      <div className="horizon-cover-bottom">
        <span>
          From the ground up.
          <br />
          <em>Through the seasons.</em>
        </span>
        <p>
          Landscape construction
          <br />
          Planting & irrigation
        </p>
        <p>
          Site preparation
          <br />
          Property care
        </p>
        <HorizonArrow diagonal />
      </div>
    </div>
  );
}
