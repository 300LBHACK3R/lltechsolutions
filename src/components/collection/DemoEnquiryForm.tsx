"use client";

import { useRef, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

/** A safe, interactive preview: no endpoint, named fields, storage or network request. */
export default function DemoEnquiryForm({
  idPrefix,
  services,
  className = "",
}: {
  idPrefix: string;
  services: readonly string[];
  className?: string;
}) {
  const ready = useSyncExternalStore(subscribe, browserReady, serverReady);
  const form = useRef<HTMLFormElement>(null);
  const [complete, setComplete] = useState(false);
  const noticeId = `${idPrefix}-notice`;

  function previewEnquiry() {
    if (!form.current?.reportValidity()) return;
    setComplete(true);
    form.current.reset();
  }

  return (
    <form
      ref={form}
      className={`demo-enquiry-form ${className}`}
      data-demo-enquiry="local-only"
      autoComplete="off"
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
      onChange={() => complete && setComplete(false)}
    >
      <p id={noticeId} className="demo-enquiry-notice">
        Demonstration form. Nothing is sent or saved. Use sample details only; please do not enter
        health information.
      </p>
      <fieldset disabled={!ready}>
        <legend>Your enquiry</legend>
        <div className="demo-enquiry-row">
          <div className="demo-enquiry-field">
            <label htmlFor={`${idPrefix}-name`}>
              Name <span>(required)</span>
            </label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              required
              minLength={2}
              maxLength={100}
              placeholder="Sample name"
            />
          </div>
          <div className="demo-enquiry-field">
            <label htmlFor={`${idPrefix}-email`}>
              Email <span>(required)</span>
            </label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              required
              maxLength={254}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="demo-enquiry-field">
          <label htmlFor={`${idPrefix}-service`}>What would you like to explore?</label>
          <select id={`${idPrefix}-service`} defaultValue="" required>
            <option value="" disabled>
              Select an option
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
            <option value="general">A general question</option>
          </select>
        </div>
        <div className="demo-enquiry-field">
          <label htmlFor={`${idPrefix}-message`}>
            Your message <span>(optional)</span>
          </label>
          <textarea
            id={`${idPrefix}-message`}
            rows={4}
            maxLength={1500}
            placeholder="Try a short sample enquiry."
          />
        </div>
        <button type="button" className="demo-enquiry-submit" onClick={previewEnquiry}>
          Preview enquiry <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
      <p className="demo-enquiry-status" role="status" aria-live="polite" aria-atomic="true">
        {complete
          ? "Preview complete. No enquiry was sent. Live email delivery is configured and tested when your website launches."
          : ""}
      </p>
      <noscript>
        JavaScript is needed to preview this form. No information can be submitted here.
      </noscript>
    </form>
  );
}
