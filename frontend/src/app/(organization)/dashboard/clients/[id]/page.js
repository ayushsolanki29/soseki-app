"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon, TrashIcon, MailIcon, PhoneIcon, BriefcaseIcon, FileTextIcon, DollarSignIcon, LinkIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { formatId } from "@/lib/utils";
import { ProjectsTable } from "@/components/shared/projects-table";
import { InvoicesTable } from "@/components/shared/invoices-table";
import { ExpensesTable } from "@/components/shared/expenses-table";
import {
  Table,
  TableBody,
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
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { PortalLinkWithSettings } from "@/components/shared/portal-link-with-settings";

export default function ClientDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [masterCurrency, setMasterCurrency] = useState("USD");
  const [currentUser, setCurrentUser] = useState(null);
  const [organization, setOrganization] = useState(null);

  const fetchClient = async () => {
    setIsLoading(true);
    try {
      const [res, orgRes, userRes] = await Promise.all([
          API.get(`/clients/${id}`),
          API.get(`/organization`),
          API.get(`/auth/me`)
      ]);
      setClient(res.data.client);
      setMasterCurrency(orgRes.data.organization.masterCurrency);
      setOrganization(orgRes.data.organization);
      setCurrentUser(userRes.data.user);
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

  const copyPortalLink = () => {
    const url = `${window.location.origin}/c/${client.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Client Portal Link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="p-8 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="size-9 rounded-md" />
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <Skeleton className="size-14 rounded-full" />
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Skeleton className="h-9 w-28 rounded-md" />
             <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
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
                     <SkeletonHelper type="table" columns={4} rows={3} />
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
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
                     <SkeletonHelper type="table" columns={6} rows={3} />
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!client) {
    return null;
  }



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
                <Badge variant={client.status === 'Active' ? 'default' : client.status === 'Lead' ? 'secondary' : client.status === 'Inactive' ? 'destructive' : 'outline'} className="text-sm">
                  {client.status}
                </Badge>
                <Badge variant="outline" className="text-sm font-mono text-muted-foreground border-dashed">
                  {formatId(client.id, "CLI")}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1 text-muted-foreground text-sm">
                {client.email && (
                  <a 
                    href={`mailto:${client.email}?subject=Update regarding your account&body=${encodeURIComponent(`Hi ${client.name},\n\n\n\n---\nBest regards,\n${currentUser?.name || ''}\n${organization?.name || ''}`)}`}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                      <MailIcon className="size-4" />
                      {client.email}
                  </a>
                )}
                {client.phone && (
                    <a 
                      href={`tel:${client.phone}`}
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                        <PhoneIcon className="size-4" />
                        {client.phone}
                    </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <PortalLinkWithSettings 
                portalLink={`${window.location.origin}/c/${client.id}`}
                organization={organization}
                onOrganizationUpdate={() => fetchClient()}
                documentType="invoice"
                masterCurrency={masterCurrency}
            />
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
                <ProjectsTable projects={client.projects} isLoading={false} />
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
                <InvoicesTable invoices={client.invoices} isLoading={false} masterCurrency={masterCurrency} />
            </CardContent>
        </Card>

        {/* Expenses Section */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <DollarSignIcon className="size-5 text-primary" />
                    Expenses
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ExpensesTable expenses={client.expenses} isLoading={false} masterCurrency={masterCurrency} />
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
