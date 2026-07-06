"use client";

import { SidebarInset, SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenuButton, SidebarMenuItem, SidebarMenu, SidebarGroup, SidebarFooter } from "@/components/ui/sidebar";
import { SuperAdminHeader } from "@/components/super-admin-header";
import { LogoIcon } from "@/components/logo";
import { NavGroup } from "@/components/nav-group";
import { LayoutDashboardIcon, UsersIcon, BuildingIcon, SearchIcon, PlusIcon, FolderIcon, UserIcon, TicketIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AddUserModal } from "@/components/add-user-modal";

export default function SuperAdminLayout({ children }) {
  const pathname = usePathname();

  const rawNavGroups = [
    {
      items: [
        {
          title: "Dashboard",
          path: "/super-admin/dashboard",
          icon: <LayoutDashboardIcon />,
        },
      ],
    },
    {
      label: "CRM",
      items: [
        {
          title: "Organizations",
          path: "/super-admin/organizations",
          icon: <BuildingIcon />,
        },

        {
          title: "Requested Access",
          path: "/super-admin/access-requests",
          icon: <UsersIcon />,
        },
      ],
    },
    {
      label: "System",
      items: [
        {
          title: "Tickets",
          path: "/super-admin/tickets",
          icon: <TicketIcon />,
        },
        {
          title: "Settings",
          path: "/super-admin/settings",
          icon: <SettingsIcon />,
        }
      ],
    },
  ];

  const activeNavGroups = rawNavGroups.map(group => ({
      ...group,
      items: group.items.map(item => {
          const isItemActive = item.path === pathname || (item.path !== "/super-admin/dashboard" && pathname.startsWith(item.path));
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
    <div className="overflow-hidden">
      <SidebarProvider className="relative h-svh">
        <Sidebar collapsible="icon" variant="inset">
           <SidebarHeader className="h-14 justify-center">
              <SidebarMenuButton render={<Link href="/super-admin/dashboard" />}><LogoIcon /><span className="font-medium">Soseki Admin</span></SidebarMenuButton>
           </SidebarHeader>
           
           <SidebarContent>
             {/* New Button & Search */}
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
                                <BuildingIcon className="mr-2 size-4" />
                                Add Organization
                            </DropdownMenuItem>
                            <AddUserModal trigger={
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <UserIcon className="mr-2 size-4" />
                                    Add User
                                </DropdownMenuItem>
                            } />
                            <DropdownMenuItem>
                                <TicketIcon className="mr-2 size-4" />
                                Create Ticket
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        aria-label="Search"
                        className="size-8 group-data-[collapsible=icon]:opacity-0"
                        size="icon"
                        variant="outline">
                        <SearchIcon />
                    </Button>
                </SidebarMenuItem>
             </SidebarGroup>

             {/* Nav Groups */}
             {activeNavGroups.map((group, index) => (
                <NavGroup key={`superadmin-group-${index}`} {...group} />
             ))}
           </SidebarContent>

           <SidebarFooter>
               <div className="mt-4 text-[10px] text-muted-foreground p-2 text-center group-data-[collapsible=icon]:hidden">
                    © 2026 Soseki Admin.
                </div>
           </SidebarFooter>
        </Sidebar>

        <SidebarInset className="md:peer-data-[variant=inset]:ml-0">
          <SuperAdminHeader />
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-muted/20">
            <div className="flex-1 p-4 md:p-6 flex flex-col gap-4">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
