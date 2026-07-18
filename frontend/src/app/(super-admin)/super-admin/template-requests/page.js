"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

export default function SuperAdminTemplateRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/super-admin/template-requests");
      setRequests(res.data.requests || []);
    } catch (error) {
      console.error("Failed to fetch template requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/super-admin/template-requests/${id}`, { status: newStatus });
      toast.success("Status updated");
      fetchRequests();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <div>
         <h1 className="text-3xl font-bold tracking-tight">Template Requests</h1>
         <p className="text-muted-foreground mt-2">Manage custom template design requests from organizations.</p>
       </div>
       
       <div className="border rounded-lg overflow-hidden bg-card">
         <Table>
           <TableHeader className="bg-muted/50">
             <TableRow>
               <TableHead>Organization</TableHead>
               <TableHead>Type</TableHead>
               <TableHead>Description</TableHead>
               <TableHead>Attachment</TableHead>
               <TableHead>Date</TableHead>
               <TableHead className="w-[150px]">Status</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {requests.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                   No template requests found.
                 </TableCell>
               </TableRow>
             ) : (
               requests.map((req) => (
                 <TableRow key={req.id}>
                   <TableCell className="font-medium">
                     {req.organization?.name || "Unknown"}
                   </TableCell>
                   <TableCell>
                     <Badge variant="outline">{req.type}</Badge>
                   </TableCell>
                   <TableCell className="max-w-xs truncate" title={req.description}>
                     {req.description}
                   </TableCell>
                   <TableCell>
                     {req.attachmentUrl ? (
                       <a href={req.attachmentUrl} target="_blank" rel="noreferrer" className="flex items-center text-primary hover:underline text-sm">
                         <ExternalLinkIcon className="w-4 h-4 mr-1" /> View
                       </a>
                     ) : (
                       <span className="text-muted-foreground text-sm">-</span>
                     )}
                   </TableCell>
                   <TableCell>{formatDate(req.createdAt)}</TableCell>
                   <TableCell>
                     <Select 
                        value={req.status} 
                        onValueChange={(val) => handleStatusChange(req.id, val)}
                     >
                       <SelectTrigger className="h-8">
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Pending">Pending</SelectItem>
                         <SelectItem value="Completed">Completed</SelectItem>
                       </SelectContent>
                     </Select>
                   </TableCell>
                 </TableRow>
               ))
             )}
           </TableBody>
         </Table>
       </div>
    </div>
  );
}
