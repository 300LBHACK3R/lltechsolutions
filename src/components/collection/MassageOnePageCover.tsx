import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { massageOnePage as content } from "@/data/massage-one-page-content";

/** Decorative preview; its enclosing link supplies the template's accessible name. */
export default function MassageOnePageCover({ design }: { design: WebsiteDesign }) {
  return (
    <div className="design-cover massage-one-cover" aria-hidden="true" data-design={design.id}>
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="massage-one-cover-header">
        <strong>
          soma.<small>MASSAGE</small>
        </strong>
        <span>
          Treatments · Our approach <b>Get in touch ↗</b>
        </span>
      </div>
      <div className="massage-one-cover-hero">
        <div>
          <span>MASSAGE · A MOMENT FOR YOU</span>
          <strong>
            {content.headline}
            <br />
            <em>{content.emphasis}</em>
          </strong>
          <p>A welcoming space to slow down and make a little time for yourself.</p>
          <span className="massage-one-cover-button">Explore booking ↗</span>
        </div>
        <div className="massage-one-cover-photo">
          <Image src={content.photo.src} alt="" fill sizes="(max-width: 699px) 50vw, 25vw" />
          <span>PAUSE. EXHALE.</span>
        </div>
      </div>
      <div className="massage-one-cover-footer">
        <span>A LITTLE LESS RUSH.</span>
        <em>A little more you.</em>
      </div>
    </div>
  );
}
