"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { artsyNailContent } from "@/data/artsy-nail-content";
import { artsyNailPagePath } from "@/data/artsy-nail-pages";

export default function ArtsyNailInteractions() {
  const [selected, setSelected] = useState(0);
  const palette = artsyNailContent.palettes[selected];

  return (
    <section className="artsy-nail-play" aria-labelledby="artsy-nail-play-heading">
      <div className="artsy-nail-play-copy">
        <p className="artsy-nail-eyebrow">THE COLOUR CLUB / A LITTLE EXPERIMENT</p>
        <h2 id="artsy-nail-play-heading">
          What’s your <em>mood?</em>
        </h2>
        <p>
          Pick a palette. See the idea take shape. Your next set starts with a little curiosity.
        </p>
        <div
          className="artsy-nail-palette-options"
          role="group"
          aria-label="Choose a nail art colour palette"
        >
          {artsyNailContent.palettes.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              aria-controls="artsy-nail-palette-preview"
              onClick={() => setSelected(index)}
            >
              <span style={{ background: item.colour }} aria-hidden="true" />
              {item.name}
              <span className="artsy-nail-palette-check" aria-hidden="true">
                {selected === index ? "↗" : "+"}
              </span>
            </button>
          ))}
        </div>
        <Link className="artsy-nail-text-link" href={artsyNailPagePath("Nail Menu")}>
          Explore the art set <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div
        id="artsy-nail-palette-preview"
        className="artsy-nail-palette-preview"
        data-palette={palette.id}
        style={
          {
            "--polish": palette.colour,
            "--polish-accent": palette.accent,
            "--polish-base": palette.base,
          } as CSSProperties
        }
      >
        <span className="artsy-nail-sample-label">THE CHROMA COLOUR STUDY</span>
        <div className="artsy-nail-nail-study" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((nail) => (
            <span key={nail} className={`artsy-nail-swatch artsy-nail-swatch-${nail}`}>
              <i />
            </span>
          ))}
        </div>
        <div className="artsy-nail-palette-caption" aria-live="polite" aria-atomic="true">
          <span>
            0{selected + 1} / {palette.finish}
          </span>
          <h3>{palette.name}</h3>
          <p>{palette.caption}</p>
        </div>
        <span className="artsy-nail-study-note">Concept colours · Your set is made for you</span>
      </div>
    </section>
  );
}
