import { projects, projectPath } from "@/data/projects";
import type { MetadataRoute } from "next";
import { publicRoutes, absoluteUrl } from "@/config/site";
import { sourceProducts, sourceHref } from "@/data/source-products";
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
    ...projects.map(projectPath),
    ...availableDesigns().map(designHref),
    ...sourceProducts.map((product) => sourceHref(product.designId)),
    ...templateCategories
      .filter((category) => categoryDesigns(category).length > 0)
      .map(categoryHref),
  ].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/contact" ? 0.9 : 0.7,
  }));
}
