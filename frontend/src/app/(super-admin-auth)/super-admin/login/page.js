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
  const [requires2FA, setRequires2FA] = useState(false);
  const [tempToken, setTempToken] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");

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
      
      if (res.data.requires2FA) {
        setRequires2FA(true);
        setTempToken(res.data.tempToken);
        setErrors({});
        toast.info("Two-Factor Authentication required.");
      } else if (res.data.user) {
        toast.success("Successfully logged in as Super Admin!");
        window.location.href = "/super-admin/dashboard";
      }
    } catch (error) {
      setErrors({ password: error.response?.data?.message || "Invalid credentials. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async (e) => {
    if (e) e.preventDefault();
    
    // We use the current state twoFactorCode by default, but we can also accept a parameter
    const codeToVerify = typeof e === "string" ? e : twoFactorCode;

    if (!codeToVerify || codeToVerify.length !== 6) {
      setErrors({ twoFactorCode: "Please enter a valid 6-digit code." });
      return;
    }

    setIsLoading(true);
    try {
      const res = await API.post("/super-admin/auth/login/verify", {
        tempToken,
        token: codeToVerify,
      });
      if (res.data.user) {
        toast.success("Successfully logged in as Super Admin!");
        window.location.href = "/super-admin/dashboard";
      }
    } catch (error) {
      setErrors({ twoFactorCode: error.response?.data?.message || "Invalid code." });
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
              {requires2FA ? "Enter the 6-digit code from your authenticator app." : "Super Admin Login. Enter your highly secure credentials below."}
            </p>
          </div>

          {!requires2FA ? (
            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="email">
                  Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  className={cn(
                    "h-10 shadow-none bg-transparent rounded-md transition-colors",
                    errors.email && "border-destructive focus-visible:ring-destructive"
                  )}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-[13px] text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password" 
                    className={cn(
                      "h-10 pr-10 shadow-none bg-transparent rounded-md transition-colors",
                      errors.password && "border-destructive focus-visible:ring-destructive"
                    )}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[13px] text-destructive">{errors.password}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full h-10 bg-red-700 hover:bg-red-800 text-white transition-all shadow-sm active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  "Access Secure Area"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify2FA} className="space-y-5 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="twoFactorCode">
                  Two-Factor Authentication Code
                </label>
                <Input 
                  id="twoFactorCode" 
                  type="text" 
                  placeholder="123456" 
                  maxLength={6}
                  className={cn(
                    "h-10 shadow-none bg-transparent rounded-md transition-colors font-mono tracking-widest text-center",
                    errors.twoFactorCode && "border-destructive focus-visible:ring-destructive"
                  )}
                  value={twoFactorCode}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTwoFactorCode(val);
                    if (errors.twoFactorCode) setErrors({ ...errors, twoFactorCode: "" });
                    
                    if (val.length === 6) {
                      handleVerify2FA(val);
                    }
                  }}
                  disabled={isLoading}
                />
                {errors.twoFactorCode && <p className="text-[13px] text-destructive text-center">{errors.twoFactorCode}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full h-10 bg-red-700 hover:bg-red-800 text-white transition-all shadow-sm active:scale-[0.98]"
                disabled={isLoading || twoFactorCode.length < 6}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Verify & Login"
                )}
              </Button>
              
              <div className="text-center pt-2">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setRequires2FA(false);
                    setTempToken("");
                    setTwoFactorCode("");
                    setErrors({});
                  }}
                >
                  Back to login
                </button>
              </div>
            </form>
          )}

          <div className="text-center">
          </div>
        </div>
      </div>
    </div>
  );
}
