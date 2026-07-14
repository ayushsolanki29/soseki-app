"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./logo";

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Simulate loading progress
    const duration = 1500;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    // Return static version for SSR to ensure it blocks the screen instantly
    return (
      <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#f3f8ff]">
        <div className="flex flex-col items-center gap-6">
          <div><Logo className="w-16 h-16 text-blue-600" /></div>
          <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-blue-600 rounded-full w-0" />
          </div>
          <div className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
            Loading Soseki...
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#f3f8ff]"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Logo className="w-16 h-16 text-blue-600" />
            </motion.div>
            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            <div className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              Loading Soseki...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
