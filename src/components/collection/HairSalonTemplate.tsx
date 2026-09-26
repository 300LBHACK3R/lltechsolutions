import Image from "next/image";
import Link from "next/link";
import type { WebsiteDesign } from "@/data/website-collection";
import { hairSalonContent } from "@/data/hair-salon-content";
import { hairSalonPages, hairSalonPagePath, type HairSalonPage } from "@/data/hair-salon-pages";
import HairSalonServiceMenu from "@/components/collection/HairSalonInteractions";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HairSalonMark() {
  return (
    <svg className="hair-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 8v24h24M18 8v14h14M18 8h14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Brand() {
  return (
    <>
      <HairSalonMark />
      <span>
        LINE & FORM<small>HAIR</small>
      </span>
    </>
  );
}

function ContactLink({ children = "Find your appointment" }: { children?: React.ReactNode }) {
  return (
    <Link className="hair-button" href={hairSalonPagePath("Contact")}>
      {children}
      <Arrow />
    </Link>
  );
}

function Journey() {
  return (
    <section className="hair-journey" aria-labelledby="hair-journey-heading">
      <div className="hair-section-heading">
        <div>
          <p className="hair-eyebrow">A LITTLE CLARITY GOES A LONG WAY</p>
          <h2 id="hair-journey-heading">
            A good result starts
            <br />
            with a conversation.
          </h2>
        </div>
        <p>A thoughtful appointment, from the first idea to your everyday routine.</p>
      </div>
      <ol>
        {hairSalonContent.journey.map((step, index) => (
          <li key={step.title}>
            <span>0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Closing() {
  return (
    <section className="hair-closing" aria-labelledby="hair-closing-heading">
      <div>
        <p className="hair-eyebrow">YOUR NEXT CHAPTER</p>
        <h2 id="hair-closing-heading">Let’s find your form.</h2>
      </div>
      <ContactLink>Start a conversation</ContactLink>
    </section>
  );
}

export default function HairSalonTemplate({
  design,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  standalonePage: HairSalonPage;
  enquiryHref: string;
}) {
  return (
    <div className="hair-site" data-hair-salon-root={design.id}>
      <div className="hair-accent-rail" />
      <header className="hair-header">
        <Link
          className="hair-brand"
          href={hairSalonPagePath("Home")}
          aria-label={`${hairSalonContent.brand} home`}
        >
          <Brand />
        </Link>
        <nav className="hair-nav" aria-label="Hair salon pages">
          {hairSalonPages.map((page) => (
            <Link
              key={page}
              href={hairSalonPagePath(page)}
              aria-current={page === standalonePage ? "page" : undefined}
            >
              {page}
              {page === "Contact" ? <Arrow /> : null}
            </Link>
          ))}
        </nav>
      </header>
      <div className="hair-page" aria-labelledby="hair-page-heading">
        {standalonePage === "Home" ? (
          <>
            <section className="hair-hero">
              <div className="hair-hero-copy">
                <p className="hair-eyebrow">
                  <span />
                  {hairSalonContent.eyebrow}
                </p>
                <h1 id="hair-page-heading">
                  {hairSalonContent.headline}
                  <br />
                  <span>{hairSalonContent.emphasis}</span>
                </h1>
                <p className="hair-lead">{hairSalonContent.introduction}</p>
                <div className="hair-hero-actions">
                  <ContactLink />
                  <Link className="hair-text-link" href={hairSalonPagePath("Services")}>
                    Explore services <Arrow />
                  </Link>
                </div>
                <div className="hair-hero-signoff">
                  <span>THE LINE & FORM APPROACH</span>
                  <p>Considered. Personal. Precisely you.</p>
                </div>
              </div>
              <figure className="hair-hero-image">
                <Image
                  src={hairSalonContent.image}
                  alt={hairSalonContent.imageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 52vw"
                  loading="eager"
                />
                <figcaption>
                  <span>SPACE TO FIND YOUR STYLE</span>
                  <strong>A fresh perspective.</strong>
                  <span aria-hidden="true">↗</span>
                </figcaption>
              </figure>
            </section>
            <div className="hair-values-strip">
              <span>Thoughtful consultation</span>
              <span>Considered technique</span>
              <span>Everyday wearability</span>
            </div>
            <section className="hair-services-preview" aria-labelledby="hair-services-heading">
              <div className="hair-section-heading">
                <div>
                  <p className="hair-eyebrow">THE SERVICE EDIT / 01</p>
                  <h2 id="hair-services-heading">A look that works for you.</h2>
                </div>
                <Link className="hair-text-link" href={hairSalonPagePath("Services")}>
                  View the service menu <Arrow />
                </Link>
              </div>
              <div className="hair-service-cards">
                {hairSalonContent.categories.map((category, index) => (
                  <Link key={category.id} href={hairSalonPagePath("Services")}>
                    <div className="hair-card-top">
                      <span>0{index + 1}</span>
                      <Arrow />
                    </div>
                    <p className="hair-eyebrow">{category.short}</p>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="hair-card-note">{category.note}</span>
                  </Link>
                ))}
              </div>
            </section>
            <section className="hair-salon-preview" aria-labelledby="hair-salon-heading">
              <div className="hair-detail-image">
                <Image
                  src={hairSalonContent.detailImage}
                  alt={hairSalonContent.detailImageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 48vw"
                />
              </div>
              <div>
                <p className="hair-eyebrow">THE SALON / 02</p>
                <h2 id="hair-salon-heading">
                  Good design.
                  <br />A personal touch.
                </h2>
                <p>
                  A clear idea. A comfortable chair. Time to talk about what works for you. Our
                  approach brings careful attention to your hair and the way you live with it.
                </p>
                <Link className="hair-text-link" href={hairSalonPagePath("Our Salon")}>
                  Get to know the salon <Arrow />
                </Link>
              </div>
            </section>
            <Journey />
            <Closing />
          </>
        ) : standalonePage === "Services" ? (
          <>
            <header className="hair-page-intro">
              <p className="hair-eyebrow">THE SERVICE EDIT / 01</p>
              <h1 id="hair-page-heading">
                Your hair.
                <br />
                <span>Your direction.</span>
              </h1>
              <p className="hair-lead">
                A considered menu of cuts, colour and finishing touches. Find a starting point, then
                let’s talk through the details.
              </p>
            </header>
            <section className="hair-menu-section" aria-labelledby="hair-menu-heading">
              <div className="hair-menu-heading">
                <h2 id="hair-menu-heading">The service menu</h2>
                <span>EXAMPLE SERVICES & PRICES</span>
              </div>
              <HairSalonServiceMenu />
            </section>
            <section className="hair-consultation-note">
              <span aria-hidden="true">↗</span>
              <div>
                <p className="hair-eyebrow">A NEW COLOUR. A BIG CHANGE. A FEW QUESTIONS.</p>
                <h2>Start with a consultation.</h2>
                <p>
                  Hair history, length, density and your desired finish all shape the appointment.
                  Discuss timing, what’s included and your individual quote before booking.
                </p>
              </div>
              <ContactLink>Ask about your visit</ContactLink>
            </section>
            <section className="hair-faq" aria-labelledby="hair-faq-heading">
              <div>
                <p className="hair-eyebrow">BEFORE YOUR VISIT</p>
                <h2 id="hair-faq-heading">
                  A little
                  <br />
                  preparation.
                </h2>
              </div>
              <div>
                {hairSalonContent.questions.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
            <Closing />
          </>
        ) : standalonePage === "Our Salon" ? (
          <>
            <header className="hair-page-intro hair-salon-intro">
              <p className="hair-eyebrow">THE SALON / 02</p>
              <h1 id="hair-page-heading">
                Designed around
                <br />
                <span>the individual.</span>
              </h1>
              <p className="hair-lead">
                Good hair belongs in your everyday life. We start by understanding yours.
              </p>
            </header>
            <figure className="hair-salon-wide">
              <Image
                src={hairSalonContent.image}
                alt={hairSalonContent.imageAlt}
                fill
                sizes="100vw"
                loading="eager"
              />
              <figcaption>LINE & FORM / A SPACE FOR A FRESH PERSPECTIVE</figcaption>
            </figure>
            <section className="hair-salon-story" aria-labelledby="hair-story-heading">
              <div>
                <p className="hair-eyebrow">OUR POINT OF VIEW</p>
                <h2 id="hair-story-heading">
                  Technique with purpose.
                  <br />
                  Style with staying power.
                </h2>
              </div>
              <div>
                <p>
                  A haircut is part of your routine, your expression and your day. The best starting
                  point is a conversation about all three.
                </p>
                <p>
                  At Line & Form, the approach is simple: listen carefully, plan clearly and pay
                  attention to the finish. Bring a specific idea or come with an open mind. There is
                  room for both.
                </p>
                <p className="hair-story-note">
                  Line & Form is a fictional salon identity created to demonstrate this website.
                  Your finished site will tell your real story, with your team, credentials and
                  supplied photography.
                </p>
              </div>
            </section>
            <Journey />
            <section
              className="hair-salon-preview hair-salon-principles"
              aria-labelledby="hair-principles-heading"
            >
              <div className="hair-detail-image">
                <Image
                  src={hairSalonContent.detailImage}
                  alt={hairSalonContent.detailImageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 48vw"
                />
              </div>
              <div>
                <p className="hair-eyebrow">THE FINISHING DETAILS</p>
                <h2 id="hair-principles-heading">
                  Space to settle in.
                  <br />
                  Time to be heard.
                </h2>
                <p>
                  A considered environment keeps the focus where it belongs: on you and your hair.
                  Tell us about your preferences, your daily routine and anything that would make
                  your visit more comfortable.
                </p>
                <ContactLink>Plan your first visit</ContactLink>
              </div>
            </section>
            <Closing />
          </>
        ) : (
          <>
            <header className="hair-page-intro">
              <p className="hair-eyebrow">GET IN TOUCH / 03</p>
              <h1 id="hair-page-heading">
                A fresh start.
                <br />
                <span>A simple hello.</span>
              </h1>
              <p className="hair-lead">
                Ask about a service, plan a change or find your next appointment. A conversation is
                a good place to begin.
              </p>
            </header>
            <section className="hair-contact-layout" aria-labelledby="hair-contact-heading">
              <div className="hair-contact-card">
                <HairSalonMark />
                <h2 id="hair-contact-heading">Let’s talk hair.</h2>
                <p>
                  Contact details below are examples only. Salon appointments are not accepted
                  through this demo.
                </p>
                <dl>
                  <div>
                    <dt>01 / EMAIL · SAMPLE ONLY</dt>
                    <dd>hello@example.com</dd>
                  </div>
                  <div>
                    <dt>02 / CALL · ADDED AT LAUNCH</dt>
                    <dd>Your salon phone number</dd>
                  </div>
                  <div>
                    <dt>03 / VISIT · ADDED AT LAUNCH</dt>
                    <dd>Your salon address & opening hours</dd>
                  </div>
                </dl>
                <div className="hair-booking-placeholder">
                  <span aria-hidden="true">↗</span>
                  <div>
                    <h3>Your booking link, here.</h3>
                    <p>Connect your existing external booking page at launch.</p>
                  </div>
                </div>
              </div>
              <div className="hair-contact-aside">
                <p className="hair-eyebrow">BEFORE YOU GET IN TOUCH</p>
                <h2>
                  A little detail.
                  <br />A better starting point.
                </h2>
                <ul>
                  <li>The service or change you have in mind</li>
                  <li>Your preferred appointment days</li>
                  <li>Your hair length and recent colour history</li>
                  <li>Any questions about access or your visit</li>
                </ul>
                <div className="hair-website-note">
                  <p className="hair-eyebrow">MAKE THIS WEBSITE YOURS</p>
                  <h3>Your salon. Clearly presented.</h3>
                  <p>
                    This four-page website includes direct call and email links using your own
                    details, plus a link to your existing booking service if supplied. Enquiry
                    forms, provider fees and custom integrations are separate.
                  </p>
                  <a className="hair-button" href={enquiryHref}>
                    Make this my website <Arrow />
                  </a>
                  <small>This button contacts L&L Tech Solutions about the website.</small>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      <footer className="hair-footer">
        <div className="hair-footer-main">
          <Link
            className="hair-brand"
            href={hairSalonPagePath("Home")}
            aria-label={`${hairSalonContent.brand} home`}
          >
            <Brand />
          </Link>
          <p>
            Considered. Personal.
            <br />
            <span>Precisely you.</span>
          </p>
          <nav aria-label="Hair salon footer">
            {hairSalonPages.map((page) => (
              <Link key={page} href={hairSalonPagePath(page)}>
                {page}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hair-footer-note">
          <span>Fictional salon · Illustrative imagery · No appointments accepted</span>
          <a href={enquiryHref}>
            Website by L&L <Arrow />
          </a>
        </div>
      </footer>
    </div>
  );
}
