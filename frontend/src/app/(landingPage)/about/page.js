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
    icon: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
    title: "Zero bloat",
    desc: "Only meaningful features that improve productivity.",
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-blue-600" />,
    title: "Complete ownership",
    desc: "Your business data always belongs to you.",
  },
  {
    icon: <Gauge className="h-4 w-4 text-blue-600" />,
    title: "Modern experience",
    desc: "Fast, intuitive, responsive, and enjoyable software.",
  },
  {
    icon: <Code2 className="h-4 w-4 text-blue-600" />,
    title: "Open by default",
    desc: "Transparent development powered by open source.",
  },
];

const audiences = [
  {
    icon: <Users className="h-4 w-4 text-blue-600" />,
    title: "Freelancers",
    desc: "Manage clients, invoices, and projects from one place.",
  },
  {
    icon: <Workflow className="h-4 w-4 text-blue-600" />,
    title: "Agencies",
    desc: "Collaborate with teams while handling multiple clients across currencies.",
  },
  {
    icon: <Building2 className="h-4 w-4 text-blue-600" />,
    title: "Consultants",
    desc: "Simplify client onboarding, billing, and reporting.",
  },
  {
    icon: <Layers3 className="h-4 w-4 text-blue-600" />,
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

const technologyStacks = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS"],
    icon: <LayoutGrid className="h-4 w-4 text-blue-600" />,
  },
  {
    label: "Backend",
    items: ["Node.js", "Express"],
    icon: <Workflow className="h-4 w-4 text-blue-600" />,
  },
  {
    label: "Database",
    items: ["PostgreSQL", "Prisma ORM"],
    icon: <Database className="h-4 w-4 text-blue-600" />,
  },
  {
    label: "Authentication",
    items: ["JWT", "Secure sessions"],
    icon: <KeyRound className="h-4 w-4 text-blue-600" />,
  },
  {
    label: "Other",
    items: ["Recharts", "DiceBear", "HTML PDF rendering"],
    icon: <LineChart className="h-4 w-4 text-blue-600" />,
  },
  {
    label: "Support tools",
    items: ["Search", "Tickets", "Reports"],
    icon: <Search className="h-4 w-4 text-blue-600" />,
  },
];

const openSourceBullets = [
  "100% open source",
  "Self hosted",
  "Own your data",
  "Community driven",
  "Transparent development",
];

const visualGallery = [
  {
    src: "/dashboard.png",
    alt: "Soseki dashboard preview",
    title: "Daily operations",
    desc: "The center of the workspace, where the numbers and work live together.",
  },
  {
    src: "/banner.jpeg",
    alt: "Soseki product banner",
    title: "Public-facing polish",
    desc: "A premium visual language that carries through the marketing experience.",
  },
  {
    src: "/login-banner.jpeg",
    alt: "Soseki login banner",
    title: "Focused entry points",
    desc: "Clean, calm surfaces that make first contact feel intentional.",
  },
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
                <Link href="https://x.com/ayushsolanki29" target="_blank" className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm" aria-label="X (Twitter)">
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

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Core Principles"
              title="Everything we build follows four rules"
              desc="The product should feel calm, capable, and trustworthy. These principles keep the work focused."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Who It Is For"
              title="Built for modern service businesses"
              desc="The product is aimed at teams that need structure without losing speed."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {audiences.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Platform Overview"
              title="Everything connected"
              desc="The modules do not live in isolation. They work together as one operating system for the whole client lifecycle."
              align="center"
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12 rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
            <div className="flex flex-wrap gap-3">
              {platformModules.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                "The dashboard surfaces the numbers that matter.",
                "Clients, projects, invoices, and payments move in one flow.",
                "Search, settings, support, and reporting stay close at hand.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-slate-100 bg-slate-50/70 p-5 text-sm leading-7 text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Visual Story"
              title="A product that looks as thoughtful as it feels"
              desc="The screenshots, banners, and brand assets are part of the experience. They should all feel like the same product family."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {visualGallery.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Technology"
              title="Built with modern tools"
              desc="The stack is practical, familiar, and easy to maintain for teams that want to deploy and move fast."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {technologyStacks.map((stack, index) => (
              <Reveal key={stack.label} delay={index * 0.05}>
                <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                      {stack.icon}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{stack.label}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Open Source Commitment"
              title="Open source. Self hosted. Yours."
              desc="Businesses should own their software and their data. Deploy Soseki on your own infrastructure, customize it to your workflow, contribute to the project, and never worry about vendor lock-in or per-seat pricing."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {openSourceBullets.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                  <Globe className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Community first
                  </p>
                  <p className="text-sm text-slate-600">
                    Transparent development, open contribution paths, and full data control.
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <FileText className="h-4 w-4 text-blue-600" />,
                    title: "Docs",
                    desc: "Clear implementation guidance and product notes.",
                  },
                  {
                    icon: <Ticket className="h-4 w-4 text-blue-600" />,
                    title: "Issues",
                    desc: "Track bugs, ideas, and improvements in the open.",
                  },
                  {
                    icon: <Settings2 className="h-4 w-4 text-blue-600" />,
                    title: "Customization",
                    desc: "Adapt the platform to your workflow and branding.",
                  },
                  {
                    icon: <Receipt className="h-4 w-4 text-blue-600" />,
                    title: "Data export",
                    desc: "Move your records without asking for permission.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[18px] border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                        {item.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-b border-slate-100 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Join the future of business management
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Whether you are an independent freelancer or a growing agency, Soseki gives you
              everything you need to manage your business with clarity, ownership, and confidence.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Get Started Free
              </Link>
              <Link href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                View Pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
