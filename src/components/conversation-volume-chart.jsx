"use client";
import { cn } from "@/lib/utils";
import { useId, useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import API from "@/lib/api";

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
    
    const [chartData, setChartData] = useState([]);
    const [growthPctNum, setGrowthPctNum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChartsData = async () => {
            try {
                const res = await API.get("/dashboard/charts");
                setChartData(res.data.revenueOverview || []);
                setGrowthPctNum(res.data.growthPctNum || 0);
            } catch (error) {
                console.error("Failed to load charts data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChartsData();
    }, []);

    if (isLoading) {
        return (
            <Card className={cn("shadow-none md:col-span-2 lg:col-span-3 dark:ring-0", className)} {...props}>
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 space-y-2">
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Skeleton className="aspect-22/8 w-full rounded-lg" />
                </CardContent>
            </Card>
        );
    }

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
