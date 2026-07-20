import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { BackgroundTracker } from "@/components/background-tracker";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Soseki",
  description: "All-in-one business operating platform for freelancers, consultants, and small agencies.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="t-page-fade min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster richColors position="bottom-right" />
        <Suspense fallback={null}>
          <BackgroundTracker />
        </Suspense>
      </body>
    </html>
  );
}
