import Image from "next/image";
import Link from "next/link";
import type { TransportTemplate } from "@/data/website-collection";
import { ColdChainHandlingSelector } from "./ColdChainInteractions";
import {
  TransportContact,
  TransportFooter,
  TransportHeader,
  TransportPageIntro,
} from "./TransportShared";

type ColdChainProps = { template: TransportTemplate; page: string; enquiryHref: string };

const handlingSteps = [
  {
    title: "Define the brief",
    copy: "Confirm the goods, the shipper’s handling requirements and both ends of the journey.",
  },
  {
    title: "Agree the plan",
    copy: "Review suitability, access, loading arrangements and the proposed collection window.",
  },
  {
    title: "Prepare the handover",
    copy: "Identify the receiving contact, unloading instructions and the process for exceptions.",
  },
  {
    title: "Close the loop",
    copy: "Agree the records and handover information needed to complete the consignment.",
  },
];

function ColdChainFlow({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`cold-flow${compact ? " cold-flow-compact" : ""}`}>
      {handlingSteps.map((step, index) => (
        <li key={step.title}>
          <span className="cold-flow-number">0{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </li>
      ))}
    </ol>
  );
}

function ColdServiceCards({
  template,
  expanded = false,
}: {
  template: TransportTemplate;
  expanded?: boolean;
}) {
  return (
    <div className={`cold-services${expanded ? " cold-services-expanded" : ""}`}>
      {template.services.map((service, index) => (
        <article key={service.name}>
          <div className="cold-service-top">
            <span>0{index + 1}</span>
            <svg viewBox="0 0 36 36" width="36" height="36" fill="none" aria-hidden="true">
              <path
                d="M18 3v30M5 10.5l26 15M5 25.5l26-15M12 6l6 5 6-5M12 30l6-5 6 5M5 17l7-2-1-8M31 19l-7 2 1 8M5 19l7 2-1 8M31 17l-7-2 1-8"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </div>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          {expanded ? <p className="cold-service-detail">{service.detail}</p> : null}
          <Link href={expanded ? "/contact" : "/services"}>
            {expanded ? "Discuss this service" : `Explore ${service.name.toLowerCase()}`}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}

function ColdNextStep({ title = "The details make the difference." }: { title?: string }) {
  return (
    <section className="tl-section cold-next">
      <div className="tl-wrap tl-split">
        <div>
          <p className="tl-kicker">A clear starting point</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>
            Begin with the goods, the route and the required handling. Explore how an initial
            enquiry brings those details together.
          </p>
          <Link className="tl-button" href="/contact">
            Discuss a consignment <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ColdHome({ template }: { template: TransportTemplate }) {
  return (
    <>
      <section className="cold-hero tl-wrap">
        <div className="cold-hero-copy">
          <p className="tl-kicker">
            <span className="cold-kicker-mark" aria-hidden="true" /> Refrigerated transport /
            considered at every step
          </p>
          <h1>
            {template.headline}
            <span>{template.emphasis}</span>
          </h1>
          <p className="cold-hero-intro">{template.intro}</p>
          <div className="cold-hero-actions">
            <Link className="tl-button" href="/contact">
              {template.cta} <span aria-hidden="true">↗</span>
            </Link>
            <Link className="cold-text-link" href="/handling">
              Our handling approach <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="cold-hero-facts" aria-label="Planning priorities">
            <div>
              <span>01 / PRODUCT</span>
              <strong>Know the requirements.</strong>
            </div>
            <div>
              <span>02 / JOURNEY</span>
              <strong>Plan the handovers.</strong>
            </div>
          </div>
        </div>
        <figure className="cold-hero-image">
          <Image
            src={template.image}
            alt={template.imageAlt}
            fill
            sizes="(max-width: 800px) 100vw, 48vw"
            loading="eager"
          />
          <div className="cold-photo-cross cold-photo-cross-top" aria-hidden="true">
            +
          </div>
          <div className="cold-photo-cross cold-photo-cross-bottom" aria-hidden="true">
            +
          </div>
          <figcaption>
            <span>{template.brand} / TRANSPORT STUDY</span>
            <span>Illustrative image</span>
          </figcaption>
        </figure>
        <div className="cold-hero-label">
          <span>PRODUCT. PROCESS. PEOPLE.</span>
          <span>
            Every handover matters <span aria-hidden="true">↘</span>
          </span>
        </div>
      </section>
      <section className="tl-section cold-service-section">
        <div className="tl-wrap">
          <div className="cold-section-heading">
            <div>
              <p className="tl-kicker">The service brief</p>
              <h2>
                Care starts before
                <br />
                the journey does.
              </h2>
            </div>
            <p>
              Different goods bring different requirements. Make the handling brief the starting
              point for every conversation.
            </p>
          </div>
          <ColdServiceCards template={template} />
        </div>
      </section>
      <section className="tl-section cold-home-process">
        <div className="tl-wrap">
          <div className="cold-section-heading">
            <div>
              <p className="tl-kicker">A connected process</p>
              <h2>
                One plan.
                <br />
                Every handover.
              </h2>
            </div>
            <div>
              <p>Follow an illustrative journey from first brief to final handover.</p>
              <Link className="cold-text-link" href="/handling">
                Inside the handling approach <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <ColdChainFlow compact />
        </div>
      </section>
      <ColdNextStep />
    </>
  );
}

function ColdServices({ template }: { template: TransportTemplate }) {
  return (
    <>
      <TransportPageIntro
        eyebrow={`${template.brand} / SERVICES`}
        title="The right brief for every consignment."
        copy="A considered service starts with the product, its handling needs and a realistic plan for both ends of the journey."
      />
      <section className="tl-section">
        <div className="tl-wrap">
          <ColdServiceCards template={template} expanded />
        </div>
      </section>
      <section className="tl-section cold-service-scope">
        <div className="tl-wrap tl-split">
          <div>
            <p className="tl-kicker">Before an arrangement is agreed</p>
            <h2>
              Get the specifics
              <br />
              on the table.
            </h2>
          </div>
          <div>
            <p>
              Start with the goods description, collection and delivery areas, proposed timing, load
              size and required handling conditions.
            </p>
            <p>
              Equipment suitability, route availability, records, any special handling and the final
              scope must be confirmed with the transport provider.
            </p>
            <Link className="cold-text-link" href="/handling">
              Explore the handling brief <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <ColdNextStep title="Every product has a different brief." />
    </>
  );
}

function ColdHandling({ template }: { template: TransportTemplate }) {
  return (
    <>
      <TransportPageIntro
        eyebrow={`${template.brand} / HANDLING`}
        title="The handover is part of the journey."
        copy="An organised brief connects product requirements, loading arrangements and the people receiving the goods."
      />
      <section className="tl-section cold-handling-section">
        <div className="tl-wrap">
          <ColdChainHandlingSelector />
        </div>
      </section>
      <section className="tl-section cold-handling-process">
        <div className="tl-wrap">
          <div className="cold-section-heading">
            <div>
              <p className="tl-kicker">An example workflow</p>
              <h2>
                Clarity at
                <br />
                each connection.
              </h2>
            </div>
            <p>
              This process shows the information a transport conversation can cover. It is an
              illustrative sequence, not a live monitoring or shipment status display.
            </p>
          </div>
          <ColdChainFlow />
        </div>
      </section>
      <section className="tl-section">
        <div className="tl-wrap tl-split">
          <div>
            <p className="tl-kicker">Useful questions</p>
            <h2>Before the wheels move.</h2>
          </div>
          <div className="cold-questions">
            <details>
              <summary>
                Who defines the required conditions?<span aria-hidden="true">+</span>
              </summary>
              <p>
                The shipper supplies the product requirements. The transport provider reviews the
                brief and confirms the arrangements it can offer before accepting the consignment.
              </p>
            </details>
            <details>
              <summary>
                What happens if requirements differ?<span aria-hidden="true">+</span>
              </summary>
              <p>
                Describe each product separately. Compatibility, segregation and any need for
                separate transport must be reviewed as part of the proposed service.
              </p>
            </details>
            <details>
              <summary>
                Does this website monitor a shipment?<span aria-hidden="true">+</span>
              </summary>
              <p>
                No. This is a fictional website demonstration. The handling selector is a local
                guide; it does not collect live data, monitor conditions or arrange transport.
              </p>
            </details>
          </div>
        </div>
      </section>
      <ColdNextStep />
    </>
  );
}

function ColdCoverage({ template }: { template: TransportTemplate }) {
  return (
    <>
      <TransportPageIntro
        eyebrow={`${template.brand} / COVERAGE`}
        title="A route begins with two clear endpoints."
        copy="Collection and delivery details help shape the conversation. The service patterns below are illustrative, with actual locations and availability confirmed by a live provider."
      />
      <section className="tl-section cold-coverage-section">
        <div className="tl-wrap cold-coverage-grid">
          <div className="cold-coverage-graphic">
            <p className="tl-kicker">Journey structure / illustrative</p>
            <svg
              viewBox="0 0 480 300"
              fill="none"
              role="img"
              aria-label="Illustrative connection from a collection point through a planned handover to a receiving point; not a geographic map"
            >
              <path
                className="cold-route-grid"
                d="M0 50H480M0 100H480M0 150H480M0 200H480M0 250H480M60 0V300M120 0V300M180 0V300M240 0V300M300 0V300M360 0V300M420 0V300"
              />
              <path
                className="cold-route-line"
                d="M68 215H155Q190 215 190 180V135Q190 100 225 100H300Q335 100 335 65V55H410"
              />
              <circle cx="68" cy="215" r="10" className="cold-route-dot" />
              <circle cx="250" cy="100" r="10" className="cold-route-dot" />
              <circle cx="410" cy="55" r="10" className="cold-route-dot" />
              <text x="42" y="253">
                COLLECT
              </text>
              <text x="211" y="142">
                HANDOVER
              </text>
              <text x="354" y="93">
                RECEIVE
              </text>
            </svg>
            <p>
              Route geometry only. No locations, live movements or service areas are represented.
            </p>
          </div>
          <div className="cold-coverage-patterns">
            {[
              [
                "01",
                "Local distribution",
                "A collection and receiving location within an agreed local area. Confirm access, load size and each receiving window.",
              ],
              [
                "02",
                "Regional transfers",
                "A longer journey between agreed locations. Discuss product requirements, route suitability and any proposed handovers.",
              ],
              [
                "03",
                "Scheduled movements",
                "A repeated transport requirement with an agreed pattern. Review volumes, changing needs and the details of each location.",
              ],
            ].map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="tl-section cold-coverage-brief">
        <div className="tl-wrap tl-split">
          <div>
            <p className="tl-kicker">To discuss a route</p>
            <h2>
              Bring the
              <br />
              whole picture.
            </h2>
          </div>
          <ul>
            <li>
              <span>Origin & destination</span>General collection and delivery areas.
            </li>
            <li>
              <span>The load</span>Product type, approximate dimensions and handling needs.
            </li>
            <li>
              <span>The schedule</span>Proposed dates, frequency and receiving arrangements.
            </li>
            <li>
              <span>Site access</span>Loading facilities, access limits and contact arrangements.
            </li>
          </ul>
        </div>
      </section>
      <ColdNextStep title="Talk through a proposed route." />
    </>
  );
}

export function ColdChainTemplate({ template, page, enquiryHref }: ColdChainProps) {
  const currentPage = page.toLowerCase().replaceAll(" ", "-").replace(/^\//, "") || "home";
  const activePage =
    template.pages.find((item) => item.toLowerCase().replaceAll(" ", "-") === currentPage) ?? page;
  return (
    <div className="tl-site tl-theme-cold-chain">
      <TransportHeader template={template} page={activePage} />
      {currentPage === "home" ? <ColdHome template={template} /> : null}
      {currentPage === "services" ? <ColdServices template={template} /> : null}
      {currentPage === "handling" ? <ColdHandling template={template} /> : null}
      {currentPage === "coverage" ? <ColdCoverage template={template} /> : null}
      {currentPage === "contact" ? (
        <>
          <TransportPageIntro
            eyebrow={`${template.brand} / CONTACT`}
            title="Start with the details that matter."
            copy="Explore a sample enquiry for a temperature-sensitive consignment. Include a general overview of the goods, route and handling requirements."
          />
          <TransportContact template={template} enquiryHref={enquiryHref} />
        </>
      ) : null}
      <TransportFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}

export default ColdChainTemplate;
