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
  Zap,
  Heart,
  Waypoints,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { GithubIcon } from "@/components/github-icon";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { APP_EMAILS } from "@/lib/constants";
import { CallToAction } from "@/components/cta";

const contactCards = [
  {
    icon: <Mail className="h-6 w-6 text-emerald-600" />,
    iconBgClass: "bg-emerald-50",
    iconBorderClass: "border-emerald-100",
    hoverBorderClass: "hover:border-emerald-300",
    title: "General Inquiries",
    desc: "hello.soseki.app@gmail.com",
    href: "mailto:hello.soseki.app@gmail.com",
  },
  {
    icon: <LifeBuoy className="h-6 w-6 text-blue-600" />,
    iconBgClass: "bg-blue-50",
    iconBorderClass: "border-blue-100",
    hoverBorderClass: "hover:border-blue-300",
    title: "Technical Support",
    desc: "Get help with your workspace.",
    href: "mailto:hello.soseki.app@gmail.com?subject=Support Request",
  },
  {
    icon: <GithubIcon className="h-6 w-6 text-slate-700" fill="currentColor" />,
    iconBgClass: "bg-slate-100",
    iconBorderClass: "border-slate-200",
    hoverBorderClass: "hover:border-slate-400",
    title: "GitHub Discussions",
    desc: "Join the open-source community.",
    href: "https://github.com/ayushsolanki29/soseki-app/discussions",
  },
  {
    icon: <MapPin className="h-6 w-6 text-indigo-600" />,
    iconBgClass: "bg-indigo-50",
    iconBorderClass: "border-indigo-100",
    hoverBorderClass: "hover:border-indigo-300",
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
  { 
    title: "Fast responses", 
    desc: "We do our best to reply quickly and clearly.",
    icon: <Zap className="h-5 w-5" />
  },
  { 
    title: "Friendly support", 
    desc: "You’ll always get a human answer, not a wall of text.",
    icon: <Heart className="h-5 w-5" />
  },
  { 
    title: "Right channel", 
    desc: "We route requests to the people who can actually help.",
    icon: <Waypoints className="h-5 w-5" />
  },
  { 
    title: "Community first", 
    desc: "Open source questions are welcome here too.",
    icon: <Users className="h-5 w-5" />
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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-clip">
      <Header />

      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 border-b border-slate-100 px-4 sm:px-6 bg-slate-50 overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative z-10 pt-4 md:pt-8">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 md:mb-8 leading-[1.05]">
              Let&apos;s talk about your <span className="text-blue-600">business.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto px-4 md:px-0">
              Whether you have a question, a partnership idea, or feedback about the platform,
              we&apos;d love to hear from you. Fill out the form or reach out directly.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-5xl mt-8 md:mt-12">
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8 items-stretch">
            
            {/* Left Column: Direct Contact Info (Takes up 2 columns) */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 md:p-10 shadow-sm flex flex-col gap-8 h-full justify-center">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">Direct Email</p>
                  <p className="text-base sm:text-lg font-bold text-slate-900 break-all">hello.soseki.app@gmail.com</p>
                </div>
                <div className="h-px w-full bg-slate-100" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Support Response</p>
                  <p className="text-base sm:text-lg font-bold text-slate-900">Usually within 24 hours</p>
                </div>
                <div className="h-px w-full bg-slate-100" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Location</p>
                  <p className="text-base sm:text-lg font-bold text-slate-900">Remote Worldwide</p>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Form (Takes up 3 columns) */}
            <Reveal delay={0.2} className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 h-full">
                <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1 space-y-2">
                      <label htmlFor="firstName" className="text-sm font-semibold text-slate-900">First Name</label>
                      <input type="text" id="firstName" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500" placeholder="John" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label htmlFor="lastName" className="text-sm font-semibold text-slate-900">Last Name</label>
                      <input type="text" id="lastName" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-900">Work Email</label>
                    <input type="email" id="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-900">Message</label>
                    <textarea id="message" rows="4" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="mt-2 w-full rounded-xl bg-blue-600 py-3.5 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-blue-700">
                    Send Message
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-2">
                    By submitting this form, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto text-center max-w-3xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">Choose the channel that fits best</h2>
              <p className="text-base md:text-lg leading-relaxed text-slate-600">Use the path that matches your question so we can get you to the right person.</p>
            </div>
          </Reveal>
          <div className="mt-12 md:mt-16 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05} className="h-full">
                <Link href={card.href} className={cn("flex flex-col h-full rounded-[20px] sm:rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md group hover:-translate-y-1", card.hoverBorderClass)}>
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl border group-hover:scale-110 transition-all duration-300", card.iconBgClass, card.iconBorderClass)}>
                    {card.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-600">{card.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">We welcome all the useful stuff</h2>
              <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">A good message is usually short, specific, and easy to route.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {/* Left side: Topics */}
                <div className="md:col-span-2 p-6 sm:p-8 lg:p-10 bg-slate-50/50">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Topics
                  </h3>
                  <div className="flex flex-col gap-2">
                    {reasons.map((item) => (
                      <div key={item} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all cursor-default group">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Commitments */}
                <div className="md:col-span-3 p-6 sm:p-8 lg:p-10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-8 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Our Commitments
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {responsePoints.map((item) => (
                      <div key={item.title} className="flex flex-col">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 mb-4 text-slate-600">
                          {item.icon}
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="py-12 md:py-20 bg-white">
        <CallToAction 
          title="Say hello, share feedback, or start a conversation"
          description="We're always happy to hear from people who care about the product and the people using it."
        />
      </div>

      <Footer />
    </main>
  );
}
