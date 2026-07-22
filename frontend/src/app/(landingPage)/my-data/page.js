"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Database,
  Server,
  Trash2,
  BrainCircuit,
  Lock,
  Clock,
  Heart
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { APP_EMAILS } from "@/lib/constants";

const MyDataPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const Section = ({ title, children, id }) => (
    <section id={id} className="mb-20 scroll-mt-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-600 rounded-full" />
        {title}
      </h2>
      <div className="text-gray-600 dark:text-gray-400 space-y-6 leading-relaxed text-sm md:text-base pl-3 border-l border-gray-50 dark:border-white/5 ml-0.5">
        {children}
      </div>
    </section>
  );

  const Subtitle = ({ children }) => (
    <p className="font-bold text-gray-900 dark:text-white mt-8 mb-4 uppercase text-xs tracking-widest">
      {children}
    </p>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b]">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        {/* Navigation */}
        <button
          onClick={handleBack}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-blue-600 transition-colors group mb-16 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        {/* Header */}
        <header className="mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/5 text-blue-600 text-xs font-bold mb-6 tracking-wider uppercase">
            <Database className="w-3 h-3" /> Data Transparency
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
            My Data & Storage
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            We believe you deserve complete clarity on where your data lives, how it is processed, and exactly what happens when you leave. Here is the plain-english breakdown of how Soseki handles your business records.
          </p>
          <div className="flex flex-wrap gap-6 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Updated: 21.07.2026
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-4">
          <Section title="1. WHERE YOUR DATA LIVES">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
              <div className="space-y-4">
                <Subtitle>Core Infrastructure</Subtitle>
                <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-600" /> AWS Mumbai & Vercel
                </p>
                <p className="text-xs text-muted-foreground">Our edge network and services are hosted on Vercel (US-based). However, your core business data—including clients, invoices, and projects—is stored securely in a PostgreSQL database hosted on AWS in the <strong>Mumbai (India) region</strong>.<br /><br />You can review their respective privacy protocols here: <a href="https://aws.amazon.com/privacy/" target="_blank" className="text-blue-600 hover:underline">AWS Privacy Policy</a> and <a href="https://vercel.com/legal/privacy-policy" target="_blank" className="text-blue-600 hover:underline">Vercel Privacy Policy</a>.</p>
              </div>
              <div className="space-y-4">
                <Subtitle>Encryption</Subtitle>
                <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" /> Enterprise-grade security
                </p>
                <p className="text-xs text-muted-foreground">Your data is encrypted both in transit (via SSL/TLS) and at rest (using AES-256).</p>
              </div>
            </div>
          </Section>

          <Section title="2. WHAT WE COLLECT & HOW IT'S USED">
            <p>Transparency is key. Here is exactly what happens with the specific data fields you provide to us:</p>
            <div className="space-y-6 mt-6">
              <div className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-widest mb-1 text-blue-600">
                  Request Access Data
                </p>
                <p className="text-sm text-muted-foreground mb-3">When you request access or join our waitlist (Name, Email).</p>
                <p className="text-sm"><strong>Usage:</strong> We only use this information to contact you regarding your access request or critical product updates. We do not sell this list.</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-widest mb-1 text-blue-600">
                  Invoice & Financial Data
                </p>
                <p className="text-sm text-muted-foreground mb-3">When you create invoices, add line items, and log payments.</p>
                <p className="text-sm"><strong>Usage:</strong> This data is strictly used to generate your invoice PDFs, process payments, and calculate internal business metrics (like revenue charts) displayed on your private dashboard.</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-widest mb-1 text-blue-600">
                  Client Submitted Data (Forms)
                </p>
                <p className="text-sm text-muted-foreground mb-3">When your clients fill out questionnaires or intake forms.</p>
                <p className="text-sm"><strong>Usage:</strong> This data is fully encrypted, strictly private, and only accessible by you (the workspace owner). It is safely stored in our AWS Mumbai database and never exposed publicly.</p>
              </div>
            </div>
          </Section>

          <Section title="3. THIRD-PARTY SERVICES">
            <p>
              Soseki relies on a few carefully selected third-party tools to keep the platform running efficiently. We share the absolute minimum amount of data required to provide you with a functional service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="font-bold text-gray-900 dark:text-white text-[10px] uppercase tracking-widest mb-2 text-blue-600">
                  Analytics & Telemetry
                </p>
                <p className="text-sm">We use services like Google Analytics or PostHog to understand how the application is used so we can fix bugs and improve the user experience. This data is anonymized.</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="font-bold text-gray-900 dark:text-white text-[10px] uppercase tracking-widest mb-2 text-blue-600">
                  No Data Brokers
                </p>
                <p className="text-sm">We do not sell, rent, or distribute your client lists, financial data, or business metrics to any advertising platforms or data brokers.</p>
              </div>
            </div>
          </Section>

          <Section title="4. DATA DELETION & RETENTION">
            <p>
              You own your data. When you decide to leave Soseki, we do not want to hold your records hostage. There are two major ways you can permanently delete your account:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-widest mb-2 text-blue-600">
                  Method 1: Self-Service
                </p>
                <p className="text-sm">You can instantly delete your account by navigating to your system settings in the dashboard at <a href="https://soseki.app/dashboard/workspace/system" className="text-blue-600 hover:underline break-all">soseki.app/dashboard/workspace/system</a>.</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-widest mb-2 text-blue-600">
                  Method 2: Contact Support
                </p>
                <p className="text-sm">If you prefer, you can use our <a href="/contact" className="text-blue-600 hover:underline">Contact Form</a> or email us directly at <a href={`mailto:${APP_EMAILS[0]?.value}`} className="text-blue-600 hover:underline">{APP_EMAILS[0]?.value}</a> with your deletion request.</p>
              </div>
            </div>

            <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/10 mt-6">
              <p className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-tight text-xs">
                <Trash2 className="w-4 h-4" /> Immediate Deletion Protocol
              </p>
              <p className="text-sm text-red-900/70 dark:text-red-200/70">
                When you delete your Soseki account, your profile, clients, projects, invoices, payments, and all custom settings are <strong>deleted immediately and permanently</strong> from our databases. 
                <br /><br />
                We do not hold on to any of your data after you choose to leave. Your business data is yours, and deleting it means it is gone forever.
              </p>
            </div>
          </Section>

          <Section title="5. ARTIFICIAL INTELLIGENCE">
            <div className="flex gap-4 p-5 rounded-2xl border border-blue-600/10 bg-blue-600/5">
              <BrainCircuit className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm mb-2 uppercase tracking-tight">
                  No AI Training on Your Data
                </p>
                <p className="text-sm leading-relaxed">
                  Your user data, client lists, and financial information are <strong>strictly private</strong>. We guarantee that your personal business data is <strong>never</strong> fed into Large Language Models (LLMs) or used to train any AI systems, either internally or by third parties.
                </p>
              </div>
            </div>
          </Section>

          <Section title="6. LIABILITY & AGREEMENTS">
            <div className="p-6 bg-gray-50/50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
              <p className="text-sm leading-relaxed mb-4 text-gray-600 dark:text-gray-400">
                While we implement strict encryption and rely on world-class infrastructure to manage and protect your data, the internet is never 100% secure. By choosing to create an account and use the platform, you acknowledge that the creators of Soseki are not legally liable for data breaches or infrastructure failures outside of our direct control.
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                For a complete understanding of your rights and our limitations of liability, please review our <a href="/terms" className="text-blue-600 hover:underline font-bold">Terms of Service</a> and full <a href="/privacy-policy" className="text-blue-600 hover:underline font-bold">Privacy Policy</a>.
              </p>
            </div>
          </Section>

          <div className="mt-40 text-center pb-20">
            <Heart className="w-6 h-6 text-blue-600/20 mx-auto mb-8 animate-pulse" />
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-1">
              SOSEKI OPEN SOURCE PROJECT
            </p>
            <p className="text-[9px] text-gray-400 font-medium tracking-widest">
              EST. 2026 • MIT LICENSE
            </p>
            <p className="text-[8px] text-gray-400/50 mt-4 uppercase tracking-widest">
              © 2026 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyDataPage;
