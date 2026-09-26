"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { medicalSpaContent } from "@/data/medical-spa-content";
import { medicalSpaPages, medicalSpaPagePath, type MedicalSpaPage } from "@/data/medical-spa-pages";

export function MedicalSpaNavigation({ page }: { page: MedicalSpaPage }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  return (
    <>
      <nav className="medical-spa-nav" aria-label="Aurel clinic pages">
        {medicalSpaPages.map((item) => (
          <Link
            href={medicalSpaPagePath(item)}
            key={item}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </Link>
        ))}
      </nav>
      <details
        className="medical-spa-mobile-nav"
        ref={disclosure}
        onKeyDown={(event) => {
          if (event.key === "Escape" && disclosure.current?.open) {
            disclosure.current.open = false;
            disclosure.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary>
          Menu <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Aurel clinic mobile pages">
          {medicalSpaPages.map((item, index) => (
            <Link
              href={medicalSpaPagePath(item)}
              key={item}
              aria-current={item === page ? "page" : undefined}
              onClick={() => {
                if (disclosure.current) disclosure.current.open = false;
              }}
            >
              <span>0{index + 1}</span>
              {item}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </details>
    </>
  );
}

export function MedicalSpaTreatmentFocus() {
  const [selected, setSelected] = useState(0);
  const treatment = medicalSpaContent.treatments[selected];
  return (
    <div className="medical-spa-focus">
      <fieldset className="medical-spa-focus-options">
        <legend>What would you like to explore?</legend>
        {medicalSpaContent.treatments.map((item, index) => (
          <label key={item.id}>
            <input
              type="radio"
              name="medical-spa-treatment-focus"
              value={item.id}
              checked={selected === index}
              onChange={() => setSelected(index)}
              aria-controls="medical-spa-focus-result"
            />
            <span>
              <small>{item.number}</small>
              {item.shortName}
              <span aria-hidden="true">↗</span>
            </span>
          </label>
        ))}
      </fieldset>
      <div
        className="medical-spa-focus-result"
        id="medical-spa-focus-result"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="medical-spa-eyebrow">{treatment.note}</p>
        <h3>{treatment.name}</h3>
        <p>{treatment.description}</p>
        <Link
          className="medical-spa-text-link"
          href={`${medicalSpaPagePath("Treatments")}#${treatment.id}`}
        >
          Explore this treatment area <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
