import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { artsyNailContent } from "@/data/artsy-nail-content";
import { ArtsyNailMark } from "@/components/collection/ArtsyNailTemplate";

export default function ArtsyNailCover({ design }: { design: WebsiteDesign }) {
  return (
    <div
      className="design-cover artsy-nail-cover"
      aria-hidden="true"
      data-artsy-nail-cover={design.id}
    >
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="artsy-nail-cover-header">
        <strong>
          CHROMA<small>NAIL CLUB</small>
          <ArtsyNailMark />
        </strong>
        <span>Home · Nail Menu · The Studio · Contact ↗</span>
      </div>
      <div className="artsy-nail-cover-hero">
        <div className="artsy-nail-cover-copy">
          <span>{artsyNailContent.eyebrow}</span>
          <strong>
            {artsyNailContent.headline}
            <em>{artsyNailContent.emphasis}</em>
          </strong>
          <p>{artsyNailContent.introduction}</p>
          <span className="artsy-nail-cover-button">Find your next set ↗</span>
          <small>A LITTLE SELF-EXPRESSION, RIGHT AT YOUR FINGERTIPS.</small>
        </div>
        <div className="artsy-nail-cover-photo">
          <Image src={artsyNailContent.image} alt="" fill sizes="(max-width: 699px) 48vw, 25vw" />
          <span>
            ART ON
            <br />
            YOUR TERMS.
            <ArtsyNailMark />
          </span>
        </div>
      </div>
      <div className="artsy-nail-cover-ribbon">
        <span>A FRESH SET OF POSSIBILITIES</span>
        <ArtsyNailMark />
        <span>GOOD COLOUR. GOOD COMPANY.</span>
      </div>
    </div>
  );
}
