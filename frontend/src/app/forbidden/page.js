"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlertIcon, ArrowLeftIcon } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-background to-background z-0 pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center text-center space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="h-24 w-24 rounded-full bg-red-500/10 flex items-center justify-center mb-4 shadow-inner">
          <ShieldAlertIcon className="size-10 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-red-400">
          403
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight">Access Denied</h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          You don't have the necessary permissions to access this page. If you believe this is an error, please contact your workspace administrator for access.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
          <Link href="/">
            <Button size="lg" variant="destructive" className="rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
              <ArrowLeftIcon className="mr-2 size-4" />
              Return Safely
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
