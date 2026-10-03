"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { filterAnalyticsEvent } from "@/lib/analytics-privacy";

export default function SiteAnalytics() {
  return (
    <>
      <Analytics beforeSend={filterAnalyticsEvent} />
      <SpeedInsights beforeSend={filterAnalyticsEvent} />
    </>
  );
}
