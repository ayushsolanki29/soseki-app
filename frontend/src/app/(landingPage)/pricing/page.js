"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  Zap, 
  Heart,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { PRICING_DATA } from "@/config/pricing-data";
import { CallToAction } from "@/components/cta";

export default function PricingPage() {
  const [currency, setCurrency] = useState("usd"); // "inr" or "usd"
  const [packageIndex, setPackageIndex] = useState(1); // Default to 30 credits (index 1)

  const paidData = PRICING_DATA.paid[currency];
  const selectedPackage = paidData.packages[packageIndex];

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-[#09090b] font-sans selection:bg-blue-200 flex flex-col overflow-x-clip">
      <Header />

      {/* Modern Hero & Calculator Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 border-b border-slate-100 px-4 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />
        
        <div className="mx-auto max-w-5xl w-full relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Pay for what you use.<br/><span className="text-blue-600">Nothing more.</span>
            </h1>
            <p className="mt-4 text-base md:text-xl text-slate-600 max-w-2xl mx-auto px-2 md:px-0">
              We ditched the rigid subscription model. Every account gets 25 free days of usage every month. Buy extra credits only when you need them.
            </p>
          </motion.div>

          {/* Pricing Calculator Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row overflow-hidden"
          >
            {/* Free Tier Side */}
            <div className="w-full md:w-1/2 p-6 md:p-12 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[11px] font-bold tracking-wider text-emerald-700 uppercase mb-6 border border-emerald-200">
                  <Heart className="w-3.5 h-3.5" />
                  Community Free
                </div>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-slate-900">25</span>
                  <span className="text-xl font-bold text-slate-400">Credits</span>
                </div>
                <p className="text-sm font-medium text-slate-600 mb-8">Refreshed automatically every month. Forever free.</p>
                
                <ul className="space-y-4 mb-8">
                  {PRICING_DATA.free.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/login" className="w-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl shadow-sm transition-colors text-center text-[15px] relative z-10">
                Start for Free
              </Link>
            </div>

            {/* Paid Tier Side */}
            <div className="w-full md:w-1/2 p-6 md:p-12 bg-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase py-1 px-4 rounded-bl-xl tracking-wider">
                Pro Tier
              </div>

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-500 fill-blue-500" /> Pay As You Go
                  </h3>
                  
                  {/* Currency Toggle */}
                  <div className="bg-slate-100 p-1 rounded-lg flex items-center shadow-inner">
                    <button 
                      onClick={() => setCurrency("usd")}
                      className={cn("px-3 py-1 rounded-md text-[11px] font-bold transition-all", currency === "usd" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                    >
                      USD ($)
                    </button>
                    <button 
                      onClick={() => setCurrency("inr")}
                      className={cn("px-3 py-1 rounded-md text-[11px] font-bold transition-all", currency === "inr" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                    >
                      INR (₹)
                    </button>
                  </div>
                </div>

                {/* Package Toggle */}
                <div className={cn("grid gap-3 mb-8", paidData.packages.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
                  {paidData.packages.map((pkg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPackageIndex(idx)}
                      className={cn(
                        "py-3 px-3 sm:px-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-center",
                        packageIndex === idx 
                          ? "border-blue-500 bg-blue-50/50 shadow-sm ring-1 ring-blue-500" 
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                      )}
                    >
                      {packageIndex === idx && (
                        <motion.div layoutId="package-active" className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none" />
                      )}
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-[9px] font-bold uppercase py-0.5 px-2 rounded-bl-lg tracking-wider pointer-events-none z-10 shadow-sm">
                          Popular
                        </div>
                      )}
                      <div className="text-[12px] sm:text-[13px] font-bold text-slate-500 mb-0.5 relative z-10">{pkg.credits} Credits</div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 relative z-10">
                        {paidData.currencySymbol}{pkg.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {PRICING_DATA.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                      <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/checkout" className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3.5 rounded-xl shadow-sm shadow-blue-500/20 transition-all text-center text-[15px] relative z-10 flex items-center justify-center gap-2 group">
                Purchase {selectedPackage.credits} Credits <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4">Compare Features</h2>
          <p className="text-sm md:text-base text-slate-600 mb-6 px-2 md:px-0">Both tiers include full access to the platform. Pro users get access to premium features and support.</p>
          <Link href="/features" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium transition-colors text-[15px]">
            View all detailed features <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mx-auto max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">Features</th>
                <th className="py-4 px-6 text-xs font-bold text-emerald-600 uppercase tracking-wider text-center w-1/4">Free Community</th>
                <th className="py-4 px-6 text-xs font-bold text-blue-600 uppercase tracking-wider text-center w-1/4">Pro Pay-As-You-Go</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[
                { name: "Included Credits", free: "25 / month", comm: "Purchased in batches" },
                { name: "Unlimited Clients & Projects", free: true, comm: true },
                { name: "Unlimited Invoices & Expenses", free: true, comm: true },
                { name: "Direct Client Payments (0% Fee)", free: true, comm: true },
                { name: "AI-Assisted Workflows", free: true, comm: true },
                { name: "Dashboard & Analytics", free: true, comm: true },
                { name: "Global Search", free: false, comm: true },
                { name: "Premium Client Management", free: false, comm: true },
                { name: "Support", free: "Community", comm: "Priority Dedicated" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-slate-700">{row.name}</td>
                  <td className="py-3.5 px-6 text-center text-slate-600 font-medium">
                    {typeof row.free === "boolean" ? (
                      row.free ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <span className="text-slate-300">-</span>
                    ) : (
                      <span className="text-emerald-700">{row.free}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-6 text-center text-slate-900 font-semibold bg-blue-50/10">
                    {typeof row.comm === "boolean" ? (
                      row.comm ? <Check className="w-5 h-5 text-blue-600 mx-auto" /> : <span className="text-slate-300">-</span>
                    ) : (
                      <span className="text-blue-700">{row.comm}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white px-4 sm:px-6 border-b border-slate-100">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-sm md:text-base text-slate-600 px-2 md:px-0">Everything you need to know about the credit system.</p>
          </div>

          <div className="space-y-4">
            <FAQAccordion 
              q="How does the free tier work?" 
              a="Every Soseki account automatically receives 25 free credits at the beginning of each month. Since 1 credit equals 1 day of full platform access, this effectively covers most freelancers who take weekends off." 
            />
            <FAQAccordion 
              q="What happens if I run out of credits?" 
              a="Your data remains completely safe and accessible for viewing. You will just need to purchase a small batch of credits (15 or 30) to continue creating new invoices or adding new clients until the next month begins." 
            />
            <FAQAccordion 
              q="Does Soseki charge a commission on client payments?" 
              a="No. Soseki charges absolutely 0% commission on your invoices. When your clients pay you directly through the client portal, the money goes straight to your connected bank account. You only pay standard processing fees to your payment provider (like Stripe or PayPal)." 
            />
            <FAQAccordion 
              q="Do my purchased credits expire?" 
              a="No, purchased credits never expire. Only your free monthly 25 credits reset at the end of each billing cycle." 
            />
            <FAQAccordion 
              q="Does Soseki support multiple currencies?" 
              a="Yes, you can invoice your global clients in their local currency. Soseki handles the currency conversion and payment tracking automatically." 
            />
            <FAQAccordion 
              q="What happens to my client portal if I run out of credits?" 
              a="Your client portal and public links remain 100% active and accessible for your clients to view and pay invoices, even if you are out of credits. Credits are only required when you are actively logging in to create new records." 
            />
            <FAQAccordion 
              q="How does the AI-assisted migration work?" 
              a="If you're moving from another platform, our AI can read your existing spreadsheets, PDFs, or CSV exports and automatically structure them into Soseki. It saves hours of manual data entry." 
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-12 px-6">
        <CallToAction />
      </section>

      {/* Footer */}
      <section className="bg-white">
        <Footer />
      </section>
    </main>
  );
}

function FAQAccordion({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200/80 bg-slate-50 hover:bg-slate-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-6 flex items-center justify-between text-left font-bold text-sm text-slate-800 transition-colors"
      >
        <span className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
          {q}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-6 pb-4 pt-0 text-[14px] text-slate-600 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
