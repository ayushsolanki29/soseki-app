import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useRouter } from "next/navigation";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";

export function ProjectsTable({ projects, isLoading }) {
  const router = useRouter();

  const getProjectStatusBadge = (status) => {
    switch(status) {
        case 'Planning': return 'outline';
        case 'Active': return 'default';
        case 'Completed': return 'secondary';
        case 'On Hold': return 'destructive';
        default: return 'outline';
    }
  }

  return (
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
            {isLoading ? (
                <SkeletonHelper type="table" columns={4} rows={3} />
            ) : projects?.length === 0 || !projects ? (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                        No projects found.
                    </TableCell>
                </TableRow>
            ) : (
                projects?.map((project) => (
                    <TableRow key={project.id} className="group cursor-pointer" onClick={() => router.push(`/dashboard/projects/${project.id}`)}>
                        <TableCell className="font-medium group-hover:text-primary transition-colors">
                            <div className="flex items-center gap-3">
                                <DynamicAvatar type="project" seed={project.title} size={32} />
                                <span>{project.title}</span>
                            </div>
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
  );
}
