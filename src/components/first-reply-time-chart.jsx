import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const metrics = [
    { label: "Collection Rate", value: "92%", progress: 92 },
    { label: "Project Completion Rate", value: "85%", progress: 85 },
    { label: "Active Client Ratio", value: "64%", progress: 64 },
    { label: "Monthly Revenue Goal", value: "78%", progress: 78 },
];

export function BusinessHealth({
    className,
    ...props
}) {
	return (
        <Card
            className={cn("shadow-none md:col-span-2 dark:ring-0", className)}
            {...props}>
            <CardHeader>
				<CardTitle>Business Health</CardTitle>
				<CardDescription>
					Key performance indicators for operations.
				</CardDescription>
			</CardHeader>
            <CardContent className="flex flex-col gap-6 pb-6">
                {metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-muted-foreground">{m.label}</span>
                            <span className="font-medium">{m.value}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${m.progress}%` }} />
                        </div>
                    </div>
                ))}
                <div className="flex flex-col gap-2 mt-2 pt-6 border-t">
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Average Invoice Value</span>
                        <span className="font-medium">₹18,500</span>
                    </div>
                </div>
			</CardContent>
        </Card>
    );
}
