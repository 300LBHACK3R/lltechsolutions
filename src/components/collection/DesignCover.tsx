import Image from "next/image";
import LawnCover from "@/components/collection/LawnCover";
import EarthworksCover from "@/components/collection/EarthworksCover";
import type { WebsiteDesign } from "@/data/website-collection";
import PlumbingCover from "@/components/collection/PlumbingCover";
import PaintingCover from "@/components/collection/PaintingCover";
import HorizonCover from "@/components/collection/HorizonCover";
import WellnessCover from "@/components/collection/WellnessCover";

/** Decorative miniature; the surrounding card supplies its accessible name and description. */
export default function DesignCover({ design }: { design: WebsiteDesign }) {
  const concept = design.concept;
  if (design.preview) {
    return (
      <div className="design-cover design-cover-capture" aria-hidden="true">
        <Image
          {...design.preview}
          alt=""
          sizes="(max-width: 699px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
      </div>
    );
  }
  if (!concept) return null;
  if (concept.theme === "wellness") return <WellnessCover design={design} />;
  if (concept.theme === "horizon") return <HorizonCover design={design} />;
  if (concept.theme === "lawncare") return <LawnCover design={design} />;
  if (concept.theme === "earthworks") return <EarthworksCover design={design} />;
  if (concept.theme === "pigment") return <PaintingCover design={design} />;
  if (concept.theme === "structure") return <PlumbingCover design={design} />;
  return (
    <div className={`design-cover design-theme-${concept.theme}`} aria-hidden="true">
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="template-mini-header">
        <strong>{concept.brands[0]}</strong>
        <span>Home · Services · Contact</span>
      </div>
      <div className="template-mini-hero">
        <div className="template-mini-content">
          <span className="template-mini-kicker">{concept.kicker}</span>
          <strong>{concept.headlines[0]}</strong>
          <span className="template-mini-button">{concept.action} ↗</span>
        </div>
        <div className="template-mini-photo">
          <Image src={concept.photo.src} alt="" fill sizes="(max-width: 699px) 50vw, 25vw" />
        </div>
      </div>
      <div className="template-mini-services">
        {concept.services.slice(0, 3).map((service) => (
          <span key={service.name}>{service.name}</span>
        ))}
      </div>
    </div>
  );
}
