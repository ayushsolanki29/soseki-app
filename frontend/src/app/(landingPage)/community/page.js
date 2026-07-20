"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bug,
  Code2,
  FileText,
  GitBranch,
  Globe,
  Heart,
  LifeBuoy,
  Lightbulb,
  MessageSquare,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Workflow,
} from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const contributionCards = [
  { icon: <Bug className="h-4 w-4 text-blue-600" />, title: "Report bugs", desc: "Help us spot issues and make the platform more reliable." },
  { icon: <Lightbulb className="h-4 w-4 text-blue-600" />, title: "Request features", desc: "Share ideas that improve the product for real businesses." },
  { icon: <BookOpen className="h-4 w-4 text-blue-600" />, title: "Improve docs", desc: "Clear documentation helps everyone move faster." },
  { icon: <GitBranch className="h-4 w-4 text-blue-600" />, title: "Submit pull requests", desc: "Contribute code, fixes, and refinements to the project." },
  { icon: <MessageSquare className="h-4 w-4 text-blue-600" />, title: "Share feedback", desc: "Tell us what feels unclear, slow, or missing." },
  { icon: <LifeBuoy className="h-4 w-4 text-blue-600" />, title: "Help other users", desc: "Answer questions and support people using Soseki." },
];

const values = [
  { icon: <Sparkles className="h-4 w-4 text-blue-600" />, title: "Open collaboration", desc: "Build in the open and share context generously." },
  { icon: <ShieldCheck className="h-4 w-4 text-blue-600" />, title: "Transparency", desc: "Keep discussions and decisions visible whenever possible." },
  { icon: <Heart className="h-4 w-4 text-blue-600" />, title: "Respect", desc: "Treat contributors and users with care." },
  { icon: <Workflow className="h-4 w-4 text-blue-600" />, title: "Continuous improvement", desc: "Keep refining the product and the process." },
  { icon: <Users className="h-4 w-4 text-blue-600" />, title: "Knowledge sharing", desc: "Make it easier for others to learn and contribute." },
];

const resources = [
  { icon: <FileText className="h-4 w-4 text-blue-600" />, title: "Documentation", desc: "Learn how the platform works and how to extend it." },
  { icon: <Code2 className="h-4 w-4 text-blue-600" />, title: "GitHub Repository", desc: "Browse the source, issues, and pull requests." },
  { icon: <MessageSquare className="h-4 w-4 text-blue-600" />, title: "Discussions", desc: "Join conversations about ideas and improvements." },
  { icon: <Search className="h-4 w-4 text-blue-600" />, title: "Roadmap", desc: "See what is coming and what is being considered." },
  { icon: <Star className="h-4 w-4 text-blue-600" />, title: "Changelog", desc: "Track product progress as the platform evolves." },
  { icon: <Rocket className="h-4 w-4 text-blue-600" />, title: "Release notes", desc: "Stay up to date with new features and fixes." },
];

const journeyPoints = [
  "Community driven",
  "Self hosted",
  "MIT / Open source",
  "Public development",
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

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />

      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <Globe className="h-3.5 w-3.5" />
              Community
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              Built by the community. Powered by open source.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Soseki grows through its community of developers, freelancers, agencies, and
              contributors. Whether you&apos;re fixing bugs, suggesting features, or improving
              documentation, your contribution helps shape the future of the platform.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#resources" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Join Community
              </Link>
              <Link href="https://github.com/ayushsolanki29/soseki" target="_blank" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Contribute <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { label: "Contributors", value: "Worldwide" },
                { label: "Development", value: "Public" },
                { label: "Support", value: "Community-led" },
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Open by default</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">A public product with a private level of care.</p>
                </div>
                <div className="absolute bottom-4 right-4 w-[220px] rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Soseki logo" width={40} height={40} className="h-10 w-10 rounded-xl border border-slate-200 object-cover" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">Join in</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">Contributions shape the roadmap.</p>
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
              eyebrow="Ways to Contribute"
              title="There are many ways to help"
              desc="You do not need to be a core maintainer to make a real impact."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {contributionCards.map((card, index) => (
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
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Community Values"
              title="We keep the work open, kind, and useful"
              desc="The community works best when the culture stays generous and the feedback stays constructive."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {["Open collaboration", "Transparency", "Respect", "Continuous improvement", "Knowledge sharing"].map((item) => (
                <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((item) => (
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
              eyebrow="Open Source Journey"
              title="Built in public, improved together"
              desc="Soseki is fully open source and welcomes contributions from developers worldwide."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {journeyPoints.map((item, index) => (
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

      <section id="resources" className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Resources"
              title="Everything you need to get involved"
              desc="Use these entry points to explore, discuss, and contribute."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
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
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Become part of the Soseki community and help build the future of business management software
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              A strong community makes the product stronger, the documentation clearer, and the roadmap better.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="https://github.com/ayushsolanki29/soseki" target="_blank" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Join Community
              </Link>
              <Link href="/careers" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                View Careers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
