"use client";

import { primaryNavigation } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function isCurrentPath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const visibleNavigation =
    pathname === "/"
      ? primaryNavigation.filter((item) => item.href !== "/")
      : primaryNavigation;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationFrame = useRef<number | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMenuOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const updateScrollState = () => {
      if (animationFrame.current !== null) {
        return;
      }

      animationFrame.current = window.requestAnimationFrame(() => {
        const documentHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        setScrolled(window.scrollY > 18);
        setProgress(
          documentHeight > 0
            ? Math.min(1, Math.max(0, window.scrollY / documentHeight))
            : 0,
        );

        animationFrame.current = null;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    if (menuOpen) {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        "button, a[href]",
      );
      firstFocusable?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuOpen || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={scrolled ? "nav-shell is-scrolled" : "nav-shell"}>
      <div className="nav-studio-rail" />

      <div
        className="nav-scroll-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div className="container-premium flex min-h-[86px] items-center justify-between gap-6 py-2">
        <Link
          href="/"
          aria-label="L&L Tech Solutions home"
          className="brand-lockup"
        >
          <Image
            src="/brand/logo-mark.webp"
            alt=""
            width={72}
            height={72}
            priority
            sizes="72px"
            className="brand-mark"
          />

          <span className="brand-lockup-copy">
            <strong>L&amp;L</strong>
            <span>Tech Solutions</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-[0.69rem] font-semibold uppercase tracking-[0.16em] text-white/64 xl:flex"
          aria-label="Primary navigation"
        >
          {visibleNavigation.map((item) => {
            const current = isCurrentPath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={current ? "nav-link is-current" : "nav-link"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-gold hidden sm:inline-flex">
            Start A Project
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={
              menuOpen
                ? "menu-trigger is-open xl:hidden"
                : "menu-trigger xl:hidden"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={
          menuOpen
            ? "mobile-nav-backdrop is-open xl:hidden"
            : "mobile-nav-backdrop xl:hidden"
        }
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        ref={panelRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={
          menuOpen
            ? "mobile-nav-panel is-open xl:hidden"
            : "mobile-nav-panel xl:hidden"
        }
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-nav-heading">
          <div>
            <p>Navigation</p>
            <span>Calgary-based • Canada-wide</span>
          </div>
          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Close navigation menu"
            onClick={() => {
              setMenuOpen(false);
              menuButtonRef.current?.focus();
            }}
          >
            ×
          </button>
        </div>

        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          {visibleNavigation.map((item, index) => {
            const current = isCurrentPath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
                className={current ? "is-current" : ""}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          tabIndex={menuOpen ? 0 : -1}
          className="btn-gold mt-auto w-full"
        >
          Start A Project
        </Link>
      </aside>
    </header>
  );
}
