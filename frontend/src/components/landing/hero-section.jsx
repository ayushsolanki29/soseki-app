"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DynamicTime } from "@/components/dynamic-time";

export function HeroSection() {
  return (
    <main className="mx-auto max-w-5xl pt-24 pb-32 text-center flex flex-col items-center overflow-hidden">
      <div className="flex flex-col items-center w-full px-6">
        <Link href="/features" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs sm:text-[13px] font-medium text-slate-600 hover:bg-slate-200 transition-colors mb-8 max-w-full">
          <span>Open source. Built for people who bill by the project.</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </Link>

        <h1 className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-[#09090b] mb-6 max-w-3xl leading-[1.05]">
          Run your freelance business without five different tools
        </h1>

        <p className="text-[17px] md:text-[21px] text-[#52525b] mb-10 max-w-3xl leading-relaxed">
          Clients, projects, invoices, and expenses, all in one workspace. <br className="hidden md:block" />
          <span className="md:hidden">All in one workspace.<br /></span>
          No juggling a separate invoicing app, a CRM, and a spreadsheet just to know if the month made money.
        </p>

        <div className="flex flex-row items-center justify-center gap-5 sm:gap-6 mb-12">
          <Link href="/login" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg shadow-sm transition-colors text-[15px] sm:text-[17px]">
            Get started
          </Link>
          <Link href="/pricing" className="inline-flex items-center gap-1.5 text-[15px] sm:text-[17px] font-medium text-[#3f3f46] hover:text-[#09090b] transition-colors">
            Pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-[13px] text-slate-400 font-medium">
          For freelancers, consultants, and small agencies.
        </p>
      </div>

      {/* Dashboard Mockup exactly matching the layout style */}
      <div className="mt-16 sm:mt-24 w-full max-w-[1100px] relative sm:px-6">
        <Image 
          src="/dashboard.png" 
          alt="Soseki Dashboard Preview" 
          width={1100} 
          height={700} 
          priority
          className="w-full sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-y sm:border border-slate-100 relative z-10 object-cover" 
        />
      </div>
    </main>
  );
}
