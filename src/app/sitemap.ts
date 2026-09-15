import type { MetadataRoute } from "next";
import { publicRoutes, absoluteUrl } from "@/config/site";
import {
  availableDesigns,
  designHref,
  categoryDesigns,
  categoryHref,
  templateCategories,
} from "@/data/website-collection";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicRoutes,
    ...availableDesigns().map(designHref),
    ...templateCategories
      .filter((category) => categoryDesigns(category).length > 0)
      .map(categoryHref),
  ].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/contact" ? 0.9 : 0.7,
  }));
}
