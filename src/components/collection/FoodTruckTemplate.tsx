import Image from "next/image";
import type { FoodTemplate } from "@/data/website-collection";
import { FoodContact, FoodFooter, FoodHeader } from "@/components/collection/FoodShared";

function StreetTicket() {
  return (
    <div className="sst-ticket" aria-hidden="true">
      <div className="sst-ticket-top">
        <span>SIDE STREET</span>
        <span>№ 03</span>
      </div>
      <svg className="sst-plate" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="73" />
        <circle cx="90" cy="90" r="57" />
        <path d="M59 87C61 53 119 53 121 87H59Z" />
        <path d="M57 100H123M61 112H119C119 132 61 132 61 112Z" />
        <path d="M63 93L77 99L90 92L105 99L118 93M76 76L78 73M91 68L93 72M105 77L108 74" />
      </svg>
      <strong>
        GOOD FOOD.
        <br />
        NO OCCASION
        <br />
        NECESSARY.
      </strong>
      <div className="sst-ticket-bottom">
        <span>TAKE A BREAK</span>
        <span>↗</span>
      </div>
    </div>
  );
}

function StreetStripe() {
  return (
    <div className="sst-stripe" aria-hidden="true">
      <div className="sst-stripe-track">
        {[0, 1].map((repeat) => (
          <span key={repeat}>
            BIG BITES <i>✳</i> GOOD TIMES <i>✳</i> SIDE STREET <i>✳</i> BIG BITES <i>✳</i> GOOD
            TIMES <i>✳</i> SIDE STREET <i>✳</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FoodTruckTemplate({
  template,
  page = "home",
  enquiryHref,
}: {
  template: FoodTemplate;
  page?: string;
  enquiryHref: string;
}) {
  return (
    <div className="food-site food-theme-food-truck" data-food-demo={template.id}>
      <FoodHeader template={template} page={page} />
      <section className="sst-hero">
        <div className="sst-hero-eyebrow">
          <p>STREET FOOD. FULL STOP.</p>
          <span>COME HUNGRY ↙</span>
        </div>
        <h1>
          <span>{template.headline}</span>
          <span>{template.emphasis}</span>
        </h1>
        <div className="sst-hero-bottom">
          <div className="sst-hero-copy">
            <p>{template.intro}</p>
            <a className="sst-button" href="#menu">
              Take a look at the menu <span aria-hidden="true">↘</span>
            </a>
            <span className="sst-demo-note">
              A fictional food truck. A real appetite for good design.
            </span>
          </div>
          <span className="sst-hero-spark" aria-hidden="true">
            ✳
          </span>
          <StreetTicket />
        </div>
      </section>
      <StreetStripe />
      <figure className="sst-food-photo">
        <Image src={template.image} alt={template.imageAlt} fill sizes="100vw" preload />
        <figcaption>
          <span>A LITTLE MESS IS PART OF IT.</span>
          <span>ILLUSTRATIVE FOOD PHOTOGRAPHY</span>
        </figcaption>
      </figure>
      <section className="sst-menu" id="menu" aria-labelledby="sst-menu-heading">
        <div className="sst-section-heading">
          <p>01 / THE SHORTLIST</p>
          <h2 id="sst-menu-heading">
            SMALL MENU.
            <br />
            <em>BIG ENERGY.</em>
          </h2>
        </div>
        <div className="sst-menu-list">
          {template.menu.map((item, index) => (
            <article className="sst-menu-item" key={item.name}>
              <span className="sst-menu-number">0{index + 1}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span className="sst-menu-price">{item.price}</span>
            </article>
          ))}
          <p className="sst-menu-note">
            Sample menu and prices in CAD. Your business confirms ingredients, allergens,
            availability and final pricing.
          </p>
        </div>
      </section>
      <section className="sst-visit" id="visit" aria-labelledby="sst-visit-heading">
        <div className="sst-visit-intro">
          <p>02 / AROUND THE CORNER</p>
          <h2 id="sst-visit-heading">
            SAME GOOD
            <br />
            FOOD.
            <br />
            <em>NEW VIEW.</em>
          </h2>
          <span className="sst-route-arrow" aria-hidden="true">
            ↱
          </span>
        </div>
        <div className="sst-schedule">
          <div className="sst-schedule-heading">
            <h3>A week on the street.</h3>
            <span>EXAMPLE SCHEDULE</span>
          </div>
          <dl>
            <div>
              <dt>FRIDAY</dt>
              <dd>
                <strong>Neighbourhood square</strong>
                <span>11:30 am – 2:30 pm</span>
              </dd>
            </div>
            <div>
              <dt>SATURDAY</dt>
              <dd>
                <strong>Riverside market</strong>
                <span>12:00 pm – 5:00 pm</span>
              </dd>
            </div>
            <div>
              <dt>SUNDAY</dt>
              <dd>
                <strong>The park pop-up</strong>
                <span>12:00 pm – 4:00 pm</span>
              </dd>
            </div>
          </dl>
          <p>
            These stops and times are examples, not live locations. Your confirmed weekly schedule
            belongs here.
          </p>
          <a className="sst-text-link" href="#contact">
            Let’s talk about your next stop <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <div className="sst-contact-wrap">
        <FoodContact template={template} enquiryHref={enquiryHref} />
      </div>
      <FoodFooter template={template} enquiryHref={enquiryHref} />
    </div>
  );
}
