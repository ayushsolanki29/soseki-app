"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import { toast } from "sonner";
import API from "@/lib/api";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { CheckCircle2Icon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CURRENCIES = [
  { code: "USD", symbol: "$", country: "us" },
  { code: "EUR", symbol: "€", country: "eu" },
  { code: "GBP", symbol: "£", country: "gb" },
  { code: "INR", symbol: "₹", country: "in" },
];

export default function SetupOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [masterCurrency, setMasterCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!userName.trim()) return;

    setIsLoading(true);
    try {
      const res = await API.post("/organization/setup", { name, userName, masterCurrency });
      if (res.data.success) {
        toast.success("Workspace created!", {
          description: "Welcome to your new workspace.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Setup failed", {
        description: error.response?.data?.error || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side: Premium Branding/Testimonial Area */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-primary/90 to-primary/80 overflow-hidden flex-col justify-between p-12">
        {/* Abstract shapes in the background */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary-foreground/10 blur-3xl" />
        
        <div className="relative z-10 flex items-center gap-2">
          <LogoIcon className="size-8 text-primary-foreground" />
          <span className="text-xl font-bold text-primary-foreground tracking-tight">Workora</span>
        </div>
        
        <div className="relative z-10 space-y-6 max-w-lg mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground leading-tight">
            Streamline your agency's finances
          </h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Manage clients, track projects, and generate professional invoices in seconds. Join thousands of freelancers running their businesses effortlessly.
          </p>
          
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2Icon className="size-6 text-primary-foreground/90" />
              <span className="text-primary-foreground/90 font-medium text-lg">Unlimited Projects & Clients</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2Icon className="size-6 text-primary-foreground/90" />
              <span className="text-primary-foreground/90 font-medium text-lg">Automated Invoicing workflows</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2Icon className="size-6 text-primary-foreground/90" />
              <span className="text-primary-foreground/90 font-medium text-lg">Comprehensive Financial Reports</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-primary-foreground/60 text-sm font-medium">
          © {new Date().getFullYear()} Workora Inc. All rights reserved.
        </div>
      </div>

      {/* Right side: Setup Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-[440px] space-y-8">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <div className="flex justify-center lg:hidden mb-6">
              <LogoIcon className="size-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Set up your workspace</h2>
            <p className="text-muted-foreground">
              Let's get started by creating your primary workspace and profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 group">
                  <div className="shrink-0 size-[52px] rounded-[1.25rem] overflow-hidden border border-muted transition-colors group-hover:border-primary/30 shadow-sm bg-muted/20">
                    <DynamicAvatar type="default" seed={userName || "User"} size={52} />
                  </div>
                  <Input 
                    id="userName" 
                    placeholder="What should we call you?" 
                    className="h-14 rounded-2xl flex-1 text-base px-5 bg-transparent border-muted-foreground/20 transition-all hover:border-muted-foreground/30 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10" 
                    required 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4 group">
                  <div className="shrink-0 size-[52px] rounded-[1.25rem] overflow-hidden border border-muted transition-colors group-hover:border-primary/30 shadow-sm bg-muted/20">
                    <DynamicAvatar type="organization" seed={name || "Workspace"} size={52} />
                  </div>
                  <Input 
                    id="name" 
                    placeholder="What's your workspace name?" 
                    className="h-14 rounded-2xl flex-1 text-base px-5 bg-transparent border-muted-foreground/20 transition-all hover:border-muted-foreground/30 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <label className="text-[15px] font-medium text-muted-foreground pl-1">
                  Choose your base currency
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {CURRENCIES.map((currency) => (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => setMasterCurrency(currency.code)}
                      disabled={isLoading}
                      className={cn(
                        "relative flex items-center justify-start gap-3 h-14 px-3 rounded-2xl border transition-all outline-none focus-visible:ring-4 focus-visible:ring-primary/10 group",
                        masterCurrency === currency.code
                          ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
                          : "border-muted-foreground/20 hover:border-primary/40 bg-transparent"
                      )}
                    >
                      {/* Round Flag Icon */}
                      <div className="shrink-0 size-10 rounded-full overflow-hidden border border-muted/50 shadow-sm bg-muted/20">
                        <img 
                          src={`https://flagcdn.com/w80/${currency.country}.png`} 
                          alt={currency.code}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col items-start justify-center">
                        <span className="font-semibold text-[15px] leading-tight text-foreground">{currency.code}</span>
                        <span className="text-xs font-medium text-muted-foreground leading-tight mt-0.5">{currency.symbol}</span>
                      </div>
                      
                      {/* Active Indicator */}
                      {masterCurrency === currency.code && (
                        <div className="absolute top-0 right-0 -mt-1.5 -mr-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-2 ring-background">
                          <CheckIcon className="size-3" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  This will be the default currency for all your projects and invoices.
                </p>
              </div>
            </div>
            
            <div className="pt-6">
              <Button type="submit" className="w-full h-14 rounded-2xl text-base font-medium shadow-md transition-all hover:shadow-lg active:scale-[0.98]" disabled={isLoading}>
                {isLoading ? "Creating workspace..." : "Continue to Dashboard"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
