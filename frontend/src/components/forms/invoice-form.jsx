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
import { PlusIcon, TrashIcon, ZapIcon, SparklesIcon, SaveIcon, PlusCircleIcon } from "lucide-react";
import { fetchExchangeRate } from "@/lib/exchange";
import { CURRENCIES } from "@/lib/currencies";
import { formatCurrency } from "@/lib/utils";
import API from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateClientDialog } from "./create-client-dialog";
import { CreateProjectDialog } from "./create-project-dialog";
import { useOrganization } from "@/components/providers/organization-provider";

export function InvoiceForm({ initialData = null }) {
  const router = useRouter();
  const { organization } = useOrganization();
  
  // Data State
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const masterCurrency = organization?.masterCurrency || "USD";
  const [exchangeRate, setExchangeRate] = useState(initialData?.exchangeRate || 1.0);
  const [isFetchingRate, setIsFetchingRate] = useState(false);
  const [quickItems, setQuickItems] = useState([]);
  const [newQuickItemName, setNewQuickItemName] = useState("");
  const [newQuickItemPrice, setNewQuickItemPrice] = useState("");
  const [isCreatingQuickItem, setIsCreatingQuickItem] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);

  // Form State
  const [errors, setErrors] = useState({});
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
        const [clientsRes, projectsRes, quickRes] = await Promise.all([
          API.get("/clients?limit=1000&status=All"),
          API.get("/projects?limit=1000&status=All"),
          API.get("/quick-items")
        ]);
        setClients(clientsRes.data.clients || []);
        setProjects(projectsRes.data.projects || []);
        setQuickItems(quickRes.data.quickItems || []);
        
        if (organization?.masterCurrency && !initialData?.id && !initialData?.currency) {
            setFormData(prev => ({ ...prev, currency: organization.masterCurrency }));
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
              const rate = await fetchExchangeRate(formData.currency, masterCurrency);
              setExchangeRate(rate);
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

  const validate = () => {
    const newErrors = {};
    if (!formData.clientId || formData.clientId === "Select Client...") newErrors.clientId = "Client is required";
    if (!formData.invoiceNumber || !formData.invoiceNumber.trim()) newErrors.invoiceNumber = "Invoice Number is required";
    if (!formData.issueDate) newErrors.issueDate = "Issue Date is required";
    if (!formData.dueDate) {
      newErrors.dueDate = "Due Date is required";
    } else if (formData.issueDate && new Date(formData.dueDate) < new Date(formData.issueDate)) {
      newErrors.dueDate = "Due Date cannot be before Issue Date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, submitStatus) => {
    e.preventDefault();
    if (!validate()) {
        toast.error("Please fix the errors before submitting");
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
                    value={formData.clientId || "Select Client..."} 
                    onValueChange={(val) => {
                        setFormData({...formData, clientId: val});
                        if (errors.clientId) setErrors({...errors, clientId: null});
                    }}
                >
                    <SelectTrigger className={`w-full ${errors.clientId ? 'border-destructive focus:ring-destructive aria-invalid:border-destructive aria-invalid:ring-destructive/20' : ''}`}>
                        <SelectValue placeholder="Select Client">
                            {formData.clientId !== "Select Client..." && formData.clientId 
                                ? (clients.find(c => c.id === formData.clientId)?.name || formData.clientId) 
                                : "Select Client..."}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Select Client..." disabled>Select Client...</SelectItem>
                        {clients.map(client => (
                            <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.clientId && <p className="text-xs text-destructive -mt-1">{errors.clientId}</p>}
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
                            setFormData({...formData, projectId: project.id, clientId: project.clientId || project.client?.id});
                        }}
                    />
                </div>
                <Select 
                    value={formData.projectId || "none"} 
                    onValueChange={(val) => {
                        if (val === "none" || val === "Select Client...") {
                            setFormData({...formData, projectId: ""});
                            return;
                        }
                        const proj = projects.find(p => p.id === val);
                        if (proj) {
                            setFormData({...formData, projectId: val, clientId: proj.clientId || proj.client?.id});
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project (Optional)">
                            {formData.projectId !== "none" && formData.projectId 
                                ? (projects.find(p => p.id === formData.projectId)?.title || formData.projectId) 
                                : "Select Project (Optional)"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {(!formData.clientId || formData.clientId === "Select Client...") ? (
                            <SelectItem value="Select Client..." disabled>Select a client first...</SelectItem>
                        ) : projects.filter(p => (p.clientId || p.client?.id) === formData.clientId).length === 0 ? (
                            <SelectItem value="none">No projects for this client</SelectItem>
                        ) : (
                            <>
                                <SelectItem value="none">None</SelectItem>
                                {projects
                                    .filter(p => (p.clientId || p.client?.id) === formData.clientId)
                                    .map(project => (
                                        <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                                    ))}
                            </>
                        )}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-3 relative">
                <label className="text-sm font-semibold text-foreground">Invoice Number *</label>
                <div>
                    <Input value={formData.invoiceNumber} onChange={e => { setFormData({...formData, invoiceNumber: e.target.value}); if (errors.invoiceNumber) setErrors({...errors, invoiceNumber: null}); }} className={errors.invoiceNumber ? "border-destructive focus-visible:ring-destructive" : ""} />
                    {errors.invoiceNumber && <p className="text-xs text-destructive mt-1.5">{errors.invoiceNumber}</p>}
                </div>
            </div>
            
            <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-foreground">Currency</label>
                <Select 
                    value={formData.currency} 
                    onValueChange={(val) => setFormData({...formData, currency: val})}
                >
                    <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                        {CURRENCIES.map(c => (
                            <SelectItem key={c.code} value={c.code}>
                                <div className="flex items-center gap-2">
                                    <img src={`https://flagcdn.com/w20/${c.country}.png`} alt={c.code} className="w-4 h-3 object-cover rounded shadow-sm" />
                                    <span>{c.code} ({c.symbol})</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {formData.currency !== masterCurrency && (
                    <div className="text-xs text-muted-foreground flex items-center justify-between mt-1 px-1">
                        <span>Exchange Rate: 1 {formData.currency} = {isFetchingRate ? "..." : exchangeRate.toFixed(4)} {masterCurrency}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 relative">
                <label className="text-sm font-semibold text-foreground">Issue Date *</label>
                <div>
                    <Input type="date" value={formData.issueDate} onChange={e => { setFormData({...formData, issueDate: e.target.value}); if (errors.issueDate) setErrors({...errors, issueDate: null}); }} className={errors.issueDate ? "border-destructive focus-visible:ring-destructive" : ""} />
                    {errors.issueDate && <p className="text-xs text-destructive mt-1.5">{errors.issueDate}</p>}
                </div>
            </div>

            <div className="flex flex-col gap-3 relative">
                <label className="text-sm font-semibold text-foreground">Due Date *</label>
                <div>
                    <Input type="date" value={formData.dueDate} min={formData.issueDate} onChange={e => { setFormData({...formData, dueDate: e.target.value}); if (errors.dueDate) setErrors({...errors, dueDate: null}); }} className={errors.dueDate ? "border-destructive focus-visible:ring-destructive" : ""} />
                    {errors.dueDate && <p className="text-xs text-destructive mt-1.5">{errors.dueDate}</p>}
                </div>
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
            <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="w-fit gap-2 shrink-0" onClick={handleAddItem}>
                    <PlusIcon className="size-4" /> Add Item
                </Button>
                
                {quickItems.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 border-l pl-3 ml-1">
                        {quickItems.map(qi => (
                            <button 
                                key={qi.id} 
                                type="button"
                                onClick={() => handleQuickAdd(qi)}
                                className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors border border-primary/20 shadow-sm"
                                title={`Click to add ${qi.name} for ${formatCurrency(qi.defaultPrice, masterCurrency)}`}
                            >
                                <SparklesIcon className="size-3 text-amber-500" />
                                {qi.name}
                            </button>
                        ))}
                    </div>
                )}

                <Popover open={isQuickOpen} onOpenChange={setIsQuickOpen}>
                    <PopoverTrigger render={<Button variant="secondary" size="sm" className={`w-fit gap-1 rounded-full px-3 h-7 text-xs ${quickItems.length === 0 ? "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" : "bg-muted text-muted-foreground hover:bg-muted/80"}`} />}>
                        <PlusIcon className="size-3" /> {quickItems.length === 0 ? "Create Quick Add" : "New"}
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0" align="start">
                        <div className="p-4 border-b bg-muted/20">
                            <h4 className="font-medium text-sm flex items-center gap-2">
                                <ZapIcon className="size-4 text-amber-500 fill-amber-500" />
                                Save a Service
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">Save a frequently used service here to reuse it instantly on future invoices.</p>
                        </div>

                        <div className="p-3 bg-card">
                            <form onSubmit={handleCreateQuickItem} className="flex flex-col gap-3">
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
                                    <Button type="submit" size="sm" className="h-8 shrink-0 w-20" disabled={isCreatingQuickItem || !newQuickItemName}>
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
                        <span>Grand Total ({formData.currency})</span>
                        <span>{formatCurrency(grandTotal, formData.currency)}</span>
                    </div>
                    {formData.currency !== masterCurrency && (
                        <div className="flex justify-between text-xs text-muted-foreground pb-2 border-b">
                            <span>Reference Amount ({masterCurrency})</span>
                            <span>{formatCurrency(grandTotal * (exchangeRate || 1.0), masterCurrency)}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-medium text-primary pt-2">
                        <span>Balance Due</span>
                        <span>{formatCurrency(grandTotal, formData.currency)}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={(e) => handleSubmit(e, "Draft")} disabled={isSubmitting}>
                {initialData ? "Update Draft" : "Save as Draft"}
            </Button>
            <Button onClick={(e) => handleSubmit(e, "Sent")} disabled={isSubmitting}>
                {initialData ? "Update Invoice" : "Create & Send Invoice"}
            </Button>
        </div>
    </div>
  );
}
