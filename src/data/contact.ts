export const serviceOptions = [
  "Website Design & Development",
  "Software Design & Development",
  "Social Media Management",
  "Not Sure — Project Consultation",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 2 weeks",
  "This month",
  "Within 2–3 months",
  "Flexible / planning ahead",
] as const;

export type ContactFormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  service: (typeof serviceOptions)[number];
  timeline: (typeof timelineOptions)[number];
  message: string;
  companyWebsite: string;
};

export const initialContactForm: ContactFormState = {
  name: "",
  business: "",
  email: "",
  phone: "",
  website: "",
  service: "Website Design & Development",
  timeline: "This month",
  message: "",
  companyWebsite: "",
};
