import { formatCurrency, formatDate } from "@/lib/utils";
import { SosekiBranding } from "@/components/shared/soseki-branding";

function numberToWords(num) {
    if (!num || isNaN(num) || num === 0) return "Zero Only";
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    const format = (n) => {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
        if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + format(n % 100) : "");
        if (n < 100000) return format(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + format(n % 1000) : "");
        if (n < 10000000) return format(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + format(n % 100000) : "");
        return format(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + format(n % 10000000) : "");
    }
    return format(Math.floor(num)) + " Only";
}

export function TaxInvoice({ invoice, masterCurrency = "INR", organization }) {
  if (!invoice) return null;

  const getClientContactInfo = (client) => {
      const parts = [];
      if (client?.gstin) parts.push(`GSTIN: ${client.gstin}`);
      if (client?.phone) parts.push(`Mobile: ${client.phone}`);
      if (client?.email) parts.push(`Email: ${client.email}`);
      return parts.join(" | ");
  };

  const getOrgContactInfo = (org) => {
      const parts = [];
      if (org?.profile?.phone) parts.push(`Mobile: ${org.profile.phone}`);
      if (org?.profile?.email) parts.push(`Email: ${org.profile.email}`);
      return parts.join(" | ");
  };

  const getOrgTaxInfo = (org, cur) => {
      const parts = [];
      if (org?.profile?.taxId) parts.push(`${cur === "INR" ? "GSTIN" : "Tax ID"} - ${org.profile.taxId}`);
      if (org?.profile?.registrationNumber) parts.push(`${cur === "INR" ? "PAN" : "Reg No."} - ${org.profile.registrationNumber}`);
      return parts.join(" | ");
  };

  return (
    <div className="bg-white text-black w-full min-h-full flex flex-col font-sans text-[11px] leading-tight p-4">
      <div className="border border-black flex flex-col h-full w-full mx-auto" style={{ minHeight: '277mm' }}>
        
        {/* Row 1: Header */}
        <div className="flex justify-between items-center border-b border-black p-1 px-2">
          <span className="w-24">Page No. 1 of 1</span>
          <span className="font-bold text-sm uppercase flex-1 text-center">TAX INVOICE</span>
          <span className="w-24 text-right">Original Copy</span>
        </div>

        {/* Row 2: Company Info */}
        <div className="flex border-b border-black p-2 items-center">
          <div className="w-20 h-20 border border-gray-300 flex items-center justify-center text-gray-400 font-bold bg-gray-50 mr-4 shrink-0">
            Add Logo
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span className="font-bold text-base">{organization?.name}</span>
            {organization?.address && <span className="mt-1">{organization.address}</span>}
            {getOrgContactInfo(organization) && (
                <div className="mt-1">{getOrgContactInfo(organization)}</div>
            )}
            {getOrgTaxInfo(organization, masterCurrency) && (
                <div className="mt-1">{getOrgTaxInfo(organization, masterCurrency)}</div>
            )}
          </div>
          <div className="w-24 shrink-0"></div> {/* Spacer for center alignment */}
        </div>

        {/* Row 3: Invoice Meta */}
        <div className="border-b border-black p-2 px-3">
          <div className="grid grid-cols-[120px_1fr] gap-y-1">
            <span className="font-semibold">Invoice Number</span>
            <span>: {invoice.invoiceNumber}</span>
            <span className="font-semibold">Invoice Date</span>
            <span>: {formatDate(invoice.issueDate)}</span>
            <span className="font-semibold">Due date</span>
            <span>: {formatDate(invoice.dueDate)}</span>
            {organization?.profile?.region && (
                <>
                    <span className="font-semibold">Place of Supply</span>
                    <span>: {organization.profile.region}</span>
                </>
            )}
            <span className="font-semibold">Reverse Charge</span>
            <span>: No</span>
          </div>
        </div>

        {/* Row 4: Billing & Shipping */}
        <div className="grid grid-cols-2 border-b border-black">
          <div className="border-r border-black p-2 px-3 flex flex-col gap-1">
            <span className="font-bold">Billing Details</span>
            <span className="font-semibold">{invoice.client?.name}</span>
            {getClientContactInfo(invoice.client) && (
                <span className="text-xs">{getClientContactInfo(invoice.client)}</span>
            )}
            {invoice.client?.address && <span>{invoice.client.address}</span>}
          </div>
          <div className="p-2 px-3 flex flex-col gap-1">
            <span className="font-bold">Shipping Details</span>
            <span className="font-semibold">{invoice.client?.name}</span>
            {getClientContactInfo(invoice.client) && (
                <span className="text-xs">{getClientContactInfo(invoice.client)}</span>
            )}
            {invoice.client?.address && <span>{invoice.client.address}</span>}
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left flex-1" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="border-b border-black">
              <th className="border-r border-black p-1 font-bold text-center w-8">Sr.</th>
              <th className="border-r border-black p-1 font-bold">Item Description</th>
              <th className="border-r border-black p-1 font-bold text-center w-12">Qty</th>
              <th className="border-r border-black p-1 font-bold text-right w-24">Price</th>
              <th className="p-1 font-bold text-right w-28">Amount ({invoice.currency === "INR" ? "₹" : invoice.currency})</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items?.map((item, index) => (
              <tr key={item.id} className="align-top">
                <td className="border-r border-black p-1 px-2 text-center">{index + 1}</td>
                <td className="border-r border-black p-1 px-2">{item.description}</td>
                <td className="border-r border-black p-1 px-2 text-center">{item.quantity}</td>
                <td className="border-r border-black p-1 px-2 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                <td className="p-1 px-2 text-right">{Number(item.total).toFixed(2)}</td>
              </tr>
            ))}
            {/* Filler row to push footer down */}
            <tr style={{ height: '100%' }}>
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1"></td>
                <td className="p-1"></td>
            </tr>
          </tbody>
        </table>

        {/* Discount & Total */}
        <div className="border-t border-black grid grid-cols-[1fr_7rem]">
            <div className="border-r border-black p-1 px-2">Discount</div>
            <div className="p-1 px-2 text-right">- {formatCurrency(invoice.discountAmount || 0, invoice.currency)}</div>
        </div>
        <div className="border-t border-black grid grid-cols-[1fr_7rem]">
            <div className="border-r border-black p-1 px-2 font-bold text-center">Total</div>
            <div className="p-1 px-2 text-right font-bold">{formatCurrency(invoice.totalAmount, invoice.currency)}</div>
        </div>

        {/* Amount in words and tax breakdown */}
        <div className="border-t border-black p-1 px-2 space-y-1">
            <div className="font-bold uppercase">{invoice.currency} {numberToWords(invoice.totalAmount)}</div>
            <div className="font-bold">Settled by - Bank : {formatCurrency(invoice.paidAmount || 0, invoice.currency)} | Invoice Balance : {formatCurrency(invoice.totalAmount - (invoice.paidAmount || 0), invoice.currency)}</div>
            {invoice.taxAmount > 0 && (
                <div className="text-[10px]">
                    Total Tax Applied: {formatCurrency(invoice.taxAmount, invoice.currency)}
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="border-t border-black grid grid-cols-[1fr_1fr_150px] min-h-[120px]">
            <div className="border-r border-black p-2 flex flex-col gap-1">
                <span className="font-bold text-sm">Terms and Conditions</span>
                {organization?.profile?.termsAndConditions ? (
                    <span className="whitespace-pre-wrap">{organization.profile.termsAndConditions}</span>
                ) : (
                    <>
                        <span>E & O.E</span>
                        <span>1. Goods once sold will not be taken back.</span>
                        <span>2. Interest @ 18% p.a. will be charged if the payment for {organization?.name || "Company Name"} is not made within the stipulated time.</span>
                        <span>3. Subject to '{organization?.profile?.region || "Delhi"}' Jurisdiction only.</span>
                    </>
                )}
            </div>
            
            <div className="border-r border-black p-2 flex flex-col justify-between">
                {organization?.profile?.accountNumber && (
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm mb-1">Bank Details</span>
                        <span className="font-bold">Account Number: <span className="font-normal">{organization.profile.accountNumber}</span></span>
                        {organization.profile.bankName && <span className="font-bold">Bank: <span className="font-normal">{organization.profile.bankName}</span></span>}
                        {organization.profile.routingNumber && <span className="font-bold">{masterCurrency === "INR" ? "IFSC" : "Routing No"}: <span className="font-normal">{organization.profile.routingNumber}</span></span>}
                        {organization.profile.branch && <span className="font-bold">Branch: <span className="font-normal">{organization.profile.branch}</span></span>}
                        <span className="font-bold">Name: <span className="font-normal">{organization?.name}</span></span>
                    </div>
                )}
            </div>

            <div className="p-2 flex flex-col justify-between items-end text-right">
                <span className="font-bold">For {organization?.name || "Company Name"}</span>
                <span className="font-bold mt-16">Signature</span>
            </div>
        </div>

      </div>
      
      <div className="mt-4">
        <SosekiBranding monochrome={true} />
      </div>
    </div>
  );
}
