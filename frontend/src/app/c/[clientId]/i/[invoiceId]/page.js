"use client";

import { useEffect, useState, use } from "react";
import API from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Download, CreditCard, Building, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { generatePDF } from "@/lib/pdfHelper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { SosekiModernInvoice } from "@/components/invoices/templates/soseki-modern";
import { TaxInvoice } from "@/components/invoices/templates/tax-invoice";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientPortalInvoice({ params }) {
  const { clientId, invoiceId } = use(params);

  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    const success = await generatePDF('invoice-print-area', `Invoice-${invoice.invoiceNumber}.pdf`);
    if (success) {
      toast.success('PDF downloaded successfully');
      // Track download silently in the background
      try {
        await API.post(`/portal/client/${clientId}/invoices/${invoiceId}/track-download`);
      } catch (err) {
        // Silent fail
      }
    } else {
      toast.error('Failed to generate PDF');
    }
    setIsGeneratingPdf(false);
  };

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
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Skeleton className="w-full h-[800px] rounded-lg" />
          </div>
          <div className="w-full lg:w-[320px] shrink-0 space-y-6">
            <Card>
              <CardHeader className="pb-3 border-b">
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="pt-4 border-t space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
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
            <Button variant="outline" className="hidden sm:flex" onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
              {isGeneratingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />} Download PDF
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
        <div className="lg:col-span-2 overflow-x-auto pb-4 lg:pb-0">
          <div className="min-w-[800px] lg:min-w-0">
            <Card className="border-slate-200 shadow-xl shadow-black/5 overflow-hidden relative bg-white">
              <div className="w-full flex justify-center py-6">
                <div id="invoice-print-area" className="w-[800px] lg:w-full max-w-[210mm] bg-white pointer-events-none">
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
        </div>

        {/* Payment Mockup Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-6">
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

      {/* Mobile Sticky Payment Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        {isPaid ? (
          <div className="flex items-center text-green-600 font-medium">
            <CheckCircle2 className="w-5 h-5 mr-2" /> Payment Complete
          </div>
        ) : (
          <>
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Amount Due</div>
              <div className="text-lg font-bold text-slate-900">{invoice.currency} {amountDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
            <Link href={`/c/${clientId}/i/${invoiceId}/pay`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                <CreditCard className="w-4 h-4 mr-2" /> Pay Now
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
