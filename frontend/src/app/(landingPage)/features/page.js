"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Calculator, FileText, CreditCard, Users, Briefcase, FileJson, Sparkles, LineChart, Search, Building2, MessageSquare, Code, Server, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { CurrencyIntegration } from "@/components/currency-integration";
import { InvoiceWidget, ExpenseWidget, PaymentWidget } from "@/components/landing/financial-widgets";
import { ClientPortalWidget, ClientManagementWidget, ProjectManagementWidget } from "@/components/landing/client-widgets";
import { AiMigrationWidget, AiFormWidget } from "@/components/landing/ai-widgets";
import { DashboardWidget, SearchWidget } from "@/components/landing/insight-widgets";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfd] text-[#09090b] font-sans selection:bg-blue-200 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 max-w-4xl mx-auto">
            Global billing with <span className="text-[#2563eb]">zero friction</span>
          </h1>

          <p className="text-[17px] text-slate-600 mb-16 max-w-3xl mx-auto">
            Multi-currency invoicing, automatic live exchange rates, and accurate reporting for your service business.
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
                description: "Create invoices in multiple currencies while Soseki automatically fetches live exchange rates and keeps every financial metric synchronized with your workspace's base currency.",
                visual: <InvoiceWidget />,
                features: ["Live exchange rates", "Multi-currency invoices", "Automatic conversion", "Tax support", "Professional PDF invoices", "Payment tracking"],
                icon: <FileText className="w-6 h-6 text-emerald-500" />
              },
              {
                title: "Expense Management",
                description: "Track every business expense and associate it with clients, projects, or invoices while maintaining complete financial visibility.",
                visual: <ExpenseWidget />,
                features: ["Expense tracking", "Printable receipts", "Multi-currency expenses", "Expense categories", "Financial reports"],
                icon: <Calculator className="w-6 h-6 text-emerald-500" />
              },
              {
                title: "Payment Management",
                description: "Keep a complete history of every payment received and monitor outstanding balances across your organization.",
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
                description: "Give your clients a secure portal where they can pay you directly—with zero middleman platform fees.",
                visual: <ClientPortalWidget />,
                features: ["Zero middleman fees", "Direct payments", "Secure portal", "Invoice history"],
                icon: <ShieldCheck className="w-6 h-6 text-blue-500" />
              },
              {
                title: "Client Management",
                description: "Manage every client relationship from the first conversation to the final invoice inside one centralized workspace.",
                visual: <ClientManagementWidget />,
                features: ["Client profiles", "Contact information", "Activity history", "Client timeline", "Linked invoices", "Linked projects"],
                icon: <Users className="w-6 h-6 text-blue-500" />
              },
              {
                title: "Project Management",
                description: "Organize projects, monitor progress, manage deadlines, and connect every project with invoices, expenses, and questionnaires.",
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
                description: "Move your existing business data from spreadsheets, PDFs, QuickBooks, CSV files, or Excel with AI-assisted migration.",
                visual: <AiMigrationWidget />,
                features: ["PDF import", "CSV import", "Excel import", "AI JSON conversion", "Bulk migration"],
                icon: <FileJson className="w-6 h-6 text-purple-500" />
              },
              {
                title: "AI Questionnaire Builder",
                description: "Generate professional client onboarding forms, project briefs, and surveys using AI or the built-in drag-and-drop builder.",
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
                description: "Monitor the health of your business with real-time insights and financial analytics.",
                visual: <DashboardWidget />,
                features: ["Revenue overview", "Expense analytics", "Profit tracking", "KPI cards", "Charts", "Business metrics"],
                icon: <LineChart className="w-6 h-6 text-orange-500" />
              },
              {
                title: "Global Search",
                description: "Find clients, invoices, projects, payments, expenses, and more instantly from one universal search.",
                visual: <SearchWidget />,
                features: ["Instant search", "Keyboard shortcut", "Smart filtering", "Fast results"],
                icon: <Search className="w-6 h-6 text-orange-500" />
              }
            ]}
          />

    

        </div>
      </section>

      {/* Why Choose Soseki */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Why Choose Soseki</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join modern teams that have switched to Soseki for a better way to work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {[
              "Replace multiple SaaS subscriptions",
              "Save operational costs",
              "Own your data",
              "AI-powered workflows",
              "Built for freelancers and agencies",
              "Open-source flexibility",
              "Modern technology stack",
              "Scalable architecture",
              "Beautiful user experience",
              "Fast performance"
            ].map((reason, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">Ready to Simplify Your Business?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Join freelancers, agencies, and growing businesses using Soseki to manage clients, projects, finances, and workflows—all from one powerful open-source platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors text-[17px] w-full sm:w-auto text-center">
              Get Started
            </Link>
            <Link href="/docs" className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 px-8 rounded-lg transition-colors text-[17px] w-full sm:w-auto text-center">
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FeatureCategory({ title, badge, icon, badgeColor, blocks, reverse }) {
  return (
    <div className="flex flex-col">
      <div className={cn("flex flex-col md:flex-row gap-12 lg:gap-24", reverse && "md:flex-row-reverse")}>

        {/* Category Header (Sticky Sidebar style) */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="sticky top-24">
            <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border", badgeColor)}>
              {icon}
              {badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{title}</h2>
          </div>
        </div>

        {/* Feature Blocks */}
        <div className="w-full md:w-2/3 space-y-8">
          {blocks.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {block.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{block.title}</h3>
              </div>

              <p className="text-slate-600 mb-8 leading-relaxed">
                {block.description}
              </p>

              {block.visual && (
                <div className="mt-2 mb-4 w-full flex items-center justify-center">
                  {block.visual}
                </div>
              )}

              {!block.visual && block.features && block.features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  {block.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
