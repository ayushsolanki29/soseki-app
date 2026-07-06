import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useRouter } from "next/navigation";

export function InvoicesTable({ invoices, isLoading }) {
  const router = useRouter();

  const getInvoiceStatusBadge = (status) => {
    switch(status) {
        case 'Paid': return 'default';
        case 'Draft': return 'outline';
        case 'Sent': return 'secondary';
        case 'Overdue': return 'destructive';
        case 'Partially Paid': return 'outline';
        default: return 'outline';
    }
  }

  const calculateTotalPaid = (payments) => {
    return payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  };

  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/50">
            <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="text-right">Paid Amount</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {isLoading ? (
                <SkeletonHelper type="table" columns={6} rows={3} />
            ) : invoices?.length === 0 || !invoices ? (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                        No invoices found.
                    </TableCell>
                </TableRow>
            ) : (
                invoices?.map((invoice) => {
                    const totalPaid = calculateTotalPaid(invoice.payments);
                    return (
                    <TableRow key={invoice.id} className="group cursor-pointer" onClick={() => router.push(`/dashboard/invoices/${invoice.id}`)}>
                        <TableCell className="font-medium group-hover:text-primary transition-colors">
                            {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                        <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                        <TableCell className="text-right font-medium">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency || 'USD' }).format(invoice.totalAmount)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency || 'USD' }).format(totalPaid)}
                        </TableCell>
                        <TableCell>
                            <Badge variant={getInvoiceStatusBadge(invoice.status)}>
                                {invoice.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                )})
            )}
        </TableBody>
      </Table>
    </div>
  );
}
