"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function InvoicePreviewDialog({ open, onOpenChange, invoice, masterCurrency = "INR", organization }) {
  if (!invoice) return null;

  const exchangeRate = invoice.exchangeRate || 1.0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Override default sm:max-w-sm with sm:max-w-4xl to fit A4 */}
      <DialogContent className="sm:max-w-4xl md:max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle>Invoice Preview</DialogTitle>
          <DialogDescription>
            Preview of {invoice.invoiceNumber}. PDF generation will be implemented later.
          </DialogDescription>
        </DialogHeader>

        {/* A4 Container inside an scrollable area */}
        <div className="flex-1 overflow-y-auto bg-muted/30 p-8 flex justify-center">
            
            {/* The A4 Canvas */}
            <div className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] shadow-lg flex flex-col p-12 shrink-0 rounded-sm">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">INVOICE</h2>
                        <p className="text-gray-500 mt-2">#{invoice.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-gray-900 text-lg">{organization?.name || "Your Organization"}</div>
                        {organization?.address ? (
                            <div className="text-gray-500 text-sm whitespace-pre-wrap mt-1 text-right max-w-xs ml-auto leading-relaxed">{organization.address}</div>
                        ) : (
                            <div className="text-gray-400 text-xs mt-2 italic">Billing address not configured</div>
                        )}
                    </div>
                </div>

                {/* Notice Block */}
                {invoice.notice && (
                    <div className="mb-12 bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-md text-sm whitespace-pre-wrap leading-relaxed shadow-sm">
                        {invoice.notice}
                    </div>
                )}

                {/* Meta */}
                <div className="flex justify-between mb-12 border-b border-gray-200 pb-8">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Billed To</p>
                        <p className="font-semibold text-gray-900">{invoice.client?.name}</p>
                        <p className="text-gray-500 text-sm mt-1">{invoice.client?.email}</p>
                    </div>
                    <div className="text-right flex gap-12">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Issue Date</p>
                            <p className="font-medium text-gray-900">{new Date(invoice.issueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Due Date</p>
                            <p className="font-medium text-gray-900">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div className="mb-12 flex-1">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-300 text-gray-500">
                                <th className="py-3 font-medium">Description</th>
                                <th className="py-3 font-medium text-right">Qty</th>
                                <th className="py-3 font-medium text-right">Price</th>
                                <th className="py-3 font-medium text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items?.map((item) => (
                                <tr key={item.id} className="border-b border-gray-100">
                                    <td className="py-4 text-gray-900 font-medium">{item.description}</td>
                                    <td className="py-4 text-gray-600 text-right">{item.quantity}</td>
                                    <td className="py-4 text-gray-600 text-right">{formatCurrency(item.unitPrice, invoice.currency)}</td>
                                    <td className="py-4 text-gray-900 text-right font-medium">{formatCurrency(item.total, invoice.currency)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="flex justify-between items-end mb-12">
                    <div className="max-w-[50%]">
                        {invoice.notes && (
                            <div className="mb-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes</p>
                                <p className="text-gray-600 text-sm">{invoice.notes}</p>
                            </div>
                        )}
                        {invoice.terms && (
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Terms</p>
                                <p className="text-gray-600 text-sm">{invoice.terms}</p>
                            </div>
                        )}
                    </div>

                    <div className="w-80 space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Tax</span>
                            <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 pb-3 border-b border-gray-900">
                            <span>Discount</span>
                            <span>-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-1">
                            <span>TOTAL ({invoice.currency})</span>
                            <span>{formatCurrency(invoice.totalAmount, invoice.currency)}</span>
                        </div>
                        
                        {invoice.currency !== masterCurrency && (
                            <div className="pt-4 space-y-2 mt-4 text-xs text-gray-500 border-t border-gray-200">
                                <div className="flex justify-between">
                                    <span>Reference Amount ({masterCurrency})</span>
                                    <span>{formatCurrency(invoice.totalAmount * exchangeRate, masterCurrency)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Exchange Rate</span>
                                    <span>1 {invoice.currency} = {masterCurrency} {exchangeRate}</span>
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-8 bg-blue-50/50 p-4 rounded-md border-l-4 border-blue-600">
                            <h4 className="text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">Payment Summary</h4>
                            
                            <div className="flex justify-between font-bold text-gray-900 mb-2">
                                <span>Total Invoice Amount:</span>
                                <span>{formatCurrency(invoice.totalAmount, invoice.currency)}</span>
                            </div>
                            
                            {invoice.currency !== masterCurrency && (
                                <div className="flex justify-between text-gray-500 text-[10px] uppercase mb-4 pb-4 border-b border-gray-200">
                                    <span>Reference in {masterCurrency}:</span>
                                    <span>{formatCurrency(invoice.totalAmount * exchangeRate, masterCurrency)}</span>
                                </div>
                            )}

                            <div className="flex justify-between text-gray-700 mt-4 mb-2">
                                <span>Total Paid so far:</span>
                                <span className="font-semibold text-emerald-600">{formatCurrency(invoice.paidAmount, invoice.currency)}</span>
                            </div>

                            <div className="flex justify-between text-gray-700 italic">
                                <span>Balance Due Amount:</span>
                                <span className="font-bold text-red-600">{formatCurrency(invoice.totalAmount - invoice.paidAmount, invoice.currency)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-400 text-xs mt-auto pt-8 border-t border-gray-200">
                    {organization?.invoiceFooterNote || "Thank you for your business!"}
                </div>

            </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-muted/10 shrink-0">
          <DialogClose render={<Button type="button" variant="outline">Close</Button>} />
          <Button onClick={() => alert("PDF Download will be implemented later!")} className="gap-2">
              <DownloadIcon className="size-4" /> Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
