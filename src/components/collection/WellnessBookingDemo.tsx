"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import { wellnessTreatments } from "@/data/wellness-content";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function WellnessBookingDemo() {
  const formId = useId();
  const isHydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const [serviceId, setServiceId] = useState<string>(wellnessTreatments[0].id);
  const [duration, setDuration] = useState<number>(wellnessTreatments[0].durations[0]);
  const [review, setReview] = useState("");
  const service =
    wellnessTreatments.find((treatment) => treatment.id === serviceId) ?? wellnessTreatments[0];

  function chooseService(nextServiceId: string) {
    const nextService = wellnessTreatments.find((treatment) => treatment.id === nextServiceId);
    if (!nextService) return;
    setServiceId(nextService.id);
    setDuration(nextService.durations[0]);
    setReview("");
  }

  function reviewBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReview(
      `${service.title} · ${duration} minutes. Preview only — no appointment has been booked or reserved. Nothing has been sent or saved.`,
    );
  }

  return (
    <form
      className="wellness-form"
      data-wellness-booking-demo
      data-wellness-demo-form="booking"
      aria-label="Booking preview"
      aria-describedby={`${formId}-note`}
      onSubmit={reviewBooking}
    >
      <p className="wellness-form-note" id={`${formId}-note`}>
        Explore a service and session length. This preview has no live availability; no appointments
        are booked or reserved, and nothing is sent or saved.
      </p>
      <fieldset className="wellness-form-fields" disabled={!isHydrated}>
        <legend className="sr-only">Preview a service and session length</legend>
        <div className="wellness-field-grid">
          <div className="wellness-field">
            <label htmlFor={`${formId}-service`}>Service</label>
            <select
              id={`${formId}-service`}
              value={serviceId}
              onChange={(event) => chooseService(event.target.value)}
            >
              {wellnessTreatments.map((treatment) => (
                <option key={treatment.id} value={treatment.id}>
                  {treatment.title}
                </option>
              ))}
            </select>
          </div>
          <div className="wellness-field">
            <label htmlFor={`${formId}-duration`}>Session length</label>
            <select
              id={`${formId}-duration`}
              value={duration}
              onChange={(event) => {
                setDuration(Number(event.target.value));
                setReview("");
              }}
            >
              {service.durations.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {minutes} minutes
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="wellness-button wellness-button-light"
          type="submit"
          disabled={!isHydrated}
        >
          Review booking preview
        </button>
      </fieldset>
      <p className="wellness-form-status" role="status" aria-live="polite" aria-atomic="true">
        {review}
      </p>
      <p className="wellness-form-note">
        A live website would connect to your booking provider for availability, appointment requests
        and confirmation.
      </p>
      <noscript>
        <p className="wellness-form-note">Enable JavaScript to try this booking preview.</p>
      </noscript>
    </form>
  );
}
