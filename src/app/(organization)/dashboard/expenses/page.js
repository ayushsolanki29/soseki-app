"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ReceiptIcon, FileTextIcon, UserIcon, PlusIcon, MoreHorizontal, Edit, Trash2, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import API from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { RecordExpenseDialog } from "@/components/expenses/record-expense-dialog";
import { ExpenseReceiptDialog } from "@/components/expenses/expense-receipt-dialog";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useRouter, useSearchParams } from "next/navigation";

export default function ExpensesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecordExpenseOpen, setIsRecordExpenseOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [expenseToPreview, setExpenseToPreview] = useState(null);

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const [res, orgRes] = await Promise.all([
        API.get("/expenses"),
        API.get("/organization")
      ]);
      setExpenses(res.data.expenses || []);
      setOrganization(orgRes.data.organization);
    } catch (error) {
      toast.error("Failed to load expenses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      await API.delete(`/expenses/${id}`);
      toast.success("Expense deleted successfully");
      fetchExpenses();
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const receiptId = searchParams.get('receipt');
    if (receiptId && expenses.length > 0) {
      const expense = expenses.find(e => e.id === receiptId);
      if (expense) {
        setExpenseToPreview(expense);
        setIsReceiptOpen(true);
      }
    }
  }, [searchParams, expenses]);

  return (
    <div className="p-8 w-full h-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground mt-2">Manage and view all outgoing expenses.</p>
        </div>
        <div>
          <Button onClick={() => { setExpenseToEdit(null); setIsRecordExpenseOpen(true); }} className="gap-2">
            <PlusIcon className="size-4" />
            Record Expense
          </Button>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Linked Client</TableHead>
              <TableHead>Linked Invoice</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonHelper type="table" columns={7} rows={5} />
            ) : expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  <ReceiptIcon className="mx-auto size-12 mb-4 opacity-20" />
                  No expenses found.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    {formatDate(expense.date)}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <DynamicAvatar type="expense" seed={expense.description} size={32} />
                      {expense.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    {expense.category}
                  </TableCell>
                  <TableCell>
                    {expense.client ? (
                      <div className="flex items-center gap-3">
                        <DynamicAvatar type="client" seed={expense.client.name} size={28} />
                        {expense.client.name}
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {expense.invoice ? (
                      <Link href={`/dashboard/invoices/${expense.invoiceId}`} className="flex items-center gap-3 hover:underline">
                        <DynamicAvatar type="invoice" seed={expense.invoice.invoiceNumber} size={28} />
                        {expense.invoice.invoiceNumber}
                      </Link>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium text-destructive">
                    -{formatCurrency(expense.amount, expense.currency || expense.invoice?.currency || organization?.masterCurrency || "USD")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setExpenseToPreview(expense); setIsReceiptOpen(true); }} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { setExpenseToEdit(expense); setIsRecordExpenseOpen(true); }} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteExpense(expense.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <RecordExpenseDialog 
        open={isRecordExpenseOpen} 
        onOpenChange={setIsRecordExpenseOpen} 
        onSuccess={fetchExpenses} 
        expenseToEdit={expenseToEdit}
      />
      
      <ExpenseReceiptDialog
        open={isReceiptOpen}
        onOpenChange={(open) => {
            setIsReceiptOpen(open);
            if (!open && searchParams.get('receipt')) {
                router.replace('/dashboard/expenses');
            }
        }}
        expense={expenseToPreview}
        organization={organization}
      />
    </div>
  );
}
