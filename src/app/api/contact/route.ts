import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  website?: string;
  service?: string;
  timeline?: string;
  message?: string;
  companyWebsite?: string;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const to = process.env.CONTACT_TO_EMAIL;
    const from =
      process.env.CONTACT_FROM_EMAIL ??
      "L&L Tech Solutions <onboarding@resend.dev>";

    if (!process.env.RESEND_API_KEY || !to) {
      return Response.json(
        { message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as ContactPayload;

    if (clean(body.companyWebsite)) {
      return Response.json({ message: "Message received." });
    }

    const name = clean(body.name);
    const email = clean(body.email);
    const business = clean(body.business);
    const phone = clean(body.phone);
    const website = clean(body.website);
    const service = clean(body.service);
    const timeline = clean(body.timeline);
    const message = clean(body.message);

    if (!name || !email || !message) {
      return Response.json(
        { message: "Name, email, and project details are required." },
        { status: 400 },
      );
    }

    if (!isEmail(email)) {
      return Response.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New L&L Tech Solutions Inquiry - ${service || "General"}`,
      text: `
New L&L Tech Solutions inquiry

Name: ${name}
Business: ${business || "Not provided"}
Email: ${email}
Phone: ${phone || "Not provided"}
Website: ${website || "Not provided"}
Service: ${service || "Not selected"}
Timeline: ${timeline || "Not selected"}

Project details:
${message}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { message: "Email failed to send. Please try again." },
        { status: 500 },
      );
    }

    return Response.json({ message: "Request sent successfully." });
  } catch (error) {
    console.error("Contact route error:", error);

    return Response.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
