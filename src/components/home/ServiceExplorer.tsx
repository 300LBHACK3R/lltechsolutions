"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { servicePillars } from "@/data/services";
import SignalArtwork from "@/components/ui/SignalArtwork";

function ServiceIllustration({ index }: { index: number }) {
  return (
    <div className={`service-visual service-visual-${index}`} aria-hidden="true">
      <SignalArtwork />
      {index === 0 ? (
        <div className="interface-composition">
          <div className="interface-toolbar">
            <span>L&L / Digital craft</span>
            <i />
          </div>
          <div className="interface-body">
            <span>Make the first impression count.</span>
            <div className="interface-type">
              Built to
              <br />
              <em>stand apart.</em>
            </div>
            <div className="interface-cta">
              Your next chapter <b>↗</b>
            </div>
          </div>
          <div className="interface-check">
            <span>01</span> Discover <b>→</b> Trust <b>→</b> Enquire
          </div>
        </div>
      ) : index === 1 ? (
        <div className="workflow-composition">
          <div className="workflow-input">
            Your team <span>↘</span>
          </div>
          <div className="workflow-core">
            <span className="core-icon">⌘</span>
            <strong>
              One connected
              <br />
              workspace.
            </strong>
            <small>Built around your workflow</small>
          </div>
          <div className="workflow-outputs">
            <span>Customers</span>
            <span>Operations</span>
            <span>Integrations</span>
          </div>
        </div>
      ) : (
        <div className="content-composition">
          <div className="content-frame content-frame-back">
            <span>01 / Strategy</span>
            <strong>
              A clear
              <br />
              direction.
            </strong>
            <i />
          </div>
          <div className="content-frame content-frame-front">
            <span>02 / Content</span>
            <strong>
              Your brand.
              <br />
              <em>In motion.</em>
            </strong>
            <div className="content-wave">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <small>Photo · Video · Creative</small>
          </div>
          <div className="content-publish">
            03 / Publish <span>Stay present. Stay connected. ↗</span>
          </div>
        </div>
      )}
    </div>
  );
}

export type ServicePreview = Pick<
  (typeof servicePillars)[number],
  "id" | "name" | "shortName" | "preview" | "title"
>;

export default function ServiceExplorer({ services }: { services: readonly ServicePreview[] }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="service-explorer">
      <div
        role="tablist"
        aria-label="Explore our disciplines"
        aria-orientation="vertical"
        className="service-options"
      >
        {services.map((service, index) => (
          <button
            type="button"
            key={service.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            role="tab"
            id={`service-tab-${service.id}`}
            aria-controls={`service-panel-${service.id}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowDown") next = (index + 1) % services.length;
              else if (event.key === "ArrowUp")
                next = (index + services.length - 1) % services.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = services.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              tabs.current[next]?.focus();
            }}
          >
            <span className="row-number">0{index + 1}</span>
            <span className="service-option-copy">
              <strong>{service.name}</strong>
              <span>{service.preview}</span>
            </span>
            <span className="service-option-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className="service-panels">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={`service-panel-${service.id}`}
            role="tabpanel"
            aria-labelledby={`service-tab-${service.id}`}
            tabIndex={0}
            hidden={selected !== index}
            className="service-panel"
          >
            <ServiceIllustration index={index} />
            <div className="service-panel-footer">
              <p>{service.title}</p>
              <Link className="text-link" href={`/services#${service.id}`}>
                Explore {service.shortName.toLowerCase()} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <noscript>
        <p className="muted">
          Explore all three disciplines on our <a href="/services">services page</a>.
        </p>
      </noscript>
    </div>
  );
}
