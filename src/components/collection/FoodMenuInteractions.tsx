"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type FoodMenuItem = {
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly category: string;
};

export function FoodMenuFilter({
  items,
  kind,
}: {
  items: readonly FoodMenuItem[];
  kind: "bakery" | "pizzeria";
}) {
  const [category, setCategory] = useState(kind === "bakery" ? "Breakfast" : "All");
  const resultId = useId();
  const categories =
    kind === "bakery" ? ["Breakfast", "Bread", "Sweets"] : ["All", "Classic", "Vegetable"];
  const visibleItems =
    category === "All" ? items : items.filter((item) => item.category === category);
  const prefix = kind === "bakery" ? "bcr" : "sso";

  return (
    <div className={`${prefix}-menu-filter`}>
      <div className={`${prefix}-menu-tabs`} role="group" aria-label="Filter the sample menu">
        {categories.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={category === option}
            aria-controls={resultId}
            onClick={() => setCategory(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className={`${prefix}-menu-paper`} id={resultId}>
        <div className={`${prefix}-menu-paper-top`}>
          <span>{kind === "bakery" ? "FROM THE BAKER’S NOTEBOOK" : "THE GOOD STUFF"}</span>
          <span>{kind === "bakery" ? "BUTTER & CRUMB" : "SLICE SOCIAL"}</span>
        </div>
        <ul className={`${prefix}-menu-list`}>
          {visibleItems.map((item, index) => (
            <li key={item.name}>
              <span className={`${prefix}-menu-number`} aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span className={`${prefix}-menu-price`}>{item.price}</span>
            </li>
          ))}
        </ul>
        <p className={`${prefix}-menu-status`} role="status" aria-atomic="true">
          {visibleItems.length} {kind === "bakery" ? "bakes" : "pizzas"} shown · {category}
        </p>
        <p className={`${prefix}-menu-note`}>
          Sample menu · Illustrative prices in CAD. Ingredients, prices and availability are
          confirmed by the business before ordering. Ask the team about dietary requirements.
        </p>
      </div>
    </div>
  );
}

const groupOptions = [
  {
    label: "4–6 people",
    title: "A little get-together.",
    description:
      "A catch-up, a family dinner, a reason to put the phones down. Share your preferred day and time with the team.",
  },
  {
    label: "7–12 people",
    title: "Make room for everyone.",
    description:
      "A birthday dinner or a long-overdue reunion. Include the group size, preferred date and any access or dietary questions in your enquiry.",
  },
  {
    label: "13+ people",
    title: "Bring the whole crew.",
    description:
      "For a larger gathering, start a conversation about the space and your plans. The business would confirm the details and availability directly.",
  },
] as const;

export function PizzaGroupSelector() {
  const [selected, setSelected] = useState(0);
  const resultId = useId();
  const current = groupOptions[selected];

  return (
    <div className="sso-group-selector">
      <p className="sso-eyebrow">How big is your crew?</p>
      <div
        className="sso-group-options"
        role="group"
        aria-label="Choose an illustrative group size"
      >
        {groupOptions.map((option, index) => (
          <button
            type="button"
            key={option.label}
            aria-pressed={selected === index}
            aria-controls={resultId}
            onClick={() => setSelected(index)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="sso-group-result" id={resultId} aria-live="polite" aria-atomic="true">
        <span className="sso-group-number" aria-hidden="true">
          0{selected + 1}
        </span>
        <div>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
        </div>
      </div>
      <Link className="sso-button" href="/contact">
        Explore the enquiry form <span aria-hidden="true">↗</span>
      </Link>
      <p className="sso-selector-note">
        Planning illustration only. This does not check availability, create a quote or reserve a
        table.
      </p>
    </div>
  );
}

export function PizzaWheel({
  items,
  image,
  imageAlt,
}: {
  items: readonly FoodMenuItem[];
  image: string;
  imageAlt: string;
}) {
  const [selected, setSelected] = useState(0);
  const detailId = useId();
  const current = items[selected];

  return (
    <div className="sso-wheel">
      <div className="sso-wheel-stage">
        <div className="sso-wheel-orbit" aria-hidden="true" />
        <div
          className="sso-wheel-indicator"
          style={{ transform: `rotate(${selected * 60}deg)` }}
          aria-hidden="true"
        >
          <span />
        </div>
        <figure className="sso-wheel-photo">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 640px) 75vw, 480px" preload />
          <figcaption>ILLUSTRATIVE PIZZA</figcaption>
        </figure>
        <span className="sso-wheel-center-label" aria-hidden="true">
          PASS IT
          <br />
          <em>around.</em>
        </span>
        <div className="sso-wheel-radial-controls" role="group" aria-label="Choose a sample pizza">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={`sso-wheel-choice sso-wheel-choice-${index}`}
              aria-label={`Show ${item.name}`}
              aria-pressed={selected === index}
              aria-controls={detailId}
              onClick={() => setSelected(index)}
            >
              <span>0{index + 1}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="sso-wheel-mobile-controls" role="group" aria-label="Choose a sample pizza">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={selected === index}
            aria-controls={detailId}
            onClick={() => setSelected(index)}
          >
            <span>0{index + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div className="sso-wheel-ticket" id={detailId} aria-live="polite" aria-atomic="true">
        <div className="sso-wheel-ticket-top">
          <span>YOUR NEXT FAVOURITE?</span>
          <span>
            0{selected + 1} / 0{items.length}
          </span>
        </div>
        <h2>{current.name}</h2>
        <p>{current.description}</p>
        <div className="sso-wheel-ticket-bottom">
          <strong>
            {current.price}
            <small>CAD · SAMPLE PRICE</small>
          </strong>
          <Link href="/menu" aria-label="Explore the full sample pizza menu">
            Full menu <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
