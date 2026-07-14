import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { DynamicTime } from "@/components/dynamic-time";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-24 pb-32 text-center flex flex-col items-center">
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

      {/* Dashboard Mockup exactly matching the layout style */}
      <div className="mt-24 w-full max-w-[1100px] relative">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden flex text-left h-[700px] relative z-10">

          {/* Sidebar Mock */}
          <div className="w-[240px] bg-[#fafafa] border-r border-slate-100 p-4 hidden md:flex flex-col gap-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 text-slate-800 font-bold mb-4">
              <Image src="/logo.svg" alt="Soseki Logo" width={20} height={20} className="w-5 h-5" />
              <span className="text-[15px]">Soseki</span>
            </div>
            <div className="px-3 py-2 text-[13px] text-slate-500 font-medium flex items-center gap-2 rounded-md hover:bg-slate-100 cursor-pointer">
              <Search className="w-4 h-4" /> Search
            </div>

            <div className="mt-6 flex flex-col gap-1">
              <div className="px-3 py-1.5 text-[13px] text-slate-900 font-semibold bg-white shadow-sm border border-slate-100 rounded-md flex items-center justify-between cursor-pointer">
                <span>Dashboard</span>
                <span className="bg-slate-100 text-slate-400 text-[10px] font-bold py-0.5 px-1.5 rounded-[4px]">3</span>
              </div>
              <div className="px-3 py-1.5 text-[13px] text-slate-500 font-medium flex items-center justify-between hover:bg-slate-100 rounded-md mt-1 cursor-pointer">
                <span>Clients</span> <span className="bg-slate-100 text-slate-400 text-[10px] font-bold py-0.5 px-1.5 rounded-[4px]">12</span>
              </div>
              <div className="px-3 py-1.5 text-[13px] text-slate-500 font-medium hover:bg-slate-100 rounded-md cursor-pointer">Projects</div>
              <div className="px-3 py-1.5 text-[13px] text-slate-500 font-medium hover:bg-slate-100 rounded-md cursor-pointer">Invoices</div>
              <div className="px-3 py-1.5 text-[13px] text-slate-500 font-medium hover:bg-slate-100 rounded-md cursor-pointer">Expenses</div>
            </div>
          </div>

          {/* Main Content Mock */}
          <div className="flex-1 bg-white p-10 overflow-hidden flex flex-col">
            <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mb-8">Dashboard</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { label: "Cash", value: "$2,309,091" },
                { label: "Burn", value: "-$41,206" },
                { label: "Runway", value: "4y 8mo" },
                { label: "MRR", value: "$76,981" },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-[12px] border border-slate-100 bg-white flex flex-col gap-3 shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
                  <span className="text-[13px] text-slate-500 font-semibold">{stat.label}</span>
                  <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Table Mockup */}
            <div className="flex-1 rounded-[12px] flex flex-col pt-4">
              <div className="grid grid-cols-5 border-b border-slate-100 pb-3 px-2">
                <span className="text-[12px] font-semibold text-slate-500">Date</span>
                <span className="text-[12px] font-semibold text-slate-500 col-span-2">Client</span>
                <span className="text-[12px] font-semibold text-slate-500 text-right">Amount</span>
                <span className="text-[12px] font-semibold text-slate-500 text-right">Status</span>
              </div>
              <div className="flex flex-col mt-2">
                {[
                  { date: "Jul 12, 2026", client: "Acme Corp", amount: "$4,500.00", status: "Paid" },
                  { date: "Jul 10, 2026", client: "Globex Inc", amount: "$2,100.00", status: "Pending" },
                  { date: "Jul 05, 2026", client: "Initech", amount: "$8,900.00", status: "Paid" },
                  { date: "Jul 02, 2026", client: "Umbrella Corp", amount: "$1,250.00", status: "Paid" },
                  { date: "Jun 28, 2026", client: "Massive Dynamic", amount: "$3,400.00", status: "Overdue" },
                ].map((inv, i) => (
                  <div key={i} className="grid grid-cols-5 items-center py-3 px-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-md transition-colors cursor-pointer">
                    <span className="text-[13px] text-slate-500 font-medium">{inv.date}</span>
                    <span className="text-[13px] font-semibold text-slate-800 col-span-2">{inv.client}</span>
                    <span className="text-[13px] font-semibold text-slate-900 text-right">{inv.amount}</span>
                    <div className="flex justify-end">
                      <span className={cn("text-[11px] px-2 py-0.5 rounded-[4px] font-bold",
                        inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                          inv.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                      )}>{inv.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
