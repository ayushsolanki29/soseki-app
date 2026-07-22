"use client";

import { motion } from "motion/react";

export function AboutSection() {
  return (
    <section className="bg-slate-50 py-24 border-b border-slate-100 px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">About Soseki</h2>
        <p className="text-lg text-slate-600 leading-relaxed text-left">
          Soseki is named after Natsume Soseki, the Japanese novelist. Not as a branding gimmick, but because of how he wrote: no bloat, no padding, just what the work actually needs. That is the idea behind the product too. Freelancers do not need forty modules they will never open. They need invoices that go out correctly, a clear record of what a client owes, and a way to tell if the month actually made money.
          <br /><br />
          It is built and maintained by one backend engineer who got tired of stitching together spreadsheets, an invoicing tool, and a separate CRM just to run client work. The code is open source under the MIT license, so anyone can read it or contribute to it.
        </p>
      </motion.div>
    </section>
  );
}
