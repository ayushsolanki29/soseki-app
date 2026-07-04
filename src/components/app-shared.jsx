import { 
    LayoutGridIcon, 
    UsersIcon, 
    BriefcaseIcon, 
    FileTextIcon, 
    CreditCardIcon, 
    CheckSquareIcon, 
    ClockIcon, 
    PieChartIcon, 
    SettingsIcon, 
    HelpCircleIcon, 
    ActivityIcon, 
    FolderIcon 
} from "lucide-react";

export const navGroups = [
	{
		items: [
			{
				title: "Dashboard",
				path: "/dashboard",
				icon: <LayoutGridIcon />,
			},
		],
	},
	{
		label: "Business",
		items: [
			{
				title: "Clients",
				path: "/dashboard/clients",
				icon: <UsersIcon />,
			},
			{
				title: "Projects",
				path: "/dashboard/projects",
				icon: <FolderIcon />,
			},
		],
	},
	{
		label: "Financials",
		items: [
			{
				title: "Estimates",
				path: "#/estimates",
				icon: <FileTextIcon />,
			},
			{
				title: "Invoices",
				path: "#/invoices",
				icon: <FileTextIcon />,
			},
			{
				title: "Payments",
				path: "#/payments",
				icon: <CreditCardIcon />,
			},
		],
	},
  
	{
		label: "Organization",
		items: [
			{
				title: "Workspace",
				icon: <SettingsIcon />,
				subItems: [
					{ title: "General Settings", path: "/dashboard/workspace/settings" },
					// { title: "Team & Roles", path: "#/workspace/team" },
					// { title: "Integrations", path: "#/workspace/integrations" },
					// { title: "Billing", path: "#/workspace/billing" },
				],
			},
		],
	},
];

export const footerNavLinks = [
	{
		title: "Help Center",
		path: "#/help",
		icon: <HelpCircleIcon />,
	},
	{
		title: "System status",
		path: "#/status",
		icon: <ActivityIcon />,
	},
];

export const navLinks = [
	...navGroups.flatMap((group) =>
		group.items.flatMap((item) =>
			item.subItems?.length ? [item, ...item.subItems] : [item])),
	...footerNavLinks,
];
