"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import API from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkspaceSettingsPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceFooterNote, setInvoiceFooterNote] = useState("");
  const [expenseFooterNote, setExpenseFooterNote] = useState("");
  const [dateFormat, setDateFormat] = useState("dd-MMM-yy");
  const [masterCurrency, setMasterCurrency] = useState("USD");
  const [hasTransactions, setHasTransactions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isSavingGeneral, setIsSavingGeneral] = useState(false);
  const [isSavingFinancial, setIsSavingFinancial] = useState(false);
  const [isSavingCurrency, setIsSavingCurrency] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await API.get("/organization");
        setName(res.data.organization.name || "");
        setAddress(res.data.organization.address || "");
        setInvoiceFooterNote(res.data.organization.invoiceFooterNote || "");
        setExpenseFooterNote(res.data.organization.expenseFooterNote || "");
        setDateFormat(res.data.organization.dateFormat || "dd-MMM-yy");
        setMasterCurrency(res.data.organization.masterCurrency || "USD");
        
        const counts = res.data.organization._count;
        if (counts && (counts.invoices > 0 || counts.expenses > 0)) {
          setHasTransactions(true);
        }
      } catch (error) {
        toast.error("Failed to load organization settings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrganization();
  }, []);

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

  if (isLoading) {
    return (
        <div className="p-8 max-w-4xl h-full flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your workspace's basic information.</p>
            </div>
            <div className="space-y-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-64 w-full rounded-xl" />
            </div>
        </div>
    );
  }

  const currencies = ["USD", "EUR", "GBP", "INR", "CAD", "AUD", "JPY"];

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
                      placeholder="e.g. Generated by Workora" 
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
                    <Select value={masterCurrency} onValueChange={setMasterCurrency} disabled={isSavingCurrency || hasTransactions}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                            {currencies.map(currency => (
                                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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

    </div>
  );
}
