import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      type: "website",
      locale: "en_CA",
      images: [
        { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: siteConfig.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
