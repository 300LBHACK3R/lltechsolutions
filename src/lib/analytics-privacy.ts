const privatePaths = ["/api", "/source-purchase", "/template-purchase"];

// Share one URL policy between page views and performance measurements.
// Payment-session identifiers and signed download links must never be reported.
export function filterAnalyticsEvent<T extends { url: string }>(event: T): T | null {
  try {
    const url = new URL(event.url);
    const pathname = decodeURIComponent(url.pathname).toLowerCase();
    if (
      !["https:", "http:"].includes(url.protocol) ||
      privatePaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))
    ) {
      return null;
    }
    url.search = "";
    url.hash = "";
    url.username = "";
    url.password = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}
