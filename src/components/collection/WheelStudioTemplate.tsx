import Image from "next/image";
import Link from "next/link";
import { retailPagePath, type RetailTemplate } from "@/data/website-collection";
import { WheelFinishStudio } from "./RetailPremiumInteractions";
import { RetailContact, RetailFooter, RetailHeader, RetailPageIntro } from "./RetailShared";

type WheelProps = { template: RetailTemplate; page?: string; enquiryHref: string };

function WheelPhoto({
  template,
  className = "",
}: {
  template: RetailTemplate;
  className?: string;
}) {
  return (
    <figure className={`axis-photo ${className}`}>
      <Image
        src={template.image}
        alt={template.imageAlt}
        fill
        sizes="(max-width: 760px) 100vw, 60vw"
      />
      <figcaption>AXIS WORKS / A study in surface & structure</figcaption>
    </figure>
  );
}

function AxisNext({ title = "The detail starts with a conversation." }: { title?: string }) {
  return (
    <section className="axis-next retail-wrap">
      <p className="axis-eyebrow">Your next direction</p>
      <h2>{title}</h2>
      <Link className="axis-link" href={retailPagePath("Contact")}>
        Talk to the studio <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

function WheelHome({ template }: { template: RetailTemplate }) {
  return (
    <>
      <section className="axis-hero retail-wrap">
        <div className="axis-hero-copy">
          <p className="axis-eyebrow">Independent wheel & finish studio</p>
          <h1>
            {template.headline}
            <em>{template.emphasis}</em>
          </h1>
          <p className="axis-hero-description">{template.intro}</p>
          <Link className="axis-link" href={retailPagePath("Wheels")}>
            Explore the wheel studio <span aria-hidden="true">↗</span>
          </Link>
          <div className="axis-hero-index">
            <span>01 — Form</span>
            <span>02 — Finish</span>
            <span>03 — Fitment</span>
          </div>
        </div>
        <WheelFinishStudio />
      </section>
      <div className="axis-rule-band">
        <div className="retail-wrap">
          <span>Consider every angle.</span>
          <span>Question every detail.</span>
          <span>
            Find your direction. <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
      <section className="axis-editorial retail-wrap">
        <div className="axis-editorial-heading">
          <p className="axis-eyebrow">01 / The studio approach</p>
          <h2>
            A wheel is
            <br />
            more than
            <br />
            <em>its silhouette.</em>
          </h2>
        </div>
        <WheelPhoto template={template} />
        <div className="axis-editorial-body">
          <span className="axis-plus" aria-hidden="true">
            +
          </span>
          <p>
            Proportion. Surface. The space between the spokes. Small decisions change how the whole
            vehicle feels.
          </p>
          <p>{template.about}</p>
          <Link className="axis-link" href={retailPagePath("Services")}>
            Inside the process <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="axis-home-services retail-wrap">
        <div>
          <p className="axis-eyebrow">02 / What we explore</p>
          <h2>
            Built around
            <br />
            <em>the details.</em>
          </h2>
        </div>
        <div className="axis-service-list">
          {template.services.slice(0, 3).map((service, index) => (
            <Link href={retailPagePath("Services")} key={service.name}>
              <span className="axis-index">0{index + 1}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="axis-fitment-band">
        <div className="retail-wrap">
          <p className="axis-eyebrow">03 / Fitment comes first</p>
          <h2>
            The right questions.
            <br />
            <em>Before the right wheel.</em>
          </h2>
          <div>
            <p>
              A strong visual direction is only the beginning. Vehicle details, wheel specifications
              and professional checks belong in the same conversation.
            </p>
            <Link className="axis-link" href={retailPagePath("Fitment")}>
              Prepare your fitment enquiry <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <AxisNext />
    </>
  );
}

function WheelsPage({ template }: { template: RetailTemplate }) {
  return (
    <>
      <RetailPageIntro
        eyebrow="01 / The wheel studio"
        title="An exercise in form & finish."
        description="Start with a visual direction. Explore the interactive surface study, then bring your vehicle details into the conversation."
      />
      <section className="axis-wheels-lab retail-wrap">
        <div className="axis-lab-notes">
          <p className="axis-eyebrow">The finish bench</p>
          <h2>
            Same form.
            <br />
            <em>Another character.</em>
          </h2>
          <p>
            Graphite brings depth. Silver catches the edges. Bronze gives the geometry warmth.
            Change the finish to see how light reshapes one illustrated design.
          </p>
          <dl>
            <div>
              <dt>Object</dt>
              <dd>Split-spoke concept</dd>
            </div>
            <div>
              <dt>View</dt>
              <dd>Front elevation</dd>
            </div>
            <div>
              <dt>Purpose</dt>
              <dd>Visual exploration</dd>
            </div>
          </dl>
          <p className="axis-fine-print">
            This study has no dimensions, price or vehicle compatibility. Actual specifications and
            finish options require confirmation.
          </p>
        </div>
        <WheelFinishStudio compact />
      </section>
      <section className="axis-directions retail-wrap">
        <div className="axis-section-heading">
          <p className="axis-eyebrow">A starting point for the conversation</p>
          <h2>
            Find a <em>direction.</em>
          </h2>
          <p>
            Illustrative wheel concepts. These show a collection layout, with no live stock or
            purchase function.
          </p>
        </div>
        <div className="axis-direction-list">
          {template.items.map((item, index) => (
            <article key={item.name}>
              <span className="axis-direction-number">0{index + 1}</span>
              <div>
                <p className="axis-eyebrow">{item.category}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="axis-direction-tail">
                <span>{item.price}</span>
                <Link className="axis-link" href={retailPagePath("Contact")}>
                  Discuss this direction <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="axis-note retail-wrap">
        <span aria-hidden="true">↗</span>
        <p>
          Love a finish? Bring that reference. Before recommending a real wheel, a specialist needs
          to review the vehicle, specifications and intended use.
        </p>
        <Link className="axis-link" href={retailPagePath("Fitment")}>
          The fitment checklist
        </Link>
      </div>
      <AxisNext title="Bring a reference. Leave room for possibility." />
    </>
  );
}

function WheelServices({ template }: { template: RetailTemplate }) {
  return (
    <>
      <RetailPageIntro
        eyebrow="02 / Studio services"
        title="A considered process. From every angle."
        description="A wheel conversation begins with the vehicle and the way it is used. The details of any real service are confirmed after an assessment."
      />
      <section className="axis-services-page retail-wrap">
        <WheelPhoto template={template} />
        <div className="axis-service-chapters">
          {template.services.map((service, index) => (
            <article key={service.name}>
              <span className="axis-index">0{index + 1}</span>
              <div>
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <p className="axis-service-detail">{service.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="axis-process retail-wrap">
        <p className="axis-eyebrow">How a studio enquiry unfolds</p>
        <h2>
          Measure twice.
          <br />
          <em>Decide with clarity.</em>
        </h2>
        <ol>
          <li>
            <span>01 / Context</span>
            <h3>Start with the car.</h3>
            <p>
              Year, make, model, trim, current wheel details and any modifications set the starting
              point.
            </p>
          </li>
          <li>
            <span>02 / Direction</span>
            <h3>Set the intention.</h3>
            <p>
              Share your preferred finish, visual references, everyday use and the budget you have
              in mind.
            </p>
          </li>
          <li>
            <span>03 / Review</span>
            <h3>Confirm the details.</h3>
            <p>
              A professional assessment would establish suitability, work required, pricing and
              timing before proceeding.
            </p>
          </li>
        </ol>
      </section>
      <AxisNext title="A good result begins with good information." />
    </>
  );
}

const fitmentQuestions = [
  {
    number: "01",
    title: "The vehicle",
    text: "Year, make, model and trim. Include any changes to suspension, brakes or bodywork, plus the vehicle’s intended use.",
    hint: "Context before compatibility",
  },
  {
    number: "02",
    title: "The current setup",
    text: "Existing wheel diameter, width, offset and bolt pattern if known, together with the tyre size. If you are unsure, say so; do not guess.",
    hint: "Record what you know",
  },
  {
    number: "03",
    title: "The direction",
    text: "The look you are considering, finish references, budget and any concerns about the current setup. A reference photo helps explain a visual preference.",
    hint: "Preference is a starting point",
  },
  {
    number: "04",
    title: "The professional check",
    text: "Load requirements, brake and suspension clearance, centre bore, tyre suitability and other fitment requirements need verification by a qualified professional.",
    hint: "Assessment before a recommendation",
  },
];

function WheelFitment() {
  return (
    <>
      <RetailPageIntro
        eyebrow="03 / Fitment notes"
        title="Good fitment starts with the right questions."
        description="A preparation guide for a wheel enquiry. This is not a compatibility checker, sizing calculator or substitute for professional assessment."
      />
      <section className="axis-fitment-page retail-wrap">
        <aside className="axis-fitment-sidebar">
          <div className="axis-crosshair" aria-hidden="true">
            <span />
            <span />
            <i />
          </div>
          <p className="axis-eyebrow">The information to bring</p>
          <h2>
            Know the car.
            <br />
            <em>Then the wheel.</em>
          </h2>
          <p>
            A wheel can look right and still be unsuitable. Visual preference and technical
            suitability are separate parts of the decision.
          </p>
          <a className="axis-link" href="#fitment-checklist">
            Read the checklist <span aria-hidden="true">↓</span>
          </a>
        </aside>
        <ol className="axis-checklist" id="fitment-checklist">
          {fitmentQuestions.map((question) => (
            <li key={question.number}>
              <span className="axis-index">{question.number}</span>
              <div>
                <p className="axis-eyebrow">{question.hint}</p>
                <h2>{question.title}</h2>
                <p>{question.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="axis-fitment-bottom retail-wrap">
        <div>
          <p className="axis-eyebrow">Before the enquiry</p>
          <h2>
            No numbers?
            <br />
            <em>No guessing.</em>
          </h2>
        </div>
        <div>
          <p>
            Bring the information you have. A real studio can explain what needs to be measured or
            checked and arrange an appropriate assessment.
          </p>
          <p>
            This demonstration has no vehicle database and provides no approval of a wheel, tyre or
            modification. The sample enquiry form does not accept attachments or confirm a booking.
          </p>
          <Link className="axis-link" href={retailPagePath("Contact")}>
            Explore the enquiry form <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default function WheelStudioTemplate({ template, page = "home", enquiryHref }: WheelProps) {
  return (
    <div className={`retail-site retail-theme-${template.id}`}>
      <RetailHeader template={template} page={page} />
      {page === "home" ? (
        <WheelHome template={template} />
      ) : page === "wheels" ? (
        <WheelsPage template={template} />
      ) : page === "services" ? (
        <WheelServices template={template} />
      ) : page === "fitment" ? (
        <WheelFitment />
      ) : (
        <>
          <RetailPageIntro
            eyebrow="04 / Contact the studio"
            title="Let’s get into the details."
            description="A visual reference. A vehicle in mind. A question about the process. Start a conversation using this local enquiry preview."
          />
          <div className="axis-contact-note retail-wrap">
            <span className="axis-index">AX / ENQUIRY</span>
            <p>
              For a real wheel enquiry, start with the year, make, model and trim. Keep personal
              documents, payment details and vehicle identifiers out of this sample form.
            </p>
          </div>
          <RetailContact template={template} enquiryHref={enquiryHref} />
        </>
      )}
      <RetailFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
