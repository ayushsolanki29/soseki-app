"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col overflow-hidden">
      <Header />

      <section className="relative flex-grow flex items-center justify-center pt-32 pb-24 px-6 min-h-[85vh] overflow-hidden">
        {/* Ambient background glows for light theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-400 rounded-full blur-[150px] opacity-[0.15] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-400 rounded-full blur-[150px] opacity-[0.1] pointer-events-none" />

        <div className="mx-auto max-w-3xl w-full relative z-10 flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"></span>
            <span className="text-sm font-bold tracking-wide text-blue-700 uppercase">Private Beta Access</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]"
          >
            Soseki is currently <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Invite Only.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We've bypassed the billing system for early adopters. However, to ensure a premium experience, we are currently throttling new registrations. Join the waitlist today, and your account will typically be approved and credited with <strong className="text-slate-900 font-bold">unlimited free access within 2 hours.</strong>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
          >
            <Link href="/setup-account" className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30 hover:-translate-y-1 text-[16px] flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Request Access
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-4 px-10 rounded-xl shadow-sm transition-all text-[16px] flex items-center justify-center gap-2">
              Check Status <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl text-left"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm shadow-slate-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Fast Approvals</h3>
              <p className="text-sm text-slate-600">Our team manually reviews accounts. Most early adopters are approved within exactly 2 hours.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm shadow-slate-100">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">100% Free Access</h3>
              <p className="text-sm text-slate-600">By joining the beta waitlist, you bypass all paywalls and get lifetime access to all Pro features.</p>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
