"use client";

import { useId, useState } from "react";

const handlingProfiles = [
  {
    id: "chilled",
    label: "Chilled goods",
    title: "Start with the product specification.",
    copy: "A chilled consignment starts with the conditions your product requires. Agree the handling instructions before discussing a route.",
    requirements: [
      ["Product", "Goods description, packaging and the shipper’s handling specification."],
      ["Collection", "Product readiness, loading access and the collection contact."],
      ["Handover", "Receiving window, unloading arrangements and acceptance instructions."],
    ],
    note: "Example: packaged fresh food moving between a producer and a receiving location.",
  },
  {
    id: "frozen",
    label: "Frozen goods",
    title: "Make every transfer part of the plan.",
    copy: "Frozen goods need a clearly agreed plan for loading, transport and unloading. Share the shipper’s requirements and any restrictions on transfers.",
    requirements: [
      ["Product", "Frozen product requirements, packaging condition and pallet configuration."],
      ["Collection", "Loading readiness, transfer restrictions and available loading equipment."],
      ["Handover", "Receiving readiness, unloading sequence and exception contact."],
    ],
    note: "Example: a palletized frozen consignment with a prearranged receiving window.",
  },
  {
    id: "mixed",
    label: "Mixed consignments",
    title: "Check compatibility before combining.",
    copy: "Different products may require separate arrangements. A mixed load needs an individual review of handling needs and compatibility before it can be accepted.",
    requirements: [
      ["Product", "An itemized goods list with separate handling requirements for each product."],
      ["Collection", "Segregation needs, packaging details and the proposed loading sequence."],
      ["Handover", "Delivery sequence, recipient instructions and any split-load requirements."],
    ],
    note: "Example: several product lines proposed for one journey, subject to suitability review.",
  },
] as const;

export function ColdChainHandlingSelector() {
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  const profile = handlingProfiles[selected];

  return (
    <div className="cold-selector">
      <div className="cold-selector-top">
        <p className="tl-kicker">Explore a handling brief</p>
        <span>Illustrative planning guide</span>
      </div>
      <div className="cold-profile-buttons" aria-label="Select a consignment type">
        {handlingProfiles.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === index}
            aria-controls={panelId}
            onClick={() => setSelected(index)}
          >
            <span className="cold-profile-index" aria-hidden="true">
              0{index + 1}
            </span>
            {item.label}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="cold-profile-content" id={panelId} aria-live="polite" aria-atomic="true">
        <div className="cold-profile-intro">
          <span className="cold-profile-label">{profile.label}</span>
          <h3>{profile.title}</h3>
          <p>{profile.copy}</p>
        </div>
        <dl>
          {profile.requirements.map(([label, copy]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{copy}</dd>
            </div>
          ))}
        </dl>
        <p className="cold-profile-note">{profile.note}</p>
      </div>
      <p className="cold-local-note">
        Sample requirements only. This guide does not assess suitability or book a shipment.
      </p>
    </div>
  );
}

export default ColdChainHandlingSelector;
