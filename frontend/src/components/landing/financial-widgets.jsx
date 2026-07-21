"use client";

import { motion } from "motion/react";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- EXPENSE WIDGET ---
export function ExpenseWidget() {
  const [activeItem, setActiveItem] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev === 2 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { title: "Software Subscriptions", date: "Oct 12" },
    { title: "Delaware franchise tax", date: "Oct 15" },
    { title: "Federal & state income tax", date: "Apr 15" },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <span className="font-semibold text-sm text-slate-800">Recent Expenses</span>
        <span className="text-xs font-medium text-slate-500">Auto-categorized</span>
      </div>
      <div className="flex flex-col">
        {items.map((item, index) => {
          const isCompleted = index !== activeItem;
          const isActive = index === activeItem;

          return (
            <div key={index} className="flex items-center justify-between gap-x-4 pr-4 border-b border-slate-100/60 last:border-0 p-3">
              <div className="flex flex-1 items-center gap-x-3 overflow-hidden pl-2">
                
                {/* Animated Icon */}
                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  <motion.div
                    initial={false}
                    animate={{ opacity: isCompleted ? 1 : 0, scale: isCompleted ? 1 : 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg width="18" height="18" fill="none">
                      <circle cx="9" cy="9" r="8" fill="#2563eb" stroke="#2563eb" strokeLinecap="round" strokeWidth="2"></circle>
                      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m5.75 9.65 2.528 2.6 3.972-6.5"></path>
                    </svg>
                  </motion.div>
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg className="animate-spin" width="18" height="18" fill="none">
                      <circle cx="9" cy="9" r="8" fill="none" stroke="#2563eb" strokeOpacity="0.2" strokeWidth="2"></circle>
                      <path stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9a8 8 0 1 0-8 8" opacity="1"></path>
                    </svg>
                  </motion.div>
                </div>

                <div className="truncate text-[13px] font-medium text-slate-700">{item.title}</div>
              </div>

              {/* Status Badge */}
              <div className="relative overflow-hidden shrink-0 rounded-md border py-[2px] px-2.5 text-[11px] font-semibold transition-all duration-500 ease-in-out">
                <motion.div 
                  initial={false}
                  animate={{ 
                    backgroundColor: isCompleted ? "rgba(219, 234, 254, 1)" : "rgba(241, 245, 249, 1)",
                    color: isCompleted ? "rgba(29, 78, 216, 1)" : "rgba(71, 85, 105, 1)",
                    borderColor: isCompleted ? "rgba(226, 232, 240, 0)" : "rgba(226, 232, 240, 1)"
                  }}
                  className="absolute inset-0"
                />
                <span className="relative z-10 whitespace-nowrap">
                  {isCompleted ? "Completed" : item.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- INVOICE WIDGET ---
export function InvoiceWidget() {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <span className="font-semibold text-sm text-slate-800">Live Invoice Conversion</span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
        </span>
      </div>
      
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">Billed to Client</div>
            <div className="text-xl font-bold text-slate-800 flex items-center gap-1.5">
              €4,500 <span className="text-sm font-medium text-slate-400">EUR</span>
            </div>
          </div>
          
          <motion.div 
            animate={{ x: [0, 4, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center justify-center text-slate-300"
          >
            <span className="text-[10px] font-semibold text-blue-500 mb-0.5">1.10 Rate</span>
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </motion.div>

          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium mb-1">Your Ledger</div>
            <motion.div 
              key="usd-amount"
              initial={{ opacity: 0.5, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
              className="text-xl font-bold text-blue-600 flex items-center justify-end gap-1.5"
            >
              $4,950 <span className="text-sm font-medium text-blue-400">USD</span>
            </motion.div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-100" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-slate-700">Design System Retainer</div>
            <div className="text-[11px] text-slate-500">Acme Corp • INV-2023-08</div>
          </div>
          <div className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold rounded-md uppercase tracking-wider">
            Pending
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PAYMENT WIDGET ---
export function PaymentWidget() {
  const [payments, setPayments] = useState([
    { id: 1, name: "Stripe Payout", amount: "+$4,950.00", status: "cleared" },
    { id: 2, name: "Bank Transfer", amount: "+$2,100.00", status: "cleared" },
    { id: 3, name: "Pending Invoice", amount: "+$1,850.00", status: "pending" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPayments(prev => {
        const newPayments = [...prev];
        const last = newPayments.pop();
        newPayments.unshift(last);
        return newPayments;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100">
      <div className="p-5 border-b border-slate-100">
        <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Total Balance</div>
        <div className="text-3xl font-bold text-slate-900">$8,900.00</div>
      </div>
      
      <div className="flex flex-col relative h-[180px] overflow-hidden">
        {payments.map((payment, i) => (
          <motion.div
            key={payment.id}
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute w-full px-4 py-3 flex items-center justify-between border-b border-slate-50/50 bg-white"
            style={{ top: `${i * 60}px` }}
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", payment.status === "cleared" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
                {payment.status === "cleared" ? <Check className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
              <div className="text-[13px] font-semibold text-slate-700">{payment.name}</div>
            </div>
            <div className={cn("text-[13px] font-bold", payment.status === "cleared" ? "text-emerald-600" : "text-slate-400")}>
              {payment.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
