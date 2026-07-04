"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/components/logo";
import { toast } from "sonner";
import API from "@/lib/api";

export default function SetupOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const res = await API.post("/organization/setup", { name });
      if (res.data.success) {
        toast.success("Workspace created!", {
          description: "Welcome to your new workspace.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Setup failed", {
        description: error.response?.data?.error || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <div className="m-auto w-full max-w-md p-8 bg-background border shadow-sm rounded-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <LogoIcon className="size-10 mb-4 text-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">Create your Workspace</h1>
          <p className="text-sm text-muted-foreground mt-2">
            What is the name of your freelance business or agency?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="name">
              Workspace Name
            </label>
            <Input 
              id="name" 
              placeholder="e.g. Acme Studio" 
              className="h-11" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>
          
          <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isLoading}>
            {isLoading ? "Creating..." : "Continue to Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
