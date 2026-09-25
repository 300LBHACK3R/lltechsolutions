import Link from "next/link";
import type { ReactNode } from "react";
import { plumbingPagePath, type PlumbingPage } from "@/data/plumbing-pages";

/** The embedded preview is local; standalone pages use genuine, shareable URLs. */
export default function PlumbingAction({
  standalone,
  to,
  onPreview,
  className,
  current,
  children,
}: {
  standalone: boolean;
  to: PlumbingPage;
  onPreview: () => void;
  className?: string;
  current?: boolean;
  children: ReactNode;
}) {
  return standalone ? (
    <Link
      href={plumbingPagePath(to)}
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
