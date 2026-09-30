import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/food.css";
import "@/styles/food-pizzeria.css";
import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import MotionControl from "@/components/ui/MotionControl";
import {
  collectionInquiryHref,
  designPrice,
  foodTemplate,
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
const template = foodTemplate("pizzeria")!;
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
        <div className="food-demo-bar">
          <a href={`https://lltechsolutions.ca/website-collection/${template.id}`}>
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(design)}</span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: template.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main id="main-content" tabIndex={-1} data-food-demo={template.id}>
          {children}
        </main>
        <div className="food-demo-disclosure">
          {template.brand} is a fictional business. Illustrative imagery, menus, prices and sample
          details show the design; no food service is offered here. Enquiry previews are local only.
          This demo does not send messages, accept orders, take payments or confirm reservations.
          Ask the actual business about ingredients, allergens and dietary requirements.
        </div>
      </body>
    </html>
  );
}
