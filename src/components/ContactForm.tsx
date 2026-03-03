"use client";

import type { ChangeEvent, FormEvent } from "react";
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
  company: string; // honeypot
};

const CONTACT_EMAIL = "LANDLTechSolutions@protonmail.com";
const FORMSPREE_ACTION = "https://formspree.io/f/xwvngkgw";

const INPUT_CLASS =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/25 focus:bg-white/10 transition";

const LABEL_CLASS =
  "mb-2 block text-xs font-semibold tracking-wide text-white/60";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

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
    company: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const [errorMsg, setErrorMsg] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `L&L Tech Solutions — ${form.need} (${form.priority})`,
    );

    const body = encodeURIComponent(
      `
Name: ${form.name}
Business: ${form.business}
Email: ${form.email}
Phone: ${form.phone}
Website: ${form.website}
Need: ${form.need}
Priority: ${form.priority}

Details:
${form.message}
      `.trim(),
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
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value as FormState[K],
      }));
    };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    if (status === "sending") return;

    // Honeypot protection
    if (form.company.trim().length > 0) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, value);
      });

      fd.append(
        "_subject",
        `New Lead: ${form.need} (${form.priority}) — ${form.name}`,
      );

      const res = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        let message = "Failed to send form.";
        try {
          const data = await res.json();
          if (data?.errors?.[0]?.message) {
            message = data.errors[0].message;
          }
        } catch {}
        throw new Error(message);
      }

      setStatus("sent");

      setForm({
        name: "",
        business: "",
        email: "",
        phone: "",
        website: "",
        need: "Free Tech Audit",
        priority: "This week",
        message: "",
        company: "",
      });

      // Auto reset success banner after 6 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 6000);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(
        err?.message ||
          "Network blocked. If using an adblocker, allow formspree.io.",
      );
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_14px_70px_rgba(0,0,0,0.55)]">
      <div className="pointer-events-none absolute -inset-24 opacity-60 blur-3xl">
        <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-fuchsia-500/18" />
        <div className="absolute right-0 top-24 h-60 w-60 rounded-full bg-cyan-400/14" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Get your Free Tech Audit
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Fill this out and I’ll reply with a plan + quote.
            </p>
          </div>

          <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            No obligation
          </span>
        </div>

        {status === "sent" && (
          <div className="mt-5 animate-fadeIn rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            ✅ Message sent. I’ll reply shortly.
          </div>
        )}

        {status === "error" && (
          <div className="mt-5 animate-fadeIn rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            ⚠️ {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          action={FORMSPREE_ACTION}
          method="POST"
          className="mt-6 grid gap-4"
        >
          {/* Honeypot */}
          <label className="absolute left-[-9999px] opacity-0 pointer-events-none">
            <input
              name="company"
              value={form.company}
              onChange={onChange("company")}
              autoComplete="off"
              tabIndex={-1}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className={LABEL_CLASS}>Your name</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange("name")}
                className={INPUT_CLASS}
                required
              />
            </label>

            <label>
              <span className={LABEL_CLASS}>Business name</span>
              <input
                name="business"
                value={form.business}
                onChange={onChange("business")}
                className={INPUT_CLASS}
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className={LABEL_CLASS}>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange("email")}
                className={INPUT_CLASS}
                required
              />
            </label>

            <label>
              <span className={LABEL_CLASS}>Phone (optional)</span>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange("phone")}
                className={INPUT_CLASS}
              />
            </label>
          </div>

          <label>
            <span className={LABEL_CLASS}>Website (optional)</span>
            <input
              name="website"
              value={form.website}
              onChange={onChange("website")}
              className={INPUT_CLASS}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className={LABEL_CLASS}>What do you need?</span>
              <select
                name="need"
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

            <label>
              <span className={LABEL_CLASS}>Priority</span>
              <select
                name="priority"
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

          <label>
            <span className={LABEL_CLASS}>Details</span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange("message")}
              rows={5}
              className={INPUT_CLASS}
              required
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className={cx(
                "rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition",
                status === "sending"
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-white/90",
              )}
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>

            <a
              href={mailtoHref}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Packages
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
