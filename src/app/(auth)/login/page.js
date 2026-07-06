"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import Link from "next/link";
import { toast } from "sonner";
import API from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === "email") {
      setIsLoading(true);
      try {
        const res = await API.post("/auth/check-email", { email });
        if (res.data.exists) {
          setStep("password");
        } else {
          toast.error("Account not found", {
            description: "No account is associated with this email.",
          });
        }
      } catch (error) {
        toast.error("Error", {
          description: "Something went wrong. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const res = await API.post("/auth/login", { email, password });
        if (res.data.user) {
          toast.success("Successfully logged in!", {
            description: "Welcome back to your dashboard.",
          });
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error("Login failed", {
          description: error.response?.data?.error || "Invalid credentials. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
        <img
          src="/login-banner.jpeg"
          alt="Workora Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="relative z-20 p-10 flex items-center gap-2 text-white">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/10">
            <LogoIcon />
          </div>
          <span className="text-xl font-bold font-heading tracking-tight">Workora</span>
        </div>

        <div className="relative z-20 p-10 mt-auto text-white">
          <blockquote className="space-y-4 backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10">
            <p className="text-lg font-medium leading-relaxed">
              "The all-in-one business operating platform that transformed how we manage clients, projects, and invoices. It's incredibly intuitive."
            </p>
            <footer className="text-sm font-medium text-white/70">Sofia Davis, Designer</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-background p-4 sm:p-8">
        <div className="w-full max-w-[340px] space-y-8">
          <div className="flex flex-col space-y-2 items-start">
            <LogoIcon className="size-8 mb-4 text-foreground" />
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sign in to Workora</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back. Enter your details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                className="h-10 shadow-none bg-transparent rounded-md transition-colors" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={step === "password" || isLoading}
                suppressHydrationWarning
              />
            </div>
            
            {step === "password" && (
              <>
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground" htmlFor="password">
                      Password
                    </label>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    className="h-10 shadow-none bg-transparent rounded-md transition-colors" 
                    required 
                    autoFocus 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-start gap-2 pt-1 animate-in fade-in duration-300">
                  <input type="checkbox" id="terms" className="mt-0.5 size-4 rounded-sm border-input bg-transparent accent-primary shrink-0" required />
                  <label htmlFor="terms" className="text-[13px] text-muted-foreground leading-snug">
                    By signing in, you agree to our <Link href="#" className="text-foreground hover:underline">Terms</Link> and <Link href="#" className="text-foreground hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
              </>
            )}

            <Button type="submit" className="w-full h-10 mt-6 shadow-none font-medium rounded-md" size="default" disabled={isLoading}>
              {step === "email" ? "Continue" : (isLoading ? "Signing in..." : "Sign in")}
            </Button>
          </form>

          <div className="text-[14px] text-muted-foreground pt-4">
            New to Workora?{" "}
            <Link href="/request-access" className="text-foreground font-medium hover:underline transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
