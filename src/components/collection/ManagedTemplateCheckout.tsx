"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import TemplatePrice from "@/components/collection/TemplatePrice";
import { managedFieldLimits, managedTermsVersion } from "@/data/managed-purchase";
import { formatPriceCad, templatePrice, templateSale } from "@/data/template-promotion";
import { useTemplateSale } from "@/lib/use-template-sale";

function requestIdentifier() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function ManagedTemplateCheckout({
  designId,
  name,
  regularPriceCad,
  initialSaleActive,
  inquiryHref,
}: {
  designId: string;
  name: string;
  regularPriceCad: number;
  initialSaleActive: boolean;
  inquiryHref: string;
}) {
  const saleActive = useTemplateSale(initialSaleActive);
  const endsAt = Date.parse(templateSale.endsAt);
  const priceCad = templatePrice(regularPriceCad, saleActive ? endsAt - 1 : endsAt).priceCad!;
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [priceChanged, setPriceChanged] = useState(false);
  const inFlight = useRef(false);
  const attempt = useRef<{ fingerprint: string; requestId: string } | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || priceChanged) return;
    const form = new FormData(event.currentTarget);
    if (form.get("scope") !== "accepted") return;
    const values = Object.fromEntries(
      Object.keys(managedFieldLimits).map((key) => [key, String(form.get(key) ?? "").trim()]),
    );
    const brief = {
      designId,
      ...values,
      mediaHelp: form.get("mediaHelp") === "yes",
      scopeAccepted: true,
      termsVersion: managedTermsVersion,
      expectedPriceCad: priceCad,
    };
    const fingerprint = JSON.stringify(brief);
    inFlight.current = true;
    setPending(true);
    setMessage("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      if (attempt.current?.fingerprint !== fingerprint)
        attempt.current = { fingerprint, requestId: requestIdentifier() };
      const response = await fetch("/api/template-purchases/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...brief, requestId: attempt.current.requestId }),
        signal: controller.signal,
      });
      const result: { url?: string; message?: string } = await response.json();
      if (response.status === 409) {
        setPriceChanged(true);
        throw new Error(
          "The checkout details have changed. Reload this page to review the current offer before paying.",
        );
      }
      if (!response.ok || !result.url)
        throw new Error(
          result.message ?? "Checkout could not be opened. Please try again or contact L&L.",
        );
      const checkout = new URL(result.url);
      if (
        checkout.protocol !== "https:" ||
        checkout.hostname !== "checkout.stripe.com" ||
        checkout.username ||
        checkout.password
      )
        throw new Error("We couldn’t verify the checkout address. Please contact L&L.");
      window.location.assign(checkout.href);
    } catch (error) {
      setMessage(
        error instanceof Error && error.name !== "AbortError"
          ? error.message
          : "Checkout took longer than expected. Your card has not been collected here. Retry to reopen checkout or contact L&L.",
      );
      inFlight.current = false;
      setPending(false);
      window.requestAnimationFrame(() => errorRef.current?.focus());
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <form className="managed-checkout-form" onSubmit={submit} aria-busy={pending}>
      <fieldset disabled={pending}>
        <legend>Your business, in a few details.</legend>
        <p className="managed-checkout-note">
          Tell Tate who the website is for. After verified payment, your order and these details are
          sent to L&L so we can arrange your content handover and confirm the delivery plan. Fields
          marked <span aria-hidden="true">*</span> are required.
        </p>
        <div className="managed-fields">
          <label htmlFor="managed-name">
            Your name <span aria-hidden="true">*</span>
            <input
              id="managed-name"
              name="name"
              autoComplete="name"
              maxLength={managedFieldLimits.name}
              required
            />
          </label>
          <label htmlFor="managed-email">
            Email address <span aria-hidden="true">*</span>
            <input
              id="managed-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={managedFieldLimits.email}
              required
            />
          </label>
          <label htmlFor="managed-business">
            Business name <span aria-hidden="true">*</span>
            <input
              id="managed-business"
              name="businessName"
              autoComplete="organization"
              maxLength={managedFieldLimits.businessName}
              required
            />
          </label>
          <label htmlFor="managed-location">
            City & service area <span aria-hidden="true">*</span>
            <input
              id="managed-location"
              name="location"
              autoComplete="address-level2"
              maxLength={managedFieldLimits.location}
              required
            />
          </label>
          <label htmlFor="managed-phone">
            Phone <span className="managed-optional">Optional</span>
            <input
              id="managed-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={managedFieldLimits.phone}
            />
          </label>
          <label htmlFor="managed-website">
            Current website <span className="managed-optional">Optional</span>
            <input
              id="managed-website"
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={managedFieldLimits.website}
              placeholder="yourbusiness.ca"
            />
          </label>
          <label className="managed-field-wide" htmlFor="managed-services">
            What does your business offer? <span aria-hidden="true">*</span>
            <textarea
              id="managed-services"
              name="services"
              rows={3}
              maxLength={managedFieldLimits.services}
              placeholder="Your main services or products and the customers you serve."
              required
            />
          </label>
          <label className="managed-field-wide" htmlFor="managed-message">
            Anything else you’d like us to know? <span className="managed-optional">Optional</span>
            <textarea
              id="managed-message"
              name="message"
              rows={3}
              maxLength={managedFieldLimits.message}
              aria-describedby="managed-brief-help"
              placeholder="Your preferred colours, content readiness or ideal timing."
            />
          </label>
        </div>
        <p id="managed-brief-help" className="managed-checkout-note">
          Keep this to general business information. After payment, reply to your confirmation email
          to share your photos and final content, or ask for a file-sharing option. Please don’t
          include passwords, payment information or private customer records.
        </p>
        <label className="managed-check">
          <input type="checkbox" name="mediaHelp" value="yes" />
          <span>
            I’m interested in original photography or video.
            <small>Optional, quoted separately. Selecting this adds no charge today.</small>
          </span>
        </label>
        <div className="managed-checkout-total">
          <span>Personalization & launch · {name}</span>
          <TemplatePrice price={regularPriceCad} initialSaleActive={initialSaleActive} />
          <p>
            Today’s base purchase: <strong>{formatPriceCad(priceCad)}</strong> before applicable
            taxes. Stripe shows the final total before you pay.
          </p>
        </div>
        <label className="managed-check managed-scope-check">
          <input type="checkbox" name="scope" value="accepted" required />
          <span>
            I’ve reviewed the listed website scope and contact features, and agree to the{" "}
            <Link
              href="/terms#managed-template-purchases"
              target="_blank"
              rel="noopener noreferrer"
            >
              template purchase terms (opens in a new tab)
            </Link>
            . This buys the listed base personalization and launch scope using my supplied content.
            Extra pages, original photography/video, additional integrations, hosting, domain and
            provider charges, and ongoing care are separate. Any added scope needs a separate quote.
          </span>
        </label>
        <p className="managed-checkout-note">
          Review your details above before continuing. You can review the payment total on Stripe
          and return here without paying. By submitting, you acknowledge our{" "}
          <Link href="/privacy" target="_blank" rel="noopener noreferrer">
            privacy notice (opens in a new tab)
          </Link>
          .
        </p>
        <button className="button button-gold" type="submit" disabled={pending || priceChanged}>
          {pending ? "Opening secure checkout…" : "Continue to secure checkout"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
      {message && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="managed-checkout-error">
          <p>{message}</p>
          {priceChanged && (
            <button type="button" className="text-link" onClick={() => window.location.reload()}>
              Reload the offer ↻
            </button>
          )}
          <Link href={inquiryHref} className="text-link">
            Ask L&L for help ↗
          </Link>
        </div>
      )}
      <p className="managed-checkout-note">
        Need more than the listed scope?{" "}
        <Link href={inquiryHref}>Talk it through before purchasing.</Link>
      </p>
      <noscript>
        <p>Enable JavaScript for secure checkout, or contact L&L to arrange your project.</p>
      </noscript>
    </form>
  );
}
