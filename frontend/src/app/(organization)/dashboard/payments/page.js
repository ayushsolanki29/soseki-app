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
import { GlobalRecordPaymentDialog } from "@/components/invoices/global-record-payment-dialog";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useOrganization } from "@/components/providers/organization-provider";

export default function PaymentsPage() {
  const { organization } = useOrganization();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonHelper type="table" columns={6} rows={5} />
            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
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
                      {payment.invoice.client.name}
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
    </div>
  );
}
