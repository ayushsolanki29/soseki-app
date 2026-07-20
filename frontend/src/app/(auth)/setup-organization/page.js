"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import { toast } from "sonner";
import API from "@/lib/api";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { CheckCircle2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CurrencyGrid } from "@/components/ui/currency-grid";

export default function SetupOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [masterCurrency, setMasterCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

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
          <LogoIcon className="size-8 brightness-0 invert" />
          <span className="text-xl font-bold text-primary-foreground tracking-tight">Soseki</span>
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
          © {new Date().getFullYear()} Soseki Inc. All rights reserved.
        </div>
      </div>

      {/* Right side: Setup Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 relative">
        <div className="absolute top-8 right-8">
          <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
            Sign out
          </Button>
        </div>
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
                    <DynamicAvatar type="user" seed={userName || "User"} size={52} />
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
                <CurrencyGrid 
                  value={masterCurrency} 
                  onChange={setMasterCurrency} 
                  disabled={isLoading} 
                />
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
