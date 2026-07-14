"use client";
import { useState, useEffect } from "react";

import {
	Avatar,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import API from "@/lib/api";

export function SuperAdminNavUser() {
    const router = useRouter();
    const [user, setUser] = useState({ name: "Loading...", email: "" });

    useEffect(() => {
        // We could fetch a /api/super-admin/me route, but for now we'll just show "Super Admin"
        setUser({ name: "Super Admin", email: "admin@soseki.com" });
    }, []);

    const handleLogout = async () => {
        try {
            // We need a super-admin logout route, or we can just delete cookies client-side or use a common logout if it handles both
            // Let's call a specific super-admin logout or clear the cookie
            await API.post("/super-admin/auth/logout");
            toast.success("Logged out successfully");
            window.location.href = "/super-admin/login";
        } catch (error) {
            toast.error("Failed to log out");
        }
    };

	return (
		<DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0">
                <Avatar className="size-8">
                    <DynamicAvatar type="superadmin" seed="super-admin" size={32} />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
				<DropdownMenuItem className="flex items-center justify-start gap-2">
					<DropdownMenuLabel className="flex items-center gap-3">
						<Avatar className="size-10">
							<DynamicAvatar type="superadmin" seed="super-admin" size={40} />
						</Avatar>
						<div className="flex flex-col">
							<span className="font-semibold text-sm text-foreground">{user.name}</span>
							<div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground text-xs mt-1">
								{user.email}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="w-full cursor-pointer" variant="destructive" onClick={handleLogout}>
						<LogOutIcon className="mr-2 size-4" />
						Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
        </DropdownMenu>
    );
}
