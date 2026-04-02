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
    return items
      .map((item) => item.href.replace("#", "").trim())
      .filter(Boolean);
  }, [items]);

  useEffect(() => {
    if (ids.length === 0) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aRatio = a.intersectionRatio ?? 0;
            const bRatio = b.intersectionRatio ?? 0;
            return bRatio - aRatio;
          });

        const topVisible = visibleEntries[0];
        const id = topVisible?.target?.id;

        if (id) {
          setActive(`#${id}`);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0.15, 0.3, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [ids]);

  return (
    <nav
      aria-label="Section navigation"
      className={cx("flex items-center gap-1.5", className)}
    >
      {items.map((item) => {
        const isActive = active === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cx(
              "group relative inline-flex items-center rounded-full px-3 py-2 text-[0.92rem] font-medium tracking-[0.01em] transition-all duration-200",
              isActive ? "text-[#f5d77a]" : "text-white/62 hover:text-white/92",
            )}
          >
            <span className="relative z-[1]">{item.label}</span>

            <span
              aria-hidden="true"
              className={cx(
                "absolute inset-0 rounded-full border transition-all duration-200",
                isActive
                  ? "border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)]"
                  : "border-transparent bg-transparent group-hover:border-[rgba(212,175,55,0.1)] group-hover:bg-white/[0.03]",
              )}
            />

            <span
              aria-hidden="true"
              className={cx(
                "absolute left-3 right-3 bottom-[0.38rem] h-px origin-left rounded-full transition-all duration-200",
                isActive
                  ? "scale-x-100 bg-[linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,0.95),rgba(245,215,122,0.9),rgba(212,175,55,0))]"
                  : "scale-x-0 bg-[linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,0.55),rgba(212,175,55,0))] group-hover:scale-x-100",
              )}
            />
          </a>
        );
      })}
    </nav>
  );
}
