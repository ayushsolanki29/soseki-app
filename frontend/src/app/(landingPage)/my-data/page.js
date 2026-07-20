"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Database,
  Download,
  HardDriveDownload,
  Heart,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  CheckCircle2,
  Server,
} from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const controlCards = [
  {
    icon: <Download className="h-4 w-4 text-blue-600" />,
    title: "Export anytime",
    desc: "Pull your business records out whenever you need them.",
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-blue-600" />,
    title: "Private by default",
    desc: "Your data belongs to you, not the platform.",
  },
  {
    icon: <RefreshCw className="h-4 w-4 text-blue-600" />,
    title: "Easy migration",
    desc: "Move between systems without getting trapped.",
  },
  {
    icon: <Lock className="h-4 w-4 text-blue-600" />,
    title: "Secure access",
    desc: "Protect sensitive business information with modern controls.",
  },
];

const ownershipPoints = [
  "Clients",
  "Projects",
  "Invoices",
  "Payments",
  "Expenses",
  "Questionnaires",
  "Support tickets",
  "Workspace settings",
];

const dataPrinciples = [
  {
    icon: <Heart className="h-4 w-4 text-blue-600" />,
    title: "Owned by you",
    desc: "You should be able to access, export, and manage your records without barriers.",
  },
  {
    icon: <Database className="h-4 w-4 text-blue-600" />,
    title: "Structured clearly",
    desc: "Data is organized so it can support real operations and reporting.",
  },
  {
    icon: <Server className="h-4 w-4 text-blue-600" />,
    title: "Portable",
    desc: "Self-hosting and migration stay practical, not ceremonial.",
  },
  {
    icon: <Users className="h-4 w-4 text-blue-600" />,
    title: "Team friendly",
    desc: "Access control and collaboration stay part of the design.",
  },
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

export default function MyDataPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />

      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <Database className="h-3.5 w-3.5" />
              My Data
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              Your data always belongs to you
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Soseki is built around ownership and portability. Your records should be easy to
              access, export, migrate, and secure without turning into a support ticket marathon.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#control" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Explore Data Control
              </Link>
              <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Learn About Soseki
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { label: "Ownership", value: "Always yours" },
                { label: "Export", value: "One click" },
                { label: "Migration", value: "Portable" },
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
                <Image
                  src="/dashboard.png"
                  alt="Soseki dashboard preview"
                  width={1200}
                  height={760}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Portable by design</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">Move your records when you need to.</p>
                </div>
                <div className="absolute bottom-4 right-4 w-[220px] rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Soseki logo" width={40} height={40} className="h-10 w-10 rounded-xl border border-slate-200 object-cover" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">Ownership first</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">No hidden control layer.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Why data ownership matters"
              title="Business software should not hold your business hostage"
              desc="We think access, export, and control should be normal parts of the product, not premium exceptions."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {controlCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05}>
                <div className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Control"
              title="You decide what happens to your records"
              desc="The workspace is built to help you store, manage, and export the things that matter to your business."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {ownershipPoints.map((item) => (
                <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {dataPrinciples.map((item) => (
                <div key={item.title} className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
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
              eyebrow="Security and portability"
              title="Private, secure, and easy to move"
              desc="Data ownership means nothing if security and migration are awkward. We want both to feel obvious."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: <ShieldCheck className="h-4 w-4 text-blue-600" />,
                title: "Security controls",
                desc: "Protect access with modern authentication and permission boundaries.",
              },
              {
                icon: <HardDriveDownload className="h-4 w-4 text-blue-600" />,
                title: "Backup-friendly",
                desc: "Keep usable copies of your data without fighting the platform.",
              },
              {
                icon: <Workflow className="h-4 w-4 text-blue-600" />,
                title: "Migration-friendly",
                desc: "Move between systems with less friction and less anxiety.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="What you can own"
              title="The core of your business stays in your hands"
              desc="Soseki is designed around the records that matter most to service businesses."
              align="center"
            />
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            {ownershipPoints.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-100 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Own your business data with confidence
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              When your records are portable, secure, and easy to manage, the product becomes a partner instead of a lock-in risk.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Get Started
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
