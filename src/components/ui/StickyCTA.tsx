"use client";

import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function StickyCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const hiddenOnRoute =
    pathname === "/contact" ||
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/security";

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 240);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hiddenOnRoute) {
    return null;
  }

  return (
    <div
      aria-hidden={!show}
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ease-out md:hidden",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="mx-auto max-w-md px-3 pb-[calc(10px+env(safe-area-inset-bottom))]">
        <div className="overflow-hidden rounded-[1rem] border border-[rgba(228,199,127,0.2)] bg-[rgba(5,12,22,0.94)] shadow-[0_18px_60px_rgba(0,0,0,0.62)] backdrop-blur-xl">
          <div className="h-0.5 bg-[linear-gradient(90deg,#2f6fbb,#e4c77f,#2f6fbb)]" />

          <div className="grid grid-cols-3">
            <a
              href={siteConfig.phone.href}
              aria-label="Call L&L Tech Solutions"
              className="flex min-h-14 items-center justify-center border-r border-white/[0.06] text-sm font-semibold text-white/72 transition hover:text-[#e4c77f]"
            >
              Call
            </a>

            <a
              href="/contact"
              aria-label="Open the project contact page"
              className="flex min-h-14 items-center justify-center bg-[linear-gradient(135deg,#ead39a,#c9a451)] px-3 text-center text-sm font-black text-[#090704]"
            >
              Start Project
            </a>

            <a
              href={siteConfig.phone.sms}
              aria-label="Text L&L Tech Solutions"
              className="flex min-h-14 items-center justify-center border-l border-white/[0.06] text-sm font-semibold text-white/72 transition hover:text-[#e4c77f]"
            >
              Text
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
