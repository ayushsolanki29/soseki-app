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
import { ReceiptIcon, PlusIcon, Edit, Trash2, EyeIcon, TrendingDown, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import API from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { RecordExpenseDialog } from "@/components/expenses/record-expense-dialog";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useRouter, useSearchParams } from "next/navigation";
import { useOrganization } from "@/components/providers/organization-provider";

export default function ExpensesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { organization } = useOrganization();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    thisMonthExpenses: 0,
    topCategory: "-"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRecordExpenseOpen, setIsRecordExpenseOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data.expenses || []);
      if (res.data.summary) {
        setSummary(res.data.summary);
      }
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

  const handleOpenPreview = (expenseId) => {
    const width = 800;
    const height = 1000;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
        `/dashboard/expenses/${expenseId}/preview`, 
        'ExpensePreview', 
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="border rounded-xl bg-card p-6 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingDown className="size-4" />
            <p className="text-sm font-medium">Total Expenses</p>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(summary.totalExpenses, organization?.masterCurrency || "USD")}</p>
        </div>
        <div className="border rounded-xl bg-card p-6 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Calendar className="size-4" />
            <p className="text-sm font-medium">This Month</p>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(summary.thisMonthExpenses, organization?.masterCurrency || "USD")}</p>
        </div>
        <div className="border rounded-xl bg-card p-6 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Tag className="size-4" />
            <p className="text-sm font-medium">Top Category</p>
          </div>
          <p className="text-3xl font-bold truncate" title={summary.topCategory}>{summary.topCategory}</p>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Linked To</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonHelper type="table" columns={7} rows={5} />
            ) : expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-[300px] text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <ReceiptIcon className="size-12 text-muted-foreground/30" />
                        <h3 className="font-semibold text-lg text-foreground">No expenses yet</h3>
                        <p>Record your first expense to start tracking outgoing costs.</p>
                        <Button onClick={() => { setExpenseToEdit(null); setIsRecordExpenseOpen(true); }} className="mt-4">
                            Record Expense
                        </Button>
                    </div>
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
                    {expense.invoice ? (
                      <Link href={`/dashboard/invoices/${expense.invoiceId}`} className="flex items-center gap-3 hover:underline">
                        <DynamicAvatar type="invoice" seed={expense.invoice.invoiceNumber} size={28} />
                        {expense.invoice.invoiceNumber}
                      </Link>
                    ) : expense.project ? (
                      <div className="flex items-center gap-3">
                        <DynamicAvatar type="project" seed={expense.project.title} size={28} />
                        {expense.project.title}
                      </div>
                    ) : expense.client ? (
                      <Link href={`/dashboard/clients/${expense.clientId}`} className="flex items-center gap-3 hover:underline">
                        <DynamicAvatar type="client" seed={expense.client.name} size={28} />
                        {expense.client.name}
                      </Link>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium text-destructive">
                    <div className="flex flex-col items-end gap-1">
                      <span>-{formatCurrency(expense.amount, expense.currency || organization?.masterCurrency || "USD")}</span>
                      {(expense.currency && organization?.masterCurrency && expense.currency !== organization.masterCurrency) && (
                        <span className="text-xs text-muted-foreground font-normal">
                          -{formatCurrency(expense.amount * (expense.exchangeRate || 1.0), organization.masterCurrency)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenPreview(expense.id)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
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
    </div>
  );
}
