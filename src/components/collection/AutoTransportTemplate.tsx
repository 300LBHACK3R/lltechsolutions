import Image from "next/image";
import Link from "next/link";
import type { TransportTemplate } from "@/data/website-collection";
import {
  TransportContact,
  TransportFooter,
  TransportHeader,
  TransportPageIntro,
} from "@/components/collection/TransportShared";
import { VehiclePlanningSelector } from "@/components/collection/TransportEquipmentInteractions";

type Props = { template: TransportTemplate; page: string; enquiryHref: string };

const journeySteps = [
  {
    title: "Tell us the move.",
    text: "Start with the vehicle, its condition and the pickup and delivery areas.",
    detail:
      "Include your preferred timing and any access restrictions. A useful first conversation starts with the practical details.",
  },
  {
    title: "Agree the details.",
    text: "Discuss transport options, access, timing and the proposed scope directly.",
    detail:
      "The business confirms the written quote, collection arrangements and terms before you decide how to proceed.",
  },
  {
    title: "Prepare the handoff.",
    text: "Follow the agreed preparation instructions and document the vehicle’s condition.",
    detail:
      "Arrange the authorised contact at each end, prepare keys and documents, and confirm any personal-item restrictions with the transporter.",
  },
  {
    title: "Meet at the other end.",
    text: "Review the vehicle at delivery and complete the agreed handover.",
    detail:
      "Keep the receiving contact available and raise any questions through the contact procedure agreed with the business.",
  },
] as const;

function Journey({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className={`ov-journey${detailed ? " ov-journey-detailed" : ""}`}>
      {journeySteps.map((step, index) => (
        <li key={step.title}>
          <span className="ov-step-number">0{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          {detailed ? <p className="ov-step-detail">{step.detail}</p> : null}
        </li>
      ))}
    </ol>
  );
}

function AutoServices({
  template,
  expanded = false,
}: {
  template: TransportTemplate;
  expanded?: boolean;
}) {
  return (
    <div className="ov-service-list">
      {template.services.map((service, index) => (
        <article key={service.name}>
          <span className="ov-service-index">0{index + 1}</span>
          <h3>{service.name}</h3>
          <div>
            <p>{service.description}</p>
            {expanded ? <p>{service.detail}</p> : null}
          </div>
          <span aria-hidden="true" className="ov-service-arrow">
            ↗
          </span>
        </article>
      ))}
    </div>
  );
}

function AutoNextStep() {
  return (
    <section className="ov-next-step tl-wrap">
      <p className="tl-kicker">The next move</p>
      <div>
        <h2>
          Let’s talk
          <br />
          about the road ahead.
        </h2>
        <Link className="tl-button" href="/contact">
          Plan your transport <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}

function AutoHome({ template }: { template: TransportTemplate }) {
  return (
    <>
      <section className="ov-hero">
        <Image src={template.image} alt={template.imageAlt} fill sizes="100vw" priority />
        <div className="ov-hero-shade" />
        <div className="ov-hero-copy tl-wrap">
          <p className="tl-kicker">Vehicle transport / A considered move</p>
          <h1>
            {template.headline}
            <br />
            <span>{template.emphasis}</span>
          </h1>
          <div className="ov-hero-bottom">
            <p>{template.intro}</p>
            <Link className="tl-button" href="/transport">
              Explore transport <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="ov-route-strip">
          <div>
            <span>01 / Departure</span>
            <strong>Where it begins</strong>
          </div>
          <span className="ov-route-line" aria-hidden="true">
            <i />
            <i />
          </span>
          <div>
            <span>02 / Destination</span>
            <strong>Where it belongs</strong>
          </div>
          <p>
            Every move starts
            <br />
            with the right details.
          </p>
        </div>
      </section>
      <section className="tl-wrap tl-section ov-introduction">
        <p className="tl-kicker">Built around the vehicle</p>
        <div>
          <h2>
            A personal move.
            <br />A practical plan.
          </h2>
          <p>
            Across a change of address, a new purchase or a business transfer, good transport
            planning begins with understanding what matters at both ends of the journey.
          </p>
        </div>
      </section>
      <section className="tl-wrap ov-services-section" aria-label="Transport services">
        <AutoServices template={template} />
        <Link className="ov-text-link" href="/transport">
          Find your transport approach <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <section className="ov-planning-section">
        <div className="tl-wrap tl-section">
          <div className="ov-section-head">
            <p className="tl-kicker">A little preparation</p>
            <h2>
              What are
              <br />
              you moving?
            </h2>
          </div>
          <VehiclePlanningSelector />
        </div>
      </section>
      <section className="tl-wrap tl-section">
        <div className="ov-section-head">
          <p className="tl-kicker">From first conversation to handoff</p>
          <h2>
            The route,
            <br />
            made clear.
          </h2>
        </div>
        <Journey />
        <Link className="ov-text-link" href="/how-it-works">
          Walk through the process <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <AutoNextStep />
    </>
  );
}

function TransportPage({ template }: { template: TransportTemplate }) {
  return (
    <>
      <TransportPageIntro
        eyebrow="Transport / Built around the move"
        title="Different vehicles. One considered approach."
        copy="The route matters. So do the vehicle, the access and the people handing it over. Start with the kind of move you have in mind."
      />
      <section className="tl-wrap ov-services-section">
        <AutoServices template={template} expanded />
      </section>
      <section className="ov-transport-photo">
        <Image src={template.image} alt={template.imageAlt} fill sizes="100vw" />
        <p>
          Every vehicle
          <br />
          <span>has a next chapter.</span>
        </p>
      </section>
      <section className="tl-wrap tl-section">
        <div className="ov-section-head">
          <p className="tl-kicker">Prepare for a conversation</p>
          <h2>
            The details
            <br />
            that move it forward.
          </h2>
        </div>
        <VehiclePlanningSelector />
        <div className="ov-access-note">
          <h3>A note on access.</h3>
          <p>
            Collection and delivery locations need enough suitable space for the proposed transport
            arrangement. Share narrow streets, restricted entry, height limits or other access
            considerations before a route is agreed.
          </p>
        </div>
      </section>
      <AutoNextStep />
    </>
  );
}

function HowItWorksPage() {
  return (
    <>
      <TransportPageIntro
        eyebrow="How it works / A clear sequence"
        title="From here. To what’s next."
        copy="A vehicle move is easier to understand when each handoff has a plan. Here is the conversation, preparation and delivery journey this design helps explain."
      />
      <section className="tl-wrap ov-process-page">
        <Journey detailed />
      </section>
      <section className="ov-planning-section">
        <div className="tl-wrap tl-section ov-preparation">
          <div>
            <p className="tl-kicker">Before collection</p>
            <h2>
              Ready for
              <br />
              the road ahead.
            </h2>
            <p>
              The live transport business supplies its own preparation requirements. Use these
              topics to guide that conversation.
            </p>
          </div>
          <div className="ov-questions">
            <details open>
              <summary>
                Vehicle condition <span aria-hidden="true">+</span>
              </summary>
              <p>
                Explain whether the vehicle starts, steers and brakes, and disclose modifications or
                damage that could affect loading. Agree how its condition will be recorded at
                collection and delivery.
              </p>
            </details>
            <details>
              <summary>
                Keys, documents & personal items <span aria-hidden="true">+</span>
              </summary>
              <p>
                Confirm which keys and documents are required, what may remain in the vehicle, and
                the transporter’s instructions for fuel, alarms and accessories.
              </p>
            </details>
            <details>
              <summary>
                Access & handover contacts <span aria-hidden="true">+</span>
              </summary>
              <p>
                Agree who can release and receive the vehicle. Share access constraints at both
                locations and confirm how any collection or delivery changes will be communicated.
              </p>
            </details>
            <details>
              <summary>
                Quote, terms & timing <span aria-hidden="true">+</span>
              </summary>
              <p>
                Review the proposed scope, written price, timing, payment terms and cover
                information directly with the business. This demonstration does not issue quotes or
                confirm transport arrangements.
              </p>
            </details>
          </div>
        </div>
      </section>
      <AutoNextStep />
    </>
  );
}

export default function AutoTransportTemplate({ template, page, enquiryHref }: Props) {
  return (
    <div className="tl-site tl-theme-auto-transport">
      <TransportHeader template={template} page={page} />
      {page === "Home" ? (
        <AutoHome template={template} />
      ) : page === "Transport" ? (
        <TransportPage template={template} />
      ) : page === "How it works" ? (
        <HowItWorksPage />
      ) : (
        <>
          <TransportPageIntro
            eyebrow="Contact / Your next move"
            title="Start with a conversation."
            copy="Have the vehicle details, pickup and delivery areas, and preferred timing ready. The right starting information helps a transport business explain the next step."
          />
          <div className="tl-wrap ov-contact-prelude">
            <span>Vehicle & condition</span>
            <span>Pickup & delivery areas</span>
            <span>Preferred timing</span>
          </div>
          <TransportContact template={template} enquiryHref={enquiryHref} />
        </>
      )}
      <TransportFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
