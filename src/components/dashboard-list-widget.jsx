import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";

export function DashboardListWidget({
	title,
	description,
	items,
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
				{items && items.length > 0 ? (
					<ul className="flex flex-col divide-y divide-border">
						{items.map((item, idx) => (
							<li className="flex items-center gap-3 p-3 sm:gap-3" key={item.id || idx}>
								{item.icon && (
									<span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/50 text-muted-foreground [&_svg]:size-4">
										{item.icon}
									</span>
								)}
								<div className="min-w-0 flex-1 space-y-1 pr-1">
									<p className="line-clamp-2 text-pretty text-foreground text-sm font-medium leading-snug">
										{item.title}
									</p>
									{(item.subtitle || item.meta) && (
										<div className="flex items-center gap-2 text-muted-foreground text-xs">
											<span className="truncate">{item.subtitle}</span>
											{item.meta && (
												<>
													{item.subtitle && <span className="inline-flex size-1 rounded-full bg-border" />}
													<span className="tabular-nums font-medium whitespace-nowrap">{item.meta}</span>
												</>
											)}
										</div>
									)}
								</div>
								{item.action && (
									<div className="shrink-0 pl-2">
										{item.action}
									</div>
								)}
							</li>
						))}
					</ul>
				) : (
					<div className="flex h-32 items-center justify-center text-sm text-muted-foreground p-4 text-center">
						{emptyState || "No items to show."}
					</div>
				)}
			</CardContent>
			{actionLabel && (
				<div className="flex items-center justify-center border-t py-3">
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
		</Card>
	);
}
