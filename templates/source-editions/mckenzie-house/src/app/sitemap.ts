export const dynamic = "force-static";
import type { MetadataRoute } from "next";

import { getActiveServices, siteConfig } from "@/lib/site";

const DEFAULT_SITE_ORIGIN = "https://example.com";

type SitemapEntry = MetadataRoute.Sitemap[number];

type StaticRouteDefinition = Readonly<{
  path: "/" | "/about" | "/pricing" | "/reviews" | "/faq" | "/contact";

  imageCandidates?: readonly string[];
}>;

const STATIC_ROUTES: readonly StaticRouteDefinition[] = [
  {
    path: "/",

    imageCandidates: [siteConfig.assets.heroImage, siteConfig.assets.openGraphImage],
  },

  {
    path: "/about",

    imageCandidates: [siteConfig.assets.detailImage],
  },

  {
    path: "/pricing",
  },

  {
    path: "/reviews",
  },

  {
    path: "/faq",
  },

  {
    path: "/contact",
  },
];

/**
 * Converts the configured website value into a clean HTTP(S)
 * origin.
 *
 * Paths, query strings, fragments, credentials, malformed URLs,
 * and unsupported protocols are discarded so every sitemap page
 * URL is built from one canonical origin.
 */
function normalizeSiteOrigin(value: string): string {
  try {
    const url = new URL(value);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username.length > 0 ||
      url.password.length > 0
    ) {
      return DEFAULT_SITE_ORIGIN;
    }

    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

/**
 * Builds a same-origin canonical page URL.
 *
 * Page URLs are restricted to the configured site origin and have
 * query strings and fragments removed. This prevents an accidental
 * external, tracking, or anchor URL from entering sitemap.xml.
 */
function toCanonicalPageUrl(value: string, siteOrigin: string): string | null {
  const candidate = value.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate, `${siteOrigin}/`);

    if ((url.protocol !== "https:" && url.protocol !== "http:") || url.origin !== siteOrigin) {
      return null;
    }

    url.search = "";
    url.hash = "";

    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Builds an absolute HTTP(S) asset URL.
 *
 * External image-CDN URLs remain supported, while empty values,
 * unsupported protocols, and malformed URLs are omitted.
 */
function toAbsoluteAssetUrl(value: string, siteOrigin: string): string | null {
  const candidate = value.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate, `${siteOrigin}/`);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    url.hash = "";

    return url.toString();
  } catch {
    return null;
  }
}

function uniqueAssetUrls(values: readonly string[], siteOrigin: string): string[] {
  const urls = values.flatMap((value) => {
    const absoluteUrl = toAbsoluteAssetUrl(value, siteOrigin);

    return absoluteUrl ? [absoluteUrl] : [];
  });

  return Array.from(new Set(urls));
}

function createSitemapEntry({
  path,
  siteOrigin,
  imageCandidates = [],
}: {
  path: string;
  siteOrigin: string;
  imageCandidates?: readonly string[];
}): SitemapEntry | null {
  const url = toCanonicalPageUrl(path, siteOrigin);

  if (!url) {
    return null;
  }

  const images = uniqueAssetUrls(imageCandidates, siteOrigin);

  return {
    url,

    ...(images.length > 0
      ? {
          images,
        }
      : {}),
  };
}

function isSitemapEntry(value: SitemapEntry | null): value is SitemapEntry {
  return value !== null;
}

function deduplicateEntries(entries: readonly SitemapEntry[]): MetadataRoute.Sitemap {
  const entriesByUrl = new Map<string, SitemapEntry>();

  for (const entry of entries) {
    if (!entriesByUrl.has(entry.url)) {
      entriesByUrl.set(entry.url, entry);
    }
  }

  return Array.from(entriesByUrl.values());
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

  const staticEntries = STATIC_ROUTES.map((route) =>
    createSitemapEntry({
      path: route.path,

      siteOrigin,

      imageCandidates: route.imageCandidates,
    }),
  ).filter(isSitemapEntry);

  const serviceEntries = getActiveServices()
    .map((service) => {
      const slug = service.slug.trim();

      if (!slug) {
        return null;
      }

      return createSitemapEntry({
        path: `/services/${encodeURIComponent(slug)}`,

        siteOrigin,

        imageCandidates: [service.image, service.videoPoster ?? ""],
      });
    })
    .filter(isSitemapEntry);

  return deduplicateEntries([...staticEntries, ...serviceEntries]);
}
