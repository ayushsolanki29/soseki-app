"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import { toast } from "sonner";
import API from "@/lib/api";
import Link from "next/link";
import { 
  BriefcaseIcon, 
  CodeIcon, 
  PaintbrushIcon, 
  MegaphoneIcon,
  TrendingUpIcon,
  BarChartIcon,
  LayersIcon,
  MousePointerClickIcon,
  FileSpreadsheetIcon,
  StarIcon,
  CheckCircle2Icon
} from "lucide-react";
import { cn } from "@/lib/utils";

const PROFESSIONS = [
  { id: "Developer", label: "Developer", icon: CodeIcon },
  { id: "Designer", label: "Designer", icon: PaintbrushIcon },
  { id: "Marketer", label: "Marketer", icon: MegaphoneIcon },
  { id: "Freelancer", label: "Freelancer", icon: BriefcaseIcon },
];

const EARNINGS = [
  { id: "<$10k", label: "Under $10k" },
  { id: "$10k-$50k", label: "$10k - $50k" },
  { id: "$50k-$100k", label: "$50k - $100k" },
  { id: "$100k+", label: "$100k+" },
];

const TOOLS = [
  { id: "Excel", label: "Excel / Sheets", icon: FileSpreadsheetIcon },
  { id: "Notion", label: "Notion", icon: LayersIcon },
  { id: "Trello/Asana", label: "Trello / Asana", icon: MousePointerClickIcon },
  { id: "Other", label: "Other Software", icon: BarChartIcon },
];

export default function RequestAccessPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    profession: "",
    earningsRange: "",
    previousTool: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on change
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      let currentErrors = {};
      
      if (!formData.fullName || formData.fullName.trim().length < 2 || formData.fullName.trim().length > 50) {
        currentErrors.fullName = "Full name must be between 2 and 50 characters.";
      }
      
      const cleanEmail = formData.email.trim().toLowerCase();
      if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
        currentErrors.email = "Please enter a valid email address.";
      } else {
        // Check for disposable domains on the frontend using our list
        try {
          const domain = cleanEmail.split('@')[1];
          const disposableDomains = require("../../../../index.json");
          if (disposableDomains.includes(domain)) {
            currentErrors.email = "Disposable email addresses are not allowed. Please use your primary email.";
          }
        } catch (err) {
          console.error("Failed to load disposable domains", err);
        }
      }

      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors);
        return;
      }
    }
    setErrors({});
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // POST using axios directly to avoid auth interceptors
      const res = await API.post("/leads", formData);
      if (res.data.success) {
        setIsSuccess(true);
        toast.success("Request Submitted!", {
          description: "You've been added to our priority waitlist.",
        });
      }
    } catch (error) {
      toast.error("Submission failed", {
        description: error.response?.data?.error || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center animate-in zoom-in-95 duration-500 fade-in">
          <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2Icon className="size-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">You're on the list!</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for requesting access to Workora. We're rolling out invites soon and will notify you at <strong className="text-slate-900 font-medium">{formData.email}</strong>.
          </p>
          <Button onClick={() => router.push("/")} className="w-full h-11 text-base font-medium rounded-xl shadow-sm">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-black/40 to-black/80 z-10" />
        <img
          src="/login-banner.jpeg"
          alt="Workora Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-20 p-12 flex items-center gap-3 text-white">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md border border-white/20 shadow-xl">
            <LogoIcon className="size-6" />
          </div>
          <span className="text-2xl font-bold font-heading tracking-tight">Workora</span>
        </div>

        <div className="relative z-20 p-12 mt-auto text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
            <TrendingUpIcon className="size-4 text-amber-400" />
            <span>Join 2,000+ waitlisted professionals</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4 tracking-tight">
            The next generation of business management.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-md">
            Request early access to experience the most powerful, intuitive operating system for your freelance or agency business.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-slate-50/50 p-6 sm:p-12 relative overflow-y-auto">
        <div className="w-full max-w-[440px]">
          
          <div className="mb-10 text-center lg:text-left">
            <div className="flex justify-center lg:hidden mb-6">
               <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                 <LogoIcon className="size-6 text-primary" />
               </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Request Access</h1>
            <p className="text-slate-500">
              {step === 1 ? "Let's start with the basics." : "Tell us a bit about your work."}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-10">
            <div className={`h-1.5 rounded-full flex-1 transition-colors duration-500 ${step >= 1 ? 'bg-primary' : 'bg-slate-200'}`} />
            <div className={`h-1.5 rounded-full flex-1 transition-colors duration-500 ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`} />
          </div>

          <form className="space-y-6" onSubmit={step === 2 ? handleSubmit : handleNext}>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <Input 
                    placeholder="John Doe" 
                    className={cn(
                      "h-12 px-4 rounded-xl shadow-sm bg-white border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary text-base transition-all",
                      errors.fullName && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                    )}
                    required 
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                  {errors.fullName && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.fullName}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    className={cn(
                      "h-12 px-4 rounded-xl shadow-sm bg-white border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary text-base transition-all",
                      errors.email && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                    )}
                    required 
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {errors.email && <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Country (Optional)</label>
                  <Input 
                    placeholder="e.g. United States" 
                    className="h-12 px-4 rounded-xl shadow-sm bg-white border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary text-base transition-all" 
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all mt-4">
                  Continue to Step 2
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                
                {/* Profession Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700">What best describes your work?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PROFESSIONS.map((p) => {
                      const Icon = p.icon;
                      const isSelected = formData.profession === p.id;
                      return (
                        <div 
                          key={p.id}
                          onClick={() => handleChange("profession", p.id)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            isSelected 
                              ? "border-primary bg-primary/5 text-primary shadow-sm" 
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-600"
                          )}
                        >
                          <Icon className={cn("size-5", isSelected ? "text-primary" : "text-slate-400")} />
                          <span className="font-medium text-sm">{p.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Earnings Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    Yearly Earnings <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Optional</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EARNINGS.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => handleChange("earningsRange", e.id)}
                        className={cn(
                          "px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-200",
                          formData.earningsRange === e.id
                            ? "border-primary bg-primary text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        {e.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Previous Tools */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    What do you currently use? <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Optional</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {TOOLS.map((t) => {
                      const Icon = t.icon;
                      const isSelected = formData.previousTool === t.id;
                      return (
                        <div 
                          key={t.id}
                          onClick={() => handleChange("previousTool", t.id)}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200",
                            isSelected 
                              ? "border-primary bg-primary/5 text-primary shadow-sm ring-1 ring-primary" 
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
                          )}
                        >
                          <Icon className={cn("size-4 shrink-0", isSelected ? "text-primary" : "text-slate-400")} />
                          <span className="font-medium text-sm truncate">{t.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(1)} 
                    className="h-12 px-6 font-medium rounded-xl border-slate-200 text-slate-600"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all" 
                    disabled={isLoading || !formData.profession}
                  >
                    {isLoading ? "Submitting..." : "Request Access"}
                  </Button>
                </div>
              </div>
            )}
          </form>

          <div className="text-[14px] text-center text-slate-500 mt-10">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline transition-colors">
              Sign in
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
