"use client";

import { useState } from "react";
import type { RetailTemplate } from "@/data/website-collection";

export function DetailingTreatmentGuide({ services }: { services: RetailTemplate["services"] }) {
  const [active, setActive] = useState(0);
  const service = services[active];

  return (
    <div className="curb-treatment" data-treatment={active}>
      <div className="curb-ticket-top">
        <span>THE DETAIL FINDER</span>
        <span>NO. 00{active + 1}</span>
      </div>
      <div className="curb-car-stage">
        <svg className="curb-car" viewBox="0 0 640 340" fill="none" aria-hidden="true">
          <defs>
            <linearGradient
              id="curb-body-metal"
              x1="90"
              y1="135"
              x2="580"
              y2="290"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#59666c" />
              <stop offset=".45" stopColor="#162c35" />
              <stop offset="1" stopColor="#071219" />
            </linearGradient>
            <linearGradient
              id="curb-glass"
              x1="220"
              y1="130"
              x2="395"
              y2="222"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8cdce1" stopOpacity=".65" />
              <stop offset="1" stopColor="#132d37" />
            </linearGradient>
          </defs>
          <path d="M36 282h568M76 308h488M76 38v266M565 38v266" className="curb-drawing-rule" />
          <path d="M76 66h490M76 61v10M566 61v10" className="curb-drawing-rule" />
          <path d="M215 87h210M318 79v16" className="curb-drawing-rule" />
          <ellipse cx="327" cy="280" rx="242" ry="19" fill="#020b0f" opacity=".4" />
          <path
            d="m90 210 42-45 97-16 58-46 104 1 77 53 58 17 43 37-8 44-442 3-31-17z"
            fill="url(#curb-body-metal)"
            stroke="#90a9ae"
            strokeWidth="2"
          />
          <path
            d="m239 150 54-37 91 1 56 41-104-3z"
            fill="url(#curb-glass)"
            stroke="#77969e"
            strokeWidth="2"
          />
          <path
            d="m327 112 7 42M340 160l4 80M226 159l-14 80M92 209l120-4 130 5 139-16 80 18M89 236h472"
            stroke="#80999e"
            strokeWidth="1.5"
          />
          <path d="m131 172 83-13-29 26-76 13zM482 173l45 15 24 17-57-8z" fill="#d8ffff" />
          <path d="m111 199 89-20M491 200l53 11" stroke="#bcffff" strokeWidth="3" />
          <path d="m116 222 68-4-5 15-64 2z" fill="#071b23" />
          <path d="M256 171h23M365 171h22" stroke="#9abdc2" strokeWidth="3" strokeLinecap="round" />
          <g fill="#07151b" stroke="#92adb1" strokeWidth="2">
            <circle cx="190" cy="246" r="38" />
            <circle cx="481" cy="246" r="38" />
          </g>
          <g fill="#253941" stroke="#607b81" strokeWidth="2">
            <circle cx="190" cy="246" r="23" />
            <circle cx="481" cy="246" r="23" />
          </g>
          <g stroke="#a4c4c8" strokeWidth="3">
            <path d="m190 228 0 36m-18-18h36m-31-13 26 26m0-26-26 26M481 228v36m-18-18h36m-31-13 26 26m0-26-26 26" />
          </g>
          <path
            className="curb-car-exterior"
            d="m90 210 42-45 97-16 58-46 104 1 77 53 58 17 43 37-8 44-38 1a42 42 0 0 0-83 0H232a42 42 0 0 0-83 0h-30l-31-17z"
            stroke="#8affec"
            strokeWidth="3"
          />
          <path
            className="curb-car-interior"
            d="m239 150 54-37 91 1 56 41-104-3z"
            fill="#b3ffe7"
            fillOpacity=".8"
            stroke="#b3ffe7"
            strokeWidth="3"
          />
          <g className="curb-car-sparkle" stroke="#b7fff2" strokeWidth="2">
            <path d="M150 111v32m-16-16h32M491 112v22m-11-11h22M396 72v18m-9-9h18" />
          </g>
          <path d="M194 293h96M342 293h143" stroke="#688089" strokeDasharray="4 5" />
        </svg>
        <div className="curb-stage-key">
          <span />
          Treatment area illustration
        </div>
      </div>
      <fieldset className="curb-treatment-options">
        <legend>Choose your focus</legend>
        <div>
          {services.slice(0, 3).map((item, index) => (
            <label key={item.name}>
              <input
                type="radio"
                name="curb-treatment"
                value={index}
                checked={active === index}
                onChange={() => setActive(index)}
              />
              <span>
                <small>0{index + 1}</small>
                {item.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="curb-treatment-result" aria-live="polite" aria-atomic="true">
        <span className="curb-result-plus" aria-hidden="true">
          +
        </span>
        <div>
          <h3>{service?.name}</h3>
          <p>{service?.description}</p>
        </div>
      </div>
      <p className="curb-guide-note">
        A service guide, not a result simulation. Discuss your vehicle and the work needed.
      </p>
    </div>
  );
}

const bouquetMoods = [
  {
    id: "soft",
    name: "Soft & thoughtful",
    detail: "Quiet colour. A little tenderness.",
    suggestion: "A gentle mix for a thoughtful gesture.",
    caption: "CREAM · BLUSH · LILAC",
    colors: ["#f4eabc", "#d5adc2", "#bba4cb"],
    positions: [
      [142, 122, 31],
      [235, 100, 30],
      [315, 148, 34],
      [186, 183, 33],
      [286, 220, 29],
      [112, 217, 25],
      [362, 220, 24],
    ],
  },
  {
    id: "bright",
    name: "Big happy energy",
    detail: "For the loud-and-lovely kind of day.",
    suggestion: "A joyful bunch with plenty of yellow.",
    caption: "POLLEN · CORAL · BUTTER",
    colors: ["#f5d94b", "#ed9278", "#f8e9b1"],
    positions: [
      [113, 144, 32],
      [217, 93, 35],
      [330, 129, 34],
      [167, 211, 35],
      [287, 209, 38],
      [91, 243, 20],
      [382, 236, 23],
    ],
  },
  {
    id: "wild",
    name: "A little unexpected",
    detail: "A loose shape. A wonderfully odd stem.",
    suggestion: "An expressive arrangement with room to wander.",
    caption: "MAUVE · PLUM · MEADOW",
    colors: ["#c7a5cf", "#a75f82", "#d4d99d"],
    positions: [
      [112, 88, 23],
      [235, 139, 35],
      [363, 107, 24],
      [146, 214, 32],
      [301, 226, 26],
      [74, 241, 20],
      [386, 255, 24],
    ],
  },
] as const;

export function FloristMoodSelector({ items }: { items: RetailTemplate["items"] }) {
  const [selected, setSelected] = useState<(typeof bouquetMoods)[number]["id"]>("soft");
  const mood = bouquetMoods.find((item) => item.id === selected) ?? bouquetMoods[0];
  const suggestion = items.find((item) => item.category.toLowerCase() === selected) ?? items[0];

  return (
    <section className="stem-mood" data-mood={selected} aria-labelledby="stem-mood-heading">
      <div className="stem-mood-copy">
        <p className="stem-kicker">A BOUQUET STARTS WITH A FEELING</p>
        <h2 id="stem-mood-heading">
          What’s
          <br />
          <em>the mood?</em>
        </h2>
        <fieldset>
          <legend>Pick a feeling. Watch it bloom.</legend>
          <div className="stem-mood-options">
            {bouquetMoods.map((item, index) => (
              <label key={item.id}>
                <input
                  type="radio"
                  name="stem-mood"
                  value={item.id}
                  checked={selected === item.id}
                  onChange={() => setSelected(item.id)}
                />
                <span>
                  <small>0{index + 1}</small>
                  {item.name}
                  <b aria-hidden="true">↗</b>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <p className="stem-mood-note">
          A colour study to spark an idea. Flowers and availability are illustrative.
        </p>
      </div>
      <div className="stem-mood-art">
        <div className="stem-bouquet-drawing">
          <svg viewBox="0 0 470 490" fill="none" aria-hidden="true">
            <path d="m112 238 119 223 123-223-114 45z" fill="#e2cfa6" />
            <path d="m71 234 160 227-41-181z" fill="#f8e8ba" />
            <path d="m393 231-162 230 67-179z" fill="#eddcb0" />
            <g stroke="#7b9165" strokeWidth="3" strokeLinecap="round">
              {mood.positions.map(([x, y], index) => (
                <path key={index} d={`M230 390 Q${x + (index % 2 ? 30 : -25)} 265 ${x} ${y}`} />
              ))}
              <path d="M229 387Q195 188 183 68M235 380Q304 192 286 63M238 384Q371 278 423 183M226 370Q93 327 59 184" />
            </g>
            <g fill="#82946b">
              <ellipse cx="186" cy="105" rx="9" ry="28" transform="rotate(-18 186 105)" />
              <ellipse cx="287" cy="83" rx="8" ry="24" transform="rotate(13 287 83)" />
              <ellipse cx="308" cy="165" rx="10" ry="28" transform="rotate(48 308 165)" />
              <ellipse cx="103" cy="292" rx="12" ry="30" transform="rotate(-50 103 292)" />
              <ellipse cx="363" cy="304" rx="12" ry="32" transform="rotate(51 363 304)" />
              <ellipse cx="412" cy="209" rx="8" ry="26" transform="rotate(27 412 209)" />
              <ellipse cx="67" cy="209" rx="8" ry="26" transform="rotate(-27 67 209)" />
            </g>
            {mood.positions.map(([x, y, size], index) => (
              <g key={index} className="stem-drawn-flower" transform={`translate(${x} ${y})`}>
                {Array.from({ length: 7 }, (_, petal) => (
                  <ellipse
                    key={petal}
                    cy={-size * 0.52}
                    rx={size * 0.43}
                    ry={size * 0.7}
                    transform={`rotate(${petal * (360 / 7)})`}
                    fill={mood.colors[index % 3]}
                    stroke="#42243d"
                    strokeOpacity=".14"
                    strokeWidth="1"
                  />
                ))}
                <circle r={size * 0.23} fill={index % 2 ? "#503c37" : "#d9ad47"} />
                <circle r={size * 0.1} fill="#e6cd72" />
              </g>
            ))}
            <path d="m174 358 83 35-27 68z" fill="#fff0c9" />
            <path d="m300 338-43 55-27 68z" fill="#e1c99e" />
            <path d="m203 387 62 1" stroke="#76566a" strokeWidth="5" />
            <path
              d="M238 389c38-39 60-8 4 4 32 35 35 55 16 64M236 389c-38-22-48 12 0 3-18 33-35 42-49 56"
              stroke="#76566a"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="stem-mood-result" aria-live="polite" aria-atomic="true">
          <div className="stem-palette" aria-hidden="true">
            {mood.colors.map((color) => (
              <span key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
          <p className="stem-kicker">{mood.caption}</p>
          <h3>{mood.detail}</h3>
          <p>
            {suggestion ? (
              <>
                Start with <strong>{suggestion.name}</strong>.{" "}
              </>
            ) : null}
            {mood.suggestion}
          </p>
        </div>
      </div>
    </section>
  );
}
