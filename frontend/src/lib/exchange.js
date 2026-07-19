// Using mock data for development to save API limits.
// These are rough base conversion rates to USD for calculating any pair.
const MOCK_BASE_TO_USD = {
  USD: 1.0,
  EUR: 1.08,
  GBP: 1.26,
  INR: 0.012,
  AUD: 0.65,
  CAD: 0.73,
  SGD: 0.74,
};

// API Key provided by user
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY || "cb417fe98ba39e001e4dc5c3";

export async function fetchExchangeRate(baseCurrency, targetCurrency) {
  if (baseCurrency === targetCurrency) return 1.0;

  // Use mock data in development to save API quota
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV MODE] Using mock exchange rate for ${baseCurrency} to ${targetCurrency}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const baseToUsd = MOCK_BASE_TO_USD[baseCurrency] || 1.0;
    const targetToUsd = MOCK_BASE_TO_USD[targetCurrency] || 1.0;

    // Math: (Base -> USD) / (Target -> USD) = Base -> Target
    const rate = baseToUsd / targetToUsd;
    return Number(rate.toFixed(4));
  }

  // Production: use the real API
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
    const data = await res.json();

    if (data.result === "success" && data.conversion_rates && data.conversion_rates[targetCurrency]) {
      return data.conversion_rates[targetCurrency];
    }

    console.warn(`Failed to parse exchange rate for ${targetCurrency} from API response`, data);
    return 1.0;
  } catch (error) {
    console.error("Error fetching live exchange rate:", error);
    return 1.0;
  }
}
