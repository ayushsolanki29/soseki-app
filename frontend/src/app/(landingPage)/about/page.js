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
    desc: "Unifying your workflow into a single, cohesive platform without the friction.",
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

      <section className="relative pt-32 pb-24 border-b border-slate-100 px-6 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-50/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute top-32 left-0 -translate-x-1/3 w-[600px] h-[500px] bg-gradient-to-tr from-emerald-50/40 to-cyan-50/40 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10 pt-12 md:pt-20">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[12px] font-bold tracking-wider text-slate-600 uppercase mb-8">
              <BookOpen className="w-3.5 h-3.5" />
              Our Story
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.05]">
              Zero bloat. Zero friction. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Absolute clarity.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Say goodbye to the chaos of scattered spreadsheets and bloated SaaS subscriptions.
              <strong> Soseki</strong> is the modern, open-source operating system for freelancers, agencies, and small teams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-access" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-8 rounded-xl shadow-lg shadow-blue-500/20 text-[15px] font-bold")}>
                Request Early Access
              </Link>
              <Link href="https://github.com/ayushsolanki29/soseki-app" target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-8 text-slate-700 hover:bg-slate-50 rounded-xl text-[15px] font-bold flex items-center gap-2")}>
                <GithubIcon className="w-4 h-4" fill="currentColor" /> View on GitHub
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Hero Image Placeholder */}
        <Reveal delay={0.2} className="relative z-20 mt-20 mx-auto max-w-6xl">
          <div className="aspect-[16/9] w-full rounded-[2rem] bg-slate-100 border border-slate-200/60 shadow-2xl shadow-blue-900/5 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent opacity-50" />
            <LayoutGrid className="w-16 h-16 mb-4 text-slate-300 relative z-10" />
            <p className="font-semibold text-lg relative z-10 text-slate-500">Team Collaboration Image Placeholder</p>
            <p className="text-sm font-medium mt-2 relative z-10">We will replace this with a generated image</p>
          </div>
        </Reveal>
      </section>

      {/* Founder Quote Section */}
      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="relative">
              <span className="absolute -top-10 -left-6 text-8xl text-blue-200/50 font-serif leading-none select-none">"</span>
              <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed relative z-10">
                I built Soseki because I was tired of duct-taping five different SaaS subscriptions together just to get paid. The goal was simple: create one beautiful, open-source platform that actually respects the freelancer's workflow and data ownership.
              </p>
              <span className="absolute -bottom-16 -right-6 text-8xl text-blue-200/50 font-serif leading-none select-none">"</span>
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

      <section className="border-b border-slate-100 bg-white py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-bold tracking-wide text-slate-600 uppercase mb-6 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Why We Built Soseki
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  A cleaner way to run your <span className="text-blue-600">service business</span>
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    Running a service business should not require five different SaaS products, endless spreadsheets, or hours of manual administration.
                  </p>
                  <p>
                    <strong>Soseki</strong> was created to replace that fragmented workflow with a single, beautifully designed platform that manages the complete client lifecycle from the initial handshake to the final payment.
                  </p>
                </div>
                
                <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 rounded-l-2xl" />
                  <p className="text-slate-700 font-medium">
                    Named after the Japanese novelist Natsume Soseki, known for his precise and uncluttered writing, our platform embodies the same philosophy: <strong>Zero bloat, zero friction, and absolute clarity.</strong>
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid gap-6">
                {[
                  {
                    icon: <Layers3 className="h-5 w-5 text-blue-600" />,
                    title: "Simple & Unified",
                    desc: "Less friction, fewer tabs, and a tighter workflow. Everything you need without the unnecessary complexity.",
                  },
                  {
                    icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
                    title: "Clear Operations",
                    desc: "Every module is organized around real operational work. Your business data stays perfectly organized automatically.",
                  },
                  {
                    icon: <ShieldCheck className="h-5 w-5 text-indigo-600" />,
                    title: "Purposeful Design",
                    desc: "Features exist because they solve a concrete problem. No vendor lock-in. No clutter. Just exactly what you need.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.08)] hover:border-blue-100 transition-all duration-300 flex gap-5 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 group-hover:bg-white group-hover:border-blue-100 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-[15px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-32 border-b border-slate-100">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-start">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                  Ownership, transparency, and less operational noise.
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed">
                  We want freelancers, agencies, and service businesses to own their business operations through a modern open-source platform that is powerful, transparent, and easy to use.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-12">
              {missionPoints.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.1}>
                  <div className="flex gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200">
                      {item.icon}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="What Makes Soseki Different"
              title="Designed around real business workflows"
              desc="Every major surface in Soseki is built to reduce context switching and keep the business moving."
              align="center"
            />
          </Reveal>
          <div className="mt-16 flex justify-center">
            <FeatureSection />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-32 border-b border-slate-100">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">Core Principles</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                Everything we build follows four rules
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed">
                The product should feel calm, capable, and trustworthy. These principles keep the work focused.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 mt-12">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-32 border-b border-slate-100 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
            
            {/* Left side: Text & Audiences */}
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[12px] font-bold tracking-wide text-blue-600 uppercase mb-8 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Who It's For
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                  Built for modern <br className="hidden sm:block" /> service businesses.
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed mb-10">
                  Whether you're a solo freelancer or a growing agency, Soseki provides the structure you need without slowing you down.
                </p>
              </Reveal>

              <div className="flex flex-col gap-6">
                {audiences.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.1}>
                    <div className="group flex items-start gap-4 p-4 -ml-4 rounded-2xl transition-all hover:bg-slate-50 cursor-default">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm group-hover:border-blue-200 transition-colors">
                        {item.icon}
                      </div>
                      <div className="pt-1">
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
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full rounded-3xl bg-slate-50 border border-slate-100 p-8 overflow-hidden flex items-center justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 blur-3xl rounded-full" />
                
                <div className="relative w-[140%] sm:w-[110%] lg:w-[130%] translate-x-12 translate-y-12 lg:translate-x-16 lg:translate-y-16 rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200 shadow-blue-900/5 group-hover:shadow-blue-900/10 transition-shadow">
                  <Image 
                    src="https://storage.efferd.com/screen/dashboard-light.webp"
                    alt="Soseki Dashboard Interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 pointer-events-none" />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-b border-slate-100 px-6 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-6xl relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[12px] font-bold tracking-wide text-blue-600 uppercase mb-6 shadow-sm">
                The Soseki Ecosystem
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                A Unified Operations Engine
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed">
                Stop wrestling with fragmented tools. Soseki connects every phase of your business—from the first client handshake to the final payment—in one seamless, frictionless environment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 rounded-[32px] border border-slate-200 bg-white/60 backdrop-blur-xl p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="flex flex-wrap gap-3 mb-12">
              {platformModules.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 cursor-default"
                >
                  <Workflow className="h-3.5 w-3.5 text-blue-500" />
                  {item}
                </span>
              ))}
            </div>
            
            <div className="grid gap-12 lg:gap-8 lg:grid-cols-3">
              <div className="space-y-4">
                <div className="h-12 w-12 flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-600 rounded-xl">
                  <Layers3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Fluid Data Architecture</h3>
                <p className="text-slate-600 leading-relaxed">
                  Data moves automatically across the platform. Convert a project into a multi-currency invoice instantly—no manual data entry required.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-12 w-12 flex items-center justify-center bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Real-Time Intelligence</h3>
                <p className="text-slate-600 leading-relaxed">
                  Financial metrics, client activity, and project statuses are aggregated instantly into your master dashboard, giving absolute clarity at a glance.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-12 w-12 flex items-center justify-center bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Zero-Friction Context</h3>
                <p className="text-slate-600 leading-relaxed">
                  With features like Global Command Search and unified settings, every module is accessible instantly without ever breaking your workflow.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="py-24 px-6">
        <CallToAction 
          title="Join the future of business management" 
          description="Whether you are an independent freelancer or a growing agency, Soseki gives you everything you need to manage your business with clarity, ownership, and confidence." 
        />
      </div>

      <Footer />
    </main>
  );
}
