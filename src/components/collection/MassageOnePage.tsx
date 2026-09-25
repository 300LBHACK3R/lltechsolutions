import Image from "next/image";
import { designPrice, type WebsiteDesign } from "@/data/website-collection";
import { massageOnePage as content } from "@/data/massage-one-page-content";

export default function MassageOnePage({
  design,
  enquiryHref,
}: {
  design: WebsiteDesign;
  enquiryHref: string;
}) {
  return (
    <div className="massage-one-site" data-massage-one-page-demo="massage-one-page" id="top">
      <header className="massage-one-header">
        <a className="massage-one-brand" href="#top" aria-label="Soma Massage home">
          <span>soma.</span>
          <small>MASSAGE</small>
        </a>
        <nav className="massage-one-nav" aria-label="Massage website sections">
          <a href="#treatments">Treatments</a>
          <a href="#about">Our approach</a>
          <a className="massage-one-nav-book" href="#contact">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="massage-one-hero" aria-labelledby="massage-one-heading">
        <div className="massage-one-hero-copy">
          <p className="massage-one-eyebrow">MASSAGE · A MOMENT FOR YOU</p>
          <h1 id="massage-one-heading">
            {content.headline}
            <br />
            <em>{content.emphasis}</em>
          </h1>
          <p className="massage-one-introduction">{content.introduction}</p>
          <a className="massage-one-button" href="#contact">
            Explore booking <span aria-hidden="true">↗</span>
          </a>
          <a className="massage-one-hero-note" href="#treatments">
            Find your moment <span aria-hidden="true">↓</span>
          </a>
        </div>
        <figure className="massage-one-hero-photo">
          <Image
            {...content.photo}
            alt={content.photo.alt}
            sizes="(max-width: 740px) 100vw, (max-width: 1600px) 50vw, 760px"
            preload
          />
          <figcaption>
            <span>PAUSE. EXHALE.</span>
            <em>Come back to yourself.</em>
          </figcaption>
        </figure>
      </section>

      <section
        className="massage-one-treatments massage-one-section"
        id="treatments"
        aria-labelledby="massage-one-treatments-heading"
      >
        <div className="massage-one-section-intro">
          <div>
            <p className="massage-one-eyebrow">01 / YOUR TIME</p>
            <h2 id="massage-one-treatments-heading">
              A moment that
              <br />
              <em>feels like yours.</em>
            </h2>
          </div>
          <p>
            Start with what you need from your time here. We will talk through the details and make
            space for your preferences.
          </p>
        </div>
        <div className="massage-one-treatment-list">
          {content.treatments.map((treatment, index) => (
            <article className="massage-one-treatment" key={treatment.name}>
              <span className="massage-one-treatment-number">0{index + 1}</span>
              <h3>{treatment.name}</h3>
              <p>{treatment.description}</p>
              <a href="#contact" aria-label={`Ask about ${treatment.name.toLowerCase()}`}>
                Ask about this <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="massage-one-sample-note">
          Sample treatment descriptions. Your own services, durations and rates are added before
          launch.
        </p>
      </section>

      <section
        className="massage-one-about massage-one-section"
        id="about"
        aria-labelledby="massage-one-about-heading"
      >
        <p className="massage-one-eyebrow">02 / A THOUGHTFUL APPROACH</p>
        <div>
          <h2 id="massage-one-about-heading">
            Good care begins
            <br />
            <em>with listening.</em>
          </h2>
          <p>
            There is no single way to unwind. A welcoming space, a conversation before your
            appointment and the freedom to ask for adjustments make room for an experience that
            feels comfortable to you.
          </p>
          <span className="massage-one-about-signature">
            A little less rush. A little more you.
          </span>
        </div>
      </section>

      <section
        className="massage-one-contact"
        id="contact"
        aria-labelledby="massage-one-contact-heading"
      >
        <div className="massage-one-contact-copy">
          <p className="massage-one-eyebrow">03 / MAKE SOME SPACE</p>
          <h2 id="massage-one-contact-heading">
            Your next
            <br />
            <em>quiet moment.</em>
          </h2>
          <p>
            Ask a question, find an appointment or say hello. Your business’s real contact and
            booking links belong here.
          </p>
        </div>
        <div className="massage-one-contact-details">
          <p className="massage-one-demo-label">DEMONSTRATION CONTACT DETAILS</p>
          <dl>
            <div>
              <dt>Book an appointment</dt>
              <dd>Your existing booking link, connected on launch</dd>
            </div>
            <div>
              <dt>Email or call</dt>
              <dd>Your clickable email address and phone number</dd>
            </div>
            <div>
              <dt>Visit the studio</dt>
              <dd>Your location, opening hours and arrival details</dd>
            </div>
          </dl>
          <p>
            This sample does not take appointments or send messages. No live therapist or studio is
            represented.
          </p>
        </div>
      </section>

      <footer className="massage-one-footer">
        <div>
          <span className="massage-one-footer-brand">soma.</span>
          <p>Fictional massage business · Website design example</p>
        </div>
        <a href="#top">Back to the beginning ↑</a>
      </footer>
      <aside className="massage-one-website-note" aria-label="Personalize this website">
        <div>
          <strong>Your practice. This simple starting point.</strong>
          <p>
            {designPrice(design)} · One page, personalized with your supplied copy and images.
            Direct contact links and launch included. Forms, extra pages, new photography and
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
