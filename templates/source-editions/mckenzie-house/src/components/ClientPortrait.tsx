"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import styles from "./ClientPortrait.module.css";

type ClientPortraitProps = Readonly<{
  sources?: readonly string[];

  alt: string;
  initials: string;
  sizes: string;

  /**
   * Preload only when the portrait is genuinely above the fold and is
   * likely to be the page's Largest Contentful Paint image.
   */
  preload?: boolean;

  /**
   * Backward-compatible alias for older call sites.
   *
   * @deprecated Use `preload` instead.
   */
  priority?: boolean;

  className?: string;
}>;

function normalizeImageSource(value: string): string | null {
  const candidate = value.trim();

  if (!candidate) {
    return null;
  }

  if (candidate.startsWith("/") && !candidate.startsWith("//")) {
    return candidate;
  }

  try {
    const url = new URL(candidate);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username.length > 0 ||
      url.password.length > 0
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function normalizeSources(sources: readonly string[] | undefined): string[] {
  if (!sources) {
    return [];
  }

  const uniqueSources = new Set<string>();

  for (const value of sources) {
    const source = normalizeImageSource(value);

    if (source) {
      uniqueSources.add(source);
    }
  }

  return Array.from(uniqueSources);
}

function normalizeInitials(value: string): string {
  const normalizedValue = value.normalize("NFKC").trim().replace(/\s+/g, "");

  return normalizedValue.slice(0, 4) || "•";
}

export function ClientPortrait({
  sources,
  alt,
  initials,
  sizes,
  preload,
  priority,
  className = "",
}: ClientPortraitProps) {
  const normalizedSources = useMemo(() => normalizeSources(sources), [sources]);

  const sourceSignature = useMemo(() => normalizedSources.join("\u001f"), [normalizedSources]);

  const [sourceState, setSourceState] = useState<{
    signature: string;
    index: number;
  }>(() => ({
    signature: sourceSignature,
    index: 0,
  }));

  const sourceIndex = sourceState.signature === sourceSignature ? sourceState.index : 0;

  const currentSource = normalizedSources[sourceIndex];

  const showImage = Boolean(currentSource);

  const shouldPreload = preload ?? priority ?? false;

  const fallbackInitials = normalizeInitials(initials);

  const normalizedAlt = alt.trim();

  function handleImageError() {
    setSourceState((currentState) => {
      const currentIndex = currentState.signature === sourceSignature ? currentState.index : 0;

      return {
        signature: sourceSignature,
        index: Math.min(currentIndex + 1, normalizedSources.length),
      };
    });
  }

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-has-image={showImage ? "true" : "false"}
    >
      {currentSource ? (
        <Image
          key={currentSource}
          className={styles.image}
          src={currentSource}
          alt={normalizedAlt}
          fill
          sizes={sizes}
          quality={84}
          preload={shouldPreload}
          onError={handleImageError}
        />
      ) : (
        <span
          className={styles.fallback}
          role={normalizedAlt ? "img" : undefined}
          aria-label={normalizedAlt || undefined}
          aria-hidden={normalizedAlt ? undefined : true}
        >
          {fallbackInitials}
        </span>
      )}
    </div>
  );
}
