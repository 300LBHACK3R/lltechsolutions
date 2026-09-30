import Image from "next/image";
import Link from "next/link";
import { foodPagePath, type FoodTemplate } from "@/data/website-collection";
import { CateringEventPlanner } from "./FoodPremiumInteractions";
import { FoodContact, FoodFooter, FoodHeader, FoodPageIntro } from "./FoodShared";

type CateringProps = { template: FoodTemplate; page?: string; enquiryHref: string };

function CateringImage({
  template,
  className = "",
  eager = false,
}: {
  template: FoodTemplate;
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure className={`cf-image ${className}`}>
      <Image
        src={template.image}
        alt={template.imageAlt}
        fill
        sizes="(max-width: 760px) 100vw, 56vw"
        loading={eager ? "eager" : "lazy"}
      />
      <figcaption>Illustrative gathering / Table & Field</figcaption>
    </figure>
  );
}

function CateringMenus({ template }: { template: FoodTemplate }) {
  return (
    <div className="cf-menu-list">
      {template.menu.map((item, index) => (
        <article key={item.name}>
          <span className="cf-menu-number">0{index + 1}</span>
          <div>
            <p className="cf-eyebrow">{item.category}</p>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <p className="cf-menu-price">
            {item.price}
            <small>Illustrative CAD</small>
          </p>
        </article>
      ))}
    </div>
  );
}

function CateringNext({
  title = "Something lovely starts with a conversation.",
}: {
  title?: string;
}) {
  return (
    <section className="cf-next cf-wrap">
      <p className="cf-eyebrow">Around your table</p>
      <h2>{title}</h2>
      <Link className="cf-button" href={foodPagePath("Contact")}>
        Start the conversation <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

function CateringHome({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="cf-hero cf-wrap">
        <div className="cf-hero-copy">
          <p className="cf-eyebrow">Seasonal food. Shared occasions.</p>
          <h1>
            {template.headline}
            <em>{template.emphasis}</em>
          </h1>
          <p>{template.intro}</p>
          <Link className="cf-button" href={foodPagePath("Menus")}>
            Find your menu <span aria-hidden="true">↗</span>
          </Link>
          <div className="cf-hero-note">
            <span aria-hidden="true">✳</span>
            <p>
              For the days
              <br />
              you gather together.
            </p>
          </div>
        </div>
        <div className="cf-hero-art">
          <div className="cf-art-backdrop" aria-hidden="true" />
          <CateringImage template={template} eager />
          <div className="cf-roundel" aria-hidden="true">
            <span>
              Food, flowers
              <br />& good company
            </span>
            <b>T&F</b>
          </div>
          <p className="cf-photo-label">A table with a little soul.</p>
        </div>
      </section>
      <div className="cf-ticker" aria-label="The Table and Field approach">
        <span>Thoughtful food</span>
        <i aria-hidden="true">✳</i>
        <span>A sense of occasion</span>
        <i aria-hidden="true">✳</i>
        <span>Time together</span>
      </div>
      <section className="cf-section cf-wrap">
        <div className="cf-section-heading">
          <div>
            <p className="cf-eyebrow">01 / A taste of the table</p>
            <h2>
              Good things
              <br />
              <em>are better shared.</em>
            </h2>
          </div>
          <p>
            A few starting points for your gathering. Build the meal around the people, the setting
            and the kind of day you have in mind.
          </p>
        </div>
        <CateringMenus template={template} />
        <div className="cf-menu-foot">
          <p>
            Illustrative menus and CAD prices. Final dishes, availability and event scope are agreed
            at launch.
          </p>
          <Link className="cf-text-link" href={foodPagePath("Menus")}>
            Explore the menus <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="cf-gather">
        <div className="cf-wrap cf-gather-grid">
          <div>
            <p className="cf-eyebrow">02 / Room for your occasion</p>
            <h2>
              Big moments.
              <br />
              Small pleasures.
              <br />
              <em>Your people.</em>
            </h2>
          </div>
          <div className="cf-occasion-list">
            {[
              {
                name: "Celebrations",
                copy: "The milestones, the reunions, the just-because occasions.",
              },
              {
                name: "Work gatherings",
                copy: "A team around a table. A moment outside the everyday.",
              },
              {
                name: "Intimate dinners",
                copy: "Fewer places set, with just as much thought behind them.",
              },
            ].map((occasion, index) => (
              <Link key={occasion.name} href={foodPagePath("Events")}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{occasion.name}</h3>
                  <p>{occasion.copy}</p>
                </div>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="cf-section cf-wrap cf-home-approach">
        <p className="cf-eyebrow">03 / The way we gather</p>
        <div>
          <h2>
            A little thought.
            <br />
            <em>All the difference.</em>
          </h2>
          <p>
            Seasonality gives the menu its direction. Your occasion gives it its shape. This concept
            puts clear planning, a considered table and easy conversation at the centre.
          </p>
          <Link className="cf-text-link" href={foodPagePath("Our approach")}>
            Our approach <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <span className="cf-flower" aria-hidden="true">
          ✳
        </span>
      </section>
      <CateringNext />
    </>
  );
}

function CateringMenuPage({ template }: { template: FoodTemplate }) {
  return (
    <>
      <FoodPageIntro
        eyebrow="At the table / Sample menus"
        title="Something for the way you gather."
        description="A sharing table, a seated supper, a sweet final bite. Explore these illustrative menu directions and imagine your own occasion."
      />
      <section className="cf-wrap cf-menu-page">
        <CateringMenus template={template} />
        <p className="cf-menu-disclaimer">
          All dishes and prices are illustrative, in CAD. Actual menus and prices may change at
          launch. Staffing, rentals, travel, service, taxes and dietary requirements would be
          discussed before a real proposal.
        </p>
      </section>
      <section className="cf-section cf-wrap cf-menu-story">
        <CateringImage template={template} />
        <div>
          <p className="cf-eyebrow">A menu is only the beginning</p>
          <h2>
            Let the occasion
            <br />
            <em>set the rhythm.</em>
          </h2>
          <p>
            Sharing plates invite conversation. A seated meal creates a natural pause. Small bites
            make room for people to move and mingle.
          </p>
          <dl>
            <div>
              <dt>The food</dt>
              <dd>A seasonal direction, portion style and dietary discussion.</dd>
            </div>
            <div>
              <dt>The setting</dt>
              <dd>Venue access, preparation space and a clear plan for service.</dd>
            </div>
            <div>
              <dt>The details</dt>
              <dd>Tableware, staffing and the pace of your gathering.</dd>
            </div>
          </dl>
          <Link className="cf-text-link" href={foodPagePath("Events")}>
            Think through your event <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <CateringNext title="What would you love to put on the table?" />
    </>
  );
}

function CateringEvents({ template }: { template: FoodTemplate }) {
  return (
    <>
      <FoodPageIntro
        eyebrow="A reason to gather / Events"
        title="Every gathering has its own shape."
        description="Start with the people and the occasion. Use the small planning exercise below to think through the details before a real conversation."
      />
      <section className="cf-wrap cf-events-planner">
        <CateringEventPlanner />
      </section>
      <section className="cf-section cf-wrap">
        <div className="cf-section-heading">
          <div>
            <p className="cf-eyebrow">Making room for the details</p>
            <h2>
              A clearer brief.
              <br />
              <em>A calmer beginning.</em>
            </h2>
          </div>
          <p>
            The practical pieces are part of the experience. Your final menu and event scope need a
            real conversation with the catering business.
          </p>
        </div>
        <div className="cf-event-notes">
          {template.services.map((service, index) => (
            <article key={service.name}>
              <span className="cf-eyebrow">0{index + 1}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>{service.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <CateringNext title="Tell us what you are bringing people together for." />
    </>
  );
}

function CateringApproach({ template }: { template: FoodTemplate }) {
  return (
    <>
      <FoodPageIntro
        eyebrow="Food, people, place / Our approach"
        title="The good kind of thoughtful."
        description="A concept for catering that feels generous, grounded and personal. It begins with the season and takes its shape from your gathering."
      />
      <section className="cf-wrap cf-approach-feature">
        <CateringImage template={template} eager />
        <div>
          <span className="cf-flower" aria-hidden="true">
            ✳
          </span>
          <h2>
            Less fuss.
            <br />
            <em>More feeling.</em>
          </h2>
          <p>{template.about}</p>
        </div>
      </section>
      <section className="cf-section cf-wrap">
        <ol className="cf-approach-list">
          <li>
            <span>01</span>
            <h2>
              Begin with
              <br />
              <em>the occasion.</em>
            </h2>
            <div>
              <p>
                What are you celebrating? How do you want people to feel? A menu makes more sense
                when it belongs to a moment.
              </p>
              <p>Share a date, a rough guest count and the kind of gathering you have in mind.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <h2>
              Follow
              <br />
              <em>the season.</em>
            </h2>
            <div>
              <p>
                Let the ingredients bring colour, texture and variety to the table. Choose a menu
                direction with room to adapt.
              </p>
              <p>
                Final ingredients, substitutions and dietary needs should be confirmed directly
                before the event.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <h2>
              Care for
              <br />
              <em>the details.</em>
            </h2>
            <div>
              <p>
                Good planning makes space for a relaxed occasion. Think about the venue, the table,
                the flow of service and the final clear-down.
              </p>
              <p>
                A written scope would confirm what is included, what is hired separately and who
                handles each part.
              </p>
            </div>
          </li>
        </ol>
      </section>
      <CateringNext />
    </>
  );
}

export default function CateringTemplate({ template, page = "home", enquiryHref }: CateringProps) {
  return (
    <div className="food-site cf-site" data-food-demo={template.id}>
      <FoodHeader template={template} page={page} />
      {page === "home" ? (
        <CateringHome template={template} />
      ) : page === "menus" ? (
        <CateringMenuPage template={template} />
      ) : page === "events" ? (
        <CateringEvents template={template} />
      ) : page === "our-approach" ? (
        <CateringApproach template={template} />
      ) : (
        <>
          <FoodPageIntro
            eyebrow="A first conversation / Contact"
            title="Let’s make room at the table."
            description="Try the demonstration enquiry with sample details, or follow the L&L link to discuss this website for your own business."
          />
          <FoodContact template={template} enquiryHref={enquiryHref} />
        </>
      )}
      <FoodFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
