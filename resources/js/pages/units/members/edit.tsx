import AppLayout from '@/layouts/app-layout';
import { formatName } from '@/lib/utils';
import type { SharedData, Unit, UnitMember, UnitRank, UnitSlot, User, BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

type HydratedMember = UnitMember & { rank: UnitRank; slot?: UnitSlot; user: User; };

export default function MemberEdit() {
    const { unit, member } = usePage<SharedData & {
        unit: Unit;
        member: HydratedMember;
    }>().props;
    const name = formatName(member.rank.short_name, member.display_name, member.user.display_name, member.user.username);

    return (
        <AppLayout breadcrumbs={[
            ...breadcrumbs,
            {
                title: unit.display_name,
                href: `/units/${unit.slug}`,
            },
            {
                title: 'Members',
                href: `/units/${unit.slug}/members`,
            },
            {
                title: name,
                href: `/units/${unit.slug}/members/${member.user_id}`,
            },
            {
                title: 'Edit',
                href: `/units/${unit.slug}/members/${member.user_id}/edit`,
            },
        ]}>
            <Head title={name} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl overflow-x-auto">
            </div>
        </AppLayout>
    );
}
