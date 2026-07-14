"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./logo";

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("[GlobalLoader] Component mounted. Current readyState:", document.readyState);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const startTime = Date.now();

    const handleLoad = () => {
      console.log("[GlobalLoader] handleLoad triggered!");
      setProgress(100);
      
      const elapsed = Date.now() - startTime;
      const minScreenTime = 2500;
      const remainingTime = Math.max(0, minScreenTime - elapsed);
      
      console.log(`[GlobalLoader] Waiting ${remainingTime}ms before hiding...`);
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => setIsLoading(false), 500); // Wait for fade out animation
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      console.log("[GlobalLoader] document is already complete, firing handleLoad.");
      handleLoad();
    } else {
      console.log("[GlobalLoader] document not complete. Waiting for load event...");
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) return oldProgress;
          return oldProgress + 5;
        });
      }, 100);

      window.addEventListener("load", handleLoad);
      return () => {
        clearInterval(timer);
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white m-0 p-0">
        <div className="flex flex-col items-center gap-6">
          <Logo className="w-16 h-16 text-blue-600" />
          <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-blue-600 rounded-full w-[10%]" />
          </div>
          <div className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
            Loading Soseki...
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white m-0 p-0 transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="animate-in fade-in zoom-in duration-500 delay-150 fill-mode-both">
          <Logo className="w-16 h-16 text-blue-600 drop-shadow-md" />
        </div>
        <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[11px] font-bold text-slate-400 tracking-widest uppercase animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both">
          Loading Soseki...
        </div>
      </div>
    </div>
  );
}
