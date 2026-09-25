"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { WebsiteDesign } from "@/data/website-collection";

export default function DesignPreview({ design }: { design: WebsiteDesign }) {
  const [businessName, setBusinessName] = useState("");
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
  const pages = ["Home", "Services", ...(concept.theme === "still" ? [] : ["Projects"]), "Contact"];
  return (
    <div className="template-design-canvas">
      <div className="design-preview-toolbar">
        <label className="design-name-field" htmlFor={`${id}-business-name`}>
          Try your business name
          <input
            id={`${id}-business-name`}
            type="text"
            value={businessName}
            maxLength={64}
            placeholder={concept.brands[0]}
            autoComplete="off"
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </label>
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
        Sample design and illustrative imagery. Try the page buttons below; your real branding,
        services and photography replace these examples.
      </p>
      <div className={`design-preview-viewport ${screen === "phone" ? "is-phone" : ""}`}>
        <div className={`design-canvas design-theme-${concept.theme}`}>
          <div className="demo-header">
            <span className="demo-brand">
              {businessName.trim() || concept.brands[0]}
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
                    <p className="demo-kicker">{concept.kicker}</p>
                    <h3 ref={heading} id={`${id}-heading`} tabIndex={-1}>
                      {concept.headlines[0]}
                    </h3>
                    <p>{concept.subcopy}</p>
                    <button
                      type="button"
                      className="demo-button"
                      onClick={() => navigate(concept.theme === "still" ? "Services" : "Contact")}
                    >
                      {concept.action} <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                  <div className="demo-photo">
                    <Image
                      src={concept.photo.src}
                      alt={concept.photo.alt}
                      fill
                      sizes="(max-width: 699px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="demo-bottom-line">
                  {concept.services.map((service) => (
                    <span key={service.name}>{service.name}</span>
                  ))}
                </div>
                {concept.theme === "still" && (
                  <div className="demo-home-approach">
                    <h4>Care starts with listening.</h4>
                    <p>{concept.approach}</p>
                  </div>
                )}
              </>
            ) : page === "Services" ? (
              <>
                <p className="demo-kicker">Our services</p>
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
                        aria-label={`Enquire about ${service.name} in this sample`}
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
                    {concept.theme === "still"
                      ? "Have a question before your first visit? Tell us what you would like to know, and we can help you plan an appointment."
                      : "Tell us a little about the work you have in mind, where it is and when you would like to get started."}
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
                <p className="demo-kicker">A closer look</p>
                <h3 ref={heading} id={`${id}-heading`} tabIndex={-1}>
                  The details tell the story.
                </h3>
                <p className="demo-approach">{concept.approach}</p>
                <div className="demo-project-plate">
                  <Image
                    {...concept.photo}
                    alt={concept.photo.alt}
                    sizes="(max-width: 699px) 100vw, 60vw"
                  />
                  <span>
                    Illustrative sample image. Your approved project photography and descriptions
                    belong here.
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
          The initial design is shown here. Enable JavaScript to explore its pages and try your
          business name, or ask Tate to walk you through it.
        </p>
      </noscript>
    </div>
  );
}
