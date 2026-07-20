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
import { UserIcon, LogOutIcon } from "lucide-react";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";

import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { useOrganization } from "@/components/providers/organization-provider";



export function NavUser() {
    const router = useRouter();
    const { organization } = useOrganization();
    const orgName = organization?.name || "Soseki Workspace";
    const [user, setUser] = useState({ name: "Loading...", email: "" });

    useEffect(() => {
        API.get("/auth/me").then((userRes) => {
            setUser(userRes.data.user);
        }).catch(() => {
            setUser({ name: "User", email: "" });
        });
    }, []);

    const handleLogout = async () => {
        try {
            await API.post("/auth/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            toast.error("Failed to log out");
        }
    };

	return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0">
                <Avatar className="size-8">
                    <DynamicAvatar type="organization" seed={orgName} size={32} />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
				<DropdownMenuItem className="flex items-center justify-start gap-2">
					<DropdownMenuLabel className="flex items-center gap-3">
						<Avatar className="size-10">
							<DynamicAvatar type="user" seed={user?.name || user?.email || "User"} size={40} />
						</Avatar>
						<div className="flex flex-col">
							<span className="font-semibold text-sm text-foreground">{user?.name || "User"}</span>
							{orgName && user?.name && orgName.toLowerCase() !== user.name.toLowerCase() && (
								<span className="text-xs text-foreground mt-0.5">{orgName}</span>
							)}
							<div
                                className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground text-xs mt-1">
								{user.email}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem render={
						<Link href="/dashboard/profile" className="flex items-center w-full cursor-pointer" />
					}>
						<UserIcon className="mr-2 size-4" />
						Profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="w-full cursor-pointer" variant="destructive" onClick={handleLogout}>
						<LogOutIcon />
						Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
        </DropdownMenu>
    );
}
