"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { SuperAdminNavUser } from "@/components/super-admin-nav-user";

export function SuperAdminHeader() {
	return (
        <header
            className={cn(
                "sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 md:px-6 bg-background"
            )}>
            <div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
                    className="mr-2 h-4 data-[orientation=vertical]:self-center"
                    orientation="vertical" />
                <span className="text-sm font-medium text-muted-foreground">Administration Panel</span>
			</div>
            <div className="flex items-center gap-3">
				<SuperAdminNavUser />
			</div>
        </header>
    );
}
