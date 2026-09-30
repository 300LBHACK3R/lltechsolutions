import Image from "next/image";
import Link from "next/link";
import type { HomePropertyTemplate } from "@/data/website-collection";
import HomePropertyHero from "@/components/collection/HomePropertyHero";
import {
  HomePropertyNavigation,
  MaterialPalette,
  PropertyFinder,
  PropertyPathways,
  RoomSelector,
} from "@/components/collection/HomePropertyInteractions";
import DemoEnquiryForm from "@/components/collection/DemoEnquiryForm";

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="hp-section-intro">
      <div>
        <p className="hp-kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function ServiceList({
  template,
  expanded = false,
}: {
  template: HomePropertyTemplate;
  expanded?: boolean;
}) {
  return (
    <div className="hp-services-list">
      {template.services.map((service, index) => (
        <article key={service.name}>
          <span className="hp-service-number">0{index + 1}</span>
          <div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            {expanded ? (
              <p className="hp-service-detail">{service.detail}</p>
            ) : (
              <details>
                <summary>
                  What’s involved <span aria-hidden="true">+</span>
                </summary>
                <p>{service.detail}</p>
              </details>
            )}
          </div>
          <span className="hp-service-arrow" aria-hidden="true">
            ↗
          </span>
        </article>
      ))}
    </div>
  );
}

function ContactBlock({
  template,
  enquiryHref,
}: {
  template: HomePropertyTemplate;
  enquiryHref: string;
}) {
  return (
    <div className="hp-contact-grid">
      <aside className="hp-contact-details">
        <p className="hp-kicker">Start a conversation</p>
        <h2>
          {template.id === "home-cleaning"
            ? "A good day starts here."
            : "Tell us what you have in mind."}
        </h2>
        <p>
          {template.form
            ? "Try the sample enquiry form to explore this design. No message is delivered from the demo."
            : "A clear, simple contact area. On your own website, visitors can tap your phone number or open an email directly."}
        </p>
        <dl>
          <div>
            <dt>Email</dt>
            <dd>
              hello@example.com <small>Sample, not monitored</small>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              Your business number <small>Added at launch</small>
            </dd>
          </div>
          <div>
            <dt>Service area</dt>
            <dd>Your city and surrounding communities</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>Your opening hours or appointment information</dd>
          </div>
        </dl>
        {template.id === "property-management" ? (
          <p className="hp-small">
            This demonstration does not accept maintenance or emergency requests. A live site would
            show the property’s approved urgent contact procedure.
          </p>
        ) : null}
      </aside>
      <div className="hp-contact-panel">
        {template.form ? (
          <>
            <h2>Enquiry preview</h2>
            <DemoEnquiryForm
              idPrefix={`hp-${template.id}`}
              services={template.services.map((service) => service.name)}
              notice="Demonstration form. Nothing is sent or saved. Use sample details only; do not enter addresses, access codes, financial details or confidential information."
            />
          </>
        ) : (
          <>
            <p className="hp-kicker">A website that feels like you</p>
            <h2>
              Your details.
              <br />
              Your next customer.
            </h2>
            <p>
              This design includes your supplied contact details and an existing external booking
              link, if you use one. A form or custom booking system can be quoted separately.
            </p>
            <span className="hp-contact-symbol" aria-hidden="true">
              ↗
            </span>
          </>
        )}
        <div className="hp-real-enquiry">
          <p>Want this design for your business?</p>
          <a className="hp-button" href={enquiryHref}>
            Make this my website <span aria-hidden="true">↗</span>
          </a>
          <small>This link opens a real enquiry with L&L Tech Solutions.</small>
        </div>
      </div>
    </div>
  );
}

function DesignStudies() {
  return (
    <div className="hp-studies">
      <article className="hp-study hp-study-lead">
        <figure>
          <Image
            src="/images/collection/property-interior-studio.webp"
            alt="Illustrative living room with clay tones and a sculptural sofa"
            fill
            sizes="(max-width: 780px) 100vw, 70vw"
          />
        </figure>
        <div>
          <span className="hp-kicker">01 / Living</span>
          <h3>The warm house.</h3>
          <p>
            Soft curves, pale stone and a rust-coloured centrepiece. A study in rooms that invite
            you to stay a little longer.
          </p>
          <details>
            <summary>Read the design notes +</summary>
            <p>
              Start with an anchored seating plan, leave room to move and repeat a small set of
              tactile materials. This illustrative study demonstrates portfolio presentation; it is
              not a completed client project.
            </p>
          </details>
        </div>
      </article>
      <article className="hp-study">
        <figure>
          <Image
            src="/images/collection/property-home-organizing.webp"
            alt="Illustrative oak entryway with woven storage and olive upholstery"
            fill
            sizes="(max-width: 780px) 100vw, 45vw"
          />
        </figure>
        <div>
          <span className="hp-kicker">02 / Arrival</span>
          <h3>An everyday welcome.</h3>
          <p>
            A compact entryway with a useful seat, warm timber and somewhere for the daily
            essentials to land.
          </p>
          <details>
            <summary>Read the design notes +</summary>
            <p>
              Consider what arrives with you: bags, shoes and keys. Keep storage accessible and let
              one comfortable material connect the practical pieces. Illustrative design study only.
            </p>
          </details>
        </div>
      </article>
      <article className="hp-study">
        <figure>
          <Image
            src="/images/collection/property-window-care.webp"
            alt="Illustrative glass architecture opening onto a garden patio"
            fill
            sizes="(max-width: 780px) 100vw, 45vw"
          />
        </figure>
        <div>
          <span className="hp-kicker">03 / Outlook</span>
          <h3>Room for the light.</h3>
          <p>
            A conversation between inside and out, with long sightlines and a calm material palette.
          </p>
          <details>
            <summary>Read the design notes +</summary>
            <p>
              Preserve the view, choose furniture that leaves the circulation clear and bring the
              garden’s colours inside. Illustrative design study only.
            </p>
          </details>
        </div>
      </article>
    </div>
  );
}

function Home({ template, enquiryHref }: { template: HomePropertyTemplate; enquiryHref: string }) {
  if (template.theme === "sunny")
    return (
      <>
        <HomePropertyHero template={template} />
        <section className="hp-section" id="services">
          <SectionIntro
            eyebrow="A clean for your kind of week"
            title="A little help goes a long way."
          />
          <ServiceList template={template} />
        </section>
        <section className="hp-sunny-about hp-section" id="about">
          <span aria-hidden="true">✳</span>
          <div>
            <p className="hp-kicker">Hello from the team</p>
            <h2>Home is for living.</h2>
            <p>{template.about}</p>
            <p>Tell us what you need, we’ll agree the scope, and you can get back to your day.</p>
          </div>
        </section>
        <section className="hp-section" id="contact">
          <ContactBlock template={template} enquiryHref={enquiryHref} />
        </section>
      </>
    );
  if (template.theme === "glass")
    return (
      <>
        <HomePropertyHero template={template} />
        <section className="hp-section hp-glass-services">
          <SectionIntro
            eyebrow="A clear scope"
            title="Every pane has a plan."
            copy="Choose the service you need. We’ll confirm the details, the access and the timing before booking."
          />
          <ServiceList template={template} />
        </section>
        <section className="hp-glass-band">
          <span aria-hidden="true">↗</span>
          <div>
            <h2>Clear from the first conversation.</h2>
            <p>Tell us about the glass. We’ll talk you through the next step.</p>
          </div>
          <Link className="hp-button" href="/contact">
            Plan your clean ↗
          </Link>
        </section>
      </>
    );
  if (template.theme === "linen")
    return (
      <>
        <HomePropertyHero template={template} />
        <section className="hp-section">
          <SectionIntro eyebrow="One space at a time" title="Where would you like to begin?" />
          <RoomSelector services={template.services} />
        </section>
        <section className="hp-linen-manifesto">
          <p className="hp-kicker">A gentler kind of order</p>
          <h2>
            Not picture-perfect.
            <br />
            <em>Perfectly yours.</em>
          </h2>
          <p>{template.about}</p>
          <Link className="hp-text-link" href="/our-approach">
            Get to know our approach ↗
          </Link>
        </section>
      </>
    );
  if (template.theme === "clay")
    return (
      <>
        <HomePropertyHero template={template} />
        <section className="hp-section">
          <SectionIntro
            eyebrow="Design begins with a feeling"
            title="Find your material language."
          />
          <MaterialPalette />
        </section>
        <section className="hp-clay-statement">
          <span>F.</span>
          <div>
            <h2>A considered room is more than a beautiful photograph.</h2>
            <p>{template.about}</p>
            <Link className="hp-text-link" href="/projects">
              Explore the design studies ↗
            </Link>
          </div>
        </section>
      </>
    );
  if (template.theme === "teal")
    return (
      <>
        <HomePropertyHero template={template} />
        <div className="hp-section">
          <PropertyPathways />
        </div>
        <section className="hp-section hp-teal-services">
          <SectionIntro eyebrow="The everyday, connected" title="Good care is in the details." />
          <ServiceList template={template} />
        </section>
        <section className="hp-property-feature">
          <figure className="hp-photo">
            <Image
              src={template.image}
              alt={template.imageAlt}
              fill
              sizes="(max-width: 780px) 100vw, 50vw"
            />
          </figure>
          <div>
            <p className="hp-kicker">A place to call home</p>
            <h2>Meet the collection.</h2>
            <p>
              Explore how available properties could be presented, with clear details and a
              straightforward enquiry route.
            </p>
            <Link className="hp-button" href="/properties">
              Explore sample properties ↗
            </Link>
            <small>Illustrative listings. No live availability.</small>
          </div>
        </section>
      </>
    );
  return (
    <>
      <HomePropertyHero template={template} />
      <section className="hp-section hp-estate-opening">
        <span className="hp-kicker">01 / The way you live</span>
        <h2>
          A home is a setting
          <br />
          <em>for everything else.</em>
        </h2>
        <p>{template.about}</p>
        <Link className="hp-text-link" href="/about">
          Our point of view ↗
        </Link>
      </section>
      <section className="hp-section">
        <SectionIntro
          eyebrow="02 / Explore the collection"
          title="Find your kind of place."
          copy="A small illustrative collection showing how your properties could be discovered and explored."
        />
        <PropertyFinder />
      </section>
      <section className="hp-estate-neighbourhood">
        <div>
          <p className="hp-kicker">03 / Beyond the front door</p>
          <h2>
            The place around
            <br />
            your place.
          </h2>
          <p>
            A quieter street, a shared courtyard, a little more sky. Explore the kind of setting
            that matters to you.
          </p>
          <Link className="hp-button" href="/neighbourhoods">
            Explore the settings ↗
          </Link>
        </div>
        <figure className="hp-photo">
          <Image
            src="/images/collection/property-property-management.webp"
            alt="Illustrative tree-lined residential courtyard"
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
          />
        </figure>
      </section>
    </>
  );
}

const pageIntros: Record<string, { title: string; copy: string }> = {
  Services: {
    title: "The right help, in the right places.",
    copy: "Start with what you need. We’ll confirm the scope and the next step together.",
  },
  Spaces: {
    title: "Every room has its own rhythm.",
    copy: "Choose a space to explore a practical starting point. Your routines guide the plan.",
  },
  "Our approach": {
    title: "Make space. Keep what matters.",
    copy: "A thoughtful process that moves at your pace, with practical systems at the centre.",
  },
  Projects: {
    title: "Spaces with something to say.",
    copy: "Three illustrative design studies. A look at materials, proportions and the everyday details.",
  },
  Studio: {
    title: "A point of view. An open mind.",
    copy: "Good design starts with listening and keeps returning to how a space will be used.",
  },
  Owners: {
    title: "Your property. A clearer picture.",
    copy: "Explore how an agreed management plan can connect communication, coordination and reporting.",
  },
  Residents: {
    title: "At home, and in the loop.",
    copy: "A simple place to find the right contact for an everyday question.",
  },
  Properties: {
    title: "Places to call home.",
    copy: "Explore the sample collection. All imagery, room details and property names are illustrative.",
  },
  Homes: {
    title: "Find a place that feels like you.",
    copy: "Filter the illustrative collection by home type and bedroom count. These are demonstration listings, not available properties.",
  },
  Neighbourhoods: {
    title: "It starts beyond the doorstep.",
    copy: "Three ways to think about the setting around a home. These are illustrative lifestyle directions, not named local neighbourhoods.",
  },
  About: {
    title: "A more personal point of view.",
    copy: "A thoughtful conversation about the life you want your next home to make room for.",
  },
  FAQs: {
    title: "A little clarity before you begin.",
    copy: "Answers to the first questions, with room for a proper conversation about your own situation.",
  },
  Contact: {
    title: "Let’s make a good beginning.",
    copy: "Explore the contact experience below. This is a website demonstration, not an operating business.",
  },
};

function Approach({ template }: { template: HomePropertyTemplate }) {
  return (
    <div className="hp-approach">
      <p className="hp-approach-lead">{template.about}</p>
      <ol>
        {[
          [
            "Begin with a conversation",
            "Tell us about your space, your routines and what you would like to change. We listen before suggesting a direction.",
          ],
          [
            "Make a considered plan",
            "Agree the priorities, the scope and the practical details. Questions are welcome at every stage.",
          ],
          [
            "Take the next step together",
            "Move through the agreed work with clear communication and time to review what is working.",
          ],
        ].map(([title, copy], index) => (
          <li key={title}>
            <span>0{index + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PropertyGuidance({ residents }: { residents: boolean }) {
  const content = residents
    ? [
        [
          "Everyday questions",
          "A live site would show the correct contact for your building, office hours and the information needed to help with a routine question.",
        ],
        [
          "Routine maintenance",
          "A clear maintenance route would explain how to describe the issue and what happens next. No maintenance request can be submitted from this demo.",
        ],
        [
          "Urgent situations",
          "The live business supplies its approved urgent contact and safety information. This example is not an emergency reporting service.",
        ],
      ]
    : [
        [
          "A defined service scope",
          "Start with the property, the current arrangements and the support you need. Responsibilities and exclusions are agreed before management begins.",
        ],
        [
          "A communication rhythm",
          "Decide who needs which information, how routine updates are shared and when a decision requires your approval.",
        ],
        [
          "A plan for the property",
          "Coordinate agreed visits, service partners and routine work within the scope you have approved.",
        ],
      ];
  return (
    <div className="hp-guidance">
      {content.map(([title, copy], index) => (
        <article key={title}>
          <span className="hp-guidance-icon" aria-hidden="true">
            0{index + 1}
          </span>
          <h2>{title}</h2>
          <p>{copy}</p>
        </article>
      ))}
      <div className="hp-guidance-callout">
        <h2>{residents ? "Not sure who to ask?" : "Let’s talk about your property."}</h2>
        <p>
          {residents
            ? "Explore the sample contact page to see how the right route can be made clear."
            : "Start a conversation about the support and communication you are looking for."}
        </p>
        <Link className="hp-button" href="/contact">
          Explore the contact page ↗
        </Link>
      </div>
    </div>
  );
}

function Neighbourhoods() {
  return (
    <div className="hp-neighbourhoods">
      {[
        {
          name: "A quieter outlook",
          image: "/images/collection/property-real-estate.webp",
          copy: "Room to step back, longer views and a little more distance from the busy parts of the day.",
          detail:
            "Think about travel time, seasonal access and the balance between privacy and connection.",
        },
        {
          name: "An everyday connection",
          image: "/images/collection/property-property-management.webp",
          copy: "Shared outdoor spaces and the feeling of a residential community around you.",
          detail:
            "Consider building arrangements, common spaces and the services you use each week.",
        },
        {
          name: "A garden connection",
          image: "/images/collection/property-window-care.webp",
          copy: "More of your day spent between inside and out, with a place to gather or simply pause.",
          detail: "Think about sunlight, upkeep, privacy and how you want to use an outdoor space.",
        },
      ].map((item, index) => (
        <article key={item.name}>
          <figure className="hp-photo">
            <Image
              src={item.image}
              alt={`Illustrative setting: ${item.name.toLowerCase()}`}
              fill
              sizes="(max-width: 780px) 100vw, 50vw"
            />
          </figure>
          <div>
            <p className="hp-kicker">Setting / 0{index + 1}</p>
            <h2>{item.name}</h2>
            <p>{item.copy}</p>
            <p>{item.detail}</p>
            <Link className="hp-text-link" href="/contact">
              Talk about your priorities ↗
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function Questions() {
  return (
    <div className="hp-faq">
      {[
        [
          "Are these homes available?",
          "No. This is a website template demonstration. The homes, imagery and room details are illustrative. A live business supplies and approves its own property information.",
        ],
        [
          "Where does a conversation begin?",
          "With your priorities: the kind of space you need, the setting you prefer and your timing. The live business will explain its process and representation arrangements.",
        ],
        [
          "Is this a live listing feed?",
          "No. This design includes a curated, static property collection within an agreed scope. MLS/IDX feeds, account features, saved searches and automated updates are separately scoped integrations.",
        ],
        [
          "Can I arrange a viewing here?",
          "The sample form demonstrates an enquiry journey only. It does not book appointments or deliver messages. A live business configures its own enquiry and appointment process.",
        ],
      ].map(([question, answer]) => (
        <details key={question}>
          <summary>
            {question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}

export default function HomePropertyTemplate({
  template,
  page = "Home",
  enquiryHref,
}: {
  template: HomePropertyTemplate;
  page?: string;
  enquiryHref: string;
}) {
  const intro = pageIntros[page];
  return (
    <div className={`hp-site hp-theme-${template.theme}`}>
      <HomePropertyNavigation template={template} page={page} />
      {page === "Home" ? (
        <Home template={template} enquiryHref={enquiryHref} />
      ) : (
        <>
          <section className="hp-page-heading">
            <p className="hp-kicker">
              {template.brand} / {page}
            </p>
            <h1>{intro.title}</h1>
            <p>{intro.copy}</p>
          </section>
          <section className="hp-section hp-page-body">
            {page === "Services" ? (
              <>
                <ServiceList template={template} expanded />
                <div className="hp-service-next">
                  <h2>Every good project starts with a clear scope.</h2>
                  <p>
                    We’ll discuss the details before agreeing the work. Explore the contact page to
                    see the next step.
                  </p>
                  <Link className="hp-button" href="/contact">
                    Start a conversation ↗
                  </Link>
                </div>
              </>
            ) : null}
            {page === "Spaces" ? (
              <>
                <RoomSelector services={template.services} />
                <ServiceList template={template} expanded />
              </>
            ) : null}
            {page === "Our approach" || page === "Studio" || page === "About" ? (
              <>
                <Approach template={template} />
                {page === "Studio" ? <MaterialPalette /> : null}
                <div className="hp-service-next">
                  <Link className="hp-button" href="/contact">
                    Let’s talk it through ↗
                  </Link>
                </div>
              </>
            ) : null}
            {page === "Projects" ? <DesignStudies /> : null}
            {page === "Owners" || page === "Residents" ? (
              <PropertyGuidance residents={page === "Residents"} />
            ) : null}
            {page === "Homes" || page === "Properties" ? (
              <PropertyFinder rental={page === "Properties"} />
            ) : null}
            {page === "Neighbourhoods" ? <Neighbourhoods /> : null}
            {page === "FAQs" ? <Questions /> : null}
            {page === "Contact" ? (
              <ContactBlock template={template} enquiryHref={enquiryHref} />
            ) : null}
          </section>
        </>
      )}
      <footer className="hp-footer">
        <Link href="/" className="hp-footer-brand">
          {template.brand}
        </Link>
        <p>{template.note}</p>
        <Link href={template.pages.length === 1 ? "#contact" : "/contact"}>
          Let’s talk <span aria-hidden="true">↗</span>
        </Link>
        <small>Fictional business · L&L website demonstration</small>
      </footer>
    </div>
  );
}
