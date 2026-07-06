"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import API from "@/lib/api";
import { toast } from "sonner";

export function RecordExpenseDialog({ open, onOpenChange, onSuccess, defaultInvoiceId, expenseToEdit }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: "Software",
    clientId: "none",
    projectId: "none",
    invoiceId: defaultInvoiceId || "none",
    currency: "USD"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [masterCurrency, setMasterCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1.0);
  const [isFetchingRate, setIsFetchingRate] = useState(false);

  useEffect(() => {
    if (open) {
      if (expenseToEdit) {
        setFormData({
          description: expenseToEdit.description,
          amount: expenseToEdit.amount,
          date: expenseToEdit.date ? new Date(expenseToEdit.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          category: expenseToEdit.category || "Software",
          clientId: expenseToEdit.clientId || "none",
          projectId: expenseToEdit.projectId || "none",
          invoiceId: expenseToEdit.invoiceId || defaultInvoiceId || "none",
          currency: expenseToEdit.currency || "USD"
        });
      } else {
        setFormData(prev => ({
          description: "",
          amount: 0,
          date: new Date().toISOString().split('T')[0],
          category: "Software",
          clientId: "none",
          projectId: "none",
          invoiceId: defaultInvoiceId || "none",
          currency: prev.currency || "USD"
        }));
      }
      fetchMetadata();
    }
  }, [open, defaultInvoiceId, expenseToEdit]);

  const fetchMetadata = async () => {
    try {
      const [cRes, iRes, orgRes] = await Promise.all([
        API.get("/clients"),
        API.get("/invoices"),
        API.get("/organization")
      ]);
      setClients(cRes.data.clients || []);
      setInvoices(iRes.data.invoices || []);
      if (orgRes.data.organization?.masterCurrency) {
          setMasterCurrency(orgRes.data.organization.masterCurrency);
          if (!expenseToEdit) {
              setFormData(prev => ({ ...prev, currency: orgRes.data.organization.masterCurrency }));
          }
      }
    } catch (error) {
      console.error("Failed to load metadata", error);
    }
  };

  useEffect(() => {
      if (!open) return;
      if (expenseToEdit && formData.currency === expenseToEdit.currency) return;

      const fetchRate = async () => {
          if (formData.currency === masterCurrency) {
              setExchangeRate(1.0);
              return;
          }
          setIsFetchingRate(true);
          try {
              const res = await fetch(`https://open.er-api.com/v6/latest/${formData.currency}`);
              const data = await res.json();
              if (data && data.rates && data.rates[masterCurrency]) {
                  setExchangeRate(data.rates[masterCurrency]);
              }
          } catch (e) {
              console.error("Failed to fetch exchange rate", e);
          } finally {
              setIsFetchingRate(false);
          }
      };
      fetchRate();
  }, [formData.currency, masterCurrency, open, expenseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || formData.amount <= 0) {
        toast.error(`Please enter a valid description and amount`);
        return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        clientId: formData.clientId === "none" ? null : formData.clientId,
        projectId: formData.projectId === "none" ? null : formData.projectId,
        invoiceId: formData.invoiceId === "none" ? null : formData.invoiceId,
        currency: formData.currency,
        exchangeRate: formData.currency === masterCurrency ? 1.0 : exchangeRate,
      };
      
      if (expenseToEdit) {
        await API.patch(`/expenses/${expenseToEdit.id}`, payload);
        toast.success("Expense updated successfully!");
      } else {
        await API.post(`/expenses`, payload);
        toast.success("Expense recorded successfully!");
      }
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to record expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md w-full border-l flex flex-col h-full bg-background overflow-y-hidden p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>{expenseToEdit ? "Edit Expense" : "Record Expense"}</SheetTitle>
          <SheetDescription>
            {expenseToEdit ? "Update this outgoing expense." : "Record a new outgoing expense."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Description</label>
            <Input 
                placeholder="Domain purchase, subcontractor fee, etc."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold flex justify-between">
                Currency
                {isFetchingRate && <span className="text-xs text-muted-foreground animate-pulse">Fetching rate...</span>}
            </label>
            <Select value={formData.currency} onValueChange={val => setFormData({...formData, currency: val})}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                    {["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "INR"].map(cur => (
                        <SelectItem key={cur} value={cur}>{cur}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {formData.currency !== masterCurrency && !isFetchingRate && (
                <div className="text-xs text-muted-foreground">
                    Exchange Rate: 1 {formData.currency} = {exchangeRate} {masterCurrency}
                </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Amount</label>
            <Input 
                type="number" 
                step="0.01" 
                min={0.01}
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Date</label>
            <Input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Category</label>
            <Select value={formData.category} onValueChange={val => setFormData({...formData, category: val})}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Contractor">Contractor</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Link to Client (Optional)</label>
            <Select value={formData.clientId} onValueChange={val => setFormData({...formData, clientId: val})}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Link to Invoice (Optional)</label>
            <Select value={formData.invoiceId} onValueChange={val => setFormData({...formData, invoiceId: val})}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Invoice" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {invoices.map(i => <SelectItem key={i.id} value={i.id}>{i.invoiceNumber}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>

          <SheetFooter className="mt-4 pt-4 border-t px-0 mx-0 pb-2">
            <SheetClose render={<Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>} />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : (expenseToEdit ? "Update Expense" : "Record Expense")}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
