"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import API from "@/lib/api";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      await API.post("/auth/forgot-password", { email: cleanEmail });
      setSuccess(true);
      toast.success("Reset code sent! Check your email.");
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(cleanEmail)}`);
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
        <img
          src="https://res.cloudinary.com/wo3jj3yk/image/upload/v1784809991/login-banner_qpsjcz.jpg"
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

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-background p-4 sm:p-8">
        <div className="w-full max-w-[450px] space-y-8">
          <div className="flex flex-col space-y-2 items-start">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <LogoIcon className="size-8 mb-4 text-foreground" />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Forgot password?</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a 6-digit code to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({});
                }}
                disabled={isLoading || success}
                autoFocus
                className={cn(
                  "h-10 shadow-none bg-transparent rounded-md transition-colors",
                  errors.email && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                )}
              />
              {errors.email && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
            </div>

            <Button type="submit" className="w-full h-10 mt-6 shadow-none font-medium rounded-md" disabled={isLoading || success}>
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {success ? "Code Sent!" : "Send Reset Code"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
