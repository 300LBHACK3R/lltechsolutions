"use client";

import { useEffect, useState } from "react";

const PHONE_TEL = "tel:+1XXXXXXXXXX"; // TODO: replace
const SMS_TEL = "sms:+1XXXXXXXXXX"; // optional: replace or remove

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
        "fixed inset-x-0 bottom-0 z-50 md:hidden transition-all",
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 pointer-events-none",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-[#070b1a]/95 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.55)]">
          <a
            href={PHONE_TEL}
            className="py-3 text-center text-sm font-semibold text-white/90 hover:bg-white/10 transition"
          >
            Call
          </a>

          <a
            href="#contact"
            className="py-3 text-center text-sm font-semibold text-slate-900 bg-white hover:bg-white/90 transition"
          >
            Free Audit
          </a>

          <a
            href={SMS_TEL}
            className="py-3 text-center text-sm font-semibold text-white/90 hover:bg-white/10 transition"
          >
            Text
          </a>
        </div>
      </div>
    </div>
  );
}
