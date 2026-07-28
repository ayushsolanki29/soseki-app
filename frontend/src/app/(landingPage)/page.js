import { PricingSection } from "@/components/pricing-section";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

// New modular landing components
import { HeroSection } from "@/components/landing/hero-section";
import { GlobalBillingSection } from "@/components/landing/global-billing-section";
import { ClientIntakeSection } from "@/components/landing/client-intake-section";
import { FinancialClaritySection } from "@/components/landing/financial-clarity-section";
import { TrustedBySection } from "@/components/landing/trusted-by-section";

export const metadata = {
  title: "Soseki | Run your freelance business without five different tools",
  description: "Clients, projects, invoices, and expenses, all in one workspace. No juggling a separate invoicing app, a CRM, and a spreadsheet.",
  alternates: {
    canonical: '/',
  },
};

export default function LandingPage() {
  return (
    <main>
      <div className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
        <Header />

        <HeroSection />

        <TrustedBySection />

        <GlobalBillingSection />
        <ClientIntakeSection />
        <FinancialClaritySection />
        {/* Pricing Section */}
        <section className="bg-white">
          <PricingSection />
        </section>

        {/* CTA Section */}
        <section className="bg-white py-12 px-6">
          <CallToAction />
        </section>

        {/* Footer */}
        <section className="bg-white">
          <Footer />
        </section>
      </div>
    </main>
  );
}