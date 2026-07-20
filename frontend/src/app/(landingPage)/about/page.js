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
  Sparkles,
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
} from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const missionPoints = [
  "Simplify business management",
  "Eliminate SaaS bloat",
  "Give users full data ownership",
  "Build powerful open source software",
];

const differenceCards = [
  {
    icon: <CircleDollarSign className="h-4 w-4 text-blue-600" />,
    title: "Multi-currency financials",
    desc: "Create invoices and manage expenses globally with automatic exchange rates.",
  },
  {
    icon: <Bot className="h-4 w-4 text-blue-600" />,
    title: "AI productivity",
    desc: "Generate questionnaires and migrate existing business data with AI assistance.",
  },
  {
    icon: <LayoutGrid className="h-4 w-4 text-blue-600" />,
    title: "Complete business workspace",
    desc: "Clients, projects, invoices, payments, expenses, dashboards, and reporting in one place.",
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-blue-600" />,
    title: "Open source freedom",
    desc: "Self-host your workspace, own your data, and avoid vendor lock-in forever.",
  },
];

const principles = [
  {
    icon: <Sparkles className="h-4 w-4 text-blue-600" />,
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
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[12px] font-medium text-blue-600 shadow-sm">
        <Sparkles className="h-3.5 w-3.5" />
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

      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              About Soseki
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              Building a better business workspace
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Soseki is an open-source business operating system built for freelancers,
              consultants, agencies, and service businesses. Instead of juggling
              spreadsheets, disconnected tools, and expensive subscriptions, Soseki brings
              everything together into one modern workspace.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Get Started
              </Link>
              <Link href="/features" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                View Documentation
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-[13px] text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">Open source</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">Self hosted</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">Premium UX</span>
            </div>
            <div className="mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { label: "Unified workspace", value: "One system" },
                { label: "Setup time", value: "Minutes" },
                { label: "Ownership", value: "Yours" },
              ].map((item) => (
                <div key={item.label} className="rounded-[18px] border border-slate-100 bg-white/90 px-4 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative z-10">
            <div className="relative mx-auto w-full max-w-[640px]">
              <div className="absolute -inset-8 rounded-[36px] bg-blue-100/25 blur-3xl" />
              <div className="relative grid gap-4">
                <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                  <Image
                    src="/dashboard.png"
                    alt="Soseki dashboard preview"
                    width={1200}
                    height={760}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                    <Image
                      src="/login-banner.jpeg"
                      alt="Soseki login banner preview"
                      width={900}
                      height={560}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                    <Image
                      src="/banner.jpeg"
                      alt="Soseki brand banner preview"
                      width={900}
                      height={560}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute left-4 top-4 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Built for clarity</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">A workspace that feels calm from the first click.</p>
                </div>
                <div className="absolute bottom-4 right-4 w-[220px] rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Soseki logo" width={40} height={40} className="h-10 w-10 rounded-xl border border-slate-200 object-cover" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">Premium by design</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">Refined surfaces, no noise.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Why We Built Soseki"
              title="A cleaner way to run a service business"
              desc="Running a service business should not require five different SaaS products, endless spreadsheets, or hours of manual administration. Soseki was created to replace that fragmented workflow with a single, beautifully designed platform that manages the complete client lifecycle."
            />
            <div className="mt-8 rounded-[24px] border border-slate-100 bg-slate-50/70 p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-600">
                Named after the Japanese novelist Natsume Soseki, the platform follows the same
                philosophy: simple, clear, purposeful. No unnecessary features. No vendor lock-in.
                No clutter. Just the tools you actually need.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4">
              {[
                {
                  icon: <BookOpen className="h-4 w-4 text-blue-600" />,
                  title: "Simple",
                  desc: "Less friction, fewer tabs, and a tighter workflow.",
                },
                {
                  icon: <Workflow className="h-4 w-4 text-blue-600" />,
                  title: "Clear",
                  desc: "Every module is organized around real operational work.",
                },
                {
                  icon: <Heart className="h-4 w-4 text-blue-600" />,
                  title: "Purposeful",
                  desc: "Features exist because they solve a concrete problem.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Our Mission"
              title="Ownership, transparency, and less operational noise"
              desc="We want freelancers, agencies, and service businesses to own their business operations through a modern open-source platform that is powerful, transparent, and easy to use."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {missionPoints.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-600">
                    0{index + 1}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{item}</h3>
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
              eyebrow="What Makes Soseki Different"
              title="Designed around real business workflows"
              desc="Every major surface in Soseki is built to reduce context switching and keep the business moving."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {differenceCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05}>
                <div className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(37,99,235,0.08)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">{card.desc}</p>
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
