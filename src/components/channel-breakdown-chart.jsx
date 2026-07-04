"use client";
import { cn } from "@/lib/utils";
import { LabelList, Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
	{ status: "paid", share: 65, fill: "var(--color-paid)" },
	{ status: "pending", share: 20, fill: "var(--color-pending)" },
	{ status: "overdue", share: 10, fill: "var(--color-overdue)" },
	{ status: "draft", share: 5, fill: "var(--color-draft)" },
];

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
    ...props
}) {
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
			</CardContent>
        </Card>
    );
}
