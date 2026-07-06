"use client";

import { DashboardDataTable } from "@/components/dashboard-data-table";
import { DashboardListWidget } from "@/components/dashboard-list-widget";
import { RevenueOverviewChart } from "@/components/conversation-volume-chart";
import { InvoiceStatusChart } from "@/components/channel-breakdown-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import Link from "next/link";
import { BuildingIcon, UserIcon, TicketIcon, AlertCircleIcon, CalendarIcon, ActivityIcon, CheckCircle2Icon } from "lucide-react";

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

export default function SuperAdminDashboardPage() {
    const stats = [
        { label: "Total Organizations", value: 124, delta: 12.5, footnote: "vs last month", isCurrency: false },
        { label: "Active Users", value: 1492, delta: 5.2, footnote: "vs last month", isCurrency: false },
        { label: "MRR (Revenue)", value: 45290, delta: 15.3, footnote: "vs last month", isCurrency: true },
        { label: "Open Tickets", value: 12, delta: -2.4, footnote: "vs last week", isCurrency: false },
        { label: "Server Uptime", value: "99.99%", delta: 0, footnote: "stable", isCurrency: false },
        { label: "New Signups", value: 38, delta: 8.1, footnote: "this week", isCurrency: false },
        { label: "Churn Rate", value: "1.2%", delta: -0.5, footnote: "vs last month", isCurrency: false }
    ];

    const recentOrgs = [
        { id: "1", name: "Acme Corp", email: "admin@acme.com", plan: "Pro", status: "Active" },
        { id: "2", name: "Globex Inc", email: "finance@globex.com", plan: "Starter", status: "Active" },
        { id: "3", name: "Stark Industries", email: "tony@stark.com", plan: "Enterprise", status: "Active" },
        { id: "4", name: "Wayne Ent", email: "bruce@wayne.com", plan: "Pro", status: "Active" },
        { id: "5", name: "Cyberdyne", email: "miles@cyberdyne.com", plan: "Starter", status: "Inactive" },
    ];

    const recentTickets = [
        { id: "TK-1042", subject: "Billing issue with latest invoice", organization: "Acme Corp", priority: "High" },
        { id: "TK-1043", subject: "Need help setting up custom domain", organization: "Globex Inc", priority: "Medium" },
        { id: "TK-1044", subject: "Feature request: advanced reporting", organization: "Stark Industries", priority: "Low" },
        { id: "TK-1045", subject: "API rate limit exceeded", organization: "Wayne Ent", priority: "High" },
        { id: "TK-1046", subject: "Login problems for team members", organization: "Acme Corp", priority: "Medium" },
    ];

    const activityTimeline = [
        { id: "act-1", title: "New Organization Joined", subtitle: "Acme Corp upgraded to Pro", meta: "2 hours ago", icon: <BuildingIcon className="text-emerald-500" /> },
        { id: "act-2", title: "System Update Deployed", subtitle: "v1.0.42 released", meta: "5 hours ago", icon: <ActivityIcon className="text-blue-500" /> },
        { id: "act-3", title: "High Priority Ticket Opened", subtitle: "API rate limit exceeded - Wayne Ent", meta: "1 day ago", icon: <AlertCircleIcon className="text-rose-500" /> },
        { id: "act-4", title: "Subscription Renewed", subtitle: "Globex Inc (Starter Plan)", meta: "2 days ago", icon: <CheckCircle2Icon className="text-emerald-500" /> },
        { id: "act-5", title: "New Lead Added", subtitle: "bruce@wayne.com joined waitlist", meta: "2 days ago", icon: <UserIcon /> }
    ];

    const upcomingRenewals = [
        { id: "ren-1", title: "Stark Industries", subtitle: "Enterprise Plan ($499/mo)", meta: "Tomorrow", icon: <CalendarIcon /> },
        { id: "ren-2", title: "Acme Corp", subtitle: "Pro Plan ($49/mo)", meta: "In 3 days", icon: <CalendarIcon /> },
        { id: "ren-3", title: "Globex Inc", subtitle: "Starter Plan ($19/mo)", meta: "In 5 days", icon: <CalendarIcon /> },
        { id: "ren-4", title: "Wayne Ent", subtitle: "Pro Plan ($49/mo)", meta: "In 1 week", icon: <CalendarIcon /> },
        { id: "ren-5", title: "Cyberdyne", subtitle: "Starter Plan ($19/mo)", meta: "In 2 weeks", icon: <CalendarIcon /> }
    ];

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
                        Here is your platform summary for today. Soseki is currently running smoothly with <span className="font-semibold text-white">124 organizations</span>.
                    </p>
                </div>
            </div>

            {/* Stats Row */}
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

            {/* Charts */}
            <RevenueOverviewChart apiEndpoint="/api/super-admin/dashboard/charts" />
            <div className="flex flex-col gap-4 lg:col-span-1">
                <InvoiceStatusChart apiEndpoint="/api/super-admin/dashboard/charts" className="flex-1" />
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

            {/* List Widgets */}
            <DashboardListWidget
                className="md:col-span-2 lg:col-span-2"
                title="System Activity"
                description="Recent platform-wide events."
                items={activityTimeline}
            />
            <DashboardListWidget
                className="md:col-span-2 lg:col-span-2"
                title="Upcoming Renewals"
                description="Subscription renewals happening soon."
                items={upcomingRenewals}
            />
        </div>
    )
}
