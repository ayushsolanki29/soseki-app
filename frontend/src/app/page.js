import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Search, Hexagon, Globe, BarChart3, TrendingUp, Sparkles, Copy, FileText, Link2, Database, Terminal, Unlock, HardDrive, BarChart2, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { TestimonialsSection } from "@/components/testimonials-section";
import { LogoCloud } from "@/components/logo-cloud";
import { Integrations } from "@/components/integrations";
import { PricingSection } from "@/components/pricing-section";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f3f8ff] text-[#09090b] font-sans selection:bg-blue-200 overflow-x-hidden">
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Soseki Logo" width={24} height={24} className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight text-[#09090b]">Soseki</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 font-medium text-[15px] text-[#3f3f46]">
          <Link href="/founders" className="hover:text-black transition-colors">Founders</Link>
          <Link href="/guide" className="hover:text-black transition-colors">Guide</Link>
          <Link href="/docs" className="hover:text-black transition-colors">Docs</Link>
          <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-black transition-colors">Log In</Link>
          <Link href="/login" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
            Get started
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-24 pb-32 text-center flex flex-col items-center">
        <Link href="/docs" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[13px] font-medium text-slate-600 hover:bg-slate-200 transition-colors mb-8">
          The open-source platform for freelancers and agencies <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        
        <h1 className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-[#09090b] mb-6 max-w-3xl leading-[1.05]">
          Magically simplify business operations
        </h1>
        
        <p className="text-lg md:text-[21px] text-[#52525b] mb-10 max-w-3xl leading-relaxed">
          One workspace for clients, projects, invoices, payments, expenses. <br className="hidden md:block" />
          Set up in 10 mins. Back to building by 4:01 pm.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Link href="/login" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors text-[17px]">
            Get started
          </Link>
          <Link href="/pricing" className="inline-flex items-center gap-1.5 text-[17px] font-medium text-[#3f3f46] hover:text-[#09090b] transition-colors">
            Pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-[13px] text-slate-400 font-medium">
          For freelancers, consultants, and small agencies.
        </p>

        {/* Dashboard Mockup exactly matching the layout style */}
        <div className="mt-24 w-full max-w-[1100px] relative">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden flex text-left h-[700px] relative z-10">
            
            {/* Sidebar Mock */}
            <div className="w-[240px] bg-[#fafafa] border-r border-slate-100 p-4 hidden md:flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-2 px-3 py-2 text-slate-800 font-bold mb-4">
                <Image src="/logo.svg" alt="Soseki Logo" width={20} height={20} className="w-5 h-5" />
                <span className="text-[15px]">Soseki</span>
              </div>
              <div className="px-3 py-2 text-[13px] text-slate-500 font-medium flex items-center gap-2 rounded-md hover:bg-slate-100 cursor-pointer">
                <Search className="w-4 h-4" /> Search
              </div>
              
              <div className="mt-6 flex flex-col gap-1">
                <div className="px-3 py-1.5 text-[13px] text-slate-900 font-semibold bg-white shadow-sm border border-slate-100 rounded-md flex items-center justify-between cursor-pointer">
                  <span>Dashboard</span>
                  <span className="bg-slate-100 text-slate-400 text-[10px] font-bold py-0.5 px-1.5 rounded-[4px]">3</span>
                </div>
                <div className="px-3 py-1.5 text-[13px] text-slate-500 font-medium flex items-center justify-between hover:bg-slate-100 rounded-md mt-1 cursor-pointer">
                  <span>Clients</span> <span className="bg-slate-100 text-slate-400 text-[10px] font-bold py-0.5 px-1.5 rounded-[4px]">12</span>
                </div>
                <div className="px-3 py-1.5 text-[13px] text-slate-500 font-medium hover:bg-slate-100 rounded-md cursor-pointer">Projects</div>
                <div className="px-3 py-1.5 text-[13px] text-slate-500 font-medium hover:bg-slate-100 rounded-md cursor-pointer">Invoices</div>
                <div className="px-3 py-1.5 text-[13px] text-slate-500 font-medium hover:bg-slate-100 rounded-md cursor-pointer">Expenses</div>
              </div>
            </div>

            {/* Main Content Mock */}
            <div className="flex-1 bg-white p-10 overflow-hidden flex flex-col">
              <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mb-8">Dashboard</h2>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                {[
                  { label: "Cash", value: "$2,309,091" },
                  { label: "Burn", value: "-$41,206" },
                  { label: "Runway", value: "4y 8mo" },
                  { label: "MRR", value: "$76,981" },
                ].map((stat, i) => (
                  <div key={i} className="p-5 rounded-[12px] border border-slate-100 bg-white flex flex-col gap-3 shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
                    <span className="text-[13px] text-slate-500 font-semibold">{stat.label}</span>
                    <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Table Mockup */}
              <div className="flex-1 rounded-[12px] flex flex-col pt-4">
                <div className="grid grid-cols-5 border-b border-slate-100 pb-3 px-2">
                  <span className="text-[12px] font-semibold text-slate-500">Date</span>
                  <span className="text-[12px] font-semibold text-slate-500 col-span-2">Client</span>
                  <span className="text-[12px] font-semibold text-slate-500 text-right">Amount</span>
                  <span className="text-[12px] font-semibold text-slate-500 text-right">Status</span>
                </div>
                <div className="flex flex-col mt-2">
                  {[
                    { date: "Jul 12, 2026", client: "Acme Corp", amount: "$4,500.00", status: "Paid" },
                    { date: "Jul 10, 2026", client: "Globex Inc", amount: "$2,100.00", status: "Pending" },
                    { date: "Jul 05, 2026", client: "Initech", amount: "$8,900.00", status: "Paid" },
                    { date: "Jul 02, 2026", client: "Umbrella Corp", amount: "$1,250.00", status: "Paid" },
                    { date: "Jun 28, 2026", client: "Massive Dynamic", amount: "$3,400.00", status: "Overdue" },
                  ].map((inv, i) => (
                    <div key={i} className="grid grid-cols-5 items-center py-3 px-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-md transition-colors cursor-pointer">
                      <span className="text-[13px] text-slate-500 font-medium">{inv.date}</span>
                      <span className="text-[13px] font-semibold text-slate-800 col-span-2">{inv.client}</span>
                      <span className="text-[13px] font-semibold text-slate-900 text-right">{inv.amount}</span>
                      <div className="flex justify-end">
                         <span className={cn("text-[11px] px-2 py-0.5 rounded-[4px] font-bold", 
                            inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                            inv.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                         )}>{inv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trusted By Section */}
      <section className="bg-white py-20 border-t border-slate-100 flex flex-col items-center border-b overflow-hidden">
        <p className="text-[13px] font-medium text-slate-500 mb-8">Trusted by fast-growing startups and agencies</p>
        <div className="w-full max-w-6xl mx-auto px-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <LogoCloud />
        </div>
      </section>

      {/* Main Features Section */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
            Global billing with <span className="text-blue-600">zero friction</span>
          </h2>
          <p className="text-lg md:text-[19px] text-slate-600 max-w-2xl mb-16 leading-relaxed">
            Multi-currency invoicing, automatic live exchange rates, and accurate reporting for your service business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
            {/* Left Feature Mock */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-5 mb-8 h-[240px] flex flex-col justify-center transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(37,99,235,0.12)] group-hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl group-hover:bg-blue-400/10 transition-colors duration-500"></div>
                {/* Mock checklist/invoice list */}
                <div className="flex flex-col gap-3 relative z-10">
                  <div className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl shadow-sm bg-white hover:border-blue-200 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src="https://api.dicebear.com/9.x/shapes/svg?seed=Berlin" alt="Avatar" className="w-8 h-8 rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-100 text-blue-600 border border-white flex items-center justify-center text-[8px] font-bold">€</div>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[13px] font-semibold text-slate-800">Berlin Agency</span>
                        <span className="text-[10px] text-slate-500">Invoice #1042</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 shadow-sm">Paid • €4,200</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl shadow-sm bg-white hover:border-emerald-200 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src="https://api.dicebear.com/9.x/shapes/svg?seed=LondonTech" alt="Avatar" className="w-8 h-8 rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 border border-white flex items-center justify-center text-[8px] font-bold">£</div>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[13px] font-semibold text-slate-800">London Tech</span>
                        <span className="text-[10px] text-slate-500">Invoice #1043</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md border border-emerald-100 shadow-sm">Paid • £2,850</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl border-dashed bg-slate-50/50 hover:bg-slate-50 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src="https://api.dicebear.com/9.x/shapes/svg?seed=NYConsulting" alt="Avatar" className="w-8 h-8 rounded-full grayscale opacity-50" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-200 text-slate-500 border border-white flex items-center justify-center text-[8px] font-bold">$</div>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[13px] font-medium text-slate-500">NY Consulting</span>
                        <span className="text-[10px] text-slate-400">Draft</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">Draft • $1,500</span>
                  </div>
                </div>
              </div>
              <div className="text-center max-w-xs">
                <div className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <Globe className="w-4 h-4" /> MULTI-CURRENCY INVOICING
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Create invoices and record expenses in any currency. Soseki automatically fetches live exchange rates.
                </p>
              </div>
            </div>

            {/* Right Feature Mock */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 mb-8 h-[240px] flex flex-col justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] group-hover:-translate-y-1">
                {/* Decorative background like a bill note */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent pointer-events-none group-hover:opacity-20 transition-opacity duration-500"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Exchange Snapshot</span>
                    </div>
                    <span className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                      <span className="text-slate-400 text-lg">$1</span> <ArrowRight className="w-4 h-4 text-slate-300" /> 149.32 ¥
                    </span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 relative z-10 shadow-inner group-hover:border-emerald-100 transition-colors duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[12px] font-semibold text-slate-500">Master Currency (USD)</span>
                    <span className="text-base font-bold text-slate-900">$12,450.00</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full w-[70%] shadow-[0_0_10px_rgba(37,99,235,0.4)] relative">
                       <div className="absolute inset-0 bg-white/20 w-full animate-pulse" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
                    </div>
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 text-right">Converted accurately on payment date</p>
                </div>
              </div>
              
              <div className="text-center max-w-xs">
                <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <BarChart3 className="w-4 h-4" /> ACCURATE REPORTING
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Store exchange-rate snapshots for accurate reporting in your master currency without doing mental math.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second USP Section: Questionnaires */}
      <section className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
            Client intake on <span className="text-blue-600">autopilot</span>
          </h2>
          <p className="text-lg md:text-[19px] text-slate-600 max-w-2xl mb-16 leading-relaxed">
            Build shareable public forms instantly with AI, or use the drag-and-drop builder to customize your client discovery process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
            {/* Left Feature Mock */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 mb-8 h-[240px] flex flex-col relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] group-hover:-translate-y-1">
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl group-hover:bg-emerald-400/10 transition-colors duration-500"></div>
                
                <div className="flex justify-between items-center mb-4 relative z-10">
                   <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Sparkles className="w-4 h-4" /></div>
                     <span className="text-xs font-bold text-slate-700">AI Form Builder</span>
                   </div>
                   <div className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">Generating...</div>
                </div>

                <div className="flex flex-col gap-2 relative z-10 flex-1">
                  {/* Generated Field 1 */}
                  <div className="w-full border border-slate-100 rounded-lg p-2.5 bg-slate-50">
                    <div className="h-2 w-20 bg-slate-200 rounded mb-2"></div>
                    <div className="h-6 w-full bg-white border border-slate-200 rounded-md"></div>
                  </div>
                  {/* Generated Field 2 (Animates in on hover) */}
                  <div className="w-full border border-blue-100 rounded-lg p-2.5 bg-blue-50/30 opacity-50 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500 delay-100 shadow-sm relative">
                    <div className="absolute -left-2 -top-2 bg-blue-500 text-white p-1 rounded-full animate-bounce shadow-md">
                       <Sparkles className="w-3 h-3" />
                    </div>
                    <div className="h-2 w-24 bg-blue-200 rounded mb-2"></div>
                    <div className="h-6 w-full bg-white border border-blue-200 rounded-md"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center max-w-xs">
                <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-4 h-4" /> AI-ASSISTED CREATION
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Paste questions into ChatGPT or let our built-in AI generate perfect onboarding forms in seconds.
                </p>
              </div>
            </div>

            {/* Right Feature Mock */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 mb-8 h-[240px] flex flex-col justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(37,99,235,0.12)] group-hover:-translate-y-1">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none group-hover:opacity-20 transition-opacity duration-500"></div>
                
                <div className="flex flex-col items-center justify-center relative z-10 w-full">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                     <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">New Client Intake</h4>
                  <p className="text-[11px] text-slate-500 mb-6">Public questionnaire ready to share</p>
                  
                  <div className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5 pl-3 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-colors duration-300">
                     <div className="flex items-center gap-2 overflow-hidden">
                       <Link2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                       <span className="text-[11px] text-slate-500 truncate w-32">soseki.app/form/abc12</span>
                     </div>
                     <button className="bg-white border border-slate-200 text-slate-600 p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                       <Copy className="w-3.5 h-3.5" />
                     </button>
                  </div>
                </div>
              </div>
              
              <div className="text-center max-w-xs">
                <div className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <Link2 className="w-4 h-4" /> SHAREABLE PUBLIC LINKS
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Share forms instantly without requiring clients to log in. Their answers sync directly into your workspace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Clarity USP Section */}
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

      {/* Third USP Section: Zero Lock-In */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
            Own your data <span className="text-blue-600">forever</span>
          </h2>
          <p className="text-lg md:text-[19px] text-slate-600 max-w-2xl mb-16 leading-relaxed">
            Self-hostable, fully open-source, and powered by your own PostgreSQL database. No SaaS lock-in, ever.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
            {/* Left Feature Mock */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-full max-w-sm bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-800 p-6 mb-8 h-[240px] flex flex-col relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(37,99,235,0.2)] group-hover:-translate-y-1">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-2 text-[10px] text-slate-500 font-mono">user@server: ~/soseki</span>
                </div>
                
                {/* Terminal Body */}
                <div className="flex flex-col gap-2 font-mono text-[13px] text-left">
                   <div className="flex gap-2 text-slate-300">
                     <span className="text-emerald-400">➜</span> 
                     <span>docker-compose up -d</span>
                   </div>
                   <div className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-150">
                     [+] Running 3/3
                   </div>
                   <div className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-300 flex items-center gap-2">
                     <span className="text-blue-400">✔</span> Container soseki-db
                   </div>
                   <div className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-500 flex items-center gap-2">
                     <span className="text-blue-400">✔</span> Container soseki-app
                   </div>
                   <div className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-700 flex items-center gap-2 mt-2 font-bold">
                     Server listening on port 5050 <span className="w-2 h-4 bg-emerald-400 animate-pulse ml-1 inline-block"></span>
                   </div>
                </div>
              </div>
              
              <div className="text-center max-w-xs">
                <div className="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <Terminal className="w-4 h-4" /> SELF-HOSTABLE
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Deploy Soseki on your own infrastructure in minutes. No per-seat pricing surprises, entirely open-source.
                </p>
              </div>
            </div>

            {/* Right Feature Mock */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 mb-8 h-[240px] flex flex-col justify-center items-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] group-hover:-translate-y-1">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none group-hover:opacity-20 group-hover:from-emerald-400 transition-colors duration-500"></div>
                
                <div className="relative z-10 w-full flex items-center justify-between px-4">
                  {/* Local DB */}
                  <div className="flex flex-col items-center gap-2 z-10">
                     <div className="w-16 h-16 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors duration-500 shadow-sm relative">
                       <Database className="w-8 h-8 relative z-10" />
                       <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-xl group-hover:bg-emerald-400/20 transition-colors duration-500"></div>
                     </div>
                     <span className="text-xs font-bold text-slate-700">Your PostgreSQL</span>
                  </div>

                  {/* Flow Animation */}
                  <div className="flex-1 h-[2px] bg-slate-100 mx-2 relative overflow-hidden">
                     <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.5),transparent)] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] group-hover:bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.5),transparent)]"></div>
                  </div>

                  {/* Export / Access */}
                  <div className="flex flex-col items-center gap-2 z-10">
                     <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:border-slate-300 group-hover:text-slate-800 group-hover:shadow-md transition-all duration-500 -translate-y-0 group-hover:-translate-y-1">
                       <HardDrive className="w-8 h-8" />
                     </div>
                     <span className="text-xs font-bold text-slate-700">Full Access</span>
                  </div>
                </div>

                <div className="mt-8 relative z-10 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[11px] font-bold border border-emerald-100 flex items-center gap-2 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <Unlock className="w-3.5 h-3.5" /> 100% Data Ownership
                </div>
              </div>
              
              <div className="text-center max-w-xs">
                <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-2.5 flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <Database className="w-4 h-4" /> ZERO LOCK-IN
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Your data stays in your own PostgreSQL database. Export it, query it, or migrate it whenever you want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#fcfdfd] py-12 border-b border-slate-100">
        <TestimonialsSection />
      </section>

      {/* Integrations Section */}
      <section className="bg-white">
        <Integrations />
      </section>

      {/* Pricing Section */}
      <section className="bg-white">
        <PricingSection />
      </section>

      {/* CTA Section */}
      <section className="bg-white pt-12">
        <CallToAction />
      </section>

      {/* Footer */}
      <section className="bg-white">
        <Footer />
      </section>
    </div>
  );
}