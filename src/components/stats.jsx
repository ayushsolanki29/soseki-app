"use client";

import { useState, useEffect } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { Skeleton } from "@/components/ui/skeleton";
import API from "@/lib/api";

export function DashboardStats() {
    const [stats, setStats] = useState([]);
    const [masterCurrency, setMasterCurrency] = useState("USD");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get("/dashboard/stats");
                setStats(res.data.stats || []);
                setMasterCurrency(res.data.masterCurrency || "USD");
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <>
                {[...Array(7)].map((_, i) => (
                    <Card className="shadow-none dark:ring-0" key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-4 w-40" />
                        </CardContent>
                    </Card>
                ))}
            </>
        );
    }

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
						<p className="font-semibold text-2xl tabular-nums">
                            {s.isCurrency ? formatCurrency(s.value, masterCurrency) : s.value}
                        </p>
						<div className="flex items-center gap-1 text-xs">
                            {s.delta !== null ? (
                                <>
                                    <Delta value={s.delta}>
                                        <DeltaIcon />
                                        <DeltaValue />
                                    </Delta>
                                    <span className="text-muted-foreground">{s.footnote}</span>
                                </>
                            ) : (
                                <span className="text-muted-foreground">{s.footnote}</span>
                            )}
						</div>
					</CardContent>
				</Card>
			))}
        </>
    );
}
