import Image from "next/image";
import Link from "next/link";
import { type ProfessionalTemplate as Template } from "@/data/website-collection";
import ProfessionalHero from "@/components/collection/ProfessionalHero";
import {
  ProfessionalExplorer,
  ProfessionalNavigation,
  ProfessionalResources,
} from "@/components/collection/ProfessionalInteractions";
import DemoEnquiryForm from "@/components/collection/DemoEnquiryForm";

function SectionTitle({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="pro-section-title">
      <div>
        <p className="pro-kicker">{label}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Approach({ template }: { template: Template }) {
  return (
    <section className="pro-section pro-approach">
      <SectionTitle
        label="WORKING TOGETHER"
        title={
          template.theme === "offscript"
            ? "A way through the what-ifs."
            : "A clear path from the start."
        }
      />
      <ol>
        {template.principles.map((principle, index) => (
          <li key={principle}>
            <span className="pro-step">0{index + 1}</span>
            <h3>{principle}</h3>
            <p>
              {
                [
                  "Begin with the context. Talk through what matters, where things stand and what you would like to explore.",
                  "Agree what is included, who is involved and how the work will move forward before the engagement begins.",
                  "Keep the next steps clear, with a point of contact and a practical way to review progress.",
                ][index]
              }
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Questions({ legal = false }: { legal?: boolean }) {
  const questions = [
    [
      "How do I start?",
      "Use the contact information or enquiry form to ask about an initial conversation. The practice will confirm availability and whether it can assist.",
    ],
    [
      "What should I include in my first enquiry?",
      legal
        ? "Give a brief, general description of the type of enquiry. Do not send confidential details or documents before the firm confirms how to proceed."
        : "Tell us the general type of support you are looking for and your preferred way to be contacted. Avoid sending private records through an initial enquiry.",
    ],
    [
      "How are fees agreed?",
      "The scope, fees and responsibilities are discussed before an engagement starts. This demonstration does not advertise professional service fees.",
    ],
    [
      legal
        ? "Does sending a message create a client relationship?"
        : "Can I send documents through this website?",
      legal
        ? "No. This is a fictional website demonstration and no legal services are offered. A live firm should explain its own engagement and conflict-check process before accepting instructions."
        : "This demonstration does not accept documents or transmit messages. Your live business can explain an approved process for sharing records.",
    ],
  ];
  return (
    <div className="pro-faqs">
      {questions.map(([question, answer]) => (
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

function Contact({ template, enquiryHref }: { template: Template; enquiryHref: string }) {
  const legal = template.industry === "legal";
  return (
    <section id="contact" className="pro-section pro-contact">
      <div className="pro-contact-copy">
        <p className="pro-kicker">A GOOD PLACE TO BEGIN</p>
        <h2>
          Let’s start
          <br />a conversation.
        </h2>
        <p>
          Tell us a little about what you need. We’ll explain the next step and how an initial
          conversation works.
        </p>
        <dl>
          <div>
            <dt>Email</dt>
            <dd>
              hello@example.com <small>Sample address</small>
            </dd>
          </div>
          <div>
            <dt>Visit or call</dt>
            <dd>
              Your location and phone number<small>Added when your website launches</small>
            </dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>
              By arrangement<small>Your confirmed hours appear here</small>
            </dd>
          </div>
        </dl>
        {legal ? (
          <p className="pro-note">
            Do not share confidential details. This fictional demo offers no legal services and
            creates no lawyer–client relationship.
          </p>
        ) : (
          <p className="pro-note">
            Fictional business demonstration. Contact details are illustrative and do not accept
            enquiries.
          </p>
        )}
      </div>
      <div className="pro-contact-panel">
        {template.form ? (
          <>
            <h3>Your enquiry</h3>
            <DemoEnquiryForm
              idPrefix={template.id}
              services={template.services.map((service) => service.name)}
              notice="Demonstration form. Nothing is sent or saved. Use sample details only; do not enter confidential, financial, legal or health information."
            />
          </>
        ) : (
          <>
            <span className="pro-kicker">A PERSONAL CONNECTION</span>
            <h3>
              Choose how
              <br />
              to get in touch.
            </h3>
            <p>
              Your live website includes your email and click-to-call phone number. An existing
              scheduling link can be included too.
            </p>
            <div className="pro-contact-sample">
              <span>
                Email the practice <b aria-hidden="true">↗</b>
              </span>
              <span>
                Call the practice <b aria-hidden="true">↗</b>
              </span>
            </div>
            <p className="pro-note">
              Contact buttons are shown as examples here. Your real details are connected at launch.
            </p>
          </>
        )}
        <div className="pro-purchase">
          <p>Like this design for your business?</p>
          <a className="pro-text-link" href={enquiryHref}>
            Make this my website <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function About({ template }: { template: Template }) {
  return (
    <section id="about" className="pro-section pro-about">
      <div>
        <p className="pro-kicker">THE PEOPLE BEHIND THE PRACTICE</p>
        <h2>
          {template.theme === "offscript"
            ? "A little curiosity. A lot of intention."
            : "Good work starts with understanding."}
        </h2>
        <p>{template.about}</p>
        <p>Time to listen. Room to ask questions. Clear expectations about the work ahead.</p>
        <div className="pro-signature">
          {template.brand}
          <span>{template.subbrand}</span>
        </div>
      </div>
      <figure>
        <Image
          src={template.image}
          alt={template.imageAlt}
          width={1536}
          height={1024}
          sizes="(max-width: 760px) 100vw, 45vw"
        />
        <figcaption>Illustrative space · Your real photography makes this yours.</figcaption>
      </figure>
    </section>
  );
}

function Services({ template }: { template: Template }) {
  return (
    <section id="services" className="pro-section pro-services">
      <SectionTitle
        label={template.industry === "legal" ? "OUR PRACTICE" : "HOW WE CAN HELP"}
        title={
          template.theme === "offscript" ? "Where shall we start?" : "The right place to begin."
        }
      />
      <ProfessionalExplorer template={template} />
      <div className="pro-service-notes">
        {template.services.map((service, index) => (
          <details key={service.name}>
            <summary>
              <span>0{index + 1}</span>
              {service.name}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{service.detail}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function ProfessionalTemplate({
  template,
  page,
  enquiryHref,
}: {
  template: Template;
  page: string;
  enquiryHref: string;
}) {
  const legal = template.industry === "legal";
  const onePage = template.pages.length === 1;
  const titles: Record<string, string> = {
    Services: "Support, shaped around you.",
    Practice: "A considered practice.",
    About: "A clearer picture of who we are.",
    Firm: "The perspective behind the practice.",
    Approach: "From the first conversation.",
    Resources: "Useful perspectives.",
    FAQs: "A few things, made clear.",
    Contact: "Your next conversation starts here.",
  };
  return (
    <div
      className={`professional-site pro-theme-${template.theme}`}
      data-professional-root={template.id}
    >
      <ProfessionalNavigation template={template} page={page} />
      {page === "Home" ? (
        <>
          <ProfessionalHero template={template} />
          <Services template={template} />
          {onePage || template.theme === "tally" || template.theme === "vale" ? (
            <About template={template} />
          ) : (
            <section className="pro-statement">
              <p className="pro-kicker">{template.brand} / OUR POINT OF VIEW</p>
              <h2>{template.about}</h2>
              <Link
                className="pro-text-link"
                href={
                  template.pages.some((item) => item === "About")
                    ? "/about"
                    : template.pages.some((item) => item === "Firm")
                      ? "/firm"
                      : "/approach"
                }
              >
                A closer look <span aria-hidden="true">↗</span>
              </Link>
            </section>
          )}
          {!onePage ? <Approach template={template} /> : null}
          {onePage ? (
            <Contact template={template} enquiryHref={enquiryHref} />
          ) : (
            <section className="pro-closing">
              <span className="pro-kicker">YOUR NEXT STEP</span>
              <h2>
                {legal
                  ? "Let’s talk about what matters."
                  : "A good conversation can change the direction."}
              </h2>
              <Link className="pro-button" href="/contact">
                Start a conversation <span aria-hidden="true">↗</span>
              </Link>
            </section>
          )}
        </>
      ) : (
        <>
          <div className="pro-page-intro">
            <p className="pro-kicker">
              {template.brand} / {page}
            </p>
            <h1 id="professional-title">{titles[page]}</h1>
            <p>
              {page === "Contact"
                ? "A straightforward way to begin. Explore the sample contact experience below."
                : page === "Resources"
                  ? "A small collection of example articles about getting started and working together."
                  : "Clear information, thoughtful detail and space for your questions."}
            </p>
          </div>
          {page === "Services" || page === "Practice" ? (
            <>
              <Services template={template} />
              <section className="pro-section pro-engagement">
                <SectionTitle
                  label="BEFORE WE BEGIN"
                  title="Clear expectations. Room for questions."
                />
                <p>
                  We discuss the support you need and confirm the scope, responsibilities and next
                  steps before beginning an engagement.
                </p>
                <Link className="pro-button" href="/contact">
                  Ask about the next step <span aria-hidden="true">↗</span>
                </Link>
              </section>
            </>
          ) : null}
          {page === "About" || page === "Firm" ? (
            <>
              <About template={template} />
              <Approach template={template} />
            </>
          ) : null}
          {page === "Approach" ? (
            <>
              <Approach template={template} />
              <section className="pro-section">
                <SectionTitle label="YOUR QUESTIONS" title="Know what comes next." />
                <Questions legal={legal} />
              </section>
            </>
          ) : null}
          {page === "FAQs" ? (
            <section className="pro-section">
              <Questions legal={legal} />
              <Link className="pro-text-link" href="/contact">
                Have another question? Start here ↗
              </Link>
            </section>
          ) : null}
          {page === "Resources" ? (
            <section className="pro-section">
              <ProfessionalResources />
            </section>
          ) : null}
          {page === "Contact" ? <Contact template={template} enquiryHref={enquiryHref} /> : null}
        </>
      )}
      <footer className="pro-footer">
        <Link href="/" className="pro-brand">
          {template.brand}
        </Link>
        <p>{template.subbrand}</p>
        <a href={`https://lltechsolutions.ca/website-collection/${template.id}`}>
          L&L / Template details ↗
        </a>
        <small>
          Fictional business · Website demonstration{legal ? " · No legal services or advice" : ""}
        </small>
      </footer>
    </div>
  );
}
