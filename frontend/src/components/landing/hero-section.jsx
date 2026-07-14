"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { DynamicTime } from "@/components/dynamic-time";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-24 pb-32 text-center flex flex-col items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center w-full"
      >
        <Link href="/docs" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[13px] font-medium text-slate-600 hover:bg-slate-200 transition-colors mb-8">
          The open-source platform for freelancers and agencies <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <h1 className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-[#09090b] mb-6 max-w-3xl leading-[1.05]">
          Magically simplify business operations
        </h1>

        <p className="text-lg md:text-[21px] text-[#52525b] mb-10 max-w-3xl leading-relaxed">
          One workspace for clients, projects, invoices, payments, expenses. <br className="hidden md:block" />
          Set up in 10 mins. Back to building by <DynamicTime offsetMinutes={10} />.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Link href="/login" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors text-[17px]">
            Get started
          </Link>
          <Link href="/pricing" className="inline-flex items-center gap-1.5 text-[17px] font-medium text-[#3f3f46] hover:text-[#09090b] transition-colors">
            Pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-[13px] text-slate-400 font-medium">
          For freelancers, consultants, and small agencies.
        </p>
      </motion.div>

      {/* Dashboard Mockup exactly matching the layout style */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 w-full max-w-[1100px] relative"
      >
        <Image 
          src="/dashboard.png" 
          alt="Soseki Dashboard Preview" 
          width={1100} 
          height={700} 
          priority
          className="w-full rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 relative z-10 object-cover" 
        />
      </motion.div>
    </main>
  );
}
