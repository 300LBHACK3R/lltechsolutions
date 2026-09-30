"use client";

import { useId, useState } from "react";

const packingTasks = [
  {
    title: "Make a little less to move",
    copy: "Set aside things to donate, recycle or pass on before you start packing.",
  },
  {
    title: "Label the destination room",
    copy: "Mark each box with its room and a short description of what is inside.",
  },
  {
    title: "Keep the first-night things close",
    copy: "Pack a separate bag with the everyday essentials you will want to find first.",
  },
  {
    title: "Talk through access",
    copy: "Check parking, lifts and stairs with your mover before the day arrives.",
  },
];

export function MovingPackingChecklist() {
  const prefix = useId();
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <div className="mc-checklist">
      <div className="mc-checklist-top">
        <span className="tl-kicker">A little head start</span>
        <span className="mc-checklist-count" role="status" aria-live="polite" aria-atomic="true">
          {checked.length} of {packingTasks.length} ready
        </span>
      </div>
      <h2>
        Your next chapter.
        <br />
        One small step at a time.
      </h2>
      <p className="mc-checklist-note" id={`${prefix}-note`}>
        A planning aid for your move. Tick things off as you go; your checklist stays in this page
        only and resets when you leave or refresh.
      </p>
      <fieldset aria-describedby={`${prefix}-note`}>
        <legend className="mc-sr-only">Packing checklist</legend>
        {packingTasks.map((task, index) => (
          <label key={task.title} className="mc-check-item" htmlFor={`${prefix}-${index}`}>
            <input
              id={`${prefix}-${index}`}
              type="checkbox"
              checked={checked.includes(task.title)}
              onChange={(event) =>
                setChecked((current) =>
                  event.target.checked
                    ? [...current, task.title]
                    : current.filter((title) => title !== task.title),
                )
              }
            />
            <span>
              <strong>{task.title}</strong>
              <small>{task.copy}</small>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="mc-checklist-bottom">
        <p>
          {checked.length === packingTasks.length
            ? "A thoughtful start. Now talk through your move with your mover."
            : "A few thoughtful steps can make the day feel easier."}
        </p>
        <button type="button" onClick={() => setChecked([])} disabled={checked.length === 0}>
          Reset list <span aria-hidden="true">↺</span>
        </button>
      </div>
    </div>
  );
}
