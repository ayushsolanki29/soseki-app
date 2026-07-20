"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  BookOpen,
  CheckCircle2,
  Code2,
  FileText,
  Globe,
  Heart,
  LayoutGrid,
  Lightbulb,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  CircleDollarSign,
  Repeat2,
  GraduationCap,
  TimerReset,
} from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const whyWorkCards = [
  {
    icon: <BookOpen className="h-4 w-4 text-blue-600" />,
    title: "Open source first",
    desc: "We build in public and ship software that people can actually own.",
  },
  {
    icon: <MapPin className="h-4 w-4 text-blue-600" />,
    title: "Remote friendly",
    desc: "Work from where you do your best thinking and shipping.",
  },
  {
    icon: <Code2 className="h-4 w-4 text-blue-600" />,
    title: "Modern tech stack",
    desc: "Next.js, React, Tailwind, Node.js, Express, PostgreSQL, and Prisma.",
  },
  {
    icon: <Heart className="h-4 w-4 text-blue-600" />,
    title: "Meaningful impact",
    desc: "The work helps freelancers, agencies, and service businesses every day.",
  },
  {
    icon: <Rocket className="h-4 w-4 text-blue-600" />,
    title: "Small team, big vision",
    desc: "Move fast with less noise and more ownership.",
  },
  {
    icon: <GraduationCap className="h-4 w-4 text-blue-600" />,
    title: "Continuous learning",
    desc: "You get space to grow while shipping things that matter.",
  },
];

const cultureValues = [
  {
    icon: <Sparkles className="h-4 w-4 text-blue-600" />,
    title: "Simplicity",
    desc: "We prefer clear systems and focused product decisions.",
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-blue-600" />,
    title: "Transparency",
    desc: "We share context, communicate early, and keep the work visible.",
  },
  {
    icon: <CircleDollarSign className="h-4 w-4 text-blue-600" />,
    title: "Ownership",
    desc: "We trust people to make decisions and carry them through.",
  },
  {
    icon: <Bot className="h-4 w-4 text-blue-600" />,
    title: "Innovation",
    desc: "We use modern tools thoughtfully and keep improving the craft.",
  },
  {
    icon: <Users className="h-4 w-4 text-blue-600" />,
    title: "Collaboration",
    desc: "We work like a team, not a queue.",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
    title: "Quality over quantity",
    desc: "Shipping less is fine if it is better, clearer, and more durable.",
  },
];

const technologies = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
];

const processSteps = [
  {
    icon: <FileText className="h-4 w-4 text-blue-600" />,
    title: "Application",
    desc: "Send us your resume, portfolio, or a short note about what you care about.",
  },
  {
    icon: <Repeat2 className="h-4 w-4 text-blue-600" />,
    title: "Initial Conversation",
    desc: "A quick conversation to understand your background and how you like to work.",
  },
  {
    icon: <Code2 className="h-4 w-4 text-blue-600" />,
    title: "Technical Discussion",
    desc: "We talk through how you think, build, and make tradeoffs.",
  },
  {
    icon: <Lightbulb className="h-4 w-4 text-blue-600" />,
    title: "Final Interview",
    desc: "A final pass on collaboration, product judgment, and fit.",
  },
  {
    icon: <Users className="h-4 w-4 text-blue-600" />,
    title: "Welcome to Soseki",
    desc: "You join a small team focused on shipping careful, useful software.",
  },
];

const introStats = [
  { label: "Team size", value: "Small and focused" },
  { label: "Work style", value: "Remote friendly" },
  { label: "Stack", value: "Modern SaaS" },
];

const gallery = [
  {
    src: "/dashboard.png",
    title: "Product surface",
    desc: "The kind of work we build every day.",
  },
  {
    src: "/banner.jpeg",
    title: "Brand feel",
    desc: "A premium product story that still feels grounded.",
  },
  {
    src: "/login-banner.jpeg",
    title: "Entry experience",
    desc: "Clear, calm, and intentional from the first click.",
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

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />

      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <Rocket className="h-3.5 w-3.5" />
              Careers
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              Build the future of business software
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              We&apos;re building an open-source business operating system that helps freelancers,
              agencies, and service businesses simplify their work. Join us in creating software
              that thousands of businesses will rely on every day.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#open-positions" className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                View Open Positions
              </Link>
              <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Learn About Soseki
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {introStats.map((item) => (
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
                  alt="Soseki product preview"
                  width={1200}
                  height={760}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Small team</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">A calm place to build focused software.</p>
                </div>
                <div className="absolute bottom-4 right-4 w-[220px] rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Soseki logo" width={40} height={40} className="h-10 w-10 rounded-xl border border-slate-200 object-cover" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">Join us</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">Work on something meaningful.</p>
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
              eyebrow="Why Work With Us"
              title="A small team with a very clear product point of view"
              desc="We care about building useful, durable software and keeping the experience elegant as it grows."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {whyWorkCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05}>
                <div className="rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(37,99,235,0.08)]">
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
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Our Culture"
              title="We value clear thinking and calm execution"
              desc="Soseki values simplicity, transparency, ownership, innovation, collaboration, and quality over quantity."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {["Simplicity", "Transparency", "Ownership", "Innovation", "Collaboration", "Quality over quantity"].map((item) => (
                <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {cultureValues.map((item) => (
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
              eyebrow="Technology"
              title="We build with a modern stack"
              desc="The stack is practical, fast, and friendly to thoughtful product work."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="rounded-[20px] border border-slate-100 bg-white p-6 text-center shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    <LayoutGrid className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{item}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="open-positions" className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Open Positions"
              title="No open positions right now"
              desc="We&apos;re always looking for passionate developers, designers, and product thinkers. If you&apos;d like to work with us in the future, we&apos;d love to hear from you."
              align="center"
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="border-b border-slate-100 p-7 lg:border-b-0 lg:border-r">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[12px] font-medium text-slate-600">
                    <TimerReset className="h-3.5 w-3.5 text-blue-600" />
                    Always open to great people
                  </div>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
                    We keep the door open for future talent.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    If you connect with the product and the way we work, send your resume and a short note. We keep promising conversations close by.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="mailto:careers@soseki.app?subject=Soseki%20Resume"
                      className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}
                    >
                      Send Your Resume
                    </Link>
                    <Link
                      href="/about"
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}
                    >
                      Learn More About Us
                    </Link>
                  </div>
                </div>

                <div className="p-7">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { icon: <Users className="h-4 w-4 text-blue-600" />, title: "Developers", desc: "Product-minded engineers who like thoughtful UI and clean systems." },
                      { icon: <Code2 className="h-4 w-4 text-blue-600" />, title: "Designers", desc: "People who can make complex work feel simple and premium." },
                      { icon: <Workflow className="h-4 w-4 text-blue-600" />, title: "Product thinkers", desc: "Builders who can connect user needs to durable decisions." },
                      { icon: <Globe className="h-4 w-4 text-blue-600" />, title: "Future teammates", desc: "Folks who care about ownership, quality, and collaboration." },
                    ].map((item) => (
                      <div key={item.title} className="rounded-[18px] border border-slate-100 bg-slate-50/70 p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                            {item.icon}
                          </div>
                          <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
                      </div>
                    ))}
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
              eyebrow="Hiring Process"
              title="A simple, respectful process"
              desc="We keep the process clear and human so you know what to expect."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    {step.icon}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">0{index + 1}</div>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
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
              eyebrow="Visual story"
              title="The product and the team belong to the same world"
              desc="The way the product looks should match the way the team works: intentional, modern, and calm."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={item.src}
                      alt={item.title}
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

      <section className="relative border-b border-slate-100 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Join us in building the future of open-source business software
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              We&apos;re building software with care, ownership, and a long horizon. The work is serious, but the atmosphere stays human.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#open-positions"
                className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}
              >
                View Open Positions
              </Link>
              <Link
                href="/about"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}
              >
                Learn About Soseki
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
