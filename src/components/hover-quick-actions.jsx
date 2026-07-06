"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserPlusIcon, BriefcaseIcon, FileTextIcon, CreditCardIcon, ChevronLeftIcon } from "lucide-react";

export function HoverQuickActions() {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        { title: "Add Client", icon: <UserPlusIcon className="size-4" />, href: "/dashboard/clients" },
        { title: "Create Project", icon: <BriefcaseIcon className="size-4" />, href: "/dashboard/projects" },
        { title: "Generate Invoice", icon: <FileTextIcon className="size-4" />, href: "/dashboard/invoices" },
        { title: "Record Payment", icon: <CreditCardIcon className="size-4" />, href: "/dashboard/payments" },
    ];

    return (
        <div 
            className="fixed top-1/2 right-0 -translate-y-1/2 z-50 flex items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* The panel */}
            <div className={cn(
                "bg-card border-y border-l shadow-lg flex flex-col justify-center transition-all duration-300 ease-in-out overflow-hidden rounded-l-xl",
                isOpen ? "w-56 py-4" : "w-8 py-8 cursor-pointer hover:bg-muted/50"
            )}>
                <div className="relative w-full h-full min-h-[140px] flex items-center">
                    {/* Collapsed State */}
                    <div className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground transition-opacity duration-200",
                        isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}>
                        <ChevronLeftIcon className="size-4 mb-2" />
                        <span className="[writing-mode:vertical-rl] text-[10px] font-bold tracking-widest uppercase rotate-180 whitespace-nowrap">
                            Quick Actions
                        </span>
                    </div>

                    {/* Expanded State */}
                    <div className={cn(
                        "w-56 flex flex-col gap-1 px-3 transition-opacity duration-300 delay-100",
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none absolute"
                    )}>
                        <div className="px-2 pb-3 pt-1">
                            <h3 className="font-semibold text-sm">Quick Actions</h3>
                        </div>
                        {actions.map((action, index) => (
                            <Link 
                                key={index} 
                                href={action.href}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                            >
                                {action.icon}
                                <span className="font-medium">{action.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
