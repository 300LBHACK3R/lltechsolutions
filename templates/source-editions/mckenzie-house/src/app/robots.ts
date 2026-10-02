import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return siteConfig.demoMode
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteConfig.domain}/sitemap.xml` };
}
