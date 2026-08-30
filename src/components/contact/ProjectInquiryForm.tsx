"use client";

import Reveal from "@/components/ui/Reveal";
import StudioMark from "@/components/ui/StudioMark";
import { siteConfig } from "@/config/site";
import {
  initialContactForm,
  serviceOptions,
  timelineOptions,
  type ContactFormState,
} from "@/data/contact";
import Link from "next/link";
import {
  useState,
  type FormEvent,
  type HTMLAttributes,
  type HTMLInputTypeAttribute,
} from "react";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

const informationChecklist = [
  "Business name, industry, and primary service area",
  "Current website or social profiles, when available",
  "What you need designed, developed, or managed",
  "Required functionality, platforms, and integrations",
  "Timeline, content requirements, audience, and priorities",
] as const;

const scopeNotes = [
  {
    title: "A clear recommendation",
    text: "We review the request and identify the strongest website, software, or social-management starting point.",
  },
  {
    title: "A defined scope",
    text: "Design, development, integrations, content, and ongoing management are quoted against the actual requirements.",
  },
  {
    title: "Continuity after launch",
    text: "The relationship can continue through updates, product development, content, reporting, and ongoing digital management.",
  },
] as const;

export default function ProjectInquiryForm() {
  const [form, setForm] = useState<ContactFormState>(initialContactForm);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [notice, setNotice] = useState("");

  function updateField<Name extends keyof ContactFormState>(
    name: Name,
    value: ContactFormState[Name],
  ) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    setStatus("loading");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "The request could not be sent.");
      }

      setStatus("success");
      setNotice(
        result.message ||
          "Your project request was sent. We will review it and reply with the clearest next step.",
      );
      setForm(initialContactForm);
    } catch (error) {
      setStatus("error");
      setNotice(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section className="section-ivory relative overflow-hidden py-20 md:py-28">
      <div className="ivory-blue-orb ivory-blue-orb-left" />
      <div className="ivory-gold-orb" />

      <div className="container-premium relative z-10">
        <div className="grid gap-7 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal delayMs={80}>
            <form
              onSubmit={handleSubmit}
              className="corporate-form-panel"
            >
              <input
                type="text"
                name="companyWebsite"
                tabIndex={-1}
                autoComplete="off"
                value={form.companyWebsite}
                onChange={(event) =>
                  updateField("companyWebsite", event.target.value)
                }
                className="absolute -left-[10000px] h-px w-px overflow-hidden"
                aria-hidden="true"
              />

              <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-start">
                <div>
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#9b762c]">
                    Project Review
                  </p>

                  <h2 className="font-editorial mt-3 text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#10243a] md:text-5xl">
                    Start with the right scope.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#31465e]/62">
                    Share the context once. We will review the opportunity and
                    reply with the most practical path forward.
                  </p>
                </div>

                <span className="rounded-full bg-[#2f6fbb] px-4 py-2 text-[0.6rem] font-black uppercase tracking-[0.16em] text-white">
                  No obligation
                </span>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field
                  label="Your name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  maxLength={100}
                  required
                  onChange={(value) => updateField("name", value)}
                />
                <Field
                  label="Business name"
                  name="business"
                  autoComplete="organization"
                  value={form.business}
                  maxLength={120}
                  onChange={(value) => updateField("business", value)}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  maxLength={254}
                  required
                  onChange={(value) => updateField("email", value)}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  maxLength={40}
                  onChange={(value) => updateField("phone", value)}
                />
                <Field
                  label="Current website or profile (optional)"
                  name="website"
                  type="text"
                  autoComplete="url"
                  inputMode="url"
                  value={form.website}
                  maxLength={300}
                  onChange={(value) => updateField("website", value)}
                />
                <SelectField
                  label="What do you need?"
                  name="service"
                  value={form.service}
                  options={serviceOptions}
                  onChange={(value) => updateField("service", value)}
                />
                <SelectField
                  label="Preferred timeline"
                  name="timeline"
                  value={form.timeline}
                  options={timelineOptions}
                  onChange={(value) => updateField("timeline", value)}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="project-message" className="corporate-field-label">
                  Project details
                </label>

                <textarea
                  id="project-message"
                  name="message"
                  rows={7}
                  required
                  minLength={20}
                  maxLength={5000}
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Tell us about the business, audience, current challenge, required pages or features, content needs, and what the finished result should accomplish."
                  className="corporate-form-textarea"
                />
                <p className="mt-2 text-right text-xs text-[#31465e]/42">
                  {form.message.length.toLocaleString()} / 5,000
                </p>
              </div>

              <p className="mt-5 text-xs leading-6 text-[#31465e]/48">
                By sending this form, you agree that L&amp;L Tech Solutions may
                use the information provided to review and respond to your
                inquiry. See the{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  privacy notice
                </Link>
                .
              </p>

              <div
                aria-live="polite"
                aria-atomic="true"
                className={notice ? "mt-5" : "sr-only"}
              >
                {notice ? (
                  <div
                    className={[
                      "rounded-xl border px-4 py-3 text-sm",
                      status === "success"
                        ? "border-emerald-700/18 bg-emerald-600/[0.08] text-emerald-800"
                        : "border-red-700/18 bg-red-600/[0.08] text-red-800",
                    ].join(" ")}
                  >
                    {notice}
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link href="/projects" className="btn-dark-outline">
                  View Our Work
                </Link>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-blue disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Send Project Request"}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delayMs={150}>
            <aside className="contact-side-panel">
              <div className="h-1 bg-[linear-gradient(90deg,#2f6fbb,#f3f7fb,#2f6fbb)]" />

              <div className="p-7 md:p-9">
                <StudioMark inverse />

                <h2 className="font-editorial mt-9 text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-5xl">
                  Give us enough context
                  <span className="block italic text-[#e4c77f]">
                    to make the first reply useful.
                  </span>
                </h2>

                <ul className="mt-8 grid gap-4">
                  {informationChecklist.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 border-t border-white/[0.07] pt-4 text-sm leading-7 text-white/58"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2f6fbb]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 grid gap-4">
                  {scopeNotes.map((note) => (
                    <div key={note.title} className="contact-trust-card">
                      <p className="text-[0.62rem] font-black uppercase tracking-[0.17em] text-[#e4c77f]">
                        {note.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/52">
                        {note.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-9 border-t border-white/[0.08] pt-7">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/34">
                    Direct contact
                  </p>

                  <a
                    href={siteConfig.phone.href}
                    className="mt-3 block text-2xl font-black tracking-[-0.03em] text-white"
                  >
                    {siteConfig.phone.display}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-3 block break-all text-sm text-white/46 transition hover:text-[#e4c77f]"
                  >
                    {siteConfig.email}
                  </a>

                  <p className="mt-4 text-sm leading-7 text-white/42">
                    Calgary-based, with website, software, and digital-management
                    services available across Canada.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: keyof ContactFormState;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  value: string;
  required?: boolean;
  maxLength: number;
  onChange: (value: string) => void;
};

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  value,
  required = false,
  maxLength,
  onChange,
}: FieldProps) {
  const id = `field-${name}`;

  return (
    <label htmlFor={id} className="block">
      <span className="corporate-field-label">{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        required={required}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="corporate-form-field"
      />
    </label>
  );
}

type SelectFieldProps<Option extends string> = {
  label: string;
  name: string;
  value: Option;
  options: readonly Option[];
  onChange: (value: Option) => void;
};

function SelectField<Option extends string>({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps<Option>) {
  const id = `field-${name}`;

  return (
    <label htmlFor={id} className="block">
      <span className="corporate-field-label">{label}</span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value as Option)}
        className="corporate-form-select"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
