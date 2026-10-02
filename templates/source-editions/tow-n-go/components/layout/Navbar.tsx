"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const navItems = [
  {
    href: "/rentals",
    label: "Trailer Rentals",
  },
  {
    href: "/services",
    label: "Services / Add-Ons",
  },
  {
    href: "/recent-jobs",
    label: "Gallery",
  },
  {
    href: "/about",
    label: "About",
  },
  { label: "Reviews", href: "/reviews" },
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/contact",
    label: "Contact",
  },
] as const;

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function isNavItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Route changes intentionally close the mobile menu.
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);

      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/[0.95] shadow-[0_12px_40px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1500px] items-center justify-between gap-3 px-4 sm:h-24 sm:gap-5 sm:px-6 xl:h-28 xl:px-8">
        <Link
          href="/"
          aria-label="Trail & Co Rentals home"
          className="group relative z-10 block h-[64px] w-[180px] shrink-0 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:h-[76px] sm:w-[225px] xl:h-[88px] xl:w-[270px]"
        >
          <span className="flex h-full flex-col justify-center text-xl font-black tracking-tight text-white sm:text-2xl">
            <span>
              TRAIL <span className="text-[#d4af37]">&amp; CO</span>
            </span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-[0.32em] text-zinc-400">
              Rentals
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 items-center gap-3 xl:flex 2xl:gap-5"
        >
          {navItems.map((item) => {
            const isActive = isNavItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative whitespace-nowrap rounded-md px-1 py-3 text-sm font-semibold transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black",
                  "after:absolute after:inset-x-1 after:bottom-1 after:h-px after:origin-left after:bg-[#d4af37] after:transition-transform after:duration-200",
                  isActive
                    ? "text-[#e6c354] after:scale-x-100"
                    : "text-zinc-200 after:scale-x-0 hover:text-white hover:after:scale-x-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          <a
            href={siteConfig.phoneHref}
            className="ml-1 inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-[#d4af37] px-5 py-3.5 text-sm font-black text-black shadow-[0_16px_45px_rgba(212,175,55,0.23)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            Contact details (demo)
          </a>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.045] text-white shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition duration-200 hover:border-[#d4af37]/55 hover:bg-[#d4af37]/10 hover:text-[#e6c354] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black xl:hidden"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={[
          "overflow-hidden border-t bg-black/[0.98] shadow-[0_24px_50px_rgba(0,0,0,0.45)] transition-[max-height,opacity,border-color] duration-300 ease-out xl:hidden",
          isOpen
            ? "max-h-[calc(100dvh-5rem)] overflow-y-auto border-white/10 opacity-100 sm:max-h-[calc(100dvh-6rem)]"
            : "pointer-events-none max-h-0 border-transparent opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Mobile navigation"
          className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8"
        >
          <div className="grid gap-3">
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={isOpen ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "flex min-h-14 items-center rounded-2xl border px-5 py-4 text-base font-bold transition duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    isActive
                      ? "border-[#d4af37]/45 bg-[#d4af37]/12 text-[#e6c354]"
                      : "border-white/10 bg-white/[0.035] text-white hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 hover:text-[#e6c354]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href={siteConfig.phoneHref}
              tabIndex={isOpen ? 0 : -1}
              className="mt-1 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#d4af37] px-5 py-4 text-center text-base font-black text-black shadow-[0_16px_45px_rgba(212,175,55,0.2)] transition duration-200 hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              Contact details (demo) {siteConfig.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
