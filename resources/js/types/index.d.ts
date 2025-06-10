import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user?: User;
    memberships: (UnitMember & { unit: Unit })[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type SharedDataAuthed = SharedData & {
    auth: Required<Auth>;
};

export interface User {
    id: string;
    username: string;
    display_name?: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface UnitRank {
    unit_id: string;
    display_name: string;
    short_name: string;
    created_at: string;
    updated_at: string;
}

export interface UnitSection {
    unit_id: string;
    display_name: string;
    icon?: string;
    description?: string;
    sections: UnitSection[];
    slots: UnitSlot[];
    created_at: string;
    updated_at: string;
}

export interface UnitSlot {
    unit_id: string;
    display_name: string;
    created_at: string;
    updated_at: string;
}

export interface UnitMember {
    id: string;
    user_id?: string;
    unit_id: string;
    display_name: string;
    role: 'owner' | 'admin' | 'normal' | 'banned';
    created_at: string;
    updated_at: string;
}

export interface Unit {
    id: string;
    display_name: string;
    description?: string;
    slug: string;
    avatar?: string;
    banner?: string;
    members_count?: number;
    ranks_count?: number;
    sections_count?: number;
    created_at: string;
    updated_at: string;
}

export interface PaginatorLink {
    url?: string;
    label: string;
    active: boolean;
}

export interface Paginator<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginatorLink[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
