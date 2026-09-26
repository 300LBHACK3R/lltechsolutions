import Image from "next/image";
import Link from "next/link";
import type { WebsiteDesign } from "@/data/website-collection";
import { artsyNailContent } from "@/data/artsy-nail-content";
import { artsyNailPages, artsyNailPagePath, type ArtsyNailPage } from "@/data/artsy-nail-pages";
import DemoEnquiryForm from "@/components/collection/DemoEnquiryForm";
import ArtsyNailInteractions from "@/components/collection/ArtsyNailInteractions";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ArtsyNailMark() {
  return (
    <svg className="artsy-nail-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 3v58M3 32h58M11.5 11.5l41 41m0-41-41 41" stroke="currentColor" strokeWidth="9" />
    </svg>
  );
}

function Brand() {
  return (
    <>
      <span>
        CHROMA<small>NAIL CLUB</small>
      </span>
      <ArtsyNailMark />
    </>
  );
}

function ContactLink({ children = "Let’s talk nails" }: { children?: React.ReactNode }) {
  return (
    <Link className="artsy-nail-button" href={artsyNailPagePath("Contact")}>
      {children}
      <Arrow />
    </Link>
  );
}

function Closing() {
  return (
    <section className="artsy-nail-closing" aria-labelledby="artsy-nail-closing-heading">
      <p className="artsy-nail-eyebrow">COME AS YOU ARE. LEAVE WITH GREAT NAILS.</p>
      <h2 id="artsy-nail-closing-heading">
        Your next <em>little obsession.</em>
      </h2>
      <ContactLink>Make it a nail date</ContactLink>
      <ArtsyNailMark />
    </section>
  );
}

export default function ArtsyNailTemplate({
  design,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  standalonePage: ArtsyNailPage;
  enquiryHref: string;
}) {
  return (
    <div className="artsy-nail-site" data-artsy-nail-root={design.id}>
      <header className="artsy-nail-header">
        <Link
          className="artsy-nail-brand"
          href={artsyNailPagePath("Home")}
          aria-label="Chroma Nail Club home"
        >
          <Brand />
        </Link>
        <nav className="artsy-nail-nav" aria-label="Chroma Nail Club pages">
          {artsyNailPages.map((page) => (
            <Link
              key={page}
              href={artsyNailPagePath(page)}
              aria-current={page === standalonePage ? "page" : undefined}
            >
              {page}
              {page === "Contact" ? <Arrow /> : null}
            </Link>
          ))}
        </nav>
      </header>
      <div className="artsy-nail-page" aria-labelledby="artsy-nail-page-heading">
        {standalonePage === "Home" ? (
          <>
            <section className="artsy-nail-hero">
              <div className="artsy-nail-hero-copy">
                <p className="artsy-nail-eyebrow">
                  <span />
                  {artsyNailContent.eyebrow}
                </p>
                <h1 id="artsy-nail-page-heading">
                  {artsyNailContent.headline}
                  <em>{artsyNailContent.emphasis}</em>
                </h1>
                <p className="artsy-nail-lead">{artsyNailContent.introduction}</p>
                <ContactLink>Find your next set</ContactLink>
                <span className="artsy-nail-hero-footnote">
                  A LITTLE SELF-EXPRESSION, RIGHT AT YOUR FINGERTIPS.
                </span>
              </div>
              <figure className="artsy-nail-hero-image">
                <div className="artsy-nail-hero-photo">
                  <Image
                    src={artsyNailContent.image}
                    alt={artsyNailContent.imageAlt}
                    fill
                    sizes="(max-width: 760px) 100vw, 48vw"
                    loading="eager"
                  />
                </div>
                <figcaption>
                  <span>
                    ART ON
                    <br />
                    YOUR TERMS.
                  </span>
                  <ArtsyNailMark />
                </figcaption>
                <span className="artsy-nail-photo-note">THE NAIL FILES — VOL. 01</span>
              </figure>
            </section>
            <div className="artsy-nail-ribbon" aria-hidden="true">
              <span>A FRESH SET OF POSSIBILITIES</span>
              <ArtsyNailMark />
              <span>GOOD COLOUR. GOOD COMPANY.</span>
              <ArtsyNailMark />
            </div>
            <ArtsyNailInteractions />
            <section className="artsy-nail-menu-preview" aria-labelledby="artsy-nail-menu-heading">
              <div className="artsy-nail-section-heading">
                <p className="artsy-nail-eyebrow">ON THE MENU</p>
                <h2 id="artsy-nail-menu-heading">
                  A set for <em>every side of you.</em>
                </h2>
              </div>
              <div className="artsy-nail-menu-index">
                {artsyNailContent.services.map((service, index) => (
                  <Link key={service.id} href={`${artsyNailPagePath("Nail Menu")}#${service.id}`}>
                    <span className="artsy-nail-number">0{index + 1}</span>
                    <h3>{service.name}</h3>
                    <p>{service.note}</p>
                    <Arrow />
                  </Link>
                ))}
              </div>
            </section>
            <section
              className="artsy-nail-studio-preview"
              aria-labelledby="artsy-nail-studio-heading"
            >
              <div className="artsy-nail-studio-photo">
                <Image
                  src={artsyNailContent.studioImage}
                  alt={artsyNailContent.studioImageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="artsy-nail-eyebrow">YOUR SEAT AT THE CLUB</p>
                <h2 id="artsy-nail-studio-heading">
                  Big on colour.
                  <br />
                  <em>Easy to be in.</em>
                </h2>
                <p>
                  A place to bring your ideas, change your mind and enjoy the small things. Good
                  nails begin with a conversation.
                </p>
                <Link className="artsy-nail-text-link" href={artsyNailPagePath("The Studio")}>
                  Meet the studio <Arrow />
                </Link>
              </div>
            </section>
            <Closing />
          </>
        ) : standalonePage === "Nail Menu" ? (
          <>
            <header className="artsy-nail-page-intro">
              <p className="artsy-nail-eyebrow">THE NAIL MENU / 02</p>
              <h1 id="artsy-nail-page-heading">
                Pick your
                <br />
                <em>kind of extra.</em>
              </h1>
              <p className="artsy-nail-lead">
                Barely there or impossible to miss. Start with the service, then make the details
                yours.
              </p>
              <ArtsyNailMark />
            </header>
            <section className="artsy-nail-menu-details" aria-label="Example nail service menu">
              {artsyNailContent.services.map((service, index) => (
                <article id={service.id} key={service.id}>
                  <span className="artsy-nail-number">0{index + 1}</span>
                  <div>
                    <p className="artsy-nail-eyebrow">{service.label}</p>
                    <h2>{service.name}</h2>
                    <p className="artsy-nail-service-note">{service.note}</p>
                  </div>
                  <div>
                    <p>{service.description}</p>
                    <p>{service.detail}</p>
                    <Link className="artsy-nail-text-link" href={artsyNailPagePath("Contact")}>
                      Ask about this set <Arrow />
                    </Link>
                  </div>
                </article>
              ))}
            </section>
            <section className="artsy-nail-menu-note">
              <ArtsyNailMark />
              <div>
                <h2>A little prep. A better appointment.</h2>
                <p>
                  Bring a reference if you have one. Mention existing product, removal needs,
                  sensitivities or accessibility preferences when you enquire. Your studio will
                  confirm service availability, timing and pricing before an appointment.
                </p>
                <p className="artsy-nail-small">
                  Example service menu. Your website will feature your actual treatments, prices and
                  policies.
                </p>
              </div>
            </section>
            <ArtsyNailInteractions />
            <Closing />
          </>
        ) : standalonePage === "The Studio" ? (
          <>
            <header className="artsy-nail-page-intro">
              <p className="artsy-nail-eyebrow">THE STUDIO / 03</p>
              <h1 id="artsy-nail-page-heading">
                A little space
                <br />
                <em>to be a lot.</em>
              </h1>
              <p className="artsy-nail-lead">
                For the colour curious, the detail obsessed and the “let’s try something different”
                days.
              </p>
              <ArtsyNailMark />
            </header>
            <figure className="artsy-nail-studio-wide">
              <Image
                src={artsyNailContent.studioImage}
                alt={artsyNailContent.studioImageAlt}
                fill
                sizes="100vw"
              />
              <figcaption>TAKE A SEAT. BRING AN IDEA.</figcaption>
            </figure>
            <section
              className="artsy-nail-studio-manifesto"
              aria-labelledby="artsy-nail-manifesto-heading"
            >
              <div>
                <p className="artsy-nail-eyebrow">THE CHROMA WAY</p>
                <h2 id="artsy-nail-manifesto-heading">
                  More you.
                  <br />
                  <em>From tip to tip.</em>
                </h2>
              </div>
              <div>
                <p>
                  A great set can be a tiny act of self-expression. Something subtle. Something
                  unexpected. Something that makes you smile when you reach for your coffee.
                </p>
                <p>
                  The studio is a place to explore that feeling. Talk through the shape, the shade
                  and the little details. Bring a fully formed idea or start with a colour you love.
                </p>
              </div>
            </section>
            <section className="artsy-nail-values" aria-label="The studio approach">
              <article>
                <span>01 / YOUR IDEAS</span>
                <h3>Let’s hear it.</h3>
                <p>
                  Reference photos, a favourite outfit or a colour you can’t stop thinking about.
                  It’s a conversation, first.
                </p>
              </article>
              <article>
                <span>02 / THE DETAILS</span>
                <h3>Make them count.</h3>
                <p>
                  Shape, finish, a carefully placed line. We make room for the small things that
                  make a set yours.
                </p>
              </article>
              <article>
                <span>03 / YOUR TIME</span>
                <h3>Settle right in.</h3>
                <p>
                  Ask questions, share preferences and let us know what would make your appointment
                  more comfortable.
                </p>
              </article>
            </section>
            <Closing />
          </>
        ) : (
          <>
            <header className="artsy-nail-page-intro">
              <p className="artsy-nail-eyebrow">SAY HELLO / 04</p>
              <h1 id="artsy-nail-page-heading">
                Let’s make
                <br />
                <em>something you.</em>
              </h1>
              <p className="artsy-nail-lead">
                Have a look in mind? Start here. Tell us the service you’re curious about and the
                little details that matter.
              </p>
              <ArtsyNailMark />
            </header>
            <section className="artsy-nail-contact-layout" aria-label="Try the studio enquiry form">
              <div className="artsy-nail-contact-copy">
                <p className="artsy-nail-eyebrow">FIRST, A LITTLE HELLO</p>
                <h2>
                  Good sets start
                  <br />
                  <em>with a chat.</em>
                </h2>
                <p>
                  Share a colour, a shape or an idea. For an existing set, mention the product
                  you’re wearing and whether you need removal.
                </p>
                <dl>
                  <div>
                    <dt>Visit the club</dt>
                    <dd>Your studio address & opening hours</dd>
                  </div>
                  <div>
                    <dt>A note before you visit</dt>
                    <dd>Appointments, service details and prices are confirmed by your studio.</dd>
                  </div>
                </dl>
                <div className="artsy-nail-contact-sticker">
                  <ArtsyNailMark />
                  <span>
                    YOUR IDEAS
                    <br />
                    LOOK GOOD HERE.
                  </span>
                </div>
              </div>
              <div className="artsy-nail-form-wrap">
                <p className="artsy-nail-eyebrow">TRY THE ENQUIRY FORM</p>
                <h2>What are you thinking?</h2>
                <p className="artsy-nail-form-note">
                  This demo checks your entries in the browser. Nothing is sent and no appointment
                  is booked.
                </p>
                <DemoEnquiryForm
                  idPrefix="artsy-nails"
                  services={artsyNailContent.services.map((service) => service.name)}
                />
              </div>
            </section>
            <section className="artsy-nail-purchase">
              <div>
                <p className="artsy-nail-eyebrow">FOR YOUR OWN NAIL STUDIO</p>
                <h2>
                  Make Chroma <em>your own.</em>
                </h2>
                <p>
                  Your branding, your services and your photos. Four pages with standard enquiry
                  form setup included.
                </p>
              </div>
              <a className="artsy-nail-button" href={enquiryHref}>
                Make this my website <Arrow />
              </a>
              <p className="artsy-nail-small">
                This link contacts L&L Tech Solutions about the website.
              </p>
            </section>
          </>
        )}
      </div>
      <footer className="artsy-nail-footer">
        <Link
          className="artsy-nail-brand"
          href={artsyNailPagePath("Home")}
          aria-label="Chroma Nail Club home"
        >
          <Brand />
        </Link>
        <p>
          Small canvas.
          <br />
          <em>Big energy.</em>
        </p>
        <nav aria-label="Chroma Nail Club footer">
          {artsyNailPages.map((page) => (
            <Link key={page} href={artsyNailPagePath(page)}>
              {page}
            </Link>
          ))}
        </nav>
        <div className="artsy-nail-footer-note">
          <span>Fictional nail studio · Illustrative imagery · No salon bookings</span>
          <a href={enquiryHref}>
            Website by L&L <Arrow />
          </a>
        </div>
      </footer>
    </div>
  );
}
