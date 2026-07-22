"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { CreditCardIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GlobalRecordPaymentDialog } from "@/components/invoices/global-record-payment-dialog";
import { EditPaymentDialog } from "@/components/invoices/edit-payment-dialog";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useOrganization } from "@/components/providers/organization-provider";
import { Edit, MoreHorizontal, TrashIcon } from "lucide-react";

export default function PaymentsPage() {
  const { organization } = useOrganization();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  
  const [paymentToEdit, setPaymentToEdit] = useState(null);
  const [isEditPaymentOpen, setIsEditPaymentOpen] = useState(false);
  
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/payments");
      setPayments(res.data.payments || []);
    } catch (error) {
      toast.error("Failed to load payments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleEditClick = (payment) => {
    setPaymentToEdit(payment);
    setIsEditPaymentOpen(true);
  };

  const handleDeleteClick = (payment) => {
    setPaymentToDelete(payment);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!paymentToDelete) return;
    setIsDeleting(true);
    try {
      await API.delete(`/payments/${paymentToDelete.id}`);
      toast.success("Payment deleted successfully");
      fetchPayments();
    } catch (error) {
      toast.error("Failed to delete payment");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setPaymentToDelete(null);
    }
  };

  return (
    <div className="p-8 w-full h-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-2">Manage and view all payments received.</p>
        </div>
        <div>
          <Button onClick={() => setIsRecordPaymentOpen(true)} className="gap-2">
            <PlusIcon className="size-4" />
            Record Payment
          </Button>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonHelper type="table" columns={6} rows={5} />
            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  <CreditCardIcon className="mx-auto size-12 mb-4 opacity-20" />
                  No payments found.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {formatDate(payment.date)}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/invoices/${payment.invoiceId}?tab=payments`} className="flex items-center gap-3 hover:underline">
                      <DynamicAvatar type="invoice" seed={payment.invoice.invoiceNumber} size={28} />
                      {payment.invoice.invoiceNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <DynamicAvatar type="client" seed={payment.invoice.client.name} size={28} />
                      <div className="flex flex-col">
                        <span className="font-medium">{payment.invoice.client.name}</span>
                        {payment.invoice.project && (
                          <span className="text-xs text-muted-foreground">{payment.invoice.project.title}</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {payment.method}
                  </TableCell>
                  <TableCell>
                    {payment.reference || '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium text-emerald-600">
                    <div className="flex flex-col items-end gap-1">
                      <span>+{formatCurrency(payment.amount, payment.invoice.currency || organization?.masterCurrency || "USD")}</span>
                      {(payment.invoice.currency && organization?.masterCurrency && payment.invoice.currency !== organization.masterCurrency) && (
                        <span className="text-xs text-muted-foreground font-normal">
                          +{formatCurrency(payment.amount * (payment.invoice.exchangeRate || 1.0), organization.masterCurrency)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditClick(payment)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClick(payment)}
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

      <GlobalRecordPaymentDialog 
        open={isRecordPaymentOpen} 
        onOpenChange={setIsRecordPaymentOpen} 
        onSuccess={fetchPayments} 
      />
      <EditPaymentDialog 
        open={isEditPaymentOpen} 
        onOpenChange={setIsEditPaymentOpen} 
        onSuccess={fetchPayments}
        payment={paymentToEdit}
      />
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payment of <span className="font-semibold text-foreground">{paymentToDelete?.amount} {paymentToDelete?.invoice?.currency}</span>? This action cannot be undone and will update the invoice's balance.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Payment"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
