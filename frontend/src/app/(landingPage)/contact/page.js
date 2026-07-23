"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LifeBuoy,
  Mail,
  MapPin,
  MessageSquare,
  Rocket,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { APP_EMAILS } from "@/lib/constants";

const contactCards = [
  ...APP_EMAILS.map((email) => ({
    icon: email.label.toLowerCase().includes('support') 
      ? <LifeBuoy className="h-4 w-4 text-blue-600" /> 
      : <Mail className="h-4 w-4 text-blue-600" />,
    title: email.label,
    desc: email.value,
    href: `mailto:${email.value}`,
  })),
  {
    icon: <MessageSquare className="h-4 w-4 text-blue-600" />,
    title: "Community",
    desc: "GitHub discussions and contributions",
    href: "/community",
  },
  {
    icon: <MapPin className="h-4 w-4 text-blue-600" />,
    title: "Location",
    desc: "Remote-first team",
    href: "#",
  },
];

const reasons = [
  "Product questions",
  "Partnerships",
  "Press and media",
  "Bug reports",
  "Feature ideas",
  "General feedback",
];

const responsePoints = [
  { title: "Fast responses", desc: "We do our best to reply quickly and clearly." },
  { title: "Friendly support", desc: "You’ll always get a human answer, not a wall of text." },
  { title: "Right channel", desc: "We route requests to the people who can actually help." },
  { title: "Community first", desc: "Open source questions are welcome here too." },
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

export const metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />

      <section className="relative min-h-screen border-b border-slate-100 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-white pointer-events-none" />
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-600 shadow-sm">
              <Rocket className="h-3.5 w-3.5" />
              Contact Us
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-[4.5rem] leading-[1.03]">
              Let&apos;s talk about your business
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              Whether you have a question, a partnership idea, or feedback about the platform,
              we&apos;d love to hear from you.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={`mailto:${APP_EMAILS[0]?.value}?subject=Hello%20Soseki`} className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Send a Message
              </Link>
              <Link href="/community" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Join Community <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ...APP_EMAILS,
                { label: "Response", value: "Usually within a day" },
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
                  src="/login-banner.jpeg"
                  alt="Soseki contact banner"
                  width={1200}
                  height={760}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Talk to us</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">We keep conversations simple and human.</p>
                </div>
                <div className="absolute bottom-4 right-4 w-[220px] rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Soseki logo" width={40} height={40} className="h-10 w-10 rounded-xl border border-slate-200 object-cover" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">Direct contact</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">We read every thoughtful note.</p>
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
              eyebrow="Ways to reach us"
              title="Choose the channel that fits best"
              desc="Use the path that matches your question so we can get you to the right person."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05}>
                <Link href={card.href} className="block rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(37,99,235,0.08)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/50 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="What we can help with"
              title="We welcome all the useful stuff"
              desc="A good message is usually short, specific, and easy to route."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {reasons.map((item) => (
                <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {responsePoints.map((item) => (
                <div key={item.title} className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
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

      <section className="relative border-b border-slate-100 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Say hello, share feedback, or start a conversation
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-[21px]">
              We&apos;re always happy to hear from people who care about the product and the people using it.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={`mailto:${APP_EMAILS[0]?.value}?subject=Hello%20Soseki`} className={cn(buttonVariants({ size: "lg" }), "bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-6")}>
                Send Your Message
              </Link>
              <Link href="/community" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-slate-200 bg-white px-6 text-slate-700 hover:bg-slate-50")}>
                Visit Community
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
