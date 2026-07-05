import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export let globalDateFormat = "dd-MMM-yy";
export function setGlobalDateFormat(formatStr) {
  if (formatStr) globalDateFormat = formatStr;
}

export function formatCurrency(amount, currencyCode = "USD") {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount || 0);
}

export function formatDate(date, formatString) {
  if (!date) return "-";
  try {
    return format(new Date(date), formatString || globalDateFormat);
  } catch (error) {
    return new Date(date).toLocaleDateString();
  }
}
