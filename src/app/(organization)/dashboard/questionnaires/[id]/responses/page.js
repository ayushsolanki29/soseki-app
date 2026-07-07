"use client";

import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, ColumnsIcon, EyeIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { useRouter } from "next/navigation";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";

export default function QuestionnaireResponsesPage({ params }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [data, setData] = useState({ questionnaire: null, responses: [] });
  const [isLoading, setIsLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [visibleColumns, setVisibleColumns] = useState([]);
  const limit = 50;

  const fetchResponses = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/questionnaires/${unwrappedParams.id}/responses`, {
        params: { page, limit }
      });
      setData({
        questionnaire: res.data.questionnaire,
        responses: res.data.responses
      });
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error("Failed to load responses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [page, unwrappedParams.id]);

  useEffect(() => {
    if (data.questionnaire?.fields && visibleColumns.length === 0) {
      setVisibleColumns(data.questionnaire.fields.slice(0, 5).map(f => f.id));
    }
  }, [data.questionnaire]);

  const exportCSV = () => {
    if (!data.questionnaire || data.responses.length === 0) return;

    const fields = data.questionnaire.fields;
    const headers = ["Submitted At", ...fields.map(f => f.label)];
    
    const rows = data.responses.map(response => {
      const rowData = [new Date(response.createdAt).toLocaleString()];
      fields.forEach(field => {
        let answer = response.answers[field.id] || "";
        if (Array.isArray(answer)) {
          answer = answer.join("; ");
        }
        answer = `"${String(answer).replace(/"/g, '""')}"`;
        rowData.push(answer);
      });
      return rowData.join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${data.questionnaire.title}_responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading && !data.questionnaire) {
    return (
      <div className="p-8 h-full space-y-6">
        <SkeletonHelper type="dashboard" />
      </div>
    );
  }

  const { questionnaire, responses } = data;

  return (
    <div className="p-8 h-full flex flex-col gap-6 min-w-0">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/questionnaires")}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <div className="flex-1 flex items-center gap-4">
          {questionnaire && (
            <DynamicAvatar type="questionnaire" seed={questionnaire.title} size={48} className="shadow-sm bg-accent/50" />
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{questionnaire?.title}</h1>
            <p className="text-muted-foreground mt-1">Viewing all submitted responses.</p>
          </div>
        </div>
        
        {questionnaire && (
          <div className="flex items-center gap-3">
            <Select 
              value={questionnaire.status} 
              onValueChange={async (newStatus) => {
                const oldStatus = data.questionnaire.status;
                setData(prev => ({
                  ...prev,
                  questionnaire: { ...prev.questionnaire, status: newStatus }
                }));
                try {
                  await API.patch(`/questionnaires/${questionnaire.id}`, { status: newStatus });
                  toast.success(`Status updated to ${newStatus}`);
                } catch (err) {
                  setData(prev => ({
                    ...prev,
                    questionnaire: { ...prev.questionnaire, status: oldStatus }
                  }));
                  toast.error("Failed to update status");
                }
              }}
            >
              <SelectTrigger className={`w-[140px] font-medium ${
                questionnaire.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : 
                questionnaire.status === 'Paused' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' : 
                'text-red-600 border-red-200 bg-red-50'
              }`}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active" className="text-green-600">Active</SelectItem>
                <SelectItem value="Paused" className="text-yellow-600">Paused</SelectItem>
                <SelectItem value="Closed" className="text-red-600">Closed</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline" className="gap-2">
                  <ColumnsIcon className="size-4" />
                  Columns
                </Button>
              } />
              <DropdownMenuContent align="end" className="w-[250px] max-h-[300px] overflow-y-auto">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {questionnaire?.fields?.map(field => (
                  <DropdownMenuCheckboxItem
                    key={field.id}
                    checked={visibleColumns.includes(field.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setVisibleColumns([...visibleColumns, field.id]);
                      } else {
                        setVisibleColumns(visibleColumns.filter(id => id !== field.id));
                      }
                    }}
                  >
                    <span className="truncate">{field.label}</span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={exportCSV} variant="secondary" className="gap-2" disabled={responses.length === 0}>
              <DownloadIcon className="size-4" />
              Export CSV
            </Button>
          </div>
        )}
      </div>

      <div className="border rounded-md bg-card flex-1 min-w-0 relative">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="min-w-[150px]">Submitted At</TableHead>
              {questionnaire?.fields?.filter(f => visibleColumns.includes(f.id)).map((field) => (
                <TableHead key={field.id} className="min-w-[200px]">
                  {field.label}
                </TableHead>
              ))}
              <TableHead className="text-right sticky right-0 bg-muted/50 border-l min-w-[100px] z-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 2} className="h-24 text-center">
                  Loading responses...
                </TableCell>
              </TableRow>
            ) : responses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 2} className="text-center h-32 text-muted-foreground">
                  No responses yet.
                </TableCell>
              </TableRow>
            ) : (
              responses.map((response) => (
                <TableRow key={response.id}>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {formatDate(response.createdAt)}
                  </TableCell>
                  {questionnaire?.fields?.filter(f => visibleColumns.includes(f.id)).map((field) => {
                    const answer = response.answers[field.id];
                    return (
                      <TableCell key={field.id}>
                        {Array.isArray(answer) ? (
                          <div className="flex flex-wrap gap-1">
                            {answer.map((item, i) => (
                              <span key={i} className="bg-muted px-2 py-0.5 rounded-md text-xs">{item}</span>
                            ))}
                          </div>
                        ) : (
                          <span className="line-clamp-2" title={answer}>{answer || "-"}</span>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-right sticky right-0 bg-card border-l z-10">
                    <Sheet>
                      <SheetTrigger render={
                        <Button variant="ghost" size="sm" className="gap-2 text-primary">
                          <EyeIcon className="size-4" /> View
                        </Button>
                      } />
                      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                        <SheetHeader className="mb-4">
                          <SheetTitle>Response Details</SheetTitle>
                          <SheetDescription>
                            Submitted on {new Date(response.createdAt).toLocaleString()}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col divide-y border-t ml-5">
                          {questionnaire?.fields?.map(field => {
                            const answer = response.answers[field.id];
                            return (
                              <div key={field.id} className="py-3 space-y-1">
                                <h4 className="font-medium text-sm text-foreground">{field.label}</h4>
                                <div className="text-muted-foreground text-sm">
                                  {Array.isArray(answer) ? (
                                    <div className="flex flex-col gap-1 mt-1">
                                      {answer.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                                          <span>{item}</span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="whitespace-pre-wrap">{answer || "-"}</p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </SheetContent>
                    </Sheet>
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
          Showing responses {responses.length > 0 ? (page - 1) * limit + 1 : 0} to {Math.min(page * limit, pagination.total)} of {pagination.total} results
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
