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
import { APP_EMAILS } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicyPage = () => {
  const router = useRouter();

  const effectiveDate = "21.07.2026";
  const lastUpdatedDate = "21.07.2026";
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
            <ShieldCheck className="w-3 h-3" /> Privacy & Security
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            Protecting your personal data is our primary commitment. This policy explains how we collect, use, and safeguard your information globally, governed by the laws of the United States.
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
              Soseki (developed by {legalEntity}) explains how we collect, use, store, and protect your personal data globally, adhering to industry-standard privacy principles governed under the laws of the United States.
            </p>
            <p>
              This Privacy Policy applies to all users of the Soseki platform, including website visitors, registered workspace owners, and clients interacting with our tools. Consent is obtained through explicit affirmative action while using our website ({websiteUrl}) or services. We encourage you to read this policy carefully to understand how your information is handled throughout your lifecycle with us.
            </p>
          </Section>

          <Section title="2. DATA FIDUCIARY INFORMATION">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
              <div className="space-y-4">
                <Subtitle>Legal Entity</Subtitle>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{legalEntity}</p>
                <p className="text-xs text-muted-foreground">Remote-first Open Source Project operating globally.</p>
              </div>
              <div className="space-y-4">
                <Subtitle>Grievance & Support Officer</Subtitle>
                <p className="text-sm font-bold text-primary">{APP_EMAILS[1]?.value}</p>
                <p className="text-xs text-muted-foreground">Standard Response Time: Within 72 hours</p>
              </div>
            </div>
            <p className="mt-6 text-sm">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our dedicated support channel. We take all privacy inquiries seriously and will work diligently to resolve your concerns.
            </p>
          </Section>

          <Section title="3. PERSONAL DATA WE COLLECT">
            <Subtitle>3.1 Information You Provide Directly</Subtitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Account Registration", d: "Name, email address, and securely hashed passwords required to authenticate you into the system." },
                { t: "Workspace Details", d: "Business names, workspace branding, team member emails, and custom operational settings." },
                { t: "Billing & Financial", d: "Transaction IDs, invoice metadata, and billing addresses. We do NOT directly store raw credit card numbers." },
                { t: "Files & Documents", d: "Any client assets, logos, PDF attachments, or project files you voluntarily upload to your workspace." },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50/30 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <p className="font-bold text-gray-900 dark:text-white text-[10px] uppercase tracking-widest mb-2 text-primary">
                    {item.t}
                  </p>
                  <p className="text-sm">{item.d}</p>
                </div>
              ))}
            </div>

            <Subtitle>3.2 Information Collected Automatically</Subtitle>
            <p className="text-sm">
              When you interact with Soseki, our servers automatically collect specific telemetry and usage data. This includes device identifiers, IP addresses, browser types, operating systems, and timestamped usage patterns. This data is strictly utilized to optimize platform performance, detect security anomalies, and prevent fraudulent activities.
            </p>

            <Subtitle>3.3 Children's Data</Subtitle>
            <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/10">
              <p className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-tight text-xs">
                <AlertTriangle className="w-4 h-4" /> WE DO NOT KNOWINGLY COLLECT DATA FROM MINORS
              </p>
              <p className="text-xs text-red-600/70">
                Our platform is intended for businesses and professionals. We do not knowingly collect personal information from individuals under 18. If we become aware that data of a minor has been collected without verifiable parental consent, we will take immediate steps to secure and purge such information.
              </p>
            </div>
          </Section>

          <Section title="4. HOW WE USE YOUR PERSONAL DATA">
            <div className="space-y-6">
              <div>
                <p className="font-bold text-gray-900 dark:text-white mb-2">4.1 Core Service Delivery</p>
                <p className="text-sm">To operate your workspace, manage client and project architectures, send automated system confirmations, and deliver generated invoices and files seamlessly.</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white mb-2">4.2 Security and Diagnostics</p>
                <p className="text-sm">To monitor platform health, analyze crash diagnostics to fix bugs, optimize database queries, and actively defend against malicious attacks or unauthorized access attempts.</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white mb-2">4.3 Communication and Updates</p>
                <p className="text-sm">To send essential security alerts, infrastructure updates, and support responses. With your explicit consent, we may also send newsletters or feature announcements.</p>
              </div>
            </div>
          </Section>

          <Section title="5. DATA SHARING AND DISCLOSURE">
            <Subtitle>5.1 Sub-processors & Service Providers</Subtitle>
            <p className="text-sm mb-4">We rely on trusted third-party infrastructure to power Soseki. Data shared is strictly limited to what is necessary for them to perform their functions:</p>
            <ul className="space-y-3 text-sm mb-6">
              <li>• <strong>Cloud Infrastructure:</strong> Amazon Web Services (AWS) for secure database hosting and Vercel for edge network delivery.</li>
              <li>• <strong>Analytics:</strong> Telemetry services (e.g., PostHog/Google Analytics) for aggregated, anonymized usage insights.</li>
              <li>• <strong>Email Services:</strong> Transactional email providers (e.g., Resend) for reliable delivery of notifications and invoices.</li>
            </ul>
            
            <Subtitle>5.2 Legal and Compliance Disclosures</Subtitle>
            <p className="text-sm mb-6">
              We may disclose your data if required by law, subpoena, or other legal processes, or if we possess a good faith belief that such disclosure is necessary to protect our rights, your safety, or the safety of others, investigate fraud, or respond to a valid government request.
            </p>

            <Subtitle>5.3 Our Stance on Privacy</Subtitle>
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="px-3 py-1 rounded-full bg-primary/5">No Selling of Data</span>
              <span className="px-3 py-1 rounded-full bg-primary/5">No Data Brokers</span>
              <span className="px-3 py-1 rounded-full bg-primary/5">Strictly No AI Training</span>
            </div>
          </Section>

          <Section title="6. DATA RETENTION">
            <div className="space-y-4 text-sm">
              <p className="text-sm mb-4">
                We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy.
              </p>
              <p className="flex justify-between border-b border-gray-50 dark:border-white/5 py-3">
                <span>Active Account Information</span>
                <span className="font-bold text-gray-900 dark:text-white">Retained until account deletion</span>
              </p>
              <p className="flex justify-between border-b border-gray-50 dark:border-white/5 py-3">
                <span>Workspace Assets & Projects</span>
                <span className="font-bold text-gray-900 dark:text-white">Retained until manually deleted by you</span>
              </p>
              <p className="flex justify-between border-b border-gray-50 dark:border-white/5 py-3">
                <span>Financial Transaction Records</span>
                <span className="font-bold text-gray-900 dark:text-white">Retained as required for tax/compliance</span>
              </p>
              <p className="flex justify-between border-b border-gray-50 dark:border-white/5 py-3">
                <span>System Analytics Logs</span>
                <span className="font-bold text-gray-900 dark:text-white">Anonymized or purged after 30 days</span>
              </p>
            </div>
          </Section>

          <Section title="7. DATA SECURITY">
            <p className="text-sm mb-6">
              We take the security of your data extremely seriously and implement comprehensive technical and organizational measures to protect it:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { i: Lock, t: "End-to-End Encryption", d: "All data is encrypted in transit using strict SSL/TLS protocols, and at rest using AES-256 bit encryption." },
                { i: Shield, t: "Infrastructure Protection", d: "Our AWS databases reside in private subnets, protected by firewalls, VPCs, and regular security patching." },
                { i: UserCheck, t: "Strict Access Control", d: "Internal access is heavily restricted. Workspace data is isolated via strict multi-tenant Row Level Security (RLS)." },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <item.i className="w-5 h-5 text-primary" />
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{item.t}</p>
                  <p className="text-xs text-muted-foreground">{item.d}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="8. YOUR RIGHTS & CHOICES">
            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-2xl border border-primary/10 bg-primary/5">
                <Database className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1 uppercase tracking-tight">
                    Self-Service Data Portability
                  </p>
                  <p className="text-sm">
                    You don't need to file a support ticket to exercise your rights. Login to your dashboard to <strong>Access, Export, Correct, or Delete</strong> your data instantly.
                  </p>
                </div>
              </div>
              <p className="text-sm">Depending on your jurisdiction, you are legally entitled to:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm list-disc pl-5">
                <li>The Right to Access & Export your raw data</li>
                <li>The Right to Rectification (Correction)</li>
                <li>The Right to Erasure (Complete Account Deletion)</li>
                <li>The Right to Restrict Processing</li>
                <li>The Right to Withdraw Consent at any time</li>
                <li>The Right to Lodge a Complaint with a supervisory authority</li>
              </ul>
            </div>
          </Section>

          <Section title="9. DATA BREACHES AND LIABILITY LIMITATION">
            <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/10">
              <p className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-tight text-xs">
                <AlertTriangle className="w-4 h-4" /> NO GUARANTEE OF ABSOLUTE SECURITY
              </p>
              <p className="text-sm text-red-900/80 dark:text-red-200/80 leading-relaxed mb-4">
                While Soseki implements robust, enterprise-grade security measures to protect your data, the internet and cloud infrastructure are never 100% secure. 
              </p>
              <p className="text-sm text-red-900/80 dark:text-red-200/80 leading-relaxed">
                By using our platform, you explicitly acknowledge and agree that <strong>we (the creators) assume no strict liability</strong> for data loss, third-party infrastructure compromises, zero-day exploits, or unauthorized breaches beyond our direct control. You use this service understanding these inherent technological risks.
              </p>
            </div>
          </Section>

          <Section title="10. CONSENT & CHANGES">
            <p className="text-sm mb-4">
              By registering an account or continuing to use Soseki, you explicitly consent to the collection, usage, and sharing methodologies described in this document. 
            </p>
            <p className="text-sm">
              We reserve the right to update or modify this Privacy Policy at any time. When we do, we will revise the "Updated" date at the top of this page. For significant changes that materially affect your rights, we will provide a prominent notice on the platform or send an email notification directly to workspace owners.
            </p>
          </Section>

          <div className="mt-40 text-center pb-20">
            <Heart className="w-6 h-6 text-primary/20 mx-auto mb-8 animate-pulse" />
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

export default PrivacyPolicyPage;
