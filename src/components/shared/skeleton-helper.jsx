import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

/**
 * A unified skeleton helper for optimizing loading states across the application.
 * Supports different types of layouts: 'table', 'card', 'list'.
 */
export function SkeletonHelper({ 
  type = "table", 
  rows = 5, 
  columns = 5, 
  className,
  ...props
}) {
  if (type === "table") {
    // For tables, this should be rendered inside <TableBody>
    return (
      <>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i} className={className} {...props}>
            {Array.from({ length: columns }).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className={cn("h-6 w-full", 
                  // Vary width slightly for a more natural look
                  j === 0 ? "w-[80%]" : j === columns - 1 ? "w-[40%] ml-auto" : "w-full"
                )} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  if (type === "card") {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)} {...props}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card text-card-foreground shadow space-y-4 p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default type "list"
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={cn("h-12 w-full",
           // Alternate widths slightly
           i % 2 === 0 ? "w-full" : "w-[95%]"
        )} />
      ))}
    </div>
  );
}
