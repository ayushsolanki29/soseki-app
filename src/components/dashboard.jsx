import { DashboardStats } from "@/components/stats";
import { RevenueOverviewChart } from "@/components/conversation-volume-chart";
import { InvoiceStatusChart } from "@/components/channel-breakdown-chart";
import { DashboardDataTable } from "@/components/dashboard-data-table";
import { DashboardListWidget } from "@/components/dashboard-list-widget";
import { HoverQuickActions } from "@/components/hover-quick-actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
    ClockIcon, 
    CheckCircle2Icon, 
    FileTextIcon, 
    UserPlusIcon, 
    BriefcaseIcon,
    AlertCircleIcon,
    CalendarIcon,
    PlusIcon,
    CreditCardIcon,
    PieChartIcon
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { formatCurrency, formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";

// Define the columns directly mapping to Prisma models
const getClientsColumns = () => [
    { header: "Company", render: (row) => <Link href={`/dashboard/clients/${row.id}`} className="font-medium hover:underline">{row.name}</Link> },
    { header: "Contact Email", accessor: "email" },
    { header: "Status", render: (row) => <Badge variant={row.status === "Active" ? "default" : "secondary"}>{row.status}</Badge> }
];

const getProjectsColumns = () => [
    { header: "Project Name", render: (row) => <Link href={`/dashboard/projects/${row.id}`} className="font-medium hover:underline">{row.title}</Link> },
    { header: "Client", render: (row) => <Link href={`/dashboard/clients/${row.clientId}`} className="hover:underline">{row.client?.name}</Link> },
    { header: "Due Date", render: (row) => row.estimatedEndDate ? formatDate(row.estimatedEndDate) : '-' },
    { header: "Status", render: (row) => <Badge variant="outline">{row.status}</Badge> }
];

const getInvoicesColumns = () => [
    { header: "Invoice", render: (row) => <Link href={`/dashboard/invoices/${row.id}`} className="font-medium hover:underline">{row.invoiceNumber}</Link> },
    { header: "Client", render: (row) => <Link href={`/dashboard/clients/${row.clientId}`} className="hover:underline">{row.client?.name}</Link> },
    { header: "Amount", render: (row) => formatCurrency(row.totalAmount, row.currency) },
    { header: "Due Date", render: (row) => formatDate(row.dueDate) },
    { header: "Status", render: (row) => {
        let status = row.status;
        if (status !== 'Paid' && status !== 'Draft' && status !== 'Cancelled' && status !== 'Overdue') {
            if (new Date(row.dueDate) < new Date() && row.paidAmount < row.totalAmount) {
                status = 'Overdue';
            }
        }
        return <Badge variant={status === "Paid" ? "default" : status === "Overdue" ? "destructive" : "secondary"}>{status}</Badge>
    }}
];

const getPaymentsColumns = () => [
    { header: "Client", render: (row) => <Link href={`/dashboard/clients/${row.invoice?.clientId}`} className="font-medium hover:underline">{row.invoice?.client?.name}</Link> },
    { header: "Invoice", render: (row) => <Link href={`/dashboard/invoices/${row.invoiceId}?tab=payments`} className="hover:underline">{row.invoice?.invoiceNumber}</Link> },
    { header: "Amount", render: (row) => formatCurrency(row.amount, row.invoice?.currency || "USD") },
    { header: "Method", accessor: "method" },
    { header: "Received On", render: (row) => formatDate(row.date) }
];

export async function Dashboard() {
    const session = await getSession();
    if (!session?.organizationId) {
        redirect("/login");
    }
    const orgId = session.organizationId;
    
    const [recentProjects, recentInvoices, recentClients, recentPayments] = await Promise.all([
        prisma.project.findMany({
            where: { organizationId: orgId, status: { in: ['Active', 'In Progress', 'Planning'] } },
            include: { client: true },
            orderBy: { createdAt: 'desc' },
            take: 5
        }),
        prisma.invoice.findMany({
            where: { organizationId: orgId },
            include: { client: true },
            orderBy: { createdAt: 'desc' },
            take: 5
        }),
        prisma.client.findMany({
            where: { organizationId: orgId },
            orderBy: { createdAt: 'desc' },
            take: 5
        }),
        prisma.payment.findMany({
            where: { invoice: { organizationId: orgId } },
            include: { invoice: { include: { client: true } } },
            orderBy: { date: 'desc' },
            take: 5
        })
    ]);
    
    // 1. Generate Activity Timeline
    const timelineItems = [
        ...recentInvoices.map(inv => ({
            id: `inv-${inv.id}`,
            date: inv.createdAt,
            title: `Invoice generated for ${inv.client?.name}`,
            subtitle: `${inv.invoiceNumber} for ${formatCurrency(inv.totalAmount, inv.currency)}`,
            meta: formatDate(inv.createdAt),
            icon: <FileTextIcon />
        })),
        ...recentProjects.map(proj => ({
            id: `proj-${proj.id}`,
            date: proj.createdAt,
            title: "Project created",
            subtitle: proj.title,
            meta: formatDate(proj.createdAt),
            icon: <BriefcaseIcon />
        })),
        ...recentPayments.map(pay => ({
            id: `pay-${pay.id}`,
            date: pay.date,
            title: `Payment received from ${pay.invoice?.client?.name}`,
            subtitle: `${pay.invoice?.invoiceNumber} for ${formatCurrency(pay.amount, pay.invoice?.currency || "USD")}`,
            meta: formatDate(pay.date),
            icon: <CheckCircle2Icon className="text-emerald-500" />
        }))
    ];
    
    // Sort by most recent first and take top 5
    const activityTimeline = timelineItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // 2. Generate Upcoming Deadlines
    // Fetch upcoming project deadlines
    const upcomingProjects = await prisma.project.findMany({
        where: { 
            organizationId: orgId, 
            status: { in: ['Active', 'In Progress'] },
            estimatedEndDate: { not: null, gte: new Date() }
        },
        include: { client: true },
        orderBy: { estimatedEndDate: 'asc' },
        take: 3
    });

    // Fetch upcoming/overdue invoice deadlines
    const upcomingInvoices = await prisma.invoice.findMany({
        where: { 
            organizationId: orgId, 
            status: { in: ['Pending', 'Overdue'] } 
        },
        include: { client: true },
        orderBy: { dueDate: 'asc' },
        take: 3
    });

    const deadlineItems = [
        ...upcomingProjects.map(proj => ({
            id: `dl-proj-${proj.id}`,
            date: proj.estimatedEndDate,
            title: `${proj.title} Deadline`,
            subtitle: proj.client?.name,
            meta: formatDate(proj.estimatedEndDate),
            icon: <CalendarIcon />
        })),
        ...upcomingInvoices.map(inv => {
            const isOverdue = new Date(inv.dueDate) < new Date();
            return {
                id: `dl-inv-${inv.id}`,
                date: inv.dueDate,
                title: `${inv.client?.name} Invoice Due`,
                subtitle: inv.invoiceNumber,
                meta: isOverdue ? "Overdue" : formatDate(inv.dueDate),
                icon: <AlertCircleIcon className={isOverdue ? "text-destructive" : ""} />
            };
        })
    ];

    // Sort by closest deadline first and take top 5
    const upcomingDeadlines = deadlineItems
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

	return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative col-span-1 sm:col-span-2 lg:col-span-4 h-48 sm:h-64 rounded-xl overflow-hidden mb-2 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
                <img 
                    src="/banner.jpeg" 
                    alt="Welcome to Workora" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                    <h2 className="text-2xl font-bold font-heading">Welcome to Workora</h2>
                    <p className="text-white/80 mt-1">Here's what's happening with your business today.</p>
                </div>
            </div>

            <DashboardStats />
            
            <RevenueOverviewChart />
            <div className="flex flex-col gap-4 lg:col-span-1">
                <InvoiceStatusChart className="flex-1" />
            </div>

            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-2"
                title="Active Projects" 
                description="Your current ongoing work."
                columns={getProjectsColumns()} 
                data={recentProjects} 
                actionLabel="View all projects"
                actionPath="/dashboard/projects"
            />

            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-2"
                title="Recent Invoices" 
                columns={getInvoicesColumns()} 
                data={recentInvoices} 
                actionLabel="View all invoices"
                actionPath="/dashboard/invoices"
            />

            <DashboardListWidget 
                className="md:col-span-2 lg:col-span-2"
                title="Activity Timeline" 
                description="Recent events across your workspace."
                items={activityTimeline} 
            />
            <DashboardListWidget 
                className="md:col-span-2 lg:col-span-2"
                title="Upcoming Deadlines" 
                description="Items requiring your attention."
                items={upcomingDeadlines} 
            />

            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-2"
                title="Recent Clients" 
                columns={getClientsColumns()} 
                data={recentClients} 
                actionLabel="View all clients"
                actionPath="/dashboard/clients"
            />
            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-2"
                title="Recent Payments" 
                columns={getPaymentsColumns()} 
                data={recentPayments} 
                actionLabel="View all payments"
                actionPath="/dashboard/payments"
            />

            <HoverQuickActions />
        </div>
    );
}
