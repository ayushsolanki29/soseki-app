"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, PlusIcon, FileTextIcon, MoreHorizontal, EyeIcon, DownloadIcon, TrashIcon, CheckCircleIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecordPaymentDialog } from "@/components/invoices/record-payment-dialog";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentInvoice, setPaymentInvoice] = useState(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [masterCurrency, setMasterCurrency] = useState("INR");
  const [organization, setOrganization] = useState(null);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const [res, orgRes] = await Promise.all([
          API.get("/invoices", { params: { status: statusFilter !== "All" ? statusFilter : undefined } }),
          API.get("/organization")
      ]);
      setInvoices(res.data.invoices || []);
      if (orgRes.data.organization?.masterCurrency) {
          setMasterCurrency(orgRes.data.organization.masterCurrency);
      }
      setOrganization(orgRes.data.organization);
    } catch (error) {
      toast.error("Failed to load invoices");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [statusFilter]);

  const getStatusBadge = (status) => {
    switch(status) {
        case 'Draft': return 'outline';
        case 'Sent': return 'secondary';
        case 'Partially Paid': return 'default';
        case 'Paid': return 'default';
        case 'Overdue': return 'destructive';
        case 'Cancelled': return 'secondary';
        default: return 'outline';
    }
  }

  const handleOpenPayment = (invoice) => {
      setPaymentInvoice(invoice);
      setIsPaymentDialogOpen(true);
  }

  const handleOpenPreview = (invoice) => {
      const width = 800;
      const height = 1000;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      window.open(
          `/dashboard/invoices/${invoice.id}/preview`, 
          'InvoicePreview', 
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
      );
  }

  const handleDeleteClick = (invoice) => {
      setInvoiceToDelete(invoice);
      setIsDeleteDialogOpen(true);
  }

  const confirmDelete = async () => {
      if (!invoiceToDelete) return;
      setIsDeleting(true);
      try {
          await API.delete(`/invoices/${invoiceToDelete.id}`);
          toast.success("Invoice deleted successfully");
          setInvoices(invoices.filter(inv => inv.id !== invoiceToDelete.id));
      } catch (error) {
          toast.error("Failed to delete invoice");
      } finally {
          setIsDeleting(false);
          setIsDeleteDialogOpen(false);
          setInvoiceToDelete(null);
      }
  }

  // Summary KPIs in Master Currency
  const totalInvoiced = invoices.reduce((acc, inv) => acc + (inv.totalAmount * (inv.exchangeRate || 1.0)), 0);
  const totalPaid = invoices.reduce((acc, inv) => acc + (inv.paidAmount * (inv.exchangeRate || 1.0)), 0);
  const totalOutstanding = totalInvoiced - totalPaid;
  const overdueCount = invoices.filter(inv => inv.status === 'Overdue').length;

  return (
    <div className="p-8 h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-2">Create, manage, and track invoices for your clients.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <DownloadIcon className="size-4" />
                Export
            </Button>
            <Button render={<Link href="/dashboard/invoices/new" />} className="gap-2">
                <PlusIcon className="size-4" />
                New Invoice
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Total Invoiced</h3>
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{formatCurrency(totalInvoiced, masterCurrency)}</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Outstanding Amount</h3>
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{formatCurrency(totalOutstanding, masterCurrency)}</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Paid Total</h3>
                <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{formatCurrency(totalPaid, masterCurrency)}</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Overdue Invoices</h3>
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{overdueCount}</div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
        <div className="relative w-full sm:w-[250px] mr-auto">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search invoices..." className="pl-8 h-9" />
        </div>
        <div className="w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Partially Paid">Partially Paid</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden bg-card flex-1">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonHelper type="table" columns={7} rows={5} />
            ) : invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-[300px] text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <FileTextIcon className="size-12 text-muted-foreground/30" />
                        <h3 className="font-semibold text-lg text-foreground">No invoices yet</h3>
                        <p>Create your first invoice and start tracking payments.</p>
                        <Button render={<Link href="/dashboard/invoices/new" />} className="mt-4">
                            Create Invoice
                        </Button>
                    </div>
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id} className="group cursor-pointer" onClick={() => router.push(`/dashboard/invoices/${invoice.id}`)}>
                  <TableCell className="font-medium group-hover:text-primary transition-colors">
                    <div className="flex items-center gap-3">
                        <DynamicAvatar type="invoice" seed={invoice.invoiceNumber} size={32} />
                        {invoice.invoiceNumber}
                    </div>
                  </TableCell>
                  <TableCell>{invoice.client?.name || "-"}</TableCell>
                  <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>
                      <div className="font-semibold text-gray-900">{formatCurrency(invoice.totalAmount * (invoice.exchangeRate || 1.0), masterCurrency)}</div>
                      {invoice.currency !== masterCurrency && (
                          <div className="text-xs text-muted-foreground">({formatCurrency(invoice.totalAmount, invoice.currency)})</div>
                      )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem render={<Link href={`/dashboard/invoices/${invoice.id}`} />}>
                            <EyeIcon className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem render={<Link href={`/dashboard/invoices/${invoice.id}/edit`} />}>
                            <FileTextIcon className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => handleOpenPreview(invoice)}>
                            <DownloadIcon className="mr-2 h-4 w-4" /> Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenPayment(invoice)}>
                            <CheckCircleIcon className="mr-2 h-4 w-4" /> Record Payment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            onClick={() => handleDeleteClick(invoice)}
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        >
                            <TrashIcon className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <RecordPaymentDialog 
        open={isPaymentDialogOpen} 
        onOpenChange={setIsPaymentDialogOpen} 
        invoice={paymentInvoice} 
        onSuccess={fetchInvoices} 
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete invoice <span className="font-semibold text-foreground">{invoiceToDelete?.invoiceNumber}</span>? This action cannot be undone and will remove all associated payment records.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Invoice"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
