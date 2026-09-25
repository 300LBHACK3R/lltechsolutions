import Image from "next/image";
import Link from "next/link";
import type { WebsiteDesign } from "@/data/website-collection";
import { beautyContent } from "@/data/beauty-content";
import { beautyPages, beautyPagePath, type BeautyPage } from "@/data/beauty-pages";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function BeautyMark() {
  return (
    <svg className="beauty-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4c7 8 14 12 14 22a14 14 0 0 1-28 0C10 16 17 12 24 4Z" stroke="currentColor" />
      <path d="M24 13c4 6 7 9 7 14a7 7 0 0 1-14 0c0-5 3-8 7-14Z" stroke="currentColor" />
      <path d="M24 40v5M6 26h4m28 0h4" stroke="currentColor" />
    </svg>
  );
}

function ContactLink({ children = "Find your appointment" }: { children?: React.ReactNode }) {
  return (
    <Link className="beauty-button" href={beautyPagePath("Contact")}>
      {children} <Arrow />
    </Link>
  );
}

function Closing() {
  return (
    <section className="beauty-closing" aria-labelledby="beauty-closing-heading">
      <BeautyMark />
      <div>
        <p className="beauty-eyebrow">YOUR TIME, WELL SPENT</p>
        <h2 id="beauty-closing-heading">
          Make room for <em>a little you.</em>
        </h2>
      </div>
      <ContactLink />
    </section>
  );
}

export default function BeautyTemplate({
  design,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  standalonePage: BeautyPage;
  enquiryHref: string;
}) {
  return (
    <div className="beauty-site" data-beauty-root={design.id}>
      <header className="beauty-header">
        <Link
          className="beauty-brand"
          href={beautyPagePath("Home")}
          aria-label={`${beautyContent.brand} home`}
        >
          <BeautyMark />
          <span>
            forma<small>NAIL & SKIN</small>
          </span>
        </Link>
        <nav className="beauty-nav" aria-label="Nail and esthetics studio pages">
          {beautyPages.map((page) => (
            <Link
              key={page}
              href={beautyPagePath(page)}
              aria-current={page === standalonePage ? "page" : undefined}
            >
              {page}
              {page === "Contact" ? <Arrow /> : null}
            </Link>
          ))}
        </nav>
      </header>

      <div className="beauty-page" aria-labelledby="beauty-page-heading">
        {standalonePage === "Home" ? (
          <>
            <section className="beauty-hero">
              <div className="beauty-hero-copy">
                <p className="beauty-eyebrow">
                  <span />
                  {beautyContent.eyebrow}
                </p>
                <h1 id="beauty-page-heading">
                  {beautyContent.headline}
                  <br />
                  <em>{beautyContent.emphasis}</em>
                </h1>
                <p className="beauty-lead">{beautyContent.introduction}</p>
                <ContactLink />
                <p className="beauty-hero-footnote">A little care. A lovely difference.</p>
              </div>
              <figure className="beauty-hero-image">
                <Image
                  src={beautyContent.image}
                  alt={beautyContent.imageAlt}
                  fill
                  sizes="(max-width: 720px) 100vw, 52vw"
                  loading="eager"
                />
                <figcaption>
                  <span>Made for your moment.</span>
                  <span>01 / FORMA NAIL & SKIN</span>
                </figcaption>
              </figure>
            </section>

            <section className="beauty-approach" aria-labelledby="beauty-approach-heading">
              <div className="beauty-approach-intro">
                <p className="beauty-eyebrow">THE FORMA APPROACH</p>
                <h2 id="beauty-approach-heading">
                  Your style.
                  <br />
                  <em>Thoughtfully finished.</em>
                </h2>
              </div>
              <div className="beauty-approach-points">
                <div>
                  <span>01</span>
                  <h3>A conversation first</h3>
                  <p>Talk through the look you like and the service that suits your appointment.</p>
                </div>
                <div>
                  <span>02</span>
                  <h3>Considered details</h3>
                  <p>From the colour you choose to the finishing touches that make it your own.</p>
                </div>
                <div>
                  <span>03</span>
                  <h3>A moment for you</h3>
                  <p>Time set aside to settle in, switch gears and enjoy the experience.</p>
                </div>
              </div>
            </section>

            <section className="beauty-service-preview" aria-labelledby="beauty-services-heading">
              <div className="beauty-section-heading">
                <div>
                  <p className="beauty-eyebrow">THE SERVICE EDIT</p>
                  <h2 id="beauty-services-heading">
                    Small rituals.
                    <br />
                    <em>Your signature.</em>
                  </h2>
                </div>
                <p>
                  A fresh finish for your nails, a moment of self-care, or a subtle detail to bring
                  it all together.
                </p>
              </div>
              <div className="beauty-service-index">
                {beautyContent.services.map((service, index) => (
                  <Link href={`${beautyPagePath("Services")}#${service.id}`} key={service.id}>
                    <span className="beauty-service-number">0{index + 1}</span>
                    <h3>{service.name}</h3>
                    <p>{service.note}</p>
                    <Arrow />
                  </Link>
                ))}
              </div>
            </section>
            <Closing />
          </>
        ) : standalonePage === "Services" ? (
          <>
            <header className="beauty-page-intro">
              <p className="beauty-eyebrow">THE SERVICE EDIT / 02</p>
              <h1 id="beauty-page-heading">
                A little polish.
                <br />
                <em>A personal touch.</em>
              </h1>
              <p className="beauty-lead">
                Explore the details that feel like you. Start with a conversation about your
                preferences, your time and the look you have in mind.
              </p>
            </header>
            <section
              className="beauty-service-details"
              aria-label="Example nail and esthetics services"
            >
              {beautyContent.services.map((service, index) => (
                <article id={service.id} key={service.id}>
                  <span className="beauty-service-number">0{index + 1}</span>
                  <div>
                    <p className="beauty-eyebrow">{service.note}</p>
                    <h2>{service.name}</h2>
                  </div>
                  <div>
                    <p>{service.description}</p>
                    <p>{service.detail}</p>
                    <Link className="beauty-text-link" href={beautyPagePath("Contact")}>
                      Ask about an appointment <Arrow />
                    </Link>
                  </div>
                </article>
              ))}
            </section>
            <section className="beauty-first-visit" aria-labelledby="beauty-first-visit-heading">
              <div className="beauty-detail-image">
                <Image
                  src={beautyContent.detailImage}
                  alt={beautyContent.detailImageAlt}
                  fill
                  sizes="(max-width: 720px) 100vw, 44vw"
                />
              </div>
              <div>
                <p className="beauty-eyebrow">BEFORE YOUR FIRST VISIT</p>
                <h2 id="beauty-first-visit-heading">
                  Bring an idea.
                  <br />
                  <em>Make it yours.</em>
                </h2>
                <p>
                  A reference photo, a favourite colour or simply a question. Discuss your chosen
                  service, timing and price before booking, and share any sensitivities or
                  accessibility needs in advance.
                </p>
                <p>
                  This is an example service menu. Your website will show your actual services,
                  prices, qualifications and approved information.
                </p>
                <ContactLink>Get in touch</ContactLink>
              </div>
            </section>
          </>
        ) : (
          <>
            <header className="beauty-page-intro">
              <p className="beauty-eyebrow">LET’S CONNECT / 03</p>
              <h1 id="beauty-page-heading">
                Your next
                <br />
                <em>little ritual.</em>
              </h1>
              <p className="beauty-lead">
                Ask about a service, share the look you have in mind or find an appointment that
                fits your day. We would love to hear what you are thinking.
              </p>
            </header>
            <section className="beauty-contact-layout" aria-labelledby="beauty-contact-heading">
              <div className="beauty-contact-card">
                <BeautyMark />
                <p className="beauty-eyebrow">DIRECT & PERSONAL</p>
                <h2 id="beauty-contact-heading">
                  Start with
                  <br />
                  <em>a hello.</em>
                </h2>
                <dl className="beauty-contact-details">
                  <div>
                    <dt>Email / sample only</dt>
                    <dd>hello@example.com</dd>
                  </div>
                  <div>
                    <dt>Phone / added at launch</dt>
                    <dd>Your studio number</dd>
                  </div>
                  <div>
                    <dt>Visit / added at launch</dt>
                    <dd>Your location & opening hours</dd>
                  </div>
                </dl>
                <p className="beauty-demo-note">
                  Forma Nail & Skin is a fictional studio. This demo does not accept salon enquiries
                  or appointments.
                </p>
              </div>
              <div className="beauty-contact-guidance">
                <p className="beauty-eyebrow">ONE LESS THING TO THINK ABOUT</p>
                <h2>
                  Clear details.
                  <br />
                  <em>An easy next step.</em>
                </h2>
                <p>
                  Your finished website includes working tap-to-call and email links using your own
                  contact details.
                </p>
                <div className="beauty-booking-note">
                  <span aria-hidden="true">↗</span>
                  <div>
                    <h3>Already use a booking service?</h3>
                    <p>
                      We can link a button to your existing booking page. Booking-provider fees,
                      custom integrations and enquiry-form upgrades are separate.
                    </p>
                  </div>
                </div>
                <div className="beauty-contact-launch">
                  <p className="beauty-eyebrow">MAKE IT YOURS</p>
                  <p>
                    Your name, services, supplied photographs and contact details, brought together
                    in this three-page design.
                  </p>
                  <a className="beauty-button" href={enquiryHref}>
                    Make this my website <Arrow />
                  </a>
                  <p className="beauty-real-enquiry">
                    This button contacts L&L Tech Solutions about the website.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <footer className="beauty-footer">
        <Link
          className="beauty-brand"
          href={beautyPagePath("Home")}
          aria-label={`${beautyContent.brand} home`}
        >
          <BeautyMark />
          <span>
            forma<small>NAIL & SKIN</small>
          </span>
        </Link>
        <p>
          A little care.
          <br />
          <em>A lovely difference.</em>
        </p>
        <nav aria-label="Nail and esthetics studio footer">
          {beautyPages.map((page) => (
            <Link href={beautyPagePath(page)} key={page}>
              {page}
            </Link>
          ))}
        </nav>
        <div className="beauty-footer-note">
          <span>Fictional studio · Illustrative imagery</span>
          <a href={enquiryHref}>
            Website by L&L <Arrow />
          </a>
        </div>
      </footer>
    </div>
  );
}
