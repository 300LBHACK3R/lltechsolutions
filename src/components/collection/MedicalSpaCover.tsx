import Image from "next/image";
import type { WebsiteDesign } from "@/data/website-collection";
import { medicalSpaContent } from "@/data/medical-spa-content";
import { MedicalSpaMark } from "@/components/collection/MedicalSpaTemplate";

export default function MedicalSpaCover({ design }: { design: WebsiteDesign }) {
  return (
    <div
      className="design-cover medical-spa-cover"
      data-medical-spa-cover={design.id}
      aria-hidden="true"
    >
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="medical-spa-cover-header">
        <strong>
          <MedicalSpaMark />
          <span>
            AUREL<small>A E S T H E T I C S</small>
          </span>
        </strong>
        <span>Home · Treatments · The Clinic · Contact ↗</span>
      </div>
      <div className="medical-spa-cover-hero">
        <div className="medical-spa-cover-photo">
          <Image src={medicalSpaContent.image} alt="" fill sizes="(max-width: 699px) 64vw, 34vw" />
        </div>
        <div className="medical-spa-cover-copy">
          <span>{medicalSpaContent.eyebrow}</span>
          <strong>
            {medicalSpaContent.headline}
            <br />
            <em>{medicalSpaContent.emphasis}</em>
          </strong>
          <p>{medicalSpaContent.introduction}</p>
          <span className="medical-spa-cover-button">Begin your consultation ↗</span>
          <small>A personal approach. A considered pace.</small>
        </div>
        <span className="medical-spa-cover-caption">AUREL / AN ILLUSTRATIVE CLINIC</span>
      </div>
      <div className="medical-spa-cover-rule">
        <span>INDIVIDUAL BY DESIGN</span>
        <MedicalSpaMark />
        <span>THOUGHTFUL AT EVERY STEP</span>
      </div>
      <div className="medical-spa-cover-footer">
        <span>The Aurel philosophy.</span>
        <em>An aesthetic that begins with listening.</em>
      </div>
    </div>
  );
}
