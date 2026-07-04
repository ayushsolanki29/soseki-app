import { DashboardStats } from "@/components/stats";
import { RevenueOverviewChart } from "@/components/conversation-volume-chart";
import { InvoiceStatusChart } from "@/components/channel-breakdown-chart";
import { ProjectStatusChart } from "@/components/csat-responses-chart";
import { BusinessHealth } from "@/components/first-reply-time-chart";
import { DashboardDataTable } from "@/components/dashboard-data-table";
import { DashboardListWidget } from "@/components/dashboard-list-widget";
import { Badge } from "@/components/ui/badge";
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

// Mock Data for Tables
const clientsColumns = [
    { header: "Company", accessor: "company" },
    { header: "Contact Person", accessor: "contact" },
    { header: "Active Projects", accessor: "projects" },
    { header: "Outstanding", accessor: "outstanding" },
    { header: "Status", render: (row) => <Badge variant={row.status === "Active" ? "default" : "secondary"}>{row.status}</Badge> }
];
const clientsData = [
    { company: "Acme Studio", contact: "John Doe", projects: 2, outstanding: "₹12,500", status: "Active" },
    { company: "NovaTech", contact: "Sarah Smith", projects: 1, outstanding: "₹0", status: "New" },
    { company: "PixelCraft", contact: "Mike Johnson", projects: 0, outstanding: "₹4,500", status: "Inactive" },
    { company: "Bright Labs", contact: "Emily Chen", projects: 3, outstanding: "₹84,000", status: "Active" },
];

const projectsColumns = [
    { header: "Project Name", accessor: "name" },
    { header: "Client", accessor: "client" },
    { header: "Budget", accessor: "budget" },
    { header: "Due Date", accessor: "dueDate" },
    { header: "Status", render: (row) => <Badge variant="outline">{row.status}</Badge> }
];
const projectsData = [
    { name: "Website Redesign", client: "Acme Studio", budget: "₹1,50,000", dueDate: "Aug 15, 2026", status: "In Progress" },
    { name: "Mobile App MVP", client: "Bright Labs", budget: "₹3,20,000", dueDate: "Sep 01, 2026", status: "Planning" },
    { name: "Brand Guidelines", client: "NovaTech", budget: "₹45,000", dueDate: "Jul 20, 2026", status: "Review" },
];

const estimatesColumns = [
    { header: "Estimate", accessor: "id" },
    { header: "Client", accessor: "client" },
    { header: "Amount", accessor: "amount" },
    { header: "Valid Until", accessor: "validUntil" },
    { header: "Status", render: (row) => <Badge variant={row.status === "Approved" ? "default" : "secondary"}>{row.status}</Badge> }
];
const estimatesData = [
    { id: "EST-0042", client: "Apex Digital", amount: "₹65,000", validUntil: "Jul 10, 2026", status: "Sent" },
    { id: "EST-0041", client: "PixelCraft", amount: "₹1,20,000", validUntil: "Jul 05, 2026", status: "Approved" },
];

const invoicesColumns = [
    { header: "Invoice", accessor: "id" },
    { header: "Client", accessor: "client" },
    { header: "Amount", accessor: "amount" },
    { header: "Due Date", accessor: "dueDate" },
    { header: "Status", render: (row) => <Badge variant={row.status === "Paid" ? "default" : row.status === "Overdue" ? "destructive" : "secondary"}>{row.status}</Badge> }
];
const invoicesData = [
    { id: "INV-1029", client: "Acme Studio", amount: "₹12,500", dueDate: "Jul 01, 2026", status: "Overdue" },
    { id: "INV-1030", client: "Bright Labs", amount: "₹84,000", dueDate: "Jul 15, 2026", status: "Pending" },
    { id: "INV-1028", client: "NovaTech", amount: "₹45,000", dueDate: "Jun 28, 2026", status: "Paid" },
];

const paymentsColumns = [
    { header: "Client", accessor: "client" },
    { header: "Invoice", accessor: "invoice" },
    { header: "Amount", accessor: "amount" },
    { header: "Method", accessor: "method" },
    { header: "Received On", accessor: "date" }
];
const paymentsData = [
    { client: "NovaTech", invoice: "INV-1028", amount: "₹45,000", method: "Bank Transfer", date: "Jun 28, 2026" },
    { client: "PixelCraft", invoice: "INV-1027", amount: "₹86,000", method: "Credit Card", date: "Jun 25, 2026" },
];

// Mock Data for Lists
const activityTimeline = [
    { id: 1, title: "Payment received from NovaTech", subtitle: "INV-1028 for ₹45,000", meta: "2 hours ago", icon: <CheckCircle2Icon className="text-emerald-500" /> },
    { id: 2, title: "Invoice generated for Bright Labs", subtitle: "INV-1030 for ₹84,000", meta: "4 hours ago", icon: <FileTextIcon /> },
    { id: 3, title: "Estimate approved by PixelCraft", subtitle: "EST-0041", meta: "Yesterday", icon: <CheckCircle2Icon /> },
    { id: 4, title: "New client added", subtitle: "Apex Digital", meta: "Yesterday", icon: <UserPlusIcon /> },
    { id: 5, title: "Project created", subtitle: "Mobile App MVP", meta: "2 days ago", icon: <BriefcaseIcon /> },
];

const upcomingDeadlines = [
    { id: 1, title: "Acme Studio Invoice Due", subtitle: "INV-1029", meta: "Overdue", icon: <AlertCircleIcon className="text-destructive" /> },
    { id: 2, title: "Brand Guidelines Review", subtitle: "NovaTech", meta: "Jul 20", icon: <ClockIcon /> },
    { id: 3, title: "Mobile App MVP Kickoff", subtitle: "Bright Labs", meta: "Jul 25", icon: <CalendarIcon /> },
];

const quickActions = [
    { id: 1, title: "Add Client", icon: <UserPlusIcon />, action: <PlusIcon className="size-4" /> },
    { id: 2, title: "Create Project", icon: <BriefcaseIcon />, action: <PlusIcon className="size-4" /> },
    { id: 3, title: "Create Estimate", icon: <FileTextIcon />, action: <PlusIcon className="size-4" /> },
    { id: 4, title: "Generate Invoice", icon: <FileTextIcon />, action: <PlusIcon className="size-4" /> },
    { id: 5, title: "Record Payment", icon: <CreditCardIcon />, action: <PlusIcon className="size-4" /> },
    { id: 6, title: "View Reports", icon: <PieChartIcon />, action: <PlusIcon className="size-4" /> },
];

export function Dashboard() {
	return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Banner Section */}
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
                columns={projectsColumns} 
                data={projectsData} 
                actionLabel="View all projects"
            />
            <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
                <ProjectStatusChart className="flex-1" />
            </div>
            <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
                <BusinessHealth className="flex-1" />
            </div>

            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-2"
                title="Recent Invoices" 
                columns={invoicesColumns} 
                data={invoicesData} 
                actionLabel="View all invoices"
            />
            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-2"
                title="Recent Estimates" 
                columns={estimatesColumns} 
                data={estimatesData} 
                actionLabel="View all estimates"
            />

            <DashboardListWidget 
                className="md:col-span-2 lg:col-span-2"
                title="Activity Timeline" 
                description="Recent events across your workspace."
                items={activityTimeline} 
            />
            <DashboardListWidget 
                className="md:col-span-2 lg:col-span-1"
                title="Upcoming Deadlines" 
                description="Items requiring your attention."
                items={upcomingDeadlines} 
            />
            <DashboardListWidget 
                className="md:col-span-2 lg:col-span-1"
                title="Quick Actions" 
                items={quickActions} 
            />

            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-2"
                title="Recent Clients" 
                columns={clientsColumns} 
                data={clientsData} 
                actionLabel="View all clients"
            />
            <DashboardDataTable 
                className="md:col-span-2 lg:col-span-2"
                title="Recent Payments" 
                columns={paymentsColumns} 
                data={paymentsData} 
                actionLabel="View all payments"
            />
        </div>
    );
}
