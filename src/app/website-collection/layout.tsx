import type { ReactNode } from "react";

// Prices are evaluated per request; the client clock also expires an open page.
export const dynamic = "force-dynamic";

export default function CollectionLayout({ children }: { children: ReactNode }) {
  return children;
}
