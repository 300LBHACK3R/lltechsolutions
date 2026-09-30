"use client";

import { useId, useState } from "react";

const industryNotes = [
  {
    name: "Retail & consumer",
    title: "The delivery is part of the product.",
    copy: "A considered plan connects inbound stock, replenishment and the requirements of the receiving location. Start with the delivery window, then work back through the handovers.",
    questions: [
      "Carton or pallet configuration",
      "Receiving appointments and access",
      "Seasonal volumes and launch dates",
    ],
    detail:
      "A useful first brief: product type, handling units, collection point, destination and the date the goods are needed.",
  },
  {
    name: "Manufacturing",
    title: "Think beyond the loading bay.",
    copy: "Components, materials and finished products can call for very different transport plans. Understanding the goods and the production context comes before choosing a movement.",
    questions: [
      "Dimensions, weight and packaging",
      "Loading equipment at each end",
      "Production dependencies and timing",
    ],
    detail:
      "A useful first brief: the physical characteristics of the load and the people responsible for collection and receipt.",
  },
  {
    name: "Wholesale & distribution",
    title: "Make every handover legible.",
    copy: "When a shipment connects several parties, everyone needs a shared understanding of what moves, where it moves and what happens next. Good instructions travel with the goods.",
    questions: [
      "Single or multiple receiving points",
      "Order references and labelling",
      "Who confirms each handover",
    ],
    detail:
      "A useful first brief: the shipment structure, receiving requirements and a clear contact for each stage of the journey.",
  },
  {
    name: "Project cargo",
    title: "Start with the exceptional details.",
    copy: "Unusual dimensions, sensitive equipment or a complex destination need a more deliberate conversation. Feasibility, access and handling requirements must be reviewed before a plan is agreed.",
    questions: [
      "Technical dimensions and handling notes",
      "Site access and lifting requirements",
      "Dependencies, permissions and specialists",
    ],
    detail:
      "A useful first brief: a general outline of the item, its route and any known constraints. Detailed documents follow through an agreed channel.",
  },
];

export function FreightIndustrySelector() {
  const instance = useId();
  const [selected, setSelected] = useState(0);
  const industry = industryNotes[selected];

  return (
    <div className="fr-industry-explorer">
      <fieldset className="fr-industry-options">
        <legend>Explore your industry</legend>
        {industryNotes.map((item, index) => (
          <label className={selected === index ? "is-selected" : ""} key={item.name}>
            <input
              type="radio"
              name={`${instance}-industry`}
              value={item.name}
              checked={selected === index}
              onChange={() => setSelected(index)}
              aria-controls={`${instance}-industry-content`}
            />
            <span className="fr-option-number" aria-hidden="true">
              0{index + 1}
            </span>
            <span>{item.name}</span>
            <span className="fr-option-arrow" aria-hidden="true">
              ↗
            </span>
          </label>
        ))}
      </fieldset>
      <div className="fr-industry-content" id={`${instance}-industry-content`} aria-live="polite">
        <span className="tl-kicker">The planning perspective / 0{selected + 1}</span>
        <h3>{industry.title}</h3>
        <p>{industry.copy}</p>
        <h4>Details that shape the plan</h4>
        <ul>
          {industry.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
        <p className="fr-industry-brief">{industry.detail}</p>
      </div>
    </div>
  );
}

const preparationItems = [
  {
    title: "Describe the goods",
    copy: "Prepare a plain-language description, quantity and any special handling needs.",
  },
  {
    title: "Confirm the physical details",
    copy: "Gather packaged dimensions, total weight and the number of handling units.",
  },
  {
    title: "Identify both ends",
    copy: "Know the collection and delivery locations, access limitations and appropriate contacts.",
  },
  {
    title: "Set out the timing",
    copy: "Separate your preferred collection date from any essential receiving deadline.",
  },
  {
    title: "Review packaging and labels",
    copy: "Confirm the packaging is appropriate with the transport provider and prepare the agreed references.",
  },
  {
    title: "Check the document requirements",
    copy: "Ask the provider which shipment and, where relevant, customs documents need to accompany the goods.",
  },
];

export function FreightShipmentChecklist() {
  const instance = useId();
  const [checked, setChecked] = useState<string[]>([]);
  const [wasReset, setWasReset] = useState(false);

  function toggle(title: string) {
    setWasReset(false);
    setChecked((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );
  }

  return (
    <section className="fr-checklist" aria-labelledby={`${instance}-checklist-title`}>
      <div className="fr-checklist-head">
        <div>
          <p className="tl-kicker">A practical starting point</p>
          <h2 id={`${instance}-checklist-title`}>Before the first conversation.</h2>
          <p>
            Use this general preparation list to organise your questions. Your provider confirms the
            requirements for your shipment.
          </p>
        </div>
        <div className="fr-checklist-count" aria-live="polite" aria-atomic="true">
          <strong>
            {checked.length}
            <span> / {preparationItems.length}</span>
          </strong>
          <span>{wasReset ? "Checklist reset" : "Preparation notes reviewed"}</span>
        </div>
      </div>
      <div className="fr-checklist-items">
        {preparationItems.map((item, index) => (
          <label className={checked.includes(item.title) ? "is-checked" : ""} key={item.title}>
            <input
              type="checkbox"
              checked={checked.includes(item.title)}
              onChange={() => toggle(item.title)}
            />
            <span className="fr-check-box" aria-hidden="true">
              {checked.includes(item.title) ? "✓" : String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <strong>{item.title}</strong>
              <span>{item.copy}</span>
            </span>
          </label>
        ))}
      </div>
      <div className="fr-checklist-foot">
        <p>
          For your planning only. Selections stay on this page and clear when you leave or reload.
          This does not submit a shipment.
        </p>
        <button
          type="button"
          onClick={() => {
            setChecked([]);
            setWasReset(true);
          }}
        >
          Reset checklist <span aria-hidden="true">↺</span>
        </button>
      </div>
    </section>
  );
}
