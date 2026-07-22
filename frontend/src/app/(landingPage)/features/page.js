"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Calculator, FileText, CreditCard, Users, Briefcase, FileJson, Sparkles, LineChart, Search, Building2, MessageSquare, Code, Server, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
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
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 max-w-4xl mx-auto">
            Bill in whatever currency your <span className="text-[#2563eb]">client actually pays in</span>
          </h1>

          <p className="text-[17px] text-slate-600 mb-16 max-w-3xl mx-auto">
            If your clients are in Berlin, London, and New York, you should not have to do the exchange rate math yourself.
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
                description: "Keep track of every client detail, from contact info to their entire billing history, without digging through old emails.",
                visual: <ClientManagementWidget />,
                features: ["Client profiles", "Contact information", "Activity history", "Client timeline", "Linked invoices", "Linked projects"],
                icon: <Users className="w-6 h-6 text-blue-500" />
              },
              {
                title: "Project Management",
                description: "Track deadlines and attach invoices, expenses, and forms directly to the project they belong to.",
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
                description: "Stop wasting days on manual data entry. Paste your old spreadsheets or PDFs into the AI tool to bring your clients and projects over instantly.",
                visual: <AiMigrationWidget />,
                features: ["PDF import", "CSV import", "Excel import", "AI JSON conversion", "Bulk migration"],
                icon: <FileJson className="w-6 h-6 text-purple-500" />
              },
              {
                title: "AI Questionnaire Builder",
                description: "Use the drag and drop builder to make public forms, or just paste your questions into ChatGPT and let it build the form for you.",
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
                description: "See your actual revenue, expenses, and profit at a glance without having to maintain a separate spreadsheet.",
                visual: <DashboardWidget />,
                features: ["Revenue overview", "Expense analytics", "Profit tracking", "KPI cards", "Charts", "Business metrics"],
                icon: <LineChart className="w-6 h-6 text-orange-500" />
              },
              {
                title: "Global Search",
                description: "Hit a keyboard shortcut and find any invoice, client, or project instantly, no matter where you are in the app.",
                visual: <SearchWidget />,
                features: ["Instant search", "Keyboard shortcut", "Smart filtering", "Fast results"],
                icon: <Search className="w-6 h-6 text-orange-500" />
              }
            ]}
          />
        </div>
      </section>

      {/* Why Choose Soseki - Bento Grid */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Why modern teams choose Soseki</h2>
            <p className="text-[17px] text-slate-600 max-w-2xl mx-auto">
              Everything you need to run your service business, packaged into one beautiful, open-source platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: All in one */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 relative overflow-hidden group hover:border-blue-200 transition-colors"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl group-hover:bg-blue-200 transition-colors" />
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Replace multiple subscriptions</h3>
              <p className="text-slate-600 max-w-sm">Stop juggling separate invoicing, CRM, and project tools. Soseki puts them in one place.</p>
            </motion.div>

            {/* Bento Card 2: Open Source */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 relative z-10">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">Open source freedom</h3>
              <p className="text-slate-400 relative z-10 text-sm">Own your data forever and read or contribute to the exact codebase running your business.</p>
            </motion.div>

            {/* Bento Card 3: Performance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-200 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-2">Lightning fast performance</h3>
              <p className="text-emerald-700/80 text-sm">Built to be fast so you can get in, do what you need to do, and get back to your real work.</p>
            </motion.div>

            {/* Bento Card 4: AI Powered */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center justify-center mb-6">
                <Server className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-950 mb-2">Automated workflows</h3>
              <p className="text-purple-800/70 max-w-sm">Let AI handle the boring data entry and form building so you can focus on billable hours.</p>
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
  return (
    <div className="flex flex-col">
      <div className={cn("flex flex-col md:flex-row gap-12 lg:gap-24", reverse && "md:flex-row-reverse")}>

        {/* Category Header (Sticky Sidebar style) */}
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/3 flex-shrink-0"
        >
          <div className="sticky top-24">
            <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border", badgeColor)}>
              {icon}
              {badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{title}</h2>
          </div>
        </motion.div>

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
