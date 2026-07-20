"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Sparkles, Users, Database } from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const pillars = [
  { icon: <ShieldCheck className="h-4 w-4 text-blue-600" />, title: "Protected access", desc: "Authentication and access controls help protect workspaces." },
  { icon: <Lock className="h-4 w-4 text-blue-600" />, title: "Privacy minded", desc: "We limit access to what is needed to operate the service." },
  { icon: <Database className="h-4 w-4 text-blue-600" />, title: "Backups and recovery", desc: "Reliable backups support continuity and recovery planning." },
  { icon: <Users className="h-4 w-4 text-blue-600" />, title: "People and process", desc: "Security also comes from good internal practices." },
];

const practices = [
  "JWT-based auth flows",
  "httpOnly session cookies",
  "Role-aware access control",
  "Reasonable operational logging",
  "Backup-aware data handling",
  "Self-hosting flexibility",
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

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />
      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              Security
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              Security that stays practical
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              We care about protecting customer data without turning the product into a maze.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#security" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                View Security Practices
              </Link>
              <Link href="/privacy-policy" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Privacy Policy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative z-10">
            <div className="relative mx-auto w-full max-w-[640px]">
              <div className="absolute -inset-8 rounded-[36px] bg-blue-100/25 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                <Image src="/dashboard.png" alt="Security banner" width={1200} height={760} priority className="h-auto w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="security" className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Security pillars" title="The basics we care about" desc="These are the building blocks of a safer product." align="center" />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">{item.icon}</div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
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
            <SectionHeading eyebrow="Practices" title="A few things we do consistently" desc="Security is partly technical, partly operational, and partly discipline." align="center" />
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            {practices.map((item) => (
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
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Security questions are always welcome</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              If you need more detail, reach out and we&apos;ll point you in the right direction.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Contact Us
              </Link>
              <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Read the Docs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
