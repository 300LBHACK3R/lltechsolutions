import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.95, changeFrequency: "monthly" as const },
  {
    path: "/projects/web-builds",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/projects/software-development",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/projects/social-media-management",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  { path: "/process", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/packages", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/free-tech-audit",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  { path: "/privacy", priority: 0.35, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.35, changeFrequency: "yearly" as const },
  { path: "/security", priority: 0.4, changeFrequency: "yearly" as const },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
