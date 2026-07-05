"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import API from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkspaceSettingsPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceFooterNote, setInvoiceFooterNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await API.get("/organization");
        setName(res.data.organization.name || "");
        setAddress(res.data.organization.address || "");
        setInvoiceFooterNote(res.data.organization.invoiceFooterNote || "");
      } catch (error) {
        toast.error("Failed to load organization settings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrganization();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Organization name is required");

    setIsSaving(true);
    try {
      await API.patch("/organization", { 
        name: name.trim(),
        address: address.trim(),
        invoiceFooterNote: invoiceFooterNote.trim()
      });
      toast.success("Organization settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update organization");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl h-full flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your workspace's basic information.</p>
      </div>

      <Card>
        <form onSubmit={handleSave}>
          <CardHeader>
            <CardTitle>Organization Name</CardTitle>
            <CardDescription>
              This is your workspace's visible name within Workora.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 pt-2">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-11 w-full max-w-md rounded-md" />
                <Skeleton className="h-24 w-full max-w-md rounded-md" />
                <Skeleton className="h-11 w-full max-w-md rounded-md" />
              </div>
            ) : (
              <div className="flex flex-col gap-6 max-w-md">
                <div className="space-y-2">
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="e.g. Acme Corp" 
                      disabled={isSaving}
                      className="h-11"
                    />
                </div>
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Billing Address</div>
                    <div className="text-xs text-muted-foreground mb-2">This address will appear on your invoices.</div>
                    <textarea 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      placeholder="123 Business Rd.&#10;Suite 100&#10;City, ST 12345" 
                      disabled={isSaving}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Invoice Footer Note</div>
                    <div className="text-xs text-muted-foreground mb-2">A default note to appear at the bottom of your invoices.</div>
                    <Input 
                      value={invoiceFooterNote} 
                      onChange={(e) => setInvoiceFooterNote(e.target.value)} 
                      placeholder="e.g. Thank you for your business!" 
                      disabled={isSaving}
                      className="h-11"
                    />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-muted/20">
            <Button type="submit" disabled={isLoading || isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
