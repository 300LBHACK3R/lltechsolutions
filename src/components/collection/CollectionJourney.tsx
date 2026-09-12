"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import CostSummary from "@/components/collection/CostSummary";
import {
  collectionCarePlans,
  collectionExtras,
  designHref,
  journeyInquiry,
  type WebsiteDesign,
} from "@/data/website-collection";

const steps = ["Your website", "After launch", "Review & enquire"];

export default function CollectionJourney({ design }: { design: WebsiteDesign }) {
  const [step, setStep] = useState(0);
  const [extras, setExtras] = useState<string[]>([]);
  const [care, setCare] = useState("unsure");
  const heading = useRef<HTMLHeadingElement>(null);
  const inquiry = journeyInquiry(design, extras, care);
  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  return (
    <div className="collection-journey">
      <ol className="journey-progress" aria-label="Enquiry progress">
        {steps.map((label, index) => (
          <li key={label} aria-current={step === index ? "step" : undefined}>
            <span>{index + 1}</span>
            {index < step ? (
              <button type="button" onClick={() => go(index)}>
                {label}
              </button>
            ) : (
              label
            )}
          </li>
        ))}
      </ol>
      <p className="journey-selection">
        <strong>{design.name}</strong> is your starting point.{" "}
        <Link href={designHref(design)}>Back to the design</Link>
      </p>
      <h2 tabIndex={-1} ref={heading}>
        {step === 0
          ? "What would make this easier for you?"
          : step === 1
            ? "How would you like to be supported?"
            : "Everything in one place."}
      </h2>
      {step === 0 && (
        <>
          <p>
            Your branding, supplied content and agreed launch work are part of the proposal. Choose
            any extra help you’d like to discuss, or continue with nothing selected.
          </p>
          <fieldset className="journey-options">
            <legend className="sr-only">Optional additional help</legend>
            {collectionExtras.map((extra) => (
              <label key={extra.id}>
                <input
                  type="checkbox"
                  checked={extras.includes(extra.id)}
                  onChange={(event) =>
                    setExtras(
                      event.target.checked
                        ? [...extras, extra.id]
                        : extras.filter((id) => id !== extra.id),
                    )
                  }
                />
                <span>
                  <strong>{extra.name}</strong>
                  <small>{extra.description}</small>
                </span>
              </label>
            ))}
          </fieldset>
        </>
      )}
      {step === 1 && (
        <>
          <p>
            This is a preference, not a subscription. You can decide after we explain the options
            and costs.
          </p>
          <fieldset className="journey-options">
            <legend className="sr-only">Optional support after launch</legend>
            {[
              {
                id: "unsure",
                name: "Help me decide",
                description: "Talk through what will suit my business.",
              },
              {
                id: "none",
                name: "Launch and handover",
                description: "No monthly plan selected. Discuss future updates when needed.",
              },
              ...collectionCarePlans,
            ].map((plan) => (
              <label key={plan.id}>
                <input
                  type="radio"
                  name="care-preference"
                  value={plan.id}
                  checked={care === plan.id}
                  onChange={() => setCare(plan.id)}
                />
                <span>
                  <strong>{plan.name}</strong>
                  <small>{plan.description}</small>
                </span>
              </label>
            ))}
          </fieldset>
        </>
      )}
      <div hidden={step !== 2}>
        <p>
          Check your preferences, then tell us a little about your business. Tate will discuss the
          fit and prepare a clear scope with you.
        </p>
        <CostSummary design={design} extras={extras} care={care} />
        <ContactForm
          initialService={inquiry.service}
          messagePrefix={inquiry.message.replace("\n\nAbout my business and what I need:", "")}
          collectionSummary={inquiry.summary}
        />
      </div>
      <div className="journey-actions">
        {step > 0 && (
          <button type="button" className="button button-outline" onClick={() => go(step - 1)}>
            Back
          </button>
        )}
        {step < 2 && (
          <button type="button" className="button button-gold" onClick={() => go(step + 1)}>
            {step === 0 ? "Continue to support options" : "Review my choices"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
      <p className="collection-fineprint">
        No deposit, account or technical knowledge needed to enquire.{" "}
        <Link className="text-link" href={`/contact?collection=website&design=${design.id}`}>
          Prefer to talk first? ↗
        </Link>
      </p>
      <noscript>
        <p>
          The guided steps need JavaScript.{" "}
          <a href={`/contact?collection=website&design=${design.id}`}>
            Use the standard enquiry page for {design.name}
          </a>
          , or contact Tate directly using the details in the footer.
        </p>
      </noscript>
    </div>
  );
}
