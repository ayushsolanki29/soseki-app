"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  RefreshCw,
  Heart,
  FileCheck,
  Shield,
  CreditCard,
  Scale,
  Globe,
  HardHat,
  Package,
  UserCircle,
  RotateCcw,
  MessageCircle,
  AlertCircle,
  HelpCircle,
  Gavel,
  FileText,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { APP_EMAILS } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service",
};

const TermsOfUsePage = () => {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Use - Soseki",
            "description": "Terms of Use for Soseki Open Source Project. Read our terms governing the use of our business workspace platform.",
            "url": "https://soseki.app/terms",
            "isPartOf": { "@type": "WebSite", "url": "https://soseki.app", "name": "Soseki" },
            "publisher": { "@type": "Organization", "name": "Soseki Open Source Project", "url": "https://soseki.app" },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://soseki.app" },
                { "@type": "ListItem", "position": 2, "name": "Terms", "item": "https://soseki.app/terms" },
              ],
            },
          }),
        }}
      />
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
              <FileCheck className="w-3 h-3" /> Mandatory Terms
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING OUR SERVICES
            </p>
            <div className="flex flex-wrap gap-6 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Effective: 21.07.2026
              </span>
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Updated: 21.07.2026
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-4">
            <Section title="1. ACCEPTANCE OF TERMS">
              <p>
                <strong>1.1 Agreement to Terms:</strong> By accessing or using the Soseki website <strong>({websiteUrl})</strong>, application, or services (collectively, the "Platform"), you agree to be bound by these comprehensive Terms and Conditions ("Terms"). If you do not agree to these terms in their entirety, you must not use or access the Platform.
              </p>
              <p>
                <strong>1.2 Legal Entity:</strong> These Terms constitute a legally binding agreement between you and <strong>{legalEntity}</strong> (hereinafter referred to as "Soseki", "we", "us", or "our"), a remote-first open source project operating globally.
              </p>
              <p>
                <strong>1.3 Age Requirement:</strong> You must be at least 18 years of age (or the minimum legal age of majority in your jurisdiction) to use our Platform, enter into this agreement, or purchase our commercial services. By using Soseki, you represent and warrant that you meet these age requirements.
              </p>
              <p>
                <strong>1.4 Modification of Terms:</strong> We reserve the right to unilaterally modify these Terms at any time. Changes will be effective immediately upon posting on the Platform. Your continued use of the Platform after changes constitutes affirmative acceptance of the modified Terms. It is your responsibility to review these Terms periodically.
              </p>
            </Section>

            <Section title="2. DEFINITIONS">
              <Subtitle>2.1 Key Terms</Subtitle>
              <ul className="space-y-4 text-sm">
                <li>
                  <strong>2.1.1 "Services"</strong> means the digital business management tools provided by Soseki, including client tracking, invoicing, expense management, AI-driven migration, dashboards, and managed commercial hosting.
                </li>
                <li>
                  <strong>2.1.2 "User" or "you"</strong> means any individual, employee, contractor, or workspace member who accesses or uses the Platform.
                </li>
                <li>
                  <strong>2.1.3 "Customer"</strong> means a User or organization that subscribes to our commercial cloud or paid tiers.
                </li>
                <li>
                  <strong>2.1.4 "Workspace Owner"</strong> means the primary user who controls a Soseki workspace, oversees member permissions, and holds the ultimate billing responsibility.
                </li>
                <li>
                  <strong>2.1.5 "Order"</strong> means a subscription to a paid cloud plan or premium support tier executed via our billing gateway.
                </li>
                <li>
                  <strong>2.1.6 "Deliverables"</strong> means the data, PDF invoices, and reports generated through the Soseki dashboard.
                </li>
              </ul>
            </Section>

            <Section title="3. DESCRIPTION OF SERVICES">
              <p>
                <strong>3.1 Services Offered:</strong> Soseki provides an open-source business operating system for freelancers, agencies, and teams. Core features include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {[
                  {
                    t: "3.1.1 Client Management",
                    d: "CRM dashboards to dynamically organize and track client information, files, and billing agreements.",
                  },
                  {
                    t: "3.1.2 Invoicing & Payments",
                    d: "Creation of professional multi-currency invoices with built-in online payment links via third-party processors.",
                  },
                  {
                    t: "3.1.3 Expense Tracking",
                    d: "Comprehensive ledgers to accurately record business expenditures and project budget allocations.",
                  },
                  {
                    t: "3.1.4 AI Productivity Tools",
                    d: "AI migration features to rapidly import business data and draft client onboarding questionnaires.",
                  },
                  {
                    t: "3.1.5 Project Dashboards",
                    d: "Collaborative project modules to run project deliverables and share progress dashboards in real-time.",
                  },
                  {
                    t: "3.1.6 Financial Analytics",
                    d: "Visual charts representing revenue flow, pending balances, and total business health metrics.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
                  >
                    <p className="font-bold text-gray-900 dark:text-white text-[10px] uppercase tracking-widest mb-2 text-primary">
                      {item.t}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.d}</p>
                  </div>
                ))}
              </div>

              <Subtitle>3.2 Service Limitations</Subtitle>
              <p className="text-sm">
                Our Services are strictly limited to digital business management software tools, hosted cloud environments, and related technical documentation. We do not provide financial, legal, or tax advice.
              </p>

              <Subtitle>3.3 Exclusions</Subtitle>
              <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/10 text-xs md:text-sm mt-4">
                <p className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-tight">
                  <HardHat className="w-4 h-4" /> Strictly Outside Scope
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-red-600/70">
                  <li>• Direct business accounting or tax audit filings</li>
                  <li>• Client-side legal drafting or dispute resolution</li>
                  <li>• Physical asset procurement or physical delivery</li>
                  <li>• Custom code development for individual workspaces</li>
                  <li>• Maintenance of independent server deployments</li>
                  <li>• Liability on data lost from private, unmanaged backups</li>
                </ul>
              </div>
            </Section>

            <Section title="4. USER ACCOUNT AND REGISTRATION">
              <p className="text-sm mb-4">
                <strong>4.1 Account Creation:</strong> To use Soseki Cloud, you must register by providing accurate, current, and complete information, including your name, email, and a secure password. You are solely responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p className="text-sm mb-4">
                <strong>4.2 Account Security:</strong> You agree to immediately notify us of any unauthorized use of your account or any other breach of security. Soseki will not be liable for any loss or damage arising from your failure to protect your login information.
              </p>
              <p className="text-sm">
                <strong>4.3 Account Termination:</strong> We reserve the right to suspend or irrevocably terminate your account and workspace if you violate these Terms, provide fraudulent information, or engage in malicious abuse of cloud resources.
              </p>
            </Section>

            <Section title="5. SUBSCRIPTIONS AND PAYMENT">
              <p className="text-sm mb-4">
                <strong>5.1 Placing an Order:</strong> Paid subscriptions are initiated by selecting a Commercial Package and completing payment via our authorized secure payment gateway (e.g., Stripe).
              </p>
              <p className="text-sm mb-4">
                <strong>5.2 Payment Terms:</strong> Prices are quoted in USD or regional local currencies. Payments are processed securely via PCI-DSS compliant third-party providers. Billing occurs recursively at the start of each monthly or annual cycle. We do not store raw credit card data.
              </p>
              <p className="text-sm">
                <strong>5.3 Taxes:</strong> You are responsible for any applicable taxes, levies, or duties imposed by taxing authorities based on your jurisdiction. 
              </p>
            </Section>

            <Section title="6. SERVICE DELIVERY">
              <Subtitle>6.1 Delivery Timeline</Subtitle>
              <div className="space-y-2 text-sm">
                <p>• <strong>Open Source Codebase:</strong> Instant download via public GitHub repository.</p>
                <p>• <strong>Commercial Cloud Setup:</strong> Instant workspace provisioning upon successful registration and payment authorization.</p>
                <p>• <strong>Priority Support Response:</strong> Typically within 24-48 business hours for paying customers.</p>
              </div>
            </Section>

            <Section title="7. INTELLECTUAL PROPERTY RIGHTS">
              <p className="text-sm mb-4">
                <strong>7.1 Open Source License:</strong> Soseki's core public repository code is licensed under the MIT License. You have the right to copy, modify, and distribute the core codebase subject strictly to the terms of the MIT License.
              </p>
              <p className="text-sm">
                <strong>7.2 Brand Intellectual Property:</strong> The Soseki brand name, logos, registered styles, proprietary cloud dashboard layouts, and commercially managed platform code remain the exclusive intellectual property of the Soseki Open Source Project. Using our open-source code does not grant you the right to use our trademarks.
              </p>
            </Section>

            <Section title="8. USER OBLIGATIONS AND PROHIBITED CONDUCT">
              <p className="text-sm mb-4">
                <strong>8.1 Responsibilities:</strong> You must use Soseki in strict compliance with all local laws, data protection regulations, and internet use guidelines.
              </p>
              <p className="text-sm">
                <strong>8.2 Prohibited Activities:</strong> You shall not use Soseki Cloud to:
                <br />- Host or distribute malicious files, viruses, or malware.
                <br />- Launch cyber attacks, DDoS, or attempt unauthorized penetration testing.
                <br />- Bypass billing gates or exploit system vulnerabilities.
                <br />- Engage in unlawful, defamatory, or fraudulent activities against your clients.
              </p>
            </Section>

            <Section title="9. REFUND AND CANCELLATION POLICY">
              <p className="text-sm mb-4">
                <strong>9.1 Commercial Cloud Subscriptions:</strong> We offer a 14-day refund policy for new subscriptions, provided no extensive platform abuse has occurred. You may cancel your subscription at any time to prevent future billing.
              </p>
              <p className="text-sm">
                <strong>9.2 Process:</strong> You can request a cancellation directly inside your workspace billing dashboard or by contacting <strong>{APP_EMAILS[0]?.value}</strong>. Upon cancellation, your workspace data will remain accessible until the end of your current billing cycle.
              </p>
            </Section>

            <Section title="10. WARRANTY AND DISCLAIMERS">
              <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/10">
                <p className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-tight text-xs">
                  <AlertCircle className="w-4 h-4" /> PROVIDED "AS IS"
                </p>
                <p className="text-sm text-red-900/80 dark:text-red-200/80 leading-relaxed mb-4">
                  The Soseki platform, both the open-source code and commercial cloud services, are provided strictly on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis. 
                </p>
                <p className="text-sm text-red-900/80 dark:text-red-200/80 leading-relaxed">
                  We explicitly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the platform will be error-free, completely secure, or continuously uninterrupted.
                </p>
              </div>
            </Section>

            <Section title="11. LIMITATION OF LIABILITY">
              <p className="text-sm mb-4">
                <strong>11.1 Liability Cap:</strong> To the maximum extent permitted by applicable law, in no event shall Soseki, its creators, developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, or data.
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Total aggregate liability for any claims relating to Soseki Cloud shall not exceed the total amount actually paid by you for your active subscription in the single billing month preceding the event giving rise to the liability.
              </p>
            </Section>

            <Section title="12. INDEMNIFICATION">
              <p className="text-sm">
                You agree to unconditionally indemnify, defend, and hold harmless the Soseki Open Source Project and its developers from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from your breach of these Terms, your violation of any third-party rights, or your misuse of the Cloud Services.
              </p>
            </Section>

            <Section title="13. GOVERNING LAW AND JURISDICTION">
              <div className="flex gap-4 p-5 rounded-2xl border border-primary/10 bg-primary/5">
                <Globe className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1 uppercase tracking-tight">
                    United States Jurisdiction
                  </p>
                  <p className="text-sm">
                    These Terms shall be governed by and construed strictly in accordance with the laws of the United States. Any legal actions, suits, or proceedings arising out of or relating to these Terms shall be brought exclusively in the federal or state courts located within the United States.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="14. GENERAL PROVISIONS">
              <p className="text-sm mb-4">
                <strong>14.1 Entire Agreement:</strong> These Terms, alongside the Privacy Policy, constitute the entire legal agreement between you and Soseki regarding the use of the Platform.
              </p>
              <p className="text-sm mb-4">
                <strong>14.2 Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
              </p>
              <p className="text-sm">
                <strong>14.3 Force Majeure:</strong> Soseki is not liable for delays or failures caused by natural disasters, cloud hosting server outages (e.g., AWS/Vercel downtime), upstream network failures, or technical factors beyond reasonable control.
              </p>
            </Section>

            <Section title="15. CONTACT INFORMATION">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-sm font-semibold text-gray-900 dark:text-white">
                    <Mail className="w-4 h-4 text-primary" /> {APP_EMAILS[0]?.value}
                  </p>
                  <p className="flex items-center gap-3 text-sm font-semibold text-gray-900 dark:text-white">
                    <Mail className="w-4 h-4 text-primary" /> {APP_EMAILS[1]?.value}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-sm font-semibold text-gray-900 dark:text-white">
                    <MapPin className="w-4 h-4 text-primary" /> Remote-first Open Source Project
                  </p>
                </div>
              </div>
            </Section>

            <Section title="16. ACKNOWLEDGMENT">
              <p className="text-sm">
                By using our Platform, you explicitly acknowledge that you have read, completely understood, and unconditionally agree to be bound by these Terms and our Privacy Policy.
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
    </>
  );
};

export default TermsOfUsePage;
