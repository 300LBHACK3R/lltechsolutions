import Image from "next/image";
import { designPrice, type WebsiteDesign } from "@/data/website-collection";
import { hairOnePage as content } from "@/data/hair-one-page-content";

export default function HairOnePage({
  design,
  enquiryHref,
}: {
  design: WebsiteDesign;
  enquiryHref: string;
}) {
  return (
    <div className="hair-one-site" data-hair-one-page-demo="hair-one-page" id="home">
      <header className="hair-one-header">
        <a className="hair-one-brand" href="#home" aria-label="June Hair home">
          <span>JUNE</span>
          <small>HAIR</small>
        </a>
        <nav className="hair-one-nav" aria-label="Hair website sections">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a className="hair-one-nav-contact" href="#contact">
            Contact <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hair-one-hero" aria-labelledby="hair-one-heading">
        <figure className="hair-one-hero-photo">
          <Image
            {...content.photo}
            alt={content.photo.alt}
            sizes="(max-width: 760px) 100vw, (max-width: 1600px) 57vw, 870px"
            preload
          />
          <figcaption>A little time in the chair. A fresh feeling for the everyday.</figcaption>
        </figure>
        <div className="hair-one-hero-copy">
          <p className="hair-one-eyebrow">YOUR NEIGHBOURHOOD HAIR STUDIO</p>
          <h1 id="hair-one-heading">
            {content.headline}
            <br />
            <em>{content.emphasis}</em>
          </h1>
          <p className="hair-one-introduction">{content.introduction}</p>
          <a className="hair-one-button" href="#contact">
            Plan your visit <span aria-hidden="true">↗</span>
          </a>
          <a className="hair-one-hero-link" href="#services">
            Find your next look <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section
        className="hair-one-services hair-one-section"
        id="services"
        aria-labelledby="hair-one-services-heading"
      >
        <div className="hair-one-section-heading">
          <p className="hair-one-eyebrow">THE SERVICE MENU</p>
          <h2 id="hair-one-services-heading">
            A little change. <em>A whole new feeling.</em>
          </h2>
        </div>
        <div className="hair-one-service-list">
          {content.services.map((service, index) => (
            <article className="hair-one-service" key={service.name}>
              <span className="hair-one-service-number">0{index + 1}</span>
              <div>
                <h3>{service.name}</h3>
                <p className="hair-one-service-detail">{service.detail}</p>
              </div>
              <p className="hair-one-service-description">{service.description}</p>
              <a href="#contact" aria-label={`Ask about ${service.name.toLowerCase()}`}>
                Let’s talk <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="hair-one-sample-note">
          Sample service menu. Your own services, appointment lengths and prices are added before
          launch.
        </p>
      </section>

      <section
        className="hair-one-about hair-one-section"
        id="about"
        aria-labelledby="hair-one-about-heading"
      >
        <div className="hair-one-about-label">
          <p className="hair-one-eyebrow">HELLO FROM JUNE</p>
          <span aria-hidden="true">J.</span>
        </div>
        <div className="hair-one-about-copy">
          <h2 id="hair-one-about-heading">{content.about.headline}</h2>
          <p>{content.about.description}</p>
          <p className="hair-one-signoff">{content.about.signoff}</p>
        </div>
      </section>

      <section
        className="hair-one-contact hair-one-section"
        id="contact"
        aria-labelledby="hair-one-contact-heading"
      >
        <div className="hair-one-contact-copy">
          <p className="hair-one-eyebrow">SEE YOU IN THE CHAIR</p>
          <h2 id="hair-one-contact-heading">
            Let’s find <em>your next look.</em>
          </h2>
          <p>
            Ready for a refresh, or wondering where to start? Your stylist is a conversation away.
          </p>
          <span className="hair-one-contact-flourish" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="hair-one-contact-details">
          <p className="hair-one-demo-label">SAMPLE CONTACT DETAILS</p>
          <dl>
            <div>
              <dt>Book a visit</dt>
              <dd>Your external booking link will appear here</dd>
            </div>
            <div>
              <dt>Call or say hello</dt>
              <dd>Your clickable phone number and email address</dd>
            </div>
            <div>
              <dt>Find the studio</dt>
              <dd>Your salon address, opening hours and arrival notes</dd>
            </div>
          </dl>
          <p className="hair-one-contact-disclosure">
            JUNE HAIR is a fictional salon. These placeholders are inactive; this demo does not take
            bookings or send messages.
          </p>
        </div>
      </section>

      <footer className="hair-one-footer">
        <a className="hair-one-footer-brand" href="#home" aria-label="June Hair home">
          JUNE HAIR
        </a>
        <p>A fictional salon · A website design example</p>
        <a className="hair-one-back-top" href="#home">
          Back to top ↑
        </a>
      </footer>
      <aside className="hair-one-website-note" aria-label="Personalize this website">
        <div>
          <strong>A simple website. A place for your salon.</strong>
          <p>
            {designPrice(design)} · One page with your supplied content, up to three services and
            direct contact or your external booking link. Extra pages, forms, original content and
            ongoing care are quoted separately.
          </p>
        </div>
        <a href={enquiryHref}>
          Make this my website <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </div>
  );
}
