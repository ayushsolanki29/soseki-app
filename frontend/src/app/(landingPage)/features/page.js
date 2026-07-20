"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Calculator, FileText, CreditCard, Users, Briefcase, FileJson, Sparkles, LineChart, Search, Building2, MessageSquare, Code, Server, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfd] text-[#09090b] font-sans selection:bg-blue-200 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[13px] font-medium text-blue-600 mb-6 border border-blue-100/50">
            <Sparkles className="w-3.5 h-3.5" />
            Complete Business Workspace
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
            Everything You Need to Run Your Service Business
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Soseki brings together clients, projects, invoices, payments, expenses, AI automation, and business analytics into one powerful open-source workspace. Replace scattered tools with a single platform built for freelancers, agencies, and growing service businesses.
          </p>
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
                features: ["Live exchange rates", "Multi-currency invoices", "Automatic conversion", "Tax support", "Professional PDF invoices", "Payment tracking"],
                icon: <FileText className="w-6 h-6 text-emerald-500" />
              },
              {
                title: "Expense Management",
                description: "Track every business expense and associate it with clients, projects, or invoices while maintaining complete financial visibility.",
                features: ["Expense tracking", "Printable receipts", "Multi-currency expenses", "Expense categories", "Financial reports"],
                icon: <Calculator className="w-6 h-6 text-emerald-500" />
              },
              {
                title: "Payment Management",
                description: "Keep a complete history of every payment received and monitor outstanding balances across your organization.",
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
                title: "Client Management",
                description: "Manage every client relationship from the first conversation to the final invoice inside one centralized workspace.",
                features: ["Client profiles", "Contact information", "Activity history", "Client timeline", "Linked invoices", "Linked projects"],
                icon: <Users className="w-6 h-6 text-blue-500" />
              },
              {
                title: "Project Management",
                description: "Organize projects, monitor progress, manage deadlines, and connect every project with invoices, expenses, and questionnaires.",
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
                features: ["PDF import", "CSV import", "Excel import", "AI JSON conversion", "Bulk migration"],
                icon: <FileJson className="w-6 h-6 text-purple-500" />
              },
              {
                title: "AI Questionnaire Builder",
                description: "Generate professional client onboarding forms, project briefs, and surveys using AI or the built-in drag-and-drop builder.",
                features: ["AI form generation", "Drag & Drop Builder", "Public forms", "Response collection", "Export responses"],
                icon: <Sparkles className="w-6 h-6 text-purple-500" />
              }
            ]}
          />

          {/* 4. Business Intelligence */}
          <FeatureCategory
            title="Business Intelligence"
            badge="Analytics"
            icon={<LineChart className="w-5 h-5 text-orange-600" />}
            badgeColor="text-orange-700 bg-orange-50 border-orange-100"
            reverse
            blocks={[
              {
                title: "Dashboard & Analytics",
                description: "Monitor the health of your business with real-time insights and financial analytics.",
                features: ["Revenue overview", "Expense analytics", "Profit tracking", "KPI cards", "Charts", "Business metrics"],
                icon: <LineChart className="w-6 h-6 text-orange-500" />
              },
              {
                title: "Global Search",
                description: "Find clients, invoices, projects, payments, expenses, and more instantly from one universal search.",
                features: ["Instant search", "Keyboard shortcut", "Smart filtering", "Fast results"],
                icon: <Search className="w-6 h-6 text-orange-500" />
              }
            ]}
          />

          {/* 5. Collaboration */}
          <FeatureCategory
            title="Collaboration"
            badge="Team"
            icon={<Building2 className="w-5 h-5 text-indigo-600" />}
            badgeColor="text-indigo-700 bg-indigo-50 border-indigo-100"
            blocks={[
              {
                title: "Team Workspace",
                description: "Invite your team and manage your organization from one secure workspace.",
                features: ["Multiple users", "Workspace settings", "Organization management", "Shared workspace"],
                icon: <Building2 className="w-6 h-6 text-indigo-500" />
              },
              {
                title: "Support Center",
                description: "Communicate directly with the Soseki team using the built-in support system.",
                features: ["Support tickets", "Conversation threads", "Status updates", "Ticket history"],
                icon: <MessageSquare className="w-6 h-6 text-indigo-500" />
              }
            ]}
          />

          {/* 6. Security & Ownership */}
          <FeatureCategory
            title="Security & Ownership"
            badge="Trust"
            icon={<ShieldCheck className="w-5 h-5 text-slate-600" />}
            badgeColor="text-slate-700 bg-slate-100 border-slate-200"
            reverse
            blocks={[
              {
                title: "Open Source",
                description: "Soseki is fully open-source, giving you complete transparency and freedom.",
                features: ["Open source", "Community driven", "Transparent development", "No vendor lock-in"],
                icon: <Code className="w-6 h-6 text-slate-500" />
              },
              {
                title: "Self Hosted",
                description: "Deploy Soseki on your own infrastructure and maintain complete ownership of your business data.",
                features: ["Self hosting", "PostgreSQL database", "Unlimited users", "Complete data ownership"],
                icon: <Server className="w-6 h-6 text-slate-500" />
              },
              {
                title: "Secure Authentication",
                description: "Enterprise-ready authentication built with modern security practices.",
                features: ["JWT authentication", "httpOnly cookies", "Secure sessions", "Protected routes"],
                icon: <ShieldCheck className="w-6 h-6 text-slate-500" />
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
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow group"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {block.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
