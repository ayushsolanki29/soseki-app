"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, PenTool, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const posts = [
  { title: "Building a calmer business OS", date: "July 20, 2026", desc: "Why we care so much about focus, ownership, and less busywork." },
  { title: "What open source means for service teams", date: "July 20, 2026", desc: "How self-hosting and transparent development change the experience." },
  { title: "Designing for daily operations", date: "July 20, 2026", desc: "A look at the product choices behind the interface." },
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

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />
      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <PenTool className="h-3.5 w-3.5" />
              Blog
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              Stories from the team behind Soseki
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Short notes, product thinking, and release context from the people building the platform.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#posts" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Read Posts
              </Link>
              <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                View Docs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { label: "Format", value: "Short reads" },
                { label: "Tone", value: "Practical" },
                { label: "Focus", value: "Product + open source" },
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
                <Image src="/banner.jpeg" alt="Soseki blog banner" width={1200} height={760} priority className="h-auto w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Latest thoughts</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">A place for product notes and updates.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="posts" className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Latest posts" title="A few stories to start with" desc="These are short and useful by design." align="center" />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.title} delay={index * 0.05}>
                <article className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
                    {post.date}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{post.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{post.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-100 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Want to follow along?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Keep an eye on the docs and community pages as the product evolves.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/community" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Join Community
              </Link>
              <Link href="/docs" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                View Docs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
