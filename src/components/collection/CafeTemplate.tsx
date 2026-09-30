import Image from "next/image";
import Link from "next/link";
import type { FoodTemplate } from "@/data/website-collection";
import { CafeBrewGuide, CafeMenu } from "@/components/collection/FoodSmallInteractions";
import { FoodContact, FoodFooter, FoodHeader } from "@/components/collection/FoodShared";

function CoffeeRing({ caption = "TAKE YOUR TIME" }: { caption?: string }) {
  return (
    <div className="scc-coffee-ring" aria-hidden="true">
      <span>{caption}</span>
      <b>sc.</b>
      <span>STAY A LITTLE</span>
    </div>
  );
}

function CafePhoto({ template, compact = false }: { template: FoodTemplate; compact?: boolean }) {
  return (
    <figure className={`scc-photo${compact ? " scc-photo-compact" : ""}`}>
      <Image src={template.image} alt={template.imageAlt} fill sizes="100vw" preload={!compact} />
      <figcaption>
        <span>COFFEE. COMPANY. EVERYDAY PLEASURES.</span>
        <span>AN ILLUSTRATIVE CAFÉ</span>
      </figcaption>
    </figure>
  );
}

function CafeHome({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="scc-hero">
        <p className="scc-kicker">YOUR NEIGHBOURHOOD, AT A SLOWER PACE</p>
        <h1>
          {template.headline}
          <br />
          <em>{template.emphasis}</em>
        </h1>
        <div className="scc-hero-bottom">
          <span className="scc-small-flower" aria-hidden="true">
            ✳
          </span>
          <p>{template.intro}</p>
          <Link className="scc-text-link" href="/menu">
            Something good awaits <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <CafePhoto template={template} />
      <section className="scc-welcome" aria-labelledby="scc-welcome-heading">
        <p className="scc-kicker">A PLACE IN YOUR DAY</p>
        <div>
          <h2 id="scc-welcome-heading">
            For the first coffee.
            <br />
            The late breakfast.
            <br />
            <em>The unhurried catch-up.</em>
          </h2>
          <p>{template.about}</p>
          <Link className="scc-text-link" href="/visit">
            Make yourself at home <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <CoffeeRing />
      </section>
      <CafeBrewGuide />
      <section className="scc-menu-preview" aria-labelledby="scc-menu-preview-heading">
        <div className="scc-preview-title">
          <p className="scc-kicker">A FEW SIMPLE PLEASURES</p>
          <h2 id="scc-menu-preview-heading">
            Your usual.
            <br />
            <em>Or something new.</em>
          </h2>
          <Link className="scc-text-link" href="/menu">
            The full sample menu <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="scc-preview-items">
          {[template.menu[0], template.menu[3], template.menu[4]]
            .filter((item) => item !== undefined)
            .map((item) => (
              <article key={item.name}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <span>{item.price}</span>
              </article>
            ))}
          <p className="scc-menu-note">Illustrative dishes and sample prices in CAD.</p>
        </div>
      </section>
      <section className="scc-home-visit">
        <p className="scc-kicker">THERE’S A CHAIR FOR THAT</p>
        <h2>
          A moment to yourself.
          <br />
          <em>A table for your people.</em>
        </h2>
        <Link className="scc-button" href="/visit">
          Find your way here <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

function CafeMenuPage({ template }: { template: FoodTemplate }) {
  return (
    <>
      <section className="scc-page-intro">
        <p className="scc-kicker">FROM THE COUNTER & THE KITCHEN</p>
        <h1>
          Something simple.
          <br />
          <em>Something lovely.</em>
        </h1>
        <p>
          Good coffee, slow mornings and a short menu of everyday pleasures. Take a look around.
        </p>
      </section>
      <section className="scc-menu-page" aria-label="Sample café menu">
        <div className="scc-menu-side">
          <CoffeeRing caption="GOOD THINGS HERE" />
          <p>
            One more sip.
            <br />
            One more page.
            <br />
            No particular hurry.
          </p>
        </div>
        <CafeMenu items={template.menu} />
      </section>
      <section className="scc-menu-foot">
        <p className="scc-kicker">MAKE A LITTLE TIME</p>
        <h2>We’ll put the kettle on.</h2>
        <Link className="scc-text-link" href="/visit">
          Plan a visit <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}

function CafeVisitPage({ template, enquiryHref }: { template: FoodTemplate; enquiryHref: string }) {
  return (
    <>
      <section className="scc-page-intro">
        <p className="scc-kicker">A LITTLE CLOSER TO HOME</p>
        <h1>
          Come on in.
          <br />
          <em>Stay for a while.</em>
        </h1>
        <p>
          The meeting spot, the reading nook, the coffee on your way. Your neighbourhood café starts
          here.
        </p>
      </section>
      <section className="scc-visit-details" aria-label="Illustrative location and opening hours">
        <div>
          <p className="scc-kicker">FIND OUR CORNER</p>
          <h2>
            In your
            <br />
            <em>neighbourhood.</em>
          </h2>
          <p>Your street address and city are added here at launch.</p>
          <p className="scc-small-note">
            Fictional café. No live location is shown in this demonstration.
          </p>
        </div>
        <div className="scc-opening">
          <p className="scc-kicker">EXAMPLE OPENING HOURS</p>
          <dl>
            <div>
              <dt>Monday — Friday</dt>
              <dd>7 am — 4 pm</dd>
            </div>
            <div>
              <dt>Saturday — Sunday</dt>
              <dd>8 am — 4 pm</dd>
            </div>
          </dl>
          <p>
            These are sample hours. Your café’s confirmed hours and holiday changes will take their
            place.
          </p>
          <Link className="scc-text-link" href="/menu">
            Peruse the menu <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <CafePhoto template={template} compact />
      <FoodContact template={template} enquiryHref={enquiryHref} />
    </>
  );
}

export default function CafeTemplate({
  template,
  page = "home",
  enquiryHref,
}: {
  template: FoodTemplate;
  page?: string;
  enquiryHref: string;
}) {
  return (
    <div className="food-site food-theme-neighbourhood-cafe" data-food-demo={template.id}>
      <FoodHeader template={template} page={page} />
      {page === "menu" ? (
        <CafeMenuPage template={template} />
      ) : page === "visit" ? (
        <CafeVisitPage template={template} enquiryHref={enquiryHref} />
      ) : (
        <CafeHome template={template} />
      )}
      <FoodFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
