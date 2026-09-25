import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { beautyContent } from "@/data/beauty-content";
import { BeautyMark } from "@/components/collection/BeautyTemplate";

export default function BeautyCover({ design }: { design: WebsiteDesign }) {
  return (
    <div className="design-cover beauty-cover" aria-hidden="true" data-beauty-cover={design.id}>
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="beauty-cover-header">
        <strong>
          <BeautyMark />
          <span>
            forma<small>NAIL & SKIN</small>
          </span>
        </strong>
        <span>Home · Services · Contact ↗</span>
      </div>
      <div className="beauty-cover-hero">
        <div className="beauty-cover-copy">
          <span>{beautyContent.eyebrow}</span>
          <strong>
            {beautyContent.headline}
            <br />
            <em>{beautyContent.emphasis}</em>
          </strong>
          <p>{beautyContent.introduction}</p>
          <span className="beauty-cover-button">Find your appointment ↗</span>
          <small>A little care. A lovely difference.</small>
        </div>
        <div className="beauty-cover-photo">
          <Image src={beautyContent.image} alt="" fill sizes="(max-width: 699px) 46vw, 24vw" />
          <span>Made for your moment.</span>
        </div>
      </div>
      <div className="beauty-cover-footer">
        <span>The Forma approach.</span>
        <span>Nails · Skin · Finishing touches</span>
      </div>
    </div>
  );
}
