import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/template-pricing.css";
import "@/styles/professional-templates.css";
import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import MotionControl from "@/components/ui/MotionControl";
import TemplatePrice from "@/components/collection/TemplatePrice";
import {
  collectionInquiryHref,
  professionalTemplate,
  websiteDesigns,
} from "@/data/website-collection";
const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});
const template = professionalTemplate("accounting")!;
const design = websiteDesigns.find((item) => item.id === template.id)!;
export const metadata: Metadata = {
  title: {
    default: `${template.brand} | L&L Website Demo`,
    template: `%s | ${template.brand} Demo`,
  },
  description: template.description,
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the website demo
        </a>
        <div className="professional-demo-bar">
          <a href={`https://lltechsolutions.ca/website-collection/${template.id}`}>
            ← L&L / Template details
          </a>
          <span>
            Website demo · <TemplatePrice price={design.startingPriceCad} compact />
          </span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: template.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main id="main-content" tabIndex={-1} data-professional-demo={template.id}>
          {children}
        </main>
        <div className="professional-demo-disclosure">
          {template.brand} is a fictional business. Illustrative imagery and sample content show the
          design; no professional services or appointments are offered here. This demo does not
          accept or send enquiries.
        </div>
      </body>
    </html>
  );
}
