import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { GroupIcon, LayoutGrid } from 'lucide-react';
import AppLogoIcon from './app-logo-icon';
import { NavMemberships } from './nav-memberships';

const rootNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Units',
        href: '/units',
        icon: GroupIcon,
    },
];

const footerNavItems: NavItem[] = [
    //{
    //    title: 'Repository',
    //    href: 'https://github.com/laravel/react-starter-kit',
    //    icon: Folder,
    //},
    //{
    //    title: 'Documentation',
    //    href: 'https://laravel.com/docs/starter-kits#react',
    //    icon: BookOpen,
    //},
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href="/" prefetch>
                                <AppLogoIcon className="size-5 fill-current text-primary" />
                                <span className="text-base font-semibold">COMNET</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={rootNavItems} />
                <NavMemberships />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
