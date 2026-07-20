"use client";

import { useEffect, useState, use } from "react";
import API from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";

export default function ClientPortalProject({ params }) {
  const { clientId, projectId } = use(params);

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get(`/portal/client/${clientId}/projects/${projectId}`)
      .then(res => {
        setProject(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [clientId, projectId]);

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500">Loading project...</div>;
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Project Not Found</h2>
        <p className="text-slate-500 max-w-md">
          The project you are looking for does not exist or you do not have permission to view it.
        </p>
        <Link href={`/c/${clientId}`} className="mt-6 text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link href={`/c/${clientId}`} className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <DynamicAvatar type="project" seed={project.title} size={64} className="shadow-lg border-2 border-background rounded-2xl" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">{project.title}</h1>
              <p className="text-slate-500">{project.organization.name}</p>
            </div>
          </div>
          <Badge variant={project.status === "Active" ? "default" : "secondary"} className="w-fit text-sm px-3 py-1">
            {project.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" /> Project Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project.description ? (
              <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap">
                {project.description}
              </div>
            ) : (
              <p className="text-slate-500 italic">No description provided for this project.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" /> Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-slate-500 mb-1">Start Date</div>
              <div className="font-medium text-slate-900">{format(new Date(project.startDate), "MMMM d, yyyy")}</div>
            </div>
            {project.estimatedEndDate && (
              <div>
                <div className="text-sm text-slate-500 mb-1">Estimated End Date</div>
                <div className="font-medium text-slate-900">{format(new Date(project.estimatedEndDate), "MMMM d, yyyy")}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-slate-500 mb-1">Created On</div>
              <div className="font-medium text-slate-900">{format(new Date(project.createdAt), "MMMM d, yyyy")}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
