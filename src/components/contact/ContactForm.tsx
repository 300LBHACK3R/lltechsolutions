"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { fieldLimits, serviceOptions, timelineOptions } from "@/lib/contact-validation";

export default function ContactForm({ initialService = "" }: { initialService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const pending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });
      const data: { message?: string } = await response.json();
      if (!response.ok)
        throw new Error(
          data.message ?? "Your inquiry could not be sent. Please try again or email us directly.",
        );
      setStatus("sent");
      setMessage(data.message ?? "Your inquiry has been sent.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "We could not confirm delivery. Your details are still here. Please email us or try again shortly.",
      );
    } finally {
      pending.current = false;
    }
  }
  return (
    <form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
      <h2>Tell us about your project.</h2>
      <p className="form-intro">
        A few details are enough to get started. Fields marked * are required.
      </p>
      <div hidden aria-hidden="true">
        <label>
          Leave this field empty
          <input
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            maxLength={fieldLimits.companyWebsite}
          />
        </label>
      </div>
      <div className="form-fields">
        <label>
          Your name *<input name="name" required autoComplete="name" maxLength={fieldLimits.name} />
        </label>
        <label>
          Business name
          <input name="business" autoComplete="organization" maxLength={fieldLimits.business} />
        </label>
        <label>
          Email *
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={fieldLimits.email}
          />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" maxLength={fieldLimits.phone} />
        </label>
        <label className="field-full">
          Current website
          <input
            name="website"
            inputMode="url"
            autoComplete="url"
            placeholder="example.ca"
            maxLength={fieldLimits.website}
          />
        </label>
        <label>
          What do you need? *
          <select name="service" defaultValue={initialService} required>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Timeline *
          <select name="timeline" defaultValue="Flexible / planning ahead" required>
            {timelineOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="field-full">
          Project details *
          <textarea
            name="message"
            required
            maxLength={fieldLimits.message}
            placeholder="What does your business need, and what would a successful project help you do?"
          />
        </label>
      </div>
      <div className="form-footer">
        <p>
          We use these details to respond to your inquiry.{" "}
          <Link href="/privacy">Privacy policy</Link>
        </p>
        <button type="submit" className="button button-gold" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Inquiry"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p
        className={`form-message ${status === "error" ? "error" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </p>
    </form>
  );
}
