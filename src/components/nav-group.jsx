import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export function NavGroup({
    label,
    items
}) {
	return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarMenu>
				{items.map((item) => (
                    <SidebarMenuItem key={item.title}>
					{item.subItems?.length ? (
                        <Collapsible
                            className="group/collapsible"
                            defaultOpen={
                                !!item.isActive ||
                                item.subItems?.some((i) => !!i.isActive)
                            }
                        >
                            <CollapsibleTrigger className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0">
                                {item.icon}
                                <span className="truncate">{item.title}</span>
                                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.subItems?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton isActive={subItem.isActive} render={<Link href={subItem.path} />}>
                                                {subItem.icon}
                                                <span>{subItem.title}</span>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                    ) : (
                        <SidebarMenuButton isActive={item.isActive} render={<Link href={item.path} />}>
                            {item.icon}
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                    )}
                    </SidebarMenuItem>
				))}
			</SidebarMenu>
        </SidebarGroup>
    );
}
