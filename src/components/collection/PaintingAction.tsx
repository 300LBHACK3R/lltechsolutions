import Link from "next/link";
import type { ReactNode } from "react";
import { paintingPagePath, type PaintingPage } from "@/data/painting-pages";

/** Real routes in the standalone demo; local controls in the embedded sample. */
export default function PaintingAction({
  standalone,
  to,
  onPreview,
  className,
  current,
  children,
}: {
  standalone: boolean;
  to: PaintingPage;
  onPreview: () => void;
  className?: string;
  current?: boolean;
  children: ReactNode;
}) {
  return standalone ? (
    <Link
      href={paintingPagePath(to)}
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
