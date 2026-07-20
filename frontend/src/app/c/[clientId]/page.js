import { serverFetch } from "@/lib/server-api";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ExternalLink, User, Mail, Phone, MapPin, Building, ArrowRight } from "lucide-react";

export default async function ClientPortalDashboard({ params }) {
  const { clientId } = await params;

  let profile = null;
  let projects = [];
  let invoices = [];

  try {
    const [profileRes, projectsRes, invoicesRes] = await Promise.all([
      serverFetch(`/portal/client/${clientId}`),
      serverFetch(`/portal/client/${clientId}/projects`),
      serverFetch(`/portal/client/${clientId}/invoices`),
    ]);
    profile = profileRes.data;
    projects = projectsRes.data;
    invoices = invoicesRes.data;
  } catch (error) {
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
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Welcome, {profile.name}
        </h1>
        <p className="text-slate-500 text-lg">
          Here is an overview of your projects and invoices with {profile.organization.name}.
        </p>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-slate-400" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>{profile.email}</span>
            </div>
            {profile.phone && (
              <div className="flex items-center gap-3 text-slate-700">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{profile.phone}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-slate-400" />
              Organization Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="font-medium text-slate-900 mb-1">{profile.organization.name}</div>
            {profile.organization.profile?.email && (
              <div className="flex items-center gap-3 text-slate-700 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{profile.organization.profile.email}</span>
              </div>
            )}
            {profile.organization.profile?.phone && (
              <div className="flex items-center gap-3 text-slate-700 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{profile.organization.profile.phone}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Projects (Priority) */}
      {activeProjects.length > 0 && (
        <div id="projects" className="space-y-4 scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project) => (
              <Card key={project.id} className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base line-clamp-2 leading-tight">
                      {project.title}
                    </CardTitle>
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
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
                  <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
                    <Link href={`/c/${clientId}/p/${project.id}`}>
                      View Details <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
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
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">Invoice Number</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Due Date</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                    <th className="px-6 py-4 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={invoice.status === "Paid" ? "success" : invoice.status === "Overdue" ? "destructive" : "secondary"}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900">
                        {invoice.currency} {invoice.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/c/${clientId}/i/${invoice.id}`}>
                            View <ExternalLink className="h-3 w-3 ml-1.5" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="space-y-4 pt-8">
          <h2 className="text-lg font-semibold text-slate-700">Past & Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card key={project.id} className="flex flex-col border-slate-200 shadow-sm bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base text-slate-700 line-clamp-2 leading-tight">
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className="bg-white">
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2 p-4 mt-auto">
                  <Button variant="link" size="sm" className="px-0 text-slate-500 hover:text-slate-900" asChild>
                    <Link href={`/c/${clientId}/p/${project.id}`}>
                      View Details
                    </Link>
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
