"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";
import { SosekiModernExpense } from "@/components/expenses/templates/soseki-modern";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { DocumentSettingsDialog } from "@/components/shared/document-settings-dialog";
import { useOrganization } from "@/components/providers/organization-provider";

export default function ExpensePreviewPage() {
  const { id } = useParams();
  const { organization, refetch } = useOrganization();
  const [expense, setExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await API.get(`/expenses/${id}`);
        setExpense(res.data.expense);
        
        // Setup print styles and document title
        document.title = `Expense - ${res.data.expense.id.slice(0,6).toUpperCase()}`;
        document.body.classList.add("bg-muted");
        
      } catch (error) {
        console.error("Failed to load expense details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpense();

    return () => {
        document.body.classList.remove("bg-muted");
    };
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading preview...</div>;
  }

  if (!expense) {
    return <div className="p-8 text-center text-destructive">Expense not found.</div>;
  }

  const template = organization?.profile?.expenseTemplate || "soseki-modern";

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
            <span className="font-semibold text-sm">Expense Receipt</span>
          </div>
          <div className="flex items-center gap-3">
            <DocumentSettingsDialog 
                organization={organization} 
                onOrganizationUpdate={() => refetch()} 
                documentType="expense"
                masterCurrency={expense?.currency || "INR"}
            />
            <Button size="sm" onClick={() => window.print()} className="gap-2 h-8 text-xs">
                <PrinterIcon className="size-3" />
                Print / Save PDF
            </Button>
          </div>
      </div>

      <div className="min-h-screen py-8 print:py-0 print:bg-white flex justify-center">
        <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none print:m-0 mx-auto overflow-hidden">
          {template === "soseki-modern" && (
              <SosekiModernExpense expense={expense} organization={organization} />
          )}
        </div>
      </div>
    </>
  );
}
