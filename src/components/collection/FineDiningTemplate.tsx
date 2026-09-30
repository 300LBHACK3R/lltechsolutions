import Image from "next/image";
import Link from "next/link";
import { foodPagePath, type FoodTemplate } from "@/data/website-collection";
import { DiningMenuSelector } from "./FoodPremiumInteractions";
import { FoodContact, FoodFooter, FoodHeader, FoodPageIntro } from "./FoodShared";

type DiningProps = { template: FoodTemplate; page?: string; enquiryHref: string };

function DiningPhoto({
  template,
  className = "",
  eager = false,
}: {
  template: FoodTemplate;
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure className={`vd-photo ${className}`}>
      <Image
        src={template.image}
        alt={template.imageAlt}
        fill
        sizes="(max-width: 800px) 100vw, 70vw"
        loading={eager ? "eager" : "lazy"}
      />
      <figcaption>Vesper / An illustrative dining concept</figcaption>
    </figure>
  );
}

function DiningNext({ title = "The beginning of a good evening." }: { title?: string }) {
  return (
    <section className="vd-next vd-wrap">
      <span className="vd-sun-mark" aria-hidden="true">
        ✳
      </span>
      <p className="vd-eyebrow">A conversation, first</p>
      <h2>{title}</h2>
      <Link className="vd-link" href={foodPagePath("Contact")}>
        Contact Vesper <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

function DiningHome({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="vd-hero">
        <Image
          className="vd-hero-image"
          src={template.image}
          alt={template.imageAlt}
          fill
          sizes="100vw"
          loading="eager"
        />
        <div className="vd-hero-shade" />
        <div className="vd-hero-topline">
          <span>A dining room. A slower rhythm.</span>
          <span>Illustrative restaurant concept</span>
        </div>
        <div className="vd-hero-content">
          <p className="vd-eyebrow">For the pleasure of an evening</p>
          <h1>
            <span>{template.headline}</span>
            <em>{template.emphasis}</em>
          </h1>
          <Link className="vd-hero-link" href={foodPagePath("The menu")}>
            Discover the menu <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="vd-hero-bottom">
          <span>Food / Atmosphere / Conversation</span>
          <a href="#the-evening">
            The evening unfolds <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section className="vd-opening vd-wrap" id="the-evening">
        <p className="vd-eyebrow">01 / At the table</p>
        <h2>
          A little less haste.
          <br />
          <em>A little more flavour.</em>
        </h2>
        <div>
          <p>{template.intro}</p>
          <Link className="vd-link" href={foodPagePath("Our story")}>
            The idea behind Vesper <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="vd-home-menu">
        <div className="vd-wrap">
          <div className="vd-section-intro">
            <p className="vd-eyebrow">02 / The menu</p>
            <h2>
              An evening
              <br />
              <em>in chapters.</em>
            </h2>
            <p>
              Bright beginnings. Deeper flavours. A quiet final note. Explore an illustrative
              journey through the menu.
            </p>
          </div>
          <DiningMenuSelector />
          <Link className="vd-link" href={foodPagePath("The menu")}>
            The full menu <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="vd-room-teaser vd-wrap">
        <div className="vd-room-text">
          <p className="vd-eyebrow">03 / In good company</p>
          <h2>
            A room
            <br />
            for <em>staying.</em>
          </h2>
          <p>
            Low light. Warm textures. The space between courses. A dining concept with as much
            thought for the room as for the plate.
          </p>
          <Link className="vd-link" href={foodPagePath("The room")}>
            Step into the room <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <DiningPhoto template={template} className="vd-room-crop" />
        <span className="vd-room-margin" aria-hidden="true">
          VESPER / AFTER THE LIGHT
        </span>
      </section>
      <section className="vd-private-band">
        <div className="vd-wrap">
          <p className="vd-eyebrow">04 / A table of your own</p>
          <h2>
            The occasion is yours.
            <br />
            <em>Give it an evening.</em>
          </h2>
          <Link className="vd-link" href={foodPagePath("Private dining")}>
            Private dining <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <DiningNext />
    </>
  );
}

function DiningMenuPage({ template }: { template: FoodTemplate }) {
  return (
    <>
      <FoodPageIntro
        eyebrow="01 / The menu"
        title="An evening, course by course."
        description="An illustrative menu with room for the season. Explore two tasting journeys, or look through a few sample dishes below."
      />
      <section className="vd-wrap vd-menu-page">
        <DiningMenuSelector />
      </section>
      <section className="vd-section vd-wrap vd-a-la-carte">
        <div>
          <p className="vd-eyebrow">A few individual pleasures</p>
          <h2>
            From
            <br />
            <em>the kitchen.</em>
          </h2>
          <p>
            Illustrative dishes and prices in CAD. The restaurant would confirm its current menu,
            ingredients and availability at launch.
          </p>
        </div>
        <div className="vd-dish-list">
          {template.menu.map((item) => (
            <article key={item.name}>
              <div>
                <span className="vd-eyebrow">{item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span>
                {item.price}
                <small>CAD / sample</small>
              </span>
            </article>
          ))}
        </div>
      </section>
      <section className="vd-menu-note vd-wrap">
        <h2>A note on the table.</h2>
        <p>
          Menus can change with ingredients and availability. Discuss allergies, dietary needs and
          ingredient questions directly with the restaurant before making arrangements. The sample
          dishes here do not establish suitability for any dietary requirement.
        </p>
      </section>
      <DiningNext title="Bring your questions to the table." />
    </>
  );
}

function DiningRoom({ template }: { template: FoodTemplate }) {
  return (
    <>
      <FoodPageIntro
        eyebrow="02 / The room"
        title="Stay a little longer."
        description="A study in warmth, texture and the pleasure of being present. The room is part of the evening."
      />
      <DiningPhoto template={template} className="vd-room-panorama" eager />
      <section className="vd-section vd-wrap vd-room-manifesto">
        <span className="vd-eyebrow">The feeling of a place</span>
        <h2>
          Soft light.
          <br />A considered table.
          <br />
          <em>Room to talk.</em>
        </h2>
        <p>
          This illustrative dining concept pairs dark timber tones with soft linen, warm light and
          an unhurried atmosphere. The photography sets a design direction; it does not show a
          bookable venue.
        </p>
      </section>
      <section className="vd-room-details vd-wrap">
        <article>
          <span>01 / The table</span>
          <h3>A thoughtful setting.</h3>
          <p>
            Space for a shared bottle, another course and the conversations that find their own
            rhythm.
          </p>
        </article>
        <article>
          <span>02 / The pace</span>
          <h3>An evening with room.</h3>
          <p>
            A progression of plates that gives each course its moment. Real service times would be
            confirmed by the restaurant.
          </p>
        </article>
        <article>
          <span>03 / Before you visit</span>
          <h3>The details that matter.</h3>
          <p>
            Opening hours, access, directions and any accommodation needs belong in the conversation
            before a visit.
          </p>
          <Link className="vd-link" href={foodPagePath("Contact")}>
            Ask a question <span aria-hidden="true">↗</span>
          </Link>
        </article>
      </section>
      <DiningNext />
    </>
  );
}

function DiningPrivate({ template }: { template: FoodTemplate }) {
  return (
    <>
      <FoodPageIntro
        eyebrow="03 / Private dining"
        title="Some occasions deserve their own table."
        description="An intimate dinner, a milestone, a thoughtful gathering. Begin with the occasion and let the evening take shape around it."
      />
      <section className="vd-private-feature vd-wrap">
        <DiningPhoto template={template} eager />
        <div className="vd-private-note">
          <p className="vd-eyebrow">A gathering with intention</p>
          <h2>
            Your people.
            <br />
            <em>Your evening.</em>
          </h2>
          <p>
            A private dining concept for shared moments, with a menu direction and a pace that suit
            the occasion.
          </p>
          <Link className="vd-link" href={foodPagePath("Contact")}>
            Discuss an occasion <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="vd-section vd-wrap vd-private-process">
        <p className="vd-eyebrow">Three things to begin with</p>
        <ol>
          <li>
            <span>01</span>
            <h2>The occasion</h2>
            <p>
              A preferred date, an alternative and what is bringing the group together. Availability
              would be confirmed directly.
            </p>
          </li>
          <li>
            <span>02</span>
            <h2>The people</h2>
            <p>
              An approximate guest count, access needs and dietary requirements for the restaurant
              to review.
            </p>
          </li>
          <li>
            <span>03</span>
            <h2>The evening</h2>
            <p>
              A menu direction, the intended pace and any room or service requirements. A real
              proposal would confirm pricing and scope.
            </p>
          </li>
        </ol>
      </section>
      <aside className="vd-brochure-note vd-wrap">
        <span className="vd-sun-mark" aria-hidden="true">
          ✳
        </span>
        <p>
          This is an illustrative private dining brochure. No venue capacity, availability, minimum
          spend or reservation is offered here. Use the sample contact form to explore the design.
        </p>
      </aside>
      <DiningNext title="Every good gathering begins somewhere." />
    </>
  );
}

function DiningStory({ template }: { template: FoodTemplate }) {
  return (
    <>
      <FoodPageIntro
        eyebrow="04 / Our story"
        title="The hour between day and evening."
        description="Vesper is an imagined restaurant shaped around one simple idea: good food deserves a little time."
      />
      <section className="vd-story vd-wrap">
        <p className="vd-story-drop">
          The day softens. The table is set. There is nowhere else to be for a while.
        </p>
        <div>
          <p>{template.about}</p>
          <p>
            This fictional restaurant concept brings seasonal menus and a considered dining room
            together in one place. It is an invitation to picture an evening built around the food,
            the room and the people across the table.
          </p>
          <p>
            When this website becomes a real restaurant’s home, this space is for its own origin,
            its own people and its own approach. The story should always belong to the business
            telling it.
          </p>
        </div>
      </section>
      <DiningPhoto template={template} className="vd-story-photo" />
      <section className="vd-story-principles vd-wrap">
        <p className="vd-eyebrow">Three guiding thoughts</p>
        <div>
          <h2>Let the ingredients speak.</h2>
          <p>A clear menu and a few carefully chosen details can say a great deal.</p>
        </div>
        <div>
          <h2>Make room for the moment.</h2>
          <p>The setting and the pace matter alongside what arrives on the plate.</p>
        </div>
        <div>
          <h2>Keep the welcome simple.</h2>
          <p>Useful information and a clear way to ask a question begin the experience.</p>
        </div>
      </section>
      <DiningNext />
    </>
  );
}

function DiningJournal({ template }: { template: FoodTemplate }) {
  return (
    <>
      <FoodPageIntro
        eyebrow="05 / The journal"
        title="Notes from the table."
        description="Small observations on menus, gatherings and the details that give an evening its shape. Sample editorial content for the Vesper concept."
      />
      <section className="vd-journal-lead vd-wrap">
        <DiningPhoto template={template} eager />
        <article>
          <p className="vd-eyebrow">Notebook 01 / The rhythm of a menu</p>
          <h2>
            Not every course
            <br />
            needs to <em>shout.</em>
          </h2>
          <p>
            A tasting menu has a rhythm. A bright beginning gives way to something deeper, then a
            small pause changes the mood again. Contrast makes each course feel distinct.
          </p>
          <p>
            When writing a menu, a few precise ingredients can do more than a long description.
            Leave a little room for discovery, while making the essential information easy to find.
          </p>
          <Link className="vd-link" href={foodPagePath("The menu")}>
            Explore the sample menu <span aria-hidden="true">↗</span>
          </Link>
        </article>
      </section>
      <section className="vd-journal-notes vd-wrap">
        <article>
          <p className="vd-eyebrow">Notebook 02 / Around the table</p>
          <h2>What makes an occasion?</h2>
          <p>
            It might be an anniversary, a reunion or simply a date finally found in everyone’s
            diary. Start with the people and the mood, then think about the food.
          </p>
          <p>
            For a private gathering, share a little about the occasion as well as the practical
            details. The shape of the evening can follow.
          </p>
          <Link className="vd-link" href={foodPagePath("Private dining")}>
            Consider private dining <span aria-hidden="true">↗</span>
          </Link>
        </article>
        <article>
          <p className="vd-eyebrow">Notebook 03 / A sense of place</p>
          <h2>The space between courses.</h2>
          <p>
            Light, texture, sound and space are quiet parts of a meal. A linen napkin, a warm pool
            of light and enough room for conversation can change the feeling of a table.
          </p>
          <p>
            A restaurant website can reflect that atmosphere while keeping the practical details
            close at hand.
          </p>
          <Link className="vd-link" href={foodPagePath("The room")}>
            Explore the room concept <span aria-hidden="true">↗</span>
          </Link>
        </article>
      </section>
      <DiningNext title="A thought. A question. An occasion." />
    </>
  );
}

export default function FineDiningTemplate({ template, page = "home", enquiryHref }: DiningProps) {
  return (
    <div className="food-site vd-site" data-food-demo={template.id}>
      <FoodHeader template={template} page={page} />
      {page === "home" ? (
        <DiningHome template={template} />
      ) : page === "the-menu" ? (
        <DiningMenuPage template={template} />
      ) : page === "the-room" ? (
        <DiningRoom template={template} />
      ) : page === "private-dining" ? (
        <DiningPrivate template={template} />
      ) : page === "our-story" ? (
        <DiningStory template={template} />
      ) : page === "journal" ? (
        <DiningJournal template={template} />
      ) : (
        <>
          <FoodPageIntro
            eyebrow="06 / Contact"
            title="The evening begins with a hello."
            description="Explore the sample enquiry form below. For a real conversation about this website, follow the L&L enquiry link."
          />
          <FoodContact template={template} enquiryHref={enquiryHref} />
        </>
      )}
      <FoodFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
