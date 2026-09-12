import type { MetadataRoute } from "next";
import { publicRoutes, absoluteUrl } from "@/config/site";
import { availableDesigns, designHref } from "@/data/website-collection";
export default function sitemap(): MetadataRoute.Sitemap {
  return [...publicRoutes, ...availableDesigns().map(designHref)].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/contact" ? 0.9 : 0.7,
  }));
}
