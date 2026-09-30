import Image from "next/image";
import Link from "next/link";
import { retailPagePath, type RetailTemplate } from "@/data/website-collection";
import { StreetwearCollection, StreetwearLookbook } from "./RetailShopInteractions";
import { RetailContact, RetailFooter, RetailHeader, RetailPageIntro } from "./RetailShared";

function StreetwearHero({ template }: { template: RetailTemplate }) {
  return (
    <section className="og-hero">
      <div className="og-hero-meta retail-wrap">
        <p className="og-label">INDEPENDENT STYLE / EVERYDAY EXPRESSION</p>
        <span>STUDIO EDIT — 001</span>
      </div>
      <h1 className="og-wordmark" aria-label="Off grid. Wear your own way.">
        <span aria-hidden="true">OFF/</span>
        <span aria-hidden="true">GRID</span>
      </h1>
      <div className="og-hero-grid retail-wrap">
        <div className="og-hero-note">
          <span className="og-orbit" aria-hidden="true">
            ↗
          </span>
          <p>{template.intro}</p>
          <Link className="og-button" href={retailPagePath("Collection")}>
            Find your next layer <span aria-hidden="true">↗</span>
          </Link>
          <span className="og-label">
            NOT A UNIFORM.
            <br />A WAY OF SHOWING UP.
          </span>
        </div>
        <figure className="og-hero-image">
          <Image
            src={template.image}
            alt={template.imageAlt}
            fill
            sizes="(max-width: 700px) 92vw, 70vw"
            preload
          />
          <figcaption>
            <span>01 / THE OFF/GRID STUDIO</span>
            <span>ILLUSTRATIVE IMAGE</span>
          </figcaption>
        </figure>
        <div className="og-hero-side" aria-hidden="true">
          GO YOUR OWN WAY ↗
        </div>
      </div>
      <div className="og-strip" aria-hidden="true">
        <span>LESS EXPECTED.</span>
        <span>MORE YOU.</span>
        <span>OFF/GRID ↗</span>
      </div>
    </section>
  );
}

function StreetwearManifesto({
  template,
  full = false,
}: {
  template: RetailTemplate;
  full?: boolean;
}) {
  return (
    <section
      className={`og-manifesto retail-wrap${full ? " og-manifesto-full" : ""}`}
      aria-labelledby="og-manifesto-heading"
    >
      <p className="og-label">A NOTE FROM OFF/GRID</p>
      <div className="og-manifesto-copy">
        <h2 id="og-manifesto-heading">
          For the
          <br />
          <em>unprescribed.</em>
        </h2>
        <p>{template.about}</p>
        {full ? (
          <>
            <p>
              Some days are all clean lines. Some need a little noise. This fictional studio
              explores both: familiar shapes, unexpected proportion, and room for the person wearing
              them.
            </p>
            <p>
              Use this space to tell your own label’s story, introduce your people, and share the
              details that make each piece yours.
            </p>
          </>
        ) : null}
        <Link className="og-text-link" href={retailPagePath(full ? "Collection" : "Our story")}>
          {full ? "Explore the edit" : "Read our story"}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="og-manifesto-mark" aria-hidden="true">
        <span>OFF</span>
        <span>YOUR</span>
        <span>GRID.</span>
        <b>↗</b>
      </div>
    </section>
  );
}

export default function StreetwearTemplate({
  template,
  page = "home",
  enquiryHref,
}: {
  template: RetailTemplate;
  page?: string;
  enquiryHref: string;
}) {
  return (
    <div className="retail-site retail-theme-streetwear-store" data-retail-demo={template.id}>
      <RetailHeader template={template} page={page} />
      {page === "collection" ? (
        <>
          <RetailPageIntro
            eyebrow="THE STUDIO EDIT / 001"
            title="Find your own fit."
            description="An illustrative edit of everyday pieces. Filter the collection and keep a little shortlist of what catches your eye."
          />
          <StreetwearCollection template={template} />
        </>
      ) : page === "lookbook" ? (
        <>
          <RetailPageIntro
            eyebrow="OFF/GRID / STUDIO JOURNAL"
            title="An everyday point of view."
            description="Proportion. Contrast. A different way of putting the familiar together."
          />
          <StreetwearLookbook template={template} />
          <div className="og-page-cta retail-wrap">
            <h2>Something catch your eye?</h2>
            <Link className="og-button" href={retailPagePath("Collection")}>
              Browse the collection <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </>
      ) : page === "our-story" ? (
        <>
          <RetailPageIntro
            eyebrow="A LABEL WITH ITS OWN PERSPECTIVE"
            title="No set direction."
            description="Just a little curiosity about what you put on, and how you make it yours."
          />
          <StreetwearManifesto template={template} full />
          <figure className="og-story-image retail-wrap">
            <div>
              <Image src={template.image} alt={template.imageAlt} fill sizes="90vw" />
            </div>
            <figcaption>OFF/GRID / AN ILLUSTRATIVE INDEPENDENT LABEL</figcaption>
          </figure>
        </>
      ) : page === "contact" ? (
        <>
          <RetailPageIntro
            eyebrow="KEEP THE CONVERSATION OPEN"
            title="What’s on your mind?"
            description="A question about the collection, the label, or a creative collaboration? Start here."
          />
          <RetailContact template={template} enquiryHref={enquiryHref} />
        </>
      ) : (
        <>
          <StreetwearHero template={template} />
          <StreetwearCollection template={template} />
          <StreetwearManifesto template={template} />
        </>
      )}
      <RetailFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
