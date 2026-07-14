import { BarChart2, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function FinancialClaritySection() {
  return (
    <section className="bg-slate-50/50 py-24 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
          Real-time <span className="text-blue-600">financial clarity</span>
        </h2>
        <p className="text-lg md:text-[19px] text-slate-600 max-w-2xl mb-16 leading-relaxed">
          Real-time dashboards and instant metrics so you get answers and avoid surprises.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
          {/* Left Feature Mock: KPIs */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-full max-w-sm bg-transparent p-0 mb-8 h-[240px] flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:-translate-y-1">
              <div className="absolute inset-0 bg-blue-400/5 rounded-3xl blur-2xl group-hover:bg-blue-400/10 transition-colors duration-500"></div>

              {/* Horizontal Scrolling Mockup */}
              <div className="flex gap-4 relative z-10 w-[140%] -translate-x-[15%] group-hover:-translate-x-[5%] transition-transform duration-700 ease-out">

                {/* Card 1: Burn */}
                <Card className="w-64 flex-shrink-0 shadow-sm border border-slate-200 transition-all hover:shadow-md hover:border-blue-200 text-left">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-normal text-muted-foreground text-xs">Burn Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-semibold text-2xl tabular-nums">-$41,206</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Delta value={-12.5}>
                        <DeltaIcon />
                        <DeltaValue />
                      </Delta>
                      <span className="text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: MRR */}
                <Card className="w-64 flex-shrink-0 shadow-sm border border-slate-200 transition-all hover:shadow-md hover:border-emerald-200 opacity-80 group-hover:opacity-100 scale-95 group-hover:scale-100 text-left">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-normal text-muted-foreground text-xs">MRR</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-semibold text-2xl tabular-nums">$76,890</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Delta value={8.2}>
                        <DeltaIcon />
                        <DeltaValue />
                      </Delta>
                      <span className="text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            <div className="text-center max-w-xs">
              <div className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                <BarChart2 className="w-4 h-4" /> INVESTOR-READY METRICS
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                Send investor updates with real-time access to cash, burn rate, runway, and MRR directly from your dashboard.
              </p>
            </div>
          </div>

          {/* Right Feature Mock: Fluctuation Table */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 mb-8 h-[240px] flex flex-col relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(37,99,235,0.12)] group-hover:-translate-y-1">

              <Card className="w-full h-full border-0 shadow-none dark:ring-0 rounded-none gap-0 text-left">
                <CardHeader className="border-b py-3 px-4">
                  <CardTitle className="text-sm font-semibold">Software Expenses</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-4 text-[10px] uppercase h-8">Software</TableHead>
                        <TableHead className="text-right text-[10px] uppercase h-8">Jan</TableHead>
                        <TableHead className="text-right text-[10px] uppercase h-8">Feb</TableHead>
                        <TableHead className="text-right pr-4 text-[10px] uppercase h-8">Mar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="h-10 hover:bg-slate-50 transition-colors">
                        <TableCell className="pl-4 font-medium text-xs">Slack</TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground">$150</TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground">$150</TableCell>
                        <TableCell className="text-right pr-4 text-xs text-muted-foreground">$150</TableCell>
                      </TableRow>
                      <TableRow className="h-10 hover:bg-slate-50 transition-colors">
                        <TableCell className="pl-4 font-medium text-xs">Notion</TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground">$12</TableCell>
                        <TableCell className="text-right text-xs p-1">
                          <div className="flex justify-end items-center gap-1">
                            <span className="text-emerald-600 font-semibold">$24</span>
                            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-4 text-xs text-muted-foreground">$24</TableCell>
                      </TableRow>
                      <TableRow className="h-10 bg-blue-50/40 group-hover:bg-blue-50 transition-colors">
                        <TableCell className="pl-4 font-medium text-xs">OpenAI</TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground">$200</TableCell>
                        <TableCell className="text-right text-xs p-1">
                          <div className="flex justify-end items-center gap-1 group-hover:scale-110 transition-transform origin-right">
                            <span className="text-emerald-600 font-semibold">$500</span>
                            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-4 text-xs p-1">
                          <div className="flex justify-end items-center gap-1 group-hover:scale-110 transition-transform origin-right">
                            <span className="text-rose-600 font-semibold">$400</span>
                            <ArrowDownRight className="w-3 h-3 text-rose-600" />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>

                {/* Fade out bottom */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              </Card>
            </div>

            <div className="text-center max-w-xs">
              <div className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                <Activity className="w-4 h-4" /> FLUCTUATION INSIGHTS
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                Track monthly changes, identify anomalies, and uncover drivers to revenue and expenses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
