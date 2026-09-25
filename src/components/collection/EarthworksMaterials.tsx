"use client";

import Image from "next/image";
import { useId, useState } from "react";

const materialDirections = [
  {
    name: "Pale stone",
    tone: "stone",
    eyebrow: "01 / Structure & texture",
    title: "Quiet colour. Lasting character.",
    description:
      "A warm, restrained palette lets the shape of the landscape speak. Explore pale paving, textured walls and the meeting point between the two.",
    image: "/images/collection/earthworks-detail.webp",
    alt: "Illustrative pale stone paving and textured retaining wall with a gravel border",
    width: 1200,
    height: 800,
    considerations: [
      ["The feeling", "Warm, grounded and architectural"],
      ["Worth discussing", "Surface finish, drainage and winter care"],
      ["Where to start", "Patios, paths and changes in level"],
    ],
  },
  {
    name: "Living green",
    tone: "green",
    eyebrow: "02 / Planting & atmosphere",
    title: "A softer edge to everyday life.",
    description:
      "Layered planting brings movement, privacy and a sense of season to an outdoor space. Build the palette around the light, the soil and the care you want to give it.",
    image: "/images/collection/earthworks-landscape.webp",
    alt: "Illustrative landscaped garden with layered greenery around a stone outdoor living space",
    width: 1536,
    height: 1024,
    considerations: [
      ["The feeling", "Sheltered, natural and welcoming"],
      ["Worth discussing", "Sunlight, soil, water and seasonal upkeep"],
      ["Where to start", "Garden borders and outdoor living spaces"],
    ],
  },
  {
    name: "Earth & grade",
    tone: "earth",
    eyebrow: "03 / The foundation beneath",
    title: "Start with the shape of the land.",
    description:
      "A finished landscape begins below the surface. Think through levels, access and how water moves before deciding what the space will become.",
    image: "/images/collection/earthworks-site.webp",
    alt: "Illustrative graded site with excavation equipment and a woodland backdrop",
    width: 1536,
    height: 1024,
    considerations: [
      ["The feeling", "Open, considered and full of possibility"],
      ["Worth discussing", "Site levels, access and drainage requirements"],
      ["Where to start", "Preparing a site or rethinking an existing space"],
    ],
  },
] as const;

/** An illustrative palette explorer, not a product specification or quotation. */
export default function EarthworksMaterials({ standalone }: { standalone: boolean }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const material = materialDirections[selected];
  const Heading = standalone ? "h2" : "h4";

  return (
    <div className="earth-material-explorer">
      <div
        className="earth-material-controls"
        role="group"
        aria-label="Choose a material direction"
      >
        {materialDirections.map((item, index) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={selected === index}
            aria-controls={`${id}-material`}
            onClick={() => setSelected(index)}
          >
            <span className={`earth-swatch earth-swatch-${item.tone}`} aria-hidden="true" />
            <span>{item.name}</span>
            <span className="earth-material-selected" aria-hidden="true">
              {selected === index ? "✓" : "+"}
            </span>
          </button>
        ))}
      </div>
      <div className="earth-material-stage" id={`${id}-material`}>
        <figure className="earth-material-photo" key={material.name}>
          <Image
            src={material.image}
            alt={material.alt}
            width={material.width}
            height={material.height}
            sizes="(max-width:699px) 100vw, 60vw"
          />
          <figcaption>{material.eyebrow}</figcaption>
        </figure>
        <div className="earth-material-copy" aria-live="polite" aria-atomic="true">
          <p className="earth-kicker">A palette with purpose</p>
          <Heading>{material.title}</Heading>
          <p>{material.description}</p>
          <dl>
            {material.considerations.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="earth-material-note">
            Illustrative directions. Actual materials and suitability are agreed for your site.
          </p>
        </div>
      </div>
    </div>
  );
}
