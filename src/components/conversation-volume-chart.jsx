"use client";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";

const chartData = [
	{ month: "Jan", revenue: 45000, expenses: 22000 },
	{ month: "Feb", revenue: 52000, expenses: 24000 },
	{ month: "Mar", revenue: 48000, expenses: 23000 },
	{ month: "Apr", revenue: 61000, expenses: 28000 },
	{ month: "May", revenue: 59000, expenses: 26000 },
	{ month: "Jun", revenue: 75000, expenses: 32000 },
	{ month: "Jul", revenue: 82000, expenses: 34000 },
	{ month: "Aug", revenue: 80000, expenses: 31000 },
	{ month: "Sep", revenue: 95000, expenses: 38000 },
	{ month: "Oct", revenue: 105000, expenses: 41000 },
	{ month: "Nov", revenue: 110000, expenses: 45000 },
	{ month: "Dec", revenue: 131000, expenses: 48000 },
];

const chartConfig = {
	revenue: {
		label: "Revenue (₹)",
		color: "var(--chart-2)",
	},
    expenses: {
		label: "Expenses (₹)",
		color: "var(--chart-1)",
	}
};

export function RevenueOverviewChart({
	className,
	...props
}) {
	const chartUid = useId().replace(/:/g, "");
	const growthPctNum = 14.2;

	return (
		<Card
			className={cn("shadow-none md:col-span-2 lg:col-span-3 dark:ring-0", className)}
			{...props}
		>
			<CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="min-w-0 space-y-2">
					<div className="flex flex-wrap items-center gap-2">
						<CardTitle>Revenue Overview</CardTitle>
						<Delta value={growthPctNum} variant="badge">
							<DeltaIcon variant="trend" />
							<DeltaValue />
						</Delta>
					</div>
					<CardDescription>
						Monthly revenue vs expenses for this year.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer className="aspect-22/8 w-full" config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
					>
						<CartesianGrid className="stroke-border" vertical={false} />
						<XAxis
							axisLine={false}
							dataKey="month"
							tickLine={false}
							tickMargin={8}
						/>
						<YAxis
							axisLine={false}
							tick={{ className: "tabular-nums" }}
							tickLine={false}
							tickMargin={8}
							width={48}
                            tickFormatter={(value) => `₹${value / 1000}k`}
						/>
						<ChartTooltip
							content={<ChartTooltipContent indicator="line" />}
							cursor={false}
						/>
						<Line
							dataKey="revenue"
							dot={false}
							stroke="var(--color-revenue)"
							strokeWidth={2}
							type="monotone"
						/>
                        <Line
							dataKey="expenses"
							dot={false}
							stroke="var(--color-expenses)"
							strokeWidth={2}
							type="monotone"
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
