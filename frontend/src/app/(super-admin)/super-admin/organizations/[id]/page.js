import { serverFetch } from "@/lib/server-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Users, FileText, Briefcase, Receipt, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { OrgActions } from "./org-actions";
import { formatDate } from "@/lib/utils";

export default async function OrganizationDetailsPage({ params }) {
  const { id } = await params;
  
  let org = null;
  try {
    const data = await serverFetch(`/super-admin/organizations/${id}`);
    org = data.organization;
  } catch (error) {
    if (error.status === 404) notFound();
    console.error("Failed to fetch organization:", error);
  }

  if (!org) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/super-admin/organizations" className="hover:text-primary flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Organizations
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <DynamicAvatar type="organization" seed={org.id} size={64} className="rounded-full shadow-sm" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{org.name}</h1>
              {org.status === "Blocked" ? (
                <Badge variant="destructive">Blocked</Badge>
              ) : (
                <Badge variant="secondary">Active</Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              Created on {formatDate(org.createdAt)} &middot; {org.masterCurrency}
            </p>
          </div>
        </div>
        <OrgActions org={org} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org._count.users}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org._count.clients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org._count.projects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org._count.invoices}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: org.masterCurrency || 'USD' }).format(org.totalEarnings || 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Settings</CardTitle>
            <CardDescription>Default preferences configured for this organization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground block">Address</span>
              <span>{org.address || "Not set"}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground block">Date Format</span>
              <span>{org.dateFormat}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground block">Invoice Footer Note</span>
              <span>{org.invoiceFooterNote || "Not set"}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground block">Expense Footer Note</span>
              <span>{org.expenseFooterNote || "Not set"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organization Users</CardTitle>
            <CardDescription>Members belonging to this organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {org.users.map(user => (
                <div key={user.id} className="flex items-center gap-3">
                  <DynamicAvatar type="user" seed={user.name || user.email} size={32} />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium text-sm">{user.name || "Unnamed User"}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Joined {formatDate(user.createdAt)}
                  </div>
                </div>
              ))}
              {org.users.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-4">No users found.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
