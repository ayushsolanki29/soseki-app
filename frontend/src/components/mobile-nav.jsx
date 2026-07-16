"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/portal";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(true)}
        size="icon"
        variant="ghost"
      >
        <MenuIcon className="size-5" />
      </Button>

      {open && (
        <Portal id="mobile-menu" className="z-[99999] items-center justify-center p-4">
          <PortalBackdrop onClick={() => setOpen(false)} />
          
          <div
            className="relative z-50 flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl p-6 animate-in zoom-in-95 fade-in duration-200"
            data-slot={open ? "open" : "closed"}
          >
            {/* Header */}
            <div className="relative flex items-center justify-center mb-10">
              <Logo className="h-7" />
              <button
                onClick={() => setOpen(false)}
                className="absolute right-0 flex h-8 w-8 items-center justify-center text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                <XIcon className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Links */}
            <div className="relative flex flex-col items-center gap-6 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-slate-800 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-slate-800 hover:text-blue-600 transition-colors"
              >
                Log In
              </Link>

              <Link 
                href="/login" 
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "mt-2 w-3/4 max-w-[200px] text-[17px] rounded-xl h-12 bg-blue-600 hover:bg-blue-700 shadow-sm text-white"
                )}
              >
                Get started
              </Link>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
