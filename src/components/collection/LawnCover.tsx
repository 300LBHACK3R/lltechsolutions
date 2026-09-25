import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { LawnArrow, LawnGrassRail, LawnMark } from "@/components/collection/LawnMarks";

export default function LawnCover({ design }: { design: WebsiteDesign }) {
  return (
    <div className="design-cover lawn-cover" aria-hidden="true">
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="lawn-cover-header">
        <strong>
          <LawnMark />
          {design.concept?.brands[0] ?? "LAWN STUDIO"}
        </strong>
        <span>
          Home · Services · Our Work <b>Get in touch ↗</b>
        </span>
      </div>
      <LawnGrassRail />
      <div className="lawn-cover-hero">
        <div className="lawn-cover-copy">
          <span>GOOD CARE. GREAT OUTDOORS.</span>
          <strong>
            A well-kept lawn.
            <br />
            <em>
              A little more
              <br />
              weekend.
            </em>
          </strong>
          <p>Thoughtful lawn care, from the first cut to the final tidy-up.</p>
          <span className="lawn-cover-button">
            Explore our services <LawnArrow />
          </span>
          <small>MOWING / EDGING / SEASONAL CARE</small>
        </div>
        <div className="lawn-cover-photo">
          <Image
            src="/images/collection/lawn-hero.webp"
            alt=""
            fill
            sizes="(max-width:699px) 50vw, 24vw"
          />
          <span>
            For the love
            <br />
            <em>of outside.</em>
          </span>
        </div>
      </div>
      <div className="lawn-cover-footer">
        <span>A little care goes a long way.</span>
        <LawnMark />
        <span>LET YOUR LAWN SET THE TONE.</span>
      </div>
    </div>
  );
}
