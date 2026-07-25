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

export default function SetupAccountPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({});

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentErrors = {};

    if (!name || name.trim().length < 2) {
      currentErrors.name = "Please enter your full name.";
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      currentErrors.email = "Please enter a valid email address.";
    }

    if (!password || password.length < 8) {
      currentErrors.password = "Password must be at least 8 characters.";
    }

    if (!termsAccepted) {
      currentErrors.terms = "You must accept the Terms and Privacy Policy.";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await API.post("/auth/register", { name, email: cleanEmail, password, termsAccepted });
      if (res.data.user) {
        toast.success("Account created successfully!", {
          description: "Welcome to Soseki.",
        });
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error("Registration failed", {
        description: error.response?.data?.message || "Something went wrong. Please try again.",
      });
      if (error.response?.data?.message?.toLowerCase().includes("email")) {
        setErrors({ email: error.response.data.message });
      }
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
          <h2 className="text-4xl font-bold leading-tight mb-4 tracking-tight">
            The next generation of business management.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-md">
            Create an account to experience the most powerful, intuitive operating system for your freelance or agency business.
          </p>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-background p-4 sm:p-8 relative overflow-y-auto">
        <div className="w-full max-w-[450px] space-y-8">
          <div className="flex flex-col space-y-2 items-start">
            <Link href="/" className="hover:opacity-80 transition-opacity lg:hidden">
              <LogoIcon className="size-8 mb-4 text-foreground" />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Setup your account</h1>
            <p className="text-sm text-muted-foreground">
              Let's get you started with Soseki.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="name">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className={cn(
                  "h-10 shadow-none bg-transparent rounded-md transition-colors",
                  errors.name && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                )}
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                disabled={isLoading}
              />
              {errors.name && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.name}</p>}
            </div>

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
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={cn(
                    "h-10 shadow-none bg-transparent rounded-md transition-colors pr-10",
                    errors.password && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                  )}
                  required
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

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 size-4 rounded-sm border-input bg-transparent accent-primary shrink-0 cursor-pointer"
                required
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setErrors((prev) => ({ ...prev, terms: "" }));
                }}
              />
              <label htmlFor="terms" className="text-[13px] text-muted-foreground leading-snug cursor-pointer">
                By creating an account, you agree to our <Link href="/terms" className="text-foreground hover:underline">Terms</Link> and <Link href="/privacy-policy" className="text-foreground hover:underline">Privacy Policy</Link>.
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-500 font-medium">{errors.terms}</p>}

            <Button type="submit" className="w-full h-10 mt-6 shadow-none font-medium rounded-md" size="default" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-[14px] text-muted-foreground pt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground font-medium hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
