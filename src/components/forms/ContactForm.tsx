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
  company: string;
};

const CONTACT_EMAIL = "LANDLTechSolutions@protonmail.com";
const FORMSPREE_ACTION = "https://formspree.io/f/xwvngkgw";

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

  const subjectLine = useMemo(() => {
    const n = form.name?.trim() || "Unknown";
    return `New Lead — ${form.need} (${form.priority}) — ${n}`;
  }, [form.name, form.need, form.priority]);

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
      setForm((prev) => ({ ...prev, [key]: e.target.value as FormState[K] }));
    };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    if (form.company.trim()) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, value);
      });

      fd.append("_subject", subjectLine);
      if (form.email.trim()) fd.append("_replyto", form.email.trim());

      const res = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Failed to send form.");

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

      setTimeout(() => setStatus("idle"), 6000);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(
        err?.message || "Network blocked. Allow formspree.io and try again.",
      );
    }
  }

  return (
    <div className="card-premium p-6 md:p-8">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            Get Your Free Tech Audit
          </h3>
          <p className="mt-1 text-sm text-muted">
            Fill this out and I’ll send a clear plan + quote.
          </p>
        </div>

        <span className="badge-gold hidden sm:inline-flex">No obligation</span>
      </div>

      {/* STATUS */}
      {status === "sent" && (
        <div className="mt-5 rounded-xl border border-[rgba(212,175,55,0.25)] bg-[rgba(212,175,55,0.08)] px-4 py-3 text-sm text-[#f5d77a]">
          ✅ Message sent. I’ll reply shortly.
        </div>
      )}

      {status === "error" && (
        <div className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <input type="hidden" name="_subject" value={subjectLine} />
        <input type="hidden" name="_replyto" value={form.email} />

        {/* Honeypot */}
        <input
          name="company"
          value={form.company}
          onChange={onChange("company")}
          className="hidden"
          autoComplete="off"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Your name"
            value={form.name}
            onChange={onChange("name")}
            className="input-premium"
            required
          />

          <input
            placeholder="Business name"
            value={form.business}
            onChange={onChange("business")}
            className="input-premium"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange("email")}
            className="input-premium"
            required
          />

          <input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={onChange("phone")}
            className="input-premium"
          />
        </div>

        <input
          placeholder="Website (optional)"
          value={form.website}
          onChange={onChange("website")}
          className="input-premium"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <select
            value={form.need}
            onChange={onChange("need")}
            className="select-premium"
          >
            <option>Free Tech Audit</option>
            <option>Website improvements</option>
            <option>IT support / repairs</option>
            <option>Cybersecurity check</option>
            <option>AI + automation setup</option>
            <option>Monthly Tech Partner package</option>
            <option>Other</option>
          </select>

          <select
            value={form.priority}
            onChange={onChange("priority")}
            className="select-premium"
          >
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
            <option>Just exploring</option>
          </select>
        </div>

        <textarea
          placeholder="Tell me what you need..."
          value={form.message}
          onChange={onChange("message")}
          className="textarea-premium"
          required
        />

        {/* CTA */}
        <div className="flex justify-end gap-3 pt-2">
          <a href={mailtoHref} className="btn-ghost-gold">
            View Packages
          </a>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-gold"
          >
            {status === "sending" ? "Sending..." : "Send Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
