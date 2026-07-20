"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Palette, Sparkles, Type } from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const palette = [
  { name: "Blue", value: "#2563eb" },
  { name: "Slate", value: "#0f172a" },
  { name: "Background", value: "#f3f8ff" },
  { name: "Surface", value: "#ffffff" },
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

export default function BrandAssetsPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />
      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <Palette className="h-3.5 w-3.5" />
              Brand Assets
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              The visual building blocks of Soseki
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Use these brand assets to keep the product feeling consistent across web, docs, and community spaces.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#assets" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                View Assets
              </Link>
              <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Request Usage Help <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative z-10">
            <div className="relative mx-auto w-full max-w-[640px]">
              <div className="absolute -inset-8 rounded-[36px] bg-blue-100/25 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                <Image src="/logo.png" alt="Soseki logo" width={1200} height={760} priority className="h-auto w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="assets" className="border-b border-slate-100 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Logo and type" title="Use the core identity consistently" desc="These are the most recognizable parts of the brand." align="center" />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-4">
                <Image src="/logo.png" alt="Soseki logo" width={72} height={72} className="h-18 w-18 rounded-2xl border border-slate-200 object-cover" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Logo</h3>
                  <p className="mt-1 text-sm text-slate-600">Use the logo at a clear size with enough space around it.</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/logo.png" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-slate-200 bg-white text-slate-700")}>
                  Download PNG
                </Link>
                <Link href="/logo.svg" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-slate-200 bg-white text-slate-700")}>
                  Download SVG
                </Link>
              </div>
            </div>
            <div className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                  <Type className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Typography</h3>
                  <p className="mt-1 text-sm text-slate-600">Keep headings bold, clean, and readable.</p>
                </div>
              </div>
              <div className="mt-6 rounded-[18px] border border-slate-100 bg-slate-50/70 p-5">
                <p className="text-sm font-semibold text-slate-900">Plus Jakarta Sans</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">The product uses a modern sans-serif look to stay calm and clear.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Palette" title="A restrained set of colors" desc="Use these colors to stay visually aligned with the rest of the site." align="center" />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {palette.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.05}>
                <div className="overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="h-28" style={{ background: item.value }} />
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-100 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Need a specific format?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Reach out and we&apos;ll help point you to the right file or usage guidance.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Contact Us
              </Link>
              <Link href="/community" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Visit Community <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
