"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import API from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrencyGrid } from "@/components/ui/currency-grid";
import { useOrganization } from "@/components/providers/organization-provider";

export default function WorkspaceSettingsPage() {
  const { organization: contextOrg } = useOrganization();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceFooterNote, setInvoiceFooterNote] = useState("");
  const [expenseFooterNote, setExpenseFooterNote] = useState("");
  const [dateFormat, setDateFormat] = useState("dd-MMM-yy");
  const [masterCurrency, setMasterCurrency] = useState("USD");
  const [hasTransactions, setHasTransactions] = useState(false);
  const [invoiceTemplate, setInvoiceTemplate] = useState("soseki-modern");
  const [expenseTemplate, setExpenseTemplate] = useState("soseki-modern");
  const [isLoading, setIsLoading] = useState(true);
  
  const [isSavingGeneral, setIsSavingGeneral] = useState(false);
  const [isSavingFinancial, setIsSavingFinancial] = useState(false);
  const [isSavingCurrency, setIsSavingCurrency] = useState(false);
  const [isSavingTemplates, setIsSavingTemplates] = useState(false);

  // Custom Template Request State
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState("Invoice");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestFile, setRequestFile] = useState(null);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  useEffect(() => {
    if (contextOrg) {
      setName(contextOrg.name || "");
      setAddress(contextOrg.address || "");
      setInvoiceFooterNote(contextOrg.profile?.invoiceFooterNote || "");
      setExpenseFooterNote(contextOrg.profile?.expenseFooterNote || "");
      setDateFormat(contextOrg.dateFormat || "dd-MMM-yy");
      setMasterCurrency(contextOrg.masterCurrency || "USD");
      setInvoiceTemplate(contextOrg.profile?.invoiceTemplate || "soseki-modern");
      setExpenseTemplate(contextOrg.profile?.expenseTemplate || "soseki-modern");
      
      const counts = contextOrg._count;
      if (counts && (counts.invoices > 0 || counts.expenses > 0)) {
        setHasTransactions(true);
      }
      setIsLoading(false);
    }
  }, [contextOrg]);

  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Organization name is required");

    setIsSavingGeneral(true);
    try {
      await API.patch("/organization", { 
        name: name.trim(),
        address: address.trim(),
        dateFormat: dateFormat
      });
      toast.success("General settings updated!");
    } catch (error) {
      toast.error("Failed to update general settings");
    } finally {
      setIsSavingGeneral(false);
    }
  };

  const handleSaveFinancial = async (e) => {
    e.preventDefault();

    setIsSavingFinancial(true);
    try {
      await API.patch("/organization", { 
        invoiceFooterNote: invoiceFooterNote.trim(),
        expenseFooterNote: expenseFooterNote.trim()
      });
      toast.success("Financial settings updated!");
    } catch (error) {
      toast.error("Failed to update financial settings");
    } finally {
      setIsSavingFinancial(false);
    }
  };

  const handleSaveCurrency = async (e) => {
    e.preventDefault();

    setIsSavingCurrency(true);
    try {
      await API.patch("/organization", { 
        masterCurrency: masterCurrency
      });
      toast.success("Master currency updated!");
    } catch (error) {
      toast.error("Failed to update master currency");
    } finally {
      setIsSavingCurrency(false);
    }
  };

  const handleSaveTemplates = async (e) => {
    e.preventDefault();
    setIsSavingTemplates(true);
    try {
      await API.patch("/organization", { 
        invoiceTemplate,
        expenseTemplate
      });
      toast.success("Template settings updated!");
    } catch (error) {
      toast.error("Failed to update templates");
    } finally {
      setIsSavingTemplates(false);
    }
  };

  const handleRequestTemplate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!requestDescription.trim()) return toast.error("Please provide a description");

    setIsSubmittingRequest(true);
    try {
      let attachmentUrl = null;
      if (requestFile) {
        const formData = new FormData();
        formData.append("file", requestFile);
        const uploadRes = await API.post("/upload/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        attachmentUrl = uploadRes.data.url;
      }

      await API.post("/organization/template-requests", {
        type: requestType,
        description: requestDescription.trim(),
        attachmentUrl
      });

      toast.success("Template request submitted! We will contact you soon.");
      setIsRequestDialogOpen(false);
      setRequestDescription("");
      setRequestFile(null);
    } catch (error) {
      toast.error("Failed to submit request");
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl flex flex-col gap-8 pb-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspace Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's general, financial, and currency settings.</p>
        </div>

        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-1" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="pb-8 pt-2">
                <div className="flex flex-col gap-6 max-w-md">
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-11 w-full" />
                  </div>
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-64 mb-2" />
                      <Skeleton className="h-[100px] w-full" />
                  </div>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 bg-muted/20">
              <Skeleton className="h-9 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl flex flex-col gap-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workspace Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your organization's general, financial, and currency settings.</p>
      </div>

      <Card>
        <form onSubmit={handleSaveGeneral}>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>
              This is your workspace's visible name and billing address.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 pt-2">
              <div className="flex flex-col gap-6 max-w-md">
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Organization Name</div>
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="e.g. Acme Corp" 
                      disabled={isSavingGeneral}
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
                      disabled={isSavingGeneral}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Date Format</div>
                    <Select value={dateFormat} onValueChange={setDateFormat} disabled={isSavingGeneral}>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-MMM-yy">DD-MMM-YY (e.g. 05-Jul-26)</SelectItem>
                        <SelectItem value="MMM dd, yyyy">MMM DD, YYYY (e.g. Jul 05, 2026)</SelectItem>
                        <SelectItem value="dd/MM/yyyy">DD/MM/YYYY (e.g. 05/07/2026)</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/DD/YYYY (e.g. 07/05/2026)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground mt-2">Choose how dates are displayed across the application.</div>
                </div>
              </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-muted/20">
            <Button type="submit" disabled={isSavingGeneral}>
              {isSavingGeneral ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <form onSubmit={handleSaveFinancial}>
          <CardHeader>
            <CardTitle>Financial Settings</CardTitle>
            <CardDescription>
              Configure default footer notes for your generated documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 pt-2">
              <div className="flex flex-col gap-6 max-w-md">
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Invoice Footer Note</div>
                    <div className="text-xs text-muted-foreground mb-2">A default note to appear at the bottom of your invoices.</div>
                    <Input 
                      value={invoiceFooterNote} 
                      onChange={(e) => setInvoiceFooterNote(e.target.value)} 
                      placeholder="e.g. Thank you for your business!" 
                      disabled={isSavingFinancial}
                      className="h-11"
                    />
                </div>
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Expense Receipt Footer Note</div>
                    <div className="text-xs text-muted-foreground mb-2">A default note to appear at the bottom of your expense receipts.</div>
                    <Input 
                      value={expenseFooterNote} 
                      onChange={(e) => setExpenseFooterNote(e.target.value)} 
                      placeholder="e.g. Generated by Soseki" 
                      disabled={isSavingFinancial}
                      className="h-11"
                    />
                </div>
              </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-muted/20">
            <Button type="submit" disabled={isSavingFinancial}>
              {isSavingFinancial ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <form onSubmit={handleSaveCurrency}>
          <CardHeader>
            <CardTitle>Currency Management</CardTitle>
            <CardDescription>
              Set the default master currency for your organization's financials.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 pt-2">
              <div className="flex flex-col gap-6 max-w-md">
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Master Currency</div>
                    <div className="text-xs text-muted-foreground mb-2">Your system-wide base currency for reporting.</div>
                    <div className="mt-2">
                        <CurrencyGrid 
                          value={masterCurrency} 
                          onChange={setMasterCurrency} 
                          disabled={isSavingCurrency || hasTransactions} 
                        />
                    </div>
                    {hasTransactions && (
                        <p className="text-xs text-amber-600 font-medium">
                            Currency is locked because you have existing financial transactions.
                        </p>
                    )}
                </div>
              </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-muted/20">
            <Button type="submit" disabled={isSavingCurrency || hasTransactions}>
              {isSavingCurrency ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card id="templates" className="scroll-mt-6">
        <form onSubmit={handleSaveTemplates}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Template Settings</CardTitle>
                <CardDescription>Choose the layout designs for your documents.</CardDescription>
              </div>
              <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
                <DialogTrigger render={<Button variant="outline" size="sm" />}>
                  Request Custom Template
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleRequestTemplate}>
                    <DialogHeader>
                      <DialogTitle>Request Custom Template</DialogTitle>
                      <DialogDescription>
                        Need a specific layout? Upload an example or describe what you need, and our team will build a custom template for your organization. (Paid service)
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Template Type</Label>
                        <Select value={requestType} onValueChange={setRequestType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Invoice">Invoice</SelectItem>
                            <SelectItem value="Expense">Expense Receipt</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Description & Requirements</Label>
                        <Textarea 
                          value={requestDescription}
                          onChange={e => setRequestDescription(e.target.value)}
                          placeholder="Describe your desired layout, specific fields needed, colors, etc."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Example/Reference Image (Optional)</Label>
                        <div className="flex items-center gap-4">
                          <Input 
                            type="file" 
                            accept="image/*,.pdf" 
                            onChange={(e) => setRequestFile(e.target.files?.[0])}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="ghost" onClick={() => setIsRequestDialogOpen(false)}>Cancel</Button>
                      <Button type="submit" disabled={isSubmittingRequest}>
                        {isSubmittingRequest ? "Submitting..." : "Submit Request"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="pb-8 pt-2">
              <div className="flex flex-col gap-6 max-w-md">
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Invoice Template</div>
                    <Select value={invoiceTemplate} onValueChange={setInvoiceTemplate} disabled={isSavingTemplates}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Template" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="soseki-modern">Soseki Modern</SelectItem>
                            <SelectItem value="tax-invoice">Tax Invoice</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <div className="font-semibold text-sm">Expense Template</div>
                    <Select value={expenseTemplate} onValueChange={setExpenseTemplate} disabled={isSavingTemplates}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Template" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="soseki-modern">Soseki Modern (A4)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-muted/20">
            <Button type="submit" disabled={isSavingTemplates}>
              {isSavingTemplates ? "Saving..." : "Save Template Preferences"}
            </Button>
          </CardFooter>
        </form>
      </Card>

    </div>
  );
}
