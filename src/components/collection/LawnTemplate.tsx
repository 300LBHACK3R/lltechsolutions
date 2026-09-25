import Image from "next/image";
import Link from "next/link";
import type { WebsiteDesign } from "@/data/website-collection";
import { lawnPages, lawnPagePath, type LawnPage } from "@/data/lawn-pages";
import {
  LawnArrow,
  LawnGrassRail,
  LawnMark,
  LawnServiceMark,
} from "@/components/collection/LawnMarks";

const services = [
  {
    name: "Regular mowing",
    kind: "mow",
    note: "A fresh start, every visit.",
    description:
      "An even cut and a tidy finish, with a mowing routine shaped around your lawn and the growing season.",
    includes: [
      "Mowing accessible lawn areas",
      "A cutting height suited to the conditions",
      "Clearing clippings from paths and hard surfaces",
    ],
    discuss: "Lawn size, access and how often you would like a visit.",
  },
  {
    name: "Edging & trimming",
    kind: "edge",
    note: "The details make the difference.",
    description:
      "Neat borders along paths and garden beds, with careful trimming around the places a mower cannot reach.",
    includes: [
      "Trimming around lawn obstacles",
      "Defining existing lawn edges",
      "Tidying adjoining paths after the work",
    ],
    discuss: "Existing borders, obstacles and any delicate planting.",
  },
  {
    name: "Seasonal cleanup",
    kind: "leaf",
    note: "Ready for what comes next.",
    description:
      "A practical refresh as the seasons change, clearing the loose leaves and garden debris that gather over time.",
    includes: [
      "Collecting fallen leaves and loose debris",
      "Tidying lawn areas and garden paths",
      "Agreeing on green-waste handling before the visit",
    ],
    discuss: "The current condition, waste volume and the areas to include.",
  },
] as const;

function LawnContactLink({
  children = "Let’s talk lawn care",
  className = "lawn-button",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link className={className} href={lawnPagePath("Contact")}>
      {children}
      <LawnArrow />
    </Link>
  );
}

function LawnPageIntro({
  number,
  label,
  title,
  emphasis,
  children,
}: {
  number: string;
  label: string;
  title: string;
  emphasis: string;
  children: React.ReactNode;
}) {
  return (
    <header className="lawn-page-intro">
      <p className="lawn-eyebrow">
        <span>{number}</span>
        {label}
      </p>
      <div>
        <h1 id="lawn-page-heading">
          {title}
          <br />
          <em>{emphasis}</em>
        </h1>
        <p className="lawn-intro-copy">{children}</p>
      </div>
    </header>
  );
}

function LawnClosing() {
  return (
    <section className="lawn-closing" aria-labelledby="lawn-closing-heading">
      <LawnMark />
      <div>
        <p className="lawn-eyebrow">A LITTLE CARE GOES A LONG WAY</p>
        <h2 id="lawn-closing-heading">
          Make room for <em>more outside.</em>
        </h2>
      </div>
      <LawnContactLink />
    </section>
  );
}

export default function LawnTemplate({
  design,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  standalonePage: LawnPage;
  enquiryHref: string;
}) {
  const brand = design.concept?.brands[0] ?? "LAWN STUDIO";
  return (
    <div className="lawn-site" data-lawn-root>
      <header className="lawn-header">
        <div className="lawn-header-inner">
          <Link className="lawn-brand" href={lawnPagePath("Home")} aria-label={`${brand} home`}>
            <LawnMark />
            <span>
              {brand}
              <small>LAWN & GARDEN CARE</small>
            </span>
          </Link>
          <nav className="lawn-nav" aria-label="Lawn care pages">
            {lawnPages.map((page) => (
              <Link
                key={page}
                href={lawnPagePath(page)}
                aria-current={standalonePage === page ? "page" : undefined}
              >
                {page}
                {page === "Contact" ? <LawnArrow /> : null}
              </Link>
            ))}
          </nav>
        </div>
        <LawnGrassRail animated />
      </header>

      <div className="lawn-page" aria-labelledby="lawn-page-heading">
        {standalonePage === "Home" ? (
          <>
            <section className="lawn-hero">
              <div className="lawn-hero-copy">
                <p className="lawn-eyebrow">
                  <span className="lawn-dot" />
                  GOOD CARE. GREAT OUTDOORS.
                </p>
                <h1 id="lawn-page-heading">
                  A well-kept lawn.
                  <br />
                  <em>
                    A little more
                    <br />
                    weekend.
                  </em>
                </h1>
                <p>
                  Thoughtful lawn care, from the first cut to the final tidy-up. A fresh finish for
                  your outdoor space. More time to enjoy it.
                </p>
                <Link className="lawn-button" href={lawnPagePath("Services")}>
                  Explore our services
                  <LawnArrow />
                </Link>
                <div className="lawn-hero-footnote">
                  <span>01 / THE EVERYDAY, WELL CARED FOR</span>
                  <span>Mowing · Edging · Seasonal care</span>
                </div>
              </div>
              <div className="lawn-hero-photo">
                <Image
                  src="/images/collection/lawn-hero.webp"
                  alt="Illustrative freshly mown lawn with clean stripes beside a planted garden"
                  fill
                  sizes="(max-width: 760px) 100vw, 49vw"
                  loading="eager"
                />
                <div className="lawn-photo-note">
                  <LawnMark />
                  <span>
                    For the love
                    <br />
                    <em>of outside.</em>
                  </span>
                </div>
                <span className="lawn-photo-label">LAWN CARE INSPIRATION</span>
              </div>
            </section>
            <section className="lawn-services-preview" aria-labelledby="lawn-services-heading">
              <div className="lawn-section-heading">
                <div>
                  <p className="lawn-eyebrow">A GOOD LAWN STARTS HERE</p>
                  <h2 id="lawn-services-heading">
                    Simple care.
                    <br />
                    <em>A lovely difference.</em>
                  </h2>
                </div>
                <p>
                  From a regular cut to a seasonal reset, it is the small, considered details that
                  bring an outdoor space together.
                </p>
              </div>
              <div className="lawn-service-cards">
                {services.map((service, index) => (
                  <Link
                    href={`${lawnPagePath("Services")}#${service.kind}`}
                    className="lawn-service-card"
                    key={service.kind}
                  >
                    <div>
                      <span className="lawn-eyebrow">0{index + 1}</span>
                      <LawnServiceMark kind={service.kind} />
                    </div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <span className="lawn-text-link">
                      Explore the service
                      <LawnArrow />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
            <section className="lawn-detail-feature" aria-labelledby="lawn-detail-heading">
              <div className="lawn-detail-photo">
                <Image
                  src="/images/collection/lawn-detail.webp"
                  alt="Illustrative close view of a neatly edged lawn meeting a garden path"
                  fill
                  sizes="(max-width:760px) 100vw, 50vw"
                />
                <span className="lawn-photo-label">AN EYE FOR THE EDGES</span>
              </div>
              <div className="lawn-detail-copy">
                <p className="lawn-eyebrow">THE FINISH IS IN THE DETAILS</p>
                <h2 id="lawn-detail-heading">
                  Freshly cut.
                  <br />
                  Carefully edged.
                  <br />
                  <em>Ready to enjoy.</em>
                </h2>
                <p>
                  A lawn is part of everyday life: the view from the kitchen, the space around a
                  garden, the place to spend a slow afternoon. Give it a little considered care.
                </p>
                <Link className="lawn-text-link" href={lawnPagePath("Our Work")}>
                  See the inspiration
                  <LawnArrow />
                </Link>
              </div>
            </section>
            <LawnClosing />
          </>
        ) : standalonePage === "Services" ? (
          <>
            <LawnPageIntro
              number="01"
              label="WHAT WE DO"
              title="Good care, from"
              emphasis="edge to edge."
            >
              Every lawn is a little different. Start with the work your space needs, then talk
              through the details for a clear, practical plan.
            </LawnPageIntro>
            <div className="lawn-service-list">
              {services.map((service, index) => (
                <section
                  className="lawn-service-row"
                  id={service.kind}
                  key={service.kind}
                  aria-labelledby={`lawn-service-${service.kind}`}
                >
                  <div className="lawn-service-number">
                    <span>0{index + 1}</span>
                    <LawnServiceMark kind={service.kind} />
                  </div>
                  <div className="lawn-service-description">
                    <p className="lawn-eyebrow">{service.note}</p>
                    <h2 id={`lawn-service-${service.kind}`}>{service.name}</h2>
                    <p>{service.description}</p>
                  </div>
                  <div className="lawn-service-inclusions">
                    <p className="lawn-eyebrow">THE WORK, IN A LITTLE MORE DETAIL</p>
                    <ul>
                      {service.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p>
                      <strong>Let’s talk about:</strong> {service.discuss}
                    </p>
                    <LawnContactLink className="lawn-text-link">Discuss your lawn</LawnContactLink>
                  </div>
                </section>
              ))}
            </div>
            <section className="lawn-process" aria-labelledby="lawn-process-heading">
              <div>
                <p className="lawn-eyebrow">A CLEAR START</p>
                <h2 id="lawn-process-heading">
                  A few details.
                  <br />
                  <em>A considered plan.</em>
                </h2>
              </div>
              <ol>
                <li>
                  <span>01</span>
                  <div>
                    <h3>Tell us about your space.</h3>
                    <p>
                      Share the approximate lawn size, current condition and the care you have in
                      mind.
                    </p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Talk through the practicalities.</h3>
                    <p>
                      Confirm access, any obstacles, waste handling and a suitable visit schedule.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>Agree before the first cut.</h3>
                    <p>Settle the work, price and timing before making a booking.</p>
                  </div>
                </li>
              </ol>
            </section>
            <LawnClosing />
          </>
        ) : standalonePage === "Our Work" ? (
          <>
            <LawnPageIntro
              number="02"
              label="THE LOOK & THE DETAILS"
              title="The kind of finish"
              emphasis="that feels good."
            >
              A fresh cut. A defined edge. A space that is ready to enjoy. Explore the details
              behind a well-kept lawn.
            </LawnPageIntro>
            <p className="lawn-gallery-notice">
              <span className="lawn-dot" />
              <span>
                <strong>Illustrative inspiration.</strong> These scenes demonstrate the website
                design and are not photographs of completed client jobs.
              </span>
            </p>
            <div className="lawn-work-gallery">
              <figure className="lawn-work-feature">
                <div className="lawn-work-photo">
                  <Image
                    src="/images/collection/lawn-hero.webp"
                    alt="Illustrative lawn-care scene with an evenly cut lawn and a planted garden border"
                    width={1536}
                    height={1024}
                    sizes="(max-width:760px) 100vw, 90vw"
                  />
                </div>
                <figcaption>
                  <span className="lawn-eyebrow">01 / REGULAR MOWING</span>
                  <div>
                    <h2>
                      Room to <em>enjoy the everyday.</em>
                    </h2>
                    <p>
                      An even cut gives a garden an easy, cared-for feel. Regular attention keeps
                      the lawn part of the space you want to spend time in.
                    </p>
                  </div>
                  <span className="lawn-scene-label">Illustrative scene</span>
                </figcaption>
              </figure>
              <figure className="lawn-work-detail">
                <div className="lawn-work-photo">
                  <Image
                    src="/images/collection/lawn-detail.webp"
                    alt="Illustrative crisp lawn edge beside a stone path and soft garden planting"
                    width={1536}
                    height={1024}
                    sizes="(max-width:760px) 100vw, 54vw"
                  />
                </div>
                <figcaption>
                  <span className="lawn-eyebrow">02 / EDGING & TRIMMING</span>
                  <h2>
                    Small details.
                    <br />
                    <em>A complete finish.</em>
                  </h2>
                  <p>
                    The line between a lawn and a path helps define the whole garden. A careful trim
                    brings the edges back into focus.
                  </p>
                  <span className="lawn-scene-label">Illustrative scene</span>
                </figcaption>
              </figure>
            </div>
            <LawnClosing />
          </>
        ) : (
          <>
            <LawnPageIntro
              number="03"
              label="LET’S TALK"
              title="A greener space"
              emphasis="starts with hello."
            >
              Whether your lawn needs regular attention or a seasonal tidy-up, a few simple details
              are a good place to start.
            </LawnPageIntro>
            <section className="lawn-contact-layout" aria-labelledby="lawn-contact-heading">
              <div className="lawn-contact-card">
                <LawnMark />
                <p className="lawn-eyebrow">DIRECT CONTACT</p>
                <h2 id="lawn-contact-heading">
                  A conversation.
                  <br />
                  <em>A fresh start.</em>
                </h2>
                <div className="lawn-demo-contact">
                  <span>DEMO EMAIL — EXAMPLE ONLY</span>
                  <p>hello@example.com</p>
                </div>
                <p className="lawn-contact-explanation">
                  This is a sample business. On your live website, this space will show your real
                  phone number and email, with working tap-to-call and email links.
                </p>
                <div className="lawn-contact-note">
                  <span className="lawn-dot" />
                  <p>No bookings or lawn-care enquiries are accepted through this demo.</p>
                </div>
              </div>
              <div className="lawn-contact-guidance">
                <p className="lawn-eyebrow">BEFORE WE TALK</p>
                <h2>
                  A little about
                  <br />
                  <em>your lawn.</em>
                </h2>
                <p>
                  These details make it easier to understand the work and discuss a suitable visit.
                </p>
                <ol>
                  <li>
                    <span>01</span>
                    <div>
                      <h3>The space</h3>
                      <p>
                        Your neighbourhood, approximate lawn size and a few photos of its current
                        condition.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <div>
                      <h3>The care</h3>
                      <p>
                        Regular mowing, edging and trimming, a seasonal cleanup, or a combination.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <div>
                      <h3>The practical details</h3>
                      <p>Gate access, pets, garden obstacles and your preferred timing.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>
            <section className="lawn-own-site" aria-labelledby="lawn-own-site-heading">
              <div>
                <p className="lawn-eyebrow">LIKE THE LOOK?</p>
                <h2 id="lawn-own-site-heading">
                  Your business.
                  <br />
                  <em>A fresh online home.</em>
                </h2>
                <p>
                  This four-page lawn-care template can be personalised with your name, services,
                  photographs and direct contact details.
                </p>
              </div>
              <Link className="lawn-button" href={enquiryHref}>
                Make this my website
                <LawnArrow />
              </Link>
            </section>
          </>
        )}
      </div>

      <footer className="lawn-footer">
        <div className="lawn-footer-main">
          <Link className="lawn-brand" href={lawnPagePath("Home")}>
            <LawnMark />
            <span>
              {brand}
              <small>LAWN & GARDEN CARE</small>
            </span>
          </Link>
          <p>
            A little care.
            <br />
            <em>More life outside.</em>
          </p>
          <nav aria-label="Lawn care footer">
            {lawnPages.map((page) => (
              <Link key={page} href={lawnPagePath(page)}>
                {page}
              </Link>
            ))}
          </nav>
        </div>
        <div className="lawn-footer-bottom">
          <p>Illustrative lawn-care website · Sample business</p>
          <Link href={enquiryHref}>
            A website by L&L
            <LawnArrow />
          </Link>
        </div>
      </footer>
    </div>
  );
}
