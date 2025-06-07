import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMemberships() {
    const { props, ...page } = usePage<SharedData>();

    if (props.auth.memberships.length == 0) return;

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                <SidebarGroupLabel>Your Units</SidebarGroupLabel>
                {props.auth.memberships.map((item) => (
                    <SidebarMenuItem key={item.unit.display_name}>
                        <SidebarMenuButton asChild isActive={page.url.startsWith(`/units/${item.unit.slug}`)} tooltip={{ children: item.unit.display_name }}>
                            <Link href={route('units.show', { unit: item.unit.slug })} prefetch>
                                {/*item.icon && <item.icon />*/}
                                <span>{item.unit.display_name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
