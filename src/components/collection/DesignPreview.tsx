"use client";

import { useId, useRef, useState } from "react";
import type { WebsiteDesign } from "@/data/website-collection";

export default function DesignPreview({ design }: { design: WebsiteDesign }) {
  const [brand, setBrand] = useState<0 | 1>(0);
  const [screen, setScreen] = useState<"responsive" | "phone">("responsive");
  const [page, setPage] = useState("Home");
  const heading = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const concept = design.concept;
  if (!concept) return null;
  const navigate = (next: string) => {
    setPage(next);
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  };
  const pages = [
    "Home",
    "Services",
    concept.theme === "still" ? "Approach" : "Projects",
    "Contact",
  ];
  return (
    <div className="design-preview">
      <div className="design-preview-toolbar">
        <fieldset>
          <legend>Make it yours — try a sample identity</legend>
          <div className="journey-segment">
            {concept.brands.map((name, index) => (
              <button
                key={name}
                type="button"
                aria-pressed={brand === index}
                onClick={() => setBrand(index as 0 | 1)}
              >
                {name}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Preview size</legend>
          <div className="journey-segment">
            <button
              type="button"
              aria-pressed={screen === "responsive"}
              onClick={() => setScreen("responsive")}
            >
              Fit screen
            </button>
            <button
              type="button"
              aria-pressed={screen === "phone"}
              onClick={() => setScreen("phone")}
            >
              Phone
            </button>
          </div>
        </fieldset>
      </div>
      <p className="collection-fineprint">
        Sample identities and illustrative artwork. Explore the page buttons below; your own
        branding, content and photography would replace these examples.
      </p>
      <div className={`design-preview-viewport ${screen === "phone" ? "is-phone" : ""}`}>
        <div
          className={`design-canvas design-theme-${concept.theme} ${brand === 1 ? "design-alternate" : ""}`}
        >
          <div className="demo-header">
            <span className="demo-brand">
              {concept.brands[brand]}
              <small>Website design concept</small>
            </span>
            <nav aria-label={`${design.name} concept pages`}>
              {pages.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-current={page === item ? "page" : undefined}
                  onClick={() => navigate(item)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="demo-content" aria-labelledby={`${id}-heading`}>
            {page === "Home" ? (
              <>
                <div className="demo-hero">
                  <div className="demo-hero-copy">
                    <p className="demo-kicker">The {design.name} design / Made personal</p>
                    <h3 ref={heading} id={`${id}-heading`} tabIndex={-1}>
                      {concept.headlines[brand]}
                    </h3>
                    <p>{concept.subcopy}</p>
                    <button
                      type="button"
                      className="demo-button"
                      onClick={() => navigate("Services")}
                    >
                      Explore the services <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                  <div className="design-art demo-art" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div className="demo-bottom-line">
                  <span>Space for your story.</span>
                  <span>Clarity for your customers.</span>
                </div>
              </>
            ) : page === "Services" ? (
              <>
                <p className="demo-kicker">What you do / Clearly explained</p>
                <h3 ref={heading} id={`${id}-heading`} tabIndex={-1}>
                  The right service.
                  <br />
                  An easy next step.
                </h3>
                <div className="demo-services">
                  {concept.services.map((service, index) => (
                    <article key={service.name}>
                      <span>0{index + 1}</span>
                      <div>
                        <h4>{service.name}</h4>
                        <p>{service.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate("Contact")}
                        aria-label={`Explore the enquiry layout for ${service.name}`}
                      >
                        Enquire ↗
                      </button>
                    </article>
                  ))}
                </div>
              </>
            ) : page === "Contact" ? (
              <>
                <p className="demo-kicker">An approachable first conversation</p>
                <h3 ref={heading} id={`${id}-heading`} tabIndex={-1}>
                  Let’s talk about
                  <br />
                  what you need.
                </h3>
                <div className="demo-contact-layout">
                  <p>
                    This space would introduce your contact details, service area and{" "}
                    {concept.theme === "still" ? "booking link" : "project enquiry form"}. The
                    finished version is configured for your real business.
                  </p>
                  <div
                    className="demo-form-sample"
                    aria-label="Non-interactive example of an enquiry layout"
                  >
                    <span>Your name</span>
                    <span>Email address</span>
                    <span>Tell us a little about what you need</span>
                    <strong>Enquiry layout preview — no information collected</strong>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="demo-kicker">
                  {page === "Approach"
                    ? "The person behind the practice"
                    : "A place for your real work"}
                </p>
                <h3 ref={heading} id={`${id}-heading`} tabIndex={-1}>
                  {page === "Approach"
                    ? "Care, with a personal touch."
                    : "The details tell the story."}
                </h3>
                <p className="demo-approach">{concept.approach}</p>
                <div className="demo-project-plate">
                  <div className="design-art" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>
                    Illustrative layout · Your real{" "}
                    {page === "Approach" ? "practice imagery" : "project photography"} belongs here
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="demo-footer">
            Original L&L design concept <span>Branding, scope and launch tailored with you.</span>
          </div>
        </div>
      </div>
      <noscript>
        <p className="collection-fineprint">
          The initial design is shown here. Enable JavaScript to explore its pages and sample
          identities, or ask Tate to walk you through it.
        </p>
      </noscript>
    </div>
  );
}
