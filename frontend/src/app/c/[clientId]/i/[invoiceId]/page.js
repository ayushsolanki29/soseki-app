"use client";

import { useEffect, useState, use } from "react";
import API from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Download, CreditCard, Building, Building2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { SosekiModernInvoice } from "@/components/invoices/templates/soseki-modern";
import { TaxInvoice } from "@/components/invoices/templates/tax-invoice";

export default function ClientPortalInvoice({ params }) {
  const { clientId, invoiceId } = use(params);

  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get(`/portal/client/${clientId}/invoices/${invoiceId}`)
      .then(res => {
        setInvoice(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [clientId, invoiceId]);

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500">Loading invoice...</div>;
  }

  if (error || !invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Invoice Not Found</h2>
        <p className="text-slate-500 max-w-md">
          The invoice you are looking for does not exist or you do not have permission to view it.
        </p>
        <Link href={`/c/${clientId}`} className="mt-6 text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!invoice) return null;

  const isPaid = invoice.status === "Paid";
  const amountDue = invoice.totalAmount - invoice.paidAmount;
  const template = invoice.organization?.profile?.invoiceTemplate || "soseki-modern";
  const masterCurrency = invoice.organization?.masterCurrency || "USD";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Navigation */}
      <div>
        <Link href={`/c/${clientId}#invoices`} className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Invoices
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Invoice {invoice.invoiceNumber}</h1>
            <p className="text-slate-500">{invoice.project?.title || "General Invoice"}</p>
          </div>
          <div className="flex gap-3">
            {/* Dummy Download PDF action */}
            <Button variant="outline" className="hidden sm:flex">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
            {!isPaid && (
              <Link href={`/c/${clientId}/i/${invoiceId}/pay`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Invoice Document */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 shadow-xl shadow-black/5 overflow-hidden relative bg-white">
            <div className="w-full flex justify-center py-6">
              <div className="w-full max-w-[210mm] bg-white pointer-events-none">
                {template === "soseki-modern" && (
                    <SosekiModernInvoice invoice={invoice} organization={invoice.organization} masterCurrency={masterCurrency} />
                )}
                {template === "tax-invoice" && (
                    <TaxInvoice invoice={invoice} organization={invoice.organization} masterCurrency={masterCurrency} />
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Mockup Sidebar */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm border-t-4 border-t-blue-600">
            <CardHeader className="bg-slate-50/50 pb-4">
              <CardTitle className="text-lg">Payment Details</CardTitle>
              <CardDescription>
                {isPaid ? "This invoice has been fully paid." : "Complete your payment securely."}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {isPaid ? (
                <div className="flex flex-col items-center justify-center text-center py-6 text-green-600">
                  <CheckCircle2 className="w-12 h-12 mb-3" />
                  <div className="text-lg font-bold">Payment Complete</div>
                  <p className="text-sm text-slate-500 mt-1">Thank you for your business.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                    <span className="text-blue-900 font-medium">Amount to Pay</span>
                    <span className="text-xl font-bold text-blue-700">{invoice.currency} {amountDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>

                  <Link href={`/c/${clientId}/i/${invoiceId}/pay`} className="block w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                      <CreditCard className="w-4 h-4 mr-2" /> Pay Invoice securely
                    </Button>
                  </Link>
                  
                  <div className="text-xs text-center text-slate-400 mt-4">
                    Multiple secure payment methods available.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
}
