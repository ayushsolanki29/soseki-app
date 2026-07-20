"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function UserAction({ user, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: user.name || "", email: user.email || "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.put(`/super-admin/users/${user.id}`, formData);
      toast.success("Success", { description: "User updated successfully." });
      setOpen(false);
      onUpdate();
    } catch (error) {
      toast.error("Error", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    setIsLoading(true);
    try {
      await API.delete(`/super-admin/users/${user.id}`);
      toast.success("Success", { description: "User deleted successfully." });
      setOpen(false);
      onUpdate();
    } catch (error) {
      toast.error("Error", { description: error.message });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm">Edit User</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user details or reset their password.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="grid gap-2">
              <Label>New Password (Optional)</Label>
              <Input type="password" placeholder="Leave blank to keep unchanged" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} minLength={6} />
            </div>
          </div>
          <DialogFooter className="flex justify-between items-center w-full">
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>Delete User</Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>Save Changes</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function SuperAdminOrganizationsPage() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganizations = async () => {
    try {
      const res = await API.get("/super-admin/organizations");
      setOrganizations(res.data.organizations || []);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <TableHead className="text-right">Actions</TableHead>
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
                      <div className="flex flex-col">
                        <span>{org.name}</span>
                        {org.status === "Blocked" && (
                          <Badge variant="destructive" className="w-fit mt-1 text-[10px]">Blocked</Badge>
                        )}
                      </div>
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
                  <TableCell className="text-right">
                    {org.isOrphanUser ? (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" disabled>
                          View Details
                        </Button>
                        <UserAction user={org.users[0]} onUpdate={fetchOrganizations} />
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" render={<Link href={`/super-admin/organizations/${org.id}`} />}>
                        View Details
                      </Button>
                    )}
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
