import Image from "next/image";
import type { CSSProperties } from "react";
import { christmasThemeEnabled } from "@/config/seasonal";
import ScriptureNote from "@/components/seasonal/ScriptureNote";

export function ChristmasMasthead() {
  if (!christmasThemeEnabled) return null;
  return (
    <div className="christmas-masthead">
      <Image
        className="christmas-garland christmas-garland-left"
        src="/images/seasonal/christmas-2026/garland.webp"
        alt=""
        width={1200}
        height={400}
        sizes="(max-width: 699px) 240px, 480px"
      />
      <div className="christmas-masthead-message">
        <span>Christmas at L&amp;L</span>
        <p>
          A season of <em>light.</em>
        </p>
      </div>
      <Image
        className="christmas-garland christmas-garland-right"
        src="/images/seasonal/christmas-2026/garland.webp"
        alt=""
        width={1200}
        height={400}
        sizes="(max-width: 699px) 240px, 480px"
      />
    </div>
  );
}

export function ChristmasLights() {
  if (!christmasThemeEnabled) return null;
  return (
    <div className="christmas-lights" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <i key={index} style={{ "--bulb-delay": `${-(index % 5)}s` } as CSSProperties} />
      ))}
    </div>
  );
}

export function WinterSnow() {
  if (!christmasThemeEnabled) return null;
  return (
    <div className="winter-snow" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <i
          key={index}
          style={
            {
              "--snow-left": `${(index * 37 + 3) % 100}%`,
              "--snow-size": `${2 + (index % 4)}px`,
              "--snow-duration": `${18 + (index % 7) * 3}s`,
              "--snow-delay": `${-index * 2.9}s`,
              "--snow-drift": `${(index % 2 ? 1 : -1) * (18 + index)}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function ChristmasOrnament() {
  if (!christmasThemeEnabled) return null;
  return (
    <div
      className="christmas-ornament"
      role="img"
      aria-label="Gold Star of David Christmas ornament"
    >
      <svg viewBox="0 0 80 170" fill="none" aria-hidden="true">
        <path className="christmas-ornament-thread" d="M40 0v70" />
        <circle cx="40" cy="74" r="4" />
        <path d="m40 82 30 52H10L40 82Zm0 70-30-52h60l-30 52Z" />
      </svg>
    </div>
  );
}

export function ChristmasNativity() {
  if (!christmasThemeEnabled) return null;
  return (
    <div className="christmas-nativity">
      <Image
        src="/images/seasonal/christmas-2026/nativity.webp"
        alt="A warmly lit nativity: Mary and Joseph beside baby Jesus in the manger, with a lamb and the Star of Bethlehem above."
        width={900}
        height={600}
        sizes="(max-width: 699px) 280px, 360px"
      />
      <div className="christmas-nativity-copy">
        <p className="christmas-kicker">Peace. Hope. Goodwill.</p>
        <h2>
          Christ, our <em>hope.</em>
        </h2>
        <p>
          Celebrating His birth, and the light He brings.
          <br />
          Merry Christmas from L&amp;L Tech Solutions.
        </p>
        <ScriptureNote verse="christmas" />
      </div>
    </div>
  );
}
