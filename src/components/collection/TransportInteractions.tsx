"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { transportPagePath, type TransportTemplate } from "@/data/website-collection";

const subscribe = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

export function TransportNavigation({
  template,
  page,
}: {
  template: TransportTemplate;
  page: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const ready = useSyncExternalStore(subscribe, browserReady, serverReady);
  const onePage = template.pages.length === 1;
  const links = onePage ? ["Services", "About", "Contact"] : template.pages;
  return (
    <header
      className="tl-header"
      data-enhanced={ready}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link href="/" className="tl-brand" aria-label={`${template.brand} home`}>
        <span className="tl-brand-symbol" aria-hidden="true">
          ↗
        </span>
        <span>
          {template.brand}
          <small>{template.subbrand}</small>
        </span>
      </Link>
      <button
        ref={toggle}
        type="button"
        className="tl-menu-toggle"
        aria-expanded={open}
        aria-controls={`tl-navigation-${template.id}`}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close menu −" : "Menu +"}
      </button>
      <nav
        className="tl-nav"
        id={`tl-navigation-${template.id}`}
        aria-label="Demo website"
        data-open={open}
      >
        {links.map((label) => (
          <Link
            key={label}
            href={onePage ? `#${label.toLowerCase()}` : transportPagePath(label)}
            aria-current={
              !onePage && page.toLowerCase() === label.toLowerCase() ? "page" : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
