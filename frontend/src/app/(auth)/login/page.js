"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import API from "@/lib/api";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({});

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === "email") {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
        setErrors({ email: "Please enter a valid email address." });
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await API.post("/auth/check-email", { email: cleanEmail });
        if (res.data.exists) {
          setStep("password");
          if (res.data.termsAcceptedAt) {
            setTermsAccepted(true);
          }
        } else {
          if (res.data.inWaitlist) {
            setErrors({ 
              email: (
                <span>
                  Your request is still on the waitlist.{" "}
                  <Link href={`/status?email=${encodeURIComponent(cleanEmail)}`} className="underline hover:text-red-700 font-semibold">Check status here.</Link>
                </span>
              ) 
            });
          } else {
            setErrors({ 
              email: (
                <span>
                  Account not found. Want to join the waiting list?{" "}
                  <Link href="/request-access" className="underline hover:text-red-700 font-semibold">Request access here.</Link>
                </span>
              ) 
            });
          }
        }
      } catch (error) {
        toast.error("Error", {
          description: "Something went wrong. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!password) {
        setErrors({ password: "Password is required." });
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await API.post("/auth/login", { email, password, termsAccepted });
        if (res.data.user) {
          toast.success("Successfully logged in!", {
            description: "Welcome back to your dashboard.",
          });
          window.location.href = "/dashboard";
        }
      } catch (error) {
        setErrors({ password: error.response?.data?.error || "Invalid credentials. Please try again." });
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
          alt="Soseki Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="relative z-20 p-10 flex items-center gap-2 text-white">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/10">
              <LogoIcon />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight">Soseki</span>
          </Link>
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
        <div className="w-full max-w-[450px] space-y-8">
          <div className="flex flex-col space-y-2 items-start">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <LogoIcon className="size-8 mb-4 text-foreground" />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sign in to Soseki</h1>
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
                className={cn(
                  "h-10 shadow-none bg-transparent rounded-md transition-colors",
                  errors.email && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                )}
                required 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                disabled={step === "password" || isLoading}
                suppressHydrationWarning
              />
              {errors.email && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
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
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      className={cn(
                        "h-10 shadow-none bg-transparent rounded-md transition-colors pr-10",
                        errors.password && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                      )}
                      required 
                      autoFocus 
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      disabled={isLoading}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0 focus:outline-none"
                    >
                      {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
                </div>

                <div className="flex items-start gap-2 pt-1 animate-in fade-in duration-300">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-0.5 size-4 rounded-sm border-input bg-transparent accent-primary shrink-0 cursor-pointer" 
                    required 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label htmlFor="terms" className="text-[13px] text-muted-foreground leading-snug cursor-pointer">
                    By signing in, you agree to our <Link href="#" className="text-foreground hover:underline">Terms</Link> and <Link href="#" className="text-foreground hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
              </>
            )}

            <Button type="submit" className="w-full h-10 mt-6 shadow-none font-medium rounded-md" size="default" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {step === "email" ? (isLoading ? "Verifying..." : "Continue") : (isLoading ? "Signing in..." : "Sign in")}
            </Button>
          </form>

          <div className="text-[14px] text-muted-foreground pt-4">
            New to Soseki?{" "}
            <Link href="/request-access" className="text-foreground font-medium hover:underline transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
