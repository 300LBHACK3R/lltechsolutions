"use client";

import { useState } from "react";

const vehicleNotes = [
  {
    name: "Everyday vehicles",
    heading: "The everyday, going somewhere new.",
    description:
      "For a car, SUV or pickup, the useful starting point is the make, model, year and whether it can start, steer and brake.",
    notes: ["Make, model and year", "Running condition", "Pickup and delivery areas"],
  },
  {
    name: "Specialty vehicles",
    heading: "A few more details. A clearer plan.",
    description:
      "Low clearance, modifications and unusual dimensions can affect a proposed move. Share those details before discussing the transport method.",
    notes: [
      "Ground clearance and dimensions",
      "Modifications or accessories",
      "Preferred handling discussion",
    ],
  },
  {
    name: "Dealer transfers",
    heading: "Start with the handoff at each end.",
    description:
      "For a transfer between business locations, prepare vehicle details and the receiving contacts. Access and collection windows need to be agreed directly.",
    notes: [
      "Vehicle details and quantity",
      "Business access information",
      "Collection and receiving contacts",
    ],
  },
] as const;

export function VehiclePlanningSelector() {
  const [active, setActive] = useState(0);
  const selected = vehicleNotes[active];

  return (
    <div className="ov-vehicle-selector">
      <div className="ov-vehicle-tabs" role="group" aria-label="Choose a vehicle planning topic">
        {vehicleNotes.map((vehicle, index) => (
          <button
            key={vehicle.name}
            type="button"
            aria-pressed={index === active}
            aria-controls="ov-vehicle-notes"
            onClick={() => setActive(index)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {vehicle.name}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="ov-vehicle-notes" id="ov-vehicle-notes" aria-live="polite" aria-atomic="true">
        <div>
          <p className="tl-kicker">Your starting point</p>
          <h3>{selected.heading}</h3>
          <p>{selected.description}</p>
        </div>
        <ul>
          {selected.notes.map((note) => (
            <li key={note}>
              <span aria-hidden="true">↗</span>
              {note}
            </li>
          ))}
        </ul>
      </div>
      <p className="ov-planning-note">
        General planning notes only. This selector does not calculate a price, confirm a service or
        book transport.
      </p>
    </div>
  );
}

type EquipmentCategory = "All equipment" | "Compact equipment" | "Tools" | "Trailers";
const equipmentCategories: EquipmentCategory[] = [
  "All equipment",
  "Compact equipment",
  "Tools",
  "Trailers",
];

const sampleEquipment: {
  name: string;
  category: EquipmentCategory;
  use: string;
  details: string;
  discuss: string;
}[] = [
  {
    name: "Compact excavator",
    category: "Compact equipment",
    use: "Groundwork & landscaping",
    details:
      "An example category for smaller excavation projects. The correct machine depends on access width, working space, ground conditions and the intended task.",
    discuss:
      "Discuss site access, digging requirements, attachments and transport with the rental team.",
  },
  {
    name: "Mini track loader",
    category: "Compact equipment",
    use: "Material handling & site work",
    details:
      "An example for presenting compact loading equipment and compatible attachments. Model specifications and operating requirements belong with each real listing.",
    discuss: "Discuss material, access, surface conditions and the attachment needed for the job.",
  },
  {
    name: "Plate compactor",
    category: "Tools",
    use: "Base preparation",
    details:
      "An illustrative tool category for suitable base preparation tasks. Actual machine selection depends on material, area, depth and the manufacturer’s guidance.",
    discuss:
      "Describe the material and work area, then confirm suitability and operating instructions directly.",
  },
  {
    name: "Concrete mixer",
    category: "Tools",
    use: "Small concrete projects",
    details:
      "A sample catalogue entry for a portable mixer. Capacity, power requirements and cleaning expectations would be supplied for the actual equipment offered.",
    discuss:
      "Discuss batch requirements, power access, transport and the return condition expected.",
  },
  {
    name: "Utility trailer",
    category: "Trailers",
    use: "Materials & general loads",
    details:
      "An example trailer category. Load dimensions and total weight need to be considered alongside the trailer and towing vehicle’s approved limits.",
    discuss:
      "Confirm load, tow vehicle compatibility, hitch, electrical connection and load restraint requirements.",
  },
  {
    name: "Equipment trailer",
    category: "Trailers",
    use: "Machinery transport",
    details:
      "A sample entry for an equipment transport trailer. The rental provider would confirm the exact deck, ramp, capacity and towing specifications before a rental.",
    discuss:
      "Share the machine’s dimensions and weight, and discuss loading and transport requirements.",
  },
];

function EquipmentMark({ category }: { category: EquipmentCategory }) {
  return (
    <svg viewBox="0 0 100 64" fill="none" aria-hidden="true" className="yard-equipment-mark">
      {category === "Compact equipment" ? (
        <>
          <path d="M19 43h42l5 9H15l4-9Zm7-2V23h23v18M31 22V12h14l6 11M54 29l17-17 12 17-5 19M73 48h17l-5-10" />
          <path d="M26 48h26M33 27h11v10H33" />
        </>
      ) : category === "Tools" ? (
        <>
          <path d="M18 25h64v29H18V25Zm21-1V13h22v11M18 34h64M44 30h12v9H44" />
          <path d="M27 43v5M35 43v5M65 43v5M73 43v5" />
        </>
      ) : (
        <>
          <path d="M13 22h58v24H13V22Zm0 15h58M71 41h15l5 5M22 23V12h41v11" />
          <circle cx="29" cy="48" r="7" />
          <circle cx="56" cy="48" r="7" />
        </>
      )}
    </svg>
  );
}

export function EquipmentCatalogue() {
  const [category, setCategory] = useState<EquipmentCategory>("All equipment");
  const visible = sampleEquipment.filter(
    (item) => category === "All equipment" || item.category === category,
  );

  return (
    <div className="yard-catalogue" id="catalogue">
      <div
        className="yard-filter-row"
        role="group"
        aria-label="Filter sample equipment by category"
      >
        {equipmentCategories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            aria-controls="yard-equipment-results"
            onClick={() => setCategory(item)}
          >
            {item}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="yard-catalogue-meta">
        <span>Illustrative catalogue · Sample inventory</span>
        <span role="status">
          {category === "All equipment"
            ? "Showing all sample categories"
            : `Showing ${category.toLowerCase()} samples`}
        </span>
      </div>
      <div id="yard-equipment-results" className="yard-equipment-list">
        {visible.map((item) => (
          <details key={item.name} className="yard-equipment-item">
            <summary>
              <EquipmentMark category={item.category} />
              <span className="yard-equipment-title">
                <small>{item.category}</small>
                <strong>{item.name}</strong>
              </span>
              <span className="yard-equipment-use">{item.use}</span>
              <span className="yard-equipment-expand" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="yard-equipment-detail">
              <p>{item.details}</p>
              <div>
                <strong>Before you enquire</strong>
                <p>{item.discuss}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
      <p className="yard-catalogue-note">
        These are sample equipment categories, not available rental inventory. Specifications,
        suitability, rates and availability are confirmed directly with the business on a live
        website.
      </p>
    </div>
  );
}
