"use client";
import { useState, useEffect } from "react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
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
import { UserIcon, BellIcon, CommandIcon, LifeBuoyIcon, GraduationCapIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";

import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { toast } from "sonner";

const user = {
	name: "Ayush Solanki",
	email: "ayush@workora.com",
	avatar: "https://github.com/ayushsolanki29.png",
};

export function NavUser() {
    const router = useRouter();
    const [orgName, setOrgName] = useState("Loading...");

    useEffect(() => {
        API.get("/organization")
            .then(res => setOrgName(res.data.organization.name))
            .catch(() => setOrgName("Workora Workspace"));
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
            <DropdownMenuTrigger render={<button className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring" />}>
                <Avatar className="size-8">
                    <DynamicAvatar type="organization" seed={orgName} size={32} />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
				<DropdownMenuItem className="flex items-center justify-start gap-2">
					<DropdownMenuLabel className="flex items-center gap-3">
						<Avatar className="size-10">
							<DynamicAvatar type="organization" seed={orgName} size={40} />
						</Avatar>
						<div className="flex flex-col">
							<span className="font-semibold text-sm text-foreground">{orgName}</span>
							<span className="text-xs text-foreground mt-0.5">{user.name}</span>
							<div
                                className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground text-xs">
								{user.email}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon />
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
