"use client";

import { useEffect, useState, use, useContext } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ExternalLink, User, Mail, Phone, MapPin, Building, ArrowRight, FileText } from "lucide-react";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { ClientPortalContext } from "./layout";

export default function ClientPortalDashboard({ params }) {
  const { clientId } = use(params);
  const router = useRouter();
  const { profile, isProfileLoading, profileError } = useContext(ClientPortalContext);

  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      API.get(`/portal/client/${clientId}/projects`),
      API.get(`/portal/client/${clientId}/invoices`),
    ])
      .then(([projectsRes, invoicesRes]) => {
        setProjects(projectsRes.data.data);
        setInvoices(invoicesRes.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [clientId]);

  if (isLoading || isProfileLoading) {
    return <div className="py-20 text-center text-slate-500">Loading portal...</div>;
  }

  if (error || profileError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Portal Access Error</h2>
        <p className="text-slate-500 max-w-md">
          We could not load your client portal. The link may be invalid or you may not have access.
        </p>
      </div>
    );
  }

  if (!profile) return null;

  const activeProjects = projects.filter(p => p.status === "Active" || p.status === "Planning");
  const otherProjects = projects.filter(p => p.status !== "Active" && p.status !== "Planning");

  return (
    <div className="space-y-12 pb-12 relative z-10">
      {/* Background Effect (similar to questionnaire) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center flex flex-col items-center pt-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          {profile.organization?.name && (
            <DynamicAvatar type="organization" seed={profile.organization.name} size={64} className="shadow-lg border-2 border-background" />
          )}
          <p className="text-xs font-bold tracking-widest text-primary uppercase">
            {profile.organization?.name}
          </p>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Welcome, {profile.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Here is an overview of your projects and invoices with {profile.organization.name}.
        </p>
      </div>

      {/* Profile Details */}
      <div className="mt-8">
        <Card className="border-border/40 shadow-xl shadow-black/5 rounded-3xl bg-card/60 backdrop-blur-md overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/40">
              {/* Client Info */}
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Your Profile</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground group">
                    <div className="p-2 bg-background rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground/80">{profile.email}</span>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center gap-4 text-muted-foreground group">
                      <div className="p-2 bg-background rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground/80">{profile.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Org Info */}
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Organization Contact</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground">
                     <span className="font-semibold text-foreground tracking-tight">{profile.organization.name}</span>
                  </div>
                  {profile.organization.profile?.email && (
                    <div className="flex items-center gap-4 text-muted-foreground group">
                      <div className="p-2 bg-background rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground/80">{profile.organization.profile.email}</span>
                    </div>
                  )}
                  {profile.organization.profile?.phone && (
                    <div className="flex items-center gap-4 text-muted-foreground group">
                      <div className="p-2 bg-background rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground/80">{profile.organization.profile.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects (Priority) */}
      {activeProjects.length > 0 && (
        <div id="projects" className="space-y-4 scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project) => (
              <Card 
                key={project.id} 
                onClick={() => router.push(`/c/${clientId}/p/${project.id}`)}
                className="flex flex-col border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3 mb-2">
                    <DynamicAvatar type="project" seed={project.title} size={40} className="rounded-xl shadow-sm border border-border/50" />
                    <Badge variant={project.status === "Active" ? "default" : "secondary"} className="ml-auto">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base line-clamp-2 leading-tight">
                      {project.title}
                    </CardTitle>
                  </div>
                  {project.description && (
                    <CardDescription className="line-clamp-2 mt-2">
                      {project.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="text-sm text-slate-500 mt-auto pb-4">
                  Started: {format(new Date(project.startDate), "MMM d, yyyy")}
                </CardContent>
                <CardFooter className="pt-0 border-t border-slate-100 p-4 mt-auto">
                  <Button variant="ghost" size="sm" className="w-full justify-between" render={<Link href={`/c/${clientId}/p/${project.id}`} />}>
                      View Details <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Invoices */}
      <div id="invoices" className="space-y-4 scroll-mt-24">
        <h2 className="text-xl font-semibold text-slate-900">Invoices</h2>
        {invoices.length === 0 ? (
          <Card className="bg-slate-50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10 text-slate-500">
              <FileText className="h-10 w-10 text-slate-300 mb-4" />
              <p>No invoices available.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/40 shadow-xl shadow-black/5 bg-card/60 backdrop-blur-md overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Invoice Number</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Due Date</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Amount</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {invoices.map((invoice) => (
                    <tr 
                      key={invoice.id} 
                      onClick={() => router.push(`/c/${clientId}/i/${invoice.id}`)}
                      className="group hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-medium text-foreground flex items-center gap-3">
                        <DynamicAvatar type="invoice" seed={invoice.invoiceNumber} size={32} className="rounded-lg shadow-sm" />
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={invoice.status === "Paid" ? "success" : invoice.status === "Overdue" ? "destructive" : "secondary"} className="shadow-sm">
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {invoice.status === "Paid" || invoice.paidAmount >= invoice.totalAmount ? (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-muted-foreground line-through text-xs">
                              {invoice.currency} {invoice.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <Badge variant="success" className="h-5 px-1.5 text-[10px] uppercase shadow-none border-none bg-emerald-500/15">Fully Paid</Badge>
                          </div>
                        ) : (
                          <div className="flex flex-col items-end gap-0.5">
                            <span className="font-semibold text-foreground">
                              {invoice.currency} {invoice.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-xs font-medium text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded-sm">
                              Pending: {invoice.currency} {(invoice.totalAmount - (invoice.paidAmount || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0" render={<Link href={`/c/${clientId}/i/${invoice.id}`} />}>
                            View <ExternalLink className="h-3 w-3 ml-1.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="space-y-4 pt-8">
          <h2 className="text-lg font-semibold text-slate-700">Past & Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card 
                key={project.id} 
                onClick={() => router.push(`/c/${clientId}/p/${project.id}`)}
                className="flex flex-col border-slate-200 shadow-sm bg-slate-50/50 hover:bg-slate-50 hover:border-primary/30 transition-all cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3 mb-2">
                    <DynamicAvatar type="project" seed={project.title} size={32} className="rounded-lg shadow-sm border border-border/50 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                    <Badge variant="outline" className="bg-white ml-auto">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base text-slate-700 line-clamp-2 leading-tight">
                      {project.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2 p-4 mt-auto">
                  <Button variant="link" size="sm" className="px-0 text-slate-500 hover:text-slate-900" render={<Link href={`/c/${clientId}/p/${project.id}`} />}>
                      View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
