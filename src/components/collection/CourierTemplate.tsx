import Image from "next/image";
import type { TransportTemplate } from "@/data/website-collection";
import {
  TransportContact,
  TransportFooter,
  TransportHeader,
} from "@/components/collection/TransportShared";

function ParcelRoute() {
  return (
    <div
      className="cr-parcel-label"
      aria-label="From your door to theirs. Parcel delivery illustration."
    >
      <div className="cr-label-top">
        <span>HANDLE WITH CARE</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div className="cr-label-address">
        <span>FROM</span>
        <strong>Your door.</strong>
        <span>TO</span>
        <strong>Theirs.</strong>
      </div>
      <svg className="cr-route" viewBox="0 0 280 80" fill="none" aria-hidden="true">
        <path
          className="cr-route-track"
          d="M12 58H75C102 58 99 20 127 20H185C213 20 211 58 238 58H268"
        />
        <path
          className="cr-route-travel"
          d="M12 58H75C102 58 99 20 127 20H185C213 20 211 58 238 58H268"
        />
        <circle cx="12" cy="58" r="7" />
        <circle cx="268" cy="58" r="7" />
      </svg>
      <div className="cr-label-bottom">
        <span className="cr-barcode" aria-hidden="true" />
        <span>
          GOOD THINGS
          <br />
          ON THE MOVE.
        </span>
      </div>
    </div>
  );
}

export default function CourierTemplate({
  template,
  page,
  enquiryHref,
}: {
  template: TransportTemplate;
  page: string;
  enquiryHref: string;
}) {
  return (
    <div className="tl-site tl-theme-courier-one-page">
      <TransportHeader template={template} page={page} />
      <section className="cr-hero">
        <div className="cr-hero-meta">
          <p className="tl-kicker">A little local delivery energy.</p>
          <span>PARCELS. PEOPLE. PLACES.</span>
        </div>
        <h1>
          {template.headline} <em>{template.emphasis}</em>
        </h1>
        <div className="cr-hero-bottom">
          <div className="cr-hero-copy">
            <p>{template.intro}</p>
            <a className="tl-button cr-button" href="#contact">
              Let’s get it moving <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="cr-direction" aria-hidden="true">
            <span>THIS WAY</span>↘
          </div>
          <ParcelRoute />
        </div>
      </section>

      <figure className="cr-photo">
        <Image src={template.image} alt={template.imageAlt} fill sizes="100vw" preload />
        <figcaption>
          <span>ZIP / ON THE MOVE</span>
          <span>One parcel. A clear plan.</span>
        </figcaption>
      </figure>

      <section className="cr-services" id="services" aria-labelledby="cr-services-title">
        <div className="cr-section-heading">
          <p className="tl-kicker">01 / What goes where</p>
          <h2 id="cr-services-title">
            Small things.
            <br />
            Useful journeys.
          </h2>
        </div>
        <div className="cr-service-grid">
          {template.services.slice(0, 3).map((service, index) => (
            <article key={service.name}>
              <div className="cr-service-top">
                <span>0{index + 1}</span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <details>
                <summary>
                  Delivery details <span aria-hidden="true">+</span>
                </summary>
                <p>{service.detail}</p>
              </details>
            </article>
          ))}
        </div>
        <p className="cr-service-note">
          Every delivery starts with a conversation about the item, the route and the timing.
          Availability and the agreed price are confirmed before collection.
        </p>
      </section>

      <section className="cr-about" id="about" aria-labelledby="cr-about-title">
        <div className="cr-about-stamp" aria-hidden="true">
          <span>GOOD THINGS</span>
          <b>ZIP</b>
          <span>ON THE MOVE</span>
        </div>
        <div>
          <p className="tl-kicker">02 / The thinking behind ZIP</p>
          <h2 id="cr-about-title">
            A personal touch.
            <br />
            From A to B.
          </h2>
          <p>{template.about}</p>
          <a className="cr-text-link" href="#contact">
            Tell us what needs to go <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="cr-contact" aria-label="Contact ZIP">
        <div className="cr-contact-top">
          <p className="tl-kicker">03 / Let’s talk parcels</p>
          <span aria-hidden="true">↙</span>
        </div>
        <TransportContact template={template} enquiryHref={enquiryHref} />
      </section>
      <TransportFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
