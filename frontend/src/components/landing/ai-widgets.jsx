"use client";

import { motion } from "motion/react";
import { Sparkles, FileText, UploadCloud, CheckCircle2, ArrowRight, AlignLeft, LayoutPanelTop } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- AI DATA MIGRATION WIDGET ---
export function AiMigrationWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100">
      <div className="p-4 bg-purple-50/50 border-b border-purple-100 flex items-center justify-between">
        <span className="font-semibold text-sm text-purple-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          AI Migration Assistant
        </span>
      </div>

      <div className="p-5 relative h-[220px]">
        {/* Step 0: Upload */}
        <motion.div 
          className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center"
          initial={false}
          animate={{ opacity: step === 0 ? 1 : 0, scale: step === 0 ? 1 : 0.95 }}
          style={{ pointerEvents: step === 0 ? 'auto' : 'none' }}
        >
          <div className="w-full border-2 border-dashed border-purple-200 rounded-xl bg-purple-50/30 p-6 flex flex-col items-center">
            <UploadCloud className="w-8 h-8 text-purple-400 mb-2" />
            <div className="text-sm font-bold text-slate-700">Drop your CSV or PDF</div>
            <div className="text-[11px] text-slate-500 mt-1">QuickBooks, Excel, or legacy exports</div>
          </div>
        </motion.div>

        {/* Step 1: AI Processing */}
        <motion.div 
          className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center bg-white"
          initial={false}
          animate={{ opacity: step === 1 ? 1 : 0 }}
          style={{ pointerEvents: step === 1 ? 'auto' : 'none' }}
        >
          <div className="relative w-16 h-16 mb-4">
            <FileText className="w-full h-full text-purple-200" />
            <motion.div 
              className="absolute left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="text-sm font-bold text-slate-700">Extracting Data...</div>
          <div className="text-[11px] text-slate-500 mt-1">AI is mapping fields & currencies</div>
        </motion.div>

        {/* Step 2: Success */}
        <motion.div 
          className="absolute inset-0 p-5 flex flex-col items-center justify-center bg-white"
          initial={false}
          animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : 20 }}
          style={{ pointerEvents: step === 2 ? 'auto' : 'none' }}
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="text-sm font-bold text-slate-900 mb-3">Migration Complete</div>
          
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-100">
              <span className="text-xs font-medium text-slate-600">Clients Imported</span>
              <span className="text-xs font-bold text-slate-900">142</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-100">
              <span className="text-xs font-medium text-slate-600">Invoices Mapped</span>
              <span className="text-xs font-bold text-slate-900">856</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- AI QUESTIONNAIRE BUILDER WIDGET ---
export function AiFormWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100">
      
      <div className="p-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider">AI Prompt</span>
        </div>
        <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 shadow-sm relative overflow-hidden">
          "Create an onboarding questionnaire for a new web design client."
          <motion.div
            className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent"
            initial={false}
            animate={{ opacity: step === 0 ? 0 : 1 }}
          />
        </div>
      </div>

      <div className="p-5 relative h-[240px] bg-white">
        {/* Step 0 & 1: Generating */}
        <motion.div 
          className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center bg-white z-10"
          initial={false}
          animate={{ opacity: step === 0 ? 1 : 0 }}
          style={{ pointerEvents: step === 0 ? 'auto' : 'none' }}
        >
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
          </motion.div>
          <div className="text-sm font-bold text-slate-700">AI is drafting your form...</div>
          <div className="text-[11px] text-slate-500 mt-1">Generating sections and fields</div>
        </motion.div>

        {/* Step 1 & 2: Generated Form Mockup */}
        <motion.div 
          className="absolute inset-0 p-5 flex flex-col bg-slate-50/50"
          initial={false}
          animate={{ opacity: step > 0 ? 1 : 0, y: step > 0 ? 0 : 20 }}
          transition={{ type: "spring", bounce: 0.2 }}
        >
          <div className="text-sm font-bold text-slate-900 mb-1">Web Design Onboarding</div>
          <div className="text-[10px] text-slate-500 mb-4">Please fill out this brief before we begin.</div>
          
          <div className="space-y-3">
            {/* Mock Field 1 */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
              <AlignLeft className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-slate-700">Company Overview</div>
                <div className="text-[9px] text-slate-400 mt-0.5 border-b border-dashed border-slate-200 pb-1">Long text response</div>
              </div>
            </div>
            {/* Mock Field 2 */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
              <LayoutPanelTop className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-slate-700">Competitor Websites</div>
                <div className="text-[9px] text-slate-400 mt-0.5 border-b border-dashed border-slate-200 pb-1">Multiple URLs</div>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-end">
            <div className="px-3 py-1.5 bg-purple-600 text-white text-[10px] font-bold rounded-md flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Publish Form
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
