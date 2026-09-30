"use client";

import { useId, useState } from "react";
import type { RetailTemplate } from "@/data/website-collection";

const wheelFinishes = [
  { name: "Graphite", light: "#abb5ba", mid: "#51595e", dark: "#20272d", accent: "#9faeb7" },
  { name: "Brushed silver", light: "#f5f7f7", mid: "#a6afb5", dark: "#545f67", accent: "#d4dee3" },
  { name: "Satin bronze", light: "#e8c29b", mid: "#a47851", dark: "#503323", accent: "#cb9566" },
];

export function WheelFinishStudio({ compact = false }: { compact?: boolean }) {
  const [finishIndex, setFinishIndex] = useState(2);
  const [spinning, setSpinning] = useState(false);
  const id = useId();
  const finish = wheelFinishes[finishIndex];
  return (
    <div className={`axis-studio${compact ? " axis-studio-compact" : ""}`}>
      <div className="axis-studio-topline">
        <span>AX / 01</span>
        <span>Surface study</span>
        <span aria-hidden="true">+</span>
      </div>
      <div className="axis-wheel-stage">
        <span className="axis-wheel-annotation axis-annotation-top">
          Split spoke / front elevation
        </span>
        <svg
          className={`axis-wheel${spinning ? " is-spinning" : ""}`}
          viewBox="0 0 520 520"
          role="img"
          aria-labelledby={`${id}-title`}
        >
          <title id={`${id}-title`}>
            Illustrative split-spoke wheel in {finish.name.toLowerCase()}
          </title>
          <defs>
            <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={finish.light} />
              <stop offset=".24" stopColor={finish.mid} />
              <stop offset=".5" stopColor={finish.light} />
              <stop offset=".7" stopColor={finish.dark} />
              <stop offset="1" stopColor={finish.mid} />
            </linearGradient>
            <radialGradient id={`${id}-tyre`}>
              <stop offset=".78" stopColor="#050709" />
              <stop offset=".9" stopColor="#282c2e" />
              <stop offset="1" stopColor="#080a0c" />
            </radialGradient>
            <radialGradient id={`${id}-rotor`}>
              <stop offset="0" stopColor="#747875" />
              <stop offset=".6" stopColor="#383f41" />
              <stop offset="1" stopColor="#171d20" />
            </radialGradient>
          </defs>
          <circle
            cx="260"
            cy="260"
            r="246"
            fill="none"
            stroke="#6d767a"
            strokeWidth=".7"
            strokeDasharray="2 9"
          />
          <g className="axis-wheel-rotating">
            <circle cx="260" cy="260" r="236" fill={`url(#${id}-tyre)`} />
            <circle cx="260" cy="260" r="221" fill="none" stroke="#3c4143" />
            <circle cx="260" cy="260" r="210" fill={`url(#${id}-metal)`} />
            <circle cx="260" cy="260" r="197" fill="#080d0f" />
            <circle cx="260" cy="260" r="180" fill="none" stroke={finish.dark} strokeWidth="5" />
            <circle
              cx="260"
              cy="260"
              r="126"
              fill={`url(#${id}-rotor)`}
              stroke="#737b7b"
              strokeWidth="2"
            />
            {Array.from({ length: 20 }, (_, index) => (
              <g key={index} transform={`rotate(${index * 18} 260 260)`}>
                <circle cx="260" cy="150" r="3" fill="#101719" />
                <circle cx="268" cy="170" r="2.5" fill="#101719" />
              </g>
            ))}
            {Array.from({ length: 10 }, (_, index) => (
              <g key={index} transform={`rotate(${index * 36} 260 260)`}>
                <path
                  d="M247 238 222 77 236 67 262 220Z"
                  fill={`url(#${id}-metal)`}
                  stroke={finish.dark}
                  strokeWidth="1.5"
                />
                <path
                  d="M260 224 273 66 286 73 275 244Z"
                  fill={`url(#${id}-metal)`}
                  stroke={finish.dark}
                  strokeWidth="1.5"
                />
                <path
                  d="M230 79 252 222M278 79 268 223"
                  fill="none"
                  stroke={finish.light}
                  strokeWidth="1"
                  opacity=".6"
                />
              </g>
            ))}
            <circle
              cx="260"
              cy="260"
              r="53"
              fill={`url(#${id}-metal)`}
              stroke={finish.dark}
              strokeWidth="3"
            />
            {[
              [260, 222],
              [296, 248],
              [282, 290],
              [238, 290],
              [224, 248],
            ].map(([x, y]) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r="6"
                fill="#111719"
                stroke={finish.light}
                strokeWidth="1.5"
              />
            ))}
            <circle cx="260" cy="260" r="22" fill="#131a1d" stroke={finish.light} />
            <path
              d="m247 269 13-23 13 23M253 261h14"
              fill="none"
              stroke={finish.accent}
              strokeWidth="2"
            />
            <circle cx="260" cy="260" r="204" fill="none" stroke={finish.light} strokeWidth="1.5" />
          </g>
        </svg>
        <span className="axis-wheel-annotation axis-annotation-bottom">
          Form / finish / proportion
        </span>
      </div>
      <div className="axis-studio-controls">
        <div>
          <p className="axis-control-label">Explore the finish</p>
          <div className="axis-finishes" role="group" aria-label="Wheel finish colour">
            {wheelFinishes.map((option, index) => (
              <button
                key={option.name}
                type="button"
                aria-pressed={finishIndex === index}
                onClick={() => setFinishIndex(index)}
              >
                <span style={{ background: option.mid }} aria-hidden="true" />
                {option.name}
              </button>
            ))}
          </div>
        </div>
        <button
          className="axis-spin-button"
          type="button"
          aria-pressed={spinning}
          onClick={() => setSpinning((current) => !current)}
        >
          {spinning ? "Pause rotation" : "Rotate slowly"}
          <span aria-hidden="true">{spinning ? "Ⅱ" : "↻"}</span>
        </button>
      </div>
      <div className="axis-studio-caption">
        <p aria-live="polite">{finish.name} · illustrative finish</p>
        <p>Concept visual only. Motion follows your settings.</p>
      </div>
    </div>
  );
}

const metalStudies = [
  { name: "Champagne", light: "#f9efca", mid: "#baa064", dark: "#72603a" },
  { name: "Silver", light: "#fafafa", mid: "#b2b7b9", dark: "#707779" },
  { name: "Rose", light: "#f5dcd0", mid: "#c18d7c", dark: "#875748" },
];

export function JewelleryGallery({ items }: { items: RetailTemplate["items"] }) {
  const [index, setIndex] = useState(0);
  const [metalIndex, setMetalIndex] = useState(0);
  const id = useId();
  const studies = items.slice(0, 3);
  const item = studies[index];
  const metal = metalStudies[metalIndex];
  if (!item) return null;
  return (
    <div className="forme-gallery">
      <div className="forme-object-stage">
        <span className="forme-object-number">Study / 0{index + 1}</span>
        <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`}>
          <title id={`${id}-title`}>
            {item.name}, a geometric jewellery study in {metal.name.toLowerCase()} tones
          </title>
          <defs>
            <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={metal.dark} />
              <stop offset=".2" stopColor={metal.light} />
              <stop offset=".44" stopColor={metal.mid} />
              <stop offset=".64" stopColor={metal.dark} />
              <stop offset=".83" stopColor={metal.light} />
              <stop offset="1" stopColor={metal.mid} />
            </linearGradient>
            <linearGradient id={`${id}-edge`} x1="0" y1="1" x2="1" y2="0">
              <stop stopColor={metal.dark} />
              <stop offset=".55" stopColor={metal.mid} />
              <stop offset="1" stopColor={metal.light} />
            </linearGradient>
            <radialGradient id={`${id}-shadow`}>
              <stop stopColor="#554b3b" stopOpacity=".2" />
              <stop offset="1" stopColor="#554b3b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="310" cy="366" rx="182" ry="31" fill={`url(#${id}-shadow)`} />
          {index % 3 === 0 ? (
            <g transform="rotate(-28 300 230)">
              <ellipse
                cx="300"
                cy="230"
                rx="128"
                ry="154"
                fill="none"
                stroke={`url(#${id}-edge)`}
                strokeWidth="39"
              />
              <ellipse
                cx="291"
                cy="220"
                rx="122"
                ry="145"
                fill="none"
                stroke={`url(#${id}-metal)`}
                strokeWidth="34"
              />
              <ellipse
                cx="289"
                cy="219"
                rx="107"
                ry="129"
                fill="none"
                stroke={metal.light}
                strokeWidth="1.5"
                opacity=".8"
              />
            </g>
          ) : index % 3 === 1 ? (
            <g>
              {[0, 1].map((earring) => (
                <g
                  key={earring}
                  transform={`translate(${earring * 175} ${earring * 28}) rotate(${earring ? 9 : -9} 214 224)`}
                >
                  <circle cx="205" cy="110" r="13" fill={`url(#${id}-metal)`} />
                  <path
                    d="M201 121 162 228Q142 275 184 318L230 345 250 309 216 278Q195 257 209 224L243 140Z"
                    fill={`url(#${id}-metal)`}
                  />
                  <path
                    d="m201 121 42 19-34 84q-14 33 7 54l34 31-21-6q-55-30-40-78Z"
                    fill={`url(#${id}-edge)`}
                  />
                  <path
                    d="m201 122-39 106q-20 47 22 90l44 27"
                    fill="none"
                    stroke={metal.light}
                    strokeWidth="2"
                  />
                </g>
              ))}
            </g>
          ) : (
            <g>
              <path
                d="M200 29Q242 160 293 201M400 29Q358 160 307 201"
                fill="none"
                stroke={`url(#${id}-metal)`}
                strokeWidth="4"
              />
              <path d="M285 190h30l13 162q-27 17-55 0Z" fill={`url(#${id}-metal)`} />
              <path d="m306 192 9 0 13 160-13 6Z" fill={`url(#${id}-edge)`} />
              <path d="m286 194-11 156" fill="none" stroke={metal.light} strokeWidth="2" />
            </g>
          )}
        </svg>
        <span className="forme-object-note">An exploration of shape, light & material</span>
      </div>
      <div className="forme-gallery-label">
        <div className="forme-gallery-count" aria-live="polite" aria-atomic="true">
          0{index + 1} / 0{studies.length}
          <span className="sr-only"> · {item.name}</span>
        </div>
        <div className="forme-gallery-description">
          <p className="forme-eyebrow">{item.category}</p>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <div className="forme-gallery-arrows" role="group" aria-label="Browse jewellery studies">
          <button
            type="button"
            aria-label="Previous jewellery study"
            onClick={() => setIndex((current) => (current + studies.length - 1) % studies.length)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next jewellery study"
            onClick={() => setIndex((current) => (current + 1) % studies.length)}
          >
            →
          </button>
        </div>
      </div>
      <div className="forme-metal-controls">
        <p>See it in another light</p>
        <div role="group" aria-label="Metal colour study">
          {metalStudies.map((option, i) => (
            <button
              type="button"
              key={option.name}
              aria-pressed={metalIndex === i}
              onClick={() => setMetalIndex(i)}
            >
              <span aria-hidden="true" style={{ background: option.mid }} />
              {option.name}
            </button>
          ))}
        </div>
        <small aria-live="polite">
          {metal.name} tone · conceptual colour, not a material specification.
        </small>
      </div>
    </div>
  );
}
