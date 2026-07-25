"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, LinkIcon, FileText, X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STEPS = [

  {
    id: "project",
    title: "Set up a project",
    description: "Start tracking tasks, deadlines, and deliverables.",
    icon: Briefcase,
    href: "/dashboard/projects?new=true",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
  },
  {
    id: "share",
    title: "Share with your client",
    description: "Send a magic link so your client can view progress.",
    icon: LinkIcon,
    href: "/dashboard/projects",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  {
    id: "invoice",
    title: "Send an invoice",
    description: "Get paid faster with automated invoicing.",
    icon: FileText,
    href: "/dashboard/invoices/new",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  },
];

export function OnboardingModal({ show }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check session storage to see if the user skipped it in the current browser session
    const hasSkipped = sessionStorage.getItem("hideOnboarding") === "true";
    if (show && !hasSkipped) {
      setIsVisible(true);
    }
  }, [show]);

  const handleSkip = () => {
    sessionStorage.setItem("hideOnboarding", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={handleSkip}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed left-[50%] top-[50%] z-[101] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-3xl bg-background p-0 shadow-2xl border border-border outline-none"
          >
            {/* Header / Banner */}
            <div className="relative bg-primary px-8 py-10 text-primary-foreground overflow-hidden">
              <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner backdrop-blur-md">
                  <Rocket className="size-7" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome to your workspace!</h2>
                <p className="text-primary-foreground/80 text-sm">
                  Let's get you set up for success. Complete these steps to unlock the full power of Soseki.
                </p>
              </div>
            </div>

            {/* Content area */}
            <div className="p-8 pb-6">
              {/* Progress bar */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Setup Progress</span>
                  <span className="text-primary">0%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "5%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Link
                        href={step.href}
                        className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-all hover:border-border hover:bg-muted/50 hover:shadow-sm"
                        onClick={handleSkip} // Close modal when they click a link
                      >
                        <div className={cn("mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl", step.color)}>
                          <Icon className="size-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {step.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {step.description}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-8 flex justify-center">
                <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground hover:text-foreground">
                  Skip for now
                </Button>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
