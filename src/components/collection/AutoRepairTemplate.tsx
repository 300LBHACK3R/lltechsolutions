import Image from "next/image";
import Link from "next/link";
import { retailPagePath, type RetailTemplate } from "@/data/website-collection";
import { BayServiceExplorer } from "./RetailShopInteractions";
import { RetailContact, RetailFooter, RetailHeader, RetailPageIntro } from "./RetailShared";

function BayPhoto({ template, compact = false }: { template: RetailTemplate; compact?: boolean }) {
  return (
    <figure className={`bay-photo${compact ? " bay-photo-compact" : ""}`}>
      <Image
        src={template.image}
        alt={template.imageAlt}
        fill
        sizes="(max-width: 800px) 100vw, 78vw"
        preload={!compact}
      />
      <figcaption>
        <span>BAY 03 / WORKSHOP STUDY</span>
        <span>ILLUSTRATIVE STUDIO IMAGE</span>
      </figcaption>
    </figure>
  );
}

function BayProcess() {
  return (
    <section className="bay-process retail-wrap" aria-labelledby="bay-process-heading">
      <div className="bay-process-intro">
        <p className="bay-label">03 / THE WORKSHOP METHOD</p>
        <h2 id="bay-process-heading">
          No mystery.
          <br />
          Just a method.
        </h2>
        <p>A clear path from the first conversation to the next one.</p>
      </div>
      <ol className="bay-process-ledger">
        <li>
          <span className="bay-step">01</span>
          <div>
            <h3>Start with the details.</h3>
            <p>
              Tell the workshop what you have noticed, your vehicle details and the reason for your
              visit.
            </p>
          </div>
          <span className="bay-process-code">INTAKE</span>
        </li>
        <li>
          <span className="bay-step">02</span>
          <div>
            <h3>Understand the findings.</h3>
            <p>
              An inspection informs the recommendations. Discuss the proposed work, estimate and
              timing before approving it.
            </p>
          </div>
          <span className="bay-process-code">REVIEW</span>
        </li>
        <li>
          <span className="bay-step">03</span>
          <div>
            <h3>Know what comes next.</h3>
            <p>
              Review the completed work and any future maintenance notes with the workshop at
              handover.
            </p>
          </div>
          <span className="bay-process-code">HANDOVER</span>
        </li>
      </ol>
    </section>
  );
}

function BayServiceLedger({ template }: { template: RetailTemplate }) {
  return (
    <section className="bay-ledger retail-wrap" aria-labelledby="bay-ledger-heading">
      <div className="bay-ledger-heading">
        <p className="bay-label">SERVICE INDEX / BAY 03</p>
        <h2 id="bay-ledger-heading">Work, explained.</h2>
        <span>REF / DESCRIPTION</span>
      </div>
      {template.services.map((service, index) => (
        <article key={service.name} className="bay-ledger-row">
          <span className="bay-ledger-number">0{index + 1}</span>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <p className="bay-ledger-detail">{service.detail}</p>
        </article>
      ))}
      <p className="bay-small">
        Illustrative services. Confirm suitability, scope, pricing and scheduling with the actual
        workshop.
      </p>
    </section>
  );
}

function BayHome({ template }: { template: RetailTemplate }) {
  return (
    <>
      <section className="bay-hero retail-wrap">
        <div className="bay-hero-top">
          <p className="bay-label">INDEPENDENT AUTO WORKSHOP</p>
          <span className="bay-hero-reference">EST. YOUR WAY / BAY 03</span>
        </div>
        <div className="bay-hero-title">
          <h1>
            GOOD WORK.
            <br />
            <span>NO GUESSWORK.</span>
          </h1>
          <div className="bay-hero-note">
            <span className="bay-asterisk" aria-hidden="true">
              ✳
            </span>
            <p>{template.intro}</p>
            <Link className="bay-link" href={retailPagePath("Services")}>
              Explore the workshop <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="bay-hero-media">
          <div className="bay-bay-number" aria-hidden="true">
            <span>WORKSHOP</span>
            <b>03</b>
            <span>INSPECT / EXPLAIN / REPAIR</span>
          </div>
          <BayPhoto template={template} />
        </div>
        <div className="bay-hero-caption">
          <span>PRECISION IN THE WORK. CLARITY IN THE CONVERSATION.</span>
          <Link href={retailPagePath("Contact")}>
            Talk to the workshop <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <BayServiceExplorer services={template.services} />
      <BayProcess />
      <section className="bay-statement retail-wrap">
        <p className="bay-label">BUILT AROUND THE EVERYDAY DRIVE</p>
        <h2>
          Your car has a job.
          <br />
          <span>So do we.</span>
        </h2>
        <div>
          <p>{template.about}</p>
          <Link className="bay-link" href={retailPagePath("Workshop")}>
            Inside BAY 03 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function BayWorkshop({ template }: { template: RetailTemplate }) {
  return (
    <>
      <RetailPageIntro
        eyebrow="01 / INSIDE THE WORKSHOP"
        title="A place for good work."
        description={template.about}
      />
      <div className="retail-wrap">
        <BayPhoto template={template} compact />
      </div>
      <BayProcess />
      <section className="bay-workshop-notes retail-wrap">
        <p className="bay-label">AT THE WORKBENCH</p>
        <div>
          <h2>
            A little clarity
            <br />
            goes a long way.
          </h2>
          <p>
            Good conversations begin with useful details. Bring your vehicle’s make, model and year,
            a description of your concern, and any relevant service history when you contact the
            workshop.
          </p>
          <Link className="bay-link" href={retailPagePath("Contact")}>
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <span className="bay-workshop-mark" aria-hidden="true">
          B/03
        </span>
      </section>
    </>
  );
}

export default function AutoRepairTemplate({
  template,
  page = "home",
  enquiryHref,
}: {
  template: RetailTemplate;
  page?: string;
  enquiryHref: string;
}) {
  return (
    <div className="retail-site retail-theme-auto-repair" data-retail-demo={template.id}>
      <RetailHeader template={template} page={page} />
      {page === "services" ? (
        <>
          <RetailPageIntro
            eyebrow="02 / SERVICE INDEX"
            title="Know the work."
            description="Explore the systems, understand the conversation and find a starting point for your next workshop visit."
          />
          <BayServiceExplorer services={template.services} />
          <BayServiceLedger template={template} />
          <div className="bay-page-cta retail-wrap">
            <h2>Let’s talk about your vehicle.</h2>
            <Link className="retail-button" href={retailPagePath("Contact")}>
              Contact the workshop <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </>
      ) : page === "workshop" ? (
        <BayWorkshop template={template} />
      ) : page === "contact" ? (
        <>
          <RetailPageIntro
            eyebrow="04 / START THE CONVERSATION"
            title="Bring us the details."
            description="A question about a service or your next workshop visit? This is where the conversation begins."
          />
          <RetailContact template={template} enquiryHref={enquiryHref} />
        </>
      ) : (
        <BayHome template={template} />
      )}
      <RetailFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
