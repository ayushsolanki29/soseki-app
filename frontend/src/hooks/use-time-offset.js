"use client";

import { useState, useEffect } from "react";

/**
 * A highly optimized hook for generating a dynamic local time string with an offset.
 * Useful for public marketing pages (resolves hydration mismatches automatically).
 * 
 * @param {number} minutesToAdd - The number of minutes to add to the current time.
 * @param {string} fallback - The server-rendered fallback string before hydration.
 * @returns {string} The formatted time string (e.g., "4:49pm").
 */
export function useTimeOffset(minutesToAdd = 10, fallback = { hour: "4", minute: "49", separator: ":", meridiem: "pm", full: "4:49pm" }) {
  const [timeData, setTimeData] = useState(fallback);

  useEffect(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesToAdd);
    
    // Format based on user's locale for global support
    const formatter = new Intl.DateTimeFormat(navigator.language || undefined, {
      hour: 'numeric',
      minute: '2-digit'
    });
    
    const parts = formatter.formatToParts(date);
    let hour = "";
    let minute = "";
    let separator = ":";
    let meridiem = "";

    for (const part of parts) {
      if (part.type === 'hour') hour = part.value;
      if (part.type === 'minute') minute = part.value;
      if (part.type === 'literal' && part.value.trim().length > 0) separator = part.value.trim();
      if (part.type === 'dayPeriod') meridiem = part.value;
    }

    setTimeData({
      hour,
      minute,
      separator,
      meridiem: meridiem ? " " + meridiem.toLowerCase() : "",
      full: formatter.format(date)
    });
  }, [minutesToAdd]);

  return timeData;
}
