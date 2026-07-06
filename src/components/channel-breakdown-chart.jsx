"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import API from "@/lib/api";

const chartConfig = {
    share: {
		label: "Share",
	},
    paid: {
		label: "Paid",
		color: "var(--chart-2)",
	},
    pending: {
		label: "Pending",
		color: "var(--chart-3)",
	},
    overdue: {
		label: "Overdue",
		color: "var(--chart-1)",
	},
    draft: {
		label: "Draft",
		color: "var(--chart-5)",
	}
};

export function InvoiceStatusChart({
    className,
    apiEndpoint = "/dashboard/charts",
    ...props
}) {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChartsData = async () => {
            try {
                const res = await API.get(apiEndpoint);
                setChartData(res.data.invoiceStatus || []);
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
            <Card className={cn("flex flex-col shadow-none dark:ring-0", className)} {...props}>
                <CardHeader className="items-center space-y-1 pb-0 sm:items-start">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                        <Skeleton className="h-6 w-32 mb-1" />
                    </div>
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="my-auto flex items-center justify-center h-full min-h-[288px]">
                    <Skeleton className="h-48 w-48 rounded-full" />
                </CardContent>
            </Card>
        );
    }

	return (
        <Card
            className={cn("flex flex-col shadow-none dark:ring-0", className)}
            {...props}>
            <CardHeader className="items-center space-y-1 pb-0 sm:items-start">
				<div
                    className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
					<CardTitle>Invoice Status</CardTitle>
				</div>
				<CardDescription>
					Distribution of all invoices
				</CardDescription>
			</CardHeader>
            <CardContent className="my-auto">
                {chartData.length === 0 ? (
                    <div className="flex items-center justify-center h-full min-h-[288px] text-muted-foreground text-sm">
                        No invoices found.
                    </div>
                ) : (
                    <ChartContainer className="mx-auto aspect-square max-h-72 w-full" config={chartConfig}>
                        <PieChart accessibilityLayer>
                            <Pie
                                cornerRadius={8}
                                data={chartData}
                                dataKey="share"
                                innerRadius={36}
                                nameKey="status"
                                outerRadius="88%"
                                stroke="var(--card)"
                                strokeWidth={4}>
                                <LabelList
                                    className="fill-background font-medium"
                                    dataKey="share"
                                    fill="currentColor"
                                    fontWeight={500}
                                    formatter={(label) => {
                                        const n = Number(label);
                                        return Number.isFinite(n) ? `${n}%` : String(label ?? "");
                                    }}
                                    position="inside"
                                    stroke="none" />
                            </Pie>
                            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
                        </PieChart>
                    </ChartContainer>
                )}
			</CardContent>
        </Card>
    );
}
