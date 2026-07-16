import { serverFetch } from "@/lib/server-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function SuperAdminAccessRequestsPage() {
  let requests = [];
  try {
    const data = await serverFetch("/super-admin/access-requests");
    requests = data.requests || [];
  } catch (error) {
    console.error("Failed to fetch access requests:", error);
  }

  return (
    <div className="space-y-6">
       <div>
         <h1 className="text-3xl font-bold tracking-tight">Requested Access</h1>
         <p className="text-muted-foreground mt-2">Manage incoming requests for platform access.</p>
       </div>
       
       <div className="border rounded-lg overflow-hidden bg-card">
         <Table>
           <TableHeader className="bg-muted/50">
             <TableRow>
               <TableHead>User</TableHead>
               <TableHead>Location</TableHead>
               <TableHead>Profession</TableHead>
               <TableHead>Earnings</TableHead>
               <TableHead>Previous Tool</TableHead>
               <TableHead>Requested On</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {requests.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                   No access requests found.
                 </TableCell>
               </TableRow>
             ) : (
               requests.map((req) => (
                 <TableRow key={req.id}>
                   <TableCell className="font-medium">
                     <div className="flex items-center gap-3 py-1">
                       <DynamicAvatar type="user" seed={req.fullName || req.email} size={32} />
                       <div className="flex flex-col">
                         <span className="text-sm font-medium">{req.fullName}</span>
                         <span className="text-xs text-muted-foreground">{req.email}</span>
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>{req.country || "-"}</TableCell>
                   <TableCell>{req.profession || "-"}</TableCell>
                   <TableCell>{req.earningsRange || "-"}</TableCell>
                   <TableCell>{req.previousTool || "-"}</TableCell>
                   <TableCell>{formatDate(req.createdAt)}</TableCell>
                 </TableRow>
               ))
             )}
           </TableBody>
         </Table>
       </div>
    </div>
  );
}
