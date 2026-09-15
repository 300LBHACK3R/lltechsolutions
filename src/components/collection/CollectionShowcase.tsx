import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  availableDesigns,
  categoryForIndustry,
  designHref,
  designPrice,
} from "@/data/website-collection";

const featuredIds = ["mckenzie-house", "tow-n-go", "crestline"] as const;

/** Native radio controls keep the visual selector usable before hydration and without JavaScript. */
export default function CollectionShowcase() {
  const catalogue = availableDesigns();
  const designs = featuredIds.flatMap((id) => {
    const design = catalogue.find((item) => item.id === id);
    return design?.status === "client-example" && design.preview
      ? [{ ...design, preview: design.preview }]
      : [];
  });
  if (!designs.length) return null;

  return (
    <div className="collection-showcase">
      <div className="collection-showcase-heading">
        <span>Real work. Different possibilities.</span>
        <span>Choose a preview ↓</span>
      </div>
      <fieldset className="collection-showcase-picker">
        <legend className="sr-only">Choose a client website to preview</legend>
        {designs.map((design, index) => {
          const choiceId = `collection-choice-${design.id}`;
          const panelId = `collection-preview-${design.id}`;
          return (
            <Fragment key={design.id}>
              <input
                className="sr-only collection-showcase-choice"
                type="radio"
                name="collection-preview"
                id={choiceId}
                value={design.id}
                defaultChecked={index === 0}
                aria-controls={panelId}
              />
              <label className="collection-showcase-option" htmlFor={choiceId}>
                <span className="collection-showcase-thumb" aria-hidden="true">
                  <Image
                    src={design.preview.src}
                    alt=""
                    fill
                    sizes="(max-width: 699px) 28vw, 150px"
                  />
                </span>
                <span>
                  <span className="collection-showcase-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  {categoryForIndustry(design.industry)?.name ?? design.name}
                  <span className="sr-only"> — {design.name}</span>
                </span>
              </label>
              <div
                className="collection-showcase-panel"
                id={panelId}
                role="region"
                aria-label={`${design.name} website preview`}
              >
                <div className="collection-showcase-browser" aria-hidden="true">
                  <span className="collection-showcase-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>{new URL(design.demoUrl).hostname.replace(/^www\./, "")}</span>
                  <span>↗</span>
                </div>
                <Link
                  className="collection-showcase-image"
                  href={`${designHref(design)}#preview`}
                  aria-label={`Explore the ${design.name} website example`}
                >
                  <Image
                    {...design.preview}
                    alt={design.preview.alt}
                    sizes="(min-width: 2560px) 1080px, (min-width: 1900px) 920px, (min-width: 1100px) 52vw, (min-width: 700px) 760px, calc(100vw - 40px)"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                  <span className="collection-showcase-open">
                    Explore the design <span aria-hidden="true">↗</span>
                  </span>
                </Link>
                <div className="collection-showcase-caption">
                  <div>
                    <p>Live client example</p>
                    <h2>{design.name}</h2>
                  </div>
                  <p className="collection-showcase-price">
                    {designPrice(design)}
                    <span>Similar new build · Before tax</span>
                  </p>
                </div>
              </div>
            </Fragment>
          );
        })}
      </fieldset>
      <p className="collection-showcase-note">
        Your brand. Your content. A website that feels like you.
      </p>
    </div>
  );
}
