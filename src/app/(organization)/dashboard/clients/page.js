"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon, EditIcon, TrashIcon, EyeIcon } from "lucide-react";
import API from "@/lib/api";
import { ClientForm } from "@/components/forms/client-form";
import { toast } from "sonner";
import Link from "next/link";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters & Pagination
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ActiveOrLead");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const limit = 10;

  // Sheet State
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/clients", {
        params: { query, status: statusFilter, page, limit }
      });
      setClients(res.data.clients);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error("Failed to load clients");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset to page 1 when query or filter changes
    setPage(1);
  }, [query, statusFilter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchClients();
    }, 300); // 300ms debounce for search

    return () => clearTimeout(delayDebounceFn);
  }, [query, statusFilter, page]);

  const handleFormSuccess = () => {
    setIsSheetOpen(false);
    setEditingClient(null);
    fetchClients();
  };

  const handleEditClick = (client) => {
    setEditingClient(client);
    setIsSheetOpen(true);
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await API.patch(`/clients/${clientId}`, { status: "Inactive" });
      toast.success("Client deleted successfully");
      fetchClients();
    } catch (error) {
      toast.error("Failed to delete client");
    }
  };

  return (
    <div className="p-8 h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-2">Manage your clients and organizations here.</p>
        </div>
        <Button onClick={() => { setEditingClient(null); setIsSheetOpen(true); }} className="gap-2">
          <PlusIcon className="size-4" />
          New Client
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
            className="pl-9 h-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ActiveOrLead">Active & Lead</SelectItem>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active Only</SelectItem>
              <SelectItem value="Lead">Lead Only</SelectItem>
              <SelectItem value="Inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden bg-card flex-1">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Added On</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  Loading clients...
                </TableCell>
              </TableRow>
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id} className="group">
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/clients/${client.id}`} className="flex items-center gap-3 transition-colors hover:text-primary group-hover:text-primary">
                        <DynamicAvatar type="client" seed={client.name} size={32} />
                        <span className="group-hover:underline underline-offset-4">{client.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "Active" ? "default" : client.status === "Lead" ? "secondary" : "outline"}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {formatDate(client.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 outline-none">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/clients/${client.id}`} className="flex items-center w-full cursor-pointer">
                            <EyeIcon className="size-4 mr-2" />
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(client)}>
                          <EditIcon className="size-4 mr-2" />
                          Edit client
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteClient(client.id)} className="text-destructive focus:text-destructive">
                          <TrashIcon className="size-4 mr-2" />
                          Delete client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {clients.length} of {pagination.total} results
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeftIcon className="size-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm font-medium mx-2">
            Page {page} of {Math.max(1, pagination.totalPages)}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages || isLoading}
          >
            Next
            <ChevronRightIcon className="size-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Create / Edit Client Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-l flex flex-col h-full bg-background overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingClient ? "Edit Client" : "Add New Client"}</SheetTitle>
            <SheetDescription>
              {editingClient ? "Update client details and status." : "Create a new client profile for your organization."}
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 mt-4">
            <ClientForm 
              initialData={editingClient}
              key={editingClient?.id || "new"}
              onSuccess={handleFormSuccess} 
              onCancel={() => setIsSheetOpen(false)} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
