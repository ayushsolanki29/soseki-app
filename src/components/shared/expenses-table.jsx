import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useRouter } from "next/navigation";

export function ExpensesTable({ expenses, isLoading, masterCurrency }) {
  const router = useRouter();

  const getExpenseStatusBadge = (status) => {
    switch(status) {
        case 'Pending': return 'outline';
        case 'Approved': return 'default';
        case 'Rejected': return 'destructive';
        case 'Paid': return 'secondary';
        default: return 'outline';
    }
  }

  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/50">
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {isLoading ? (
                <SkeletonHelper type="table" columns={5} rows={3} />
            ) : expenses?.length === 0 || !expenses ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                        No expenses found.
                    </TableCell>
                </TableRow>
            ) : (
                expenses?.map((expense) => (
                    <TableRow key={expense.id} className="group cursor-pointer" onClick={() => router.push(`/dashboard/expenses?receipt=${expense.id}`)}>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>{expense.category?.name || "-"}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{expense.description || "-"}</TableCell>
                        <TableCell className="text-right">
                            <div className="font-medium">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: expense.currency || 'USD' }).format(expense.amount)}
                            </div>
                            {masterCurrency && expense.currency && expense.currency !== masterCurrency && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: masterCurrency }).format(expense.amount * (expense.exchangeRate || 1.0))}
                                </div>
                            )}
                        </TableCell>
                        <TableCell>
                            <Badge variant={getExpenseStatusBadge(expense.status)}>
                                {expense.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
      </Table>
    </div>
  );
}
