import Image from "next/image";
import Link from "next/link";
import type { TransportTemplate } from "@/data/website-collection";
import {
  TransportContact,
  TransportFooter,
  TransportHeader,
  TransportPageIntro,
} from "@/components/collection/TransportShared";
import { EquipmentCatalogue } from "@/components/collection/TransportEquipmentInteractions";

type Props = { template: TransportTemplate; page: string; enquiryHref: string };

function YardNextStep() {
  return (
    <section className="yard-next-step">
      <div className="tl-wrap">
        <p className="tl-kicker">Big plans start with a question.</p>
        <h2>
          WHAT’S
          <br />
          THE JOB?
        </h2>
        <Link className="tl-button" href="/contact">
          Talk equipment <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}

function YardHome({ template }: { template: TransportTemplate }) {
  return (
    <>
      <section className="yard-hero tl-wrap">
        <div className="yard-hero-heading">
          <p className="tl-kicker">Equipment / Tools / Trailers</p>
          <h1>
            {template.headline}
            <br />
            <span>{template.emphasis}</span>
          </h1>
        </div>
        <div className="yard-hero-description">
          <p>{template.intro}</p>
          <Link className="tl-button" href="/equipment">
            Explore equipment <span aria-hidden="true">↗</span>
          </Link>
          <span className="yard-hero-caption">A practical place to start.</span>
        </div>
        <figure className="yard-hero-image">
          <Image
            src={template.image}
            alt={template.imageAlt}
            fill
            sizes="(max-width: 720px) 100vw, 56vw"
            priority
          />
          <figcaption>For the work you have in mind.</figcaption>
        </figure>
        <div className="yard-hero-stamp" aria-hidden="true">
          <span>Y</span>
          <small>
            GET
            <br />
            TO IT.
          </small>
        </div>
      </section>
      <div className="yard-category-band" aria-hidden="true">
        <span>GROUNDWORK</span>
        <span>↗</span>
        <span>BUILDING</span>
        <span>↗</span>
        <span>GETTING IT THERE</span>
      </div>
      <section className="tl-wrap tl-section yard-catalogue-section">
        <div className="yard-section-heading">
          <div>
            <p className="tl-kicker">Find a starting point</p>
            <h2>
              THE RIGHT TOOL
              <br />
              FOR YOUR NEXT JOB.
            </h2>
          </div>
          <p>
            Explore the sample range below. Open an item for the details worth discussing with a
            rental team.
          </p>
        </div>
        <EquipmentCatalogue />
      </section>
      <section className="yard-rental-primer">
        <div className="tl-wrap tl-section">
          <div>
            <p className="tl-kicker">Before you get to work</p>
            <h2>
              A LITTLE PLANNING.
              <br />A BETTER START.
            </h2>
            <Link className="yard-text-link" href="/rental-guide">
              Read the rental guide <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h3>Tell us the task.</h3>
                <p>Describe the project, site and working conditions.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Work through the fit.</h3>
                <p>Discuss equipment, attachments and transport needs.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Agree the details.</h3>
                <p>Confirm the actual equipment, terms and handover directly.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <YardNextStep />
    </>
  );
}

function EquipmentPage() {
  return (
    <>
      <TransportPageIntro
        eyebrow="Equipment / Explore the sample range"
        title="PICK YOUR STARTING POINT."
        copy="Compact equipment, useful tools and trailers. Browse the sample catalogue and open a category to see the information that helps a rental conversation."
      />
      <section className="tl-wrap yard-equipment-page">
        <EquipmentCatalogue />
      </section>
      <section className="tl-wrap tl-section yard-job-fit">
        <div className="yard-fit-symbol" aria-hidden="true">
          ↗
        </div>
        <div>
          <p className="tl-kicker">Start with the work</p>
          <h2>
            THE JOB COMES FIRST.
            <br />
            THE EQUIPMENT FOLLOWS.
          </h2>
          <p>
            Unsure which category to explore? Describe the material, working area and access. A
            rental team can discuss the actual equipment and instructions for your project before
            any arrangement is confirmed.
          </p>
          <Link className="yard-text-link" href="/contact">
            Ask an equipment question <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <YardNextStep />
    </>
  );
}

const rentalSteps = [
  {
    title: "Describe the work.",
    text: "What are you building, moving or preparing? Share the site conditions, access and intended task so the conversation starts in the right place.",
    checklist: "Project · Materials · Access",
  },
  {
    title: "Discuss the equipment.",
    text: "Confirm the actual model, attachments and operating requirements directly. Share transport constraints and ask what guidance comes with the handover.",
    checklist: "Equipment · Attachments · Transport",
  },
  {
    title: "Confirm the arrangement.",
    text: "The live business confirms availability, rates, hire period and rental terms. Review collection or delivery arrangements and any documents needed before proceeding.",
    checklist: "Dates · Terms · Handover",
  },
  {
    title: "Return as agreed.",
    text: "Follow the agreed return time, cleaning and refuelling instructions. Let the business know about operating issues or damage through its stated contact process.",
    checklist: "Return time · Condition · Check-in",
  },
] as const;

function RentalGuidePage() {
  return (
    <>
      <TransportPageIntro
        eyebrow="Rental guide / Come prepared"
        title="A PLAN BEFORE THE PICKUP."
        copy="Good equipment decisions begin with a few useful details. This guide shows the topics to cover with your rental provider, from the first question to the return."
      />
      <section className="tl-wrap yard-guide-steps" aria-label="Rental planning steps">
        {rentalSteps.map((step, index) => (
          <article key={step.title}>
            <span className="yard-guide-number">0{index + 1}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
            <span className="yard-guide-checklist">{step.checklist}</span>
          </article>
        ))}
      </section>
      <section className="yard-rental-primer">
        <div className="tl-wrap tl-section yard-guide-faq">
          <div>
            <p className="tl-kicker">Worth asking</p>
            <h2>
              SMALL DETAILS.
              <br />
              USEFUL ANSWERS.
            </h2>
            <p>The live business supplies its own rental policy and equipment instructions.</p>
          </div>
          <div className="yard-questions">
            <details open>
              <summary>
                What information should I have ready? <span aria-hidden="true">+</span>
              </summary>
              <p>
                Start with the task, project location, access constraints and preferred hire dates.
                If towing is involved, have your vehicle and hitch details available for the
                provider to review.
              </p>
            </details>
            <details>
              <summary>
                Can I reserve equipment here? <span aria-hidden="true">+</span>
              </summary>
              <p>
                This sample website presents equipment and collects a demonstration enquiry only. It
                does not connect to stock, confirm availability, take payment or make reservations.
              </p>
            </details>
            <details>
              <summary>
                What about operating instructions? <span aria-hidden="true">+</span>
              </summary>
              <p>
                Ask the rental business for the manufacturer’s instructions, a handover explanation
                and any required training or qualifications. The catalogue is not an operating
                manual.
              </p>
            </details>
            <details>
              <summary>
                How do collection and return work? <span aria-hidden="true">+</span>
              </summary>
              <p>
                The actual rental provider confirms collection hours, transport arrangements,
                required documents, return condition and any applicable charges before the rental is
                agreed.
              </p>
            </details>
          </div>
        </div>
      </section>
      <YardNextStep />
    </>
  );
}

function YardAbout({ template }: { template: TransportTemplate }) {
  return (
    <>
      <TransportPageIntro
        eyebrow="About YARD / Practical by design"
        title="FOR THE PEOPLE WHO GET ON WITH IT."
        copy="A clear catalogue. Useful information. A straightforward conversation about the work ahead."
      />
      <section className="yard-about-story tl-wrap">
        <figure>
          <Image
            src={template.image}
            alt={template.imageAlt}
            fill
            sizes="(max-width: 720px) 100vw, 55vw"
          />
          <figcaption>Illustrative equipment yard</figcaption>
        </figure>
        <div>
          <p className="tl-kicker">The idea behind YARD</p>
          <h2>
            LESS GUESSWORK.
            <br />
            MORE GETTING STARTED.
          </h2>
          <p>{template.about}</p>
          <p>
            The best first question is a practical one: what does the job need? This design puts
            equipment categories and the details worth asking about in one easy-to-explore place.
          </p>
        </div>
      </section>
      <section className="tl-wrap tl-section yard-principles">
        <p className="tl-kicker">A useful rental experience</p>
        <div>
          <article>
            <span>01 / Clarity</span>
            <h3>See what’s relevant.</h3>
            <p>
              Organise the range by the way people approach a job, with room for the real
              specifications and equipment details.
            </p>
          </article>
          <article>
            <span>02 / Context</span>
            <h3>Ask better questions.</h3>
            <p>
              Explain what customers should know about project fit, site access and transport before
              they enquire.
            </p>
          </article>
          <article>
            <span>03 / Conversation</span>
            <h3>Talk through the details.</h3>
            <p>
              Keep a clear path from browsing to an enquiry, where the business can confirm the
              actual equipment and rental terms.
            </p>
          </article>
        </div>
      </section>
      <YardNextStep />
    </>
  );
}

export default function EquipmentRentalsTemplate({ template, page, enquiryHref }: Props) {
  return (
    <div className="tl-site tl-theme-equipment-rentals">
      <TransportHeader template={template} page={page} />
      {page === "Home" ? (
        <YardHome template={template} />
      ) : page === "Equipment" ? (
        <EquipmentPage />
      ) : page === "Rental guide" ? (
        <RentalGuidePage />
      ) : page === "About" ? (
        <YardAbout template={template} />
      ) : (
        <>
          <TransportPageIntro
            eyebrow="Contact / Tell us the job"
            title="LET’S GET INTO THE DETAILS."
            copy="Use the sample enquiry area to explore this design. On a live site, your project, preferred dates and equipment questions help the rental team prepare a useful response."
          />
          <div className="tl-wrap yard-contact-note">
            <span aria-hidden="true">↗</span>
            <p>
              Sample inventory only. This demo does not check stock, issue rental prices or make
              reservations.
            </p>
          </div>
          <TransportContact template={template} enquiryHref={enquiryHref} />
        </>
      )}
      <TransportFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
