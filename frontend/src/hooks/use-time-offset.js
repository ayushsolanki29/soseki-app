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
export function useTimeOffset(minutesToAdd = 10, fallback = { hour: "4", minute: "49", meridiem: "pm", full: "4:49pm" }) {
  const [timeData, setTimeData] = useState(fallback);

  useEffect(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesToAdd);
    
    let hour = date.getHours();
    const meridiem = hour >= 12 ? "pm" : "am";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeData({
      hour: hour.toString(),
      minute,
      meridiem,
      full: `${hour}:${minute}${meridiem}`
    });
  }, [minutesToAdd]);

  return timeData;
}
