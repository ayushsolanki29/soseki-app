import { DashboardStats } from "@/components/stats";
import { RevenueOverviewChart } from "@/components/conversation-volume-chart";
import { InvoiceStatusChart } from "@/components/channel-breakdown-chart";
import { DashboardDataTable } from "@/components/dashboard-data-table";
import { DashboardListWidget } from "@/components/dashboard-list-widget";
import { HoverQuickActions } from "@/components/hover-quick-actions";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
    CheckCircle2Icon, 
    FileTextIcon, 
    BriefcaseIcon,
    AlertCircleIcon,
    CalendarIcon,
    ClipboardListIcon
} from "lucide-react";
import { serverFetch } from "@/lib/server-api";
import { getSession } from "@/lib/auth";
import { formatCurrency, formatDate, formatId } from "@/lib/utils";
import { redirect } from "next/navigation";

// Define the columns directly mapping to Prisma models
const getClientsColumns = () => [
    { header: "Company", render: (row) => (
        <div className="flex items-center gap-3">
            <DynamicAvatar type="client" seed={row.name} size={32} />
            <div className="flex flex-col">
                <Link href={`/dashboard/clients/${row.id}`} className="font-medium hover:underline">{row.name}</Link>
                <span className="text-[10px] text-muted-foreground font-mono">{formatId(row.id, "CLI")}</span>
            </div>
        </div>
    ) },
    { header: "Contact Email", accessor: "email" },
    { header: "Status", render: (row) => {
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
    }}
];

const getProjectsColumns = () => [
    { header: "Project Name", render: (row) => (
        <div className="flex items-center gap-3">
            <DynamicAvatar type="project" seed={row.title} size={32} />
            <div className="flex flex-col">
                <Link href={`/dashboard/projects/${row.id}`} className="font-medium hover:underline">{row.title}</Link>
                <span className="text-[10px] text-muted-foreground font-mono">{formatId(row.id, "PRJ")}</span>
            </div>
        </div>
    ) },
    { header: "Client", render: (row) => <Link href={`/dashboard/clients/${row.clientId}`} className="hover:underline">{row.client?.name}</Link> },
    { header: "Due Date", render: (row) => row.estimatedEndDate ? formatDate(row.estimatedEndDate) : '-' },
    { header: "Status", render: (row) => {
        let status = row.status;
        if (status !== 'Completed' && status !== 'Cancelled' && status !== 'Draft') {
            if (row.estimatedEndDate && new Date(row.estimatedEndDate) < new Date()) {
                status = 'Overdue';
            }
        }
        
        const isGood = status === "Active" || status === "In Progress";
        const isWarning = status === "Planning" || status === "Review";
        const isBad = status === "Overdue" || status === "Cancelled";
        
        return (
            <span 
                className={cn(
                    "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                    isGood ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                    isBad ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400" :
                    isWarning ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                    "bg-muted text-muted-foreground"
                )}
            >
                {status}
            </span>
        )
    }}
];

const getInvoicesColumns = () => [
    { header: "Invoice", render: (row) => (
        <div className="flex items-center gap-3">
            <DynamicAvatar type="invoice" seed={row.invoiceNumber} size={32} />
            <Link href={`/dashboard/invoices/${row.id}`} className="font-medium hover:underline">{row.invoiceNumber}</Link>
        </div>
    ) },
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
        
        const isGood = status === "Paid";
        const isBad = status === "Overdue" || status === "Cancelled";
        const isWarning = status === "Pending";
        
        return (
            <span 
                className={cn(
                    "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                    isGood ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                    isBad ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400" :
                    isWarning ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                    "bg-muted text-muted-foreground"
                )}
            >
                {status}
            </span>
        )
    }}
];

const getPaymentsColumns = () => [
    { header: "Client", render: (row) => (
        <div className="flex items-center gap-3">
            <DynamicAvatar type="client" seed={row.invoice?.client?.name || "Client"} size={32} />
            <Link href={`/dashboard/clients/${row.invoice?.clientId}`} className="font-medium hover:underline">{row.invoice?.client?.name}</Link>
        </div>
    ) },
    { header: "Invoice", render: (row) => <Link href={`/dashboard/invoices/${row.invoiceId}?tab=payments`} className="hover:underline">{row.invoice?.invoiceNumber}</Link> },
    { header: "Amount", render: (row) => formatCurrency(row.amount, row.invoice?.currency || "USD") },
    { header: "Method", accessor: "method" },
    { header: "Received On", render: (row) => formatDate(row.date) }
];

const getQuestionnairesColumns = () => [
    { header: "Title", render: (row) => (
        <div className="flex items-center gap-3">
            <DynamicAvatar type="questionnaire" seed={row.title} size={32} />
            <div className="flex flex-col">
                <Link href={`/dashboard/questionnaires/${row.id}`} className="font-medium hover:underline">{row.title}</Link>
                <span className="text-[10px] text-muted-foreground font-mono">{formatId(row.id, "QST")}</span>
            </div>
        </div>
    ) },
    { header: "Client", render: (row) => row.clientId ? <Link href={`/dashboard/clients/${row.clientId}`} className="hover:underline">{row.client?.name}</Link> : "-" },
    { header: "Responses", render: (row) => <span className="font-medium">{row.responseCount} {row.maxResponses ? `/ ${row.maxResponses}` : ""}</span> },
    { header: "Created", render: (row) => formatDate(row.createdAt) },
    { header: "Status", render: (row) => {
        const isGood = row.status === "Active";
        const isWarning = row.status === "Paused";
        return (
            <span 
                className={cn(
                    "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                    isGood ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                    isWarning ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                    "bg-muted text-muted-foreground"
                )}
            >
                {row.status}
            </span>
        )
    }}
];

export async function Dashboard() {
    const session = await getSession();
    if (!session?.organizationId) {
        redirect("/login");
    }
    const orgId = session.organizationId;
    
    let data = {};
    try {
        const response = await serverFetch("/dashboard/data");
        data = response || {};
    } catch (e) {
        console.error("Dashboard fetch error:", e);
    }
    
    const {
        recentProjects = [],
        recentInvoices = [],
        recentClients = [],
        recentPayments = [],
        recentQuestionnaires = [],
        organization = {},
        user = {},
        upcomingProjects = [],
        upcomingInvoices = [],
        counts = {}
    } = data;
    
    // 1. Generate Activity Timeline
    const timelineItems = [
        ...recentInvoices.map(inv => ({
            id: `inv-${inv.id}`,
            date: inv.createdAt,
            title: `Invoice generated for ${inv.client?.name}`,
            subtitle: `${inv.invoiceNumber} for ${formatCurrency(inv.totalAmount, inv.currency)}`,
            meta: formatDate(inv.createdAt),
            icon: <DynamicAvatar type="invoice" seed={inv.invoiceNumber} size={36} />
        })),
        ...recentProjects.map(proj => ({
            id: `proj-${proj.id}`,
            date: proj.createdAt,
            title: "Project created",
            subtitle: proj.title,
            meta: formatDate(proj.createdAt),
            icon: <DynamicAvatar type="project" seed={proj.title} size={36} />
        })),
        ...recentPayments.map(pay => ({
            id: `pay-${pay.id}`,
            date: pay.date,
            title: `Payment received from ${pay.invoice?.client?.name}`,
            subtitle: `${pay.invoice?.invoiceNumber} for ${formatCurrency(pay.amount, pay.invoice?.currency || "USD")}`,
            meta: formatDate(pay.date),
            icon: <DynamicAvatar type="client" seed={pay.invoice?.client?.name || "Client"} size={36} />
        })),
        ...recentQuestionnaires.map(q => ({
            id: `q-${q.id}`,
            date: q.createdAt,
            title: "Questionnaire created",
            subtitle: q.title,
            meta: formatDate(q.createdAt),
            icon: <DynamicAvatar type="questionnaire" seed={q.title} size={36} />
        }))
    ];
    
    // Sort by most recent first and take top 5
    const activityTimeline = timelineItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // 2. Generate Upcoming Deadlines

    const formatOverdueDays = (days) => {
        if (days >= 365) return `${Math.floor(days / 365)}y`;
        if (days >= 30) return `${Math.floor(days / 30)}mo`;
        return `${days}d`;
    };

    const deadlineItems = [
        ...upcomingProjects.map(proj => {
            const isOverdue = proj.estimatedEndDate && new Date(proj.estimatedEndDate) < new Date();
            let metaLabel = formatDate(proj.estimatedEndDate);
            if (isOverdue) {
                const days = Math.floor((new Date() - new Date(proj.estimatedEndDate)) / (1000 * 60 * 60 * 24));
                metaLabel = <span className="bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">Overdue ({formatOverdueDays(days)})</span>;
            }
            return {
                id: `dl-proj-${proj.id}`,
                date: proj.estimatedEndDate,
                title: `${proj.title} Deadline`,
                subtitle: proj.client?.name,
                meta: metaLabel,
                icon: <CalendarIcon className={isOverdue ? "text-destructive" : ""} />
            }
        }),
        ...upcomingInvoices.map(inv => {
            const isOverdue = new Date(inv.dueDate) < new Date();
            let metaLabel = formatDate(inv.dueDate);
            if (isOverdue) {
                const days = Math.floor((new Date() - new Date(inv.dueDate)) / (1000 * 60 * 60 * 24));
                metaLabel = <span className="bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">Overdue ({formatOverdueDays(days)})</span>;
            }
            return {
                id: `dl-inv-${inv.id}`,
                date: inv.dueDate,
                title: `${inv.client?.name} Invoice Due`,
                subtitle: inv.invoiceNumber,
                meta: metaLabel,
                icon: <AlertCircleIcon className={isOverdue ? "text-destructive" : ""} />
            };
        })
    ];

    // Sort by closest deadline first and take top 5
    const upcomingDeadlines = deadlineItems
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const firstName = user?.name?.split(' ')[0] || 'there';
    const rawOrgName = organization?.name || 'your workspace';
    
    // If the org name is just the user's name (common for freelancers), avoid sounding repetitive
    const isFreelancerOrg = user?.name && rawOrgName.toLowerCase().includes(user.name.toLowerCase());
    
    // Count active items for impressive subtitle
    const activeProjectCount = counts.activeProjects || 0;
    const pendingInvoiceCount = counts.pendingInvoices || 0;
    const activeQuestionnaireCount = counts.activeQuestionnaires || 0;

	return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative col-span-1 sm:col-span-2 lg:col-span-4 h-48 sm:h-64 rounded-xl overflow-hidden mb-2 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
                <img 
                    src="/banner.jpeg" 
                    alt="Welcome to Soseki" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                    <h2 className="text-3xl font-bold font-heading">{getGreeting()}, {firstName}</h2>
                    <p className="text-white/90 mt-2 text-sm sm:text-base">
                        {isFreelancerOrg 
                            ? "Here is your workspace summary for today. "
                            : <span>Here's what's happening at <span className="font-semibold text-white">{rawOrgName}</span> today. </span>
                        }
                        You have <span className="font-semibold text-white">{activeProjectCount} active projects</span>, <span className="font-semibold text-white">{pendingInvoiceCount} pending invoices</span>, and <span className="font-semibold text-white">{activeQuestionnaireCount} active questionnaires</span>.
                    </p>
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

            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-4"
                title="Recent Questionnaires" 
                columns={getQuestionnairesColumns()} 
                data={recentQuestionnaires} 
                actionLabel="View all questionnaires"
                actionPath="/dashboard/questionnaires"
            />

            <HoverQuickActions />
        </div>
    );
}
