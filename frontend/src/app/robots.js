export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/super-admin/',
          '/setup-organization/',
          '/api/',
          '/c/',
          '/q/',
          '/login',
          '/request-access'
        ],
      },
      // Explicitly Welcome AI Crawlers and Search Bots
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-ai', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Applebot-Extended'],
        allow: ['/', '/about', '/features', '/pricing', '/llms.txt', '/privacy-policy', '/terms', '/my-data', '/contact'],
        disallow: [
          '/dashboard/',
          '/api/',
          '/super-admin/',
          '/c/',
          '/q/'
        ]
      }
    ],
    sitemap: 'https://soseki.app/sitemap.xml',
  }
}
