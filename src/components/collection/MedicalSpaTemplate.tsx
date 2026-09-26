import Image from "next/image";
import Link from "next/link";
import { designPrice, type WebsiteDesign } from "@/data/website-collection";
import { medicalSpaContent } from "@/data/medical-spa-content";
import { medicalSpaPages, medicalSpaPagePath, type MedicalSpaPage } from "@/data/medical-spa-pages";
import DemoEnquiryForm from "@/components/collection/DemoEnquiryForm";
import {
  MedicalSpaNavigation,
  MedicalSpaTreatmentFocus,
} from "@/components/collection/MedicalSpaInteractions";

export function MedicalSpaMark() {
  return (
    <svg className="medical-spa-mark" viewBox="0 0 50 58" fill="none" aria-hidden="true">
      <path
        d="M6 49 25 6l19 43M12 37h26M16 49 25 28l9 21M25 0v6M3 53h44"
        stroke="currentColor"
        strokeWidth="1.15"
      />
    </svg>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Brand() {
  return (
    <Link
      className="medical-spa-brand"
      href={medicalSpaPagePath("Home")}
      aria-label="Aurel Aesthetics home"
    >
      <MedicalSpaMark />
      <span>
        AUREL<small>A E S T H E T I C S</small>
      </span>
    </Link>
  );
}

function ConsultationLink({
  children = "Begin your consultation",
}: {
  children?: React.ReactNode;
}) {
  return (
    <Link className="medical-spa-button" href={medicalSpaPagePath("Consultation")}>
      {children}
      <Arrow />
    </Link>
  );
}

function PageIntro({
  number,
  eyebrow,
  title,
  emphasis,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  children: React.ReactNode;
}) {
  return (
    <header className="medical-spa-page-intro">
      <span className="medical-spa-page-number" aria-hidden="true">
        {number} / AUREL
      </span>
      <p className="medical-spa-eyebrow">{eyebrow}</p>
      <h1 id="medical-spa-page-heading">
        {title}
        <br />
        <em>{emphasis}</em>
      </h1>
      <p className="medical-spa-lead">{children}</p>
    </header>
  );
}

function Closing() {
  return (
    <section className="medical-spa-closing" aria-labelledby="medical-spa-closing-heading">
      <p className="medical-spa-eyebrow">THE FIRST STEP IS A CONVERSATION</p>
      <h2 id="medical-spa-closing-heading">
        Your questions.
        <br />
        <em>Our starting point.</em>
      </h2>
      <ConsultationLink />
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="medical-spa-hero">
        <div className="medical-spa-hero-image">
          <Image
            src={medicalSpaContent.image}
            alt={medicalSpaContent.imageAlt}
            fill
            sizes="(max-width: 760px) 100vw, 66vw"
            loading="eager"
          />
        </div>
        <div className="medical-spa-hero-copy">
          <p className="medical-spa-eyebrow">{medicalSpaContent.eyebrow}</p>
          <h1 id="medical-spa-page-heading">
            {medicalSpaContent.headline}
            <br />
            <em>{medicalSpaContent.emphasis}</em>
          </h1>
          <p className="medical-spa-lead">{medicalSpaContent.introduction}</p>
          <ConsultationLink />
          <div className="medical-spa-hero-caption">
            <span />A personal approach. A considered pace.
          </div>
        </div>
        <p className="medical-spa-image-caption">AUREL / AN ILLUSTRATIVE CLINIC</p>
      </section>
      <div className="medical-spa-hero-rule">
        <span>INDIVIDUAL BY DESIGN</span>
        <MedicalSpaMark />
        <span>THOUGHTFUL AT EVERY STEP</span>
      </div>
      <section className="medical-spa-philosophy" aria-labelledby="medical-spa-philosophy-heading">
        <div>
          <p className="medical-spa-eyebrow">THE AUREL PHILOSOPHY</p>
          <h2 id="medical-spa-philosophy-heading">
            An aesthetic
            <br />
            that begins
            <br />
            <em>with listening.</em>
          </h2>
        </div>
        <div className="medical-spa-philosophy-copy">
          <p className="medical-spa-large-copy">There is no single way to feel like yourself.</p>
          <p>
            Your preferences, your questions and your comfort deserve space. Our clinic concept
            places the consultation at the centre of the experience, with clear information and time
            to consider each next step.
          </p>
          <Link className="medical-spa-text-link" href={medicalSpaPagePath("The Clinic")}>
            Discover the clinic <Arrow />
          </Link>
          <span className="medical-spa-signature">Aurel Aesthetics</span>
        </div>
      </section>
      <section
        className="medical-spa-treatment-preview"
        aria-labelledby="medical-spa-treatment-heading"
      >
        <div className="medical-spa-section-heading">
          <div>
            <p className="medical-spa-eyebrow">THE TREATMENT EDIT</p>
            <h2 id="medical-spa-treatment-heading">
              Space to explore.
              <br />
              <em>Room to decide.</em>
            </h2>
          </div>
          <p>
            A starting point for a conversation with your clinician. Explore an area of interest,
            then ask what is appropriate for you.
          </p>
        </div>
        <MedicalSpaTreatmentFocus />
        <p className="medical-spa-small-note">
          Illustrative treatment areas. Availability and suitability would be confirmed by a
          qualified clinician.
        </p>
      </section>
      <section className="medical-spa-ritual" aria-labelledby="medical-spa-ritual-heading">
        <div className="medical-spa-detail-image">
          <Image
            src={medicalSpaContent.detailImage}
            alt={medicalSpaContent.detailImageAlt}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
        <div className="medical-spa-ritual-copy">
          <p className="medical-spa-eyebrow">A LITTLE MORE TIME FOR YOU</p>
          <h2 id="medical-spa-ritual-heading">
            Every detail.
            <br />
            <em>Considered.</em>
          </h2>
          <p>
            A quiet welcome. A private conversation. An explanation you can take your time with. The
            experience begins well before any treatment decision.
          </p>
          <Link className="medical-spa-text-link" href={medicalSpaPagePath("Consultation")}>
            What to expect <Arrow />
          </Link>
        </div>
      </section>
      <Closing />
    </>
  );
}

function Treatments() {
  return (
    <>
      <PageIntro
        number="02"
        eyebrow="THE TREATMENT EDIT"
        title="Individual care."
        emphasis="Informed choices."
      >
        Explore the areas a clinic can offer, with a consultation to discuss your circumstances,
        preferences and questions before a treatment is considered.
      </PageIntro>
      <nav className="medical-spa-treatment-jumps" aria-label="Treatment areas">
        {medicalSpaContent.treatments.map((item) => (
          <a href={`#${item.id}`} key={item.id}>
            <span>{item.number}</span>
            {item.shortName}
            <span aria-hidden="true">↓</span>
          </a>
        ))}
      </nav>
      <section className="medical-spa-treatment-details" aria-label="Illustrative treatment menu">
        {medicalSpaContent.treatments.map((item) => (
          <article key={item.id} id={item.id}>
            <span className="medical-spa-treatment-number">{item.number}</span>
            <div className="medical-spa-treatment-title">
              <p className="medical-spa-eyebrow">{item.note}</p>
              <h2>{item.name}</h2>
            </div>
            <div className="medical-spa-treatment-description">
              <p>{item.description}</p>
              <details>
                <summary>
                  What to discuss <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <h3>A useful starting point</h3>
                  <p>{item.discussion}</p>
                  <h3>Questions for your clinician</h3>
                  <p>{item.nextStep}</p>
                </div>
              </details>
              <ConsultationLink>Ask about a consultation</ConsultationLink>
            </div>
          </article>
        ))}
      </section>
      <aside className="medical-spa-menu-note">
        <MedicalSpaMark />
        <div>
          <h2>Information before intervention.</h2>
          <p>
            This is an example treatment menu for a fictional clinic. Your finished website would
            use your actual services and clinician-approved information. Treatment suitability,
            fees, potential risks and aftercare should be discussed directly with a qualified
            clinician.
          </p>
        </div>
      </aside>
      <Closing />
    </>
  );
}

function Consultation() {
  return (
    <>
      <PageIntro
        number="03"
        eyebrow="YOUR FIRST CONVERSATION"
        title="Come with questions."
        emphasis="Leave with clarity."
      >
        You do not need a treatment in mind. A consultation makes room for a thoughtful discussion
        about your interests and the information you need to make a decision.
      </PageIntro>
      <section
        className="medical-spa-consultation-layout"
        aria-labelledby="medical-spa-consultation-heading"
      >
        <div className="medical-spa-consultation-aside">
          <div className="medical-spa-detail-image">
            <Image
              src={medicalSpaContent.detailImage}
              alt={medicalSpaContent.detailImageAlt}
              fill
              sizes="(max-width: 760px) 100vw, 36vw"
            />
          </div>
          <p>Considered care begins with a conversation.</p>
        </div>
        <div className="medical-spa-consultation-steps">
          <p className="medical-spa-eyebrow" id="medical-spa-consultation-heading">
            WHAT THE EXPERIENCE CAN LOOK LIKE
          </p>
          {medicalSpaContent.consultationSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="medical-spa-prepare" aria-labelledby="medical-spa-prepare-heading">
        <div>
          <p className="medical-spa-eyebrow">BEFORE YOUR VISIT</p>
          <h2 id="medical-spa-prepare-heading">
            A little preparation.
            <br />
            <em>A better conversation.</em>
          </h2>
        </div>
        <div>
          <ul>
            <li>Write down the questions you would like to ask.</li>
            <li>Confirm the consultation fee and appointment arrangements.</li>
            <li>Ask how to share any requested health information securely.</li>
            <li>Let the clinic know about accessibility or communication needs.</li>
          </ul>
          <Link className="medical-spa-button" href={medicalSpaPagePath("Contact")}>
            Start an enquiry <Arrow />
          </Link>
          <p className="medical-spa-small-note">
            This demonstration website does not arrange clinical appointments.
          </p>
        </div>
      </section>
    </>
  );
}

function Clinic() {
  return (
    <>
      <PageIntro
        number="04"
        eyebrow="THE AUREL SETTING"
        title="Quiet by intention."
        emphasis="Personal by nature."
      >
        A clinic concept shaped around the time and attention a personal conversation deserves. Warm
        details, quiet spaces and a considered welcome.
      </PageIntro>
      <figure className="medical-spa-clinic-image">
        <Image src={medicalSpaContent.image} alt={medicalSpaContent.imageAlt} fill sizes="100vw" />
        <figcaption>
          <span>AUREL AESTHETICS</span>
          <span>Illustrative clinic interior</span>
        </figcaption>
      </figure>
      <section
        className="medical-spa-clinic-story"
        aria-labelledby="medical-spa-clinic-story-heading"
      >
        <div>
          <p className="medical-spa-eyebrow">MORE THAN A SETTING</p>
          <h2 id="medical-spa-clinic-story-heading">
            The space matters.
            <br />
            <em>So does the approach.</em>
          </h2>
        </div>
        <div>
          <p>
            Aurel imagines an aesthetic clinic where the pace feels unhurried and the details feel
            personal. The atmosphere sets the tone for a more open conversation.
          </p>
          <p>
            That conversation should include who will provide your care, their qualifications, what
            is involved and what happens next. Your finished website would introduce your real
            clinicians and their verified credentials.
          </p>
          <Link className="medical-spa-text-link" href={medicalSpaPagePath("Consultation")}>
            An introduction to your first visit <Arrow />
          </Link>
        </div>
      </section>
      <section className="medical-spa-principles" aria-label="The clinic approach">
        <article>
          <span>01</span>
          <h2>Time to be heard.</h2>
          <p>
            Your questions and preferences help shape the conversation from the first appointment.
          </p>
        </article>
        <article>
          <span>02</span>
          <h2>Details made clear.</h2>
          <p>Understand the options, who provides them and the questions to ask before deciding.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Your own pace.</h2>
          <p>A considered decision starts with information and the space to reflect on it.</p>
        </article>
      </section>
      <div className="medical-spa-clinic-disclosure">
        <p>
          Aurel Aesthetics is a fictional clinic created to demonstrate this website design. The
          imagery is illustrative; no real clinicians, qualifications or patient outcomes are
          represented.
        </p>
      </div>
      <Closing />
    </>
  );
}

function Questions() {
  return (
    <>
      <PageIntro
        number="05"
        eyebrow="A LITTLE MORE CLARITY"
        title="Good questions."
        emphasis="A thoughtful start."
      >
        A few practical details about the consultation experience and this demonstration website.
        Your clinician is the right person for questions about your individual care.
      </PageIntro>
      <section className="medical-spa-faq-layout" aria-label="Frequently asked questions">
        <aside>
          <MedicalSpaMark />
          <p className="medical-spa-eyebrow">SOMETHING ELSE ON YOUR MIND?</p>
          <p>There is room for your questions.</p>
          <Link className="medical-spa-text-link" href={medicalSpaPagePath("Contact")}>
            Visit the contact page <Arrow />
          </Link>
        </aside>
        <div className="medical-spa-faq-list">
          {medicalSpaContent.questions.map((item, index) => (
            <details key={item.question}>
              <summary>
                <span className="medical-spa-faq-number">0{index + 1}</span>
                {item.question}
                <span className="medical-spa-faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}

function Contact({ design, enquiryHref }: { design: WebsiteDesign; enquiryHref: string }) {
  return (
    <>
      <PageIntro
        number="06"
        eyebrow="LET’S BEGIN"
        title="A conversation."
        emphasis="Entirely yours."
      >
        Ask a question, explore a treatment area or tell us what you would like to know about a
        first visit. This example shows how your clinic’s enquiry page could work.
      </PageIntro>
      <section className="medical-spa-contact-layout" aria-labelledby="medical-spa-contact-heading">
        <aside className="medical-spa-contact-aside">
          <p className="medical-spa-eyebrow">AUREL AESTHETICS</p>
          <h2 id="medical-spa-contact-heading">
            A considered
            <br />
            <em>welcome.</em>
          </h2>
          <dl>
            <div>
              <dt>Visit the clinic · sample only</dt>
              <dd>
                Your clinic address
                <br />
                City, province & postal code
              </dd>
            </div>
            <div>
              <dt>Call · added at launch</dt>
              <dd>Your clinic phone number</dd>
            </div>
            <div>
              <dt>Email · sample only</dt>
              <dd>hello@example.com</dd>
            </div>
            <div>
              <dt>Appointments · added at launch</dt>
              <dd>
                Your consultation hours
                <br />
                and appointment arrangements
              </dd>
            </div>
          </dl>
          <p className="medical-spa-small-note">
            Sample details are intentionally inactive. Aurel is a fictional clinic and does not
            accept enquiries or appointments.
          </p>
          <div className="medical-spa-contact-access">
            <h3>Before you visit</h3>
            <p>
              Confirm accessibility, parking and arrival details with your clinic when arranging an
              appointment.
            </p>
          </div>
        </aside>
        <div className="medical-spa-form-panel">
          <p className="medical-spa-eyebrow">A PRIVATE MOMENT STARTS WITH A SIMPLE HELLO</p>
          <h2>Begin an enquiry.</h2>
          <p>
            Try the demonstration form with sample details. Please do not include medical or other
            sensitive information.
          </p>
          <DemoEnquiryForm
            idPrefix="medical-spa"
            services={["Consultation", ...medicalSpaContent.treatments.map((item) => item.name)]}
          />
        </div>
      </section>
      <section
        className="medical-spa-website-enquiry"
        aria-labelledby="medical-spa-website-heading"
      >
        <div>
          <p className="medical-spa-eyebrow">THE AUREL WEBSITE DESIGN</p>
          <h2 id="medical-spa-website-heading">
            Make this experience
            <br />
            <em>your own.</em>
          </h2>
          <p>
            A six-page medical spa website, tailored with your brand, supplied content and approved
            clinical information. Standard enquiry form setup is included.
          </p>
        </div>
        <div>
          <p className="medical-spa-website-price">{designPrice(design)}</p>
          <a className="medical-spa-button" href={enquiryHref}>
            Make this my website <Arrow />
          </a>
          <p className="medical-spa-small-note">
            This link contacts L&L Tech Solutions about the website. Advanced booking, integrations
            and ongoing care are scoped separately.
          </p>
        </div>
      </section>
    </>
  );
}

export default function MedicalSpaTemplate({
  design,
  standalonePage,
  enquiryHref,
}: {
  design: WebsiteDesign;
  standalonePage: MedicalSpaPage;
  enquiryHref: string;
}) {
  return (
    <div className="medical-spa-site" data-medical-spa-root={design.id}>
      <header className="medical-spa-header">
        <Brand />
        <MedicalSpaNavigation page={standalonePage} />
      </header>
      <div className="medical-spa-page" aria-labelledby="medical-spa-page-heading">
        {standalonePage === "Home" ? (
          <Home />
        ) : standalonePage === "Treatments" ? (
          <Treatments />
        ) : standalonePage === "Consultation" ? (
          <Consultation />
        ) : standalonePage === "The Clinic" ? (
          <Clinic />
        ) : standalonePage === "FAQs" ? (
          <Questions />
        ) : (
          <Contact design={design} enquiryHref={enquiryHref} />
        )}
      </div>
      <footer className="medical-spa-footer">
        <div className="medical-spa-footer-intro">
          <Brand />
          <p>
            Considered care.
            <br />
            <em>Distinctly you.</em>
          </p>
        </div>
        <nav aria-label="Aurel clinic footer">
          {medicalSpaPages.map((page) => (
            <Link key={page} href={medicalSpaPagePath(page)}>
              {page}
            </Link>
          ))}
        </nav>
        <div className="medical-spa-footer-note">
          <span>Fictional clinic · Illustrative imagery · Website demonstration</span>
          <a href={enquiryHref}>
            Website by L&L <Arrow />
          </a>
        </div>
      </footer>
    </div>
  );
}
