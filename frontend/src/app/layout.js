import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { BackgroundTracker } from "@/components/background-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://soseki.app'),
  title: {
    default: "Soseki - All-in-one business operating platform",
    template: "%s | Soseki"
  },
  description: "The open-source platform for freelancers and agencies to magically simplify business operations. One workspace for clients, projects, invoices, payments, and expenses.",
  keywords: ["freelancer platform", "agency management", "open-source crm", "client portal", "project management", "invoicing software"],
  authors: [{ name: "Soseki" }],
  creator: "Soseki",
  publisher: "Soseki",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Soseki - All-in-one business operating platform",
    description: "The open-source platform for freelancers and agencies. Manage clients, projects, invoices, and payments in one workspace.",
    url: "https://soseki.app",
    siteName: "Soseki",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Soseki - All-in-one business operating platform",
    description: "The open-source platform for freelancers and agencies. Manage clients, projects, invoices, and payments in one workspace.",
  },
  verification: {
    google: "g2zd7qYHgqu2qzAwP8FGpj_t3XsNuHH-VcKgmBfK9aU",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
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
    url: 'https://soseki.app',
    creator: {
      '@type': 'Organization',
      name: 'Soseki'
    }
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="google-consent-mode"
          strategy="beforeInteractive"
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
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <GoogleTagManager gtmId="GTM-KS9248KF" />
        <GoogleAnalytics gaId="G-X1600G8S2W" />
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
