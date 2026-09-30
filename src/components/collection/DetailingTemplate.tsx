import Image from "next/image";
import type { RetailTemplate } from "@/data/website-collection";
import { DetailingTreatmentGuide } from "./RetailSmallInteractions";
import { RetailContact, RetailFooter, RetailHeader } from "./RetailShared";

export default function DetailingTemplate({
  template,
  page = "home",
  enquiryHref,
}: {
  template: RetailTemplate;
  page?: string;
  enquiryHref: string;
}) {
  return (
    <div className="retail-site retail-theme-mobile-detailing" data-retail-demo={template.id}>
      <RetailHeader template={template} page={page} />
      <section className="curb-hero">
        <div className="curb-hero-copy">
          <p className="curb-kicker">
            <span />
            MOBILE DETAILING / YOUR DRIVEWAY
          </p>
          <h1>
            {template.headline}
            <br />
            <em>{template.emphasis}</em>
          </h1>
          <div className="curb-hero-bottom">
            <p>{template.intro}</p>
            <a href="#services" className="curb-button">
              Find your detail <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
        <DetailingTreatmentGuide services={template.services} />
      </section>
      <div className="curb-tape" aria-hidden="true">
        <span>EXTERIOR</span>
        <b>+</b>
        <span>INTERIOR</span>
        <b>+</b>
        <span>THE WHOLE CAR</span>
        <b>+</b>
        <span>A LITTLE EXTRA CARE</span>
      </div>
      <figure className="curb-photo">
        <Image src={template.image} alt={template.imageAlt} fill sizes="100vw" />
        <figcaption>
          <span>CURBSIDE / THE EVERYDAY, RECONSIDERED.</span>
          <small>Illustrative vehicle photography</small>
        </figcaption>
      </figure>
      <section
        className="curb-services retail-wrap retail-section"
        id="services"
        aria-labelledby="curb-services-heading"
      >
        <div className="curb-section-heading">
          <p className="curb-kicker">SERVICE MENU / 01—03</p>
          <h2 id="curb-services-heading">
            A detail for
            <br />
            <em>your kind of day.</em>
          </h2>
          <p>
            From road dust to the daily commute. Start with a focus; we’ll talk through your
            vehicle.
          </p>
        </div>
        <div className="curb-service-list">
          {template.services.slice(0, 3).map((service, index) => (
            <article key={service.name}>
              <span className="curb-service-number">0{index + 1}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <small>{service.detail}</small>
              </div>
              <a href="#contact" aria-label={`Ask about ${service.name}`}>
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="curb-about" id="about" aria-labelledby="curb-about-heading">
        <div className="curb-cross" aria-hidden="true">
          ✳
        </div>
        <div>
          <p className="curb-kicker">GOOD CARE. LESS RUNAROUND.</p>
          <h2 id="curb-about-heading">
            Your car.
            <br />
            Your place.
            <br />
            <em>A fresh perspective.</em>
          </h2>
        </div>
        <div className="curb-about-copy">
          <p>{template.about}</p>
          <p>
            Tell us about the vehicle, where it will be parked and what you’d like to focus on.
            We’ll discuss access, practical requirements and the right service.
          </p>
          <a className="curb-text-link" href="#contact">
            Let’s talk details <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <RetailContact template={template} enquiryHref={enquiryHref} />
      <RetailFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
