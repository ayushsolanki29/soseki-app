"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ct from "countries-and-timezones";

export function ClientForm({ onSuccess, onCancel, initialData = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    country: initialData?.country || "",
    timezone: initialData?.timezone || "",
    status: initialData?.status || "Active",
  });
  
  const allCountries = Object.values(ct.getAllCountries()).sort((a, b) => a.name.localeCompare(b.name));
  const availableTimezones = formData.country 
    ? ct.getTimezonesForCountry(formData.country) || [] 
    : [];
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validate()) return;

    setIsLoading(true);
    try {
      let clientData = null;
      if (initialData?.id) {
        // Handle Update
        const res = await API.patch(`/clients/${initialData.id}`, formData);
        toast.success("Client updated successfully!");
        clientData = res?.data?.client;
      } else {
        // Handle Create
        const res = await API.post("/clients", formData);
        toast.success("Client created successfully!");
        clientData = res?.data?.client;
      }
      onSuccess?.(clientData);
    } catch (error) {
      toast.error("Operation failed", {
        description: error.response?.data?.message || error.response?.data?.error || "Something went wrong.",
        action: error.response?.data?.clientId ? {
          label: "View Client",
          onClick: () => router.push(`/dashboard/clients/${error.response.data.clientId}`)
        } : undefined
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4 px-2 sm:px-4 flex flex-col h-full">
      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Name</label>
          <Input 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            disabled={isLoading}
            className="w-full h-11"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Email</label>
          <Input 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            disabled={isLoading}
            className="w-full h-11"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Phone (Optional)</label>
          <Input 
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            disabled={isLoading}
            className="w-full h-11"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Country (Optional)</label>
          <Select 
            value={formData.country} 
            onValueChange={(val) => setFormData({ ...formData, country: val, timezone: "" })}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {allCountries.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Timezone (Optional)</label>
          <Select 
            value={formData.timezone} 
            onValueChange={(val) => setFormData({ ...formData, timezone: val })}
            disabled={isLoading || !formData.country || availableTimezones.length === 0}
          >
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder={!formData.country ? "Select a country first" : "Select a timezone"} />
            </SelectTrigger>
            <SelectContent>
              {availableTimezones.map((tz) => (
                <SelectItem key={tz.name} value={tz.name}>{tz.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Status</label>
          <div className="flex bg-muted/60 p-1 rounded-lg w-full">
            <button 
              type="button" 
              onClick={() => setFormData({...formData, status: "Lead"})}
              className={cn("flex-1 text-sm py-2.5 rounded-md transition-all font-medium", formData.status === "Lead" ? "bg-orange-500 shadow-sm text-white" : "text-muted-foreground hover:text-foreground")}
            >
              Lead
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, status: "Active"})}
              className={cn("flex-1 text-sm py-2.5 rounded-md transition-all font-medium", formData.status === "Active" ? "bg-emerald-500 shadow-sm text-white" : "text-muted-foreground hover:text-foreground")}
            >
              Active
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, status: "Inactive"})}
              className={cn("flex-1 text-sm py-2.5 rounded-md transition-all font-medium", formData.status === "Inactive" ? "bg-red-500 shadow-sm text-white" : "text-muted-foreground hover:text-foreground")}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Save Changes" : "Create Client"}
        </Button>
      </div>
    </form>
  );
}
