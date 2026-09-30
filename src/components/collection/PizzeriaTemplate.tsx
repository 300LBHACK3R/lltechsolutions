import Image from "next/image";
import Link from "next/link";
import { foodPagePath, type FoodTemplate } from "@/data/website-collection";
import {
  FoodContact,
  FoodFooter,
  FoodHeader,
  FoodPageIntro,
} from "@/components/collection/FoodShared";
import {
  FoodMenuFilter,
  PizzaGroupSelector,
  PizzaWheel,
} from "@/components/collection/FoodMenuInteractions";

function PizzaSmile() {
  return (
    <svg className="sso-pizza-smile" viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <path d="M33 31C73 9 119 12 155 40L91 161L33 31Z" />
      <path d="M37 45C72 25 111 28 146 51" />
      <circle cx="72" cy="71" r="9" />
      <circle cx="116" cy="65" r="8" />
      <circle cx="93" cy="121" r="8" />
      <path d="M78 92V97M105 92V97M84 103Q92 111 100 103" />
    </svg>
  );
}

function PizzaPhoto({ template, hero = false }: { template: FoodTemplate; hero?: boolean }) {
  return (
    <figure className="sso-photo">
      <Image
        src={template.image}
        alt={template.imageAlt}
        fill
        sizes="(max-width: 760px) 92vw, 62vw"
        preload={hero}
      />
      <figcaption>
        <span>PASS A SLICE. STAY A WHILE.</span>
        <span>ILLUSTRATIVE IMAGE</span>
      </figcaption>
    </figure>
  );
}

function PizzaHome({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="sso-hero sso-wrap">
        <div className="sso-hero-top">
          <p className="sso-eyebrow">{template.subbrand}</p>
          <span>GOOD COMPANY. EXTRA NAPKINS.</span>
        </div>
        <h1>
          {template.brand}
          <span aria-hidden="true">✳</span>
        </h1>
        <div className="sso-hero-floor">
          <div className="sso-hero-copy">
            <h2>
              {template.headline} <em>{template.emphasis}</em>
            </h2>
            <p>{template.intro}</p>
            <p className="sso-wheel-instruction">
              <span aria-hidden="true">↘</span> Pick a pizza. Find your favourite.
            </p>
          </div>
          <PizzaWheel items={template.menu} image={template.image} imageAlt={template.imageAlt} />
          <div className="sso-hero-sticker" aria-hidden="true">
            <PizzaSmile />
            <span>
              SLICE TO
              <br />
              MEET YOU.
            </span>
          </div>
        </div>
      </section>
      <div className="sso-checker" aria-hidden="true" />
      <section className="sso-menu-teaser sso-wrap">
        <div className="sso-section-heading">
          <p className="sso-eyebrow">01 / The usual suspects</p>
          <h2>
            BIG CRUST.
            <br />
            BIGGER MOOD.
          </h2>
          <p>
            Something classic. Something with a little kick. Something everyone wants the last slice
            of.
          </p>
          <Link className="sso-text-link" href={foodPagePath("Menu")}>
            See the full menu <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="sso-featured-pizzas">
          {template.menu.slice(0, 3).map((item, index) => (
            <article key={item.name}>
              <span className="sso-featured-number">0{index + 1}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span>{item.price}</span>
            </article>
          ))}
          <p>Sample menu · Illustrative CAD prices</p>
        </div>
      </section>
      <section className="sso-group-teaser">
        <div className="sso-wrap">
          <div>
            <p className="sso-eyebrow">02 / Good food is a group activity</p>
            <h2>
              YOUR PEOPLE.
              <br />
              ONE BIG TABLE.
            </h2>
          </div>
          <div>
            <p>
              Birthday crew? Team catch-up? Friends who finally found a date that works? This is
              where the conversation starts.
            </p>
            <Link className="sso-button sso-button-cream" href={foodPagePath("Group tables")}>
              Bring the whole crew <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <span className="sso-table-doodle" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
      <section className="sso-place-teaser sso-wrap">
        <PizzaSmile />
        <div>
          <p className="sso-eyebrow">03 / A neighbourhood state of mind</p>
          <h2>
            COME AS YOU ARE.
            <br />
            LEAVE THE LAST SLICE?
          </h2>
          <p>{template.about}</p>
          <Link className="sso-text-link" href={foodPagePath("Our place")}>
            A look around our place <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function PizzaMenu({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="sso-inner-hero sso-wrap">
        <div>
          <p className="sso-eyebrow">The sample menu</p>
          <h1>
            EVERYONE
            <br />
            GETS A SLICE.
          </h1>
        </div>
        <PizzaSmile />
        <p>Find your old favourite. Meet your next one. The only hard part is choosing.</p>
      </section>
      <div className="sso-checker" aria-hidden="true" />
      <section className="sso-menu-section sso-wrap" aria-label="Sample pizza menu">
        <FoodMenuFilter kind="pizzeria" items={template.menu} />
      </section>
      <section className="sso-menu-end sso-wrap">
        <div>
          <h2>
            BIG PLANS?
            <br />
            BIGGER TABLE.
          </h2>
          <p>Give the group its own place in the conversation.</p>
        </div>
        <Link className="sso-button" href={foodPagePath("Group tables")}>
          Talk group tables <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

function PizzaPlace({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="sso-inner-hero sso-wrap">
        <div>
          <p className="sso-eyebrow">Our place</p>
          <h1>
            A LITTLE LOUD.
            <br />A LOT TO LOVE.
          </h1>
        </div>
        <PizzaSmile />
        <p>{template.about}</p>
      </section>
      <div className="sso-place-photo sso-wrap">
        <PizzaPhoto template={template} hero />
        <span className="sso-photo-tag">
          SAVE ROOM
          <br />
          FOR A GOOD TIME.
        </span>
      </div>
      <section className="sso-place-story sso-wrap">
        <p className="sso-eyebrow">The ingredients of a good evening</p>
        <div>
          <article>
            <span>01</span>
            <div>
              <h2>A place to settle in.</h2>
              <p>
                A table in the corner, a catch-up that runs long, a familiar face across the room.
                Bring your own restaurant’s story to this space.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h2>A menu to pass around.</h2>
              <p>
                Keep the favourites close and leave room to try something different. Explore the
                illustrative pizza selection and find a starting point for your own menu.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h2>A good reason to gather.</h2>
              <p>
                From a small catch-up to a bigger occasion, a simple enquiry helps the team
                understand what you have in mind.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="sso-menu-end sso-wrap">
        <h2>
          MEET YOU
          <br />
          AT THE TABLE.
        </h2>
        <Link className="sso-button" href={foodPagePath("Contact")}>
          Let’s talk <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

function PizzaGroups() {
  return (
    <>
      <section className="sso-inner-hero sso-wrap">
        <div>
          <p className="sso-eyebrow">Group tables</p>
          <h1>
            MORE PEOPLE.
            <br />
            MORE REASONS.
          </h1>
        </div>
        <PizzaSmile />
        <p>The group chat has a plan. Let’s give it somewhere to land.</p>
      </section>
      <div className="sso-checker" aria-hidden="true" />
      <section className="sso-groups-content sso-wrap">
        <div>
          <p className="sso-eyebrow">You bring the occasion</p>
          <h2>
            WE’LL START
            <br />
            WITH A HELLO.
          </h2>
          <p>
            Choose an example group size to see what to include in your enquiry. A live restaurant
            would discuss the arrangements and confirm availability with you.
          </p>
          <div className="sso-group-note">
            <span aria-hidden="true">↗</span>
            <p>
              Have a date in mind? Include your preferred time, party size and anything that would
              help the team plan with you.
            </p>
          </div>
        </div>
        <PizzaGroupSelector />
      </section>
    </>
  );
}

export default function PizzeriaTemplate({
  template,
  page = "home",
  enquiryHref,
}: {
  template: FoodTemplate;
  page?: string;
  enquiryHref: string;
}) {
  return (
    <div className="food-site food-theme-pizzeria" data-food-demo={template.id}>
      <FoodHeader template={template} page={page} />
      {page === "home" ? (
        <PizzaHome template={template} />
      ) : page === "menu" ? (
        <PizzaMenu template={template} />
      ) : page === "our-place" ? (
        <PizzaPlace template={template} />
      ) : page === "group-tables" ? (
        <PizzaGroups />
      ) : (
        <div className="sso-contact-page">
          <FoodPageIntro
            eyebrow="Get in touch"
            title="LET’S TALK PIZZA."
            description="A question, a group gathering or a little curiosity? Explore this sample enquiry. It does not reserve a table or send a message to a restaurant."
          />
          <FoodContact template={template} enquiryHref={enquiryHref} />
        </div>
      )}
      <FoodFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
