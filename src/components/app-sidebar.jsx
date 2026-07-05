"use client";

import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NavGroup } from "@/components/nav-group";
import { footerNavLinks, navGroups } from "@/components/app-shared";
import { LatestChange } from "@/components/latest-change";
import { PlusIcon, SearchIcon } from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
    const pathname = usePathname();

    const activeNavGroups = navGroups.map(group => ({
        ...group,
        items: group.items.map(item => {
            const isItemActive = item.path === pathname || (item.path !== "/dashboard" && pathname.startsWith(item.path));
            return {
                ...item,
                isActive: isItemActive,
                subItems: item.subItems?.map(sub => ({
                    ...sub,
                    isActive: pathname === sub.path
                }))
            };
        })
    }));

	return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="h-14 justify-center">
				<SidebarMenuButton render={<Link href="/dashboard" />}><LogoIcon /><span className="font-medium">Workora</span></SidebarMenuButton>
			</SidebarHeader>
            <SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem className="flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger render={
								<SidebarMenuButton
									className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
								/>
							}>
								<PlusIcon />
								<span>New</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-56">
								<DropdownMenuItem>New Client</DropdownMenuItem>
								<DropdownMenuItem>New Project</DropdownMenuItem>
								<DropdownMenuItem>New Invoice</DropdownMenuItem>
								<DropdownMenuItem>Record Payment</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button
                            aria-label="Search conversations"
                            className="size-8 group-data-[collapsible=icon]:opacity-0"
                            size="icon"
                            variant="outline">
							<SearchIcon />
							<span className="sr-only">Search conversations</span>
						</Button>
					</SidebarMenuItem>
				</SidebarGroup>
				{activeNavGroups.map((group, index) => (
					<NavGroup key={`sidebar-group-${index}`} {...group} />
				))}
			</SidebarContent>
			<SidebarFooter>
				<LatestChange />
				<SidebarMenu className="mt-2">
					{footerNavLinks.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
                                className="text-muted-foreground"
                                isActive={item.isActive}
                                size="sm"
                                render={<Link href={item.path} />}>{item.icon}<span>{item.title}</span></SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
				<div className="mt-4 text-xs text-muted-foreground p-2 text-center">
					© 2026 Workora. All rights reserved.
				</div>
			</SidebarFooter>
        </Sidebar>
    );
}
