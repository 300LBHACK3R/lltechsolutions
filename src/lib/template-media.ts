import detailingDemo from "@/data/mobile-detailing-demo.json";
import floristDemo from "@/data/flower-shop-demo.json";
import autoRepairDemo from "@/data/auto-repair-demo.json";
import streetwearDemo from "@/data/streetwear-store-demo.json";
import wheelStudioDemo from "@/data/wheel-studio-demo.json";
import jewelleryDemo from "@/data/jewellery-atelier-demo.json";
import foodTruckDemo from "@/data/food-truck-demo.json";
import neighbourhoodCafeDemo from "@/data/neighbourhood-cafe-demo.json";
import artisanBakeryDemo from "@/data/artisan-bakery-demo.json";
import pizzeriaDemo from "@/data/pizzeria-demo.json";
import cateringEventsDemo from "@/data/catering-events-demo.json";
import fineDiningDemo from "@/data/fine-dining-demo.json";
import homeCleaningDemo from "@/data/home-cleaning-demo.json";
import windowCareDemo from "@/data/window-care-demo.json";
import homeOrganizingDemo from "@/data/home-organizing-demo.json";
import interiorStudioDemo from "@/data/interior-studio-demo.json";
import propertyManagementDemo from "@/data/property-management-demo.json";
import realEstateDemo from "@/data/real-estate-demo.json";
import courierDemo from "@/data/courier-one-page-demo.json";
import movingDemo from "@/data/moving-company-demo.json";
import autoTransportDemo from "@/data/auto-transport-demo.json";
import equipmentRentalsDemo from "@/data/equipment-rentals-demo.json";
import coldChainDemo from "@/data/cold-chain-demo.json";
import freightDemo from "@/data/freight-logistics-demo.json";
import averyDemo from "@/data/consultant-one-page-demo.json";
import tallyDemo from "@/data/bookkeeping-demo.json";
import northlineDemo from "@/data/accounting-demo.json";
import offscriptDemo from "@/data/creative-consultancy-demo.json";
import valeDemo from "@/data/boutique-law-demo.json";
import axiomDemo from "@/data/corporate-law-demo.json";
import paintingDemo from "@/data/painting-demo.json";
import plumbingDemo from "@/data/plumbing-demo.json";
import earthworksDemo from "@/data/earthworks-demo.json";
import lawncareDemo from "@/data/lawncare-demo.json";
import horizonDemo from "@/data/horizon-demo.json";
import beautyDemo from "@/data/beauty-demo.json";
import massageOnePageDemo from "@/data/massage-one-page-demo.json";
import medicalSpaDemo from "@/data/medical-spa-demo.json";
import artsyNailDemo from "@/data/artsy-nail-demo.json";
import hairSalonDemo from "@/data/hair-salon-demo.json";
import hairOnePageDemo from "@/data/hair-one-page-demo.json";
import { projects } from "@/data/projects";
import type { WebsiteDesign } from "@/data/website-collection";
import { readTemplateShowcase } from "@/lib/template-showcase";

/** One deployment/screenshot registry for cards, comparisons and detail pages. */
const showcaseSources = {
  "mobile-detailing": detailingDemo,
  "flower-shop": floristDemo,
  "auto-repair": autoRepairDemo,
  "streetwear-store": streetwearDemo,
  "wheel-studio": wheelStudioDemo,
  "jewellery-atelier": jewelleryDemo,
  "food-truck": foodTruckDemo,
  "neighbourhood-cafe": neighbourhoodCafeDemo,
  "artisan-bakery": artisanBakeryDemo,
  pizzeria: pizzeriaDemo,
  "catering-events": cateringEventsDemo,
  "fine-dining": fineDiningDemo,
  "home-cleaning": homeCleaningDemo,
  "window-care": windowCareDemo,
  "home-organizing": homeOrganizingDemo,
  "interior-studio": interiorStudioDemo,
  "property-management": propertyManagementDemo,
  "real-estate": realEstateDemo,
  "courier-one-page": courierDemo,
  "moving-company": movingDemo,
  "auto-transport": autoTransportDemo,
  "equipment-rentals": equipmentRentalsDemo,
  "cold-chain": coldChainDemo,
  "freight-logistics": freightDemo,
  "consultant-one-page": averyDemo,
  bookkeeping: tallyDemo,
  accounting: northlineDemo,
  "creative-consultancy": offscriptDemo,
  "boutique-law": valeDemo,
  "corporate-law": axiomDemo,
  pigment: paintingDemo,
  structure: plumbingDemo,
  earthworks: earthworksDemo,
  lawncare: lawncareDemo,
  horizon: horizonDemo,
  still: beautyDemo,
  "massage-one-page": massageOnePageDemo,
  "medical-spa": medicalSpaDemo,
  "artsy-nails": artsyNailDemo,
  "hair-salon": hairSalonDemo,
  "hair-one-page": hairOnePageDemo,
} as const;

export function templateShowcaseFor(designId: string) {
  if (!Object.prototype.hasOwnProperty.call(showcaseSources, designId)) return null;
  const id = designId as keyof typeof showcaseSources;
  return readTemplateShowcase(showcaseSources[id], id);
}

export function templateLiveDemoUrl(design: WebsiteDesign): string | null {
  const configured = templateShowcaseFor(design.id)?.url;
  if (configured) return configured;
  const client = projects.find(
    (project) => project.id === design.clientProjectId && project.ownership === "client",
  );
  const candidate = client?.liveUrl ?? (!design.concept ? design.demoUrl : null);
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
