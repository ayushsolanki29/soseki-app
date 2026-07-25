import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { BackgroundTracker } from "@/components/background-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import Script from 'next/script';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://soseki.app'),
  title: {
    default: "Soseki: Free Invoicing & CRM for Freelancers",
    template: "%s | Soseki"
  },
  description: "Run invoicing, client management, and project tracking in one free, open source workspace built for freelancers and small agencies.",
  keywords: ["freelancer platform", "agency management", "open-source crm", "client portal", "project management", "invoicing software"],
  authors: [{ name: "Soseki" }],
  creator: "Soseki",
  publisher: "Soseki",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Soseki: Free Invoicing & CRM for Freelancers",
    description: "Run invoicing, client management, and project tracking in one free, open source workspace built for freelancers and small agencies.",
    url: "https://soseki.app",
    siteName: "Soseki",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Soseki: Free Invoicing & CRM for Freelancers",
    description: "Run invoicing, client management, and project tracking in one free, open source workspace built for freelancers and small agencies.",
  },
  verification: {
    google: "g2zd7qYHgqu2qzAwP8FGpj_t3XsNuHH-VcKgmBfK9aU",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Soseki',
      url: 'https://soseki.app',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://soseki.app/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Soseki',
      url: 'https://soseki.app',
      logo: 'https://soseki.app/logo.png',
      sameAs: [
        'https://github.com/ayushsolanki29/soseki-app',
        'https://twitter.com/sosekiapp'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Soseki',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description: 'All-in-one business operating platform for freelancers, consultants, and small agencies.',
      url: 'https://soseki.app'
    }
  ];

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="google-consent-mode"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });

              if (typeof window !== "undefined" && window.localStorage) {
                if (localStorage.getItem('cookie_consent') === 'granted') {
                  gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'analytics_storage': 'granted'
                  });
                }
              }
            `,
          }}
        />
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KS9248KF');
          `}
        </Script>
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-X1600G8S2W" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X1600G8S2W');
          `}
        </Script>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster richColors position="bottom-right" />
        <Suspense fallback={null}>
          <BackgroundTracker />
        </Suspense>
        <CookieConsent />
      </body>
    </html>
  );
}
