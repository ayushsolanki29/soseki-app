"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, CalendarIcon, UserIcon, PencilIcon, TrashIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProjectForm } from "@/components/forms/project-form";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

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

  if (isLoading) {
    return <div className="p-8">Loading project details...</div>;
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
    <div className="p-8 max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/projects")}>
          <ArrowLeftIcon className="size-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
            <Badge variant={getStatusBadge(project.status)} className="text-sm">
              {project.status}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">Project Details and Timeline</p>
        </div>
        <div className="flex items-center gap-3">
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
                <CardContent className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                        <UserIcon className="size-5" />
                    </div>
                    <div>
                        <p className="font-medium">{project.client?.name}</p>
                        <p className="text-muted-foreground">{project.client?.email}</p>
                    </div>
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
                            <p className="text-muted-foreground">Start Date</p>
                            <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    {project.estimatedEndDate && (
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="size-5 text-muted-foreground" />
                            <div>
                                <p className="text-muted-foreground">Estimated End Date</p>
                                <p className="font-medium">{new Date(project.estimatedEndDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
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
