"use client";

import { useEffect, useState, use } from "react";
import API from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CreditCard, Building, Building2, QrCode, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientPaymentPage({ params }) {
  const { clientId, invoiceId } = use(params);

  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState(null); // "UPI", "BANK"
  const [reference, setReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleRecordPayment = async () => {
    setIsSubmitting(true);
    try {
      await API.post(`/portal/client/${clientId}/invoices/${invoiceId}/record-payment`, {
        method: paymentMethod === "UPI" ? "UPI" : "Bank Transfer",
        reference: reference.trim() || undefined
      });
      toast.success("Payment recorded successfully!");
      // Reload invoice data to reflect Processing status
      const res = await API.get(`/portal/client/${clientId}/invoices/${invoiceId}`);
      setInvoice(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to record payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 space-y-6">
            <Card className="border-slate-200 shadow-sm bg-slate-50/50">
              <CardHeader className="pb-4 border-b">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <div>
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-5 w-2/3" />
                </div>
                <div className="pt-4 border-t">
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-8 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:w-2/3">
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="bg-slate-50/50 border-b pb-4">
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-slate-50 p-4 border-r flex flex-col gap-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="md:w-2/3 p-6 flex flex-col space-y-4">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-32 w-full mt-4" />
                  </div>
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
        <Link href={`/c/${clientId}`} className="mt-6 text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const isPaid = invoice.status === "Paid";
  const isProcessing = invoice.status === "Processing";
  const amountDue = invoice.totalAmount - invoice.paidAmount;
  const profile = invoice.organization?.profile || {};
  
  const upiId = profile.upiId;
  const hasBankDetails = profile.accountNumber && profile.bankName;

  // Set default method if none selected
  if (!paymentMethod && !isPaid && !isProcessing) {
    if (upiId) setPaymentMethod("UPI");
    else if (hasBankDetails) setPaymentMethod("BANK");
  }

  const isForeignCurrency = invoice.organization?.masterCurrency === "INR" && invoice.currency !== "INR";
  const referenceAmount = isForeignCurrency ? amountDue * (invoice.exchangeRate || 1) : amountDue;

  const upiUri = upiId ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(invoice.organization.name)}&am=${referenceAmount.toFixed(2)}&cu=INR&tr=${invoice.invoiceNumber}` : "";

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <Link href={`/c/${clientId}/i/${invoiceId}`} className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Invoice
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Payment Summary */}
        <div className="md:w-1/3 space-y-6">
          <Card className="border-slate-200 shadow-sm bg-blue-50/30">
            <CardHeader className="pb-4 border-b border-blue-100/50">
              <CardTitle className="text-lg text-blue-900">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Invoice Number</p>
                <p className="font-medium text-slate-900">{invoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">To</p>
                <p className="font-medium text-slate-900">{invoice.organization.name}</p>
              </div>
              <div className="pt-4 border-t border-blue-100/50">
                <p className="text-sm text-slate-500 mb-1">Total Due</p>
                <p className="text-3xl font-bold text-blue-700">{invoice.currency} {amountDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                {isForeignCurrency && (
                  <div className="mt-2 text-sm text-slate-600 bg-blue-100/50 p-2 rounded">
                    <p>Reference INR amount for UPI:</p>
                    <p className="font-semibold text-blue-800">₹ {referenceAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <p className="text-xs text-slate-500 mt-1">Based on exchange rate of {invoice.exchangeRate}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Gateway Area */}
        <div className="md:w-2/3">
          <Card className="border-slate-200 shadow-md">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle className="text-xl">Secure Checkout</CardTitle>
              <CardDescription>
                {isPaid ? "Payment Completed" : isProcessing ? "Payment Processing" : "Select a payment method to continue"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              {isPaid ? (
                <div className="flex flex-col items-center justify-center text-center py-16 text-green-600">
                  <CheckCircle2 className="w-16 h-16 mb-4" />
                  <div className="text-2xl font-bold">Payment Complete</div>
                  <p className="text-slate-500 mt-2 max-w-sm">This invoice has been fully paid. Thank you for your business.</p>
                </div>
              ) : isProcessing ? (
                <div className="flex flex-col items-center justify-center text-center py-16 text-amber-600">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">Payment Processing</div>
                  <p className="text-slate-500 mt-2 max-w-sm">Your payment has been recorded and is currently pending verification from {invoice.organization.name}.</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row">
                  {/* Payment Method Selector */}
                  <div className="md:w-1/3 bg-slate-50 p-4 border-r border-slate-100 flex flex-col gap-2">
                    {upiId && (
                      <Button 
                        variant={paymentMethod === "UPI" ? "default" : "ghost"} 
                        className={`justify-start w-full ${paymentMethod === "UPI" ? "bg-slate-900 shadow-sm" : ""}`}
                        onClick={() => setPaymentMethod("UPI")}
                      >
                        <QrCode className="w-4 h-4 mr-2" /> UPI
                      </Button>
                    )}
                    {hasBankDetails && (
                      <Button 
                        variant={paymentMethod === "BANK" ? "default" : "ghost"}
                        className={`justify-start w-full ${paymentMethod === "BANK" ? "bg-slate-900 shadow-sm" : ""}`}
                        onClick={() => setPaymentMethod("BANK")}
                      >
                        <Building2 className="w-4 h-4 mr-2" /> Bank Transfer
                      </Button>
                    )}
                  </div>

                  <div className="md:w-2/3 p-6 bg-white min-h-[300px] flex items-center justify-center">
                    {!paymentMethod && (
                      <p className="text-slate-400 text-sm">Select a payment method from the left.</p>
                    )}

                    {paymentMethod === "UPI" && upiId && (
                      <div className="flex flex-col items-center text-center space-y-6 w-full">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg text-slate-900">Pay via UPI</h3>
                          <p className="text-sm text-slate-500">Scan the QR code with any UPI app on your phone, or tap to open your app directly.</p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl border shadow-sm inline-block">
                          <QRCodeSVG value={upiUri} size={180} level="M" includeMargin={true} />
                        </div>
                        
                        <div className="w-full flex flex-col gap-3">
                          <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 border py-2 px-4 rounded-md">
                            <span>{upiId}</span>
                            <button onClick={() => copyToClipboard(upiId, "UPI ID")} className="text-slate-400 hover:text-blue-600" title="Copy UPI ID">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <a href={upiUri} className="md:hidden">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="lg">
                              Open UPI App
                            </Button>
                          </a>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "BANK" && hasBankDetails && (
                      <div className="space-y-6 w-full">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg text-slate-900">Bank Transfer</h3>
                          <p className="text-sm text-slate-500">Please transfer the total amount to the bank account below.</p>
                        </div>
                        
                        <div className="space-y-3 bg-slate-50 p-5 rounded-lg border">
                          <div className="flex justify-between items-center py-2 border-b border-slate-200">
                            <span className="text-slate-500 text-sm">Bank Name</span>
                            <span className="font-medium text-slate-900">{profile.bankName}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-slate-200">
                            <span className="text-slate-500 text-sm">Account Number</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900">{profile.accountNumber}</span>
                              <button onClick={() => copyToClipboard(profile.accountNumber, "Account Number")} className="text-slate-400 hover:text-blue-600">
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          {profile.routingNumber && (
                            <div className="flex justify-between items-center py-2 border-b border-slate-200">
                              <span className="text-slate-500 text-sm">Routing/IFSC</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900">{profile.routingNumber}</span>
                                <button onClick={() => copyToClipboard(profile.routingNumber, "Routing Number")} className="text-slate-400 hover:text-blue-600">
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          )}
                          {profile.branch && (
                            <div className="flex justify-between items-center py-2">
                              <span className="text-slate-500 text-sm">Branch</span>
                              <span className="font-medium text-slate-900">{profile.branch}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            
            {!isPaid && !isProcessing && paymentMethod && (
              <CardFooter className="bg-slate-50/80 border-t p-6 flex flex-col gap-4 items-end">
                <div className="w-full flex flex-col gap-3">
                  <Input 
                    placeholder="Transaction Reference Number (e.g. UTR or Ref ID) *"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full h-12"
                    required
                  />
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-auto py-3 text-base sm:text-lg shadow-md" 
                    size="lg"
                    onClick={handleRecordPayment}
                    disabled={isSubmitting || !reference.trim()}
                  >
                    {isSubmitting ? "Processing..." : `I have completed transaction of ${paymentMethod === 'UPI' ? '₹ ' + referenceAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : invoice.currency + ' ' + amountDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                  </Button>
                </div>
                <p className="text-xs text-slate-400 w-full text-right">
                  By clicking this, you confirm that the transfer has been initiated from your side.
                </p>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
