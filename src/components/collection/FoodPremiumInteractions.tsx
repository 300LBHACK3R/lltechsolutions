"use client";

import { useId, useState, type CSSProperties } from "react";

const occasions = {
  celebration: {
    label: "A celebration",
    title: "Leave room for the good part.",
    description: "Start with the feeling of the day, then gather the practical details around it.",
    notes: [
      "A preferred date and an alternative",
      "An approximate guest count",
      "The venue and available kitchen space",
      "A seated, sharing or standing menu",
      "Dietary requirements to discuss with the caterer",
    ],
  },
  workplace: {
    label: "A work gathering",
    title: "A thoughtful pause in the working day.",
    description: "A useful starting list for team lunches, launches and hosted conversations.",
    notes: [
      "The event date and meal service window",
      "An approximate guest count",
      "Delivery access and an on-site contact",
      "A buffet, individual or shared menu",
      "Dietary requirements and labelling to discuss",
    ],
  },
  intimate: {
    label: "A smaller table",
    title: "Make a little occasion of it.",
    description: "For a dinner at home or a small gathering, a few clear details go a long way.",
    notes: [
      "The occasion and preferred date",
      "The number of people around the table",
      "Kitchen, serving and table space",
      "The pace and number of courses",
      "Dietary requirements to discuss before planning",
    ],
  },
} as const;

type Occasion = keyof typeof occasions;

export function CateringEventPlanner() {
  const [occasion, setOccasion] = useState<Occasion>("celebration");
  const [checked, setChecked] = useState<number[]>([]);
  const id = useId();
  const selected = occasions[occasion];

  function chooseOccasion(next: Occasion) {
    setOccasion(next);
    setChecked([]);
  }

  function resetPlanner() {
    setOccasion("celebration");
    setChecked([]);
  }

  return (
    <div className="cf-planner">
      <div className="cf-planner-choices">
        <p className="cf-eyebrow">A little planning, a lovely beginning</p>
        <h2>
          What brings
          <br />
          you together?
        </h2>
        <fieldset>
          <legend>Choose an occasion</legend>
          {(Object.keys(occasions) as Occasion[]).map((key, index) => (
            <button
              type="button"
              key={key}
              aria-pressed={occasion === key}
              onClick={() => chooseOccasion(key)}
            >
              <span>0{index + 1}</span>
              {occasions[key].label}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </fieldset>
        <div
          className={`cf-table-study cf-table-${occasion}`}
          role="img"
          aria-label={`Illustrative table arrangement for ${selected.label.toLowerCase()}; not a seating or capacity plan`}
        >
          <div className="cf-table-surface">
            <span className="cf-table-botanical" aria-hidden="true">
              ✳
            </span>
            <span className="cf-table-wordmark" aria-hidden="true">
              T&F
            </span>
          </div>
          {Array.from(
            { length: occasion === "workplace" ? 8 : occasion === "intimate" ? 4 : 6 },
            (_, index) => (
              <span
                className="cf-place-setting"
                key={`${occasion}-${index}`}
                style={{ "--place": index } as CSSProperties}
                aria-hidden="true"
              >
                <i />
                <b />
              </span>
            ),
          )}
          <span className="cf-table-caption">A sense of the setting / Illustration</span>
        </div>
      </div>
      <div className="cf-planner-paper">
        <div className="cf-paper-top">
          <span>Your starting list</span>
          <span aria-hidden="true">T&F</span>
        </div>
        <h3>{selected.title}</h3>
        <p>{selected.description}</p>
        <fieldset>
          <legend className="cf-checklist-legend">Tick the details you have considered</legend>
          {selected.notes.map((note, index) => (
            <label key={`${occasion}-${index}`} htmlFor={`${id}-${index}`}>
              <input
                id={`${id}-${index}`}
                type="checkbox"
                checked={checked.includes(index)}
                onChange={() =>
                  setChecked((previous) =>
                    previous.includes(index)
                      ? previous.filter((item) => item !== index)
                      : [...previous, index],
                  )
                }
              />
              <span>{note}</span>
            </label>
          ))}
        </fieldset>
        <div className="cf-planner-progress">
          <p aria-live="polite">
            {checked.length} of {selected.notes.length} details considered
          </p>
          <button type="button" onClick={resetPlanner}>
            Reset planner
          </button>
        </div>
        <p className="cf-local-note">
          A local planning exercise. Your choices are not saved or sent, and do not create a quote
          or booking.
        </p>
      </div>
    </div>
  );
}

const tastingMenus = {
  seasonal: {
    label: "Seasonal journey",
    price: "$95 CAD",
    courses: [
      [
        "To begin",
        "Tomato, peach, basil",
        "A bright opening with ripe fruit, herbs and a little acidity.",
      ],
      [
        "From the garden",
        "Mushroom, barley, aged cheese",
        "Earthy flavours with a warm, gently textured finish.",
      ],
      [
        "From the coast",
        "Roasted fish, leek, herb broth",
        "A light centrepiece, with vegetables and broth sharing the plate.",
      ],
      ["A pause", "Apple, fennel, lemon", "Something cool and crisp before the last course."],
      [
        "To finish",
        "Dark chocolate, cherry, cream",
        "A small, rich ending with a fresh fruit note.",
      ],
    ],
  },
  garden: {
    label: "Garden journey",
    price: "$85 CAD",
    courses: [
      [
        "To begin",
        "Tomato, peach, basil",
        "A bright opening with ripe fruit, herbs and a little acidity.",
      ],
      [
        "From the garden",
        "Beetroot, plum, hazelnut",
        "Roasted vegetables meet fruit and a toasted crunch.",
      ],
      [
        "At the centre",
        "Celeriac, lentil, mushroom",
        "A deeper, savoury course built around seasonal vegetables.",
      ],
      ["A pause", "Apple, fennel, lemon", "Something cool and crisp before the last course."],
      [
        "To finish",
        "Pear, almond, vanilla",
        "Soft fruit, warm spice and the comfort of a familiar flavour.",
      ],
    ],
  },
} as const;

export function DiningMenuSelector() {
  const [journey, setJourney] = useState<keyof typeof tastingMenus>("seasonal");
  const [course, setCourse] = useState(0);
  const selected = tastingMenus[journey];
  const activeCourse = selected.courses[course];

  function chooseJourney(next: keyof typeof tastingMenus) {
    setJourney(next);
    setCourse(0);
  }

  return (
    <div className="vd-tasting">
      <div className="vd-tasting-toolbar">
        <fieldset className="vd-menu-switch">
          <legend>Explore an illustrative tasting menu</legend>
          {(Object.keys(tastingMenus) as (keyof typeof tastingMenus)[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={journey === key}
              onClick={() => chooseJourney(key)}
            >
              {tastingMenus[key].label}
            </button>
          ))}
        </fieldset>
        <p className="vd-tasting-price" aria-live="polite">
          <strong>{selected.price}</strong>
          <span>Illustrative / per person</span>
        </p>
      </div>
      <div className="vd-course-theatre">
        <ol className="vd-course-list" aria-label={`${selected.label} — choose a course`}>
          {selected.courses.map(([label, name, description], index) => (
            <li key={`${journey}-${label}`}>
              <button
                type="button"
                aria-pressed={course === index}
                onClick={() => setCourse(index)}
                aria-label={`Course ${index + 1}: ${name}. ${description}`}
              >
                <span className="vd-course-number">0{index + 1}</span>
                <span>
                  <span className="vd-eyebrow">{label}</span>
                  <strong>{name}</strong>
                </span>
                <span aria-hidden="true">↗</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="vd-course-spotlight" aria-live="polite" aria-atomic="true">
          <div key={`${journey}-${course}`} className="vd-course-reveal">
            <span className="vd-course-watermark" aria-hidden="true">
              0{course + 1}
            </span>
            <p className="vd-eyebrow">
              Chapter 0{course + 1} / {activeCourse[0]}
            </p>
            <h3>{activeCourse[1]}</h3>
            <div className="vd-course-rule" aria-hidden="true" />
            <p>{activeCourse[2]}</p>
            <span className="vd-course-caption">Five courses. One unhurried evening.</span>
          </div>
        </div>
      </div>
      <p className="vd-menu-disclaimer">
        Sample dishes and prices in CAD, shown to demonstrate this website. Actual menus and pricing
        may change at launch. Dietary needs and ingredient questions must be discussed with the
        restaurant; these examples are not allergen guidance.
      </p>
    </div>
  );
}
