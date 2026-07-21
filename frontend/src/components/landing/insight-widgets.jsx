"use client";

import { motion } from "motion/react";
import { Search, Command, BarChart3, TrendingUp, DollarSign, ArrowUpRight, SearchCode, User, FileText, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- DASHBOARD & ANALYTICS WIDGET ---
export function DashboardWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev === 2 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Mock chart heights
  const chartHeights = [
    [30, 45, 25, 60, 40, 75, 55], // Step 0
    [35, 50, 30, 80, 50, 85, 70], // Step 1
    [40, 60, 40, 95, 65, 100, 85] // Step 2
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-[0px_8px_16px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10)] overflow-hidden border border-slate-100 flex flex-col h-[280px]">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <span className="font-bold text-sm text-slate-900">Overview</span>
        <select className="text-[10px] bg-white border border-slate-200 rounded px-2 py-1 text-slate-600 outline-none">
          <option>Last 7 days</option>
        </select>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border border-slate-100 rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <DollarSign className="w-3 h-3" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Revenue</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-lg font-bold text-slate-900">$12,450</span>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> 14%
              </span>
            </div>
          </div>
          <div className="p-3 border border-slate-100 rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <TrendingUp className="w-3 h-3" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Profit</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-lg font-bold text-slate-900">$8,230</span>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> 8%
              </span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 border border-slate-100 rounded-lg p-3 flex flex-col justify-end relative bg-slate-50/30">
          <div className="absolute top-3 left-3 text-[10px] font-semibold text-slate-500">Revenue vs Expenses</div>
          
          <div className="flex items-end justify-between gap-2 h-24 mt-4 w-full px-2">
            {chartHeights[step].map((h, i) => (
              <div key={i} className="w-full flex gap-0.5 items-end h-full">
                {/* Revenue Bar */}
                <motion.div 
                  className="w-1/2 bg-blue-500 rounded-t-sm"
                  initial={{ height: "10%" }}
                  animate={{ height: `${h}%` }}
                  transition={{ type: "spring", bounce: 0.3 }}
                />
                {/* Expense Bar */}
                <motion.div 
                  className="w-1/2 bg-slate-200 rounded-t-sm"
                  initial={{ height: "10%" }}
                  animate={{ height: `${h * 0.4}%` }}
                  transition={{ type: "spring", bounce: 0.3 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- GLOBAL SEARCH WIDGET ---
export function SearchWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev === 2 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-slate-100 rounded-xl p-4 h-[280px] flex flex-col relative overflow-hidden">
      
      {/* Background blurred elements to simulate app background */}
      <div className="absolute top-10 left-10 w-32 h-10 bg-white rounded-lg shadow-sm opacity-50 blur-[2px]" />
      <div className="absolute top-24 left-10 w-48 h-20 bg-white rounded-lg shadow-sm opacity-50 blur-[2px]" />
      
      {/* The Command Menu Modal */}
      <motion.div 
        className="w-full bg-white rounded-xl shadow-[0_12px_24px_-4px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col relative z-10"
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        {/* Input area */}
        <div className="p-3 border-b border-slate-100 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <div className="flex-1 relative h-5 flex items-center">
            {step === 0 && (
              <span className="text-slate-400 text-sm">Search anything...</span>
            )}
            {step > 0 && (
              <motion.span 
                className="text-slate-900 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Acme
              </motion.span>
            )}
            {/* Blinking cursor */}
            <motion.div 
              className="w-[1.5px] h-4 bg-blue-500 ml-0.5"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
          <div className="flex gap-1">
            <div className="px-1.5 py-0.5 bg-slate-100 rounded text-[9px] text-slate-500 font-bold border border-slate-200 flex items-center">
              <Command className="w-2.5 h-2.5" />
            </div>
            <div className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500 font-bold border border-slate-200">
              K
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="p-2 min-h-[140px] flex flex-col">
          {step === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <SearchCode className="w-6 h-6 text-slate-300 mb-2" />
              <div className="text-xs text-slate-500">No recent searches</div>
            </div>
          ) : (
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clients</div>
              
              {/* Result 1 */}
              <div className="p-2 bg-blue-50 text-blue-900 rounded-md flex items-center gap-3 cursor-pointer">
                <div className="w-6 h-6 rounded-md bg-blue-200 flex items-center justify-center text-blue-700">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold">Acme Corporation</div>
                  <div className="text-[10px] text-blue-600">acme.com</div>
                </div>
              </div>

              <div className="px-2 py-1 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invoices</div>
              
              {/* Result 2 */}
              <div className="p-2 hover:bg-slate-50 rounded-md flex items-center gap-3 cursor-pointer transition-colors">
                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-700">INV-2023-08</div>
                  <div className="text-[10px] text-slate-500">Acme Corporation • $4,500</div>
                </div>
              </div>
              
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
