import Link from "next/link";
import { foodPagePath, type FoodTemplate } from "@/data/website-collection";
import { FoodNavigation } from "@/components/collection/FoodInteractions";
import DemoEnquiryForm from "@/components/collection/DemoEnquiryForm";

export function FoodHeader({ template, page }: { template: FoodTemplate; page: string }) {
  return (
    <FoodNavigation
      id={template.id}
      brand={template.brand}
      subbrand={template.subbrand}
      pages={template.pages}
      activePage={page}
    />
  );
}

export function FoodPageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="food-page-intro food-wrap">
      <p className="food-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function FoodContact({
  template,
  enquiryHref,
}: {
  template: FoodTemplate;
  enquiryHref: string;
}) {
  return (
    <section
      className="food-contact food-wrap food-section"
      id="contact"
      aria-label="Contact information"
    >
      <div className="food-contact-details">
        <p className="food-kicker">A conversation starts something good</p>
        <h2>
          We’d love
          <br />
          to hear from you.
        </h2>
        <p>
          {template.form
            ? "Explore the enquiry layout using sample details. This preview sends no message and does not reserve a table or place an order."
            : "A simple way for guests to get in touch. Your own phone, email and location are connected when your website launches."}
        </p>
        <dl>
          <div>
            <dt>Telephone</dt>
            <dd>
              (403) 555-0142<small>Illustrative number · inactive in this demo</small>
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              hello@example.com<small>Sample address · not monitored</small>
            </dd>
          </div>
          <div>
            <dt>Find us</dt>
            <dd>
              Your neighbourhood, Calgary
              <small>Example location · your address replaces this</small>
            </dd>
          </div>
          <div>
            <dt>Good to know</dt>
            <dd>
              Opening hours, accessibility and dietary enquiries
              <small>Your business supplies and approves these details</small>
            </dd>
          </div>
        </dl>
      </div>
      <div className="food-contact-panel">
        {template.form ? (
          <>
            <h2>Enquiry preview</h2>
            <DemoEnquiryForm
              idPrefix={`food-${template.id}`}
              services={template.services.map((service) => service.name)}
              notice="Demonstration form. Nothing is sent or saved. Use sample details only; do not enter personal, payment or health information. This does not confirm an order or reservation."
            />
          </>
        ) : (
          <>
            <span className="food-contact-arrow" aria-hidden="true">
              ↗
            </span>
            <h2>
              Your place.
              <br />
              Their next favourite.
            </h2>
            <p>
              Direct contact is included. An existing ordering or booking link can be added; a new
              ordering, payment or reservation system is separately scoped.
            </p>
          </>
        )}
        <div className="food-real-enquiry">
          <p>Picture your own business here?</p>
          <a className="food-button" href={enquiryHref}>
            Make this my website <span aria-hidden="true">↗</span>
          </a>
          <small>This opens a real enquiry with L&L Tech Solutions.</small>
        </div>
      </div>
    </section>
  );
}

export function FoodFooter({
  template,
  enquiryHref,
}: {
  template: FoodTemplate;
  enquiryHref: string;
}) {
  const contact = template.pages.find((page) => page === "Contact" || page === "Visit");
  return (
    <footer className="food-footer food-wrap">
      <div>
        <Link className="food-footer-brand" href="/">
          {template.brand}
        </Link>
        <p>{template.subbrand}</p>
      </div>
      <nav aria-label="Footer">
        <Link href={contact ? foodPagePath(contact) : "#contact"}>{contact ?? "Contact"}</Link>
        <a href={enquiryHref}>Make this my website ↗</a>
      </nav>
      <p className="food-footer-note">
        Fictional business and illustrative imagery. Menus, prices and opening information show the
        design; nothing can be ordered or reserved through this demo.
      </p>
    </footer>
  );
}
