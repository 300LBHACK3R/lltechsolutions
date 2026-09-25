import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { designPrice, type WebsiteDesign } from "@/data/website-collection";
import { wellnessPages, wellnessPagePath, type WellnessPage } from "@/data/wellness-pages";
import {
  wellnessBrand,
  wellnessQuestions,
  wellnessRates,
  wellnessTreatments,
} from "@/data/wellness-content";
import {
  WellnessArrow,
  WellnessBotanical,
  WellnessMark,
} from "@/components/collection/WellnessMarks";
import WellnessEnquiryDemo from "@/components/collection/WellnessEnquiryDemo";
import WellnessBookingDemo from "@/components/collection/WellnessBookingDemo";

function WellnessButton({
  children,
  href = "/contact#booking",
  light = false,
}: {
  children: ReactNode;
  href?: string;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`wellness-button${light ? " wellness-button-light" : ""}`}>
      {children}
      <WellnessArrow />
    </Link>
  );
}

function WellnessIntro({
  label,
  title,
  emphasis,
  children,
}: {
  label: string;
  title: string;
  emphasis: string;
  children: ReactNode;
}) {
  return (
    <header className="wellness-page-intro">
      <div className="wellness-intro-copy">
        <p className="wellness-eyebrow">{label}</p>
        <h1 id="wellness-page-heading">
          {title}
          <br />
          <em>{emphasis}</em>
        </h1>
        <p>{children}</p>
      </div>
      <WellnessBotanical />
      <span className="wellness-intro-caption">A LITTLE SPACE TO SIMPLY BE.</span>
    </header>
  );
}

function WellnessClosing() {
  return (
    <section className="wellness-closing" aria-labelledby="wellness-closing-heading">
      <WellnessMark />
      <p className="wellness-eyebrow">MAKE ROOM FOR YOURSELF</p>
      <h2 id="wellness-closing-heading">
        Your next quiet moment
        <br />
        <em>starts here.</em>
      </h2>
      <p>Explore a treatment, ask a question, or see how simple booking could feel.</p>
      <WellnessButton light>Explore booking</WellnessButton>
      <span className="wellness-closing-note">Sample experience · No live appointments</span>
    </section>
  );
}

function WellnessTreatmentList({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`wellness-treatments${detailed ? " wellness-treatments-detailed" : ""}`}>
      {wellnessTreatments.map((treatment, index) => (
        <article
          className="wellness-treatment"
          id={detailed ? treatment.id : undefined}
          key={treatment.id}
        >
          <span className="wellness-treatment-number">0{index + 1}</span>
          <div>
            {detailed ? <p className="wellness-eyebrow">{treatment.kicker}</p> : null}
            <h3>{treatment.title}</h3>
            <p>{treatment.description}</p>
            {detailed ? <p className="wellness-treatment-detail">{treatment.detail}</p> : null}
            <span className="wellness-treatment-duration">
              {treatment.durations.join(" / ")} MINUTES
            </span>
          </div>
          <Link
            className="wellness-round-link"
            href={detailed ? "/contact#booking" : `/treatments#${treatment.id}`}
            aria-label={
              detailed ? "Explore booking preview" : `Explore ${treatment.title.toLowerCase()}`
            }
          >
            <WellnessArrow diagonal />
          </Link>
        </article>
      ))}
    </div>
  );
}

export default function WellnessTemplate({
  design,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  standalonePage: WellnessPage;
  enquiryHref: string;
}) {
  return (
    <div
      className="wellness-site"
      data-wellness-root
      data-wellness-demo="mckenzie-house"
      data-wellness-page={standalonePage.toLowerCase()}
    >
      <header className="wellness-header">
        <Link className="wellness-brand" href="/" aria-label={`${wellnessBrand} home`}>
          <WellnessMark />
          <span>
            {wellnessBrand}
            <small>MASSAGE & MOMENTS OF CALM</small>
          </span>
        </Link>
        <nav className="wellness-nav" aria-label="Wellness website pages">
          {wellnessPages.map((page) => (
            <Link
              key={page}
              href={wellnessPagePath(page)}
              aria-current={standalonePage === page ? "page" : undefined}
            >
              {page}
            </Link>
          ))}
        </nav>
        <Link className="wellness-header-book" href="/contact#booking">
          Explore booking
          <WellnessArrow />
        </Link>
        <details className="wellness-mobile-nav" key={standalonePage}>
          <summary>
            Menu<span aria-hidden="true">＋</span>
          </summary>
          <nav aria-label="Wellness mobile pages">
            {wellnessPages.map((page) => (
              <Link
                key={page}
                href={wellnessPagePath(page)}
                aria-current={standalonePage === page ? "page" : undefined}
              >
                {page}
                <WellnessArrow />
              </Link>
            ))}
          </nav>
        </details>
      </header>

      <div className="wellness-page" aria-labelledby="wellness-page-heading">
        {standalonePage === "Home" ? (
          <>
            <section className="wellness-hero">
              <div className="wellness-hero-copy">
                <p className="wellness-eyebrow">
                  <span />
                  MASSAGE · REST · RENEW
                </p>
                <h1 id="wellness-page-heading">
                  A little space.
                  <br />
                  <em>A deeper breath.</em>
                </h1>
                <p>
                  A quieter pace. A thoughtful touch. Massage shaped around your comfort, with room
                  to simply be.
                </p>
                <WellnessButton>Find your moment</WellnessButton>
                <div className="wellness-hero-foot">
                  <WellnessMark />
                  <span>
                    A CONSIDERED APPROACH
                    <br />
                    TO YOUR EVERYDAY WELLBEING
                  </span>
                </div>
              </div>
              <div className="wellness-hero-image">
                <Image
                  src="/images/collection/massage-room.webp"
                  alt="Illustrative massage room with warm wood, soft linen, leafy plants and natural light"
                  fill
                  sizes="(max-width: 800px) 100vw, 54vw"
                  loading="eager"
                />
                <span className="wellness-image-caption">THE ART OF SLOWING DOWN</span>
                <span className="wellness-image-credit">ILLUSTRATIVE SPACE</span>
              </div>
            </section>
            <div className="wellness-values-rail">
              <span>Space to settle</span>
              <i />
              <span>Careful attention</span>
              <i />
              <span>Your own pace</span>
              <i />
              <span>Comfort comes first</span>
            </div>
            <section
              className="wellness-section wellness-welcome"
              aria-labelledby="wellness-welcome-heading"
            >
              <div>
                <p className="wellness-eyebrow">WELCOME TO EVERGREEN</p>
                <h2 id="wellness-welcome-heading">
                  Less hurry.
                  <br />
                  <em>More here.</em>
                </h2>
              </div>
              <div className="wellness-welcome-copy">
                <p className="wellness-lead">
                  Some moments ask nothing of you.
                  <br />
                  This can be one of them.
                </p>
                <p>
                  Step out of the everyday and into a softer rhythm. A thoughtful massage begins
                  with listening, leaves room for your preferences, and moves at a pace that feels
                  right for you.
                </p>
                <Link className="wellness-text-link" href="/about">
                  A little about our approach
                  <WellnessArrow />
                </Link>
              </div>
              <WellnessBotanical />
            </section>
            <section
              className="wellness-section wellness-home-treatments"
              aria-labelledby="wellness-treatments-heading"
            >
              <div className="wellness-section-heading">
                <div>
                  <p className="wellness-eyebrow">TIME, WELL SPENT</p>
                  <h2 id="wellness-treatments-heading">
                    A treatment
                    <br />
                    <em>at your pace.</em>
                  </h2>
                </div>
                <p>
                  From a focused session to a longer pause.
                  <br />
                  Find a little space that fits your day.
                </p>
              </div>
              <WellnessTreatmentList />
              <p className="wellness-small-note">
                Sample treatment menu for this demonstration practice.
              </p>
            </section>
            <section className="wellness-home-space" aria-labelledby="wellness-space-heading">
              <div className="wellness-space-image">
                <Image
                  src="/images/template-categories/health-wellness.webp"
                  alt="Illustrative treatment space with soft lighting, green walls and folded linen"
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
              <div className="wellness-space-copy">
                <p className="wellness-eyebrow">THE LITTLE THINGS MATTER</p>
                <h2 id="wellness-space-heading">
                  A softer landing
                  <br />
                  <em>in a busy day.</em>
                </h2>
                <p>
                  Warm textures. Gentle light. Time to ask a question before you begin. A calm
                  experience is made of small, thoughtful details.
                </p>
                <Link className="wellness-text-link" href="/faq">
                  Feel at home before you arrive
                  <WellnessArrow />
                </Link>
                <span className="wellness-small-note">
                  An illustrative setting for our sample brand.
                </span>
              </div>
            </section>
            <WellnessClosing />
          </>
        ) : null}

        {standalonePage === "Treatments" ? (
          <>
            <WellnessIntro
              label="THE TREATMENT MENU"
              title="Thoughtful touch."
              emphasis="Your own rhythm."
            >
              A little time to listen, settle in and make the session your own. Explore our sample
              massage menu.
            </WellnessIntro>
            <section
              className="wellness-section wellness-treatment-page"
              aria-labelledby="wellness-menu-heading"
            >
              <div className="wellness-section-heading">
                <div>
                  <p className="wellness-eyebrow">FIND YOUR KIND OF PAUSE</p>
                  <h2 id="wellness-menu-heading">
                    Considered care.
                    <br />
                    <em>Room to choose.</em>
                  </h2>
                </div>
                <p>
                  Every session starts with your preferences. Pressure, focus and pace can be
                  discussed before you begin.
                </p>
              </div>
              <WellnessTreatmentList detailed />
              <div className="wellness-menu-note">
                <span>
                  Sample services and durations. This demonstration makes no practitioner or
                  treatment-outcome claims.
                </span>
                <Link className="wellness-text-link" href="/pricing">
                  View sample pricing
                  <WellnessArrow />
                </Link>
              </div>
            </section>
            <section
              className="wellness-section wellness-process"
              aria-labelledby="wellness-process-heading"
            >
              <div>
                <p className="wellness-eyebrow">A SIMPLE, CONSIDERED EXPERIENCE</p>
                <h2 id="wellness-process-heading">
                  From the first hello
                  <br />
                  <em>to your final exhale.</em>
                </h2>
              </div>
              <ol>
                <li>
                  <span>01</span>
                  <div>
                    <h3>Begin with a conversation</h3>
                    <p>Share your preferences and ask any questions before your session begins.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Settle into your own pace</h3>
                    <p>
                      Choose quiet or conversation. Ask for an adjustment, a pause or more
                      information at any time.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>Leave a little room</h3>
                    <p>Take a moment before returning to your day, and ask any final questions.</p>
                  </div>
                </li>
              </ol>
            </section>
            <WellnessClosing />
          </>
        ) : null}

        {standalonePage === "Pricing" ? (
          <>
            <WellnessIntro
              label="SIMPLE, THOUGHTFUL PRICING"
              title="Time for yourself."
              emphasis="Clearly considered."
            >
              Choose the time that fits your day. These sample rates show how a practice can make
              appointment options easy to understand.
            </WellnessIntro>
            <section
              className="wellness-section wellness-pricing"
              aria-labelledby="wellness-rates-heading"
            >
              <div className="wellness-section-heading">
                <div>
                  <p className="wellness-eyebrow">THE GIFT OF A LITTLE TIME</p>
                  <h2 id="wellness-rates-heading">
                    Find your
                    <br />
                    <em>moment.</em>
                  </h2>
                </div>
                <p>
                  Illustrative massage rates in Canadian dollars. No payment or booking is taken on
                  this website.
                </p>
              </div>
              <div className="wellness-rate-grid">
                {wellnessRates.map((rate, index) => (
                  <article
                    className={`wellness-rate${index === 1 ? " wellness-rate-featured" : ""}`}
                    key={rate.duration}
                  >
                    <span className="wellness-eyebrow">
                      {index === 0
                        ? "A FOCUSED PAUSE"
                        : index === 1
                          ? "A LITTLE BREATHING ROOM"
                          : "A LONGER EXHALE"}
                    </span>
                    <h3>
                      {rate.duration}
                      <span>minutes</span>
                    </h3>
                    <p>{rate.description}</p>
                    <strong>
                      ${rate.price}
                      <small>CAD · sample rate</small>
                    </strong>
                    <WellnessButton light={index === 1}>Explore booking</WellnessButton>
                  </article>
                ))}
              </div>
              <p className="wellness-small-note">
                Sample service prices only. Actual rates, applicable taxes, appointment inclusions
                and payment terms are confirmed by the practice before booking.
              </p>
            </section>
            <section
              className="wellness-section wellness-pricing-details"
              aria-labelledby="wellness-pricing-details-heading"
            >
              <div>
                <p className="wellness-eyebrow">A FEW PRACTICAL DETAILS</p>
                <h2 id="wellness-pricing-details-heading">
                  Clear before
                  <br />
                  <em>you arrive.</em>
                </h2>
              </div>
              <div>
                <article>
                  <h3>Your appointment</h3>
                  <p>
                    A live practice would confirm whether consultation and changing time are
                    included in the appointment length.
                  </p>
                </article>
                <article>
                  <h3>Receipts & payment</h3>
                  <p>
                    Payment methods, receipt details and any insurance eligibility would be
                    published using the practice’s verified information.
                  </p>
                </article>
                <article>
                  <h3>A change of plans</h3>
                  <p>
                    Cancellation and rescheduling terms would be shared before you confirm a
                    booking.
                  </p>
                </article>
                <Link className="wellness-text-link" href="/faq">
                  More things you may be wondering
                  <WellnessArrow />
                </Link>
              </div>
            </section>
            <WellnessClosing />
          </>
        ) : null}

        {standalonePage === "About" ? (
          <>
            <WellnessIntro
              label="THE EVERGREEN APPROACH"
              title="Rooted in care."
              emphasis="Made for your pace."
            >
              A simple idea: feeling welcome begins with being heard. A calm space, clear
              conversation and thoughtful attention.
            </WellnessIntro>
            <section
              className="wellness-section wellness-about-story"
              aria-labelledby="wellness-about-heading"
            >
              <div className="wellness-about-image">
                <Image
                  src="/images/collection/massage-room.webp"
                  alt="Illustrative wellness room with natural light and a linen-covered massage table"
                  fill
                  sizes="(max-width: 800px) 90vw, 44vw"
                />
                <span>AN ILLUSTRATIVE EVERGREEN SPACE</span>
              </div>
              <div>
                <p className="wellness-eyebrow">THE WAY WE SEE IT</p>
                <h2 id="wellness-about-heading">
                  Care is in
                  <br />
                  <em>the details.</em>
                </h2>
                <p className="wellness-lead">
                  A welcome that feels easy.
                  <br />A moment that feels like yours.
                </p>
                <p>
                  Evergreen imagines a practice where you can take your time, ask questions and be
                  part of the conversation. The atmosphere is quiet, the approach is considered, and
                  your comfort comes first.
                </p>
                <p>
                  That means clear information before your visit, room to talk about what you
                  prefer, and an experience that can adapt as you go.
                </p>
                <div className="wellness-sample-note">
                  <WellnessMark />
                  <p>
                    <strong>A sample brand, thoughtfully imagined.</strong>Evergreen Wellness is a
                    fictional demonstration practice. The space is illustrative; no real
                    practitioner, credentials or client reviews are represented.
                  </p>
                </div>
              </div>
            </section>
            <section
              className="wellness-section wellness-principles"
              aria-labelledby="wellness-principles-heading"
            >
              <div className="wellness-section-heading">
                <div>
                  <p className="wellness-eyebrow">SMALL PRINCIPLES. MEANINGFUL DETAILS.</p>
                  <h2 id="wellness-principles-heading">
                    What makes space
                    <br />
                    <em>feel welcoming.</em>
                  </h2>
                </div>
              </div>
              <div className="wellness-principle-grid">
                <article>
                  <span>01 / LISTEN</span>
                  <h3>Start by listening.</h3>
                  <p>
                    Your questions and preferences deserve time and attention before a session
                    begins.
                  </p>
                </article>
                <article>
                  <span>02 / INVOLVE</span>
                  <h3>Leave room for choice.</h3>
                  <p>
                    Comfort is personal. Speak up, ask for an adjustment or change your mind at any
                    point.
                  </p>
                </article>
                <article>
                  <span>03 / CONSIDER</span>
                  <h3>Make the details clear.</h3>
                  <p>
                    Thoughtful care starts with knowing what to expect, from pricing to the first
                    hello.
                  </p>
                </article>
              </div>
            </section>
            <WellnessClosing />
          </>
        ) : null}

        {standalonePage === "FAQ" ? (
          <>
            <WellnessIntro
              label="A LITTLE REASSURANCE"
              title="Before you arrive."
              emphasis="A few things to know."
            >
              An easier first visit starts with clear information. Explore the questions people
              might ask a wellness practice.
            </WellnessIntro>
            <section
              className="wellness-section wellness-faq"
              aria-labelledby="wellness-faq-heading"
            >
              <aside>
                <p className="wellness-eyebrow">YOUR QUESTIONS, WELCOME</p>
                <h2 id="wellness-faq-heading">
                  Feel a little
                  <br />
                  <em>more at home.</em>
                </h2>
                <p>
                  Something else on your mind?
                  <br />
                  There is always room to ask.
                </p>
                <Link className="wellness-text-link" href="/contact#enquiry">
                  Explore the enquiry form
                  <WellnessArrow />
                </Link>
                <WellnessMark />
              </aside>
              <div className="wellness-faq-groups">
                {["Before your visit", "Your comfort", "Booking & practical details"].map(
                  (group) => (
                    <div className="wellness-faq-group" key={group}>
                      <h3>{group}</h3>
                      {wellnessQuestions
                        .filter((item) => item.group === group)
                        .map((item) => (
                          <details key={item.question}>
                            <summary>
                              {item.question}
                              <span aria-hidden="true">＋</span>
                            </summary>
                            <p>{item.answer}</p>
                          </details>
                        ))}
                    </div>
                  ),
                )}
              </div>
            </section>
            <WellnessClosing />
          </>
        ) : null}

        {standalonePage === "Contact" ? (
          <>
            <WellnessIntro
              label="LET’S BEGIN WITH HELLO"
              title="A question. A pause."
              emphasis="A place to begin."
            >
              Find the details you need, explore the enquiry form, or see how booking could work for
              your practice.
            </WellnessIntro>
            <section
              className="wellness-section wellness-contact"
              id="enquiry"
              aria-labelledby="wellness-contact-heading"
            >
              <aside className="wellness-contact-info">
                <p className="wellness-eyebrow">A WARM WELCOME STARTS HERE</p>
                <h2 id="wellness-contact-heading">
                  We would love
                  <br />
                  <em>to hear from you.</em>
                </h2>
                <p>
                  These contact details belong to the sample brand. They are placeholders for a
                  practice’s real information.
                </p>
                <dl>
                  <div>
                    <dt>DEMO EMAIL</dt>
                    <dd>hello@example.com</dd>
                  </div>
                  <div>
                    <dt>DEMO PHONE · NON-WORKING</dt>
                    <dd>+1 (416) 555-0147</dd>
                  </div>
                  <div>
                    <dt>YOUR PRACTICE LOCATION</dt>
                    <dd>
                      Your studio address
                      <br />
                      Your city, province
                    </dd>
                  </div>
                  <div>
                    <dt>SAMPLE HOURS · BY APPOINTMENT</dt>
                    <dd>
                      Monday–Friday<span>9:00 am–6:00 pm</span>
                      <br />
                      Saturday<span>9:00 am–2:00 pm</span>
                    </dd>
                  </div>
                </dl>
                <div className="wellness-arrival-note">
                  <h3>A note before your visit</h3>
                  <p>
                    Real parking, building access and accessibility details would be confirmed here
                    before launch.
                  </p>
                </div>
              </aside>
              <div className="wellness-enquiry-panel">
                <p className="wellness-eyebrow">DEMONSTRATION ENQUIRY FORM</p>
                <h2>
                  A little note,
                  <br />
                  <em>to get started.</em>
                </h2>
                <WellnessEnquiryDemo />
              </div>
            </section>
            <section
              className="wellness-section wellness-booking"
              id="booking"
              aria-labelledby="wellness-booking-heading"
            >
              <div>
                <p className="wellness-eyebrow">YOUR MOMENT, MADE SIMPLE</p>
                <h2 id="wellness-booking-heading">
                  A little space
                  <br />
                  <em>in your calendar.</em>
                </h2>
                <p>
                  Explore a sample service and session length. On a finished practice website, this
                  is where your chosen booking provider can take over.
                </p>
                <p className="wellness-booking-disclosure">
                  Demonstration only. No live availability, payment or appointment reservation.
                </p>
                <WellnessMark />
              </div>
              <div className="wellness-booking-panel">
                <p className="wellness-eyebrow">BOOKING PREVIEW</p>
                <WellnessBookingDemo />
              </div>
            </section>
            <section className="wellness-contact-end">
              <WellnessMark />
              <p>
                Every good experience
                <br />
                <em>begins with a little care.</em>
              </p>
            </section>
          </>
        ) : null}
      </div>

      <footer className="wellness-footer">
        <div className="wellness-footer-main">
          <Link className="wellness-brand" href="/">
            <WellnessMark />
            <span>
              {wellnessBrand}
              <small>MASSAGE & MOMENTS OF CALM</small>
            </span>
          </Link>
          <p>A little space to simply be.</p>
          <nav aria-label="Wellness footer pages">
            {wellnessPages
              .filter((page) => page !== "Home")
              .map((page) => (
                <Link key={page} href={wellnessPagePath(page)}>
                  {page}
                </Link>
              ))}
          </nav>
        </div>
        <div className="wellness-footer-bottom">
          <p>Evergreen Wellness is a fictional sample brand. Illustrative imagery and content.</p>
          <span>THOUGHTFULLY MADE. QUIETLY CONSIDERED.</span>
        </div>
      </footer>
      <aside className="wellness-template-note" aria-label="About this website template">
        <div>
          <span>YOUR BRAND. THIS FEELING.</span>
          <p>
            Wellness & Massage website template <strong>{designPrice(design)}</strong>
          </p>
          <small>
            Six pages, your own content and branding. Before tax; final scope and provider fees
            confirmed separately.
          </small>
        </div>
        <a href={enquiryHref}>
          Make this website yours
          <WellnessArrow />
        </a>
      </aside>
    </div>
  );
}
