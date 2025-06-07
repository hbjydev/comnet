import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NavMemberships() {
    const initials = useInitials();
    const { props, ...page } = usePage<SharedData>();

    if (props.auth.memberships.length == 0) return;

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                <SidebarGroupLabel>Your Units</SidebarGroupLabel>
                {props.auth.memberships.map((item, key) => {
                    const active = page.url.startsWith(`/units/${item.unit.slug}`);
                    return (
                        <Collapsible defaultOpen={active} className="group/collapsible" key={key}>
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost">
                                            <div className="flex gap-x-2 items-center text-sidebar-primary">
                                                <Avatar>
                                                    <AvatarImage src={item.unit.avatar} />
                                                    <AvatarFallback>{initials(item.unit.display_name)}</AvatarFallback>
                                                </Avatar>
                                                <span>{item.unit.display_name}</span>
                                            </div>
                                            <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Button>
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenuItem key={item.unit.display_name}>
                                            <SidebarMenuButton asChild isActive={active} tooltip={{ children: item.unit.display_name }}>
                                                <Link href={route('units.show', { unit: item.unit.slug })} prefetch>
                                                    Dashboard
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
