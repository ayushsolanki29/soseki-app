"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, DatabaseIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useOrganization } from "@/components/providers/organization-provider";
import { Input } from "@/components/ui/input";
import API from "@/lib/api";

export default function SystemSettingsPage() {
  const { organization } = useOrganization();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [step, setStep] = useState(1);
  const [countdown10, setCountdown10] = useState(10);
  const [countdown3, setCountdown3] = useState(3);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    let timer;
    if (isDialogOpen && step === 1 && countdown10 > 0) {
      timer = setTimeout(() => setCountdown10(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isDialogOpen, step, countdown10]);

  useEffect(() => {
    let timer;
    if (isDialogOpen && step === 4 && countdown3 > 0) {
      timer = setTimeout(() => setCountdown3(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isDialogOpen, step, countdown3]);

  const handleOpenChange = (open) => {
    setIsDialogOpen(open);
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setCountdown10(10);
        setCountdown3(3);
        setAcceptedTerms(false);
        setConfirmText("");
      }, 300);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await API.get("/organization/export", { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'soseki_export.json');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      toast.error("Failed to download data");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.delete("/organization");
      toast.success("Organization deleted successfully");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete organization");
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System</h1>
        <p className="text-muted-foreground mt-2">Manage your data and account deletion.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DatabaseIcon className="size-5 text-primary" />
            My Data
          </CardTitle>
          <CardDescription>
            Export your data, migrate from another system, or manage your stored records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            We provide powerful AI-assisted tools to help you safely move your data in and out of Soseki.
          </p>
          <Button variant="outline" onClick={handleDownload}>
            <DatabaseIcon className="mr-2 size-4" /> Download My Data (JSON)
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangleIcon className="size-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions for your account. Please be extremely careful.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div>
                    <h3 className="font-medium text-destructive">Delete Account</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger render={<Button variant="destructive" />}>
                        Delete Account
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="text-destructive flex items-center gap-2">
                                <AlertTriangleIcon className="size-5" />
                                {step === 1 && "Warning: Permanent Deletion"}
                                {step === 2 && "Accept Policies"}
                                {step === 3 && "Type to Confirm"}
                                {step === 4 && "Final Confirmation"}
                            </DialogTitle>
                            <DialogDescription>
                                {step === 1 && "Please read this warning carefully."}
                                {step === 2 && "Acknowledge our data retention terms."}
                                {step === 3 && "Verify your intent to delete."}
                                {step === 4 && "This action cannot be undone."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="py-4">
                          {step === 1 && (
                            <div className="bg-yellow-500/10 border border-yellow-500/50 p-6 rounded-lg text-yellow-700 dark:text-yellow-500">
                              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <AlertTriangleIcon className="size-5" /> Wait and Read
                              </h3>
                              <p className="mb-4 text-sm leading-relaxed">
                                You are about to permanently delete the <strong>{organization?.name}</strong> organization and ALL associated data (clients, invoices, expenses). This action is completely irreversible.
                              </p>
                              <div className="flex justify-end mt-4">
                                <Button 
                                  onClick={() => setStep(2)} 
                                  disabled={countdown10 > 0}
                                  variant="outline"
                                  className="border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-500"
                                >
                                  {countdown10 > 0 ? `Please wait (${countdown10}s)` : "I understand, continue"}
                                </Button>
                              </div>
                            </div>
                          )}

                          {step === 2 && (
                            <div className="space-y-4">
                              <p className="text-sm">Please confirm you have read our policies regarding data retention and deletion.</p>
                              <div className="flex items-start gap-2 p-4 border rounded-lg bg-muted/50">
                                <input 
                                  type="checkbox" 
                                  id="del-terms" 
                                  checked={acceptedTerms} 
                                  onChange={e => setAcceptedTerms(e.target.checked)} 
                                  className="mt-1 size-4 rounded-sm accent-primary cursor-pointer"
                                />
                                <label htmlFor="del-terms" className="text-sm cursor-pointer leading-snug">
                                  I accept the Privacy Policy and Terms of Service regarding data deletion and acknowledge that my data cannot be recovered once deleted.
                                </label>
                              </div>
                              <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                <Button onClick={() => setStep(3)} disabled={!acceptedTerms}>Continue</Button>
                              </div>
                            </div>
                          )}

                          {step === 3 && (
                            <div className="space-y-4">
                              <p className="text-sm">Please type exactly: <strong className="select-none text-foreground bg-muted px-1.5 py-0.5 rounded">{organization?.name} i want to delete this.</strong></p>
                              <Input 
                                value={confirmText}
                                onChange={e => setConfirmText(e.target.value)}
                                onPaste={e => {
                                  e.preventDefault();
                                  toast.error("Copy-pasting is not allowed for this security check.");
                                }}
                                placeholder={`${organization?.name} i want to delete this.`}
                                className="font-mono text-sm"
                              />
                              <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                                <Button 
                                  onClick={() => setStep(4)} 
                                  disabled={confirmText !== `${organization?.name} i want to delete this.`}
                                >
                                  Continue
                                </Button>
                              </div>
                            </div>
                          )}

                          {step === 4 && (
                            <div className="space-y-6">
                              <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-lg">
                                <h4 className="font-semibold text-destructive">Final Warning</h4>
                                <p className="text-sm text-destructive/80 mt-1">This is your absolute last chance to download your data before it is permanently destroyed.</p>
                              </div>
                              <div className="flex flex-col gap-3">
                                <Button variant="outline" className="w-full h-12" onClick={handleDownload}>
                                  <DatabaseIcon className="mr-2 size-4" /> Download My Data (JSON)
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  className="w-full h-12"
                                  disabled={countdown3 > 0 || isDeleting}
                                  onClick={handleDelete}
                                >
                                  {isDeleting ? "Deleting..." : (countdown3 > 0 ? `Permanently Delete in ${countdown3}s` : "Permanently Delete")}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
