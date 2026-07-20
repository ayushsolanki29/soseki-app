"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  RefreshCw,
  Heart,
  Lock,
  Eye,
  Database,
  Globe,
  Scale,
  Cookie,
  UserCheck,
  FileText,
  Mail,
  MapPin,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const PrivacyPolicyPage = () => {
  const router = useRouter();

  const effectiveDate = "03.02.2026";
  const lastUpdatedDate = "03.02.2026";
  const legalEntity = "Soseki Open Source Project";
  const websiteUrl = "soseki.app";

  const handleBack = () => {
    router.back();
  };

  const Section = ({ title, children, id }) => (
    <section id={id} className="mb-20 scroll-mt-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight flex items-center gap-2">
        <div className="w-1 h-6 bg-primary rounded-full" />
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
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group mb-16 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        {/* Header */}
        <header className="mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold mb-6 tracking-wider uppercase">
            <ShieldCheck className="w-3 h-3" /> DPDP Compliant
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            Protecting your personal data is our primary commitment. This policy explains how we collect, use, and safe-guard your information in compliance with the Digital Personal Data Protection Act, 2023.
          </p>
          <div className="flex flex-wrap gap-6 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Effective: {effectiveDate}
            </span>
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Updated: {lastUpdatedDate}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-4">
          <Section title="1. INTRODUCTION">
            <p>
              Soseki (developed by {legalEntity}) explains how we collect, use, store, and protect your personal data in compliance with the{" "}
              <strong>Digital Personal Data Protection Act, 2023 ("DPDP Act")</strong> and other applicable laws of India.
            </p>
            <p>
              Consent is obtained through explicit affirmative action while using our website ({websiteUrl}) or services.
            </p>
          </Section>

          <Section title="2. DATA FIDUCIARY INFORMATION">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
              <div className="space-y-4">
                <Subtitle>Legal Entity</Subtitle>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{legalEntity}</p>
                <p className="text-xs text-muted-foreground">Remote-first Open Source Project</p>
              </div>
              <div className="space-y-4">
                <Subtitle>Grievance Officer</Subtitle>
                <p className="text-sm font-bold text-primary">hello@soseki.app</p>
                <p className="text-xs text-muted-foreground">Response Time: Within 72 hours</p>
              </div>
            </div>
          </Section>

          <Section title="4. PERSONAL DATA WE COLLECT">
            <Subtitle>4.1 Information You Provide Directly</Subtitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Account Registration", d: "Name, email, and encrypted password." },
                { t: "Workspace Details", d: "Workspace name, member emails, and custom settings." },
                { t: "Billing Data", d: "Transaction IDs and billing info. We do NOT store card details." },
                { t: "Files & Documents", d: "Any files, logos, or attachments you upload to your workspace." },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <p className="font-bold text-gray-900 dark:text-white text-[10px] uppercase tracking-widest mb-2 text-primary">
                    {item.t}
                  </p>
                  <p className="text-sm">{item.d}</p>
                </div>
              ))}
            </div>

            <Subtitle>4.2 Information Collected Automatically</Subtitle>
            <p className="text-sm">
              We collect device identifiers, IP addresses, browser versions, and usage patterns to optimize Platform performance and security.
            </p>

            <Subtitle>4.5 Children's Data</Subtitle>
            <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/10">
              <p className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-tight text-xs">
                <AlertTriangle className="w-4 h-4" /> WE DO NOT KNOWINGLY COLLECT DATA FROM PERSONS UNDER 18
              </p>
              <p className="text-xs text-red-600/70">
                If we become aware that data of a minor has been collected without verifiable parental consent, we will take immediate steps to secure and delete such information.
              </p>
            </div>
          </Section>

          <Section title="5. HOW WE USE YOUR PERSONAL DATA">
            <div className="space-y-4">
              <p>
                <strong>5.1 Service Delivery:</strong> Run your workspace, manage client/project data, send confirmations, and deliver invoices and files.
              </p>
              <p>
                <strong>5.2 Service Improvement:</strong> Analyze diagnostics to fix bugs, optimize performance, and improve usability.
              </p>
              <p>
                <strong>5.4 Communication:</strong> Send updates, security alerts, and support responses with your consent.
              </p>
            </div>
          </Section>

          <Section title="6. DATA SHARING AND DISCLOSURE">
            <Subtitle>6.1 With Service Providers</Subtitle>
            <ul className="space-y-3 text-sm">
              <li>• <strong>Cloud Infrastructure:</strong> Secure cloud server and database hosting</li>
              <li>• <strong>CDN & Security:</strong> Protection against DDoS attacks and fast asset delivery</li>
              <li>• <strong>Email Services:</strong> Secure delivery of transactional emails</li>
            </ul>
            <Subtitle>6.7 Our Stance on Privacy</Subtitle>
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="px-3 py-1 rounded-full bg-primary/5">No Selling of Data</span>
              <span className="px-3 py-1 rounded-full bg-primary/5">No Data Brokers</span>
              <span className="px-3 py-1 rounded-full bg-primary/5">Full Data Ownership</span>
            </div>
          </Section>

          <Section title="8. DATA RETENTION">
            <div className="space-y-4 text-sm">
              <p className="flex justify-between border-b border-gray-50 dark:border-white/5 py-2">
                <span>Account Information</span>
                <span className="font-bold text-gray-900 dark:text-white">Until account deletion</span>
              </p>
              <p className="flex justify-between border-b border-gray-50 dark:border-white/5 py-2">
                <span>Workspace Data</span>
                <span className="font-bold text-gray-900 dark:text-white">Until deleted by workspace owner</span>
              </p>
              <p className="flex justify-between border-b border-gray-50 dark:border-white/5 py-2">
                <span>System Logs</span>
                <span className="font-bold text-gray-900 dark:text-white">30 days</span>
              </p>
            </div>
          </Section>

          <Section title="9. DATA SECURITY">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { i: Lock, t: "Encryption", d: "SSL/TLS transit and AES-256 resting bit encryption." },
                { i: Shield, t: "Infrastructure", d: "Secured cloud databases with regular security updates." },
                { i: UserCheck, t: "Access Control", d: "Role-based permissions for workspace members." },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <item.i className="w-5 h-5 text-primary" />
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{item.t}</p>
                  <p className="text-xs text-muted-foreground">{item.d}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="10. YOUR RIGHTS">
            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-2xl border border-primary/10 bg-primary/5">
                <Database className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1 uppercase tracking-tight">
                    Self-Service Portability
                  </p>
                  <p className="text-sm">
                    Login to your dashboard to <strong>Access, Export, or Correct</strong> your data immediately.
                  </p>
                </div>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm list-disc pl-5">
                <li>Right to Access & Export data</li>
                <li>Right to Correction & Updates</li>
                <li>Right to Erasure (Account Deletion)</li>
                <li>Right to Nominate / Restrict processing</li>
                <li>Right to Withdraw Consent</li>
                <li>Right to Data Portability</li>
              </ul>
            </div>
          </Section>

          <Section title="15. CONTACT INFORMATION">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-sm font-semibold text-gray-900 dark:text-white">
                  <Mail className="w-4 h-4 text-primary" /> hello@soseki.app
                </p>
                <p className="flex items-center gap-3 text-sm font-semibold text-gray-900 dark:text-white">
                  <Mail className="w-4 h-4 text-primary" /> help@soseki.app
                </p>
              </div>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-sm font-semibold text-gray-900 dark:text-white">
                  <MapPin className="w-4 h-4 text-primary" /> Remote-first Open Source Project
                </p>
              </div>
            </div>
          </Section>

          <Section title="17. CONSENT">
            <p className="text-sm">
              By using our platform, you acknowledge that you have read this Privacy Policy and explicitly consent to the collection, usage, and sharing as described. You may withdraw consent at any time via your workspace settings.
            </p>
          </Section>

          <div className="mt-40 text-center pb-20">
            <Heart className="w-6 h-6 text-primary/20 mx-auto mb-8 animate-pulse" />
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-1">
              © 2026 {legalEntity}
            </p>
            <p className="text-[9px] text-gray-400 font-medium tracking-widest">
              VERSION 1.0
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
