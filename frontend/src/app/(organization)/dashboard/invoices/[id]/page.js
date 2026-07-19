"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, formatId } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
    ArrowLeftIcon, 
    DownloadIcon, 
    CreditCardIcon,
    EditIcon,
    BuildingIcon,
    TrashIcon
} from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { useParams, useRouter, useSearchParams, usePathname } from "next/navigation";
import { RecordPaymentDialog } from "@/components/invoices/record-payment-dialog";
import { formatCurrency } from "@/lib/utils";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { DocumentSettingsDialog } from "@/components/shared/document-settings-dialog";
import { useOrganization } from "@/components/providers/organization-provider";


export default function InvoiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { organization, refetch } = useOrganization();
  
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const activeTab = searchParams.get('tab') || 'overview';

  const setActiveTab = (tab) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const masterCurrency = organization?.masterCurrency || "USD";

  const fetchInvoice = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/invoices/${id}`);
      setInvoice(res.data.invoice);
    } catch (error) {
      toast.error("Failed to load invoice details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

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
  };

  const handleOpenPreview = () => {
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

  const handleRecordPayment = () => {
      setIsPaymentDialogOpen(true);
  };

  const confirmDelete = async () => {
      if (!invoice) return;
      setIsDeleting(true);
      try {
          await API.delete(`/invoices/${invoice.id}`);
          toast.success("Invoice deleted successfully");
          router.push('/dashboard/invoices');
      } catch (error) {
          toast.error("Failed to delete invoice");
          setIsDeleting(false);
      }
  }

  if (isLoading) {
    return (
      <div className="p-8 w-full h-full flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Skeleton className="size-9 rounded-md" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                  <Skeleton className="size-14 rounded-full" />
                  <div className="space-y-2">
                      <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-40" />
                          <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                  </div>
              </div>
              <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-9 w-24 rounded-md" />
                  <Skeleton className="h-9 w-24 rounded-md" />
                  <Skeleton className="h-9 w-36 rounded-md" />
                  <Skeleton className="h-9 w-24 rounded-md" />
              </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-xl p-4 bg-card space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
              </div>
          ))}
        </div>

        <div className="flex gap-4 border-b pb-2 mt-4">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
        </div>

        <div className="flex-1">
            <div className="bg-card border rounded-xl overflow-hidden">
                <div className="p-6 border-b bg-muted/20">
                    <Skeleton className="h-6 w-32" />
                </div>
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Qty</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Tax</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <SkeletonHelper type="table" columns={5} rows={3} />
                    </TableBody>
                </Table>
            </div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return <div className="p-8">Invoice not found.</div>;
  }

  return (
    <div className="p-8 w-full h-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <Button variant="ghost" size="icon" render={<Link href="/dashboard/invoices" />}>
            <ArrowLeftIcon className="size-4" />
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <DynamicAvatar type="invoice" seed={invoice.invoiceNumber} size={56} className="shadow-sm" />
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight">{invoice.invoiceNumber}</h1>
                        <Badge variant={getStatusBadge(invoice.status)} className="text-sm px-3 py-1">
                            {invoice.status}
                        </Badge>
                        <Badge variant="outline" className="text-sm font-mono text-muted-foreground border-dashed">
                            {formatId(invoice.id, "INV")}
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" render={<Link href={`/dashboard/invoices/${invoice.id}/edit`} />} className="gap-2">
                    <EditIcon className="size-4" />
                    Edit
                </Button>

                <div className="flex gap-1">
                    <Button variant="outline" onClick={handleOpenPreview} className="gap-2 px-3">
                        <DownloadIcon className="size-4" />
                        Preview
                    </Button>
                    <DocumentSettingsDialog 
                        organization={organization}
                        onOrganizationUpdate={() => refetch()}
                        documentType="invoice"
                        masterCurrency={masterCurrency}
                    />
                </div>
                <Button onClick={handleRecordPayment} className="gap-2">
                    <CreditCardIcon className="size-4" />
                    Record Payment
                </Button>
                <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2" onClick={() => setIsDeleteDialogOpen(true)}>
                    <TrashIcon className="size-4" />
                    Delete
                </Button>
            </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div className="border rounded-xl p-4 bg-card">
              <div className="text-sm text-muted-foreground mb-1">Client</div>
              <div className="font-medium flex items-center gap-2">
                  <BuildingIcon className="size-4 text-muted-foreground" />
                  {invoice.client?.name}
              </div>
          </div>
          <div className="border rounded-xl p-4 bg-card">
              <div className="text-sm text-muted-foreground mb-1">Issue Date</div>
              <div className="font-medium">{formatDate(invoice.issueDate)}</div>
          </div>
          <div className="border rounded-xl p-4 bg-card">
              <div className="text-sm text-muted-foreground mb-1">Due Date</div>
              <div className="font-medium">{formatDate(invoice.dueDate)}</div>
          </div>
          <div className="border rounded-xl p-4 bg-card">
              <div className="text-sm text-muted-foreground mb-1">Amount Due</div>
              <div className="font-bold text-lg text-primary">
                  {formatCurrency(invoice.totalAmount - invoice.paidAmount, invoice.currency)}
              </div>
              {invoice.currency !== masterCurrency && (
                  <div className="text-xs text-muted-foreground mt-1">
                      {formatCurrency((invoice.totalAmount - invoice.paidAmount) * (invoice.exchangeRate || 1.0), masterCurrency)}
                  </div>
              )}
          </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-4 border-b pb-2 mt-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
              Overview
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'payments' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
              Transactions
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'activity' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
              Activity
          </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
          {activeTab === 'overview' && (
              <div className="bg-card border rounded-xl overflow-hidden">
                  <div className="p-6 border-b bg-muted/20">
                      <h3 className="font-semibold text-lg">Line Items</h3>
                  </div>
                  <Table>
                      <TableHeader className="bg-muted/50">
                          <TableRow>
                              <TableHead>Description</TableHead>
                              <TableHead className="text-right">Qty</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Tax</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {invoice.items?.map(item => (
                              <TableRow key={item.id}>
                                  <TableCell className="font-medium">{item.description}</TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">${item.unitPrice.toLocaleString()}</TableCell>
                                  <TableCell className="text-right">{item.taxRate}%</TableCell>
                                  <TableCell className="text-right font-medium">${item.total.toLocaleString()}</TableCell>
                              </TableRow>
                          ))}
                          {(!invoice.items || invoice.items.length === 0) && (
                              <TableRow>
                                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                      No line items found.
                                  </TableCell>
                              </TableRow>
                          )}
                      </TableBody>
                  </Table>
                  <div className="p-6 flex flex-col md:flex-row justify-between gap-8 bg-muted/10 border-t">
                      <div className="flex-1 space-y-6">
                          {invoice.notes && (
                              <div>
                                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Notes</h4>
                                  <p className="text-sm whitespace-pre-wrap">{invoice.notes}</p>
                              </div>
                          )}
                          {invoice.terms && (
                              <div>
                                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Terms & Conditions</h4>
                                  <p className="text-sm whitespace-pre-wrap">{invoice.terms}</p>
                              </div>
                          )}
                      </div>
                      <div className="w-full md:w-72 space-y-3">
                          <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Subtotal</span>
                              <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Discount</span>
                              <span>-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Tax</span>
                              <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                          </div>
                          <div className="flex justify-between text-base font-bold pt-3 border-t">
                              <span>Grand Total ({invoice.currency})</span>
                              <span>{formatCurrency(invoice.totalAmount, invoice.currency)}</span>
                          </div>
                          {invoice.currency !== masterCurrency && (
                              <div className="flex justify-between text-xs text-muted-foreground pt-1 pb-2 border-b">
                                  <span>Reference Amount ({masterCurrency})</span>
                                  <span>{formatCurrency(invoice.totalAmount * (invoice.exchangeRate || 1.0), masterCurrency)}</span>
                              </div>
                          )}
                          <div className="flex justify-between text-sm font-medium text-muted-foreground pt-2">
                              <span>Amount Paid</span>
                              <span className="text-emerald-600">{formatCurrency(invoice.paidAmount, invoice.currency)}</span>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'payments' && (
              <div className="flex flex-col gap-6">
                  <div className="bg-card border rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4">Payment History</h3>
                      {invoice.payments?.length > 0 ? (
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Date</TableHead>
                                      <TableHead>Method</TableHead>
                                      <TableHead>Reference</TableHead>
                                      <TableHead className="text-right">Amount</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {invoice.payments.map(payment => (
                                      <TableRow key={payment.id}>
                                          <TableCell>{formatDate(payment.date)}</TableCell>
                                          <TableCell>{payment.method}</TableCell>
                                          <TableCell>{payment.reference || '-'}</TableCell>
                                          <TableCell className="text-right font-medium">
                                              <div className="text-emerald-600">
                                                +{formatCurrency(payment.amount, invoice.currency)}
                                              </div>
                                              {masterCurrency && invoice.currency && invoice.currency !== masterCurrency && (
                                                  <div className="text-xs text-muted-foreground mt-0.5 font-normal">
                                                      +{formatCurrency(payment.amount * (invoice.exchangeRate || 1.0), masterCurrency)}
                                                  </div>
                                              )}
                                          </TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      ) : (
                          <div className="text-center py-12 text-muted-foreground">
                              No payments have been recorded for this invoice yet.
                          </div>
                      )}
                  </div>

                  <div className="bg-card border rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4">Linked Expenses</h3>
                      {invoice.expenses?.length > 0 ? (
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Date</TableHead>
                                      <TableHead>Description</TableHead>
                                      <TableHead>Category</TableHead>
                                      <TableHead className="text-right">Amount</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {invoice.expenses.map(expense => (
                                      <TableRow key={expense.id}>
                                          <TableCell>{formatDate(expense.date)}</TableCell>
                                          <TableCell>{expense.description}</TableCell>
                                          <TableCell>{expense.category}</TableCell>
                                          <TableCell className="text-right font-medium">
                                              <div className="text-destructive">
                                                -{formatCurrency(expense.amount, expense.currency || invoice.currency)}
                                              </div>
                                              {masterCurrency && (expense.currency || invoice.currency) !== masterCurrency && (
                                                  <div className="text-xs text-muted-foreground mt-0.5 font-normal">
                                                      -{formatCurrency(expense.amount * (expense.exchangeRate || invoice.exchangeRate || 1.0), masterCurrency)}
                                                  </div>
                                              )}
                                          </TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      ) : (
                          <div className="text-center py-12 text-muted-foreground">
                              No expenses have been linked to this invoice.
                          </div>
                      )}
                  </div>
              </div>
          )}

          {activeTab === 'activity' && (
              <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4">Activity Timeline</h3>
                  {invoice.activities?.length > 0 ? (
                      <div className="space-y-6 pl-4 border-l-2 ml-2 border-muted">
                          {invoice.activities.map((activity, index) => (
                              <div key={activity.id} className="relative">
                                  <div className="absolute -left-[25px] mt-1 size-3 rounded-full bg-primary ring-4 ring-background"></div>
                                  <div className="flex flex-col">
                                      <span className="font-medium text-sm">{activity.description || activity.type}</span>
                                      <span className="text-xs text-muted-foreground">
                                          {new Date(activity.date).toLocaleString()}
                                      </span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="text-muted-foreground text-center py-12">No activity recorded.</div>
                  )}
              </div>
          )}
      </div>
      
      <RecordPaymentDialog 
        open={isPaymentDialogOpen} 
        onOpenChange={setIsPaymentDialogOpen} 
        invoice={invoice} 
        onSuccess={fetchInvoice} 
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete invoice <span className="font-semibold text-foreground">{invoice?.invoiceNumber}</span>? This action cannot be undone and will remove all associated payment records.
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
