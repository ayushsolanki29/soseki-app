"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const docLinks = [
  { icon: <BookOpen className="h-4 w-4 text-blue-600" />, title: "Getting Started", desc: "Learn the basics and set up your workspace quickly.", href: "/about" },
  { icon: <Workflow className="h-4 w-4 text-blue-600" />, title: "Workspace Guide", desc: "Explore how the main modules fit together.", href: "/features" },
  { icon: <ShieldCheck className="h-4 w-4 text-blue-600" />, title: "Security", desc: "Understand privacy, data handling, and access control.", href: "/security" },
  { icon: <Users className="h-4 w-4 text-blue-600" />, title: "Community", desc: "Find ways to contribute and connect.", href: "/community" },
  { icon: <Lightbulb className="h-4 w-4 text-blue-600" />, title: "Product Ideas", desc: "See what the team is thinking about next.", href: "/community" },
  { icon: <Rocket className="h-4 w-4 text-blue-600" />, title: "Release Notes", desc: "Track progress and new improvements.", href: "/blog" },
];

const quickStart = [
  "Create an account",
  "Set up your workspace",
  "Import or start fresh",
  "Invite your team",
];

function SectionHeading({ eyebrow, title, desc, align = "left" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[12px] font-medium text-blue-600 shadow-sm">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{desc}</p>
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

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />

      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <FileText className="h-3.5 w-3.5" />
              Documentation
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              Everything you need to understand Soseki
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Start here to learn the product, explore the workflow, and find the next best place to go.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#docs" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Browse Docs
              </Link>
              <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { label: "Status", value: "Public docs" },
                { label: "Scope", value: "Product + platform" },
                { label: "Tone", value: "Clear and practical" },
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
              <div className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                <Image src="/dashboard.png" alt="Soseki docs preview" width={1200} height={760} priority className="h-auto w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Learn faster</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">A calm starting point for the platform.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="docs" className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Quick start" title="A short path from curious to confident" desc="Use this as your first stop." align="center" />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickStart.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-600">0{index + 1}</div>
                  <h3 className="text-base font-semibold text-slate-900">{item}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Documentation map" title="Jump to the right place" desc="The docs are organized around the most common questions people have." align="center" />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {docLinks.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <Link href={item.href} className="block rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">{item.icon}</div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-100 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Want the full product experience?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Explore the product pages, then jump into the app when you&apos;re ready.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/features" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                View Features
              </Link>
              <Link href="/community" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Join Community <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
