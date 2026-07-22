"use client";

import { Sparkles, FileText, Link2, Copy } from "lucide-react";
import { motion } from "motion/react";

export function ClientIntakeSection() {
  return (
    <section className="bg-slate-50 py-24 border-b border-slate-100 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
          Stop asking clients the same ten questions over email
        </h2>
        <p className="text-lg md:text-[19px] text-slate-600 max-w-2xl mb-16 leading-relaxed">
          Build a public onboarding or discovery form with the drag and drop builder, or paste your usual questions into ChatGPT and let it draft the form for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
          {/* Left Feature Mock */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 mb-8 h-[240px] flex flex-col relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] group-hover:-translate-y-1">
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl group-hover:bg-emerald-400/10 transition-colors duration-500"></div>

              <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Sparkles className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-slate-700">AI Form Builder</span>
                </div>
                <div className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">Generating...</div>
              </div>

              <div className="flex flex-col gap-2 relative z-10 flex-1">
                {/* Generated Field 1 */}
                <div className="w-full border border-slate-100 rounded-lg p-2.5 bg-slate-50">
                  <div className="h-2 w-20 bg-slate-200 rounded mb-2"></div>
                  <div className="h-6 w-full bg-white border border-slate-200 rounded-md"></div>
                </div>
                {/* Generated Field 2 (Animates in on hover) */}
                <div className="w-full border border-blue-100 rounded-lg p-2.5 bg-blue-50/30 opacity-50 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500 delay-100 shadow-sm relative">
                  <div className="absolute -left-2 -top-2 bg-blue-500 text-white p-1 rounded-full animate-bounce shadow-md">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="h-2 w-24 bg-blue-200 rounded mb-2"></div>
                  <div className="h-6 w-full bg-white border border-blue-200 rounded-md"></div>
                </div>
              </div>
            </div>

            <div className="text-center max-w-xs">
              <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4" /> AI-ASSISTED CREATION
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                Share the link. Clients do not need an account to fill it out.
              </p>
            </div>
          </div>

          {/* Right Feature Mock */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 mb-8 h-[240px] flex flex-col justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(37,99,235,0.12)] group-hover:-translate-y-1">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none group-hover:opacity-20 transition-opacity duration-500"></div>

              <div className="flex flex-col items-center justify-center relative z-10 w-full">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">New Client Intake</h4>
                <p className="text-[11px] text-slate-500 mb-6">Public questionnaire ready to share</p>

                <div className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5 pl-3 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Link2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-[11px] text-slate-500 truncate w-32">soseki.app/form/abc12</span>
                  </div>
                  <button className="bg-white border border-slate-200 text-slate-600 p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center max-w-xs">
              <div className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                <Link2 className="w-4 h-4" /> SHAREABLE PUBLIC LINKS
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                Their answers land directly in your workspace.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
