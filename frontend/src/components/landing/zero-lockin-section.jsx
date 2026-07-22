"use client";

import { Terminal, Database, HardDrive, Unlock } from "lucide-react";
import { motion } from "motion/react";

export function ZeroLockinSection() {
  return (
    <section className="bg-white py-24 border-b border-slate-100 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
          Own your data <span className="text-blue-600">forever</span>
        </h2>
        <p className="text-lg md:text-[19px] text-slate-600 max-w-2xl mb-16 leading-relaxed">
          Fully open-source, and powered by your own PostgreSQL database. No SaaS lock-in, ever.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
          {/* Left Feature Mock */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-full max-w-sm bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-800 p-6 mb-8 h-[240px] flex flex-col relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(37,99,235,0.2)] group-hover:-translate-y-1">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-2 text-[10px] text-slate-500 font-mono">user@server: ~/soseki</span>
              </div>

              {/* Terminal Body */}
              <div className="flex flex-col gap-2 font-mono text-[13px] text-left">
                <div className="flex gap-2 text-slate-300">
                  <span className="text-emerald-400">➜</span>
                  <span>docker-compose up -d</span>
                </div>
                <div className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-150">
                  [+] Running 3/3
                </div>
                <div className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-300 flex items-center gap-2">
                  <span className="text-blue-400">✔</span> Container soseki-db
                </div>
                <div className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-500 flex items-center gap-2">
                  <span className="text-blue-400">✔</span> Container soseki-app
                </div>
                <div className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-700 flex items-center gap-2 mt-2 font-bold">
                  Server listening on port 5050 <span className="w-2 h-4 bg-emerald-400 animate-pulse ml-1 inline-block"></span>
                </div>
              </div>
            </div>

            <div className="text-center max-w-xs">
              <div className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                <Terminal className="w-4 h-4" /> DEPLOY ANYWHERE
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                Deploy Soseki on your own infrastructure in minutes. No per-seat pricing surprises, entirely open-source.
              </p>
            </div>
          </div>

          {/* Right Feature Mock */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 mb-8 h-[240px] flex flex-col justify-center items-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] group-hover:-translate-y-1">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none group-hover:opacity-20 group-hover:from-emerald-400 transition-colors duration-500"></div>

              <div className="relative z-10 w-full flex items-center justify-between px-4">
                {/* Local DB */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-16 h-16 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors duration-500 shadow-sm relative">
                    <Database className="w-8 h-8 relative z-10" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-xl group-hover:bg-emerald-400/20 transition-colors duration-500"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">Your PostgreSQL</span>
                </div>

                {/* Flow Animation */}
                <div className="flex-1 h-[2px] bg-slate-100 mx-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.5),transparent)] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] group-hover:bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.5),transparent)]"></div>
                </div>

                {/* Export / Access */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:border-slate-300 group-hover:text-slate-800 group-hover:shadow-md transition-all duration-500 -translate-y-0 group-hover:-translate-y-1">
                    <HardDrive className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Full Access</span>
                </div>
              </div>

              <div className="mt-8 relative z-10 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[11px] font-bold border border-emerald-100 flex items-center gap-2 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                <Unlock className="w-3.5 h-3.5" /> 100% Data Ownership
              </div>
            </div>

            <div className="text-center max-w-xs">
              <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                <Database className="w-4 h-4" /> ZERO LOCK-IN
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                Your data stays in your own PostgreSQL database. Export it, query it, or migrate it whenever you want.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
