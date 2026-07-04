import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";

const stats = [
	{
		label: "Total Revenue",
		value: "₹2,15,000",
		delta: 12.4,
		footnote: "vs last month",
		lowerIsBetter: false,
	},
	{
		label: "Outstanding Payments",
		value: "₹84,000",
		delta: -5.2,
		footnote: "vs last month",
		lowerIsBetter: true,
	},
	{
		label: "Active Projects",
		value: "14",
		delta: 2,
		footnote: "vs last month",
		lowerIsBetter: false,
	},
	{
		label: "Total Clients",
		value: "42",
		delta: 4,
		footnote: "vs last month",
		lowerIsBetter: false,
	},
    {
		label: "Estimates Pending",
		value: "6",
		delta: -1.1,
		footnote: "vs last week",
		lowerIsBetter: true,
	},
    {
		label: "Overdue Invoices",
		value: "3",
		delta: 1,
		footnote: "vs last week",
		lowerIsBetter: true,
	},
    {
		label: "Payments This Month",
		value: "₹1,31,000",
		delta: 18.0,
		footnote: "vs last month",
		lowerIsBetter: false,
	},
    {
		label: "Monthly Growth",
		value: "14.2%",
		delta: 2.1,
		footnote: "vs last month",
		lowerIsBetter: false,
	},
];

export function DashboardStats() {
	return (
        <>
            {stats.map((s) => (
				<Card className={cn("shadow-none dark:ring-0")} key={s.label}>
					<CardHeader>
						<CardTitle className="font-normal text-muted-foreground text-xs">
							{s.label}
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						<p className="font-semibold text-2xl tabular-nums">{s.value}</p>
						<div className="flex items-center gap-1 text-xs">
							<Delta value={s.delta}>
								<DeltaIcon />
								<DeltaValue />
							</Delta>
							<span className="text-muted-foreground">{s.footnote}</span>
						</div>
					</CardContent>
				</Card>
			))}
        </>
    );
}
