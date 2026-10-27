import Image from "next/image";
import type { CSSProperties } from "react";
import { christmasThemeEnabled } from "@/config/seasonal";
import ScriptureNote from "@/components/seasonal/ScriptureNote";

export function ChristmasGarland() {
  if (!christmasThemeEnabled) return null;
  return <div className="christmas-garland" aria-hidden="true" />;
}

export function ChristmasGreeting() {
  if (!christmasThemeEnabled) return null;
  return (
    <div className="christmas-header-greeting">
      <Image
        className="christmas-wreath"
        src="/images/seasonal/christmas-2026/wreath.webp"
        alt=""
        width={880}
        height={440}
        sizes="(max-width: 599px) 220px, 260px"
      />
      <div className="christmas-wreath-glints" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="christmas-greeting-copy">
        <span>Christmas at L&amp;L</span>
        <p>
          A season of <em>light.</em>
        </p>
      </div>
    </div>
  );
}

export function ChristmasLights() {
  if (!christmasThemeEnabled) return null;
  return (
    <div className="christmas-lights" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <i key={index} style={{ "--bulb-delay": `${-(index % 5) * 1.3}s` } as CSSProperties} />
      ))}
    </div>
  );
}

export function WinterSnow() {
  if (!christmasThemeEnabled) return null;
  return (
    <>
      <div className="winter-snow" aria-hidden="true">
        {Array.from({ length: 72 }, (_, index) => (
          <i
            key={index}
            style={
              {
                "--snow-left": `${(index * 37 + 3) % 100}%`,
                "--snow-size": `${2 + (index % 5)}px`,
                "--snow-opacity": `${0.28 + (index % 5) * 0.1}`,
                "--snow-duration": `${14 + (index % 7) * 3}s`,
                "--snow-delay": `${-index * 2.9}s`,
                "--snow-drift": `${(index % 2 ? 1 : -1) * (18 + index)}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="winter-ground" aria-hidden="true">
        <div className="winter-snowman">
          <Image
            className="winter-snowman-arm"
            src="/images/seasonal/christmas-2026/snowman-arm.webp"
            alt=""
            width={215}
            height={275}
            sizes="34px"
          />
          <Image
            className="winter-snowman-body"
            src="/images/seasonal/christmas-2026/snowman-body.webp"
            alt=""
            width={380}
            height={627}
            sizes="(max-width: 699px) 60px, 100px"
          />
        </div>
        <svg
          className="winter-snowbank"
          viewBox="0 0 1440 52"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            fill="#c7d7df"
            d="M0 17C100-8 150 18 270 28S440 16 600 33 820 19 970 27 1170 17 1260 20 1360-1 1440 9V52H0Z"
          />
          <path
            fill="#edf4f6"
            d="M0 25C100 5 155 30 300 34S445 27 600 39 820 31 1000 35 1180 25 1280 29 1390 8 1440 17V52H0Z"
          />
          <path
            fill="#fff"
            d="M0 40C180 28 320 44 470 43S740 41 890 46 1160 38 1300 41 1390 32 1440 34V52H0Z"
          />
        </svg>
      </div>
    </>
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
      <div className="christmas-nativity-art">
        <Image
          src="/images/seasonal/christmas-2026/nativity-lifelike.webp"
          alt="A warmly lit nativity: Mary and Joseph beside baby Jesus in the manger, with a lamb and the Star of Bethlehem above."
          width={900}
          height={600}
          sizes="(max-width: 699px) 280px, 360px"
        />
        <span className="nativity-star-glow" aria-hidden="true" />
        <span className="nativity-manger-glow" aria-hidden="true" />
      </div>
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
