import { serverFetch } from "@/lib/server-api";
import Link from "next/link";
import { ArrowLeft, Download, CreditCard, Building, Building2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default async function ClientPortalInvoice({ params }) {
  const { clientId, invoiceId } = await params;

  let invoice = null;

  try {
    const res = await serverFetch(`/portal/client/${clientId}/invoices/${invoiceId}`);
    invoice = res.data;
  } catch (error) {
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
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <CreditCard className="w-4 h-4 mr-2" /> Pay Now
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Invoice Document */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-6">
              <div>
                <div className="font-bold text-xl text-slate-900 mb-1">{invoice.organization.name}</div>
                {invoice.organization.address && (
                  <div className="text-slate-500 text-sm whitespace-pre-wrap">{invoice.organization.address}</div>
                )}
              </div>
              <div className="text-left md:text-right">
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Invoice Details</div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
                  <div className="flex justify-between md:justify-end gap-4 text-sm">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-medium text-slate-900">{format(new Date(invoice.issueDate), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between md:justify-end gap-4 text-sm">
                    <span className="text-slate-500">Due:</span>
                    <span className="font-medium text-slate-900">{format(new Date(invoice.dueDate), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between md:justify-end gap-4 text-sm">
                    <span className="text-slate-500">Status:</span>
                    <Badge variant={isPaid ? "success" : invoice.status === "Overdue" ? "destructive" : "secondary"} className="ml-auto w-fit">
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium text-center hidden sm:table-cell">Qty</th>
                    <th className="pb-3 font-medium text-right hidden sm:table-cell">Price</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 text-slate-900 font-medium">
                        {item.description}
                        <div className="sm:hidden text-xs text-slate-500 mt-1">
                          {item.quantity} x {invoice.currency} {item.unitPrice.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-4 text-center text-slate-600 hidden sm:table-cell">{item.quantity}</td>
                      <td className="py-4 text-right text-slate-600 hidden sm:table-cell">
                        {invoice.currency} {item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 text-right font-medium text-slate-900">
                        {invoice.currency} {item.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t border-slate-200 mt-6 pt-6 flex flex-col items-end gap-2 text-sm">
                <div className="flex justify-between w-full sm:w-1/2 md:w-1/3">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900">{invoice.currency} {invoice.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                {invoice.taxAmount > 0 && (
                  <div className="flex justify-between w-full sm:w-1/2 md:w-1/3">
                    <span className="text-slate-500">Tax</span>
                    <span className="font-medium text-slate-900">{invoice.currency} {invoice.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                {invoice.discountAmount > 0 && (
                  <div className="flex justify-between w-full sm:w-1/2 md:w-1/3">
                    <span className="text-slate-500">Discount</span>
                    <span className="font-medium text-slate-900">-{invoice.currency} {invoice.discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between w-full sm:w-1/2 md:w-1/3 text-base mt-2 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-slate-900">{invoice.currency} {invoice.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                {invoice.paidAmount > 0 && (
                  <div className="flex justify-between w-full sm:w-1/2 md:w-1/3 text-green-600">
                    <span>Paid</span>
                    <span>-{invoice.currency} {invoice.paidAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between w-full sm:w-1/2 md:w-1/3 text-lg mt-2 pt-2 border-t-2 border-slate-200">
                  <span className="font-bold text-slate-900">Balance Due</span>
                  <span className="font-bold text-blue-600">{invoice.currency} {amountDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {invoice.notes && (
                <div className="mt-10 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Notes</h4>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{invoice.notes}</p>
                </div>
              )}
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

                  <div className="space-y-3">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" size="lg">
                      <CreditCard className="w-4 h-4 mr-2" /> Pay with Card
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500">Or pay via</span>
                      </div>
                    </div>
                    {invoice.organization.profile?.accountNumber && (
                      <Button variant="outline" className="w-full" size="lg">
                        <Building2 className="w-4 h-4 mr-2" /> Bank Transfer
                      </Button>
                    )}
                  </div>
                  
                  <div className="text-xs text-center text-slate-400 mt-4">
                    This is a secure, encrypted payment gateway.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {invoice.organization.profile?.bankName && !isPaid && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" /> Bank Transfer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank Name:</span>
                  <span className="font-medium text-slate-900">{invoice.organization.profile.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account No:</span>
                  <span className="font-medium text-slate-900">{invoice.organization.profile.accountNumber}</span>
                </div>
                {invoice.organization.profile.routingNumber && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Routing/IFSC:</span>
                    <span className="font-medium text-slate-900">{invoice.organization.profile.routingNumber}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
