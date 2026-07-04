import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Workora</h1>
      <p className="text-muted-foreground mb-8">The all-in-one business operating platform.</p>
      <div className="flex gap-4">
        <Link href="/login" className={cn(buttonVariants({ variant: "default" }))}>
          Sign In
        </Link>
        <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }))}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}