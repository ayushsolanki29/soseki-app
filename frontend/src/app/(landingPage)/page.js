import { PricingSection } from "@/components/pricing-section";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

// New modular landing components
import { HeroSection } from "@/components/landing/hero-section";
import { GlobalBillingSection } from "@/components/landing/global-billing-section";
import { ClientIntakeSection } from "@/components/landing/client-intake-section";
import { FinancialClaritySection } from "@/components/landing/financial-clarity-section";

export const metadata = {
  title: "Free Invoicing Software for Freelancers",
  description: "Manage clients, invoices, projects, and expenses in one free, open source workspace. Multi currency invoicing with 0% payment fees.",
};

export default function LandingPage() {
  return (
    <main>
      <div className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
        <Header />

        <HeroSection />

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