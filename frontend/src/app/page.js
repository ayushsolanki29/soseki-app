import { TestimonialsSection } from "@/components/testimonials-section";
import { LogoCloud } from "@/components/logo-cloud";
import { FeatureSection } from "@/components/feature-section";
import { Integrations } from "@/components/integrations";
import { PricingSection } from "@/components/pricing-section";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

// New modular landing components
import { HeroSection } from "@/components/landing/hero-section";
import { GlobalBillingSection } from "@/components/landing/global-billing-section";
import { ClientIntakeSection } from "@/components/landing/client-intake-section";
import { FinancialClaritySection } from "@/components/landing/financial-clarity-section";

export default function LandingPage() {
  return (
    <main>
      <div className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
        <Header />

        <HeroSection />

        {/* Trusted By Section */}
        <section className="bg-white py-20 border-t border-slate-100 flex flex-col items-center border-b overflow-hidden">
          <p className="text-[13px] font-medium text-slate-500 mb-8">Trusted by fast-growing startups and agencies</p>
          <div className="w-full max-w-6xl mx-auto px-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <LogoCloud />
          </div>
        </section>



        <GlobalBillingSection />
        <ClientIntakeSection />
        <FinancialClaritySection />
        {/* <ZeroLockinSection /> */}

        {/* Testimonials Section */}
        <section className="bg-[#fcfdfd] py-12 border-b border-slate-100">
          <TestimonialsSection />
        </section>
        {/* Overview Features Grid */}
        <section className="bg-slate-50 py-24 border-b border-slate-100 px-6">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to run your business</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              A comprehensive suite of tools designed specifically for the unique workflows of freelancers and small agencies.
            </p>
          </div>
          <FeatureSection />
        </section>
        {/* Integrations Section */}
        <section className="bg-white">
          <Integrations />
        </section>

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