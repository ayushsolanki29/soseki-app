"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import API from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch the current user's profile.
    // For now, we'll fetch the organization to get the user context if needed,
    // or just simulate fetching the user profile.
    // We are simulating fetching the only user in the system here.
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/profile");
        if (res.data?.user) {
          setName(res.data.user.name || "");
          setEmail(res.data.user.email || "");
        }
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
    setErrors({});
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};
    if (!currentPassword) newErrors.currentPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    
    if (newPassword && newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters long";
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "New passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsChangingPassword(true);
    try {
      await API.patch("/users/profile/password", {
        currentPassword,
        newPassword
      });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to change password";
      if (errorMsg.toLowerCase().includes("current password")) {
        setErrors({ currentPassword: errorMsg });
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsChangingPassword(false);
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
                  <DynamicAvatar type="user" seed={name} size={96} />
                </div>
                <div className="text-xs text-muted-foreground">Generated from your name</div>
              </div>
              <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Full Name</div>
                    <Input 
                      value={name} 
                      onChange={(e) => { setName(e.target.value); setErrors(prev => ({...prev, name: undefined})); }} 
                      placeholder="e.g. John Doe" 
                      disabled={isSaving}
                      className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.name && <p className="text-xs text-destructive font-medium">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Email Address</div>
                    <Input 
                      type="email"
                      value={email} 
                      onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({...prev, email: undefined})); }} 
                      placeholder="john@example.com" 
                      disabled={isSaving}
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
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

      <Card>
        <form onSubmit={handlePasswordChange}>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 pt-2">
            <div className="flex flex-col gap-6 w-full max-w-md">
              <div className="space-y-2">
                  <div className="font-semibold text-sm">Current Password</div>
                  <div className="relative">
                    <Input 
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword} 
                      onChange={(e) => { setCurrentPassword(e.target.value); setErrors(prev => ({...prev, currentPassword: undefined})); }} 
                      placeholder="Enter current password" 
                      disabled={isChangingPassword}
                      className={errors.currentPassword ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground outline-none"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                    </button>
                  </div>
                  {errors.currentPassword && <p className="text-xs text-destructive font-medium">{errors.currentPassword}</p>}
              </div>
              <div className="space-y-2">
                  <div className="font-semibold text-sm">New Password</div>
                  <div className="relative">
                    <Input 
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword} 
                      onChange={(e) => { setNewPassword(e.target.value); setErrors(prev => ({...prev, newPassword: undefined})); }} 
                      placeholder="Minimum 8 characters" 
                      disabled={isChangingPassword}
                      className={errors.newPassword ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground outline-none"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-xs text-destructive font-medium">{errors.newPassword}</p>}
              </div>
              <div className="space-y-2">
                  <div className="font-semibold text-sm">Confirm New Password</div>
                  <div className="relative">
                    <Input 
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword} 
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({...prev, confirmPassword: undefined})); }} 
                      placeholder="Confirm new password" 
                      disabled={isChangingPassword}
                      className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground outline-none"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-destructive font-medium">{errors.confirmPassword}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-muted/20">
            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
