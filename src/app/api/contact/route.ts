import { serviceOptions, timelineOptions } from "@/data/contact";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map<string, number[]>();
const allowedServices = new Set<string>(serviceOptions);
const allowedTimelines = new Set<string>(timelineOptions);

type ContactPayload = {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  service?: unknown;
  timeline?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
};

type ValidatedContact = {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  timeline: string;
  message: string;
};

function jsonResponse(
  requestId: string,
  message: string,
  status = 200,
  extraHeaders: HeadersInit = {},
) {
  return Response.json(
    { message, requestId },
    {
      status,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Request-ID": requestId,
        ...extraHeaders,
      },
    },
  );
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeWebAddress(value: string) {
  if (!value) {
    return "";
  }

  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
    ? value
    : `https://${value}`;

  try {
    const url = new URL(candidate);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function requestIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (rateLimitStore.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(key, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(key, recent);

  if (rateLimitStore.size > 1_000) {
    for (const [storedKey, timestamps] of rateLimitStore) {
      const active = timestamps.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
      );

      if (active.length === 0) {
        rateLimitStore.delete(storedKey);
      } else {
        rateLimitStore.set(storedKey, active);
      }
    }
  }

  return false;
}

function originIsAllowed(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");

  if (
    fetchSite &&
    !["same-origin", "same-site", "none"].includes(fetchSite)
  ) {
    return false;
  }

  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  const allowedOrigins = new Set([
    "https://lltechsolutions.ca",
    "https://www.lltechsolutions.ca",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);

  if (process.env.VERCEL_URL) {
    allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }

  return allowedOrigins.has(origin);
}

type ValidationResult =
  | { ok: true; data: ValidatedContact }
  | { ok: false; error: string };

function validatePayload(payload: ContactPayload): ValidationResult {
  const data: ValidatedContact = {
    name: cleanText(payload.name, 100),
    business: cleanText(payload.business, 120),
    email: cleanText(payload.email, 254).toLowerCase(),
    phone: cleanText(payload.phone, 40),
    website: cleanText(payload.website, 300),
    service: cleanText(payload.service, 100),
    timeline: cleanText(payload.timeline, 100),
    message: cleanText(payload.message, 5_000),
  };

  if (!data.name || !data.email || !data.message) {
    return { ok: false, error: "Name, email, and project details are required." };
  }

  if (data.name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }

  if (!isEmail(data.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (data.message.length < 20) {
    return {
      ok: false,
      error: "Please include a little more detail about the project.",
    };
  }

  const normalizedWebsite = normalizeWebAddress(data.website);

  if (normalizedWebsite === null) {
    return { ok: false, error: "Please enter a valid website or social-profile address." };
  }

  data.website = normalizedWebsite;

  if (!allowedServices.has(data.service)) {
    return { ok: false, error: "Please select a valid service." };
  }

  if (!allowedTimelines.has(data.timeline)) {
    return { ok: false, error: "Please select a valid timeline." };
  }

  return { ok: true, data };
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  try {
    if (!originIsAllowed(request)) {
      return jsonResponse(requestId, "This request was not accepted.", 403);
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().startsWith("application/json")) {
      return jsonResponse(requestId, "Expected a JSON request.", 415);
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");

    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return jsonResponse(requestId, "The request is too large.", 413);
    }

    const ip = requestIp(request);

    if (isRateLimited(ip)) {
      return jsonResponse(
        requestId,
        "Too many requests were submitted. Please wait a few minutes and try again.",
        429,
        { "Retry-After": "600" },
      );
    }

    let payload: ContactPayload;

    try {
      const rawBody = await request.text();

      if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
        return jsonResponse(requestId, "The request is too large.", 413);
      }

      payload = JSON.parse(rawBody) as ContactPayload;
    } catch {
      return jsonResponse(requestId, "The request body was not valid JSON.", 400);
    }

    // Honeypot submissions receive a neutral success response.
    if (cleanText(payload.companyWebsite, 200)) {
      return jsonResponse(requestId, "Your project request was received.");
    }

    const validation = validatePayload(payload);

    if (!validation.ok) {
      return jsonResponse(requestId, validation.error, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from =
      process.env.CONTACT_FROM_EMAIL ??
      (process.env.NODE_ENV === "development"
        ? "L&L Tech Solutions <onboarding@resend.dev>"
        : "");

    if (!apiKey || !to || !from) {
      return jsonResponse(
        requestId,
        "The contact service is temporarily unavailable. Please call or email L&L Tech Solutions directly.",
        503,
      );
    }

    const data = validation.data;
    const subjectService = data.service.replace(/[\r\n]/g, " ");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New L&L inquiry — ${subjectService}`,
      text: [
        "New L&L Tech Solutions project inquiry",
        "",
        `Request ID: ${requestId}`,
        `Name: ${data.name}`,
        `Business: ${data.business || "Not provided"}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Website / profile: ${data.website || "Not provided"}`,
        `Service: ${data.service}`,
        `Timeline: ${data.timeline}`,
        "",
        "Project details:",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Contact delivery failed", {
        requestId,
        code: error.name,
      });

      return jsonResponse(
        requestId,
        "The request could not be delivered. Please call or email L&L Tech Solutions directly.",
        502,
      );
    }

    return jsonResponse(
      requestId,
      "Your project request was sent. We will review it and reply with the clearest next step.",
    );
  } catch (error) {
    console.error("Contact request failed", {
      requestId,
      error: error instanceof Error ? error.name : "UnknownError",
    });

    return jsonResponse(
      requestId,
      "Something went wrong while sending the request. Please try again or contact L&L Tech Solutions directly.",
      500,
    );
  }
}
