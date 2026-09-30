import Image from "next/image";
import Link from "next/link";
import { foodPagePath, type FoodTemplate } from "@/data/website-collection";
import {
  FoodContact,
  FoodFooter,
  FoodHeader,
  FoodPageIntro,
} from "@/components/collection/FoodShared";
import { FoodMenuFilter } from "@/components/collection/FoodMenuInteractions";

function BakeryMark() {
  return (
    <svg className="bcr-mark" viewBox="0 0 100 62" fill="none" aria-hidden="true">
      <path d="M10 40C18 20 32 11 50 11C68 11 82 20 90 40L76 52L62 44H38L24 52L10 40Z" />
      <path d="M28 18L38 44M43 12L45 43M57 12L55 43M72 18L62 44M13 35L29 40M87 35L71 40" />
    </svg>
  );
}

function BakeryPhoto({ template, hero = false }: { template: FoodTemplate; hero?: boolean }) {
  return (
    <figure className="bcr-photo">
      <Image
        src={template.image}
        alt={template.imageAlt}
        fill
        sizes="(max-width: 760px) 92vw, 51vw"
        preload={hero}
      />
      <figcaption>
        <span>A LITTLE BUTTER. A LITTLE JOY.</span>
        <span>ILLUSTRATIVE BAKES</span>
      </figcaption>
    </figure>
  );
}

function BakeryHome({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="bcr-hero bcr-wrap">
        <div className="bcr-hero-copy">
          <p className="bcr-eyebrow">{template.subbrand}</p>
          <h1>
            {template.headline} <em>{template.emphasis}</em>
          </h1>
          <p className="bcr-intro">{template.intro}</p>
          <Link className="bcr-button" href={foodPagePath("Bakes")}>
            Meet the bakes <span aria-hidden="true">↗</span>
          </Link>
          <div className="bcr-hero-note">
            <span aria-hidden="true">✳</span>
            <p>
              For the first coffee.
              <br />
              And the last little crumb.
            </p>
          </div>
        </div>
        <div className="bcr-hero-art">
          <BakeryPhoto template={template} hero />
          <div className="bcr-stamp" aria-hidden="true">
            <span>THE LITTLE</span>
            <BakeryMark />
            <span>THINGS IN LIFE</span>
          </div>
        </div>
      </section>
      <div className="bcr-ribbon" aria-hidden="true">
        <span>A GOOD DAY STARTS WITH A LITTLE BUTTER</span>
        <BakeryMark />
        <span>BREAK BREAD. TAKE YOUR TIME.</span>
      </div>
      <section className="bcr-counter bcr-wrap">
        <div className="bcr-section-heading">
          <p className="bcr-eyebrow">01 / From the counter</p>
          <h2>
            Something flaky.
            <br />
            <em>Something lovely.</em>
          </h2>
          <p>A few little reasons to take the long way home.</p>
        </div>
        <div className="bcr-featured-bakes">
          {template.menu
            .filter((_, index) => [0, 2, 4].includes(index))
            .map((item, index) => (
              <article className="bcr-featured-bake" key={item.name}>
                <span className="bcr-bake-index">0{index + 1}</span>
                <div>
                  <p className="bcr-eyebrow">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="bcr-bake-price">{item.price}</span>
              </article>
            ))}
          <div className="bcr-counter-bottom">
            <span>Sample menu · Illustrative CAD prices</span>
            <Link className="bcr-text-link" href={foodPagePath("Bakes")}>
              See all the bakes <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="bcr-kitchen-teaser">
        <div className="bcr-wrap bcr-kitchen-layout">
          <div className="bcr-flour-label" aria-hidden="true">
            <span>THE RECIPE</span>
            <b>
              Flour.
              <br />
              Butter.
              <br />
              <em>Patience.</em>
            </b>
            <BakeryMark />
          </div>
          <div>
            <p className="bcr-eyebrow">02 / A kitchen with a little soul</p>
            <h2>
              Good things
              <br />
              <em>take their time.</em>
            </h2>
            <p>{template.about}</p>
            <Link className="bcr-text-link" href={foodPagePath("Our kitchen")}>
              Step into our kitchen <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="bcr-visit-banner bcr-wrap">
        <p className="bcr-eyebrow">03 / A seat, a coffee, a little pause</p>
        <h2>
          Make a little
          <br />
          <em>room in your day.</em>
        </h2>
        <Link className="bcr-button" href={foodPagePath("Visit")}>
          Plan a visit <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

function BakeryBakes({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="bcr-menu-intro bcr-wrap">
        <div>
          <p className="bcr-eyebrow">The bake book</p>
          <h1>
            A little of
            <br />
            <em>what you fancy.</em>
          </h1>
        </div>
        <div className="bcr-menu-intro-copy">
          <BakeryMark />
          <p>
            Flaky mornings, generous slices and a little something for later. Find your kind of good
            thing.
          </p>
        </div>
      </section>
      <section className="bcr-bakes-section bcr-wrap" aria-label="Sample bakery menu">
        <FoodMenuFilter kind="bakery" items={template.menu} />
      </section>
      <section className="bcr-menu-bottom bcr-wrap">
        <div>
          <p className="bcr-eyebrow">A note from the counter</p>
          <h2>
            The last crumb
            <br />
            <em>is worth saving.</em>
          </h2>
        </div>
        <div>
          <p>
            This sample menu is a taste of the design. A live bakery would confirm its daily
            selection, ingredients and availability directly.
          </p>
          <Link className="bcr-text-link" href={foodPagePath("Visit")}>
            Find your way here <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function BakeryKitchen({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="bcr-kitchen-hero bcr-wrap">
        <div>
          <p className="bcr-eyebrow">Our kitchen</p>
          <h1>
            A slower
            <br />
            <em>sort of lovely.</em>
          </h1>
          <p className="bcr-intro">{template.about}</p>
        </div>
        <BakeryPhoto template={template} hero />
      </section>
      <section className="bcr-kitchen-notes bcr-wrap">
        <p className="bcr-eyebrow">Notes from the recipe book</p>
        <div>
          {[
            {
              title: "A little patience.",
              text: "Good dough asks you to slow down. This is a space for the bakery’s own story: its rhythm, its recipes and the people behind the counter.",
            },
            {
              title: "Room for the familiar.",
              text: "The loaf for the kitchen table. The pastry with the morning coffee. Give everyday favourites their own place on the menu.",
            },
            {
              title: "And something unexpected.",
              text: "A changing filling, a seasonal bake, a new reason to look in the window. Share the current selection when it is ready.",
            },
          ].map((note, index) => (
            <article key={note.title}>
              <span>0{index + 1}</span>
              <div>
                <h2>{note.title}</h2>
                <p>{note.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bcr-visit-banner bcr-wrap">
        <BakeryMark />
        <h2>
          Follow your nose.
          <br />
          <em>Find your favourite.</em>
        </h2>
        <Link className="bcr-button" href={foodPagePath("Bakes")}>
          Back to the bake book <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

export default function BakeryTemplate({
  template,
  page = "home",
  enquiryHref,
}: {
  template: FoodTemplate;
  page?: string;
  enquiryHref: string;
}) {
  return (
    <div className="food-site food-theme-artisan-bakery" data-food-demo={template.id}>
      <FoodHeader template={template} page={page} />
      {page === "home" ? (
        <BakeryHome template={template} />
      ) : page === "bakes" ? (
        <BakeryBakes template={template} />
      ) : page === "our-kitchen" ? (
        <BakeryKitchen template={template} />
      ) : (
        <div className="bcr-visit-page">
          <FoodPageIntro
            eyebrow="A little pause in your day"
            title="Come for a crumb. Stay for a while."
            description="Your bakery’s address, opening hours and direct contact details belong here. This is an illustrative visit page; sample contact details are not monitored."
          />
          <FoodContact template={template} enquiryHref={enquiryHref} />
        </div>
      )}
      <FoodFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
