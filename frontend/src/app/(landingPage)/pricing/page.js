"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Check, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  RefreshCw, 
  Users, 
  LineChart, 
  Server, 
  Database,
  Lock,
  Heart,
  Globe,
  ChevronDown
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfd] text-[#09090b] font-sans selection:bg-blue-200 flex flex-col">
      <Header />

      {/* Section 1 — Hero */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center relative z-10 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[13px] font-medium text-blue-600 mb-6 border border-blue-100/50">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent SaaS Pricing
          </div>

          <h1 className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
            Pricing That Doesn't Suck
          </h1>

          <p className="text-lg md:text-[21px] text-slate-600 mb-12 max-w-2xl leading-relaxed">
            Simple, transparent pricing built for freelancers, agencies, and growing businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/login" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3.5 px-8 rounded-lg shadow-sm transition-colors text-[17px] w-full sm:w-auto text-center">
              Get Started
            </Link>
            <Link href="/docs" className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3.5 px-8 rounded-lg transition-colors text-[17px] w-full sm:w-auto text-center flex items-center justify-center gap-2">
              View Documentation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Section 2 — Pricing Cards */}
      <section className="relative h-screen flex flex-col justify-center bg-slate-50/50 border-b border-slate-100 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-5xl w-full relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Choose the Perfect Plan</h2>
            <p className="mt-1 text-slate-600 text-sm">Start free with our open-source release or select our managed commercial tier.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto w-full">
            {/* Open Source Plan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div>
                <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">OPEN SOURCE</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-slate-900">Free</span>
                  <span className="text-xs text-slate-500 font-medium">Forever</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">For independent freelancers & individuals</p>
                
                <div className="h-px bg-slate-100 my-4" />

                <ul className="space-y-2 mb-6">
                  {[
                    "Unlimited Clients & Projects",
                    "Unlimited Invoices & Expenses",
                    "Multi-Currency Invoicing",
                    "AI-Assisted Migration",
                    "Smart Questionnaires",
                    "Dashboard & Analytics",
                    "Global Search",
                    "100% Self Hosted",
                    "Open Source"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/login" className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium py-2 rounded-lg transition-colors text-center block text-sm">
                Get Started Free
              </Link>
            </motion.div>

            {/* Commercial Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl border-2 border-blue-600 p-6 shadow-xl shadow-blue-100/50 flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-100/60 transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase py-0.5 px-3 rounded-bl-xl tracking-wider">
                Most Popular
              </div>

              <div>
                <p className="text-[11px] font-bold tracking-wider text-blue-600 uppercase mb-1">COMMERCIAL</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-slate-900">$29</span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">For boutique agencies & growing teams</p>
                
                <div className="h-px bg-slate-100 my-4" />

                <ul className="space-y-2 mb-6">
                  {[
                    "Managed Cloud Hosting",
                    "Dedicated Priority Support",
                    "Custom Domain",
                    "Custom Branding",
                    "Automated Cloud Backups",
                    "Advanced Analytics",
                    "Premium Reports",
                    "Team Collaboration",
                    "Organization Workspace",
                    "Faster Infrastructure"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/login" className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2 rounded-lg shadow-sm transition-colors text-center block text-sm">
                Start Commercial
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 — Feature Comparison */}
      <section className="relative h-screen flex flex-col justify-center bg-white border-b border-slate-100 px-6 overflow-hidden">
        <div className="mx-auto max-w-5xl w-full relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Feature Comparison</h2>
            <p className="mt-1 text-slate-600 text-sm">A detailed look at what is included in each version.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full overflow-y-auto max-h-[55vh] rounded-xl border border-slate-100 shadow-sm scrollbar-thin"
          >
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="sticky top-0 bg-slate-50 z-20">
                <tr className="border-b border-slate-100">
                  <th className="py-3 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">Features</th>
                  <th className="py-3 px-6 text-xs font-bold text-slate-600 text-center w-40 uppercase tracking-wider">Open Source</th>
                  <th className="py-3 px-6 text-xs font-bold text-blue-600 text-center w-40 uppercase tracking-wider">Commercial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px]">
                {[
                  { name: "Unlimited Clients & Projects", os: true, comm: true },
                  { name: "Unlimited Invoices & Expenses", os: true, comm: true },
                  { name: "Multi-Currency Invoicing", os: true, comm: true },
                  { name: "AI-Assisted Migration", os: true, comm: true },
                  { name: "Smart Questionnaires", os: true, comm: true },
                  { name: "Dashboard & Analytics", os: true, comm: true },
                  { name: "Global Search", os: true, comm: true },
                  { name: "Self Hosted & Open Source", os: "100%", comm: "Yes" },
                  { name: "Managed Cloud Hosting", os: false, comm: "Fully Managed" },
                  { name: "Support Tier", os: "Community", comm: "Dedicated Priority" },
                  { name: "Custom Domain & Branding", os: false, comm: true },
                  { name: "Automated Backups", os: "Manual", comm: "Cloud Automated" },
                  { name: "Advanced Analytics & Reports", os: "Basic", comm: "Premium" },
                  { name: "Team Collaboration & Roles", os: false, comm: true },
                  { name: "Organization Workspace", os: false, comm: true },
                  { name: "Infrastructure Speed", os: "Self-dependent", comm: "Optimized / Fast" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 px-6 font-medium text-slate-700">{row.name}</td>
                    <td className="py-2.5 px-6 text-center text-slate-500">
                      {typeof row.os === "boolean" ? (
                        row.os ? <Check className="w-4.5 h-4.5 text-emerald-500 mx-auto" /> : <span className="text-slate-300">-</span>
                      ) : (
                        <span className="font-medium text-slate-600">{row.os}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-6 text-center text-slate-900 font-semibold bg-blue-50/20">
                      {typeof row.comm === "boolean" ? (
                        row.comm ? <Check className="w-4.5 h-4.5 text-blue-600 mx-auto" /> : <span className="text-slate-300">-</span>
                      ) : (
                        <span className="text-blue-700">{row.comm}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Why Upgrade? */}
      <section className="relative h-screen flex flex-col justify-center bg-slate-50/50 border-b border-slate-100 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-100/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="mx-auto max-w-5xl w-full relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why Upgrade to Commercial?</h2>
            <p className="mt-1 text-slate-600 text-sm">Focus on your business operations while we manage the complex infrastructure.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
            {[
              { 
                title: "Managed Infrastructure", 
                desc: "Never worry about Node versions, database connections, or updates.", 
                icon: <Server className="w-4.5 h-4.5 text-blue-600" /> 
              },
              { 
                title: "Zero Server Config", 
                desc: "Zero CLI server work. Instant deployment, automated upgrades.", 
                icon: <Cpu className="w-4.5 h-4.5 text-blue-600" /> 
              },
              { 
                title: "Automatic Backups", 
                desc: "Your database is backed up hourly to secure cloud storage.", 
                icon: <Database className="w-4.5 h-4.5 text-blue-600" /> 
              },
              { 
                title: "Premium Support", 
                desc: "Get priority direct support channel response times guaranteed.", 
                icon: <ShieldCheck className="w-4.5 h-4.5 text-blue-600" /> 
              },
              { 
                title: "Advanced Analytics", 
                desc: "Get deep business insight charts and custom ledger exports.", 
                icon: <LineChart className="w-4.5 h-4.5 text-blue-600" /> 
              },
              { 
                title: "Team Collaboration", 
                desc: "Invite teammates, assign granular access control levels.", 
                icon: <Users className="w-4.5 h-4.5 text-blue-600" /> 
              },
              { 
                title: "Faster Performance", 
                desc: "Edge-cached hosting with premium fast infrastructure.", 
                icon: <RefreshCw className="w-4.5 h-4.5 text-blue-600" /> 
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={cn(
                  "bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-default",
                  idx === 6 && "sm:col-span-2 lg:col-span-2"
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{card.title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Open Source Philosophy */}
      <section className="relative h-screen flex flex-col justify-center bg-white border-b border-slate-100 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/20 via-white to-white pointer-events-none" />
        
        <div className="mx-auto max-w-5xl w-full relative z-10 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[12px] font-semibold text-slate-600 mb-4 border border-slate-200">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                Our Code Is Yours
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Open Source Philosophy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                We believe software should serve you, not trap you. Soseki is transparent, customizable, and developer-friendly. You will always have the choice to run the codebase on your own server.
              </p>
              <Link href="https://github.com" target="_blank" className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700 transition-colors text-sm">
                Explore the GitHub Repository <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {[
                { 
                  title: "Own Your Data", 
                  desc: "We do not own your databases. Download, migrate, or backup anytime without permission.",
                  icon: <Database className="w-4.5 h-4.5 text-indigo-500" /> 
                },
                { 
                  title: "No Vendor Lock-In", 
                  desc: "If you decide to leave our cloud server, take the code and host it yourself, instantly.", 
                  icon: <Lock className="w-4.5 h-4.5 text-indigo-500" />
                },
                { 
                  title: "Community Driven", 
                  desc: "Help steer our features roadmap. Contribute code or request direct features.", 
                  icon: <Users className="w-4.5 h-4.5 text-indigo-500" />
                },
                { 
                  title: "Self Hosted", 
                  desc: "Deploy onto Docker, Vercel, Railway, Fly.io, AWS, or local Raspberry Pi.", 
                  icon: <Server className="w-4.5 h-4.5 text-indigo-500" />
                },
                { 
                  title: "Transparent Development", 
                  desc: "Every commit, pull request, discussion, and issue tracker is visible online.", 
                  icon: <Globe className="w-4.5 h-4.5 text-indigo-500" />
                },
                { 
                  title: "Unlimited Freedom", 
                  desc: "Modify features, add plugins, rebrand, or customize the dashboard logic.", 
                  icon: <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-4 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-2 mb-1.5">
                    {item.icon}
                    <h3 className="font-bold text-slate-800 text-[14px]">{item.title}</h3>
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6 — FAQ */}
     

      {/* Section 7 — Final CTA */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-blue-100/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center relative z-10 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Ready to Simplify Your Business?
          </h2>
          
          <p className="text-lg md:text-[21px] text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Start free with the open-source edition or choose Commercial for a fully managed cloud experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/login" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3.5 px-8 rounded-lg shadow-sm transition-colors text-[17px] w-full sm:w-auto text-center">
              Get Started
            </Link>
            <Link href="/docs" className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3.5 px-8 rounded-lg transition-colors text-[17px] w-full sm:w-auto text-center flex items-center justify-center gap-2">
              View Documentation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

function FAQAccordion({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200/80 bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-5 flex items-center justify-between text-left font-bold text-sm text-slate-800 hover:text-slate-900 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
          {q}
        </span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-5 pb-3 pt-0 text-[13px] text-slate-500 leading-relaxed border-t border-slate-50">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
