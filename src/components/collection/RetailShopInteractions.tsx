"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { RetailTemplate } from "@/data/website-collection";

export function BayServiceExplorer({ services }: { services: RetailTemplate["services"] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const service = services[selected];

  return (
    <section className="bay-explorer retail-wrap" aria-labelledby={`${id}-heading`}>
      <div className="bay-explorer-heading">
        <p className="bay-label">02 / UNDER THE SURFACE</p>
        <h2 id={`${id}-heading`}>
          Every part.
          <br />A clear purpose.
        </h2>
        <p>Select a service to see where the conversation starts.</p>
      </div>
      <div className="bay-explorer-body">
        <div className="bay-diagram" data-area={selected}>
          <div className="bay-diagram-top">
            <span>VEHICLE / PLAN VIEW</span>
            <span>SCHEMATIC 03—A</span>
          </div>
          <svg viewBox="0 0 620 400" fill="none" aria-hidden="true">
            <path
              className="bay-guide"
              d="M310 25v350M30 200h560M105 70h410v260H105z"
              strokeDasharray="4 8"
            />
            <path
              className="bay-chassis"
              d="M145 128q10-45 65-48h195q48 3 66 48l25 35v75l-25 37q-18 44-66 47H210q-55-3-65-47l-25-37v-75z"
            />
            <path
              className="bay-chassis"
              d="m230 105-30 63v66l30 63m142-192 30 63v66l-30 63M230 105h142M230 297h142M202 166h199M202 236h199M266 109v184M348 109v184"
            />
            <path className="bay-glass" d="m238 112-27 46h180l-27-46zm-27 132 27 46h126l27-46z" />
            <g className="bay-zone bay-zone-brakes">
              <rect x="168" y="67" width="58" height="25" rx="5" />
              <rect x="168" y="310" width="58" height="25" rx="5" />
              <rect x="385" y="67" width="58" height="25" rx="5" />
              <rect x="385" y="310" width="58" height="25" rx="5" />
              <path d="M197 93v33m0 184v-33M414 93v33m0 184v-33" />
            </g>
            <g className="bay-zone bay-zone-maintenance">
              <rect x="137" y="157" width="55" height="86" rx="6" />
              <path d="M150 173h29v56h-29zM152 185h25m-25 12h25m-25 12h25" />
            </g>
            <g className="bay-zone bay-zone-diagnostics">
              <rect x="284" y="170" width="48" height="61" rx="4" />
              <path d="M294 184h28v22h-28zM296 218h4m8 0h4m8 0h4M308 231v27h91" />
            </g>
            <path
              className="bay-callout"
              d="M170 80H87V43H40M158 200H61v80H30M330 188h201v-82h53"
            />
            <circle className="bay-point" cx="170" cy="80" r="5" />
            <circle className="bay-point" cx="158" cy="200" r="5" />
            <circle className="bay-point" cx="330" cy="188" r="5" />
            <text x="35" y="32">
              01
            </text>
            <text x="25" y="302">
              02
            </text>
            <text x="569" y="95">
              03
            </text>
            <path className="bay-direction" d="m555 228 18-28-18-28m18 28h-55" />
          </svg>
          <div className="bay-diagram-bottom">
            <span>ILLUSTRATIVE SYSTEM MAP</span>
            <span>FRONT ←</span>
          </div>
        </div>
        <div className="bay-service-console">
          <div className="bay-service-options" role="group" aria-label="Explore a workshop service">
            {services.slice(0, 3).map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={selected === index}
                aria-controls={`${id}-detail`}
                onClick={() => setSelected(index)}
              >
                <span>0{index + 1}</span>
                {item.name}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          {service ? (
            <div
              className="bay-service-detail"
              id={`${id}-detail`}
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="bay-label">SERVICE NOTE / 0{selected + 1}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p className="bay-service-note">{service.detail}</p>
            </div>
          ) : null}
          <p className="bay-small">
            A service guide, not a vehicle assessment. A workshop inspection determines the work a
            vehicle needs.
          </p>
        </div>
      </div>
    </section>
  );
}

export function StreetwearCollection({ template }: { template: RetailTemplate }) {
  const [category, setCategory] = useState("All pieces");
  const [saved, setSaved] = useState<string[]>([]);
  const id = useId();
  const categories = ["All pieces", ...new Set(template.items.map((item) => item.category))];
  const items = template.items.filter(
    (item) => category === "All pieces" || item.category === category,
  );

  function toggleSaved(name: string) {
    setSaved((previous) =>
      previous.includes(name) ? previous.filter((item) => item !== name) : [...previous, name],
    );
  }

  return (
    <section className="og-collection retail-wrap" aria-labelledby={`${id}-heading`}>
      <div className="og-collection-heading">
        <div>
          <p className="og-label">THE EDIT / ILLUSTRATIVE COLLECTION</p>
          <h2 id={`${id}-heading`}>
            Good pieces.
            <br />
            <em>Your rules.</em>
          </h2>
        </div>
        <p>Build a little shortlist. Mix a silhouette, find a layer, make it your own.</p>
      </div>
      <div className="og-collection-tools">
        <div className="og-filters" role="group" aria-label="Filter the sample collection">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              aria-controls={`${id}-products`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="og-result-count" role="status">
          {items.length} {items.length === 1 ? "piece" : "pieces"} in view
        </span>
      </div>
      <div className="og-product-grid" id={`${id}-products`}>
        {items.map((item) => {
          const index = template.items.findIndex((piece) => piece.name === item.name);
          const isSaved = saved.includes(item.name);
          return (
            <article key={item.name} className={`og-product og-product-${index % 3}`}>
              <figure className="og-product-image">
                <Image
                  src={template.image}
                  alt="An editorial crop of the illustrative OFF/GRID clothing studio, rather than a photograph of this individual piece."
                  fill
                  sizes="(max-width: 600px) 88vw, (max-width: 900px) 44vw, 28vw"
                />
                <span className="og-product-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <figcaption>STUDIO CROP / ILLUSTRATIVE</figcaption>
              </figure>
              <div className="og-product-title">
                <h3>{item.name}</h3>
                <span>{item.price}</span>
              </div>
              <p>{item.description}</p>
              <div className="og-product-meta">
                <span>{item.category}</span>
                <button
                  type="button"
                  className="og-save"
                  aria-pressed={isSaved}
                  aria-label={`${isSaved ? "Remove" : "Add"} ${item.name} ${isSaved ? "from" : "to"} shortlist`}
                  onClick={() => toggleSaved(item.name)}
                >
                  <span aria-hidden="true">{isSaved ? "✓" : "+"}</span>
                  {isSaved ? "Shortlisted" : "Shortlist"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <aside className="og-shortlist" aria-labelledby={`${id}-shortlist`}>
        <div>
          <p className="og-label">YOUR PERSONAL EDIT</p>
          <h3 id={`${id}-shortlist`}>
            The shortlist <span aria-hidden="true">↗</span>
          </h3>
          <p role="status" aria-live="polite">
            {saved.length
              ? `${saved.length} ${saved.length === 1 ? "piece" : "pieces"} saved in this preview.`
              : "Nothing saved yet. Tap Shortlist on a piece above."}
          </p>
        </div>
        <div className="og-shortlist-content">
          {saved.length ? (
            <>
              <ul>
                {saved.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
              <button className="og-clear" type="button" onClick={() => setSaved([])}>
                Clear shortlist
              </button>
            </>
          ) : (
            <span className="og-empty-mark" aria-hidden="true">
              [ + ]
            </span>
          )}
          <small>
            Your list lasts while this page is open. Sample prices in CAD; no orders or purchases
            are made here.
          </small>
        </div>
      </aside>
    </section>
  );
}

const lookbookFrames = [
  {
    title: "Room to move.",
    note: "Volume, a little space, an everyday starting point.",
    label: "01 / THE SILHOUETTE",
  },
  {
    title: "Leave it open.",
    note: "A rail of possibilities. A layer that changes the whole thing.",
    label: "02 / THE MIX",
  },
  {
    title: "Make a mark.",
    note: "A flash of colour. An unexpected angle. One detail that feels like you.",
    label: "03 / THE ATTITUDE",
  },
];

export function StreetwearLookbook({ template }: { template: RetailTemplate }) {
  const rail = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const id = useId();

  function goTo(index: number) {
    const container = rail.current;
    const slide = container?.children[index] as HTMLElement | undefined;
    if (!container || !slide) return;
    const reducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "paused";
    container.scrollTo({
      left: slide.offsetLeft - (container.children[0] as HTMLElement).offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  function updateCurrent() {
    const container = rail.current;
    if (!container) return;
    const firstLeft = (container.children[0] as HTMLElement).offsetLeft;
    let nearest = 0;
    let nearestDistance = Infinity;
    Array.from(container.children).forEach((child, index) => {
      const distance = Math.abs(
        (child as HTMLElement).offsetLeft - firstLeft - container.scrollLeft,
      );
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    setCurrent(nearest);
  }

  return (
    <section className="og-lookbook" aria-labelledby={`${id}-heading`}>
      <div className="og-lookbook-heading retail-wrap">
        <div>
          <p className="og-label">STUDIO STUDIES / ONE SCENE, THREE FRAMES</p>
          <h2 id={`${id}-heading`}>
            Wear it
            <br />
            <em>your way.</em>
          </h2>
        </div>
        <div className="og-lookbook-controls">
          <span aria-live="polite">0{current + 1} / 03</span>
          <button
            type="button"
            disabled={current === 0}
            aria-label="Previous studio frame"
            aria-controls={`${id}-rail`}
            onClick={() => goTo(current - 1)}
          >
            ←
          </button>
          <button
            type="button"
            disabled={current === 2}
            aria-label="Next studio frame"
            aria-controls={`${id}-rail`}
            onClick={() => goTo(current + 1)}
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={rail}
        id={`${id}-rail`}
        className="og-lookbook-rail"
        onScroll={updateCurrent}
        tabIndex={0}
        aria-label="Editorial studio frames"
      >
        {lookbookFrames.map((frame, index) => (
          <article className={`og-frame og-frame-${index}`} key={frame.label}>
            <div className="og-frame-image">
              <Image
                src={template.image}
                alt={`Editorial framing ${index + 1} of the same illustrative OFF/GRID studio scene.`}
                fill
                sizes="(max-width: 700px) 90vw, 67vw"
              />
              <span>{frame.label}</span>
            </div>
            <div className="og-frame-caption">
              <h3>{frame.title}</h3>
              <p>{frame.note}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="og-image-note retail-wrap">
        Three crops of one generated studio image. An editorial direction for your own collection
        photography.
      </p>
    </section>
  );
}
