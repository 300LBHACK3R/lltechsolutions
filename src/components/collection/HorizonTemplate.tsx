import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { WebsiteDesign } from "@/data/website-collection";
import { horizonPages, horizonPagePath, type HorizonPage } from "@/data/horizon-pages";
import { horizonProjects, horizonQuestions, horizonServices } from "@/data/horizon-content";
import { HorizonArrow, HorizonContours, HorizonMark } from "@/components/collection/HorizonMarks";
import { HorizonProjectGallery } from "@/components/collection/HorizonInteractions";

function HorizonButton({
  page = "Contact",
  children = "Start a conversation",
  secondary = false,
}: {
  page?: HorizonPage;
  children?: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`horizon-button${secondary ? " horizon-button-secondary" : ""}`}
      href={horizonPagePath(page)}
    >
      {children}
      <HorizonArrow />
    </Link>
  );
}

function HorizonIntro({
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
  children: ReactNode;
}) {
  return (
    <header className="horizon-page-intro">
      <div className="horizon-intro-label">
        <p className="horizon-eyebrow">
          <span className="horizon-line" />
          {label}
        </p>
        <span>{number} / 04</span>
      </div>
      <h1 id="horizon-page-heading">
        {title}
        <br />
        <em>{emphasis}</em>
      </h1>
      <p className="horizon-intro-description">{children}</p>
      <HorizonContours />
    </header>
  );
}

function HorizonClosing() {
  return (
    <section className="horizon-closing" aria-labelledby="horizon-closing-heading">
      <Image src="/images/collection/earthworks-landscape.webp" alt="" fill sizes="100vw" />
      <div>
        <p className="horizon-eyebrow">
          <span className="horizon-line" />
          MAKE ROOM FOR WHAT’S NEXT
        </p>
        <h2 id="horizon-closing-heading">
          Your outdoors.
          <br />
          <em>A new perspective.</em>
        </h2>
        <p>
          A new garden, a better path, a place to gather. Every good landscape starts with a
          conversation.
        </p>
        <HorizonButton />
      </div>
      <span className="horizon-closing-number" aria-hidden="true">
        ↗
      </span>
    </section>
  );
}

function HorizonCoverage() {
  return (
    <section className="horizon-coverage" aria-labelledby="horizon-coverage-heading">
      <div>
        <p className="horizon-eyebrow">ROOTED IN YOUR COMMUNITY</p>
        <h2 id="horizon-coverage-heading">
          Local ground.
          <br />
          <em>Lasting possibilities.</em>
        </h2>
      </div>
      <div className="horizon-coverage-copy">
        <p>
          Good work begins with a feel for the place. Your local conditions, your property, and the
          way you want to use it.
        </p>
        <Link className="horizon-text-link" href={`${horizonPagePath("Contact")}#coverage`}>
          Explore service coverage
          <HorizonArrow />
        </Link>
      </div>
      <div className="horizon-coverage-map">
        <HorizonContours />
        <span className="horizon-map-pin">
          <HorizonMark />
        </span>
        <p>
          YOUR CITY & SURROUNDING COMMUNITIES
          <small>Sample coverage · Customised for your business</small>
        </p>
      </div>
    </section>
  );
}

export default function HorizonTemplate({
  design,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  standalonePage: HorizonPage;
  enquiryHref: string;
}) {
  const brand = design.concept?.brands[0] ?? "LANDSCAPE STUDIO";
  const price =
    design.startingPriceCad === null
      ? null
      : new Intl.NumberFormat("en-CA", {
          style: "currency",
          currency: "CAD",
          maximumFractionDigits: 0,
        }).format(design.startingPriceCad);
  return (
    <div
      className="horizon-site"
      data-horizon-root
      data-horizon-page={standalonePage.toLowerCase()}
    >
      <header className="horizon-header">
        <Link className="horizon-brand" href={horizonPagePath("Home")} aria-label={`${brand} home`}>
          <HorizonMark />
          <span>
            {brand}
            <small>LANDSCAPE & OUTDOOR SERVICES</small>
          </span>
        </Link>
        <nav className="horizon-nav" aria-label="Landscape website pages">
          {horizonPages.map((page) => (
            <Link
              key={page}
              href={horizonPagePath(page)}
              aria-current={standalonePage === page ? "page" : undefined}
            >
              {page}
              {page === "Contact" ? <HorizonArrow /> : null}
            </Link>
          ))}
        </nav>
        <details className="horizon-mobile-nav">
          <summary>
            Menu<span aria-hidden="true">＋</span>
          </summary>
          <nav aria-label="Landscape mobile pages">
            {horizonPages.map((page) => (
              <Link
                key={page}
                href={horizonPagePath(page)}
                aria-current={standalonePage === page ? "page" : undefined}
              >
                {page}
                <HorizonArrow />
              </Link>
            ))}
          </nav>
        </details>
      </header>

      <div className="horizon-page" aria-labelledby="horizon-page-heading">
        {standalonePage === "Home" ? (
          <>
            <section className="horizon-hero">
              <Image
                className="horizon-hero-image"
                src="/images/collection/earthworks-landscape.webp"
                alt="Illustrative landscape with stone terraces, layered planting and a mountain outlook"
                fill
                sizes="100vw"
                loading="eager"
              />
              <div className="horizon-hero-content">
                <p className="horizon-eyebrow">
                  <span className="horizon-line" />
                  LANDSCAPE. BUILD. CARE.
                </p>
                <h1 id="horizon-page-heading">
                  Outdoor work.
                  <br />
                  <em>Built to perform.</em>
                </h1>
                <p className="horizon-hero-description">
                  Considered landscapes. Practical foundations. From the first ground broken to the
                  finishing touch, make more of your outdoors.
                </p>
                <div className="horizon-hero-actions">
                  <HorizonButton>Discuss your project</HorizonButton>
                  <HorizonButton page="Services" secondary>
                    Explore our services
                  </HorizonButton>
                </div>
              </div>
              <a href="#capabilities" className="horizon-scroll-link">
                <span aria-hidden="true">↓</span>SCROLL TO EXPLORE
              </a>
              <div className="horizon-hero-note">
                <span className="horizon-eyebrow">THE BIG PICTURE. THE SMALL DETAILS.</span>
                <p>
                  Grounded in purpose.
                  <br />
                  Made for everyday life.
                </p>
                <span>ILLUSTRATIVE LANDSCAPE CONCEPT / 01</span>
              </div>
            </section>
            <div className="horizon-service-rail" aria-label="Landscape service types">
              <span>Landscape construction</span>
              <i aria-hidden="true" />
              <span>Site preparation</span>
              <i aria-hidden="true" />
              <span>Planting & irrigation</span>
              <i aria-hidden="true" />
              <span>Property care</span>
            </div>

            <section
              className="horizon-capabilities horizon-section"
              id="capabilities"
              aria-labelledby="horizon-capabilities-heading"
            >
              <div className="horizon-section-heading">
                <div>
                  <p className="horizon-eyebrow">
                    <span className="horizon-line" />A CONNECTED APPROACH
                  </p>
                  <h2 id="horizon-capabilities-heading">
                    From the ground up.
                    <br />
                    <em>And through the seasons.</em>
                  </h2>
                </div>
                <p>
                  Bring the practical work and the finishing details together. Explore a landscape
                  service for every stage of your outdoor space.
                </p>
              </div>
              <div className="horizon-service-cards">
                {horizonServices.map((service, index) => (
                  <Link
                    className="horizon-service-card"
                    key={service.id}
                    href={`${horizonPagePath("Services")}#${service.id}`}
                  >
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 23vw"
                    />
                    <span className="horizon-service-number">0{index + 1}</span>
                    <div>
                      <h3>{service.name}</h3>
                      <p>{service.intro}</p>
                      <span className="horizon-text-link">
                        VIEW SERVICE
                        <HorizonArrow />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="horizon-approach" aria-labelledby="horizon-approach-heading">
              <div className="horizon-approach-photo">
                <Image
                  src="/images/collection/earthworks-site.webp"
                  alt="Illustrative excavation equipment beside prepared ground and stonework"
                  fill
                  sizes="(max-width: 700px) 100vw, 52vw"
                />
                <span className="horizon-image-label">EVERY FINISH STARTS WITH A FOUNDATION.</span>
              </div>
              <div className="horizon-approach-copy">
                <p className="horizon-eyebrow">
                  <span className="horizon-line" />
                  PURPOSE IN EVERY DETAIL
                </p>
                <h2 id="horizon-approach-heading">
                  The groundwork
                  <br />
                  makes the
                  <br />
                  <em>difference.</em>
                </h2>
                <p>
                  A landscape is more than the way it looks. It is how the path meets the entrance,
                  how the site handles water, and how the planting grows into its place.
                </p>
                <p>
                  Start with the whole picture. Shape the plan around your property, then work
                  through the details that bring it together.
                </p>
                <Link
                  className="horizon-text-link"
                  href={`${horizonPagePath("Services")}#approach`}
                >
                  Our approach to your project
                  <HorizonArrow />
                </Link>
              </div>
            </section>
            <HorizonCoverage />

            <section
              className="horizon-selected horizon-section"
              aria-labelledby="horizon-selected-heading"
            >
              <div className="horizon-section-heading">
                <div>
                  <p className="horizon-eyebrow">
                    <span className="horizon-line" />A SENSE OF POSSIBILITY
                  </p>
                  <h2 id="horizon-selected-heading">
                    Spaces with
                    <br />
                    <em>something to say.</em>
                  </h2>
                </div>
                <div>
                  <p>
                    Stone, texture and room to grow. A few illustrative scenes to help you picture
                    what comes next.
                  </p>
                  <Link className="horizon-text-link" href={horizonPagePath("Projects")}>
                    Explore the project gallery
                    <HorizonArrow />
                  </Link>
                </div>
              </div>
              <div className="horizon-selected-grid">
                {horizonProjects.slice(0, 3).map((project) => (
                  <Link
                    href={`${horizonPagePath("Projects")}#${project.id}`}
                    className="horizon-selected-card"
                    key={project.id}
                  >
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, 60vw"
                    />
                    <div>
                      <span className="horizon-eyebrow">{project.categoryLabel}</span>
                      <h3>{project.name}</h3>
                    </div>
                    <span className="horizon-round-arrow">
                      <HorizonArrow diagonal />
                    </span>
                  </Link>
                ))}
              </div>
              <p className="horizon-small-note">
                Illustrative project scenes for this sample website. Your live gallery will feature
                your own approved work.
              </p>
            </section>
            <HorizonClosing />
          </>
        ) : null}

        {standalonePage === "Services" ? (
          <>
            <HorizonIntro
              number="02"
              label="OUR CAPABILITIES"
              title="Good ground."
              emphasis="Great possibilities."
            >
              A connected approach to the outdoor space, from practical site preparation to the
              details that make it yours.
            </HorizonIntro>
            <nav className="horizon-service-jump" aria-label="Jump to a service">
              {horizonServices.map((service, index) => (
                <a key={service.id} href={`#${service.id}`}>
                  <span>0{index + 1}</span>
                  {service.name}
                  <span aria-hidden="true">↓</span>
                </a>
              ))}
            </nav>
            <section className="horizon-services-detail" aria-label="Landscape service details">
              {horizonServices.map((service, index) => (
                <article className="horizon-service-detail" id={service.id} key={service.id}>
                  <div className="horizon-service-detail-photo">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                    />
                    <span>{service.shortName}</span>
                  </div>
                  <div className="horizon-service-detail-copy">
                    <p className="horizon-eyebrow">
                      <span className="horizon-line" />0{index + 1} / {service.name}
                    </p>
                    <h2>{service.intro}</h2>
                    <p>{service.description}</p>
                    <details className="horizon-scope" open>
                      <summary>
                        What we can discuss<span aria-hidden="true">＋</span>
                      </summary>
                      <ul>
                        {service.scope.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </details>
                    <p className="horizon-discuss">
                      <strong>A useful starting point</strong>
                      {service.discuss}
                    </p>
                    <HorizonButton>Discuss this service</HorizonButton>
                  </div>
                </article>
              ))}
            </section>
            <section
              className="horizon-process horizon-section"
              id="approach"
              aria-labelledby="horizon-process-heading"
            >
              <div className="horizon-section-heading">
                <div>
                  <p className="horizon-eyebrow">
                    <span className="horizon-line" />A CLEAR WAY FORWARD
                  </p>
                  <h2 id="horizon-process-heading">
                    The plan matters.
                    <br />
                    <em>So does the process.</em>
                  </h2>
                </div>
                <p>
                  A useful framework for taking an outdoor idea from the first conversation to the
                  final walkthrough.
                </p>
              </div>
              <ol>
                {[
                  {
                    title: "Start with the site.",
                    copy: "Talk through the space, the challenges and what you want to achieve. Photos, plans and a site visit help define the starting point.",
                  },
                  {
                    title: "Put the details in place.",
                    copy: "Agree on the scope, materials, access and sequence. Identify specialist work and approvals before the build begins.",
                  },
                  {
                    title: "Bring the space together.",
                    copy: "Coordinate the work, review the finishing details and talk through the care the completed landscape will need.",
                  },
                ].map((step, index) => (
                  <li key={step.title}>
                    <span>0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section className="horizon-faq horizon-section" aria-labelledby="horizon-faq-heading">
              <div>
                <p className="horizon-eyebrow">BEFORE YOU BEGIN</p>
                <h2 id="horizon-faq-heading">
                  A few
                  <br />
                  <em>good questions.</em>
                </h2>
              </div>
              <div>
                {horizonQuestions.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                      <span aria-hidden="true">＋</span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
            <HorizonClosing />
          </>
        ) : null}

        {standalonePage === "Projects" ? (
          <>
            <HorizonIntro
              number="03"
              label="THE PROJECT GALLERY"
              title="A different view."
              emphasis="Of what’s possible."
            >
              Explore materials, planting and outdoor spaces. These illustrative scenes show how
              your own project gallery could bring your work to life.
            </HorizonIntro>
            <section
              className="horizon-gallery-section horizon-section"
              aria-label="Illustrative landscape project gallery"
            >
              <div className="horizon-gallery-note">
                <span className="horizon-dot" />
                <p>
                  Concept imagery · These are illustrative scenes, not completed client projects.
                </p>
              </div>
              <HorizonProjectGallery />
            </section>
            <section className="horizon-materials" aria-labelledby="horizon-materials-heading">
              <div>
                <p className="horizon-eyebrow">
                  <span className="horizon-line" />
                  LOOK A LITTLE CLOSER
                </p>
                <h2 id="horizon-materials-heading">
                  A place is made
                  <br />
                  <em>in the details.</em>
                </h2>
                <p>
                  The edge of a path. The texture of stone. The movement of a planted border. The
                  small choices give a landscape its character.
                </p>
                <HorizonButton page="Services">Explore the capabilities</HorizonButton>
              </div>
              <div className="horizon-materials-photo">
                <Image
                  src="/images/collection/earthworks-detail.webp"
                  alt="Illustrative detail of textured stone, gravel drainage and a paved garden path"
                  fill
                  sizes="(max-width: 700px) 100vw, 55vw"
                />
              </div>
            </section>
            <HorizonClosing />
          </>
        ) : null}

        {standalonePage === "Contact" ? (
          <>
            <HorizonIntro
              number="04"
              label="START A CONVERSATION"
              title="Your next chapter."
              emphasis="Starts outside."
            >
              A new idea or a practical problem to solve? Start with the space, the location and
              what you have in mind.
            </HorizonIntro>
            <section
              className="horizon-contact-section horizon-section"
              aria-labelledby="horizon-contact-heading"
            >
              <div className="horizon-contact-card">
                <p className="horizon-eyebrow">
                  <span className="horizon-line" />A DIRECT CONNECTION
                </p>
                <h2 id="horizon-contact-heading">
                  Let’s talk
                  <br />
                  <em>outdoors.</em>
                </h2>
                <p>
                  Your live website will connect customers directly with your business by phone and
                  email.
                </p>
                <div className="horizon-demo-contact">
                  <span>DEMO PHONE — EXAMPLE ONLY</span>
                  <p>(250) 555-0142</p>
                  <small>Tap-to-call with your real number on the live site.</small>
                </div>
                <div className="horizon-demo-contact">
                  <span>DEMO EMAIL — EXAMPLE ONLY</span>
                  <p>hello@example.com</p>
                  <small>A direct email link using your business address.</small>
                </div>
                <p className="horizon-contact-disclosure">
                  Sample business details are deliberately inactive. No landscaping enquiries or
                  bookings are accepted through this demo.
                </p>
                <HorizonMark />
              </div>
              <div className="horizon-contact-preparation">
                <p className="horizon-eyebrow">A LITTLE CONTEXT GOES A LONG WAY</p>
                <h2>
                  Tell us about
                  <br />
                  <em>your space.</em>
                </h2>
                <p>
                  These details make the first conversation useful. Keep them handy when contacting
                  your landscape contractor.
                </p>
                <ol>
                  <li>
                    <span>01</span>
                    <div>
                      <h3>The place</h3>
                      <p>
                        Your general location, property type and a few photos of the area you have
                        in mind.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <div>
                      <h3>The possibilities</h3>
                      <p>
                        What you want to change, what is already working, and any materials or ideas
                        you like.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <div>
                      <h3>The practical details</h3>
                      <p>
                        Approximate dimensions, access, your preferred timing and a comfortable
                        budget range.
                      </p>
                    </div>
                  </li>
                </ol>
                <Link className="horizon-text-link" href={horizonPagePath("Services")}>
                  Not sure where to start? Explore services
                  <HorizonArrow />
                </Link>
              </div>
            </section>
            <section
              className="horizon-contact-info horizon-section"
              id="coverage"
              aria-labelledby="horizon-contact-coverage-heading"
            >
              <div>
                <p className="horizon-eyebrow">CLOSE TO HOME</p>
                <h2 id="horizon-contact-coverage-heading">
                  Your community.
                  <br />
                  <em>Your service area.</em>
                </h2>
                <p>
                  A clear service area helps customers know when to get in touch. This sample
                  information is customised for your business before launch.
                </p>
              </div>
              <div className="horizon-contact-info-panel">
                <div>
                  <h3>Sample coverage</h3>
                  <p>Your city and nearby communities</p>
                  <small>Residential properties · Shared outdoor spaces · Commercial grounds</small>
                </div>
                <div>
                  <h3>Sample office hours</h3>
                  <dl>
                    <div>
                      <dt>Monday–Friday</dt>
                      <dd>8:00 am–5:00 pm</dd>
                    </div>
                    <div>
                      <dt>Saturday–Sunday</dt>
                      <dd>By arrangement</dd>
                    </div>
                  </dl>
                  <small>Example hours only; replaced with your actual availability.</small>
                </div>
                <HorizonContours />
              </div>
            </section>
            <section
              className="horizon-own-site horizon-section"
              aria-labelledby="horizon-own-site-heading"
            >
              <div>
                <p className="horizon-eyebrow">
                  <span className="horizon-line" />
                  FOR YOUR BUSINESS
                </p>
                <h2 id="horizon-own-site-heading">
                  Good work deserves
                  <br />
                  <em>a great website.</em>
                </h2>
                <p>
                  Make this four-page landscape website your own, with your branding, services,
                  approved project photos and direct contact details.
                </p>
              </div>
              <div className="horizon-own-site-action">
                {price ? (
                  <p>
                    From <strong>{price}</strong> CAD
                  </p>
                ) : null}
                <span>4 pages · Direct phone & email contact</span>
                <Link className="horizon-button" href={enquiryHref}>
                  Ask L&L about this design
                  <HorizonArrow />
                </Link>
                <small>This opens a real website enquiry with L&L.</small>
              </div>
            </section>
          </>
        ) : null}
      </div>

      <footer className="horizon-footer">
        <div className="horizon-footer-top">
          <Link className="horizon-brand" href={horizonPagePath("Home")}>
            <HorizonMark />
            <span>
              {brand}
              <small>LANDSCAPE & OUTDOOR SERVICES</small>
            </span>
          </Link>
          <p>
            Good ground.
            <br />
            <em>Great possibilities.</em>
          </p>
          <nav aria-label="Landscape footer pages">
            {horizonPages.map((page) => (
              <Link href={horizonPagePath(page)} key={page}>
                {page}
              </Link>
            ))}
          </nav>
        </div>
        <div className="horizon-footer-bottom">
          <p>Illustrative landscape website · Sample business</p>
          <span>LANDSCAPE. BUILD. CARE.</span>
          <Link href={enquiryHref}>
            A website by L&L
            <HorizonArrow diagonal />
          </Link>
        </div>
      </footer>
    </div>
  );
}
