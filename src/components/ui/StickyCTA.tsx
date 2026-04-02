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
    const onScroll = () => {
      setShow(window.scrollY > 180);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 md:hidden transition-all duration-300 ease-out",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="mx-auto max-w-md px-4 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="overflow-hidden rounded-[1.15rem] border border-[rgba(212,175,55,0.16)] bg-[rgba(8,8,8,0.92)] shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(8,8,8,0.78)]">
          <div className="grid grid-cols-3">
            <a
              href={PHONE_TEL}
              aria-label="Call L and L Tech Solutions"
              className="flex h-14 items-center justify-center border-r border-[rgba(212,175,55,0.12)] text-[0.92rem] font-semibold tracking-[0.01em] text-white/88 transition hover:bg-[rgba(212,175,55,0.06)] hover:text-[#f5d77a] active:scale-[0.985]"
            >
              Call
            </a>

            <a
              href="#contact"
              aria-label="Go to free audit section"
              className="flex h-14 items-center justify-center bg-[linear-gradient(180deg,#f5d77a_0%,#d4af37_58%,#b88f23_100%)] px-3 text-center text-[0.92rem] font-bold tracking-[0.01em] text-[#090909] shadow-[inset_0_1px_0_rgba(255,255,255,0.32)] transition hover:brightness-105 active:scale-[0.985]"
            >
              Free Audit
            </a>

            <a
              href={SMS_TEL}
              aria-label="Text L and L Tech Solutions"
              className="flex h-14 items-center justify-center border-l border-[rgba(212,175,55,0.12)] text-[0.92rem] font-semibold tracking-[0.01em] text-white/88 transition hover:bg-[rgba(212,175,55,0.06)] hover:text-[#f5d77a] active:scale-[0.985]"
            >
              Text
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
