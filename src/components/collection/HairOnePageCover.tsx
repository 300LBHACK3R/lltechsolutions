import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { hairOnePage as content } from "@/data/hair-one-page-content";

/** Decorative preview; the enclosing link supplies the accessible template name. */
export default function HairOnePageCover({ design }: { design: WebsiteDesign }) {
  return (
    <div className="design-cover hair-one-cover" aria-hidden="true" data-design={design.id}>
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="hair-one-cover-header">
        <strong>
          JUNE <small>HAIR</small>
        </strong>
        <span>
          Home &nbsp; Services &nbsp; About <b>Contact ↗</b>
        </span>
      </div>
      <div className="hair-one-cover-hero">
        <div className="hair-one-cover-photo">
          <Image src={content.photo.src} alt="" fill sizes="(max-width: 699px) 60vw, 30vw" />
          <span>A little time in the chair.</span>
        </div>
        <div className="hair-one-cover-copy">
          <span>YOUR NEIGHBOURHOOD HAIR STUDIO</span>
          <strong>
            {content.headline}
            <br />
            <em>{content.emphasis}</em>
          </strong>
          <p>{content.introduction}</p>
          <span className="hair-one-cover-button">Plan your visit ↗</span>
          <small>Find your next look ↓</small>
        </div>
      </div>
      <div className="hair-one-cover-footer">
        <span>THE SERVICE MENU</span>
        <em>A little change. A whole new feeling.</em>
      </div>
    </div>
  );
}
