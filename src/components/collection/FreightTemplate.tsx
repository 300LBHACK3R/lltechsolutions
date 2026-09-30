import Image from "next/image";
import Link from "next/link";
import type { TransportTemplate } from "@/data/website-collection";
import {
  TransportContact,
  TransportFooter,
  TransportHeader,
  TransportPageIntro,
} from "./TransportShared";
import { FreightIndustrySelector, FreightShipmentChecklist } from "./FreightInteractions";

type FreightProps = { template: TransportTemplate; page: string; enquiryHref: string };

function FreightRoute({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`fr-route ${compact ? "fr-route-compact" : ""}`}>
      <div className="fr-route-key">
        <span>CONNECTION STUDY / 01</span>
        <span aria-hidden="true">M ↗</span>
      </div>
      <svg
        viewBox="0 0 900 440"
        role="img"
        aria-label="Illustrative connected route from origin through two handovers to destination. This is a conceptual diagram, not geography or shipment tracking."
      >
        <defs>
          <pattern
            id={compact ? "fr-grid-compact" : "fr-grid-full"}
            width="45"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 45 0 L 0 0 0 44" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect
          width="900"
          height="440"
          fill={`url(#${compact ? "fr-grid-compact" : "fr-grid-full"})`}
          className="fr-route-grid"
        />
        <g className="fr-route-orbits" fill="none" stroke="currentColor">
          <ellipse cx="450" cy="225" rx="350" ry="164" />
          <ellipse cx="450" cy="225" rx="248" ry="164" />
          <ellipse cx="450" cy="225" rx="110" ry="164" />
          <path d="M100 225H800M165 125H735M165 325H735" />
        </g>
        <path
          className="fr-route-secondary"
          d="M125 290C230 310 210 120 340 145S610 360 770 140"
          fill="none"
        />
        <path
          className="fr-route-primary"
          d="M125 290C242 288 244 153 340 145S466 298 555 270S677 118 770 140"
          fill="none"
        />
        <g className="fr-route-nodes" fill="currentColor">
          <circle cx="125" cy="290" r="7" />
          <circle cx="340" cy="145" r="7" />
          <circle cx="555" cy="270" r="7" />
          <circle cx="770" cy="140" r="7" />
        </g>
        <g className="fr-route-labels" fill="currentColor">
          <text x="125" y="325" textAnchor="middle">
            ORIGIN
          </text>
          <text x="340" y="116" textAnchor="middle">
            HANDOVER 01
          </text>
          <text x="555" y="305" textAnchor="middle">
            HANDOVER 02
          </text>
          <text x="770" y="111" textAnchor="middle">
            DESTINATION
          </text>
        </g>
      </svg>
      <figcaption>
        <span>One shipment. Connected decisions.</span>
        <span>Illustrative route geometry — no real geography or live tracking.</span>
      </figcaption>
    </figure>
  );
}

function FreightSectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="fr-section-heading">
      <div>
        <p className="tl-kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function FreightServices({
  template,
  expanded = false,
}: {
  template: TransportTemplate;
  expanded?: boolean;
}) {
  return (
    <div className="fr-services-ledger">
      {template.services.map((service, index) => (
        <article key={service.name}>
          <span className="fr-ledger-index">0{index + 1}</span>
          <h3>{service.name}</h3>
          <div>
            <p>{service.description}</p>
            {expanded ? <p className="fr-ledger-detail">{service.detail}</p> : null}
          </div>
          {expanded ? (
            <Link
              href="/contact"
              aria-label={`Discuss ${service.name.toLowerCase()}`}
              className="fr-ledger-link"
            >
              ↗
            </Link>
          ) : (
            <span className="fr-ledger-symbol" aria-hidden="true">
              ↗
            </span>
          )}
        </article>
      ))}
    </div>
  );
}

function FreightConversation({
  title = "A clearer journey starts with a conversation.",
}: {
  title?: string;
}) {
  return (
    <section className="fr-conversation">
      <div className="tl-wrap">
        <span className="tl-kicker">The next move</span>
        <h2>{title}</h2>
        <Link href="/contact" className="tl-button">
          Discuss a shipment <span aria-hidden="true">↗</span>
        </Link>
        <p>Explore the sample enquiry experience.</p>
      </div>
      <span className="fr-conversation-mark" aria-hidden="true">
        ↗
      </span>
    </section>
  );
}

function FreightHome({ template }: { template: TransportTemplate }) {
  return (
    <>
      <section className="fr-home-hero">
        <div className="tl-wrap">
          <div className="fr-hero-topline">
            <p className="tl-kicker">Freight. Logistics. Perspective.</p>
            <span>Every connection counts.</span>
          </div>
          <h1>
            {template.headline}
            <em>{template.emphasis}</em>
          </h1>
          <div className="fr-hero-bottom">
            <p>{template.intro}</p>
            <Link href="/services" className="fr-text-link">
              Explore our services <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <figure className="fr-port-panorama">
          <Image src={template.image} alt={template.imageAlt} fill sizes="100vw" loading="eager" />
          <figcaption>
            <span>THE BIGGER PICTURE</span>
            <span>Illustrative port scene</span>
          </figcaption>
          <div className="fr-image-wordmark" aria-hidden="true">
            {template.brand}
            <span>↗</span>
          </div>
        </figure>
      </section>
      <section className="tl-wrap tl-section fr-home-intro">
        <p className="tl-kicker">A considered approach to movement</p>
        <div>
          <h2>
            See the whole journey.
            <br />
            <em>Mind every detail.</em>
          </h2>
          <p>
            Behind every movement is a sequence of decisions. The right questions at the start help
            connect the goods, the people and the next handover.
          </p>
          <Link href="/about" className="fr-text-link">
            The {template.brand} perspective <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="fr-services-section">
        <div className="tl-wrap tl-section">
          <FreightSectionHeading
            eyebrow="01 / Our services"
            title="Movement, thoughtfully connected."
            copy="A clear point of entry for the work ahead. Explore the service, then discuss the details that shape your shipment."
          />
          <FreightServices template={template} />
          <Link className="fr-text-link" href="/services">
            Explore the service details <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="tl-wrap tl-section">
        <FreightSectionHeading
          eyebrow="02 / Industry perspective"
          title="Different goods. Different questions."
          copy="The shape of a useful transport plan starts with understanding what matters to your business."
        />
        <FreightIndustrySelector />
      </section>
      <section className="fr-network-teaser">
        <div className="tl-wrap">
          <div className="fr-network-copy">
            <p className="tl-kicker">03 / The connected view</p>
            <h2>
              Look beyond
              <br />a single leg.
            </h2>
            <p>
              Origin, handover, destination. Consider the responsibilities between each point, as
              well as the movement itself.
            </p>
            <Link href="/network" className="fr-text-link">
              Explore the network approach <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <FreightRoute compact />
        </div>
      </section>
      <FreightConversation />
    </>
  );
}

function FreightServicesPage({ template }: { template: TransportTemplate }) {
  return (
    <>
      <TransportPageIntro
        eyebrow="01 / Services"
        title="The right plan. Every part of the journey."
        copy="A useful freight conversation starts with the goods, the route and the constraints. Explore the service areas, then bring the details into focus."
      />
      <section className="tl-wrap fr-services-page">
        <FreightServices template={template} expanded />
      </section>
      <section className="tl-wrap tl-section fr-service-brief">
        <div>
          <p className="tl-kicker">Before a plan is agreed</p>
          <h2>
            Define the brief.
            <br />
            <em>Then the movement.</em>
          </h2>
          <p>
            Service suitability, availability, timing and cost depend on the actual shipment. Start
            with an outline; agree the detailed scope with the provider before any movement is
            booked.
          </p>
          <Link href="/shipment-guide" className="fr-text-link">
            Prepare your shipment brief <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <dl>
          <div>
            <dt>01 / The goods</dt>
            <dd>What is moving, how it is packed and what it needs along the way.</dd>
          </div>
          <div>
            <dt>02 / The route</dt>
            <dd>Collection, destination and access at each end.</dd>
          </div>
          <div>
            <dt>03 / The responsibility</dt>
            <dd>Who arranges each stage, confirms the documents and receives the goods.</dd>
          </div>
          <div>
            <dt>04 / The timing</dt>
            <dd>The preferred dates, essential deadlines and dependencies to consider.</dd>
          </div>
        </dl>
      </section>
      <FreightConversation title="Let’s put the right questions on the table." />
    </>
  );
}

function FreightIndustriesPage() {
  return (
    <>
      <TransportPageIntro
        eyebrow="02 / Industries"
        title="Understand the goods. Understand the business."
        copy="The products may be different. The starting point is the same: listen carefully, understand the constraints and make the handovers clear."
      />
      <section className="tl-wrap fr-industries-page">
        <FreightIndustrySelector />
      </section>
      <section className="tl-wrap tl-section">
        <FreightSectionHeading
          eyebrow="Common ground"
          title="Three questions worth asking early."
        />
        <div className="fr-three-notes">
          <article>
            <span>01</span>
            <h3>What needs particular care?</h3>
            <p>
              Shape, packaging, handling or a receiving requirement can change the plan. Bring these
              details into the first discussion.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>What does the shipment connect?</h3>
            <p>
              A replenishment cycle, production step or project milestone gives the timing a
              practical context.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Who needs to know?</h3>
            <p>
              Agree the contacts and the information each party needs before the goods reach the
              next handover.
            </p>
          </article>
        </div>
      </section>
      <FreightConversation title="Start with your business. Build from there." />
    </>
  );
}

function FreightNetworkPage() {
  return (
    <>
      <TransportPageIntro
        eyebrow="03 / Network"
        title="The space between points is where the work happens."
        copy="A network is more than a collection of destinations. It is a plan for how each stage connects, who takes responsibility and how information moves with the goods."
      />
      <section className="tl-wrap fr-network-feature">
        <FreightRoute />
      </section>
      <section className="tl-wrap tl-section">
        <FreightSectionHeading
          eyebrow="A framework for coordination"
          title="Four points. One considered plan."
          copy="This conceptual journey explains the approach. Actual routes, partners and service coverage are confirmed against a specific enquiry."
        />
        <ol className="fr-network-stages">
          <li>
            <span>01 / Origin</span>
            <h3>Get the starting conditions right.</h3>
            <p>
              Confirm the goods, packaging, collection requirements and the information needed to
              begin.
            </p>
          </li>
          <li>
            <span>02 / Connection</span>
            <h3>Make the handover explicit.</h3>
            <p>
              Identify who is responsible for the next stage and what documentation and instructions
              travel with it.
            </p>
          </li>
          <li>
            <span>03 / Coordination</span>
            <h3>Keep changes in context.</h3>
            <p>
              Agree the point of contact and how exceptions or revised requirements should be
              discussed.
            </p>
          </li>
          <li>
            <span>04 / Destination</span>
            <h3>Plan for the receiving end.</h3>
            <p>
              Check access, unloading needs, receiving arrangements and the agreed form of
              completion.
            </p>
          </li>
        </ol>
      </section>
      <section className="fr-network-note">
        <div className="tl-wrap">
          <p className="tl-kicker">Coverage begins with a question</p>
          <h2>
            Where does your
            <br />
            next movement lead?
          </h2>
          <p>
            Share the general origin, destination and shipment type in the sample enquiry. This
            demonstration does not advertise real offices, partner locations or active transport
            lanes.
          </p>
          <Link href="/contact" className="tl-button">
            Explore the enquiry form <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function FreightGuidePage() {
  return (
    <>
      <TransportPageIntro
        eyebrow="04 / Shipment guide"
        title="A well-prepared brief makes a better beginning."
        copy="A little clarity before the first conversation helps surface the right questions. Use this guide to collect the general information a provider may need."
      />
      <div className="tl-wrap fr-guide-page">
        <FreightShipmentChecklist />
      </div>
      <section className="tl-wrap tl-section fr-guide-notes">
        <div>
          <p className="tl-kicker">Make room for the details</p>
          <h2>Some goods need a closer conversation.</h2>
          <p>
            Tell the provider early about unusual dimensions, time-sensitive requirements or any
            special handling. They can confirm whether the service is suitable and what further
            review is needed.
          </p>
        </div>
        <div className="fr-guide-faqs">
          <details>
            <summary>
              What if I do not have every detail yet?<span aria-hidden="true">+</span>
            </summary>
            <p>
              Begin with what you know and identify what still needs confirmation. The preparation
              list is a conversation guide, not a booking requirement or a quotation.
            </p>
          </details>
          <details>
            <summary>
              Does this list confirm a shipment is ready?<span aria-hidden="true">+</span>
            </summary>
            <p>
              No. Your transport provider must confirm the packaging, documentation, handling and
              other requirements that apply to the actual goods and route.
            </p>
          </details>
          <details>
            <summary>
              Where should I share shipment documents?<span aria-hidden="true">+</span>
            </summary>
            <p>
              Use the secure channel agreed with your provider. This sample website does not accept
              shipment documents, commercial records or sensitive cargo information.
            </p>
          </details>
          <details>
            <summary>
              Can I request a price through this demonstration?<span aria-hidden="true">+</span>
            </summary>
            <p>
              The sample enquiry demonstrates the website experience only. It does not deliver a
              message, calculate freight rates or book transport.
            </p>
          </details>
        </div>
      </section>
      <FreightConversation title="Ready for the first conversation?" />
    </>
  );
}

function FreightAboutPage({ template }: { template: TransportTemplate }) {
  return (
    <>
      <TransportPageIntro
        eyebrow={`05 / About ${template.brand}`}
        title="A wider perspective. A closer attention to detail."
        copy={template.about}
      />
      <section className="fr-about-statement">
        <div className="tl-wrap">
          <span className="fr-statement-mark" aria-hidden="true">
            {template.brand.slice(0, 1)}↗
          </span>
          <div>
            <p className="tl-kicker">Our perspective</p>
            <h2>
              Good logistics starts
              <br />
              with good questions.
            </h2>
            <p>
              What are the goods? What needs to happen at the other end? Which details are fixed,
              and which still need a decision? Looking at the whole journey gives the small details
              their proper place.
            </p>
            <p>
              {template.brand} is a fictional freight and logistics brand created to demonstrate a
              considered business website. The philosophy here shows how a real operator could
              explain its approach in its own words.
            </p>
          </div>
        </div>
      </section>
      <section className="tl-wrap tl-section">
        <FreightSectionHeading
          eyebrow="The working principles"
          title="Clarity is a practical advantage."
        />
        <div className="fr-principles">
          <article>
            <span>01 / Listen first</span>
            <h3>Understand before arranging.</h3>
            <p>
              The first conversation should reveal the shipment’s purpose, constraints and
              dependencies. A familiar service label never replaces a useful brief.
            </p>
          </article>
          <article>
            <span>02 / Join the details</span>
            <h3>Think in connected stages.</h3>
            <p>
              A loading requirement affects the collection plan. A receiving window shapes the
              schedule. Each decision belongs in the context of the next.
            </p>
          </article>
          <article>
            <span>03 / Make it clear</span>
            <h3>Put responsibilities into words.</h3>
            <p>
              Explain what is included, what needs confirmation and who is responsible. A plan
              becomes more useful when each party knows its part.
            </p>
          </article>
          <article>
            <span>04 / Stay considered</span>
            <h3>Give change a clear next step.</h3>
            <p>
              Requirements can evolve. Establish a way to discuss changes, review their implications
              and agree what happens next.
            </p>
          </article>
        </div>
      </section>
      <section className="fr-process-band">
        <div className="tl-wrap tl-section">
          <FreightSectionHeading
            eyebrow="From the first conversation"
            title="A deliberate sequence."
            copy="A simple framework for a real provider to adapt to its own operating process."
          />
          <ol>
            <li>
              <span>BRIEF</span>
              <strong>Listen & define</strong>
              <p>Understand the goods, route, timing and known constraints.</p>
            </li>
            <li>
              <span>REVIEW</span>
              <strong>Assess & clarify</strong>
              <p>Identify missing information, suitability and possible dependencies.</p>
            </li>
            <li>
              <span>AGREE</span>
              <strong>Scope & confirm</strong>
              <p>Set out responsibilities, arrangements and the terms of the work.</p>
            </li>
            <li>
              <span>CONNECT</span>
              <strong>Coordinate & communicate</strong>
              <p>Follow the agreed process and make the next handover clear.</p>
            </li>
          </ol>
        </div>
      </section>
      <FreightConversation title="Bring us the bigger picture." />
    </>
  );
}

export function FreightTemplate({ template, page, enquiryHref }: FreightProps) {
  const currentPage = page.trim().toLowerCase().replaceAll(" ", "-") || "home";
  return (
    <div className="tl-site tl-theme-freight-logistics">
      <TransportHeader template={template} page={currentPage.replaceAll("-", " ")} />
      {currentPage === "home" ? (
        <FreightHome template={template} />
      ) : currentPage === "services" ? (
        <FreightServicesPage template={template} />
      ) : currentPage === "industries" ? (
        <FreightIndustriesPage />
      ) : currentPage === "network" ? (
        <FreightNetworkPage />
      ) : currentPage === "shipment-guide" ? (
        <FreightGuidePage />
      ) : currentPage === "about" ? (
        <FreightAboutPage template={template} />
      ) : (
        <>
          <TransportPageIntro
            eyebrow="06 / Contact"
            title="Let’s start with the bigger picture."
            copy="Explore how a focused enquiry can open a useful conversation. Use sample details in this demonstration; no freight request is sent or booked."
          />
          <TransportContact template={template} enquiryHref={enquiryHref} />
        </>
      )}
      <TransportFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}

export default FreightTemplate;
