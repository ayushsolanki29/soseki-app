"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import API from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch the current user's profile.
    // For now, we'll fetch the organization to get the user context if needed,
    // or just simulate fetching the user profile.
    // We are simulating fetching the only user in the system here.
    const fetchUser = async () => {
      try {
        const res = await API.get("/organization"); // Or a dedicated GET /api/users/profile
        // using the nav-user defaults for demo if we don't have a GET endpoint
        setName("Ayush Solanki");
        setEmail("ayush@workora.com");
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      return toast.error("Name and Email are required");
    }

    setIsSaving(true);
    try {
      await API.patch("/users/profile", { 
        name: name.trim(),
        email: email.trim(),
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Profile</h1>
          <p className="text-muted-foreground mt-2">Update your personal information and preferences.</p>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-1" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="pb-8 pt-2">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <Skeleton className="size-24 rounded-full border-4 border-background shadow-sm" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-muted/20">
            <Skeleton className="h-9 w-32" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Profile</h1>
        <p className="text-muted-foreground mt-2">Update your personal information and preferences.</p>
      </div>

      <Card>
        <form onSubmit={handleSave}>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your name, email, and avatar.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 pt-2">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="size-24 rounded-full overflow-hidden border-4 border-background shadow-sm">
                  <DynamicAvatar type="default" seed={name} size={96} />
                </div>
                <div className="text-xs text-muted-foreground">Generated from your name</div>
              </div>
              <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Full Name</div>
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="e.g. John Doe" 
                      disabled={isSaving}
                    />
                </div>
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Email Address</div>
                    <Input 
                      type="email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="john@example.com" 
                      disabled={isSaving}
                    />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-muted/20">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
