"use client";

import { BarChart2, Activity, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "motion/react";

export function FinancialClaritySection() {
  return (
    <section className="relative bg-slate-50/50 py-32 border-b border-slate-100 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-100/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          Real-time <span className="text-blue-600">financial clarity</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-20 leading-relaxed">
          Interactive dashboards and instant metrics so you get answers and avoid surprises. Everything you need, one click away.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 w-full">
          {/* Left Feature Mock: KPIs */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-full max-w-md bg-transparent p-0 mb-10 h-[260px] flex items-center justify-center relative transition-all duration-500">
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100" />
              
              {/* Horizontal Scrolling Mockup */}
              <div className="flex gap-6 relative z-10 w-[140%] -translate-x-[15%] group-hover:-translate-x-[2%] transition-transform duration-1000 ease-out">
                
                {/* Card 1: Burn */}
                <Card className="w-72 flex-shrink-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 text-left group/card">
                  <CardHeader className="pb-3 pt-6 px-6">
                    <CardTitle className="font-medium text-slate-500 text-sm flex items-center justify-between">
                      Burn Rate
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 px-6 pb-6">
                    <p className="font-bold text-4xl tabular-nums tracking-tight text-slate-900 group-hover/card:text-blue-950 transition-colors">-$41,206</p>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Delta value={-12.5} className="font-medium">
                        <DeltaIcon />
                        <DeltaValue />
                      </Delta>
                      <span className="text-slate-500">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: MRR */}
                <Card className="w-72 flex-shrink-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-200 text-left opacity-90 group-hover:opacity-100 group-hover:scale-[1.02]">
                  <CardHeader className="pb-3 pt-6 px-6">
                    <CardTitle className="font-medium text-slate-500 text-sm flex items-center justify-between">
                      MRR
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 px-6 pb-6">
                    <p className="font-bold text-4xl tabular-nums tracking-tight text-slate-900 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700">$76,890</p>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Delta value={8.2} className="font-medium">
                        <DeltaIcon />
                        <DeltaValue />
                      </Delta>
                      <span className="text-slate-500">from last month</span>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            <div className="text-center max-w-sm">
              <div className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-3 flex items-center justify-center gap-2 group-hover:scale-110 transition-transform duration-500 ease-out">
                <BarChart2 className="w-4 h-4" /> INVESTOR-READY METRICS
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed font-medium group-hover:text-slate-800 transition-colors duration-300">
                Send beautiful investor updates with real-time access to cash, burn rate, runway, and MRR.
              </p>
            </div>
          </div>

          {/* Right Feature Mock: Fluctuation Table */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-10 h-[260px] flex flex-col relative overflow-hidden transition-all duration-700 group-hover:shadow-[0_20px_60px_rgb(37,99,235,0.15)] group-hover:-translate-y-2 group-hover:border-blue-100/50">
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Card className="w-full h-full border-0 shadow-none bg-transparent rounded-none gap-0 text-left">
                <CardHeader className="border-b border-slate-100 py-4 px-6 bg-slate-50/50">
                  <CardTitle className="text-sm font-bold text-slate-700">Software Expenses</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="pl-6 text-[10px] font-bold tracking-wider uppercase h-10 text-slate-400">Software</TableHead>
                        <TableHead className="text-right text-[10px] font-bold tracking-wider uppercase h-10 text-slate-400">Jan</TableHead>
                        <TableHead className="text-right text-[10px] font-bold tracking-wider uppercase h-10 text-slate-400">Feb</TableHead>
                        <TableHead className="text-right pr-6 text-[10px] font-bold tracking-wider uppercase h-10 text-slate-400">Mar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="h-12 hover:bg-slate-50 transition-colors border-slate-50 group/row">
                        <TableCell className="pl-6 font-semibold text-sm text-slate-700 group-hover/row:text-blue-600 transition-colors">Slack</TableCell>
                        <TableCell className="text-right text-sm text-slate-500">$150</TableCell>
                        <TableCell className="text-right text-sm text-slate-500">$150</TableCell>
                        <TableCell className="text-right pr-6 text-sm text-slate-500">$150</TableCell>
                      </TableRow>
                      <TableRow className="h-12 hover:bg-slate-50 transition-colors border-slate-50 group/row">
                        <TableCell className="pl-6 font-semibold text-sm text-slate-700 group-hover/row:text-blue-600 transition-colors">Notion</TableCell>
                        <TableCell className="text-right text-sm text-slate-500">$12</TableCell>
                        <TableCell className="text-right text-sm p-1">
                          <div className="flex justify-end items-center gap-1">
                            <span className="text-emerald-600 font-bold">$24</span>
                            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6 text-sm text-slate-500">$24</TableCell>
                      </TableRow>
                      <TableRow className="h-12 bg-blue-50/30 hover:bg-blue-50/80 transition-colors border-transparent relative overflow-hidden group/row">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 transform -translate-x-full group-hover/row:translate-x-0 transition-transform duration-300" />
                        <TableCell className="pl-6 font-semibold text-sm text-slate-800">OpenAI</TableCell>
                        <TableCell className="text-right text-sm text-slate-500">$200</TableCell>
                        <TableCell className="text-right text-sm p-1">
                          <div className="flex justify-end items-center gap-1 group-hover/row:scale-110 transition-transform origin-right duration-300">
                            <span className="text-emerald-600 font-bold">$500</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6 text-sm p-1">
                          <div className="flex justify-end items-center gap-1 group-hover/row:scale-110 transition-transform origin-right duration-300">
                            <span className="text-rose-600 font-bold">$400</span>
                            <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>

                {/* Fade out bottom */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
              </Card>
            </div>

            <div className="text-center max-w-sm">
              <div className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-3 flex items-center justify-center gap-2 group-hover:scale-110 transition-transform duration-500 ease-out">
                <Activity className="w-4 h-4" /> FLUCTUATION INSIGHTS
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed font-medium group-hover:text-slate-800 transition-colors duration-300">
                Track monthly changes, identify anomalies, and uncover drivers to revenue and expenses dynamically.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
