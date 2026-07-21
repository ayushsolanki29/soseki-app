import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { BackgroundTracker } from "@/components/background-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Soseki",
  description: "All-in-one business operating platform for freelancers, consultants, and small agencies.",
  verification: {
    google: "g2zd7qYHgqu2qzAwP8FGpj_t3XsNuHH-VcKgmBfK9aU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
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
      <body className="t-page-fade min-h-full flex flex-col overflow-x-hidden">
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
