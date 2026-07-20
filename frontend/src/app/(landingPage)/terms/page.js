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
                <Clock className="w-4 h-4" /> Effective: {effectiveDate}
              </span>
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Updated: {lastUpdatedDate}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-4">
            <Section title="1. ACCEPTANCE OF TERMS">
              <p>
                <strong>1.1 Agreement to Terms:</strong> By accessing or using the Soseki website <strong>({websiteUrl})</strong>, application, or services (collectively, the "Platform"), you agree to be bound by these Terms and Conditions ("Terms").
              </p>
              <p>
                <strong>1.2 Legal Entity:</strong> These Terms constitute a legally binding agreement between you and <strong>{legalEntity}</strong> (hereinafter referred to as "Soseki", "we", "us", or "our"), an open source business management platform project.
              </p>
              <p>
                <strong>1.3 Age Requirement:</strong> You must be at least 18 years of age (or the minimum legal age of majority in your jurisdiction) to use our Platform or purchase our commercial services.
              </p>
              <p>
                <strong>1.4 Modification of Terms:</strong> We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the Platform. Your continued use of the Platform after changes constitutes acceptance of the modified Terms.
              </p>
            </Section>

            <Section title="2. DEFINITIONS">
              <Subtitle>2.1 Key Terms</Subtitle>
              <ul className="space-y-4">
                <li>
                  <strong>2.1.1 "Services"</strong> means the digital business management tools provided by Soseki, including client tracking, invoicing, expense management, AI-driven migration, dashboards, and managed commercial hosting.
                </li>
                <li>
                  <strong>2.1.2 "User" or "you"</strong> means any person or workspace member who accesses or uses the Platform.
                </li>
                <li>
                  <strong>2.1.3 "Customer"</strong> means a User who subscribes to our commercial cloud or paid services.
                </li>
                <li>
                  <strong>2.1.4 "Workspace Owner"</strong> means the user who controls a Soseki workspace and oversees member permissions.
                </li>
                <li>
                  <strong>2.1.5 "Order"</strong> means a subscription to a paid cloud plan or premium support tier.
                </li>
                <li>
                  <strong>2.1.6 "Deliverables"</strong> means the data, PDF invoices, and reports generated through the Soseki dashboard.
                </li>
                <li>
                  <strong>2.1.7 "Package"</strong> means a commercial hosting plan or support subscription tier.
                </li>
              </ul>
            </Section>

            <Section title="3. DESCRIPTION OF SERVICES">
              <p>
                <strong>3.1 Services Offered:</strong> Soseki provides an open-source business operating system for freelancers, agencies, and teams, including:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {[
                  {
                    t: "3.1.1 Client Management",
                    d: "CRM dashboards to organize and track client information, files, and billing agreements.",
                  },
                  {
                    t: "3.1.2 Invoicing & Payments",
                    d: "Creation of professional multi-currency invoices with built-in online payment links.",
                  },
                  {
                    t: "3.1.3 Expense Tracking",
                    d: "Comprehensive ledgers to record business expenditures and project budget allocations.",
                  },
                  {
                    t: "3.1.4 AI Productivity Tools",
                    d: "AI migration features to import business data and draft client onboarding questionnaires.",
                  },
                  {
                    t: "3.1.5 Project Dashboards",
                    d: "Collaborative project modules to run project deliverables and share progress dashboards.",
                  },
                  {
                    t: "3.1.6 Financial Analytics",
                    d: "Visual charts representing revenue flow, pending balances, and total business health.",
                  },
                  {
                    t: "3.1.7 Self-Hosting Features",
                    d: "Complete freedom to self-host the open-source software on your own Docker or cloud setup.",
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
              <p>
                Our Services are limited to digital business management software tools, hosted environments, and related documentation.
              </p>

              <Subtitle>3.3 Exclusions</Subtitle>
              <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/10 text-xs md:text-sm">
                <p className="text-red-700 dark:text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-tight">
                  <HardHat className="w-4 h-4" /> Outside Scope
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-red-600/70">
                  <li>• Direct business accounting or tax audit filings</li>
                  <li>• Client-side legal drafting or dispute resolution</li>
                  <li>• Physical asset procurement or physical delivery</li>
                  <li>• Custom code development for individual workspaces</li>
                  <li>• Maintenance of self-hosted cloud server instances</li>
                  <li>• Liability on data lost from private backups</li>
                </ul>
              </div>

              <Subtitle>3.4 Service Packages</Subtitle>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { p: "Open Source Plan", c: "Free / Forever" },
                  { p: "Commercial Cloud", c: "$29 / Month" },
                ].map((pkg, i) => (
                  <div
                    key={i}
                    className="p-4 text-center rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50/30 dark:bg-white/5"
                  >
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{pkg.p}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{pkg.c}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="4. USER ACCOUNT AND REGISTRATION">
              <p>
                <strong>4.1 Account Creation:</strong> To use Soseki Cloud, you must register by providing your name, email, phone number, and a secure password. You are responsible for account credential confidentiality.
              </p>
              <p>
                <strong>4.2 Account Security:</strong> You agree to provide accurate information, not share credentials, and notify us of unauthorized access.
              </p>
              <p>
                <strong>4.3 Account Termination:</strong> We reserve the right to suspend or terminate accounts for Terms violations, fraud, or abuse of cloud resources.
              </p>
            </Section>

            <Section title="5. SUBSCRIPTIONS AND PAYMENT">
              <p>
                <strong>5.1 Placing an Order:</strong> Paid subscriptions are initiated by selecting a Commercial Package and completing payment via our secure payment gateway.
              </p>
              <p>
                <strong>5.3 Payment Terms:</strong> Prices are in USD or regional local currencies. Payments are processed via secure PCI-DSS compliant providers. Billing occurs at the start of each monthly cycle.
              </p>
              <p>
                <strong>5.4 Invoicing:</strong> Digital invoices are generated for all monthly subscriptions and kept within your account billing dashboard.
              </p>
            </Section>

            <Section title="6. SERVICE DELIVERY">
              <Subtitle>6.1 Delivery Timeline</Subtitle>
              <div className="space-y-2 text-sm">
                <p>• <strong>Open Source Codebase:</strong> Instant download via GitHub repository</p>
                <p>• <strong>Commercial Cloud Setup:</strong> Instant workspace provisioning upon registration</p>
                <p>• <strong>Priority Support Response:</strong> Within 24-48 business hours</p>
              </div>
              <p className="mt-4">
                <strong>6.5 Delivery Method:</strong> Deliverables and hosted workspaces are served via the Soseki secure dashboard.
              </p>
            </Section>

            <Section title="7. CUSTOMIZATION AND MODIFICATION">
              <p>
                <strong>7.1 Workspace Customization:</strong> Users can customize workspace settings, currencies, client templates, and branding tags according to their chosen tier.
              </p>
              <p>
                <strong>7.2 System Updates:</strong> Soseki reserves the right to deploy updates, patches, and feature changes to the cloud environment to optimize security and stability.
              </p>
            </Section>

            <Section title="8. INTELLECTUAL PROPERTY RIGHTS">
              <p>
                <strong>8.1 Open Source License:</strong> Soseki's public repository code is licensed under the open-source MIT License. You have complete rights to copy, modify, and distribute the codebase under these terms.
              </p>
              <p>
                <strong>8.3 Brand Intellectual Property:</strong> Soseki brand logos, registered styles, cloud dashboard layout, and managed platform code remain the exclusive property of the Soseki Open Source Project.
              </p>
            </Section>

            <Section title="9. USER OBLIGATIONS AND PROHIBITED CONDUCT">
              <p>
                <strong>9.1 Responsibilities:</strong> You must use Soseki in compliance with all local laws and internet use guidelines.
              </p>
              <p>
                <strong>9.2 Prohibited Activities:</strong> You shall not use Soseki Cloud to host malicious files, launch cyber attacks, bypass billing gates, or engage in unlawful activities.
              </p>
            </Section>

            <Section title="10. WORKSPACE MANAGEMENT AND ROLES">
              <p>
                <strong>10.1 Workspace Owner Authority:</strong> Soseki assigns workspace permissions based on roles configured by the workspace owner. Workspace owners are fully responsible for invite actions and data shared.
              </p>
            </Section>

            <Section title="11. CUSTOMER SUPPORT">
              <p>
                <strong>11.1 Channels:</strong> Email (help@soseki.app), Github Discussions, and workspace support tickets.
              </p>
              <p>
                <strong>11.2 Support Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM UTC (excluding holidays).
              </p>
            </Section>

            <Section title="12. REFUND AND CANCELLATION POLICY">
              <p>
                <strong>12.1 Commercial Cloud Subscriptions:</strong> We offer a 14-day refund policy for new subscriptions. Cancel anytime thereafter to stop billing.
              </p>
              <p>
                <strong>12.5 Process:</strong> Request cancellation directly inside your billing dashboard or contact <strong>hello@soseki.app</strong>.
              </p>
            </Section>

            <Section title="13. WARRANTY AND DISCLAIMERS">
              <p>
                <strong>13.2 Disclaimer of Warranties:</strong> Soseki is provided "as is" and "as available". We do not guarantee that the platform will be 100% error-free or uninterrupted.
              </p>
              <p>
                <strong>13.4 Estimates:</strong> Financial projections, budget summaries, and invoice calculations generated by the app should be verified with certified accountants.
              </p>
            </Section>

            <Section title="14. LIMITATION OF LIABILITY">
              <p>
                <strong>14.1 Liability Cap:</strong> Total aggregate liability for any claims relating to Soseki Cloud shall not exceed the amount actually paid for your active subscription in the billing month the issue arose.
              </p>
            </Section>

            <Section title="15. INDEMNIFICATION">
              <p>
                You agree to indemnify Soseki against claims arising from your breach of these Terms, violation of third-party rights, or misuse of the Cloud Services.
              </p>
            </Section>

            <Section title="16. FORCE MAJEURE">
              <p>
                Soseki is not liable for delays or failures caused by natural disasters, cloud hosting server outages, upstream network failures, or technical factors beyond reasonable control.
              </p>
            </Section>

            <Section title="17. TERMINATION">
              <p>
                You can delete your workspace and data at any time. Soseki may suspend or terminate cloud workspaces due to billing default, spam, or resource abuse.
              </p>
            </Section>

            <Section title="18. DISPUTE RESOLUTION">
              <p>
                <strong>18.1 Informal Resolution:</strong> Contact <strong>hello@soseki.app</strong> first. We aim to address all concerns quickly and informally.
              </p>
            </Section>

            <Section title="19. GOVERNING LAW AND JURISDICTION">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the project developer's region, with exclusive jurisdiction in local courts.
              </p>
            </Section>

            <Section title="20. GENERAL PROVISIONS">
              <p>
                These Terms, along with the Privacy and Refund Policies, constitute the entire agreement. If any provision is found invalid, the rest remain in effect. Failure to exercise rights doesn't constitute a waiver.
              </p>
            </Section>

            <Section title="21. CONTACT INFORMATION">
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

            <Section title="22. ACKNOWLEDGMENT">
              <p>
                By using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy and Refund Policies, and that you are at least 18 years of age.
              </p>
            </Section>

            <div className="mt-40 text-center pb-20">
              <Heart className="w-6 h-6 text-primary/20 mx-auto mb-8 animate-pulse" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-1">
                {legalEntity}
              </p>
              <p className="text-[9px] text-gray-400 font-medium">
                EST. 2026 • MIT LICENSE
              </p>
              <p className="text-[8px] text-gray-400/50 mt-4 uppercase">
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
