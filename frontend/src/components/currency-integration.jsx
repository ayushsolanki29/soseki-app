"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function CurrencyIntegration() {
  const bills = [
    { src: "/currency/euro.webp", alt: "EUR", startX: -400, startY: -220, delay: 0 },
    { src: "/currency/united-kingdom.webp", alt: "GBP", startX: 400, startY: -220, delay: 1.0 },
    { src: "/currency/canad.webp", alt: "CAD", startX: -480, startY: 0, delay: 2.0 },
    { src: "/currency/japanese-yen.webp", alt: "JPY", startX: 480, startY: 0, delay: 3.0 },
    { src: "/currency/INR.webp", alt: "INR", startX: -400, startY: 220, delay: 4.0 },
    { src: "/currency/dollor.webp", alt: "INR", startX: 400, startY: 220, delay: 5.0 },
  ];

  return (
    <div className="w-full max-w-7xl h-[700px] mx-auto mt-12 mb-4 relative flex items-center justify-center overflow-visible">
      
      {/* Background radial for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/20 via-transparent to-transparent pointer-events-none" />

      {/* Central Node (Dollar Bill) */}
      <div className="absolute z-20 flex flex-col items-center">
        <motion.div 
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[350px] sm:w-[450px] aspect-[2.2/1] flex items-center justify-center drop-shadow-[0_16px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="relative w-full h-full">
            <Image
              src="/currency/dollor.webp"
              alt="Master Currency (USD)"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
        <div className="mt-6 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[13px] font-bold tracking-wide text-slate-700 shadow-sm uppercase">
          Master Currency
        </div>
      </div>

      {/* Connecting paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <g stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" fill="none">
          {bills.map((bill, i) => (
             <path key={`path-${i}`} d={`M 50% 50% L calc(50% + ${bill.startX}px) calc(50% + ${bill.startY}px)`} />
          ))}
        </g>
      </svg>

      {/* Static Bills at starting points */}
      {bills.map((bill, i) => (
        <motion.div
          key={`static-${i}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ x: bill.startX, y: bill.startY }}
          className="absolute z-0 w-[250px] sm:w-[350px] aspect-[2.2/1] overflow-visible flex items-center justify-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all cursor-default drop-shadow-lg"
        >
          <div className="relative w-full h-full">
            <Image
              src={bill.src}
              alt={bill.alt}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      ))}

      {/* Animated Bills merging into center */}
      {bills.map((bill, i) => (
        <motion.div
          key={`anim-${i}`}
          initial={{ x: bill.startX, y: bill.startY, opacity: 0, scale: 0.5 }}
          animate={{
            x: [bill.startX, bill.startX, 0],
            y: [bill.startY, bill.startY, 0],
            opacity: [0, 1, 0],
            scale: [1, 1, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: bill.delay,
            times: [0, 0.15, 1],
            ease: "easeInOut"
          }}
          className="absolute z-10 w-[250px] sm:w-[350px] aspect-[2.2/1] overflow-visible flex items-center justify-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
        >
          <div className="relative w-full h-full">
            <Image
              src={bill.src}
              alt={bill.alt}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      ))}
      
    </div>
  );
}
