"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { sourceLicenseVersion } from "@/data/source-license";
import { formatPriceCad } from "@/data/template-promotion";

export default function SourceCheckout({
  designId,
  priceCad,
}: {
  designId: string;
  priceCad: number;
}) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = new FormData(event.currentTarget);
    if (form.get("licence") !== "accepted") return;
    inFlight.current = true;
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/source-purchases/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designId,
          licenseAccepted: true,
          licenseVersion: sourceLicenseVersion,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result: { url?: string; message?: string } = await response.json();
      if (!response.ok || !result.url)
        throw new Error(result.message ?? "Checkout could not be opened. Please try again.");
      const checkout = new URL(result.url);
      if (checkout.protocol !== "https:" || checkout.hostname !== "checkout.stripe.com")
        throw new Error("Checkout could not be verified. Please contact L&L.");
      window.location.assign(checkout.href);
    } catch (error) {
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "We could not confirm checkout. Please try again or contact L&L.",
      );
      inFlight.current = false;
      setPending(false);
    }
  }

  return (
    <form className="source-checkout" onSubmit={submit} aria-busy={pending}>
      <label className="source-license-check">
        <input type="checkbox" name="licence" value="accepted" required />
        <span>
          I agree to the <a href="#source-license">single-business licence</a> and{" "}
          <Link href="/terms#source-downloads">download terms</Link>. I understand this is a
          source-code download that I configure and launch myself.
        </span>
      </label>
      <button className="button button-gold" type="submit" disabled={pending}>
        {pending ? "Opening secure checkout…" : `Buy code only · ${formatPriceCad(priceCad)}`}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="source-small">
        One payment. Applicable taxes are shown at checkout. Secure payment through Stripe; we do
        not collect your card details on this page.
      </p>
      <p role="status" aria-live="polite" className="source-status">
        {message}
      </p>
      <noscript>
        <p>Enable JavaScript to open secure checkout, or contact L&L to arrange your purchase.</p>
      </noscript>
    </form>
  );
}
