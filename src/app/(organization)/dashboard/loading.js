import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function TableSkeletonCard() {
    return (
        <Card className="gap-0 shadow-none dark:ring-0">
            <CardHeader className="border-b">
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <SkeletonHelper type="table" rows={5} columns={4} />
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function ListSkeletonCard() {
    return (
        <Card className="shadow-none dark:ring-0">
            <CardHeader>
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
                <SkeletonHelper type="list" rows={5} />
            </CardContent>
        </Card>
    );
}

export default function DashboardLoading() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Banner Skeleton */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 h-48 sm:h-64 rounded-xl mb-2">
                <Skeleton className="w-full h-full rounded-xl" />
            </div>

            {/* Dashboard Stats Skeleton */}
            {[...Array(7)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2 p-6 border rounded-xl bg-card">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-40" />
                </div>
            ))}

            {/* Charts Skeleton */}
            <div className="md:col-span-2 lg:col-span-3">
                <Card className="shadow-none dark:ring-0 h-[380px]">
                    <CardHeader>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-64 w-full rounded-lg" />
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-1">
                 <Card className="flex flex-col shadow-none dark:ring-0 h-[380px]">
                    <CardHeader className="items-center space-y-1 pb-0 sm:items-start">
                        <Skeleton className="h-6 w-32 mb-1" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent className="my-auto flex items-center justify-center">
                        <Skeleton className="h-48 w-48 rounded-full" />
                    </CardContent>
                </Card>
            </div>

            {/* Tables Skeletons */}
            <div className="md:col-span-2 lg:col-span-2">
                <TableSkeletonCard />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
                <TableSkeletonCard />
            </div>

            {/* Lists Skeletons */}
            <div className="md:col-span-2 lg:col-span-2">
                <ListSkeletonCard />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
                <ListSkeletonCard />
            </div>

            {/* Bottom Tables Skeletons */}
            <div className="md:col-span-2 lg:col-span-2">
                <TableSkeletonCard />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
                <TableSkeletonCard />
            </div>
        </div>
    );
}
