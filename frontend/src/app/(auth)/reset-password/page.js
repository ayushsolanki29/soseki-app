"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import API from "@/lib/api";
import { cn } from "@/lib/utils";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("otp");

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(c => c - 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown]);

  useEffect(() => {
    if (initialEmail) {
      const savedOtp = sessionStorage.getItem(`reset_otp_${initialEmail}`);
      if (savedOtp && savedOtp.length === 6) {
        setOtp(savedOtp.split(""));
        setStep("password");
      }
    }
  }, [initialEmail]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").substring(0, 6);
    
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    
    if (pastedData.length > 0) {
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleVerifyOtp = async () => {
    setErrors({});
    const code = otp.join("");
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (code.length !== 6) {
      setErrors({ otp: "6-digit code is required" });
      return;
    }

    setIsLoading(true);
    try {
      await API.post("/auth/verify-reset-otp", { email: email.trim().toLowerCase(), otp: code });
      sessionStorage.setItem(`reset_otp_${email.trim().toLowerCase()}`, code);
      setStep("password");
      toast.success("Code verified!");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to verify code.";
      toast.error(msg);
      setErrors({ otp: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setErrors({});
    let newErrors = {};

    const code = otp.join("");
    if (!email) newErrors.email = "Email is required";
    if (code.length !== 6) newErrors.otp = "6-digit code is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    if (newPassword && newPassword.length < 8) newErrors.newPassword = "Must be at least 8 characters";
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await API.post("/auth/reset-password", { 
        email: email.trim().toLowerCase(), 
        otp: code, 
        newPassword 
      });
      
      sessionStorage.removeItem(`reset_otp_${email.trim().toLowerCase()}`);
      toast.success("Password reset successfully! You can now log in.");
      router.push("/login");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to reset password. The code might be expired.";
      toast.error(msg);
      if (msg.toLowerCase().includes("code")) {
        setErrors({ otp: msg });
        setStep("otp");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setErrors({ email: "Email is required to resend code" });
      return;
    }
    
    setIsResending(true);
    setErrors({});
    try {
      await API.post("/auth/forgot-password", { email: email.trim().toLowerCase() });
      toast.success("A new code has been sent to your email.");
      setCooldown(60);
      setOtp(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === "otp") {
      await handleVerifyOtp();
    } else {
      await handleResetPassword();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors(prev => ({...prev, email: undefined}));
          }}
          disabled={isLoading}
          readOnly={!!initialEmail}
          className={cn(
            "h-10 shadow-none bg-transparent rounded-md transition-colors",
            initialEmail ? "bg-muted text-muted-foreground" : "",
            errors.email && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
          )}
        />
        {errors.email && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
      </div>

      <div className="space-y-2 flex flex-col items-start w-full">
        <label htmlFor="otp" className="text-sm font-medium text-foreground">Reset Code</label>
        <div 
          className="flex justify-between w-full max-w-[320px] gap-2"
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              disabled={isLoading || step === "password"}
              className={cn(
                "w-12 h-14 text-center text-xl font-semibold rounded-xl border transition-all outline-none",
                step === "password" ? "bg-muted/50 border-muted opacity-60 text-muted-foreground" : "bg-muted/30 focus:border-primary focus:ring-1 focus:ring-primary",
                errors.otp && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
              )}
            />
          ))}
        </div>
        {errors.otp && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.otp}</p>}
        
        {step === "otp" && (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || cooldown > 0}
              className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <span className="flex items-center"><Loader2 className="size-3.5 animate-spin mr-1.5" /> Sending...</span>
              ) : cooldown > 0 ? (
                `Resend code in ${cooldown}s`
              ) : (
                "Didn't receive a code? Resend"
              )}
            </button>
          </div>
        )}
      </div>

      {step === "password" && (
        <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium text-foreground">New Password</label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors(prev => ({...prev, newPassword: undefined}));
                }}
                disabled={isLoading}
                autoFocus
                className={cn(
                  "h-10 shadow-none bg-transparent rounded-md transition-colors pr-10",
                  errors.newPassword && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                )}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.newPassword}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors(prev => ({...prev, confirmPassword: undefined}));
              }}
              disabled={isLoading}
              className={cn(
                "h-10 shadow-none bg-transparent rounded-md transition-colors",
                errors.confirmPassword && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
              )}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      )}

      <Button type="submit" className="w-full h-10 mt-6 shadow-none font-medium rounded-md" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
        {step === "otp" ? "Verify Code" : "Set New Password"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
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
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Reset password</h1>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to your email to create a new password.
            </p>
          </div>

          <Suspense fallback={<div className="h-[280px] flex items-center justify-center"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>}>
            <ResetPasswordForm />
          </Suspense>

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
