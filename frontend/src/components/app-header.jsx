"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { navLinks } from "@/components/app-shared";
import { NavUser } from "@/components/nav-user";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import API from "@/lib/api";
import { useOrganization } from "@/components/providers/organization-provider";

const activeItem = navLinks.find((item) => item.isActive);

export function AppHeader() {
    const { organization } = useOrganization();
    const orgName = organization?.name || "";
	return (
        <header
            className={cn(
                "sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 md:px-6"
            )}>
            <div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
                    className="mr-2 h-4 data-[orientation=vertical]:self-center"
                    orientation="vertical" />
				<AppBreadcrumbs page={activeItem} />
			</div>
            <div className="flex items-center gap-3">
                {orgName && (
                    <Badge variant="secondary" className="px-3 py-1 text-sm font-medium rounded-full hidden sm:flex bg-muted/50 text-foreground">
                        {orgName}
                    </Badge>
                )}
				<Separator
                    className="h-4 data-[orientation=vertical]:self-center"
                    orientation="vertical" />
				<NavUser />
			</div>
        </header>
    );
}
