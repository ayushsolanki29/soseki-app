import { formatCurrency, formatDate } from "@/lib/utils";
import { SosekiBranding } from "@/components/shared/soseki-branding";

export function SosekiModernInvoice({ invoice, masterCurrency = "INR", organization }) {
  if (!invoice) return null;

  const exchangeRate = invoice.exchangeRate || 1.0;

  return (
    <div className="bg-white text-slate-800 w-full h-full flex flex-col p-10 font-sans text-sm relative">
      
      {/* Accent top border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600"></div>

      {/* Top Header */}
      <div className="flex justify-between items-start mb-10 pt-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{organization?.name || "Company Name"}</h1>
          {organization?.address && <p className="text-slate-500 mt-1 max-w-xs leading-relaxed">{organization.address}</p>}
          <div className="mt-4 text-xs text-slate-500 space-y-1">
            {organization?.profile?.phone && <p>Phone: <span className="font-medium text-slate-700">{organization.profile.phone}</span></p>}
            {organization?.profile?.email && <p>Email: <span className="font-medium text-slate-700">{organization.profile.email}</span></p>}
            {organization?.profile?.taxId && <p>{masterCurrency === "INR" ? "GSTIN" : "Tax ID"}: <span className="font-medium text-slate-700">{organization.profile.taxId}</span></p>}
            {organization?.profile?.registrationNumber && <p>{masterCurrency === "INR" ? "PAN" : "Reg No"}: <span className="font-medium text-slate-700">{organization.profile.registrationNumber}</span></p>}
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-5xl font-black text-slate-100 uppercase tracking-widest">Invoice</h2>
          <p className="text-blue-600 font-bold mt-2 text-xl tracking-wide">#{invoice.invoiceNumber}</p>
        </div>
      </div>

      {/* Notice Block */}
      {invoice.notice && (
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md text-blue-900 text-sm font-medium">
              {invoice.notice}
          </div>
      )}

      {/* Billing & Invoice Details Grid */}
      <div className="grid grid-cols-2 gap-8 mb-10 pb-8 border-b border-slate-100">
        <div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Billed To</p>
          <p className="font-bold text-slate-800 text-lg">{invoice.client?.name}</p>
          <div className="text-slate-600 text-sm mt-1 space-y-0.5">
            {invoice.client?.address && <p>{invoice.client.address}</p>}
            {invoice.client?.email && <p>{invoice.client.email}</p>}
            {invoice.client?.phone && <p>{invoice.client.phone}</p>}
            {invoice.client?.gstin && <p className="pt-1 text-xs"><span className="text-slate-400">GSTIN:</span> {invoice.client.gstin}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Issue Date</p>
            <p className="font-medium text-slate-800">{formatDate(invoice.issueDate)}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Due Date</p>
            <p className="font-medium text-slate-800">{formatDate(invoice.dueDate)}</p>
          </div>
          {organization?.profile?.region && (
            <div className="col-span-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Place of Supply</p>
              <p className="font-medium text-slate-800">{organization.profile.region}</p>
            </div>
          )}
        </div>
      </div>

      {/* Services Table */}
      <div className="mb-10 flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-500">
              <th className="py-3 font-bold uppercase tracking-wider text-xs">Service Description</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs text-center w-24">Qty/Hrs</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs text-right w-28">Rate</th>
              <th className="py-3 font-bold uppercase tracking-wider text-xs text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items?.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 last:border-b-0">
                <td className="py-4 text-slate-800 font-medium pr-4 leading-relaxed">{item.description}</td>
                <td className="py-4 text-slate-600 text-center">{item.quantity}</td>
                <td className="py-4 text-slate-600 text-right">{formatCurrency(item.unitPrice, invoice.currency)}</td>
                <td className="py-4 text-slate-900 font-bold text-right">{formatCurrency(item.total, invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary and Bank Details */}
      <div className="flex gap-10 mb-8">
        <div className="flex-1 space-y-6">
          {/* Bank Details */}
          {organization?.profile?.accountNumber && (
            <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Payment Details</p>
              <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                <span className="text-slate-500">Bank:</span>
                <span className="font-medium text-slate-900 whitespace-nowrap">{organization.profile.bankName}</span>
                <span className="text-slate-500">Account No:</span>
                <span className="font-medium text-slate-900 whitespace-nowrap">{organization.profile.accountNumber}</span>
                {organization.profile.routingNumber && (
                  <>
                    <span className="text-slate-500">{masterCurrency === "INR" ? "IFSC Code:" : "Routing No:"}</span>
                    <span className="font-medium text-slate-900 whitespace-nowrap">{organization.profile.routingNumber}</span>
                  </>
                )}
                {organization.profile.branch && (
                  <>
                    <span className="text-slate-500">Branch:</span>
                    <span className="font-medium text-slate-900 whitespace-nowrap">{organization.profile.branch}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {(invoice.notes || invoice.terms) && (
            <div className="space-y-4">
              {invoice.notes && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-slate-600 text-xs leading-relaxed">{invoice.notes}</p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Terms & Conditions</p>
                  <p className="text-slate-600 text-xs leading-relaxed">{invoice.terms}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="w-[340px]">
          <div className="space-y-3 text-sm bg-slate-50/80 p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
            </div>
            {invoice.taxAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="font-medium">{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
              </div>
            )}
            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span className="font-medium">-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
              </div>
            )}
            
            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-3xl font-black text-blue-600">{formatCurrency(invoice.totalAmount, invoice.currency)}</span>
              </div>
            </div>

            {invoice.currency !== masterCurrency && (
              <div className="pt-4 mt-4 text-xs text-slate-500 border-t border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span>Reference ({masterCurrency})</span>
                  <span>{formatCurrency(invoice.totalAmount * exchangeRate, masterCurrency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Rate</span>
                  <span>1 {invoice.currency} = {masterCurrency} {exchangeRate}</span>
                </div>
              </div>
            )}
          </div>
          
          {(invoice.paidAmount > 0) && (
            <div className="mt-4 p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
                <div className="flex justify-between text-slate-600 text-sm">
                    <span>Amount Paid</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(invoice.paidAmount, invoice.currency)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-sm">
                    <span>Balance Due</span>
                    <span className="text-rose-600">{formatCurrency(invoice.totalAmount - invoice.paidAmount, invoice.currency)}</span>
                </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-slate-400 text-xs mt-auto pt-6 border-t border-slate-100 flex-col flex gap-2">
        <span>{organization?.profile?.invoiceFooterNote || "Thank you for your business!"}</span>
        <SosekiBranding />
      </div>

    </div>
  );
}

