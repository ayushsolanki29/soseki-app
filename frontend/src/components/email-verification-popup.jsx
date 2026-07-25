"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailIcon, Loader2Icon, ShieldAlertIcon, XIcon, CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import API from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function EmailVerificationPopup() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [step, setStep] = useState("verify"); // "send" or "verify"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [rateLimitWarning, setRateLimitWarning] = useState("");
  
  const inputRefs = useRef([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(c => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = async () => {
    setIsSending(true);
    setRateLimitWarning("");
    try {
      await API.post("/auth/resend-verification");
      toast.success("Verification code sent to your email!");
      setCooldown(60);
      setStep("verify");
    } catch (error) {
      if (error.response?.status === 429) {
          setRateLimitWarning(error.response?.data?.message || "Please wait before requesting another code.");
          setCooldown(60);
          setStep("verify");
      } else {
          toast.error(error.response?.data?.message || "Failed to send code.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;

    setIsVerifying(true);
    try {
      await API.post("/auth/verify-email", { otp: code });
      toast.success("Email verified successfully!");
      setUser({ ...user, emailVerified: true });
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  useEffect(() => {
    const code = otp.join("");
    if (code.length === 6 && step === "verify" && !isVerifying) {
      handleVerify();
    }
  }, [otp]);

  if (isLoading || !user || user.emailVerified) return null;

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {!isBannerDismissed && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 24, opacity: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-[95%] pointer-events-auto"
          >
            <div className="flex items-center gap-3 bg-amber-50/80 dark:bg-amber-950/30 backdrop-blur-xl border border-amber-200/50 dark:border-amber-900/50 shadow-sm rounded-full pl-4 pr-2 py-1.5 text-sm">
              <ShieldAlertIcon className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <p className="truncate text-amber-950 dark:text-amber-100 font-medium pr-2">Verify your email to secure your account</p>
              <div className="flex items-center gap-1 shrink-0 border-l border-amber-200 dark:border-amber-800 pl-3">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 px-3 rounded-full text-xs text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 hover:text-amber-900 dark:hover:text-amber-100 font-semibold"
                  onClick={() => setIsModalOpen(true)}
                >
                  Verify
                </Button>
                <button 
                  onClick={() => setIsBannerDismissed(true)}
                  className="p-1.5 rounded-full text-amber-600/70 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400/70 dark:hover:text-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                >
                  <XIcon className="size-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-md bg-card border shadow-xl rounded-2xl overflow-hidden relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors z-10"
              >
                <XIcon className="size-4" />
              </button>

              {step === "send" ? (
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="mb-6 inline-flex size-14 items-center justify-center rounded-full bg-muted text-foreground">
                    <MailIcon className="size-6" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight mb-2">Verify email address</h2>
                  <p className="text-muted-foreground text-sm mb-8 max-w-[280px]">
                    We'll send a 6-digit verification code to <span className="font-medium text-foreground">{user.email}</span>.
                  </p>
                  
                  <Button 
                    onClick={handleSendOtp} 
                    className="w-full h-11 text-sm rounded-xl font-medium"
                    disabled={isSending || cooldown > 0}
                  >
                    {isSending ? (
                      <Loader2Icon className="animate-spin size-4 mr-2" />
                    ) : null}
                    {cooldown > 0 ? `Wait ${cooldown}s` : "Send Code"}
                  </Button>
                </div>
              ) : (
                <div className="p-8 pb-6 flex flex-col items-center">
                  <h2 className="text-xl font-semibold tracking-tight mb-2">Enter code</h2>
                  <p className="text-muted-foreground text-sm mb-8 text-center max-w-[280px]">
                    We sent a verification code to <span className="font-medium text-foreground">{user.email}</span>
                  </p>

                  <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
                    <div 
                      className="flex justify-between w-full max-w-[320px] gap-2 mb-8"
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
                          disabled={isVerifying}
                          className="w-12 h-14 text-center text-xl font-semibold rounded-xl border bg-muted/30 transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:opacity-50"
                        />
                      ))}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full max-w-[320px] h-11 rounded-xl text-sm font-medium mb-4"
                      disabled={isVerifying || otp.join("").length !== 6}
                    >
                      {isVerifying ? <Loader2Icon className="animate-spin size-4" /> : "Verify"}
                    </Button>
                  </form>

                    <div className="w-full max-w-[320px] flex flex-col items-center">
                     <button 
                        className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-2"
                        onClick={handleSendOtp}
                        disabled={isSending || cooldown > 0}
                        type="button"
                      >
                        {isSending ? "Sending..." : cooldown > 0 ? `Resend code in ${cooldown}s` : "Didn't receive a code? Resend"}
                      </button>
                      
                      {rateLimitWarning && (
                        <p className="text-xs text-amber-600 dark:text-amber-500 font-medium text-center">
                          {rateLimitWarning}
                        </p>
                      )}
                    </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
