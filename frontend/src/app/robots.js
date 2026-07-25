
export default function robots() {
  return {
    rules: [
      // Default rules
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/super-admin/",
          "/setup-organization/",
          "/api/",
          "/c/",
          "/q/",
          "/login",
          "/setup-account",
        ],
      },

      // OpenAI
      {
        userAgent: ["GPTBot", "ChatGPT-User"],
        allow: [
          "/",
          "/about",
          "/features",
          "/pricing",
          "/contact",
          "/privacy-policy",
          "/terms",
          "/my-data",
          "/llms.txt",
          "/sitemap.xml",
        ],
        disallow: [
          "/dashboard/",
          "/super-admin/",
          "/setup-organization/",
          "/api/",
          "/c/",
          "/q/",
          "/login",
          "/setup-account",
        ],
      },

      // Anthropic
      {
        userAgent: [
          "ClaudeBot",
          "Claude-Web",
          "Anthropic-ai",
        ],
        allow: [
          "/",
          "/about",
          "/features",
          "/pricing",
          "/contact",
          "/privacy-policy",
          "/terms",
          "/my-data",
          "/llms.txt",
          "/sitemap.xml",
        ],
        disallow: [
          "/dashboard/",
          "/super-admin/",
          "/setup-organization/",
          "/api/",
          "/c/",
          "/q/",
          "/login",
          "/setup-account",
        ],
      },

      // Google AI
      {
        userAgent: [
          "Googlebot",
          "Google-Extended",
        ],
        allow: [
          "/",
          "/about",
          "/features",
          "/pricing",
          "/contact",
          "/privacy-policy",
          "/terms",
          "/my-data",
          "/llms.txt",
          "/sitemap.xml",
        ],
        disallow: [
          "/dashboard/",
          "/super-admin/",
          "/setup-organization/",
          "/api/",
          "/c/",
          "/q/",
          "/login",
          "/setup-account",
        ],
      },

      // Other AI & Search
      {
        userAgent: [
          "PerplexityBot",
          "Applebot",
          "Applebot-Extended",
          "CCBot",
          "Amazonbot",
          "Bytespider",
          "OAI-SearchBot",
        ],
        allow: [
          "/",
          "/about",
          "/features",
          "/pricing",
          "/contact",
          "/privacy-policy",
          "/terms",
          "/my-data",
          "/llms.txt",
          "/sitemap.xml",
        ],
        disallow: [
          "/dashboard/",
          "/super-admin/",
          "/setup-organization/",
          "/api/",
          "/c/",
          "/q/",
          "/login",
          "/setup-account",
        ],
      },
    ],

    sitemap: "https://soseki.app/sitemap.xml",

    host: "https://soseki.app",
  };
}