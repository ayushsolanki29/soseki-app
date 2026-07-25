"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { OrganizationProvider } from "@/components/providers/organization-provider";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { APP_NAME, APP_VERSION } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { EmailVerificationPopup } from "@/components/email-verification-popup";

export function AppShell({
    children
}) {
    const pathname = usePathname();
    const isPreview = pathname?.endsWith("/preview");

    if (isPreview) {
        return (
            <div className="overflow-hidden bg-white min-h-screen">
                <OrganizationProvider>
                    {children}
                </OrganizationProvider>
            </div>
        );
    }

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
                            <footer className="mt-auto pt-8 pb-4 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
                                <div className="flex items-center gap-2">
                                    <Logo className="h-4 w-auto" />
                                    <span className="font-semibold text-muted-foreground tracking-tight">{APP_NAME}</span>
                                    <span className="text-[9px] bg-muted/60 text-muted-foreground px-1.5 py-0.5 rounded-md font-medium uppercase tracking-wider">{APP_VERSION}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link href="/terms" className="hover:text-foreground transition-colors hover:underline">Terms</Link>
                                    <Link href="/privacy-policy" className="hover:text-foreground transition-colors hover:underline">Privacy</Link>
                                    <Link href="/my-data" className="hover:text-foreground transition-colors hover:underline">My Data</Link>
                                </div>
                            </footer>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
                <EmailVerificationPopup />
            </OrganizationProvider>
        </div>
    );
}
