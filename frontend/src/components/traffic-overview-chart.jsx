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
import { Skeleton } from "@/components/ui/skeleton";
import API from "@/lib/api";

const chartConfig = {
	visits: {
		label: "Visits",
		color: "var(--chart-1)",
	}
};

export function TrafficOverviewChart({
	className,
	apiEndpoint = "/super-admin/dashboard/charts",
	...props
}) {
	const chartUid = useId().replace(/:/g, "");
    
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChartsData = async () => {
            try {
                const res = await API.get(apiEndpoint);
                setChartData(res.data.visitsOverview || []);
            } catch (error) {
                console.error("Failed to load charts data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChartsData();
    }, [apiEndpoint]);

    if (isLoading) {
        return (
            <Card className={cn("shadow-none md:col-span-2 lg:col-span-4 dark:ring-0", className)} {...props}>
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 space-y-2">
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Skeleton className="aspect-[22/8] w-full rounded-lg" />
                </CardContent>
            </Card>
        );
    }

	return (
		<Card
			className={cn("shadow-none md:col-span-2 lg:col-span-4 dark:ring-0", className)}
			{...props}
		>
			<CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="min-w-0 space-y-2">
					<div className="flex flex-wrap items-center gap-2">
						<CardTitle>Traffic Overview</CardTitle>
					</div>
					<CardDescription>
						Weekly platform visits (last 4 weeks).
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer className="aspect-[22/8] w-full" config={chartConfig}>
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
						/>
						<ChartTooltip
							content={<ChartTooltipContent indicator="line" />}
							cursor={false}
						/>
						<Line
							dataKey="visits"
							dot={false}
							stroke="var(--color-visits, #3b82f6)"
							strokeWidth={2}
							type="monotone"
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
