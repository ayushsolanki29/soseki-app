
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
          "/request-access",
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
          "/request-access",
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
          "/request-access",
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
          "/request-access",
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
          "/request-access",
        ],
      },
    ],

    sitemap: "https://soseki.app/sitemap.xml",

    host: "https://soseki.app",
  };
}