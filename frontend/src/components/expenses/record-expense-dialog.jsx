"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import API from "@/lib/api";
import { toast } from "sonner";
import { fetchExchangeRate } from "@/lib/exchange";
import { CURRENCIES } from "@/lib/currencies";
import { useOrganization } from "@/components/providers/organization-provider";
import { PlusCircleIcon } from "lucide-react";
import { CreateClientDialog } from "@/components/forms/create-client-dialog";
import { CreateProjectDialog } from "@/components/forms/create-project-dialog";

export function RecordExpenseDialog({ open, onOpenChange, onSuccess, defaultInvoiceId, expenseToEdit }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: "Software",
    status: "Paid",
    clientId: "none",
    projectId: "none",
    invoiceId: defaultInvoiceId || "none",
    currency: "USD",
    customCategory: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const { organization } = useOrganization();
  const masterCurrency = organization?.masterCurrency || "USD";
  const [exchangeRate, setExchangeRate] = useState(1.0);
  const [isFetchingRate, setIsFetchingRate] = useState(false);

  useEffect(() => {
    if (open) {
      if (expenseToEdit) {
        const predefinedCategories = ["Software", "Contractor", "Hardware", "Travel", "Other"];
        const cat = expenseToEdit.category || "Software";
        const isCustomCat = !predefinedCategories.includes(cat);

        setFormData({
          description: expenseToEdit.description,
          amount: expenseToEdit.amount,
          date: expenseToEdit.date ? new Date(expenseToEdit.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          category: isCustomCat ? "Other" : cat,
          status: expenseToEdit.status || "Paid",
          customCategory: isCustomCat ? cat : "",
          clientId: expenseToEdit.clientId || "none",
          projectId: expenseToEdit.projectId || "none",
          invoiceId: expenseToEdit.invoiceId || defaultInvoiceId || "none",
          currency: expenseToEdit.currency || "USD"
        });
        setExchangeRate(expenseToEdit.exchangeRate || 1.0);
      } else {
        setFormData(prev => ({
          description: "",
          amount: 0,
          date: new Date().toISOString().split('T')[0],
          category: "Software",
          status: "Paid",
          clientId: "none",
          projectId: "none",
          invoiceId: defaultInvoiceId || "none",
          currency: prev.currency || "USD",
          customCategory: ""
        }));
      }
      fetchMetadata();
    }
  }, [open, defaultInvoiceId, expenseToEdit]);

  const fetchMetadata = async () => {
    try {
      const [cRes, pRes, iRes] = await Promise.all([
        API.get("/clients"),
        API.get("/projects"),
        API.get("/invoices")
      ]);
      setClients(cRes.data.clients || []);
      setProjects(pRes.data.projects || []);
      setInvoices(iRes.data.invoices || []);
      
      if (organization?.masterCurrency && !expenseToEdit && formData.currency !== organization.masterCurrency) {
          setFormData(prev => ({ ...prev, currency: organization.masterCurrency }));
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
              const rate = await fetchExchangeRate(formData.currency, masterCurrency);
              setExchangeRate(rate);
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
        status: formData.status,
        clientId: formData.clientId === "none" ? null : formData.clientId,
        projectId: formData.projectId === "none" ? null : formData.projectId,
        invoiceId: formData.invoiceId === "none" ? null : formData.invoiceId,
        currency: formData.currency,
        exchangeRate: formData.currency === masterCurrency ? 1.0 : exchangeRate,
        category: formData.category === "Other" ? (formData.customCategory || "Other") : formData.category,
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
            <Select 
              value={formData.currency} 
              onValueChange={val => setFormData({...formData, currency: val})}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                    {CURRENCIES.map(c => (
                        <SelectItem key={c.code} value={c.code}>
                            <div className="flex items-center gap-2">
                                <img src={`https://flagcdn.com/w20/${c.country}.png`} alt={c.code} className="w-4 h-3 object-cover rounded-sm shadow-sm" />
                                <span>{c.code} ({c.symbol})</span>
                            </div>
                        </SelectItem>
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
            <label className="text-sm font-semibold">Status</label>
            <Select 
              value={formData.status} 
              onValueChange={val => setFormData({...formData, status: val})}
              items={["Pending", "Approved", "Rejected", "Paid"].map(s => ({ value: s, label: s }))}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Category</label>
            <div className="flex flex-col gap-2">
                <Select 
                  value={formData.category} 
                  onValueChange={val => setFormData({...formData, category: val})}
                  items={["Software", "Contractor", "Hardware", "Travel", "Other"].map(c => ({ value: c, label: c }))}
                >
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
                {formData.category === "Other" && (
                    <Input 
                        placeholder="Specify custom category..." 
                        value={formData.customCategory} 
                        onChange={e => setFormData({...formData, customCategory: e.target.value})}
                        autoFocus
                    />
                )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Link to Client (Optional)</label>
                <CreateClientDialog 
                    trigger={
                        <button type="button" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                            <PlusCircleIcon className="size-3" /> Add new
                        </button>
                    }
                    onSuccess={(client) => {
                        setClients([client, ...clients]);
                        setFormData({...formData, clientId: client.id, projectId: "none", invoiceId: "none"});
                    }}
                />
            </div>
            <Select 
              value={formData.clientId} 
              onValueChange={val => setFormData({...formData, clientId: val, projectId: "none", invoiceId: "none"})}
              items={[
                { value: "none", label: "None" },
                ...clients.map(c => ({ value: c.id, label: c.name }))
              ]}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {(formData.clientId !== "none" && !clients.find(c => c.id === formData.clientId) && expenseToEdit?.client) && (
                        <SelectItem value={formData.clientId}>{expenseToEdit.client.name}</SelectItem>
                    )}
                    {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Link to Project (Optional)</label>
                <CreateProjectDialog 
                    trigger={
                        <button type="button" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                            <PlusCircleIcon className="size-3" /> Add new
                        </button>
                    }
                    onSuccess={(project) => {
                        setProjects([project, ...projects]);
                        const newClientId = project.clientId || project.client?.id || formData.clientId;
                        setFormData({...formData, projectId: project.id, clientId: newClientId, invoiceId: "none"});
                    }}
                />
            </div>
            <Select 
              value={formData.projectId} 
              onValueChange={val => setFormData({...formData, projectId: val, invoiceId: "none"})}
              disabled={formData.clientId === "none"}
              items={[
                { value: "none", label: "None" },
                ...projects
                  .filter(proj => proj.clientId === formData.clientId)
                  .map(proj => ({ value: proj.id, label: proj.title }))
              ]}
            >
                <SelectTrigger>
                    <SelectValue placeholder={formData.clientId === "none" ? "Select a client first" : "Select Project"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {(formData.projectId !== "none" && !projects.find(p => p.id === formData.projectId) && expenseToEdit?.project) && (
                        <SelectItem value={formData.projectId}>{expenseToEdit.project.title}</SelectItem>
                    )}
                    {projects
                      .filter(proj => proj.clientId === formData.clientId)
                      .map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Link to Invoice (Optional)</label>
            <Select 
              value={formData.invoiceId} 
              onValueChange={val => {
                if (val === "none") {
                  setFormData({...formData, invoiceId: val});
                  return;
                }
                const selectedInvoice = invoices.find(inv => inv.id === val);
                if (selectedInvoice) {
                  setFormData({
                    ...formData, 
                    invoiceId: val, 
                    clientId: selectedInvoice.clientId || formData.clientId,
                    projectId: selectedInvoice.projectId || formData.projectId
                  });
                } else {
                  setFormData({...formData, invoiceId: val});
                }
              }}
              disabled={formData.clientId === "none" && invoices.length === 0}
            >
                <SelectTrigger>
                    <SelectValue placeholder={formData.clientId !== "none" ? "Select Invoice" : "Select Client first (or any invoice)"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {(formData.invoiceId !== "none" && !invoices.find(i => i.id === formData.invoiceId) && expenseToEdit?.invoice) && (
                        <SelectItem value={formData.invoiceId}>{expenseToEdit.invoice.invoiceNumber}</SelectItem>
                    )}
                    {invoices
                      .filter(i => formData.clientId === "none" || i.clientId === formData.clientId)
                      .filter(i => formData.projectId === "none" || i.projectId === formData.projectId || !i.projectId)
                      .map(i => <SelectItem key={i.id} value={i.id}>{i.invoiceNumber}</SelectItem>)}
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
