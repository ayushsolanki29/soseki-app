"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Calculator, FileText, CreditCard, Users, Briefcase, FileJson, Sparkles, LineChart, Search, Building2, MessageSquare, Code, Server, ShieldCheck, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { WidgetSkeleton, HeroWidgetSkeleton } from "@/components/landing/widget-skeleton";
import { CallToAction } from "@/components/cta";

const CurrencyIntegration = dynamic(() => import("@/components/currency-integration").then(mod => mod.CurrencyIntegration), { loading: () => <HeroWidgetSkeleton />, ssr: false });

const InvoiceWidget = dynamic(() => import("@/components/landing/financial-widgets").then(mod => mod.InvoiceWidget), { loading: () => <WidgetSkeleton />, ssr: false });
const ExpenseWidget = dynamic(() => import("@/components/landing/financial-widgets").then(mod => mod.ExpenseWidget), { loading: () => <WidgetSkeleton />, ssr: false });
const PaymentWidget = dynamic(() => import("@/components/landing/financial-widgets").then(mod => mod.PaymentWidget), { loading: () => <WidgetSkeleton />, ssr: false });

const ClientPortalWidget = dynamic(() => import("@/components/landing/client-widgets").then(mod => mod.ClientPortalWidget), { loading: () => <WidgetSkeleton />, ssr: false });
const ClientManagementWidget = dynamic(() => import("@/components/landing/client-widgets").then(mod => mod.ClientManagementWidget), { loading: () => <WidgetSkeleton />, ssr: false });
const ProjectManagementWidget = dynamic(() => import("@/components/landing/client-widgets").then(mod => mod.ProjectManagementWidget), { loading: () => <WidgetSkeleton />, ssr: false });

const AiMigrationWidget = dynamic(() => import("@/components/landing/ai-widgets").then(mod => mod.AiMigrationWidget), { loading: () => <WidgetSkeleton />, ssr: false });
const AiFormWidget = dynamic(() => import("@/components/landing/ai-widgets").then(mod => mod.AiFormWidget), { loading: () => <WidgetSkeleton />, ssr: false });

const DashboardWidget = dynamic(() => import("@/components/landing/insight-widgets").then(mod => mod.DashboardWidget), { loading: () => <WidgetSkeleton />, ssr: false });
const SearchWidget = dynamic(() => import("@/components/landing/insight-widgets").then(mod => mod.SearchWidget), { loading: () => <WidgetSkeleton />, ssr: false });

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfd] text-[#09090b] font-sans selection:bg-blue-200 flex flex-col overflow-x-clip">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 max-w-4xl mx-auto">
            Run the financial side of your business <span className="text-[#2563eb]">without the busywork</span>
          </h1>

          <p className="text-base sm:text-[17px] text-slate-600 mb-10 md:mb-16 max-w-3xl mx-auto px-2 sm:px-0">
            Multi currency invoicing, live exchange rates, and reporting that actually reflects what is happening in your business.
          </p>

          <CurrencyIntegration />
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-5xl px-6 space-y-32">

          {/* 1. Financial Management */}
          <FeatureCategory
            title="Financial Management"
            badge="Finances"
            icon={<Calculator className="w-5 h-5 text-emerald-600" />}
            badgeColor="text-emerald-700 bg-emerald-50 border-emerald-100"
            blocks={[
              {
                title: "Multi-Currency Invoicing",
                description: "Send invoices in whatever currency your client pays in. Soseki pulls live exchange rates automatically and keeps your dashboard synced to your home currency, so the numbers always add up.",
                visual: <InvoiceWidget />,
                features: ["Live exchange rates", "Multi-currency invoices", "Automatic conversion", "Tax support", "Professional PDF invoices", "Payment tracking"],
                icon: <FileText className="w-6 h-6 text-emerald-500" />
              },
              {
                title: "Expense Management",
                description: "Track what you spend and tie each expense to a client, a project, or an invoice, so you always know where the money went.",
                visual: <ExpenseWidget />,
                features: ["Expense tracking", "Printable receipts", "Multi-currency expenses", "Expense categories", "Financial reports"],
                icon: <Calculator className="w-6 h-6 text-emerald-500" />
              },
              {
                title: "Payment Management",
                description: "See every payment that's come in and what's still outstanding, all in one place.",
                visual: <PaymentWidget />,
                features: ["Payment history", "Outstanding invoices", "Payment timeline", "Financial ledger"],
                icon: <CreditCard className="w-6 h-6 text-emerald-500" />
              }
            ]}
          />

          {/* 2. Client & Project Management */}
          <FeatureCategory
            title="Client & Project Management"
            badge="Workspace"
            icon={<Users className="w-5 h-5 text-blue-600" />}
            badgeColor="text-blue-700 bg-blue-50 border-blue-100"
            reverse
            blocks={[
              {
                title: "Direct Client Portal",
                description: "Give your clients a secure portal where they can pay you directly, with zero middleman platform fees.",
                visual: <ClientPortalWidget />,
                features: ["Zero middleman fees", "Direct payments", "Secure portal"],
                icon: <ShieldCheck className="w-6 h-6 text-blue-500" />
              },
              {
                title: "Client Management",
                description: "Keep every client relationship in one place, from the first message to the final invoice.",
                visual: <ClientManagementWidget />,
                features: ["Client profiles", "Contact information", "Activity history", "Client timeline", "Linked invoices", "Linked projects"],
                icon: <Users className="w-6 h-6 text-blue-500" />
              },
              {
                title: "Project Management",
                description: "Track progress, deadlines, and every invoice, expense, or form tied to a project, all from one place.",
                visual: <ProjectManagementWidget />,
                features: ["Project tracking", "Status management", "Deadlines", "Timeline", "Linked financial records"],
                icon: <Briefcase className="w-6 h-6 text-blue-500" />
              }
            ]}
          />

          {/* 3. AI Productivity */}
          <FeatureCategory
            title="AI Productivity"
            badge="Intelligence"
            icon={<Sparkles className="w-5 h-5 text-purple-600" />}
            badgeColor="text-purple-700 bg-purple-50 border-purple-100"
            blocks={[
              {
                title: "AI Data Migration",
                description: "Move your existing data over from spreadsheets, PDFs, QuickBooks, or CSV exports. The AI maps the fields and currencies for you.",
                visual: <AiMigrationWidget />,
                features: ["PDF import", "CSV import", "Excel import", "AI JSON conversion", "Bulk migration"],
                icon: <FileJson className="w-6 h-6 text-purple-500" />
              },
              {
                title: "AI Questionnaire Builder",
                description: "Generate client onboarding forms, project briefs, or surveys with a prompt, or build them yourself with the drag and drop builder.",
                visual: <AiFormWidget />,
                features: ["AI form generation", "Drag & Drop Builder", "Public forms", "Response collection", "Export responses"],
                icon: <Sparkles className="w-6 h-6 text-purple-500" />
              }
            ]}
          />

          {/* 4. Insights & Navigation */}
          <FeatureCategory
            title="Insights & Navigation"
            badge="Analytics"
            icon={<LineChart className="w-5 h-5 text-orange-600" />}
            badgeColor="text-orange-700 bg-orange-50 border-orange-100"
            reverse
            blocks={[
              {
                title: "Dashboard & Analytics",
                description: "See revenue, profit, and expenses at a glance, so you know how the business is actually doing without digging through invoices.",
                visual: <DashboardWidget />,
                features: ["Revenue overview", "Expense analytics", "Profit tracking", "KPI cards", "Charts", "Business metrics"],
                icon: <LineChart className="w-6 h-6 text-orange-500" />
              },
              {
                title: "Global Search",
                description: "Find any client, invoice, project, payment, or expense in one search, no matter where it lives in your workspace.",
                visual: <SearchWidget />,
                features: ["Instant search", "Keyboard shortcut", "Smart filtering", "Fast results"],
                icon: <Search className="w-6 h-6 text-orange-500" />
              }
            ]}
          />
        </div>
      </section>

      {/* Why Choose Soseki - Bento Grid */}
      <section className="py-16 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">Why freelancers and small agencies use Soseki</h2>
            <p className="text-base md:text-[17px] text-slate-600 max-w-2xl mx-auto px-2 md:px-0">
              Everything you need to run a service business, in one open source tool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: All in one */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-blue-200 transition-colors"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl group-hover:bg-blue-200 transition-colors" />
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Replace multiple SaaS subscriptions</h3>
              <p className="text-slate-600 max-w-sm text-sm md:text-base">Stop paying for separate invoicing, CRM, project management, and form tools. Soseki brings all of it into one place.</p>
            </motion.div>

            {/* Bento Card 2: Open Source */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 relative z-10">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">Built in the open</h3>
              <p className="text-slate-400 relative z-10 text-sm">The code is open source under the MIT license. Read it, see exactly how your data is handled, and know the project does not disappear if a company decides to shut it down.</p>
            </motion.div>

            {/* Bento Card 3: Performance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-emerald-200 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-2">Fast by design</h3>
              <p className="text-emerald-700/80 text-sm">Built on a modern stack so pages load quickly and nothing feels like it's catching up to you.</p>
            </motion.div>

            {/* Bento Card 4: AI Powered */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl p-6 md:p-8 relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center justify-center mb-6">
                <Server className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-950 mb-2">AI handles the busywork</h3>
              <p className="text-purple-800/70 max-w-sm text-sm md:text-base">From migrating your old spreadsheets to drafting client questionnaires, AI takes care of the setup work so you can get to the actual job faster.</p>
            </motion.div>

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

function FeatureCategory({ title, badge, icon, badgeColor, blocks, reverse }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBlock = blocks[activeIndex];

  return (
    <div className="flex flex-col">
      {/* Mobile Layout: Stacked */}
      <div className="md:hidden flex flex-col space-y-12">
        <div>
          <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border", badgeColor)}>
            {icon}
            {badge}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{title}</h2>
        </div>
        
        <div className="space-y-8">
          {blocks.map((block, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {block.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{block.title}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {block.description}
              </p>
              {block.visual && (
                <div className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-4 overflow-hidden shadow-sm flex items-center justify-center">
                  <div className="scale-[0.85] origin-center w-full flex justify-center">
                    {block.visual}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout: Interactive Tabs */}
      <div className={cn("hidden md:flex gap-12 lg:gap-24", reverse && "flex-row-reverse")}>
        
        {/* Left Side: Category Header & Tab List */}
        <div className="w-1/3 flex-shrink-0 flex flex-col relative">
          <div className="sticky top-24">
            <div className="mb-10">
              <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border", badgeColor)}>
                {icon}
                {badge}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
            </div>

            <div className="flex flex-col w-full">
              {blocks.map((block, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "text-left py-6 border-b-2 transition-all duration-300 group flex flex-col gap-3 relative",
                      isActive ? "border-blue-600" : "border-b border-slate-200 hover:border-slate-400"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className={cn(
                        "text-lg lg:text-xl font-bold transition-colors duration-300",
                        isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                      )}>
                        {block.title}
                      </h3>
                    </div>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-600 text-sm lg:text-base leading-relaxed pb-2">
                            {block.description}
                          </p>
                          
                          {block.features && block.features.length > 0 && !block.visual && (
                            <div className="grid grid-cols-1 gap-2 mt-4">
                              {block.features.map((feature, j) => (
                                <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                                  <Check className="w-4 h-4 text-blue-500 shrink-0" />
                                  <span className="font-medium">{feature}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Showcase Area */}
        <div className="w-2/3 relative">
          <div className="sticky top-24 w-full aspect-[4/3] max-h-[600px] bg-slate-50/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-4 lg:p-12 shadow-sm flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-100 via-slate-50/10 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                {activeBlock.visual ? (
                  activeBlock.visual
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-4 shadow-sm">
                      {activeBlock.icon}
                    </div>
                    <p className="text-sm font-medium">No visual available</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
