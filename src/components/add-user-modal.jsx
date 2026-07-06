"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import API from "@/lib/api";
import { PlusIcon } from "lucide-react";

export function AddUserModal({ trigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      return toast.error("All fields are required.");
    }

    setIsSubmitting(true);
    setGeneratedPassword("");
    try {
      const res = await API.post("/super-admin/users", formData);
      setGeneratedPassword(res.data.password);
      toast.success("User created successfully!");
      // Reset form but keep dialog open to show password
      setFormData({ name: "", email: "" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) setGeneratedPassword("");
    }}>
      <DialogTrigger render={
        trigger || (
          <Button>
            <PlusIcon className="mr-2 size-4" />
            Add User
          </Button>
        )
      } />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new owner account. A secure password will be generated automatically, and they will set up their organization upon logging in.
          </DialogDescription>
        </DialogHeader>

        {generatedPassword ? (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
              <h3 className="font-semibold mb-2">User created successfully!</h3>
              <p className="text-sm mb-4">Please save this generated password and share it securely with the user. It will not be shown again.</p>
              <div className="bg-white p-3 rounded border font-mono text-center text-lg select-all">
                {generatedPassword}
              </div>
            </div>
            <Button className="w-full" onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating User..." : "Create User & Generate Password"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
