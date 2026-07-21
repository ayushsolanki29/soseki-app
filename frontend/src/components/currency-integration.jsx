"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function CurrencyIntegration() {
  const bills = [
    { src: "/currency/euro.webp", alt: "EUR", startX: -280, startY: -140, delay: 0, rotate: -6 },
    { src: "/currency/united-kingdom.webp", alt: "GBP", startX: 280, startY: -140, delay: 1.2, rotate: 5 },
    { src: "/currency/canad.webp", alt: "CAD", startX: -360, startY: -10, delay: 2.4, rotate: -3 },
    { src: "/currency/japanese-yen.webp", alt: "JPY", startX: 360, startY: -10, delay: 3.6, rotate: 4 },
    { src: "/currency/INR.webp", alt: "INR", startX: -280, startY: 130, delay: 4.8, rotate: -5 },
    { src: "/currency/dollor.webp", alt: "USD-2", startX: 280, startY: 130, delay: 6.0, rotate: 6 },
  ];

  return (
    <div className="w-full max-w-6xl h-[400px] mx-auto mt-4 mb-4 relative flex items-center justify-center overflow-visible">
      
      {/* Premium Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Central Node (Master USD Bill) */}
      <div className="absolute z-30 flex flex-col items-center">
        <motion.div 
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[280px] sm:w-[350px] aspect-[2.2/1] flex items-center justify-center drop-shadow-[0_20px_40px_rgba(37,99,235,0.2)] relative"
        >
          {/* Subtle glow behind the master bill */}
          <div className="absolute inset-4 bg-blue-500/20 blur-2xl rounded-full z-0" />
          <div className="relative w-full h-full z-10">
            <Image
              src="/currency/dollor.webp"
              alt="Master Currency (USD)"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
        <motion.div 
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 px-4 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-full text-[11px] font-bold tracking-widest text-[#2563eb] shadow-[0_4px_12px_rgba(0,0,0,0.05)] uppercase relative z-10"
        >
          Master Currency
        </motion.div>
      </div>

      {/* Static Scattered Bills */}
      {bills.map((bill, i) => (
        <motion.div
          key={`static-${i}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.2 },
            scale: { duration: 0.8, delay: 0.2 },
            y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
          }}
          style={{ x: bill.startX, y: bill.startY, rotate: bill.rotate }}
          className="absolute z-10 w-[180px] sm:w-[240px] aspect-[2.2/1] overflow-visible flex items-center justify-center opacity-[0.7] grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:z-40 transition-all duration-500 cursor-default drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="relative w-full h-full">
            <Image
              src={bill.src}
              alt={bill.alt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      ))}

      {/* Elegant Merging Animation */}
      {bills.map((bill, i) => (
        <motion.div
          key={`anim-${i}`}
          initial={{ x: bill.startX, y: bill.startY, opacity: 0, scale: 0.8, rotate: bill.rotate, filter: "grayscale(100%)" }}
          animate={{
            x: [bill.startX, bill.startX, 0, 0],
            y: [bill.startY, bill.startY, 0, 0],
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.8, 1.05, 0.75, 0.6],
            rotate: [bill.rotate, bill.rotate, 0, 0],
            filter: ["grayscale(100%)", "grayscale(100%)", "grayscale(0%)", "grayscale(0%)"]
          }}
          transition={{
            duration: 7.2,
            repeat: Infinity,
            delay: bill.delay,
            times: [0, 0.2, 0.8, 1],
            ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
          }}
          className="absolute z-20 w-[180px] sm:w-[240px] aspect-[2.2/1] overflow-visible flex items-center justify-center drop-shadow-[0_16px_32px_rgba(37,99,235,0.15)]"
        >
          <div className="relative w-full h-full">
            <Image
              src={bill.src}
              alt={bill.alt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      ))}
      
    </div>
  );
}
