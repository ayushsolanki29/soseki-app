"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import { SearchIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon, EditIcon, TrashIcon, LinkIcon, CopyIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useRouter } from "next/navigation";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";

export default function QuestionnairesPage() {
  const router = useRouter();
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  
  // Filters & Pagination
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const limit = 10;

  const fetchQuestionnaires = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/questionnaires", {
        params: { query, status: statusFilter, page, limit }
      });
      setQuestionnaires(res.data.questionnaires);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error("Failed to load questionnaires");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchQuestionnaires();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, statusFilter, page]);

  const handleDelete = async (id, e) => {
    if (e) e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this questionnaire? All responses will be lost.")) return;
    setDeletingId(id);
    try {
      await API.delete(`/questionnaires/${id}`);
      toast.success("Questionnaire deleted successfully");
      fetchQuestionnaires();
    } catch (error) {
      toast.error("Failed to delete questionnaire");
    } finally {
      setDeletingId(null);
    }
  };

  const copyLink = (slug) => {
    const url = `${window.location.origin}/q/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="p-8 h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Questionnaires</h1>
          <p className="text-muted-foreground mt-2">Manage your forms, surveys, and question banks.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.push("/dashboard/questionnaires/import")} className="gap-2 bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary">
            <SparklesIcon className="size-4" />
            Import with AI
          </Button>
          <Button onClick={() => router.push("/dashboard/questionnaires/new")} className="gap-2">
            <PlusIcon className="size-4" />
            Create New
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input 
            placeholder="Search questionnaires..." 
            className="pl-9 h-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden bg-card flex-1">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Responses</TableHead>
              <TableHead className="text-right">Created On</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonHelper type="table" rows={5} columns={5} />
            ) : questionnaires.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No questionnaires found.
                </TableCell>
              </TableRow>
            ) : (
              questionnaires.map((q) => (
                <TableRow key={q.id} className="group">
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/questionnaires/${q.id}/responses`} className="flex items-center gap-3 transition-colors hover:text-primary group-hover:text-primary">
                      <DynamicAvatar type="questionnaire" seed={q.title} size={32} className="shadow-sm bg-accent/50" />
                      <span className="group-hover:underline underline-offset-4">{q.title}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={q.status === "Active" ? "default" : q.status === "Paused" ? "secondary" : "destructive"}>
                      {q.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {q.responseCount} {q.maxResponses ? `/ ${q.maxResponses}` : ""}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {formatDate(q.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 outline-none">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/questionnaires/${q.id}`)}>
                          <EditIcon className="size-4 mr-2" />
                          Edit Builder
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/questionnaires/${q.id}/responses`)}>
                          <LinkIcon className="size-4 mr-2" />
                          View Responses
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyLink(q.slug)}>
                          <CopyIcon className="size-4 mr-2" />
                          Copy Public Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => handleDelete(q.id, e)} className="text-destructive focus:text-destructive">
                          {deletingId === q.id ? <Loader2Icon className="size-4 mr-2 animate-spin" /> : <TrashIcon className="size-4 mr-2" />}
                          {deletingId === q.id ? "Deleting..." : "Delete"}
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {questionnaires.length} of {pagination.total} results
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeftIcon className="size-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm font-medium mx-2">
            Page {page} of {Math.max(1, pagination.totalPages)}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages || isLoading}
          >
            Next
            <ChevronRightIcon className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
