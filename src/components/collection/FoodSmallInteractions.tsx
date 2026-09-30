"use client";

import { useId, useState } from "react";
import type { FoodTemplate } from "@/data/website-collection";

const brewNotes = [
  {
    name: "Espresso",
    title: "A small, lovely pause.",
    copy: "A concentrated cup, a little crema, a moment before the day begins again.",
    caption: "SHORT & SWEET",
  },
  {
    name: "Filter",
    title: "Let the morning linger.",
    copy: "A longer cup and a gentler rhythm. Find a good page and make a little room for it.",
    caption: "TAKE IT SLOW",
  },
  {
    name: "Tea",
    title: "A change of pace.",
    copy: "The quiet ritual of leaves, water and a few minutes to yourself. Nothing more complicated than that.",
    caption: "A QUIET MOMENT",
  },
] as const;

export function CafeBrewGuide() {
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  const note = brewNotes[selected];

  return (
    <section className="scc-brew-guide" aria-labelledby={`${panelId}-heading`}>
      <div className="scc-brew-controls">
        <p className="scc-kicker">A RITUAL FOR EVERY RHYTHM</p>
        <h2 id={`${panelId}-heading`}>
          How do you
          <br />
          <em>take your pause?</em>
        </h2>
        <div role="group" aria-label="Explore a drink ritual" className="scc-brew-options">
          {brewNotes.map((brew, index) => (
            <button
              type="button"
              key={brew.name}
              aria-pressed={selected === index}
              aria-controls={panelId}
              onClick={() => setSelected(index)}
            >
              {brew.name}
            </button>
          ))}
        </div>
      </div>
      <div className="scc-brew-result" id={panelId} aria-live="polite" aria-atomic="true">
        <div className="scc-brew-ring" data-brew={selected} aria-hidden="true">
          <span>{note.caption}</span>
          <b>sc.</b>
          <span>YOUR EVERYDAY RITUAL</span>
        </div>
        <div>
          <h3>{note.title}</h3>
          <p>{note.copy}</p>
          <small>A little inspiration. See the sample menu for illustrative drinks.</small>
        </div>
      </div>
    </section>
  );
}

export function CafeMenu({ items }: { items: FoodTemplate["menu"] }) {
  const categories = [...new Set(items.map((item) => item.category))];
  const [category, setCategory] = useState(categories[0]);
  const listId = useId();
  const visibleItems = items.filter((item) => item.category === category);

  return (
    <div className="scc-menu-browser">
      <div className="scc-menu-tabs" role="group" aria-label="Menu category">
        {categories.map((name) => (
          <button
            type="button"
            key={name}
            aria-pressed={category === name}
            aria-controls={listId}
            onClick={() => setCategory(name)}
          >
            {name}
            <span aria-hidden="true">{name === "Coffee" ? "↗" : "+"}</span>
          </button>
        ))}
      </div>
      <div className="scc-menu-ledger" id={listId} aria-live="polite" aria-atomic="true">
        <h3 className="scc-menu-category">{category}</h3>
        {visibleItems.map((item) => (
          <article className="scc-menu-item" key={item.name}>
            <div>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
            <span>{item.price}</span>
          </article>
        ))}
      </div>
      <p className="scc-menu-note">
        An illustrative menu, with sample prices in CAD. Ingredients, allergens, availability and
        pricing are confirmed by your café.
      </p>
    </div>
  );
}
