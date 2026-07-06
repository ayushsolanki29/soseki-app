import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { formatDate } from "@/lib/utils";

import { AddUserModal } from "@/components/add-user-modal";

export default async function SuperAdminOrganizationsPage() {
  const organizations = await prisma.organization.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          users: true,
          projects: true,
          clients: true,
          invoices: true,
        },
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground mt-2">
            Manage all registered organizations on the platform.
          </p>
        </div>
        <AddUserModal />
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Master Currency</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Clients</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Invoices</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  No organizations found.
                </TableCell>
              </TableRow>
            ) : (
              organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <DynamicAvatar type="organization" seed={org.id} size={32} />
                      {org.name}
                    </div>
                  </TableCell>
                  <TableCell>{org.masterCurrency}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2 py-1">
                      {org.users.map((u) => (
                        <div key={u.id} className="flex items-center gap-2">
                          <DynamicAvatar type="user" seed={u.name || u.email} size={24} />
                          <div className="flex flex-col">
                            <span className="text-xs font-medium">{u.name || "Unnamed"}</span>
                            <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">{u.email}</span>
                          </div>
                        </div>
                      ))}
                      {org.users.length === 0 && <span className="text-xs text-muted-foreground">No users</span>}
                    </div>
                  </TableCell>
                  <TableCell>{org._count.clients}</TableCell>
                  <TableCell>{org._count.projects}</TableCell>
                  <TableCell>{org._count.invoices}</TableCell>
                  <TableCell>{formatDate(org.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
