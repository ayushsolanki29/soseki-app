"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon, TrashIcon, MailIcon, PhoneIcon, BriefcaseIcon, FileTextIcon, DollarSignIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
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
import { ClientForm } from "@/components/forms/client-form";
import Link from "next/link";

export default function ClientDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const fetchClient = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/clients/${id}`);
      setClient(res.data.client);
    } catch (error) {
      toast.error("Failed to load client details");
      router.push("/dashboard/clients");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to soft delete this client?")) return;
    try {
      await API.patch(`/clients/${id}`, { status: "Inactive" });
      toast.success("Client marked as inactive");
      router.push("/dashboard/clients");
    } catch (error) {
      toast.error("Failed to update client status");
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading client details...</div>;
  }

  if (!client) {
    return null;
  }

  const getStatusBadge = (status) => {
    switch(status) {
        case 'Active': return 'default';
        case 'Lead': return 'secondary';
        case 'Inactive': return 'destructive';
        default: return 'outline';
    }
  }

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

  const getProjectStatusBadge = (status) => {
    switch(status) {
        case 'Planning': return 'outline';
        case 'Active': return 'default';
        case 'Completed': return 'secondary';
        case 'On Hold': return 'destructive';
        default: return 'outline';
    }
  }

  const calculateTotalPaid = (payments) => {
    return payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  };

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/clients")}>
          <ArrowLeftIcon className="size-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <DynamicAvatar type="client" seed={client.name} size={56} className="shadow-sm" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
                <Badge variant={getStatusBadge(client.status)} className="text-sm">
                  {client.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5">
                    <MailIcon className="size-4" />
                    {client.email}
                </div>
                {client.phone && (
                    <div className="flex items-center gap-1.5">
                        <PhoneIcon className="size-4" />
                        {client.phone}
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setIsEditSheetOpen(true)}>
                <PencilIcon className="size-4 mr-2" />
                Edit Client
            </Button>
            {client.status !== 'Inactive' && (
                <Button variant="destructive" onClick={handleDelete}>
                    <TrashIcon className="size-4 mr-2" />
                    Delete
                </Button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Projects Section */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <BriefcaseIcon className="size-5 text-primary" />
                    Projects
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md overflow-hidden bg-card">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Project Title</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>Est. End Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {client.projects?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        No projects found for this client.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                client.projects?.map((project) => (
                                    <TableRow key={project.id} className="group cursor-pointer" onClick={() => router.push(`/dashboard/projects/${project.id}`)}>
                                        <TableCell className="font-medium group-hover:text-primary transition-colors">
                                            {project.title}
                                        </TableCell>
                                        <TableCell>{formatDate(project.startDate)}</TableCell>
                                        <TableCell>{project.estimatedEndDate ? formatDate(project.estimatedEndDate) : "-"}</TableCell>
                                        <TableCell>
                                            <Badge variant={getProjectStatusBadge(project.status)}>
                                                {project.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        {/* Invoices & Payments Section */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="size-5 text-primary" />
                    Invoices & Payments
                </CardTitle>
            </CardHeader>
            <CardContent>
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
                            {client.invoices?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                        No invoices found for this client.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                client.invoices?.map((invoice) => {
                                    const totalPaid = calculateTotalPaid(invoice.payments);
                                    return (
                                    <TableRow key={invoice.id} className="group cursor-pointer" onClick={() => router.push(`/dashboard/invoices/${invoice.id}`)}>
                                        <TableCell className="font-medium group-hover:text-primary transition-colors">
                                            {invoice.invoiceNumber}
                                        </TableCell>
                                        <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                                        <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                                        <TableCell className="text-right font-medium">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(invoice.totalAmount)}
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(totalPaid)}
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
            </CardContent>
        </Card>

      </div>

      {/* Edit Client Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-l flex flex-col h-full bg-background overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Client</SheetTitle>
            <SheetDescription>
              Update client details and status.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 mt-4">
            <ClientForm 
              initialData={client}
              onSuccess={() => {
                setIsEditSheetOpen(false);
                fetchClient();
              }} 
              onCancel={() => setIsEditSheetOpen(false)} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
