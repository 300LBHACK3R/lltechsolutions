"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { professionalPagePath, type ProfessionalTemplate } from "@/data/website-collection";

const subscribe = () => () => {};

export function ProfessionalNavigation({
  template,
  page,
}: {
  template: ProfessionalTemplate;
  page: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const onePage = template.pages.length === 1;
  const links = onePage ? ["Services", "About", "Contact"] : template.pages;
  return (
    <header
      className="pro-header"
      data-enhanced={ready}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link className="pro-brand" href="/" aria-label={`${template.brand} home`}>
        <span className="pro-monogram" aria-hidden="true">
          {template.theme === "tally"
            ? "+"
            : template.theme === "offscript"
              ? "↗"
              : template.brand.charAt(0)}
        </span>
        <span>
          {template.brand}
          <small>{template.subbrand}</small>
        </span>
      </Link>
      <button
        ref={toggle}
        className="pro-menu-toggle"
        type="button"
        hidden={!ready}
        aria-expanded={open}
        aria-controls="professional-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close menu −" : "Menu +"}
      </button>
      <nav
        id="professional-navigation"
        className="pro-nav"
        aria-label={`${template.name} pages`}
        data-open={open}
      >
        {links.map((label) => (
          <Link
            key={label}
            href={onePage ? `#${label.toLowerCase()}` : professionalPagePath(label)}
            aria-current={!onePage && label === page ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
            {label === "Contact" ? <span aria-hidden="true"> ↗</span> : null}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function ProfessionalExplorer({ template }: { template: ProfessionalTemplate }) {
  const [active, setActive] = useState(0);
  const service = template.services[active];
  return (
    <div className="pro-explorer">
      <div className="pro-selector" role="group" aria-label="Choose a service to explore">
        {template.services.map((item, index) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={active === index}
            aria-controls="professional-service-detail"
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {item.name}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div
        id="professional-service-detail"
        className="pro-service-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="pro-kicker">A CLOSER LOOK / 0{active + 1}</span>
        <h3>{service.description}</h3>
        <p>{service.detail}</p>
        <Link
          className="pro-text-link"
          href={template.pages.length === 1 ? "#contact" : "/contact"}
        >
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}

export function BookkeepingChecklist() {
  const labels = [
    "Gather the records",
    "Match the transactions",
    "Review the month",
    "Agree the next steps",
  ];
  const [done, setDone] = useState<number[]>([]);
  return (
    <div className="pro-checklist">
      <div className="pro-checklist-heading">
        <span>THE MONTH-END EDIT</span>
        <span aria-live="polite">{done.length} / 4</span>
      </div>
      <h3>
        A little order.
        <br />A lighter month.
      </h3>
      <p>Try the sample checklist.</p>
      {labels.map((label, index) => (
        <label key={label}>
          <input
            type="checkbox"
            checked={done.includes(index)}
            onChange={() =>
              setDone((current) =>
                current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
              )
            }
          />
          <span>{label}</span>
        </label>
      ))}
      <progress value={done.length} max={4} aria-label="Sample checklist completion" />
      <small>Interactive example. Changes stay on this page and aren’t saved.</small>
    </div>
  );
}

const resources = [
  {
    category: "Getting started",
    title: "Your first conversation",
    body: "An initial conversation helps the practice understand the broad type of support you need and whether it can assist. Ask how the engagement process works before sharing documents or confidential details.",
  },
  {
    category: "Working together",
    title: "A clear scope of work",
    body: "Your engagement should explain the work, responsibilities and agreed costs. Use the first conversation to ask how the practice confirms scope and communicates changes.",
  },
  {
    category: "Getting started",
    title: "Preparing an enquiry",
    body: "Keep your first message brief. Explain the general type of enquiry and how you would prefer to be contacted. Wait for the practice’s instructions before sharing private documents.",
  },
  {
    category: "Working together",
    title: "Keeping in touch",
    body: "Agree who your point of contact will be and how updates will be shared. This sample article demonstrates a resource layout; your approved articles replace it at launch.",
  },
];

export function ProfessionalResources() {
  const [filter, setFilter] = useState("All resources");
  const visible = resources.filter(
    (item) => filter === "All resources" || item.category === filter,
  );
  return (
    <div className="pro-resources">
      <div className="pro-resource-filters" role="group" aria-label="Filter resources">
        {["All resources", "Getting started", "Working together"].map((name) => (
          <button
            type="button"
            key={name}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="pro-kicker" role="status">
        {visible.length} resources
      </p>
      <div className="pro-resource-grid">
        {visible.map((item, index) => (
          <details key={item.title}>
            <summary>
              <span className="pro-kicker">{item.category}</span>
              <span className="pro-resource-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h2>{item.title}</h2>
              <span className="pro-text-link">Read the example +</span>
            </summary>
            <p>{item.body}</p>
          </details>
        ))}
      </div>
      <p className="pro-note">Illustrative website content only. This is not legal advice.</p>
    </div>
  );
}
