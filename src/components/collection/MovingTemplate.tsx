import Image from "next/image";
import Link from "next/link";
import type { TransportTemplate } from "@/data/website-collection";
import { MovingPackingChecklist } from "@/components/collection/TransportSmallInteractions";
import {
  TransportContact,
  TransportFooter,
  TransportHeader,
  TransportPageIntro,
} from "@/components/collection/TransportShared";

function MovingBoxes({ large = false }: { large?: boolean }) {
  return (
    <div className={`mc-boxes${large ? " mc-boxes-large" : ""}`} aria-hidden="true">
      <div className="mc-box mc-box-top">
        <span>KITCHEN</span>
        <b>↑ ↑</b>
      </div>
      <div className="mc-box mc-box-left">
        <span>
          GOOD
          <br />
          THINGS
          <br />
          INSIDE.
        </span>
      </div>
      <div className="mc-box mc-box-right">
        <span>
          HANDLE
          <br />
          WITH CARE
        </span>
        <b>♡</b>
      </div>
    </div>
  );
}

function MovingServices({
  template,
  expanded = false,
}: {
  template: TransportTemplate;
  expanded?: boolean;
}) {
  return (
    <div className={`mc-services-grid${expanded ? " mc-services-full" : ""}`}>
      {template.services.map((service, index) => (
        <article key={service.name}>
          <span className="mc-service-mark" aria-hidden="true">
            {["⌂", "↗", "▤"][index % 3]}
          </span>
          <span className="mc-service-number">0{index + 1}</span>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          {expanded ? (
            <details>
              <summary>
                What to talk through <span aria-hidden="true">+</span>
              </summary>
              <p>{service.detail}</p>
            </details>
          ) : (
            <Link className="mc-text-link" href="/services">
              Explore this service <span aria-hidden="true">↗</span>
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

function MovingHome({ template }: { template: TransportTemplate }) {
  return (
    <>
      <section className="mc-hero">
        <div className="mc-hero-copy">
          <p className="tl-kicker">A fresh start is a good move.</p>
          <h1>
            {template.headline} <em>{template.emphasis}</em>
          </h1>
          <p>{template.intro}</p>
          <Link className="tl-button mc-button" href="/contact">
            Let’s plan your move <span aria-hidden="true">↗</span>
          </Link>
          <span className="mc-hero-footnote">A little planning. A lot to look forward to.</span>
        </div>
        <div className="mc-hero-art">
          <figure className="mc-photo">
            <Image
              src={template.image}
              alt={template.imageAlt}
              fill
              sizes="(max-width: 800px) 90vw, 48vw"
              preload
            />
            <figcaption>NEXT STOP: YOUR NEXT CHAPTER.</figcaption>
          </figure>
          <span className="mc-sunburst" aria-hidden="true">
            HELLO,
            <br />
            NEW HOME.
          </span>
          <MovingBoxes />
        </div>
      </section>
      <div className="mc-ribbon" aria-hidden="true">
        <span>GOOD PEOPLE.</span>
        <i>✳</i>
        <span>GOOD PLANS.</span>
        <i>✳</i>
        <span>GOOD MOVE.</span>
      </div>
      <section className="mc-services" aria-labelledby="mc-services-title">
        <div className="mc-section-heading">
          <div>
            <p className="tl-kicker">Room for what comes next</p>
            <h2 id="mc-services-title">
              However you’re moving,
              <br />
              let’s make a plan.
            </h2>
          </div>
          <Link className="mc-text-link" href="/services">
            Our moving services <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <MovingServices template={template} />
      </section>
      <section className="mc-about" aria-labelledby="mc-about-title">
        <div className="mc-about-heading">
          <span className="mc-doodle" aria-hidden="true">
            ↝
          </span>
          <p className="tl-kicker">More than a change of address</p>
          <h2 id="mc-about-title">
            Your life, packed
            <br />
            with care.
          </h2>
        </div>
        <div>
          <p>{template.about}</p>
          <p>
            From the first conversation to the last box, the useful details matter. We start by
            understanding what you’re moving, where it’s going and the help you need.
          </p>
          <Link className="mc-text-link" href="/contact">
            Start with a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="mc-planning" aria-label="Moving preparation">
        <MovingPackingChecklist />
        <aside className="mc-planning-aside">
          <MovingBoxes large />
          <p className="tl-kicker">Little things, big difference</p>
          <h2>
            A box for the
            <br />
            first cup of tea.
          </h2>
          <p>
            Some things belong at the top of the pile. Keep your everyday essentials together,
            clearly labelled and easy to reach.
          </p>
        </aside>
      </section>
      <section className="mc-next">
        <p className="tl-kicker">On to the good part</p>
        <h2>
          New place.
          <br />
          <em>Here you come.</em>
        </h2>
        <Link className="tl-button mc-button" href="/contact">
          Talk about your move <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

export default function MovingTemplate({
  template,
  page,
  enquiryHref,
}: {
  template: TransportTemplate;
  page: string;
  enquiryHref: string;
}) {
  return (
    <div className="tl-site tl-theme-moving-company">
      <TransportHeader template={template} page={page} />
      {page === "Home" ? (
        <MovingHome template={template} />
      ) : page === "Services" ? (
        <>
          <div className="mc-page-intro">
            <TransportPageIntro
              eyebrow="GOOD MOVE / SERVICES"
              title="A little help for your next big thing."
              copy="Every move has its own shape. Tell us what you have in mind and we’ll talk through the right help, the practical details and the next steps."
            />
          </div>
          <section className="mc-services mc-inner-services" aria-labelledby="mc-service-options">
            <div className="mc-section-heading">
              <div>
                <p className="tl-kicker">Find your starting point</p>
                <h2 id="mc-service-options">What kind of move?</h2>
              </div>
            </div>
            <MovingServices template={template} expanded />
          </section>
          <section className="mc-move-steps">
            <div>
              <p className="tl-kicker">Before the first box</p>
              <h2>
                Good moves
                <br />
                start here.
              </h2>
              <p>
                Scope, availability and pricing are agreed after a conversation about your move.
              </p>
            </div>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <h3>Tell us the outline</h3>
                  <p>
                    Your general locations, the size of your move and the timing you have in mind.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Talk through the details</h3>
                  <p>
                    Discuss access, parking, stairs, larger items and the packing help you need.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Agree a clear plan</h3>
                  <p>
                    Confirm what is included, what you will prepare and how the moving day will
                    work.
                  </p>
                </div>
              </li>
            </ol>
          </section>
          <section className="mc-planning mc-planning-wide" aria-label="Moving checklist">
            <MovingPackingChecklist />
            <div className="mc-plan-next">
              <p className="tl-kicker">Make a little headway</p>
              <h2>
                Less wondering.
                <br />
                More looking forward.
              </h2>
              <p>A clear plan starts with a simple conversation.</p>
              <Link className="tl-button mc-button" href="/contact">
                Plan your next step <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="mc-page-intro">
            <TransportPageIntro
              eyebrow="GOOD MOVE / CONTACT"
              title="Tell us where life is taking you."
              copy="Start with the big picture: the kind of move, your general locations and when you hope to move. The finer details come with a conversation."
            />
          </div>
          <section className="mc-contact" aria-label="Contact GOOD MOVE">
            <TransportContact template={template} enquiryHref={enquiryHref} />
          </section>
          <section className="mc-contact-notes">
            <div>
              <p className="tl-kicker">Useful to have in mind</p>
              <h2>
                A few details
                <br />
                to get us started.
              </h2>
            </div>
            <ul>
              <li>The kind of place you’re moving from and to</li>
              <li>Your preferred moving date or general timeframe</li>
              <li>Any stairs, lifts or access considerations</li>
              <li>Whether you would like to discuss packing help</li>
            </ul>
          </section>
        </>
      )}
      <TransportFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
