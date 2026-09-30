"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { retailPagePath } from "@/data/website-collection";

const subscribe = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

export function RetailNavigation({
  id,
  brand,
  subbrand,
  pages,
  activePage,
}: {
  id: string;
  brand: string;
  subbrand: string;
  pages: readonly string[];
  activePage: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const ready = useSyncExternalStore(subscribe, browserReady, serverReady);
  const onePage = pages.length === 1;
  const links = onePage ? ["Services", "About", "Contact"] : pages;
  return (
    <header
      className="retail-header"
      data-enhanced={ready}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link href="/" className="retail-brand" aria-label={`${brand} home`}>
        <span>
          {brand}
          <small>{subbrand}</small>
        </span>
      </Link>
      <button
        ref={toggle}
        type="button"
        className="retail-menu-toggle"
        aria-expanded={open}
        aria-controls={`retail-navigation-${id}`}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close menu −" : "Menu +"}
      </button>
      <nav
        id={`retail-navigation-${id}`}
        className="retail-nav"
        aria-label="Demo website"
        data-open={open}
      >
        {links.map((label) => (
          <Link
            key={label}
            href={onePage ? `#${label.toLowerCase()}` : retailPagePath(label)}
            aria-current={
              !onePage &&
              activePage.toLowerCase().replaceAll(" ", "-") ===
                label.toLowerCase().replaceAll(" ", "-")
                ? "page"
                : undefined
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
