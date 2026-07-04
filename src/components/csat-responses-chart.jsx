"use client";
import { cn } from "@/lib/utils";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
    { status: "Planning", count: 4, fill: "var(--color-planning)" },
    { status: "In Progress", count: 8, fill: "var(--color-in_progress)" },
    { status: "Review", count: 3, fill: "var(--color-review)" },
    { status: "Completed", count: 12, fill: "var(--color-completed)" },
    { status: "On Hold", count: 2, fill: "var(--color-on_hold)" },
];

const chartConfig = {
    count: {
        label: "Projects",
    },
    planning: { label: "Planning", color: "var(--chart-1)" },
    in_progress: { label: "In Progress", color: "var(--chart-2)" },
    review: { label: "Review", color: "var(--chart-3)" },
    completed: { label: "Completed", color: "var(--chart-4)" },
    on_hold: { label: "On Hold", color: "var(--chart-5)" }
};

export function ProjectStatusChart({
    className,
    ...props
}) {
	return (
        <Card
            className={cn("shadow-none md:col-span-2 dark:ring-0 flex flex-col", className)}
            {...props}>
            <CardHeader>
				<CardTitle>Project Status</CardTitle>
				<CardDescription>
					Distribution of your active and past projects.
				</CardDescription>
			</CardHeader>
            <CardContent className="flex-1 pb-4">
				<ChartContainer className="aspect-video w-full h-full" config={chartConfig}>
					<BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: -10 }}>
						<YAxis
                            dataKey="status"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            width={80}
                            fontSize={12}
                        />
                        <XAxis type="number" hide />
						<ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                            cursor={{ fill: "var(--muted)", opacity: 0.2 }} />
						<Bar
                            dataKey="count"
                            radius={4}
                            barSize={16}
                        />
					</BarChart>
				</ChartContainer>
			</CardContent>
        </Card>
    );
}
