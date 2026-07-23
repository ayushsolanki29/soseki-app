export const PRICING_DATA = {
  free: {
    creditsPerMonth: 25,
    features: [
      "25 Credits refreshed every month",
      "1 Credit = 1 Day of full access",
      "Unlimited Clients & Projects",
      "Multi-Currency Invoicing",
      "Direct Client Payments (0% Fee)",
      "AI-Assisted Migration",
      "Smart Questionnaires"
    ],
  },
  paid: {
    inr: {
      currencySymbol: "₹",
      currencyCode: "INR",
      pricePerCredit: 1.5,
      packages: [
        { credits: 15, price: 22.5 },
        { credits: 30, price: 45 }
      ]
    },
    usd: {
      currencySymbol: "$",
      currencyCode: "USD",
      pricePerCredit: 0.50,
      packages: [
        { credits: 15, price: 7.50 },
        { credits: 30, price: 15.00 }
      ]
    },
    features: [
      "Purchase credits as you need them",
      "Credits never expire",
      "Premium Client Management",
      "Advanced Project Tracking",
      "Dashboard & Financial Analytics",
      "Global Search",
      "AI Form Generation",
      "Client Collaboration"
    ]
  }
};
