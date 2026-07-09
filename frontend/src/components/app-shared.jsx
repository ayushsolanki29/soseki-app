import { 
    LayoutGridIcon, 
    UsersIcon, 
    FileTextIcon, 
    CreditCardIcon, 
    CheckSquareIcon, 
    SettingsIcon, 
    HelpCircleIcon, 
    ActivityIcon, 
    FolderIcon,
    ReceiptIcon,
    UserCircleIcon,
    UploadCloudIcon,
    SparklesIcon
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
			{
				title: "Questionnaires",
				path: "/dashboard/questionnaires",
				icon: <CheckSquareIcon />,
			},
		],
	},
	{
		label: "Financials",
		items: [

			{
				title: "Invoices",
				path: "/dashboard/invoices",
				icon: <FileTextIcon />,
			},
			{
				title: "Payments",
				path: "/dashboard/payments",
				icon: <CreditCardIcon />,
			},
			{
				title: "Expenses",
				path: "/dashboard/expenses",
				icon: <ReceiptIcon />,
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
				],
			},
			{
				title: "Manage Profile",
				path: "/dashboard/profile",
				icon: <UserCircleIcon />,
			},
			{
				title: "Support Tickets",
				path: "/dashboard/support",
				icon: <HelpCircleIcon />,
			},
			{
				title: "Data Migration",
				path: "/dashboard/migration",
				icon: <UploadCloudIcon />,
			},
		],
	},
];

export const footerNavLinks = [
	{
		title: "Help Center",
		path: "/dashboard/support",
		icon: <HelpCircleIcon />,
	},
	{
		title: "What's new",
		path: "#/whats-new",
		icon: <SparklesIcon />,
	},
];

export const navLinks = [
	...navGroups.flatMap((group) =>
		group.items.flatMap((item) =>
			item.subItems?.length ? [item, ...item.subItems] : [item])),
	...footerNavLinks,
];
