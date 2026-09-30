import Image from "next/image";
import Link from "next/link";
import type { HomePropertyTemplate } from "@/data/website-collection";
import { GlassReveal } from "@/components/collection/HomePropertyInteractions";

export default function HomePropertyHero({
  template,
  preview = false,
}: {
  template: HomePropertyTemplate;
  preview?: boolean;
}) {
  const Heading = preview ? "div" : "h1";
  const destination =
    template.id === "home-cleaning"
      ? "#contact"
      : template.id === "real-estate"
        ? "/homes"
        : template.id === "property-management"
          ? "#pathways"
          : "/contact";
  const heading = (
    <Heading className="hp-headline">
      {template.headline}
      <em>{template.emphasis}</em>
    </Heading>
  );
  const action = preview ? (
    <span className="hp-button">{template.cta} ↗</span>
  ) : (
    <Link className="hp-button" href={destination}>
      {template.cta} <span aria-hidden="true">↗</span>
    </Link>
  );
  const photo = (
    <Image
      src={template.image}
      alt={preview ? "" : template.imageAlt}
      fill
      sizes={preview ? "(max-width: 699px) 100vw, 50vw" : "(max-width: 780px) 100vw, 70vw"}
      loading={preview ? "lazy" : "eager"}
    />
  );
  if (template.theme === "sunny")
    return (
      <section className="hp-hero hp-sunny-hero">
        <div className="hp-sunny-heading">
          <span className="hp-sun" aria-hidden="true">
            ✳
          </span>
          <p className="hp-kicker">A little help. A lighter week.</p>
          {heading}
          <span className="hp-sunny-stamp" aria-hidden="true">
            HELLO,
            <br />
            FRESH START.
          </span>
        </div>
        <div className="hp-sunny-bottom">
          <figure className="hp-photo">
            {photo}
            <figcaption>Make space for your good day.</figcaption>
          </figure>
          <div className="hp-sunny-note">
            <p>{template.intro}</p>
            {action}
            <span className="hp-handwritten">We’ll take it from here.</span>
          </div>
        </div>
      </section>
    );
  if (template.theme === "glass")
    return (
      <section className="hp-hero hp-glass-hero">
        <div className="hp-glass-copy">
          <p className="hp-kicker">The outlook is brighter.</p>
          {heading}
          <p>{template.intro}</p>
          {action}
          <div className="hp-glass-coordinates">
            <span>01 / HOMES</span>
            <span>02 / STOREFRONTS</span>
            <span>03 / DETAILS</span>
          </div>
        </div>
        {preview ? (
          <figure className="hp-photo hp-glass-static">
            {photo}
            <span className="hp-glass-line" aria-hidden="true" />
          </figure>
        ) : (
          <GlassReveal image={template.image} imageAlt={template.imageAlt} />
        )}
      </section>
    );
  if (template.theme === "linen")
    return (
      <section className="hp-hero hp-linen-hero">
        <p className="hp-kicker">A home that works for you.</p>
        {heading}
        <div className="hp-linen-composition">
          <figure className="hp-photo">
            {photo}
            <figcaption>01 / THE EVERYDAY, RECONSIDERED</figcaption>
          </figure>
          <div className="hp-linen-note">
            <span className="hp-note-pin" aria-hidden="true" />
            <p>{template.intro}</p>
            {action}
            <span className="hp-handwritten">Start small. Feel the difference.</span>
          </div>
        </div>
      </section>
    );
  if (template.theme === "clay")
    return (
      <section className="hp-hero hp-clay-hero">
        <div className="hp-clay-title">
          <p className="hp-kicker">Considered spaces, lived in.</p>
          {heading}
          <span className="hp-clay-index">FORM / FUNCTION / FEELING</span>
        </div>
        <figure className="hp-photo">
          {photo}
          <figcaption>
            <span>THE WARM HOUSE</span>
            <span>Illustrative design study / 01</span>
          </figcaption>
        </figure>
        <div className="hp-clay-caption">
          <p>{template.intro}</p>
          {action}
        </div>
      </section>
    );
  if (template.theme === "teal")
    return (
      <section className="hp-hero hp-teal-hero">
        <div className="hp-teal-copy">
          <p className="hp-kicker">People. Property. A common ground.</p>
          {heading}
          <p>{template.intro}</p>
          {action}
        </div>
        <figure className="hp-photo">
          {photo}
          <figcaption>
            <span className="hp-status-dot" aria-hidden="true" /> A place to feel at home.
          </figcaption>
        </figure>
        <div className="hp-teal-ribbon">
          <span>For owners.</span>
          <span>For residents.</span>
          <span>For the everyday.</span>
        </div>
      </section>
    );
  return (
    <section className="hp-hero hp-estate-hero">
      <figure className="hp-photo">{photo}</figure>
      <div className="hp-estate-copy">
        <p className="hp-kicker">Spaces worth finding.</p>
        {heading}
        <p>{template.intro}</p>
        {action}
      </div>
      <div className="hp-estate-caption">
        <span>THE HILLSIDE COLLECTION</span>
        <span>Illustrative property / 01</span>
      </div>
    </section>
  );
}
