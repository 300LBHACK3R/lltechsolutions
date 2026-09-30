import Image from "next/image";
import Link from "next/link";
import { retailPagePath, type RetailTemplate } from "@/data/website-collection";
import { FloristMoodSelector } from "./RetailSmallInteractions";
import { RetailContact, RetailFooter, RetailHeader } from "./RetailShared";

function StemFlower({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`stem-flower ${className}`}
      viewBox="0 0 180 180"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <ellipse
          key={index}
          cx="90"
          cy="52"
          rx="22"
          ry="45"
          transform={`rotate(${index * 45} 90 90)`}
          fill="currentColor"
        />
      ))}
      <circle cx="90" cy="90" r="17" fill="var(--retail-bg)" />
    </svg>
  );
}

function StemPhoto({ template, compact = false }: { template: RetailTemplate; compact?: boolean }) {
  return (
    <figure className={`stem-photo${compact ? " stem-photo-compact" : ""}`}>
      <Image
        src={template.image}
        alt={template.imageAlt}
        fill
        sizes={compact ? "(max-width: 760px) 90vw, 45vw" : "(max-width: 1100px) 90vw, 56vw"}
        preload={!compact}
      />
      <figcaption>SEASONAL SPIRIT. A LITTLE WILD.</figcaption>
    </figure>
  );
}

function StemHome({ template }: { template: RetailTemplate }) {
  return (
    <>
      <section className="stem-hero">
        <div className="stem-hero-copy">
          <p className="stem-kicker">FLOWERS WITH FEELING.</p>
          <h1>
            {template.headline}
            <br />
            <em>{template.emphasis}</em>
          </h1>
          <p className="stem-hero-intro">{template.intro}</p>
          <Link className="stem-link" href={retailPagePath("Flowers")}>
            Find your flowers <span aria-hidden="true">↗</span>
          </Link>
          <div className="stem-hero-foot">
            <StemFlower />
            <p>
              For the grand gestures.
              <br />
              And the just-becauses.
            </p>
          </div>
        </div>
        <div className="stem-hero-image">
          <span className="stem-hero-annotation">A GATHERING OF GOOD THINGS / No. 01</span>
          <StemPhoto template={template} />
          <div className="stem-paper-label">
            <span>
              STEM
              <br />
              HOUSE
            </span>
            <small>
              COME AS YOU ARE.
              <br />
              LEAVE WITH FLOWERS.
            </small>
          </div>
        </div>
      </section>
      <section className="stem-manifesto" aria-labelledby="stem-manifesto-heading">
        <p className="stem-kicker">OUR WAY WITH FLOWERS</p>
        <h2 id="stem-manifesto-heading">
          Perfectly arranged.
          <br />
          <em>Beautifully untamed.</em>
        </h2>
        <p>{template.about}</p>
        <span className="stem-manifesto-rule" aria-hidden="true" />
      </section>
      <FloristMoodSelector items={template.items} />
      <section className="stem-occasions" aria-labelledby="stem-occasions-heading">
        <div className="stem-occasions-heading">
          <p className="stem-kicker">SAY IT WITH STEMS</p>
          <h2 id="stem-occasions-heading">
            A flower for
            <br />
            <em>the feeling.</em>
          </h2>
          <StemFlower />
        </div>
        <div className="stem-occasion-list">
          {template.services.map((service, index) => (
            <article key={service.name}>
              <span>0{index + 1}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <Link href={retailPagePath("Flowers")} aria-label={`Explore ${service.name}`}>
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="stem-visit-invite">
        <p className="stem-kicker">THERE’S ALWAYS A REASON</p>
        <h2>
          Pop in.
          <br />
          <em>Pick something lovely.</em>
        </h2>
        <Link className="stem-button" href={retailPagePath("Visit")}>
          Visit the flower shop <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

function StemFlowers({ template }: { template: RetailTemplate }) {
  return (
    <>
      <section className="stem-page-heading">
        <div>
          <p className="stem-kicker">THE FLOWER TABLE</p>
          <h1>
            Good things
            <br />
            <em>come in bunches.</em>
          </h1>
        </div>
        <StemFlower />
        <p>A few ways to bring the outside in. The palette may change; the feeling is yours.</p>
      </section>
      <section className="stem-flower-edit" aria-labelledby="stem-flower-edit-heading">
        <div className="stem-flower-edit-image">
          <StemPhoto template={template} compact />
          <p className="stem-kicker">THE SEASON SETS THE PALETTE.</p>
        </div>
        <div className="stem-flower-edit-list">
          <p className="stem-kicker">ILLUSTRATIVE FLOWER COLLECTION</p>
          <h2 id="stem-flower-edit-heading">
            Made to
            <br />
            <em>mean something.</em>
          </h2>
          {template.items.map((item, index) => (
            <article key={item.name}>
              <span className="stem-item-number">0{index + 1}</span>
              <div>
                <p className="stem-kicker">{item.category}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span className="stem-item-price">{item.price}</span>
            </article>
          ))}
          <p className="stem-sample-note">
            Sample arrangements and CAD prices. These are design examples; this demo does not show
            stock or take orders.
          </p>
        </div>
      </section>
      <FloristMoodSelector items={template.items} />
      <section className="stem-flowers-note">
        <p className="stem-kicker">A NOTE ON NATURE</p>
        <h2>
          Never quite
          <br />
          <em>the same twice.</em>
        </h2>
        <p>
          Seasonal flowers have their own ideas. Share the occasion, your colours and the feeling
          you’re after. Specific stems and collection details would be discussed directly with the
          shop.
        </p>
        <Link className="stem-link" href={retailPagePath("Visit")}>
          Let’s find your flowers <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

function StemVisit({ template, enquiryHref }: { template: RetailTemplate; enquiryHref: string }) {
  return (
    <>
      <section className="stem-page-heading stem-visit-heading">
        <div>
          <p className="stem-kicker">FIND A LITTLE COLOUR</p>
          <h1>
            The door
            <br />
            <em>is open.</em>
          </h1>
        </div>
        <StemFlower />
        <p>
          A place for fresh stems, little discoveries and a good reason to take the long way home.
        </p>
      </section>
      <section className="stem-visit-details" aria-labelledby="stem-visit-details-heading">
        <div className="stem-shop-sign">
          <span>COME ON IN</span>
          <StemFlower />
          <strong>
            STEM
            <br />
            HOUSE
          </strong>
          <span>FLOWERS / FOUND JOY</span>
        </div>
        <div className="stem-visit-info">
          <p className="stem-kicker">YOUR NEIGHBOURHOOD FLOWER SHOP</p>
          <h2 id="stem-visit-details-heading">
            Something lovely
            <br />
            <em>is just around the corner.</em>
          </h2>
          <p>
            Your street address, collection information and accessibility details will live here.
          </p>
          <dl>
            <div>
              <dt>Tuesday—Friday</dt>
              <dd>10 am—6 pm</dd>
            </div>
            <div>
              <dt>Saturday</dt>
              <dd>10 am—4 pm</dd>
            </div>
            <div>
              <dt>Sunday—Monday</dt>
              <dd>Taking a breather</dd>
            </div>
          </dl>
          <p className="stem-sample-note">
            Illustrative opening hours for a fictional shop. No live location or collection service
            is available in this preview.
          </p>
        </div>
      </section>
      <RetailContact template={template} enquiryHref={enquiryHref} />
    </>
  );
}

export default function FloristTemplate({
  template,
  page = "home",
  enquiryHref,
}: {
  template: RetailTemplate;
  page?: string;
  enquiryHref: string;
}) {
  return (
    <div className="retail-site retail-theme-flower-shop" data-retail-demo={template.id}>
      <RetailHeader template={template} page={page} />
      {page === "flowers" ? (
        <StemFlowers template={template} />
      ) : page === "visit" ? (
        <StemVisit template={template} enquiryHref={enquiryHref} />
      ) : (
        <StemHome template={template} />
      )}
      <RetailFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
