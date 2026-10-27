"use client";

import { type FormEvent, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

const serviceOptions = [
  "Multi-Family",
  "Custom Homes",
  "Commercial Painting",
  "Strata & Building Maintenance",
  "Interior Painting",
  "General Inquiry",
];

export default function ContactFormSection() {
  const ready = useSyncExternalStore(subscribe, browserReady, serverReady);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) return;
    // Browser validation runs first. No fetch, API, storage, or email integration.
    setMessage(
      "Demo complete — nothing was sent or stored. Connect your own enquiry service before publishing.",
    );
    event.currentTarget.reset();
  }

  return (
    <section className="section contact-section" aria-labelledby="contact-form-heading">
      <div className="container">
        <div className="form-grid">
          <aside className="form-panel form-panel--info">
            <span className="section-intro__eyebrow">Contact</span>

            <h2 id="contact-form-heading" className="section-intro__title">
              Tell us about your project.
            </h2>

            <p className="section-intro__copy">
              Try the sample form with fictional details. It checks required fields in your browser
              and displays a local confirmation; no message or quote request is delivered.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-list__item">
                <strong>Email</strong>
                <span>Add your business email</span>
              </div>

              <div className="contact-info-list__item">
                <strong>Phone</strong>
                <span>Add your business phone</span>
              </div>

              <div className="contact-info-list__item">
                <strong>Service Area</strong>
                <span>Service area — replace before launch</span>
              </div>
            </div>
          </aside>

          <form
            method="post"
            className="form-panel form-panel--form"
            onSubmit={handleSubmit}
            aria-describedby="sample-enquiry-note"
            noValidate={false}
          >
            <p id="sample-enquiry-note" className="sample-form-note">
              Sample enquiry only. Nothing is sent or stored. Use fictional information to try the
              form.
            </p>
            <div className="form-grid__two">
              <label className="field">
                <span>Name</span>
                <input disabled={!ready} type="text" name="name" autoComplete="name" required />
              </label>

              <label className="field">
                <span>Email</span>
                <input disabled={!ready} type="email" name="email" autoComplete="email" required />
              </label>
            </div>

            <div className="form-grid__two">
              <label className="field">
                <span>Phone</span>
                <input disabled={!ready} type="tel" name="phone" autoComplete="tel" />
              </label>

              <label className="field">
                <span>Company</span>
                <input disabled={!ready} type="text" name="company" autoComplete="organization" />
              </label>
            </div>

            <label className="field">
              <span>Service Type</span>
              <select disabled={!ready} name="service" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>

                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Project Details</span>
              <textarea
                disabled={!ready}
                name="details"
                rows={7}
                placeholder="Tell us about the project, location, timeline, and any important details."
                required
              />
            </label>

            <button disabled={!ready} type="submit" className="button button--primary form-submit">
              Try Sample Enquiry
            </button>

            {!ready && (
              <p>This local demonstration needs JavaScript. No enquiry can be sent here.</p>
            )}
            {message ? (
              <p className="form-status form-status--success" role="status" aria-live="polite">
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
