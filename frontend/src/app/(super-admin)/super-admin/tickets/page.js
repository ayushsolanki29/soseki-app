import { serverFetch } from "@/lib/server-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { formatDate, formatId } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SuperAdminTicketsPage() {
  let tickets = [];
  try {
    const data = await serverFetch("/super-admin/tickets");
    tickets = data.tickets || [];
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground mt-2">
          Manage all support tickets from organizations across the platform.
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Ticket ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  No support tickets found.
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">
                    {ticket.organization.name}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {formatId(ticket.id, "SPT")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 py-1">
                      <DynamicAvatar type="user" seed={ticket.user.name || ticket.user.email} size={24} />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{ticket.user.name}</span>
                        <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">{ticket.user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={ticket.title}>
                    {ticket.title}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      ticket.priority === 'High' ? 'bg-red-100 text-red-800' : 
                      ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(ticket.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/super-admin/tickets/${ticket.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
