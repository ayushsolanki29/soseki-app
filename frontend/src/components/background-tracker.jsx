"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function BackgroundTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tracked = useRef(false);

  useEffect(() => {
    // Only track the very first page load of the session to avoid spamming
    if (tracked.current) return;
    tracked.current = true;

    // We use setTimeout to push this to the end of the event loop
    // This ensures it has absolutely ZERO impact on page render time
    setTimeout(() => {
      try {
        const data = {
          path: pathname,
          referrer: document.referrer || null,
          utmSource: searchParams.get("utm_source"),
          utmMedium: searchParams.get("utm_medium"),
          utmCampaign: searchParams.get("utm_campaign"),
          utmTerm: searchParams.get("utm_term"),
          utmContent: searchParams.get("utm_content"),
        };

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const endpoint = `${apiUrl}/tracking/visit`;

        // navigator.sendBeacon is perfectly non-blocking and ideal for analytics
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
          navigator.sendBeacon(endpoint, blob);
        } else {
          // Fallback to fetch (fire and forget)
          fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            keepalive: true,
          }).catch(() => {});
        }
      } catch (error) {
        // Silently swallow errors
      }
    }, 1000);
  }, [pathname, searchParams]);

  return null; // Renders absolutely nothing
}
