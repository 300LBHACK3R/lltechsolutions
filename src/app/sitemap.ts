import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = [
  "",
  "/services",
  "/projects",
  "/projects/web-builds",
  "/projects/tech-support",
  "/projects/infrastructure",
  "/process",
  "/packages",
  "/contact",
  "/free-tech-audit",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/free-tech-audit" || route === "/contact"
          ? 0.9
          : 0.75,
  }));
}
