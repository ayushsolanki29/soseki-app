"use client";

import { DashboardDataTable } from "@/components/dashboard-data-table";
import { DashboardListWidget } from "@/components/dashboard-list-widget";
import { RevenueOverviewChart } from "@/components/conversation-volume-chart";
import { InvoiceStatusChart } from "@/components/channel-breakdown-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { formatCurrency, cn } from "@/lib/utils";
import { TrafficWidget } from "@/components/traffic-widget";
import { BuildingIcon, UserIcon, AlertCircleIcon, CalendarIcon, ActivityIcon, CheckCircle2Icon } from "lucide-react";

const getOrganizationsColumns = () => [
    { header: "Organization", render: (row) => <span className="font-medium hover:underline cursor-pointer">{row.name}</span> },
    { header: "Owner Email", accessor: "email" },
    { header: "Plan", accessor: "plan" },
    {
        header: "Status", render: (row) => {
            const isGood = row.status === "Active";
            return (
                <span
                    className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                        isGood
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                    )}
                >
                    {row.status}
                </span>
            )
        }
    }
];

const getTicketsColumns = () => [
    { header: "Ticket ID", render: (row) => <span className="font-medium hover:underline cursor-pointer">{row.id}</span> },
    { header: "Subject", accessor: "subject" },
    { header: "Organization", accessor: "organization" },
    {
        header: "Priority", render: (row) => {
            const isBad = row.priority === "High";
            const isWarning = row.priority === "Medium";
            return (
                <span
                    className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                        isBad ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400" :
                            isWarning ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                                "bg-muted text-muted-foreground"
                    )}
                >
                    {row.priority}
                </span>
            )
        }
    }
];

import { useEffect, useState } from "react";

export default function SuperAdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
                const res = await fetch(`${apiUrl}/super-admin/dashboard/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setDashboardData(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const { stats: dbStats, recentOrgs, recentTickets, activityTimeline } = dashboardData || {};
    const stats = [
        { label: "Total Organizations", value: dbStats?.totalOrgs || 0, delta: 12.5, footnote: "vs last month", isCurrency: false },
        { label: "Active Users", value: dbStats?.activeUsers || 0, delta: 5.2, footnote: "vs last month", isCurrency: false },
        { label: "MRR (Revenue)", value: dbStats?.mrr || 0, delta: 15.3, footnote: "vs last month", isCurrency: true },
        { label: "Open Tickets", value: dbStats?.openTickets || 0, delta: -2.4, footnote: "vs last week", isCurrency: false },
        { label: "New Signups", value: dbStats?.newSignups || 0, delta: 8.1, footnote: "this week", isCurrency: false }
    ];

    // Map icons to the timeline activities
    const mappedTimeline = (activityTimeline || []).map(act => {
        let icon = <ActivityIcon className="text-blue-500" />;
        if (act.type === 'ORG_JOINED') icon = <BuildingIcon className="text-emerald-500" />;
        if (act.type === 'TICKET_OPENED') icon = <AlertCircleIcon className="text-rose-500" />;
        if (act.type === 'LEAD_ADDED') icon = <UserIcon />;
        
        return {
            ...act,
            icon,
            meta: new Date(act.date).toLocaleDateString()
        };
    });

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Hero Banner */}
            <div className="relative col-span-1 sm:col-span-2 lg:col-span-4 h-48 sm:h-64 rounded-xl overflow-hidden mb-2 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
                <img
                    src="/super-banner.jpg"
                    alt="Welcome to Soseki Admin"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                    <h2 className="text-3xl font-bold font-heading">Welcome back, Super Admin</h2>
                    <p className="text-white/90 mt-2 text-sm sm:text-base">
                        Here is your platform summary for today. Soseki is currently running smoothly with <span className="font-semibold text-white">{dbStats?.totalOrgs || 0} organizations</span>.
                    </p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="sm:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((s) => (
                    <Card className="shadow-none dark:ring-0" key={s.label}>
                        <CardHeader>
                            <CardTitle className="font-normal text-muted-foreground text-xs">
                                {s.label}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p className="font-semibold text-2xl tabular-nums">
                                {s.isCurrency ? formatCurrency(s.value, "USD") : s.value}
                            </p>
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
            </div>

            {/* Charts */}
            <RevenueOverviewChart apiEndpoint="/super-admin/dashboard/charts" />
            <div className="flex flex-col gap-4 lg:col-span-1">
                <InvoiceStatusChart apiEndpoint="/super-admin/dashboard/charts" className="flex-1" />
            </div>

            {/* Data Tables */}
            <DashboardDataTable
                className="md:col-span-2 lg:col-span-2"
                title="Recent Organizations"
                description="Newly joined workspaces on the platform."
                columns={getOrganizationsColumns()}
                data={recentOrgs}
                actionLabel="View all organizations"
                actionPath="/super-admin/organizations"
            />

            <DashboardDataTable
                className="md:col-span-2 lg:col-span-2"
                title="Active Support Tickets"
                columns={getTicketsColumns()}
                data={recentTickets}
                actionLabel="View all tickets"
                actionPath="/super-admin/tickets"
            />

            <TrafficWidget className="md:col-span-2 lg:col-span-4 mb-4" />

            {/* List Widgets */}
            <DashboardListWidget
                className="md:col-span-2 lg:col-span-4"
                title="System Activity"
                description="Recent platform-wide events."
                items={mappedTimeline}
            />
        </div>
    )
}
