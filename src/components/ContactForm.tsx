"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

type Need =
  | "Free Tech Audit"
  | "Website improvements"
  | "IT support / repairs"
  | "Cybersecurity check"
  | "AI + automation setup"
  | "Monthly Tech Partner package"
  | "Other";

type Priority = "Today" | "This week" | "This month" | "Just exploring";

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  need: Need;
  priority: Priority;
  message: string;
  honeypot: string;
};

const CONTACT_EMAIL = ["you", "yourdomain.com"].join("@"); // TODO: replace
const FORMSPREE_ACTION = ""; // optional: https://formspree.io/f/xxxxxxx
const USES_FORMSPREE = Boolean(FORMSPREE_ACTION);

const INPUT_CLASS =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/25 focus:bg-white/7 transition";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    business: "",
    email: "",
    phone: "",
    website: "",
    need: "Free Tech Audit",
    priority: "This week",
    message: "",
    honeypot: "",
  });

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `L&L Tech Solutions — ${form.need} (${form.priority})`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\nWebsite: ${form.website}\nNeed: ${form.need}\nPriority: ${form.priority}\n\nDetails:\n${form.message}\n`,
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }, [form]);

  const onChange =
    <K extends keyof FormState>(key: K) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value as FormState[K] }));
    };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_14px_70px_rgba(0,0,0,0.55)]">
      <div className="pointer-events-none absolute -inset-24 opacity-60 blur-3xl">
        <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-fuchsia-500/18" />
        <div className="absolute right-0 top-24 h-60 w-60 rounded-full bg-cyan-400/14" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Get your Free Tech Audit
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Fill this out and I’ll reply with a plan + quote.
            </p>
          </div>

          <span className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            No obligation
          </span>
        </div>

        <form
          action={USES_FORMSPREE ? FORMSPREE_ACTION : undefined}
          method={USES_FORMSPREE ? "POST" : undefined}
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            if (form.honeypot) {
              e.preventDefault();
              return;
            }
            if (!USES_FORMSPREE) e.preventDefault();
          }}
        >
          {/* Honeypot */}
          <label className="hidden" aria-hidden="true">
            <span>Leave this field empty</span>
            <input
              value={form.honeypot}
              onChange={onChange("honeypot")}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/60">
                Your name
              </span>
              <input
                value={form.name}
                onChange={onChange("name")}
                placeholder="Your name"
                className={INPUT_CLASS}
                autoComplete="name"
                required
                minLength={2}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/60">
                Business name
              </span>
              <input
                value={form.business}
                onChange={onChange("business")}
                placeholder="Business / company"
                className={INPUT_CLASS}
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/60">
                Email
              </span>
              <input
                value={form.email}
                onChange={onChange("email")}
                placeholder="you@email.com"
                className={INPUT_CLASS}
                autoComplete="email"
                type="email"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/60">
                Phone (optional)
              </span>
              <input
                value={form.phone}
                onChange={onChange("phone")}
                placeholder="(xxx) xxx-xxxx"
                className={INPUT_CLASS}
                autoComplete="tel"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-white/60">
              Website (optional)
            </span>
            <input
              value={form.website}
              onChange={onChange("website")}
              placeholder="https://example.com"
              className={INPUT_CLASS}
              inputMode="url"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/60">
                What do you need?
              </span>
              <select
                value={form.need}
                onChange={onChange("need")}
                className={INPUT_CLASS}
              >
                <option>Free Tech Audit</option>
                <option>Website improvements</option>
                <option>IT support / repairs</option>
                <option>Cybersecurity check</option>
                <option>AI + automation setup</option>
                <option>Monthly Tech Partner package</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-white/60">
                Priority
              </span>
              <select
                value={form.priority}
                onChange={onChange("priority")}
                className={INPUT_CLASS}
              >
                <option>Today</option>
                <option>This week</option>
                <option>This month</option>
                <option>Just exploring</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-white/60">
              Details
            </span>
            <textarea
              value={form.message}
              onChange={onChange("message")}
              placeholder="Tell me what’s broken / what you want to improve."
              rows={5}
              className={INPUT_CLASS}
              required
              minLength={10}
            />
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/55">
              {USES_FORMSPREE
                ? "Submitting sends directly to your inbox."
                : "No form endpoint set — use the email button (works now)."}
            </p>

            <div className="flex gap-3">
              {USES_FORMSPREE ? (
                <button
                  type="submit"
                  className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-white/90 transition"
                >
                  Send
                </button>
              ) : (
                <a
                  href={mailtoHref}
                  className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-white/90 transition"
                >
                  Email this request
                </a>
              )}

              <a
                href="#packages"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Packages
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
