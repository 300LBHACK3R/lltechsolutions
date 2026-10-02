import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

const DEFAULT_SITE_ORIGIN = "https://example.com";

type BrandLogoVariant = "header" | "footer";

type BrandLogoProps = Readonly<{
  href?: string;
  className?: string;
  variant?: BrandLogoVariant;
  ariaLabel?: string;
}>;

type LogoConfiguration = Readonly<{
  width: number;
  height: number;
  sizes: string;
  loading: "eager" | "lazy";
  quality: 88 | 92;
}>;

type ParsedLogoTarget = Readonly<{
  href: string;
  kind: "internal" | "external" | "native";
}>;

const LOGO_CONFIG = {
  header: {
    width: 520,
    height: 150,

    sizes: "(max-width: 560px) 180px, " + "(max-width: 980px) 220px, " + "260px",

    loading: "eager",
    quality: 88,
  },

  footer: {
    width: 720,
    height: 210,

    sizes: "(max-width: 560px) 340px, " + "(max-width: 980px) 420px, " + "520px",

    loading: "lazy",
    quality: 88,
  },
} as const satisfies Record<BrandLogoVariant, LogoConfiguration>;

function joinClassNames(...classNames: Array<string | undefined | false>): string {
  return classNames
    .flatMap((className) => {
      if (typeof className !== "string") {
        return [];
      }

      const normalizedClassName = className.trim();

      return normalizedClassName ? [normalizedClassName] : [];
    })
    .join(" ");
}

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

function isNativeProtocol(value: string): boolean {
  const normalizedValue = value.trim().toLowerCase();

  return (
    normalizedValue.startsWith("mailto:") ||
    normalizedValue.startsWith("tel:") ||
    normalizedValue.startsWith("sms:")
  );
}

function normalizeInternalPath(url: URL): string {
  const path = `${url.pathname}${url.search}${url.hash}`;

  return path || "/";
}

const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

function parseLogoTarget(value: string | undefined): ParsedLogoTarget {
  const candidate = value?.trim() || "/";

  if (isNativeProtocol(candidate)) {
    return {
      href: candidate,

      kind: "native",
    };
  }

  /*
   * Protocol-relative URLs are rejected rather than inheriting the
   * current page protocol implicitly.
   */
  if (candidate.startsWith("//")) {
    return {
      href: "/",
      kind: "internal",
    };
  }

  try {
    const url = new URL(candidate, `${siteOrigin}/`);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username.length > 0 ||
      url.password.length > 0
    ) {
      return {
        href: "/",
        kind: "internal",
      };
    }

    if (url.origin === siteOrigin) {
      return {
        href: normalizeInternalPath(url),

        kind: "internal",
      };
    }

    return {
      href: url.toString(),

      kind: "external",
    };
  } catch {
    return {
      href: "/",
      kind: "internal",
    };
  }
}

function isHomepageTarget(target: ParsedLogoTarget): boolean {
  if (target.kind !== "internal") {
    return false;
  }

  try {
    const url = new URL(target.href, `${siteOrigin}/`);

    return url.pathname === "/" && (url.hash === "" || url.hash === "#home");
  } catch {
    return target.href === "/" || target.href === "/#home";
  }
}

function getAccessibleLabel({
  target,
  ariaLabel,
}: {
  target: ParsedLogoTarget;
  ariaLabel: string | undefined;
}): string {
  const customLabel = ariaLabel?.trim();

  if (customLabel) {
    return customLabel;
  }

  if (isHomepageTarget(target)) {
    return `Go to the ` + `${siteConfig.businessName} homepage`;
  }

  if (target.kind === "external") {
    return `Visit ` + siteConfig.businessName;
  }

  return siteConfig.businessName;
}

export function BrandLogo({
  href = "/",
  className,
  variant = "header",
  ariaLabel,
}: BrandLogoProps) {
  const logo = LOGO_CONFIG[variant];

  const target = parseLogoTarget(href);

  const linkClassName = joinClassNames("brand-logo-link", `brand-logo-link--${variant}`, className);

  const accessibleLabel = getAccessibleLabel({
    target,
    ariaLabel,
  });

  const logoImage = (
    <Image
      className="brand-logo-image"
      src={siteConfig.assets.logo}
      /*
       * The surrounding link owns the accessible name, so an empty alt
       * prevents the business name from being announced twice.
       */
      alt=""
      width={logo.width}
      height={logo.height}
      sizes={logo.sizes}
      quality={logo.quality}
      loading={logo.loading}
      decoding="async"
      draggable={false}
    />
  );

  if (target.kind === "internal") {
    return (
      <Link
        href={target.href}
        className={linkClassName}
        aria-label={accessibleLabel}
        data-logo-variant={variant}
      >
        {logoImage}
      </Link>
    );
  }

  return (
    <a
      href={target.href}
      className={linkClassName}
      aria-label={accessibleLabel}
      data-logo-variant={variant}
      {...(target.kind === "external"
        ? {
            referrerPolicy: "strict-origin-when-cross-origin" as const,
          }
        : {})}
    >
      {logoImage}
    </a>
  );
}
