"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { collectionInquiryHref, type WebsiteDesign } from "@/data/website-collection";
import { PaintBrush, PaintStroke, PaintingHeadline } from "@/components/collection/PaintMarks";

const pages = ["Home", "Services", "Projects", "Contact"] as const;
type Page = (typeof pages)[number];
const tones = [
  { id: "ochre", name: "Warm ochre" },
  { id: "sage", name: "Soft sage" },
  { id: "clay", name: "Terracotta" },
] as const;
type Tone = (typeof tones)[number]["id"];

export default function PaintingTemplate({
  design,
  businessName,
}: {
  design: WebsiteDesign;
  businessName: string;
}) {
  const [page, setPage] = useState<Page>("Home");
  const [tone, setTone] = useState<Tone>("ochre");
  const [service, setService] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const focusRequested = useRef(false);
  const id = useId();
  const concept = design.concept;

  useEffect(() => {
    if (focusRequested.current) {
      heading.current?.focus();
      focusRequested.current = false;
    }
  }, [page]);

  if (!concept) return null;
  const brand = businessName.trim() || concept.brands[0];
  const navigate = (next: Page) => {
    if (next === page) return;
    focusRequested.current = true;
    setPage(next);
  };
  const enquire = (name = "") => {
    setService(name);
    navigate("Contact");
  };
  const titleProps = { ref: heading, id: `${id}-heading`, tabIndex: -1 };

  return (
    <div className="paint-site" data-tone={tone}>
      <div className="paint-header">
        <button className="paint-brand" type="button" onClick={() => navigate("Home")}>
          <span className="paint-brand-mark" aria-hidden="true">
            <PaintBrush />
          </span>
          <span>
            {brand}
            <small>Painting & finishing</small>
          </span>
          <span className="sr-only"> — sample home</span>
        </button>
        <nav className="paint-nav" aria-label="Painting Company concept pages">
          {pages.map((item) => (
            <button
              key={item}
              type="button"
              aria-current={page === item ? "page" : undefined}
              onClick={() => navigate(item)}
            >
              {item}
              <span className="paint-nav-effect" aria-hidden="true">
                <PaintStroke />
                <span className="paint-brush-track">
                  <PaintBrush />
                </span>
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="paint-page" key={page} aria-labelledby={`${id}-heading`}>
        {page === "Home" ? (
          <>
            <div className="paint-hero">
              <div className="paint-hero-copy">
                <p className="paint-kicker">{concept.kicker}</p>
                <h3 {...titleProps}>
                  <PaintingHeadline text={concept.headlines[0]} />
                </h3>
                <p className="paint-intro">{concept.subcopy}</p>
                <button className="paint-button" type="button" onClick={() => enquire()}>
                  {concept.action}
                  <span aria-hidden="true">↗</span>
                </button>
                <button
                  className="paint-text-link"
                  type="button"
                  onClick={() => navigate("Projects")}
                >
                  Explore the finishes <span aria-hidden="true">→</span>
                </button>
              </div>
              <figure className="paint-hero-photo">
                <Image
                  {...concept.photo}
                  alt={concept.photo.alt}
                  sizes="(max-width: 699px) 100vw, 55vw"
                />
                <figcaption>01 / A softer place to come home to.</figcaption>
                <div className="paint-colour-note" aria-hidden="true">
                  <span className="paint-colour-chip" />
                  <span>
                    A little colour.
                    <br />
                    <em>A different feeling.</em>
                  </span>
                </div>
              </figure>
            </div>
            <div className="paint-service-strip" aria-label="Explore painting services">
              {concept.services.map((item, index) => (
                <button type="button" key={item.name} onClick={() => navigate("Services")}>
                  <span>0{index + 1}</span>
                  {item.name}
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <div className="paint-approach">
              <div>
                <p className="paint-kicker">The care behind the colour</p>
                <h4>
                  A beautiful finish.
                  <br />
                  <em>A thoughtful process.</em>
                </h4>
              </div>
              <div>
                <p>{concept.approach}</p>
                <div className="paint-process">
                  <span>01 / Protect</span>
                  <span>02 / Prepare</span>
                  <span>03 / Paint</span>
                </div>
              </div>
            </div>
          </>
        ) : page === "Services" ? (
          <div className="paint-inner">
            <div className="paint-page-heading">
              <p className="paint-kicker">What we paint</p>
              <h3 {...titleProps}>
                Every surface.
                <br />
                <em>Considered.</em>
              </h3>
              <p>
                From the room you use every day to the first impression outside, the right
                preparation makes the difference.
              </p>
            </div>
            <div className="paint-service-list">
              {concept.services.map((item, index) => (
                <article key={item.name}>
                  <span className="paint-service-number">0{index + 1}</span>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <button
                    type="button"
                    className="paint-text-link"
                    onClick={() => enquire(item.name)}
                  >
                    Discuss your project<span aria-hidden="true">↗</span>
                    <span className="sr-only">: {item.name}</span>
                  </button>
                </article>
              ))}
            </div>
            <div className="paint-service-close">
              <PaintBrush />
              <p>
                Colour choices, preparation and a clear scope — talked through before the first
                coat.
              </p>
            </div>
          </div>
        ) : page === "Projects" ? (
          <div className="paint-inner">
            <div className="paint-page-heading">
              <p className="paint-kicker">The possibilities</p>
              <h3 {...titleProps}>
                Spaces with
                <br />
                <em>a fresh perspective.</em>
              </h3>
              <p>
                Imagine your own work here. These illustrative spaces show how your project
                photography can tell the story.
              </p>
            </div>
            <div className="paint-projects">
              <figure>
                <Image
                  {...concept.photo}
                  alt={concept.photo.alt}
                  sizes="(max-width: 699px) 100vw, 50vw"
                />
                <figcaption>
                  <span>01 / Interior inspiration</span>
                  <h4>Warm light. Quiet colour.</h4>
                  <p>Soft neutrals and a sage accent bring a living space together.</p>
                </figcaption>
              </figure>
              <figure>
                <Image
                  src="/images/collection/construction-home.webp"
                  width={1536}
                  height={1024}
                  alt="Illustrative modern home with charcoal exterior finishes"
                  sizes="(max-width: 699px) 100vw, 50vw"
                />
                <figcaption>
                  <span>02 / Exterior inspiration</span>
                  <h4>A considered first impression.</h4>
                  <p>Deep exterior tones set against natural materials and clean lines.</p>
                </figcaption>
              </figure>
            </div>
            <p className="paint-sample-note">
              Illustrative images, not completed painting projects. Your approved photos and project
              details replace these examples.
            </p>
            <button type="button" className="paint-button" onClick={() => enquire()}>
              Plan your next project<span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <div className="paint-inner paint-contact">
            <div className="paint-page-heading">
              <p className="paint-kicker">Start with a conversation</p>
              <h3 {...titleProps}>
                Your space.
                <br />
                <em>Its next chapter.</em>
              </h3>
              <p>
                A room refresh, a whole home or a workspace. An estimate begins with what you have
                in mind.
              </p>
              <div className="paint-contact-note">
                <PaintStroke />
                <p>
                  This is a sample contact layout. We connect the real enquiry form to your business
                  when we personalize your website.
                </p>
              </div>
            </div>
            <div
              className="paint-estimate"
              aria-label="Non-interactive example of an estimate form"
            >
              <p className="paint-kicker">Your project, at a glance</p>
              <div className="paint-estimate-fields">
                <div>
                  <span>Name</span>
                  <span>Your name</span>
                </div>
                <div>
                  <span>Email</span>
                  <span>Your email address</span>
                </div>
                <div className="paint-estimate-wide">
                  <span>Painting service</span>
                  <span>{service || "Interior, exterior or commercial"}</span>
                </div>
                <div className="paint-estimate-wide">
                  <span>About your space</span>
                  <span>The rooms, location and timing you have in mind…</span>
                </div>
              </div>
              <p className="paint-sample-note">Preview only — no information collected or sent.</p>
              <Link className="paint-button" href={collectionInquiryHref({ design: design.id })}>
                Make this my website<span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="paint-personalize">
        <div>
          <p className="paint-kicker">Make the details yours</p>
          <p>Try an accent colour.</p>
        </div>
        <fieldset className="paint-swatches">
          <legend className="sr-only">Preview accent colour</legend>
          {tones.map((item) => (
            <button
              key={item.id}
              type="button"
              data-tone={item.id}
              aria-pressed={tone === item.id}
              onClick={() => setTone(item.id)}
            >
              <span className="paint-swatch" aria-hidden="true" />
              {item.name}
              <span className="paint-swatch-check" aria-hidden="true">
                {tone === item.id ? "✓" : ""}
              </span>
            </button>
          ))}
        </fieldset>
      </div>
      <div className="paint-footer">
        <span>{brand}</span>
        <span>An original L&L sample design · Your business, made personal.</span>
      </div>
    </div>
  );
}
