"use client";

import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";

type EnquiryField = "name" | "email" | "topic" | "message";
type EnquiryValues = Record<EnquiryField, string>;
type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const emptyValues: EnquiryValues = { name: "", email: "", topic: "", message: "" };
const fieldOrder: EnquiryField[] = ["name", "email", "topic", "message"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function WellnessEnquiryDemo() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const isHydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const [values, setValues] = useState<EnquiryValues>(emptyValues);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState("");

  function updateField(field: EnquiryField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
  }

  function previewEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: EnquiryErrors = {};

    if (!values.name.trim()) nextErrors.name = "Enter a sample name.";
    if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = "Enter a valid sample email, such as alex@example.com.";
    }
    if (!values.topic) nextErrors.topic = "Choose a topic for your sample enquiry.";
    if (!values.message.trim()) nextErrors.message = "Add a short sample message.";

    setErrors(nextErrors);
    const firstError = fieldOrder.find((field) => nextErrors[field]);

    if (firstError) {
      setStatus(
        "Check the highlighted fields. This is a preview only; nothing has been sent or saved.",
      );
      formRef.current?.querySelector<HTMLElement>(`[data-enquiry-field="${firstError}"]`)?.focus();
      return;
    }

    setStatus(
      "Preview only — your sample enquiry is ready to review. Nothing has been sent or saved.",
    );
  }

  return (
    <form
      ref={formRef}
      className="wellness-form"
      data-wellness-enquiry-demo
      data-wellness-demo-form="enquiry"
      aria-label="Sample enquiry preview"
      aria-describedby={`${formId}-note`}
      noValidate
      onSubmit={previewEnquiry}
    >
      <p className="wellness-form-note" id={`${formId}-note`}>
        Try this form with sample details. Nothing is sent or saved. Please leave out personal
        health information.
      </p>
      <fieldset className="wellness-form-fields" disabled={!isHydrated}>
        <legend className="sr-only">Sample enquiry details</legend>
        <div className="wellness-field-grid">
          <div className="wellness-field">
            <label htmlFor={`${formId}-name`}>Your name</label>
            <input
              id={`${formId}-name`}
              data-enquiry-field="name"
              type="text"
              autoComplete="off"
              placeholder="Alex Morgan"
              maxLength={100}
              required
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            />
            {errors.name ? (
              <p className="wellness-field-error" id={`${formId}-name-error`}>
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="wellness-field">
            <label htmlFor={`${formId}-email`}>Email address</label>
            <input
              id={`${formId}-email`}
              data-enquiry-field="email"
              type="email"
              autoComplete="off"
              inputMode="email"
              placeholder="alex@example.com"
              maxLength={254}
              required
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            />
            {errors.email ? (
              <p className="wellness-field-error" id={`${formId}-email-error`}>
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>
        <div className="wellness-field">
          <label htmlFor={`${formId}-topic`}>What would you like to know?</label>
          <select
            id={`${formId}-topic`}
            data-enquiry-field="topic"
            required
            value={values.topic}
            onChange={(event) => updateField("topic", event.target.value)}
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? `${formId}-topic-error` : undefined}
          >
            <option value="">Choose a topic</option>
            <option value="services">Services and session lengths</option>
            <option value="first-visit">Planning a first visit</option>
            <option value="general">A general question</option>
          </select>
          {errors.topic ? (
            <p className="wellness-field-error" id={`${formId}-topic-error`}>
              {errors.topic}
            </p>
          ) : null}
        </div>
        <div className="wellness-field">
          <label htmlFor={`${formId}-message`}>Your message</label>
          <textarea
            id={`${formId}-message`}
            data-enquiry-field="message"
            placeholder="I’d like to learn more about the different session lengths."
            rows={4}
            maxLength={1000}
            required
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={`${formId}-note${errors.message ? ` ${formId}-message-error` : ""}`}
          />
          {errors.message ? (
            <p className="wellness-field-error" id={`${formId}-message-error`}>
              {errors.message}
            </p>
          ) : null}
        </div>
        <button className="wellness-button" type="submit" disabled={!isHydrated}>
          Preview enquiry
        </button>
      </fieldset>
      <p className="wellness-form-status" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
      <noscript>
        <p className="wellness-form-note">
          Enable JavaScript to try this preview. Nothing is sent.
        </p>
      </noscript>
    </form>
  );
}
