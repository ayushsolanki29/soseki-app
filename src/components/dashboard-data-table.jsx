import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export function DashboardDataTable({
	title,
	description,
	columns,
	data,
	emptyState,
	actionLabel,
	actionPath,
	className,
	...props
}) {
	return (
		<Card className={cn("gap-0 shadow-none dark:ring-0", className)} {...props}>
			<CardHeader className="border-b">
				<CardTitle>{title}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent className="p-0">
				{data && data.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								{columns.map((col, i) => (
									<TableHead key={i} className={i === 0 ? "pl-6" : i === columns.length - 1 ? "pr-6 text-right" : ""}>
										{col.header}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((row, rowIndex) => (
								<TableRow className="h-14 hover:bg-transparent" key={rowIndex}>
									{columns.map((col, colIndex) => (
										<TableCell 
											key={colIndex} 
											className={cn(
												colIndex === 0 && "pl-6 font-medium",
												colIndex === columns.length - 1 && "pr-6 text-right"
											)}
										>
											{col.render ? col.render(row) : row[col.accessor]}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<div className="flex h-32 items-center justify-center text-sm text-muted-foreground p-4 text-center">
						{emptyState || "No records found."}
					</div>
				)}
				{actionLabel && (
					<div className="flex justify-center border-t py-3">
						<Button
							size="sm"
							variant="ghost"
							render={<a href={actionPath || "#"} />}
							nativeButton={false}
						>
							{actionLabel}
							<ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
