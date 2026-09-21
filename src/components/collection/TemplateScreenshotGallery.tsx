"use client";

import Image from "next/image";
import { useState } from "react";
import type { TemplateScreenshot } from "@/lib/template-showcase";

export default function TemplateScreenshotGallery({
  images,
}: {
  images: readonly TemplateScreenshot[];
}) {
  const [selected, setSelected] = useState(0);
  const current = images[selected] ?? images[0];
  if (!current) return null;
  return (
    <div className="template-screenshots">
      <figure className="template-screenshot-main">
        <div className="template-screenshot-window">
          <span aria-hidden="true">● ● ●</span>
          <span>{current.caption}</span>
          <a href={current.src} target="_blank" rel="noopener noreferrer">
            Full size <span className="sr-only">in a new tab</span>↗
          </a>
        </div>
        <div
          className="template-screenshot-scroll"
          role="region"
          aria-label="Screenshot preview; scroll to see the full page"
          tabIndex={0}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="(max-width: 699px) 100vw, 90vw"
          />
        </div>
        <figcaption aria-live="polite">
          {selected + 1} / {images.length} — {current.caption}
        </figcaption>
      </figure>
      {images.length > 1 && (
        <div
          className="template-screenshot-choices"
          role="group"
          aria-label="Choose a website screenshot"
        >
          {images.map((item, index) => (
            <button
              type="button"
              key={item.src}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <span className="template-screenshot-thumb">
                <Image src={item.src} alt="" fill sizes="180px" />
              </span>
              <span>{item.caption}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
