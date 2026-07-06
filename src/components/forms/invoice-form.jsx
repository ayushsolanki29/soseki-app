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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon, TrashIcon, ZapIcon, SparklesIcon, SaveIcon, GripVerticalIcon, PlusCircleIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { CreateClientDialog } from "./create-client-dialog";
import { CreateProjectDialog } from "./create-project-dialog";

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
  const [quickItems, setQuickItems] = useState([]);
  const [newQuickItemName, setNewQuickItemName] = useState("");
  const [newQuickItemPrice, setNewQuickItemPrice] = useState("");
  const [isCreatingQuickItem, setIsCreatingQuickItem] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);

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
        const [clientsRes, projectsRes, orgRes, quickRes] = await Promise.all([
          API.get("/clients"),
          API.get("/projects"),
          API.get("/organization"),
          API.get("/quick-items")
        ]);
        setClients(clientsRes.data.clients || []);
        setProjects(projectsRes.data.projects || []);
        setQuickItems(quickRes.data.quickItems || []);
        if (orgRes.data.organization?.masterCurrency) {
            setMasterCurrency(orgRes.data.organization.masterCurrency);
            if (!initialData?.id && !initialData?.currency) {
                setFormData(prev => ({ ...prev, currency: orgRes.data.organization.masterCurrency }));
            }
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

  const handleQuickAdd = (qItem) => {
    const newItem = {
      id: Date.now(),
      description: qItem.name,
      quantity: 1,
      unitPrice: qItem.defaultPrice,
      taxRate: 0,
      total: qItem.defaultPrice * 1
    };
    
    // If the only item is completely empty, replace it rather than appending
    if (items.length === 1 && items[0].description === "" && items[0].unitPrice === 0) {
      setItems([newItem]);
    } else {
      setItems([...items, newItem]);
    }
    setIsQuickOpen(false);
  };

  const handleCreateQuickItem = async (e) => {
    e.preventDefault();
    if (!newQuickItemName) return;
    
    setIsCreatingQuickItem(true);
    try {
      const res = await API.post("/quick-items", {
        name: newQuickItemName,
        defaultPrice: newQuickItemPrice
      });
      const createdItem = res.data.quickItem;
      setQuickItems([createdItem, ...quickItems]);
      setNewQuickItemName("");
      setNewQuickItemPrice("");
      toast.success("Quick item saved!");
      // Optionally auto-add it too
      handleQuickAdd(createdItem);
    } catch (error) {
      toast.error("Failed to save quick item");
    } finally {
      setIsCreatingQuickItem(false);
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

  if (isLoadingData) {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-xl border">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border">
          <Skeleton className="h-10 w-full mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        {/* General Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-xl border">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground">Client *</label>
                    <CreateClientDialog 
                        trigger={
                            <button type="button" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                                <PlusCircleIcon className="size-3" /> Add new
                            </button>
                        }
                        onSuccess={(client) => {
                            setClients([client, ...clients]);
                            setFormData({...formData, clientId: client.id});
                        }}
                    />
                </div>
                <Select 
                    value={formData.clientId} 
                    onValueChange={(val) => setFormData({...formData, clientId: val})}
                    items={[
                        { value: "placeholder", label: "Select Client..." },
                        ...clients.map(c => ({ value: c.id, label: c.name }))
                    ]}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="placeholder" disabled>Select Client...</SelectItem>
                        {clients.map(client => (
                            <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground">Project</label>
                    <CreateProjectDialog 
                        trigger={
                            <button type="button" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                                <PlusCircleIcon className="size-3" /> Add new
                            </button>
                        }
                        onSuccess={(project) => {
                            setProjects([project, ...projects]);
                            setFormData({...formData, projectId: project.id});
                        }}
                    />
                </div>
                <Select 
                    value={formData.projectId} 
                    onValueChange={(val) => setFormData({...formData, projectId: val})}
                    items={[
                        { value: "placeholder", label: "Select Project..." },
                        { value: "none", label: "None" },
                        ...projects.filter(p => p && p.clientId === formData.clientId).map(p => ({ value: p.id, label: p.title }))
                    ]}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project (Optional)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="placeholder" disabled>Select Project...</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                        {projects.filter(p => p && p.clientId === formData.clientId).map(project => (
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
                <Select 
                    value={formData.currency} 
                    onValueChange={(val) => setFormData({...formData, currency: val})}
                    items={[
                        { value: "USD", label: "USD" },
                        { value: "EUR", label: "EUR" },
                        { value: "GBP", label: "GBP" },
                        { value: "INR", label: "INR" },
                        { value: "AUD", label: "AUD" },
                        { value: "CAD", label: "CAD" },
                        { value: "SGD", label: "SGD" },
                    ]}
                >
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
                                    {formatCurrency(item.total, formData.currency)}
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
            <div className="flex items-center gap-3">
                <Button variant="outline" className="w-fit gap-2" onClick={handleAddItem}>
                    <PlusIcon className="size-4" /> Add Item
                </Button>
                
                <Popover open={isQuickOpen} onOpenChange={setIsQuickOpen}>
                    <PopoverTrigger render={<Button variant="secondary" className="w-fit gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" />}>
                        <SparklesIcon className="size-4" /> Quick Add Services
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                        <div className="p-4 border-b bg-muted/20">
                            <h4 className="font-medium text-sm flex items-center gap-2">
                                <ZapIcon className="size-4 text-amber-500 fill-amber-500" />
                                Saved Services
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">Add items faster! Select a saved service below or create a new one instantly.</p>
                        </div>
                        
                        <div className="max-h-[200px] overflow-y-auto p-2">
                            {quickItems.length === 0 ? (
                                <p className="text-xs text-center text-muted-foreground py-4">No saved services yet.</p>
                            ) : (
                                quickItems.map(qi => (
                                    <button 
                                        key={qi.id} 
                                        onClick={() => handleQuickAdd(qi)}
                                        className="w-full text-left flex items-center justify-between p-2 text-sm hover:bg-muted rounded-md transition-colors"
                                    >
                                        <span className="font-medium truncate pr-2">{qi.name}</span>
                                        <span className="text-muted-foreground shrink-0">{formatCurrency(qi.defaultPrice, masterCurrency)}</span>
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="p-3 border-t bg-muted/20">
                            <form onSubmit={handleCreateQuickItem} className="flex flex-col gap-2">
                                <p className="text-xs font-medium mb-1">Create New</p>
                                <Input 
                                    size="sm" 
                                    className="h-8 text-xs" 
                                    placeholder="Service Name" 
                                    value={newQuickItemName} 
                                    onChange={e => setNewQuickItemName(e.target.value)} 
                                />
                                <div className="flex items-center gap-2">
                                    <Input 
                                        size="sm" 
                                        type="number" 
                                        className="h-8 text-xs" 
                                        placeholder="Default Price" 
                                        value={newQuickItemPrice} 
                                        onChange={e => setNewQuickItemPrice(e.target.value)} 
                                    />
                                    <Button type="submit" size="sm" className="h-8 shrink-0" disabled={isCreatingQuickItem || !newQuickItemName}>
                                        <SaveIcon className="size-3 mr-1" /> Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
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
                        <span className="font-medium">{formatCurrency(subtotal, formData.currency)}</span>
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
                        <span>{formatCurrency(grandTotal, formData.currency)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-primary">
                        <span>Balance Due</span>
                        <span>{formatCurrency(grandTotal, formData.currency)}</span>
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
