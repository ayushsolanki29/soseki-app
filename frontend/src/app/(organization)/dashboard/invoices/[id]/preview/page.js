"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";
import { SosekiModernInvoice } from "@/components/invoices/templates/soseki-modern";
import { TaxInvoice } from "@/components/invoices/templates/tax-invoice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PrinterIcon, DownloadIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { generatePDF } from "@/lib/pdfHelper";
import { DocumentSettingsDialog } from "@/components/shared/document-settings-dialog";
import { useOrganization } from "@/components/providers/organization-provider";

export default function InvoicePreviewPage() {
  const { id } = useParams();
  const { organization, refetch } = useOrganization();
  const [invoice, setInvoice] = useState(null);
  const masterCurrency = organization?.masterCurrency || "USD";
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    const success = await generatePDF('invoice-print-area', `Invoice-${invoice.invoiceNumber}.pdf`);
    if (success) {
      toast.success('PDF downloaded successfully');
    } else {
      toast.error('Failed to generate PDF');
    }
    setIsGeneratingPdf(false);
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await API.get(`/invoices/${id}`);
        setInvoice(res.data.invoice);
        
        // Setup print styles and document title
        document.title = `Invoice - ${res.data.invoice.invoiceNumber}`;
        document.body.classList.add("bg-muted");
        
      } catch (error) {
        console.error("Failed to load invoice details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoice();

    return () => {
        document.body.classList.remove("bg-muted");
    };
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await API.patch(`/invoices/${id}`, { status: newStatus });
      setInvoice({ ...invoice, status: newStatus });
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading preview...</div>;
  }

  if (!invoice) {
    return <div className="p-8 text-center text-destructive">Invoice not found.</div>;
  }

  const template = organization?.profile?.invoiceTemplate || "soseki-modern";

  return (
    <>
      <style>{`
        body::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Control Header */}
      <div className="print:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm">Invoice Status:</span>
            <Select value={invoice.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[140px] h-8 text-xs font-medium">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Sent">Sent</SelectItem>
                    <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <DocumentSettingsDialog 
                organization={organization} 
                onOrganizationUpdate={() => refetch()} 
                documentType="invoice" 
                masterCurrency={invoice?.currency || "INR"}
            />
            <Button size="sm" variant="outline" onClick={() => window.print()} className="gap-2 h-8 text-xs">
                <PrinterIcon className="size-3" />
                Print
            </Button>
            <Button size="sm" onClick={handleDownloadPdf} disabled={isGeneratingPdf} className="gap-2 h-8 text-xs">
                {isGeneratingPdf ? <Loader2Icon className="size-3 animate-spin" /> : <DownloadIcon className="size-3" />}
                Download PDF
            </Button>
          </div>
      </div>

      <div className="min-h-screen py-8 print:py-0 print:bg-white flex justify-center">
        <div id="invoice-print-area" className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none print:m-0 mx-auto overflow-hidden">
          {template === "soseki-modern" && (
              <SosekiModernInvoice invoice={invoice} organization={organization} masterCurrency={masterCurrency} />
          )}
          {template === "tax-invoice" && (
              <TaxInvoice invoice={invoice} organization={organization} masterCurrency={masterCurrency} />
          )}
        </div>
      </div>
    </>
  );
}
