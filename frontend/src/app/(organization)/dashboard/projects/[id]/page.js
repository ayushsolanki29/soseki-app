"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, CalendarIcon, UserIcon, PencilIcon, TrashIcon, FileTextIcon, DollarSignIcon, LinkIcon, TrendingUp, TrendingDown } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import { formatDate, formatId, formatCurrency } from "@/lib/utils";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProjectForm } from "@/components/forms/project-form";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { InvoicesTable } from "@/components/shared/invoices-table";
import { ExpensesTable } from "@/components/shared/expenses-table";
import { PortalLinkWithSettings } from "@/components/shared/portal-link-with-settings";
import { useOrganization } from "@/components/providers/organization-provider";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const { organization, refetch: fetchOrganization } = useOrganization();

  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/projects/${id}`);
      setProject(res.data.project);
    } catch (error) {
      toast.error("Failed to load project details");
      router.push("/dashboard/projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted");
      router.push("/dashboard/projects");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const copyPortalLink = () => {
    if (!project?.clientId) return;
    const url = `${window.location.origin}/c/${project.clientId}/p/${project.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Project Portal Link copied to clipboard!");
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
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Skeleton className="h-9 w-28 rounded-md" />
             <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="pb-3">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Skeleton className="h-5 w-24" />
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-5 rounded-sm" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-5 rounded-sm" />
                  <div className="space-y-1.5 flex-1 bg-muted/50 p-3 rounded-md">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null; // or empty state
  }

  const getStatusBadge = (status) => {
    switch(status) {
        case 'Planning': return 'outline';
        case 'Active': return 'default';
        case 'Completed': return 'secondary';
        case 'On Hold': return 'destructive';
        default: return 'outline';
    }
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/projects")}>
          <ArrowLeftIcon className="size-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <DynamicAvatar type="project" seed={project.title} size={56} className="shadow-sm" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                <Badge variant={getStatusBadge(project.status)} className="text-sm">
                  {project.status}
                </Badge>
                <Badge variant="outline" className="text-sm font-mono text-muted-foreground border-dashed">
                  {formatId(project.id, "PRJ")}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">Project Details and Timeline</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <PortalLinkWithSettings 
                portalLink={`${window.location.origin}/c/${project.clientId}/p/${project.id}`}
                organization={organization}
                onOrganizationUpdate={fetchOrganization}
                documentType="invoice"
            />
            <Button variant="outline" onClick={() => setIsEditSheetOpen(true)}>
                <PencilIcon className="size-4 mr-2" />
                Edit Project
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
                <TrashIcon className="size-4 mr-2" />
                Delete
            </Button>
        </div>
      </div>

      {project.summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <TrendingUp className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(project.summary.totalEarnings, organization?.masterCurrency || "USD")}</div>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <TrendingDown className="size-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(project.summary.totalExpenses, organization?.masterCurrency || "USD")}</div>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <DollarSignIcon className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(project.summary.netProfit, organization?.masterCurrency || "USD")}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                    {project.description || "No description provided."}
                </div>
            </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Client Information</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Link href={`/dashboard/clients/${project.clientId}`} className="flex items-center gap-3 text-sm p-6 hover:bg-muted/50 transition-colors cursor-pointer rounded-b-xl">
                        <DynamicAvatar type="client" seed={project.client?.name} size={40} className="shadow-sm" />
                        <div>
                            <p className="font-medium group-hover:text-primary transition-colors">{project.client?.name}</p>
                            <p className="text-muted-foreground">{project.client?.email}</p>
                        </div>
                    </Link>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Timeline</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-sm">
                    <div className="flex items-center gap-3">
                        <CalendarIcon className="size-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-medium">{formatDate(project.startDate)}</p>
                        </div>
                    </div>
                    {project.estimatedEndDate && (
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="size-5 text-muted-foreground" />
                            <div className="bg-muted/50 p-3 rounded-md">
                                <p className="text-sm text-muted-foreground">Estimated End Date</p>
                                <p className="font-medium">{formatDate(project.estimatedEndDate)}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="size-5 text-primary" />
                    Invoices & Payments
                </CardTitle>
            </CardHeader>
            <CardContent>
                <InvoicesTable invoices={project.invoices} isLoading={false} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <DollarSignIcon className="size-5 text-primary" />
                    Expenses
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ExpensesTable expenses={project.expenses} isLoading={false} />
            </CardContent>
        </Card>
      </div>

      {/* Edit Project Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-l flex flex-col h-full bg-background overflow-y-hidden p-0">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>Edit Project</SheetTitle>
            <SheetDescription>
              Update project details and status.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6">
            <ProjectForm 
              initialData={project}
              onSuccess={() => {
                setIsEditSheetOpen(false);
                fetchProject();
              }} 
              onCancel={() => setIsEditSheetOpen(false)} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
