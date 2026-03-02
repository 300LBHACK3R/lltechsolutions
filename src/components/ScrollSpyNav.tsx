"use client";

import { useEffect, useMemo, useState } from "react";

export type NavItem = {
  label: string;
  href: `#${string}`;
};

type Props = {
  items: NavItem[];
  className?: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function ScrollSpyNav({ items, className }: Props) {
  const [active, setActive] = useState<string>(items[0]?.href ?? "");

  const ids = useMemo(() => {
    return items.map((i) => i.href.replace("#", "")).filter(Boolean);
  }, [items]);

  useEffect(() => {
    if (ids.length === 0) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        const id = visible?.target?.id;
        if (id) setActive(`#${id}`);
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav className={cx("items-center", className)}>
      {items.map((item) => {
        const isActive = active === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            className={cx(
              "text-sm transition",
              isActive ? "text-white" : "text-white/65 hover:text-white",
            )}
          >
            <span className="relative">
              {item.label}
              <span
                className={cx(
                  "absolute left-0 -bottom-2 h-[2px] w-full rounded-full transition-opacity",
                  isActive
                    ? "opacity-100 bg-white/70"
                    : "opacity-0 bg-white/30",
                )}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
