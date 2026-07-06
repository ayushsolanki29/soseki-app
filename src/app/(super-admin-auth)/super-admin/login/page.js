"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import API from "@/lib/api";
import { cn } from "@/lib/utils";

export default function SuperAdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required." : "",
        password: !password ? "Password is required." : "",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await API.post("/super-admin/auth/login", { email, password });
      if (res.data.user) {
        toast.success("Successfully logged in as Super Admin!", {
          description: "Welcome back to the Soseki Administration panel.",
        });
        window.location.href = "/super-admin/dashboard";
      }
    } catch (error) {
      setErrors({ password: error.response?.data?.error || "Invalid credentials. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-black/20 to-black/40 z-10" />
        <img
          src="/login-banner.jpeg"
          alt="Soseki Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
        />
        <div className="relative z-20 p-10 flex items-center gap-2 text-white">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/10">
              <LogoIcon />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight">Soseki Admin</span>
          </Link>
        </div>

        <div className="relative z-20 p-10 mt-auto text-white">
          <blockquote className="space-y-4 backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10">
            <p className="text-lg font-medium leading-relaxed">
              "Restricted Area. Authorized personnel only."
            </p>
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-background p-4 sm:p-8">
        <div className="w-full max-w-[450px] space-y-8">
          <div className="flex flex-col space-y-2 items-start">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <LogoIcon className="size-8 mb-4 text-red-700" />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Soseki Administration</h1>
            <p className="text-sm text-muted-foreground">
              Super Admin Login. Enter your highly secure credentials below.
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
                placeholder="admin@soseki.com" 
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
            
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground" htmlFor="password">
                  Password
                </label>
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

            <Button type="submit" variant="destructive" className="w-full h-10 mt-6 shadow-none font-medium rounded-md" size="default" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Sign in to Admin Console"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
