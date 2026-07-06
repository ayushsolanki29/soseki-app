"use client";

import { SidebarInset, SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { LogoIcon } from "@/components/logo";
import { LayoutDashboardIcon, UsersIcon, BuildingIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperAdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { title: "Dashboard", path: "/super-admin/dashboard", icon: <LayoutDashboardIcon /> },
    { title: "Leads", path: "/super-admin/leads", icon: <UsersIcon /> },
    { title: "Organizations", path: "/super-admin/organizations", icon: <BuildingIcon /> },
  ];

  return (
    <div className="overflow-hidden">
      <SidebarProvider className="relative h-svh">
        <Sidebar collapsible="icon" variant="inset">
           <SidebarHeader className="h-14 justify-center">
              <SidebarMenuButton render={<Link href="/super-admin/dashboard" />}><LogoIcon /><span className="font-medium">Soseki Admin</span></SidebarMenuButton>
           </SidebarHeader>
           <SidebarContent>
             <SidebarGroup>
               <SidebarMenu>
                 {navItems.map((item) => (
                   <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton
                       isActive={pathname === item.path || pathname.startsWith(item.path + '/')}
                       render={<Link href={item.path} />}
                     >
                       {item.icon}
                       <span>{item.title}</span>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                 ))}
               </SidebarMenu>
             </SidebarGroup>
           </SidebarContent>
        </Sidebar>
        <SidebarInset className="md:peer-data-[variant=inset]:ml-0">
          <AppHeader />
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
