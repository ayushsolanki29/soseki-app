"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { InvoiceForm } from "@/components/forms/invoice-form";

export default function NewInvoicePage() {
  return (
    <div className="p-8 w-full h-full flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" render={<Link href="/dashboard/invoices" />}>
            <ArrowLeftIcon className="size-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Invoice</h1>
          <p className="text-muted-foreground mt-2">Create a new invoice and send it to your client.</p>
        </div>
      </div>
      
      <InvoiceForm />
    </div>
  );
}
