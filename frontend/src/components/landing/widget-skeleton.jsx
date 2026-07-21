"use client";

import { motion } from "motion/react";

export function WidgetSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-[260px] flex flex-col">
      {/* Header Skeleton */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-4 h-4 rounded-full bg-slate-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="h-3 w-24 bg-slate-200 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="p-5 flex-1 flex flex-col gap-4 justify-center">
        <motion.div 
          className="h-16 w-full bg-slate-100 rounded-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
        <div className="space-y-2">
          <motion.div 
            className="h-2 w-3/4 bg-slate-100 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
          <motion.div 
            className="h-2 w-1/2 bg-slate-100 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
}

export function HeroWidgetSkeleton() {
  return (
    <div className="w-full max-w-6xl h-[400px] mx-auto mt-4 mb-4 relative flex items-center justify-center">
      <motion.div 
        className="w-[280px] sm:w-[350px] aspect-[2.2/1] bg-slate-100 rounded-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
