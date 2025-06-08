import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useInitials } from '@/hooks/use-initials';
import { MemberRoleLabel } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDownIcon, Columns3, LayoutDashboard, Plus, TableCellsMerge, Users } from 'lucide-react';

export function NavMemberships() {
    const initials = useInitials();
    const { props, ...page } = usePage<SharedData>();

    if (!props.auth.user) return;

    return (
        <SidebarGroup className="px-0">
            <SidebarMenu>
                <SidebarGroupLabel>
                    <div className="flex w-full items-center justify-between">
                        <span>Your Units</span>
                        <Button size="sm" variant="outline" asChild>
                            <Link href={route('units.create')}>
                                <Plus className="h-6" /> Create
                            </Link>
                        </Button>
                    </div>
                </SidebarGroupLabel>
                {props.auth.memberships.map((item, key) => {
                    const active = page.url.startsWith(`/units/${item.unit.slug}`);
                    const activeRoute = (route: string | string[], exact: boolean = false) => {
                        if (Array.isArray(route)) {
                            for (const currentRoute of route) {
                                const path = `/units/${item.unit.slug}${currentRoute}`;
                                if (exact && page.url == path) return true;
                                if (page.url.startsWith(path)) return true;
                            }
                            return false;
                        }
                        const path = `/units/${item.unit.slug}${route}`;
                        if (exact) return page.url == path;
                        return page.url.startsWith(path);
                    };
                    return (
                        <Collapsible defaultOpen={active} className="group/collapsible" key={key}>
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" className="h-10">
                                            <div className="flex items-center gap-x-2 text-sidebar-primary">
                                                <Avatar>
                                                    <AvatarImage src={item.unit.avatar} />
                                                    <AvatarFallback>{initials(item.unit.display_name)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col items-start gap-x-2">
                                                    <span>{item.unit.display_name}</span>
                                                    <span className="text-muted-foreground">{MemberRoleLabel[item.role]}</span>
                                                </div>
                                            </div>
                                            <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </Button>
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent className="mt-4 space-y-1">
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={activeRoute('', true)}
                                                tooltip={{ children: 'Dashboard' }}
                                            >
                                                <Link href={route('units.show', { unit: item.unit.slug })} prefetch>
                                                    <LayoutDashboard />
                                                    Dashboard
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={activeRoute([
                                                    '/ranks',
                                                    '/sections',
                                                ])}
                                                tooltip={{ children: 'Structure' }}
                                            >
                                                <Link href={route('units.ranks.index', { unit: item.unit.slug })} prefetch>
                                                    <Columns3 />
                                                    Structure
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={activeRoute('/members')}
                                                tooltip={{ children: 'Members' }}
                                            >
                                                <Link href={route('units.members.index', { unit: item.unit.slug })} prefetch>
                                                    <Users />
                                                    Members
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={activeRoute('/orbat')}
                                                tooltip={{ children: 'ORBAT' }}
                                            >
                                                <Link href={route('units.orbat', { unit: item.unit.slug })} prefetch>
                                                    <TableCellsMerge />
                                                    ORBAT
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
