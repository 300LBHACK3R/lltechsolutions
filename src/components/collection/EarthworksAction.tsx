import Link from "next/link";
import type { ReactNode } from "react";
import { earthworksPagePath, type EarthworksPage } from "@/data/earthworks-pages";

export default function EarthworksAction({
  standalone,
  to,
  onPreview,
  className,
  current,
  children,
}: {
  standalone: boolean;
  to: EarthworksPage;
  onPreview: () => void;
  className?: string;
  current?: boolean;
  children: ReactNode;
}) {
  return standalone ? (
    <Link
      href={earthworksPagePath(to)}
      className={className}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      className={className}
      aria-current={current ? "page" : undefined}
      onClick={onPreview}
    >
      {children}
    </button>
  );
}
