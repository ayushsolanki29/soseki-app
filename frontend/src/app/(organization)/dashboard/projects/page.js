"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";
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
import { PlusIcon, EyeIcon, MoreHorizontalIcon, EditIcon, TrashIcon } from "lucide-react";
import API from "@/lib/api";
import { ProjectForm } from "@/components/forms/project-form";
import { toast } from "sonner";
import Link from "next/link";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("All");

  // Sheet State
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/projects", {
        params: { status: statusFilter }
      });
      setProjects(res.data.projects);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  const handleFormSuccess = () => {
    setIsSheetOpen(false);
    setEditingProject(null);
    fetchProjects();
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setIsSheetOpen(true);
    setMenuOpenId(null);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
    try {
      await API.delete(`/projects/${projectId}`);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
    setMenuOpenId(null);
  };

  const getStatusClasses = (status, estimatedEndDate) => {
    let displayStatus = status;
    if (status !== 'Completed' && status !== 'Cancelled' && status !== 'Draft') {
        if (estimatedEndDate && new Date(estimatedEndDate) < new Date()) {
            displayStatus = 'Overdue';
        }
    }
    
    const isGood = displayStatus === "Active" || displayStatus === "In Progress";
    const isWarning = displayStatus === "Planning" || displayStatus === "Review";
    const isBad = displayStatus === "Overdue" || displayStatus === "Cancelled" || displayStatus === "On Hold";
    
    return {
        text: displayStatus,
        classes: cn(
            "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
            isGood ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
            isBad ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400" :
            isWarning ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
            "bg-muted text-muted-foreground"
        )
    };
  }

  return (
    <div className="p-8 h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your projects and their timelines.</p>
        </div>
        <Button onClick={() => { setEditingProject(null); setIsSheetOpen(true); }} className="gap-2">
          <PlusIcon className="size-4" />
          New Project
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
        <div className="w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden bg-card flex-1">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Project Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Est. End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonHelper type="table" columns={6} rows={5} />
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow 
                  key={project.id}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setMenuOpenId(project.id);
                  }}
                  className="group"
                >
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/projects/${project.id}`} className="flex items-center gap-3 transition-colors hover:text-primary group-hover:text-primary">
                        <DynamicAvatar type="project" seed={project.title} size={32} />
                        <span className="group-hover:underline underline-offset-4">{project.title}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{project.client?.name || "-"}</TableCell>
                  <TableCell>{formatDate(project.startDate)}</TableCell>
                  <TableCell>{project.estimatedEndDate ? formatDate(project.estimatedEndDate) : "-"}</TableCell>
                  <TableCell>
                    {(() => {
                      const badgeInfo = getStatusClasses(project.status, project.estimatedEndDate);
                      return (
                        <span className={badgeInfo.classes}>
                          {badgeInfo.text}
                        </span>
                      );
                    })()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu 
                      open={menuOpenId === project.id} 
                      onOpenChange={(isOpen) => setMenuOpenId(isOpen ? project.id : null)}
                    >
                      <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 outline-none">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem render={
                          <Link href={`/dashboard/projects/${project.id}`} className="flex items-center w-full cursor-pointer" />
                        }>
                            <EyeIcon className="size-4 mr-2" />
                            View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(project)}>
                          <EditIcon className="size-4 mr-2" />
                          Edit project
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteProject(project.id)} className="text-destructive focus:text-destructive">
                          <TrashIcon className="size-4 mr-2" />
                          Delete project
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

      {/* Create / Edit Project Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-l flex flex-col h-full bg-background overflow-y-hidden p-0">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>{editingProject ? "Edit Project" : "Add New Project"}</SheetTitle>
            <SheetDescription>
              {editingProject ? "Update project details and timeline." : "Create a new project for a specific client."}
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6">
            <ProjectForm 
              initialData={editingProject}
              key={editingProject?.id || "new"}
              onSuccess={handleFormSuccess} 
              onCancel={() => setIsSheetOpen(false)} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
