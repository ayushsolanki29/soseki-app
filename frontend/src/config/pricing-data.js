export const PRICING_DATA = {
  free: {
    creditsPerMonth: 25,
    features: [
      "25 Credits refreshed every month",
      "1 Credit = 1 Day of full access",
      "Unlimited Clients",
      "Unlimited Projects",
      "Unlimited Invoices & Expenses",
      "Multi-Currency Invoicing",
      "Direct Client Payments (0% Fee)",
      "AI-Assisted Migration",
      "AI Smart Questionnaires",
      "Open Source & Self Hostable"
    ]
  },

  paid: {
    inr: {
      currencySymbol: "₹",
      currencyCode: "INR",
      packages: [
        { credits: 15, price: 39 },
        { credits: 30, price: 69, popular: true },
        { credits: 90, price: 149 },

      ]
    },

    usd: {
      currencySymbol: "$",
      currencyCode: "USD",
      packages: [
        { credits: 15, price: 6.99 },
        { credits: 30, price: 10.99, popular: true },
        { credits: 90, price: 19.99 },

      ]
    }
  },

  features: [
    "Credits never expire",
    "Purchase anytime",
    "Priority support",
    "Premium dashboard analytics",
    "Global search",
    "Advanced client management",
    "Advanced project insights",
    "Premium AI workflows",
    "Future premium features included"
  ]
};