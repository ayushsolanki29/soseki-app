"use client";

import { Globe, ArrowRight, TrendingUp, BarChart3 } from "lucide-react";
import { motion } from "motion/react";

export function GlobalBillingSection() {
  return (
    <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
            Global billing with <span className="text-blue-600">zero friction</span>
          </h2>
          <p className="text-lg md:text-[19px] text-slate-600 max-w-2xl mb-16 leading-relaxed">
            Multi-currency invoicing, automatic live exchange rates, and accurate reporting for your service business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
            {/* Left Feature Mock */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-5 mb-8 h-[240px] flex flex-col justify-center transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(37,99,235,0.12)] group-hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl group-hover:bg-blue-400/10 transition-colors duration-500"></div>
                {/* Mock checklist/invoice list */}
                <div className="flex flex-col gap-3 relative z-10">
                  <div className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl shadow-sm bg-white hover:border-blue-200 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src="https://api.dicebear.com/9.x/shapes/svg?seed=Berlin" alt="Avatar" className="w-8 h-8 rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-100 text-blue-600 border border-white flex items-center justify-center text-[8px] font-bold">€</div>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[13px] font-semibold text-slate-800">Berlin Agency</span>
                        <span className="text-[10px] text-slate-500">Invoice #1042</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 shadow-sm">Paid • €4,200</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl shadow-sm bg-white hover:border-emerald-200 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src="https://api.dicebear.com/9.x/shapes/svg?seed=LondonTech" alt="Avatar" className="w-8 h-8 rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 border border-white flex items-center justify-center text-[8px] font-bold">£</div>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[13px] font-semibold text-slate-800">London Tech</span>
                        <span className="text-[10px] text-slate-500">Invoice #1043</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md border border-emerald-100 shadow-sm">Paid • £2,850</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl border-dashed bg-slate-50/50 hover:bg-slate-50 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src="https://api.dicebear.com/9.x/shapes/svg?seed=NYConsulting" alt="Avatar" className="w-8 h-8 rounded-full grayscale opacity-50" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-200 text-slate-500 border border-white flex items-center justify-center text-[8px] font-bold">$</div>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[13px] font-medium text-slate-500">NY Consulting</span>
                        <span className="text-[10px] text-slate-400">Draft</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">Draft • $1,500</span>
                  </div>
                </div>
              </div>
              <div className="text-center max-w-xs">
                <div className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <Globe className="w-4 h-4" /> MULTI-CURRENCY INVOICING
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Create invoices and record expenses in any currency. Soseki automatically fetches live exchange rates.
                </p>
              </div>
            </div>

            {/* Right Feature Mock */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 mb-8 h-[240px] flex flex-col justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] group-hover:-translate-y-1">
                {/* Decorative background like a bill note */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent pointer-events-none group-hover:opacity-20 transition-opacity duration-500"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Exchange Snapshot</span>
                    </div>
                    <span className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                      <span className="text-slate-400 text-lg">$1</span> <ArrowRight className="w-4 h-4 text-slate-300" /> 149.32 ¥
                    </span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 relative z-10 shadow-inner group-hover:border-emerald-100 transition-colors duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[12px] font-semibold text-slate-500">Master Currency (USD)</span>
                    <span className="text-base font-bold text-slate-900">$12,450.00</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full w-[70%] shadow-[0_0_10px_rgba(37,99,235,0.4)] relative">
                       <div className="absolute inset-0 bg-white/20 w-full animate-pulse" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
                    </div>
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 text-right">Converted accurately on payment date</p>
                </div>
              </div>
              
              <div className="text-center max-w-xs">
                <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <BarChart3 className="w-4 h-4" /> ACCURATE REPORTING
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Store exchange-rate snapshots for accurate reporting in your master currency without doing mental math.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
