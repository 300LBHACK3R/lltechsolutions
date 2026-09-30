import Image from "next/image";
import Link from "next/link";
import type { ProfessionalTemplate } from "@/data/website-collection";
import { BookkeepingChecklist } from "@/components/collection/ProfessionalInteractions";

export default function ProfessionalHero({
  template,
  preview = false,
}: {
  template: ProfessionalTemplate;
  preview?: boolean;
}) {
  const Heading = preview ? "div" : "h1";
  const contact = template.pages.length === 1 ? "#contact" : "/contact";
  const copy = (
    <div className="pro-hero-copy">
      <p className="pro-kicker">{template.subbrand}</p>
      <Heading className="pro-headline" id={preview ? undefined : "professional-title"}>
        {template.headline}
        <em>{template.emphasis}</em>
      </Heading>
      <p className="pro-intro">{template.intro}</p>
      {preview ? (
        <span className="pro-button">Start a conversation ↗</span>
      ) : (
        <Link className="pro-button" href={contact}>
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
  if (template.theme === "avery")
    return (
      <section className="pro-hero pro-hero-avery">
        {copy}
        <div className="pro-orbit" aria-hidden="true">
          <span className="pro-orbit-ring" />
          <span className="pro-orbit-word">
            A fresh
            <br />
            perspective.
          </span>
          <span className="pro-orbit-dot" />
          <span className="pro-orbit-caption">IDEAS → CLARITY → ACTION</span>
        </div>
        <div className="pro-hero-foot">
          <span>Independent thinking.</span>
          <span>Practical direction.</span>
          <span>One conversation at a time.</span>
        </div>
      </section>
    );
  if (template.theme === "tally")
    return (
      <section className="pro-hero pro-hero-tally">
        {copy}
        <div className="pro-paper-stack">
          {preview ? (
            <div className="pro-checklist">
              <span className="pro-kicker">THE MONTH-END EDIT</span>
              <strong>
                A little order.
                <br />A lighter month.
              </strong>
              {["Gather the records", "Match the transactions", "Review the month"].map((label) => (
                <p key={label}>✓ {label}</p>
              ))}
              <span className="pro-mini-rule" />
            </div>
          ) : (
            <BookkeepingChecklist />
          )}
        </div>
      </section>
    );
  if (template.theme === "northline")
    return (
      <section className="pro-hero pro-hero-northline">
        <div className="pro-northline-title">
          {copy}
          <span className="pro-coordinate">N / CLEAR PERSPECTIVE</span>
        </div>
        <figure className="pro-hero-photo">
          <Image
            src={template.image}
            alt={preview ? "" : template.imageAlt}
            fill
            sizes={preview ? "(max-width: 699px) 100vw, 50vw" : "100vw"}
            loading={preview ? "lazy" : "eager"}
          />
          <figcaption>INFORMATION. CONTEXT. DIRECTION.</figcaption>
        </figure>
      </section>
    );
  if (template.theme === "offscript")
    return (
      <section className="pro-hero pro-hero-offscript">
        <div className="pro-offscript-banner">
          <span>INDEPENDENT MINDS.</span>
          <span>REAL-WORLD IDEAS.</span>
        </div>
        {copy}
        <div className="pro-offscript-art" aria-hidden="true">
          <span className="pro-idea-disc">
            WHAT
            <br />
            IF<span>↗</span>
          </span>
          <span className="pro-sticky-note">
            Less circling.
            <br />
            More starting.
          </span>
        </div>
        <div className="pro-offscript-rule">
          <span>01 / STRATEGY</span>
          <span>02 / STORY</span>
          <span>03 / NEXT MOVE</span>
        </div>
      </section>
    );
  if (template.theme === "vale")
    return (
      <section className="pro-hero pro-hero-vale">
        {copy}
        <figure className="pro-hero-photo">
          <Image
            src={template.image}
            alt={preview ? "" : template.imageAlt}
            fill
            sizes={preview ? "(max-width: 699px) 50vw, 25vw" : "(max-width: 760px) 100vw, 46vw"}
            loading={preview ? "lazy" : "eager"}
          />
          <figcaption>SPACE FOR A CONSIDERED CONVERSATION.</figcaption>
        </figure>
        <div className="pro-vale-seal" aria-hidden="true">
          V<span>&</span>R
        </div>
      </section>
    );
  return (
    <section className="pro-hero pro-hero-axiom">
      <Image
        className="pro-axiom-background"
        src={template.image}
        alt={preview ? "" : template.imageAlt}
        fill
        sizes={preview ? "(max-width: 699px) 100vw, 50vw" : "100vw"}
        loading={preview ? "lazy" : "eager"}
      />
      <div className="pro-axiom-grid" aria-hidden="true" />
      {copy}
      <div className="pro-axiom-caption">
        <span>A CLEARER PERSPECTIVE</span>
        <span>BUSINESS / PEOPLE / CHANGE</span>
      </div>
    </section>
  );
}
