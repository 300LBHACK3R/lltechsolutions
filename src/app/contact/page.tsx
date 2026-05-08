import ContactSection from "@/components/home/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | L&L Tech Solutions",
  description:
    "Contact L&L Tech Solutions for websites, SEO, infrastructure, networking, business tech support, and technical systems.",
};

export default function ContactPage() {
  return <ContactSection />;
}
