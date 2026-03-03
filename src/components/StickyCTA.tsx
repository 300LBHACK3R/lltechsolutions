"use client";

import { useEffect, useState } from "react";

const PHONE_TEL = "tel:+17782158483";
const SMS_TEL = "sms:+17782158483";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 180);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 md:hidden transition-all duration-300",
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 pointer-events-none",
      )}
    >
      <div className="mx-auto max-w-md px-4 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-[#070b1a]/90 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
          <a
            href={PHONE_TEL}
            className="flex h-12 items-center justify-center text-sm font-semibold text-white/90 hover:bg-white/10 transition"
          >
            Call
          </a>

          <a
            href="#contact"
            className="flex h-12 items-center justify-center bg-white text-sm font-semibold text-slate-900 hover:bg-white/90 transition"
          >
            Free Audit
          </a>

          <a
            href={SMS_TEL}
            className="flex h-12 items-center justify-center text-sm font-semibold text-white/90 hover:bg-white/10 transition"
          >
            Text
          </a>
        </div>
      </div>
    </div>
  );
}
