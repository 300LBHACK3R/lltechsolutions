export const dynamic = "force-static";
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.businessName,
    short_name: "Cedar House Wellness",
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f0df",
    theme_color: "#0d150d",
    icons: [{ src: "/brand/cedar-mark.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
