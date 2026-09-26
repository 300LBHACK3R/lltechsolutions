import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { hairSalonContent } from "@/data/hair-salon-content";
import { HairSalonMark } from "@/components/collection/HairSalonTemplate";

export default function HairSalonCover({ design }: { design: WebsiteDesign }) {
  return (
    <div className="design-cover hair-cover" aria-hidden="true" data-hair-salon-cover={design.id}>
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="hair-cover-header">
        <strong>
          <HairSalonMark />
          <span>
            LINE & FORM<small>HAIR</small>
          </span>
        </strong>
        <span>
          Home · Services · Our Salon <b>Contact ↗</b>
        </span>
      </div>
      <div className="hair-cover-hero">
        <div className="hair-cover-copy">
          <span>{hairSalonContent.eyebrow}</span>
          <strong>
            {hairSalonContent.headline}
            <br />
            <em>{hairSalonContent.emphasis}</em>
          </strong>
          <p>{hairSalonContent.introduction}</p>
          <span className="hair-cover-button">Find your appointment ↗</span>
          <small>THE LINE & FORM APPROACH</small>
          <p className="hair-cover-signoff">Considered. Personal. Precisely you.</p>
        </div>
        <div className="hair-cover-photo">
          <Image src={hairSalonContent.image} alt="" fill sizes="(max-width: 699px) 48vw, 24vw" />
          <span>
            <small>SPACE TO FIND YOUR STYLE</small>A fresh perspective.<b>↗</b>
          </span>
        </div>
      </div>
      <div className="hair-cover-footer">
        <span>Thoughtful consultation</span>
        <span>Considered technique</span>
        <span>Everyday wearability</span>
      </div>
    </div>
  );
}
