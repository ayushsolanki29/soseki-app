"use client";

import { motion } from "motion/react";
import { Check, ShieldCheck, ArrowRight, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ClientPortalWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev === 2 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100">
      {/* Browser Mockup Header */}
      <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        </div>
        <div className="mx-auto bg-white border border-slate-100 rounded-md px-16 py-1 text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          soseki.app/c/acme-corp
        </div>
      </div>

      <div className="p-5 relative h-[220px] bg-slate-50/30">
        
        {/* Step 0: Invoice View */}
        <motion.div 
          className="absolute inset-0 p-5 flex flex-col"
          initial={false}
          animate={{ opacity: step === 0 ? 1 : 0, scale: step === 0 ? 1 : 0.95 }}
          transition={{ duration: 0.5 }}
          style={{ pointerEvents: step === 0 ? 'auto' : 'none' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-slate-500 font-medium">Invoice #INV-2023</div>
              <div className="text-lg font-bold text-slate-900">$2,500.00</div>
            </div>
            <div className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold rounded-md uppercase tracking-wider">
              Due Today
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="h-2 w-full bg-slate-100 rounded-full" />
            <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
            <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
          </div>

          <motion.div 
            className="mt-auto w-full py-2.5 bg-[#2563eb] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              animate={step === 0 ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />
            <CreditCard className="w-4 h-4" />
            Pay Directly
          </motion.div>
        </motion.div>


        {/* Step 1 & 2: Payment Processing & Success */}
        <motion.div 
          className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center bg-white"
          initial={false}
          animate={{ opacity: step > 0 ? 1 : 0, y: step > 0 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          style={{ pointerEvents: step > 0 ? 'auto' : 'none' }}
        >
          {step === 1 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-blue-500 animate-spin mb-4" />
              <div className="text-sm font-semibold text-slate-700">Processing Payment...</div>
              <div className="text-xs text-slate-500 mt-1">Connecting to gateway</div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-lg font-bold text-slate-900">Payment Successful</div>
              <div className="text-sm text-slate-500 mt-1 mb-4">Thank you for your business!</div>
              
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                0% Middleman Fees
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

// --- CLIENT MANAGEMENT WIDGET ---
export function ClientManagementWidget() {
  const [activities, setActivities] = useState([
    { id: 1, type: "invoice", text: "Paid Invoice #INV-001", time: "Just now", color: "text-blue-500", bg: "bg-blue-50" },
    { id: 2, type: "view", text: "Viewed Proposal", time: "2 hours ago", color: "text-slate-500", bg: "bg-slate-100" },
    { id: 3, type: "message", text: "Sent a message", time: "Yesterday", color: "text-slate-500", bg: "bg-slate-100" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivities = [...prev];
        const last = newActivities.pop();
        newActivities.unshift(last);
        return newActivities;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100">
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
          AC
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900">Acme Corporation</div>
          <div className="text-xs text-slate-500">Client since 2023</div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">Activity Timeline</div>
        <div className="relative pl-3 border-l border-slate-100 space-y-5 overflow-hidden h-[150px]">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              <div className={cn("absolute -left-[17px] top-1 w-2 h-2 rounded-full ring-4 ring-white", activity.bg)} />
              <div className="pl-4">
                <div className={cn("text-[13px] font-semibold", activity.type === "invoice" ? "text-slate-900" : "text-slate-600")}>
                  {activity.text}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{activity.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- PROJECT MANAGEMENT WIDGET ---
export function ProjectManagementWidget() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompleted(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
            In Progress
          </span>
          <span className="text-xs text-slate-500 font-medium">Due in 3 days</span>
        </div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">Website Redesign</h3>
        <p className="text-xs text-slate-500">Acme Corporation</p>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-slate-700">Project Progress</span>
          <motion.span 
            className="text-blue-600"
            animate={{ opacity: [1, 0.5, 1] }}
          >
            {completed ? "100%" : "66%"}
          </motion.span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: "66%" }}
            animate={{ width: completed ? "100%" : "66%" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-md bg-blue-500 text-white flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-xs font-medium text-slate-600 line-through">Wireframes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-md bg-blue-500 text-white flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-xs font-medium text-slate-600 line-through">Design System</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.div 
              className={cn("w-4 h-4 rounded-md flex items-center justify-center border transition-colors")}
              animate={{
                backgroundColor: completed ? "#3b82f6" : "#ffffff",
                borderColor: completed ? "#3b82f6" : "#cbd5e1"
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: completed ? 1 : 0, scale: completed ? 1 : 0.5 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
            <span className={cn("text-xs font-medium transition-colors", completed ? "text-slate-600 line-through" : "text-slate-900")}>
              Frontend Development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
