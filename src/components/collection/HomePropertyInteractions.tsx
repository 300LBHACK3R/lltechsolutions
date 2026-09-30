"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { homePropertyPagePath, type HomePropertyTemplate } from "@/data/website-collection";
import { materialPalettes, propertyExamples } from "@/data/property-demo-content";

const subscribe = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

export function HomePropertyNavigation({
  template,
  page,
}: {
  template: HomePropertyTemplate;
  page: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const ready = useSyncExternalStore(subscribe, browserReady, serverReady);
  const onePage = template.pages.length === 1;
  const links = onePage ? ["Services", "About", "Contact"] : template.pages;
  return (
    <header
      className="hp-header"
      data-enhanced={ready}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link className="hp-brand" href="/" aria-label={`${template.brand} home`}>
        <span aria-hidden="true" className="hp-brand-mark">
          {template.theme === "sunny"
            ? "✳"
            : template.theme === "glass"
              ? "╱"
              : template.theme === "teal"
                ? "⌂"
                : ""}
        </span>
        <span>
          {template.brand}
          <small>{template.subbrand}</small>
        </span>
      </Link>
      <button
        ref={toggle}
        className="hp-menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="hp-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close menu −" : "Menu +"}
      </button>
      <nav className="hp-nav" id="hp-navigation" aria-label="Demo website" data-open={open}>
        {links.map((label) => (
          <Link
            key={label}
            href={onePage ? `#${label.toLowerCase()}` : homePropertyPagePath(label)}
            aria-current={!onePage && page === label ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

/** A visual illustration, explicitly not a claimed cleaning before/after. */
export function GlassReveal({ image, imageAlt }: { image: string; imageAlt: string }) {
  const [clear, setClear] = useState(68);
  return (
    <div className="hp-glass-reveal">
      <figure className="hp-photo" style={{ "--clear": `${clear}%` } as CSSProperties}>
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 780px) 100vw, 55vw" priority />
        <span className="hp-glass-mist" aria-hidden="true" />
        <span className="hp-squeegee" aria-hidden="true" />
        <figcaption>A clearer outlook.</figcaption>
      </figure>
      <label className="hp-range-label" htmlFor="glass-reveal">
        Slide to let the light in <span aria-hidden="true">↔</span>
      </label>
      <input
        id="glass-reveal"
        type="range"
        min="5"
        max="95"
        value={clear}
        aria-valuetext={`${clear}% clear illustration`}
        onChange={(event) => setClear(Number(event.target.value))}
      />
      <p className="hp-small">An interactive design effect, not a before-and-after result.</p>
    </div>
  );
}

export function RoomSelector({ services }: { services: HomePropertyTemplate["services"] }) {
  const [active, setActive] = useState(0);
  const selected = services[active];
  return (
    <div className="hp-room-selector">
      <div className="hp-choice-row" role="group" aria-label="Choose a space">
        {services.map((service, index) => (
          <button
            type="button"
            key={service.name}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            {service.name}
          </button>
        ))}
      </div>
      <div className="hp-room-story" aria-live="polite" aria-atomic="true">
        <span className="hp-room-number" aria-hidden="true">
          0{active + 1}
        </span>
        <div>
          <h3>{selected.description}</h3>
          <p>{selected.detail}</p>
        </div>
        <Link className="hp-text-link" href="/contact">
          Let’s talk about this space ↗
        </Link>
      </div>
    </div>
  );
}

export function MaterialPalette() {
  const [active, setActive] = useState(0);
  const palette = materialPalettes[active];
  return (
    <div className="hp-palette">
      <div className="hp-palette-swatches" aria-hidden="true">
        {palette.colours.map((colour, index) => (
          <span key={index} style={{ backgroundColor: colour }}>
            0{index + 1}
          </span>
        ))}
      </div>
      <div className="hp-palette-copy">
        <p className="hp-kicker">Find a feeling</p>
        <h3>
          Different materials.
          <br />
          Different moods.
        </h3>
        <div className="hp-choice-row" role="group" aria-label="Explore a material direction">
          {materialPalettes.map((option, index) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              {option.name}
            </button>
          ))}
        </div>
        <div className="hp-palette-result" aria-live="polite" aria-atomic="true">
          <strong>{palette.materials}</strong>
          <p>{palette.description}</p>
        </div>
      </div>
    </div>
  );
}

export function PropertyPathways() {
  const [audience, setAudience] = useState<"owners" | "residents">("owners");
  const owner = audience === "owners";
  return (
    <section className="hp-pathways" id="pathways">
      <div>
        <p className="hp-kicker">Let’s get you to the right place</p>
        <h2>What brings you here?</h2>
        <div className="hp-choice-row" role="group" aria-label="Choose your pathway">
          <button type="button" aria-pressed={owner} onClick={() => setAudience("owners")}>
            I’m an owner
          </button>
          <button type="button" aria-pressed={!owner} onClick={() => setAudience("residents")}>
            I’m a resident
          </button>
        </div>
      </div>
      <div className="hp-pathway-result" aria-live="polite" aria-atomic="true">
        <span className="hp-path-icon" aria-hidden="true">
          {owner ? "⌂" : "↗"}
        </span>
        <h3>{owner ? "Your property, with a plan." : "Your home, with a point of contact."}</h3>
        <p>
          {owner
            ? "Explore how communication, routine coordination and an agreed management scope fit together."
            : "Find the right route for everyday questions and maintenance guidance."}
        </p>
        <Link className="hp-button" href={owner ? "/owners" : "/residents"}>
          {owner ? "Explore owner support" : "Find resident information"} ↗
        </Link>
      </div>
    </section>
  );
}

export function PropertyFinder({ rental = false }: { rental?: boolean }) {
  const [type, setType] = useState("All homes");
  const [bedrooms, setBedrooms] = useState("any");
  const options = propertyExamples.filter(
    (property) =>
      (type === "All homes" || property.type === type) &&
      (bedrooms === "any" || property.bedrooms >= Number(bedrooms)),
  );
  return (
    <div className="hp-finder">
      <div className="hp-finder-toolbar">
        <div className="hp-choice-row" role="group" aria-label="Property type">
          {["All homes", "House", "Apartment"].map((label) => (
            <button
              key={label}
              type="button"
              aria-pressed={type === label}
              onClick={() => setType(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <label htmlFor="property-bedrooms">
          Bedrooms
          <select
            id="property-bedrooms"
            value={bedrooms}
            onChange={(event) => setBedrooms(event.target.value)}
          >
            <option value="any">Any size</option>
            <option value="3">3 or more</option>
            <option value="4">4 or more</option>
          </select>
        </label>
      </div>
      <p className="hp-small" role="status" aria-live="polite">
        {options.length} illustrative {options.length === 1 ? "home" : "homes"} · No live
        availability or pricing.
      </p>
      <div className="hp-property-grid">
        {options.map((property) => (
          <article key={property.id} className="hp-property-card">
            <div className="hp-property-photo">
              <Image
                src={property.image}
                alt={property.alt}
                fill
                sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span>{property.type} / concept</span>
            </div>
            <div className="hp-property-copy">
              <p className="hp-kicker">{property.setting}</p>
              <h3>{property.name}</h3>
              <p>{property.description}</p>
              <details>
                <summary>
                  Explore the details <span aria-hidden="true">+</span>
                </summary>
                <ul>
                  {property.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p>{property.detail}</p>
                <Link className="hp-text-link" href="/contact">
                  {rental ? "Ask about the enquiry process" : "Start a conversation"} ↗
                </Link>
              </details>
            </div>
          </article>
        ))}
      </div>
      {options.length === 0 ? (
        <div className="hp-empty">
          <h3>No sample homes match those choices.</h3>
          <p>Try a different property type or bedroom count.</p>
          <button
            type="button"
            className="hp-button"
            onClick={() => {
              setType("All homes");
              setBedrooms("any");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
