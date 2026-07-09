"use client";

import { useState, useEffect } from "react";
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
import { PlusIcon, SearchIcon, UserIcon, FolderIcon, FileTextIcon, CreditCardIcon, CheckSquareIcon, HelpCircleIcon } from "lucide-react";
import { GlobalSearch } from "@/components/global-search";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

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
				<SidebarMenuButton render={<Link href="/dashboard" />}><LogoIcon /><span className="font-medium">Soseki</span></SidebarMenuButton>
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
								<DropdownMenuItem>
									<UserIcon className="mr-2 size-4" />
									New Client
								</DropdownMenuItem>
								<DropdownMenuItem>
									<FolderIcon className="mr-2 size-4" />
									New Project
								</DropdownMenuItem>
								<DropdownMenuItem>
									<FileTextIcon className="mr-2 size-4" />
									New Invoice
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCardIcon className="mr-2 size-4" />
									Record Payment
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CheckSquareIcon className="mr-2 size-4" />
									New Questionnaire
								</DropdownMenuItem>
								<DropdownMenuItem>
									<HelpCircleIcon className="mr-2 size-4" />
									New Support Ticket
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Tooltip>
							<TooltipTrigger delay={500} render={
								<Button
									aria-label="Search"
									className="size-8 group-data-[collapsible=icon]:opacity-0"
									size="icon"
									variant="outline"
									onClick={() => setSearchOpen(true)}
								/>
							}>
								<SearchIcon />
								<span className="sr-only">Search</span>
							</TooltipTrigger>
							<TooltipContent className="px-2 py-1" side="right">
								Search{" "}
								<KbdGroup>
									<Kbd>⌘</Kbd>
									<Kbd>k</Kbd>
								</KbdGroup>
							</TooltipContent>
						</Tooltip>
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
				<div className="mt-4 text-[10px] text-muted-foreground p-2 text-center group-data-[collapsible=icon]:hidden">
					© 2026 Soseki. All rights reserved.
				</div>
			</SidebarFooter>
            <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </Sidebar>
    );
}
