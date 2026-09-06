import { Resend } from "resend";
import { randomUUID } from "node:crypto";
import { validateContact } from "@/lib/contact-validation";
import { hasTrustedOrigin, isRateLimited, readLimitedJson } from "@/lib/contact-security";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const requestId = randomUUID();
  const respond = (message: string, status = 200) =>
    Response.json(
      { message, requestId },
      {
        status,
        headers: {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
          "X-Request-ID": requestId,
          ...(status === 429 ? { "Retry-After": "600" } : {}),
        },
      },
    );
  if (!hasTrustedOrigin(request))
    return respond("This request could not be verified. Please use the website contact form.", 403);
  if (
    request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json"
  )
    return respond("Please send a JSON request.", 415);
  if (isRateLimited(request))
    return respond(
      "Too many requests. Please try again in a few minutes or email us directly.",
      429,
    );
  let input: unknown;
  try {
    input = await readLimitedJson(request);
  } catch (error) {
    return respond(
      error instanceof RangeError ? "Your inquiry is too large." : "Please send a valid inquiry.",
      error instanceof RangeError ? 413 : 400,
    );
  }
  const parsed = validateContact(input);
  if (!parsed.ok) return respond(parsed.message, 400);
  if (parsed.spam) return respond("Request received.");
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.warn("contact_unconfigured", { requestId });
    return respond(
      "The inquiry form is temporarily unavailable. Please email or call us directly.",
      503,
    );
  }
  const { value } = parsed;
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: value.email,
      subject: `L&L project inquiry — ${value.service}`,
      text: Object.entries(value)
        .filter(([key]) => key !== "companyWebsite")
        .map(([key, text]) => `${key}: ${text || "Not provided"}`)
        .join("\n\n"),
    });
    if (error) throw new Error("Email provider rejected request");
    return respond("Your inquiry has been sent. Thank you — we’ll reply with the next step.");
  } catch {
    console.error("contact_delivery_failed", { requestId });
    return respond(
      "Your inquiry could not be sent. Your details are still in the form. Please try again or email us directly.",
      502,
    );
  }
}
