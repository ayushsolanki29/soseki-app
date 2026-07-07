import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { OrganizationProvider } from "@/components/providers/organization-provider";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { APP_NAME, APP_VERSION, APP_AUTHOR, APP_AUTHOR_URL, APP_GITHUB_URL } from "@/lib/constants";

export function AppShell({
    children
}) {
	return (
        <div className="overflow-hidden">
            <OrganizationProvider>
                <SidebarProvider className="relative h-svh">
                    <AppSidebar />
                    <SidebarInset className="md:peer-data-[variant=inset]:ml-0 min-w-0">
                        <AppHeader />
                        <div className="flex flex-1 flex-col gap-4 overflow-y-auto min-w-0">
                            <div className="flex-1 p-4 md:p-6 flex flex-col gap-4 min-w-0">
                                {children}
                            </div>
                            
                            <footer className="mt-auto pt-8 pb-4 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/70">
                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-semibold text-muted-foreground tracking-tight">{APP_NAME}</span>
                                        <span className="text-[9px] bg-muted/60 text-muted-foreground px-1.5 py-0.5 rounded-md font-medium uppercase tracking-wider">{APP_VERSION}</span>
                                    </div>
                                    <span className="hidden sm:inline text-muted-foreground/40">&bull;</span>
                                    <span>Designed & Built by <a href={APP_AUTHOR_URL} target="_blank" rel="noreferrer" className="font-medium hover:text-foreground hover:underline transition-colors">{APP_AUTHOR}</a></span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link href="/terms" className="hover:text-foreground transition-colors hover:underline">Terms</Link>
                                    <Link href="/privacy" className="hover:text-foreground transition-colors hover:underline">Privacy</Link>
                                    <Link href="/security" className="hover:text-foreground transition-colors hover:underline">Security</Link>
                                    <span className="hidden sm:inline text-muted-foreground/40">&bull;</span>
                                    <a href={APP_GITHUB_URL} target="_blank" rel="noreferrer" className="group hover:text-foreground transition-colors flex items-center gap-1.5">
                                        <StarIcon className="size-3.5 group-hover:fill-amber-400 group-hover:text-amber-400 transition-colors" /> 
                                        <span>Star on GitHub</span>
                                    </a>
                                </div>
                            </footer>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </OrganizationProvider>
        </div>
    );
}
