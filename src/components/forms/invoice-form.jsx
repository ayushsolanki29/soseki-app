"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, TrashIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function InvoiceForm({ initialData = null }) {
  const router = useRouter();
  
  // Data State
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [masterCurrency, setMasterCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(initialData?.exchangeRate || 1.0);
  const [isFetchingRate, setIsFetchingRate] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    clientId: initialData?.clientId || "",
    projectId: initialData?.projectId || "",
    invoiceNumber: initialData?.invoiceNumber || `INV-${Math.floor(Math.random() * 10000)}`,
    status: initialData?.status || "Draft",
    issueDate: initialData?.issueDate ? new Date(initialData.issueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : "",
    currency: initialData?.currency || "USD",
    notice: initialData?.notice || "",
    notes: initialData?.notes || "",
    terms: initialData?.terms || "",
    discountAmount: initialData?.discountAmount || 0,
    taxAmount: initialData?.taxAmount || 0,
  });

  const [items, setItems] = useState(initialData?.items || [
    { id: 1, description: "", quantity: 1, unitPrice: 0, taxRate: 0, total: 0 }
  ]);

  useEffect(() => {
    const fetchSelectData = async () => {
      try {
        const [clientsRes, projectsRes, orgRes] = await Promise.all([
          API.get("/clients"),
          API.get("/projects"),
          API.get("/organization")
        ]);
        setClients(clientsRes.data.clients || []);
        setProjects(projectsRes.data.projects || []);
        if (orgRes.data.organization?.masterCurrency) {
            setMasterCurrency(orgRes.data.organization.masterCurrency);
        }
      } catch (error) {
        toast.error("Failed to load clients and projects");
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchSelectData();
  }, []);

  useEffect(() => {
      // Don't auto-fetch if we loaded initialData with a saved exchange rate and the currency hasn't changed from initial
      if (initialData?.id && formData.currency === initialData.currency) return;

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
  }, [formData.currency, masterCurrency, initialData]);

  // Recalculate totals
  const recalculateItem = (index, field, value) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };
    
    // Parse values to ensure math works
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    item.total = qty * price;
    
    newItems[index] = item;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), description: "", quantity: 1, unitPrice: 0, taxRate: 0, total: 0 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  // Computed Totals
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.total || 0), 0), [items]);
  const discount = parseFloat(formData.discountAmount) || 0;
  const tax = parseFloat(formData.taxAmount) || 0; // Simple flat tax for demo
  const grandTotal = subtotal - discount + tax;

  const handleSubmit = async (e, submitStatus) => {
    e.preventDefault();
    if (!formData.clientId || !formData.dueDate) {
        toast.error("Please fill in Client and Due Date");
        return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        status: submitStatus,
        subtotal,
        totalAmount: grandTotal,
        exchangeRate,
        items: items.map(({ id, ...rest }) => rest) // strip local temp IDs
      };

      if (initialData?.id) {
        // Edit flow
        await API.patch(`/invoices/${initialData.id}`, payload);
        toast.success("Invoice updated successfully!");
      } else {
        // Create flow
        await API.post("/invoices", payload);
        toast.success("Invoice created successfully!");
      }
      router.push("/dashboard/invoices");
    } catch (error) {
      toast.error("Failed to save invoice");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) return <div>Loading form data...</div>;

  return (
    <div className="space-y-8">
        {/* General Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-xl border">
            <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-foreground">Client *</label>
                <Select value={formData.clientId} onValueChange={(val) => setFormData({...formData, clientId: val})}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                        {clients.map(client => (
                            <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-foreground">Project</label>
                <Select value={formData.projectId} onValueChange={(val) => setFormData({...formData, projectId: val})}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project (Optional)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {projects.filter(p => p.clientId === formData.clientId).map(project => (
                            <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-foreground">Invoice Number *</label>
                <Input value={formData.invoiceNumber} onChange={e => setFormData({...formData, invoiceNumber: e.target.value})} />
            </div>
            
            <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-foreground">Currency</label>
                <Select value={formData.currency} onValueChange={(val) => setFormData({...formData, currency: val})}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                        <SelectItem value="AUD">AUD ($)</SelectItem>
                    </SelectContent>
                </Select>
                {formData.currency !== masterCurrency && (
                    <div className="text-xs text-muted-foreground flex items-center justify-between mt-1 px-1">
                        <span>Exchange Rate: 1 {formData.currency} = {isFetchingRate ? "..." : exchangeRate.toFixed(4)} {masterCurrency}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-foreground">Issue Date *</label>
                <Input type="date" value={formData.issueDate} onChange={e => setFormData({...formData, issueDate: e.target.value})} />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-foreground">Due Date *</label>
                <Input type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
            </div>
        </div>

        {/* Line Items */}
        <div className="bg-card p-6 rounded-xl border flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Line Items</h3>
            <div className="overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[40%]">Item Description</TableHead>
                            <TableHead className="w-[15%]">Quantity</TableHead>
                            <TableHead className="w-[20%]">Price</TableHead>
                            <TableHead className="w-[20%]">Total</TableHead>
                            <TableHead className="w-[5%]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Input 
                                        placeholder="Service description" 
                                        value={item.description} 
                                        onChange={(e) => recalculateItem(index, 'description', e.target.value)} 
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input 
                                        type="number" min="1" 
                                        value={item.quantity} 
                                        onChange={(e) => recalculateItem(index, 'quantity', e.target.value)} 
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input 
                                        type="number" min="0" step="0.01" 
                                        value={item.unitPrice} 
                                        onChange={(e) => recalculateItem(index, 'unitPrice', e.target.value)} 
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    ${item.total.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveItem(index)} disabled={items.length === 1}>
                                        <TrashIcon className="size-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button variant="outline" className="w-fit gap-2" onClick={handleAddItem}>
                <PlusIcon className="size-4" /> Add Item
            </Button>
        </div>

        {/* Totals Summary */}
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-card p-6 rounded-xl border flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-foreground">Invoice Notice (Optional - Highlighted at top)</label>
                    <textarea 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                        placeholder="e.g. All projects are being handled on an urgent overnight basis..." 
                        value={formData.notice} onChange={e => setFormData({...formData, notice: e.target.value})}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-foreground">Notes</label>
                    <textarea 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                        placeholder="Additional notes for the client" 
                        value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-foreground">Terms & Conditions</label>
                    <textarea 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                        placeholder="Payment terms, bank details, etc." 
                        value={formData.terms} onChange={e => setFormData({...formData, terms: e.target.value})}
                    />
                </div>
            </div>
            <div className="flex-[0.6] bg-card p-6 rounded-xl border">
                <h3 className="font-semibold text-lg mb-4">Summary</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Discount</span>
                        <Input type="number" className="h-8 w-24 text-right" value={formData.discountAmount} onChange={e => setFormData({...formData, discountAmount: e.target.value})} />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Tax</span>
                        <Input type="number" className="h-8 w-24 text-right" value={formData.taxAmount} onChange={e => setFormData({...formData, taxAmount: e.target.value})} />
                    </div>
                    <div className="pt-4 mt-4 border-t flex justify-between font-bold text-lg">
                        <span>Grand Total</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-primary">
                        <span>Balance Due</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={(e) => handleSubmit(e, "Draft")} disabled={isSubmitting}>
                Save as Draft
            </Button>
            <Button onClick={(e) => handleSubmit(e, "Sent")} disabled={isSubmitting}>
                Create & Send Invoice
            </Button>
        </div>
    </div>
  );
}
