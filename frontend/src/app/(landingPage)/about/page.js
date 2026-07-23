"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Building2,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  Globe,
  Heart,
  Layers3,
  LayoutGrid,
  Search,
  ShieldCheck,
  Users,
  Workflow,
  KeyRound,
  Receipt,
  Gauge,
  Ticket,
  Settings2,
  LineChart,
  CircleDollarSign,
  Bot,
  Linkedin,

} from "lucide-react";
import { motion } from "motion/react";
import { GithubIcon } from "@/components/github-icon";
import { XIcon } from "@/components/x-icon";
import { LinkedinIcon } from "@/components/linkedin-icon";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FeatureSection } from "@/components/feature-section";
import { CallToAction } from "@/components/cta";

const missionPoints = [
  {
    title: "Simplify business management",
    desc: "Unifying your workflow into a single, cohesive platform without the bloat.",
    icon: <Workflow className="h-6 w-6 text-slate-700" />
  },
  {
    title: "Eliminate SaaS bloat",
    desc: "Stop paying for five different subscriptions when one thoughtfully designed tool will do.",
    icon: <LayoutGrid className="h-6 w-6 text-slate-700" />
  },
  {
    title: "Full data ownership",
    desc: "Your clients, your finances, your data. No vendor lock-in, ever.",
    icon: <Database className="h-6 w-6 text-slate-700" />
  },
  {
    title: "Open source software",
    desc: "Built in the open, community-driven, and completely transparent development.",
    icon: <Code2 className="h-6 w-6 text-slate-700" />
  },
];


const principles = [
  {
    icon: <Search className="h-6 w-6 text-slate-700" />,
    title: "Purposeful Design",
    desc: "Every screen is crafted to reduce cognitive load, so you can focus on the actual work.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-slate-700" />,
    title: "Financial Precision",
    desc: "Math has to be right. We handle global exchange rates and strict ledgers without mental overhead.",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-slate-700" />,
    title: "Quiet Reliability",
    desc: "No aggressive notifications or gamified tricks. A tool that waits for you, then gets out of your way.",
  },
  {
    icon: <Users className="h-6 w-6 text-slate-700" />,
    title: "Shared Truth",
    desc: "Both you and your clients see the same data. Shared portals mean no more confusing email threads.",
  },
];

const audiences = [
  {
    icon: <Users className="h-5 w-5 text-slate-600 transition-colors group-hover:text-blue-600" />,
    title: "Freelancers",
    desc: "Manage clients, invoices, and projects from one place.",
  },
  {
    icon: <Workflow className="h-5 w-5 text-slate-600 transition-colors group-hover:text-blue-600" />,
    title: "Agencies",
    desc: "Collaborate with teams while handling multiple clients across currencies.",
  },
  {
    icon: <Building2 className="h-5 w-5 text-slate-600 transition-colors group-hover:text-blue-600" />,
    title: "Consultants",
    desc: "Simplify client onboarding, billing, and reporting.",
  },
  {
    icon: <Layers3 className="h-5 w-5 text-slate-600 transition-colors group-hover:text-blue-600" />,
    title: "Growing businesses",
    desc: "Scale operations without buying dozens of SaaS subscriptions.",
  },
];

const platformModules = [
  "Dashboard",
  "Clients",
  "Projects",
  "Invoices",
  "Payments",
  "Expenses",
  "AI Questionnaires",
  "Data Migration",
  "Support Tickets",
  "Workspace Settings",
  "Global Search",
];

function SectionHeading({ eyebrow, title, desc, align = "left" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[12px] font-bold tracking-wide text-blue-600 uppercase shadow-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
        {eyebrow}
      </div>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
        {desc}
      </p>
    </div>
  );
}

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />

      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 border-b border-slate-100 px-4 sm:px-6 bg-slate-50 overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative z-10 pt-8 md:pt-12">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[12px] font-bold tracking-wider text-slate-600 uppercase mb-8 shadow-sm">
              <BookOpen className="w-3.5 h-3.5" />
              Our Story
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 md:mb-8 leading-[1.05]">
              Zero bloat. Zero padding. <br className="hidden md:block" />
              <span className="text-blue-600">
                Absolute clarity.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto px-2 md:px-0">
              Say goodbye to the chaos of scattered spreadsheets and bloated SaaS subscriptions.
              <strong> Soseki</strong> is the modern, open-source operating system for freelancers and small agencies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-access" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-8 rounded-xl shadow-sm text-[15px] font-bold")}>
                Request Early Access
              </Link>
              <Link href="https://github.com/ayushsolanki29/soseki-app" target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto border-slate-200 bg-white px-8 text-slate-700 hover:bg-slate-50 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 shadow-sm")}>
                <GithubIcon className="w-4 h-4" fill="currentColor" /> View on GitHub
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder Quote Section */}
      <section className="border-b border-slate-100 bg-white px-4 sm:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="relative">
              <span className="absolute -top-6 -left-2 md:-top-10 md:-left-6 text-6xl md:text-8xl text-slate-200 font-serif leading-none select-none">"</span>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-800 leading-relaxed relative z-10 px-4 md:px-0">
                I built Soseki because I got tired of stitching together spreadsheets, an invoicing tool, and a separate CRM just to run client work. The goal was simple: create one clear, open-source platform that actually respects the freelancer's workflow and data ownership.
              </p>
              <span className="absolute -bottom-10 -right-2 md:-bottom-16 md:-right-6 text-6xl md:text-8xl text-slate-200 font-serif leading-none select-none">"</span>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-md overflow-hidden relative">
                <Image src="/ayush-solanki.webp" alt="Ayush Solanki" fill sizes="64px" className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Ayush Solanki</h3>
                <p className="text-slate-500 text-sm font-medium">Founder & Creator of Soseki</p>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Link href="https://www.ayushsolanki.site/" target="_blank" className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm" aria-label="Website">
                  <Globe className="w-4 h-4" />
                </Link>
                <Link href="https://x.com/sosekiapp" target="_blank" className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm" aria-label="X (Twitter)">
                  <XIcon className="w-4 h-4" />
                </Link>
                <Link href="https://github.com/ayushsolanki29" target="_blank" className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm" aria-label="GitHub">
                  <GithubIcon className="w-4 h-4" fill="currentColor" />
                </Link>
                <Link href="https://www.linkedin.com/in/ayush-solanki-a3909625a/" target="_blank" className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm" aria-label="LinkedIn">
                  <LinkedinIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 py-16 md:py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <Reveal>
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-bold tracking-wide text-slate-600 uppercase mb-6 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Why We Built Soseki
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  A cleaner way to run your <span className="text-blue-600">service business</span>
                </h2>
                <div className="space-y-6 text-base md:text-lg text-slate-600 leading-relaxed">
                  <p>
                    <strong>Soseki</strong> is named after Natsume Soseki, the Japanese novelist. Not as a branding gimmick, but because of how he wrote: no bloat, no padding, just what the work actually needs. That is the idea behind the product too.
                  </p>
                  <p>
                    Freelancers do not need forty modules they will never open. They need invoices that go out correctly, a clear record of what a client owes, and a way to tell if the month actually made money.
                  </p>
                  <p>
                    It is built and maintained by one backend engineer who got tired of stitching together spreadsheets, an invoicing tool, and a separate CRM just to run client work. The code is open source under the MIT license, so anyone can read it or contribute to it.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid gap-4 sm:gap-6">
                {[
                  {
                    icon: <Layers3 className="h-5 w-5 text-slate-700" />,
                    title: "Simple & Unified",
                    desc: "Less bloat, fewer tabs, and a tighter workflow. Everything you need without the unnecessary complexity.",
                  },
                  {
                    icon: <CheckCircle2 className="h-5 w-5 text-slate-700" />,
                    title: "Clear Operations",
                    desc: "Every module is organized around real operational work. Your business data stays perfectly organized automatically.",
                  },
                  {
                    icon: <ShieldCheck className="h-5 w-5 text-slate-700" />,
                    title: "Purposeful Design",
                    desc: "Features exist because they solve a concrete problem. No vendor lock-in. No clutter. Just exactly what you need.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-5 overflow-hidden"
                  >
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-slate-900 mb-1 sm:mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-[15px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 sm:px-6 py-16 md:py-32 border-b border-slate-100">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 md:mb-6">
                  Ownership, transparency, and less operational noise.
                </h2>
                <p className="text-base md:text-lg text-slate-500 leading-relaxed">
                  We want freelancers, agencies, and service businesses to own their business operations through a modern open-source platform that is powerful, transparent, and easy to use.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-8 md:gap-12">
              {missionPoints.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.1}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      {item.icon}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 px-4 sm:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="What Makes Soseki Different"
              title="Designed around real business workflows"
              desc="Every major surface in Soseki is built to reduce context switching and keep the business moving."
              align="center"
            />
          </Reveal>
          <div className="mt-12 md:mt-16 flex justify-center overflow-hidden">
            <div className="w-full max-w-full overflow-x-auto pb-4">
              <FeatureSection />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 sm:px-6 py-16 md:py-32 border-b border-slate-100">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="max-w-3xl mb-12 md:mb-16">
              <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4">Core Principles</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 md:mb-6">
                Everything we build follows four rules
              </h3>
              <p className="text-base md:text-lg text-slate-500 leading-relaxed">
                The product should feel calm, capable, and trustworthy. These principles keep the work focused.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-16 mt-8 md:mt-12">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 sm:px-6 py-16 md:py-32 border-b border-slate-100 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">

            {/* Left side: Text & Audiences */}
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-bold tracking-wide text-slate-600 uppercase mb-6 md:mb-8 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Who It's For
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4 md:mb-6">
                  Built for modern <br className="hidden sm:block" /> service businesses.
                </h2>
                <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 md:mb-10">
                  Whether you're a solo freelancer or a growing agency, Soseki provides the structure you need without slowing you down.
                </p>
              </Reveal>

              <div className="flex flex-col gap-4 md:gap-6">
                {audiences.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.1}>
                    <div className="group flex items-start gap-4 p-4 -ml-4 rounded-2xl transition-all hover:bg-white hover:shadow-sm hover:border hover:border-slate-200 border border-transparent cursor-default">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors">
                        {item.icon}
                      </div>
                      <div className="pt-0.5 md:pt-1">
                        <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right side: Mockup/Graphic */}
            <Reveal delay={0.2}>
              <div className="relative aspect-square lg:aspect-auto lg:h-[500px] w-full rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 overflow-hidden flex items-center justify-center shadow-sm">

                <div className="relative w-full translate-x-4 translate-y-4 sm:translate-x-12 sm:translate-y-12 lg:translate-x-16 lg:translate-y-16 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-slate-50 border border-slate-200">
                  <Image
                    src="https://storage.efferd.com/screen/dashboard-light.webp"
                    alt="Soseki Dashboard Interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-100 px-4 sm:px-6 py-16 md:py-32 overflow-hidden relative">
        <div className="mx-auto max-w-6xl relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[12px] font-bold tracking-wide text-slate-600 uppercase mb-6 shadow-sm">
                The Soseki Ecosystem
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 md:mb-6 leading-[1.1]">
                A Unified Operations Engine
              </h2>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
                Stop wrestling with fragmented tools. Soseki connects every phase of your business from the first client handshake to the final payment in one unified workspace.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 md:mt-12 rounded-[24px] md:rounded-[32px] border border-slate-200 bg-slate-50 p-6 md:p-10 shadow-sm">
            <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12">
              {platformModules.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 md:gap-2 rounded-lg md:rounded-xl border border-slate-200 bg-white px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 cursor-default"
                >
                  <Workflow className="h-3 w-3 md:h-3.5 md:w-3.5 text-slate-500" />
                  {item}
                </span>
              ))}
            </div>

            <div className="grid gap-8 lg:gap-8 md:grid-cols-3">
              <div className="space-y-3 md:space-y-4">
                <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg md:rounded-xl shadow-sm">
                  <Layers3 className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Fluid Data Architecture</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Data moves automatically across the platform. Convert a project into a multi-currency invoice instantly—no manual data entry required.
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg md:rounded-xl shadow-sm">
                  <LineChart className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Real-Time Intelligence</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Financial metrics, client activity, and project statuses are aggregated instantly into your master dashboard, giving absolute clarity at a glance.
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg md:rounded-xl shadow-sm">
                  <Search className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Zero-Bloat Context</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  With features like Global Command Search and unified settings, every module is accessible instantly without breaking your workflow.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="py-24 px-6">
        <CallToAction
          title="Run your service business without the busywork"
          description="Open source, actively maintained, and built by someone who runs client work the same way you do."
        />
      </div>

      <Footer />
    </main>
  );
}
