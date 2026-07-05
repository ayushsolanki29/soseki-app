"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { InvoiceForm } from "@/components/forms/invoice-form";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";
import { toast } from "sonner";

export default function EditInvoicePage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await API.get(`/invoices/${id}`);
        setInvoice(res.data.invoice);
      } catch (error) {
        toast.error("Failed to load invoice for editing");
        router.push("/dashboard/invoices");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoice();
  }, [id, router]);

  if (isLoading) {
    return <div className="p-8">Loading invoice details...</div>;
  }

  if (!invoice) {
    return <div className="p-8">Invoice not found.</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto h-full flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" render={<Link href={`/dashboard/invoices/${id}`} />}>
            <ArrowLeftIcon className="size-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Invoice</h1>
          <p className="text-muted-foreground mt-2">Update the details of {invoice.invoiceNumber}.</p>
        </div>
      </div>
      
      <InvoiceForm initialData={invoice} />
    </div>
  );
}
