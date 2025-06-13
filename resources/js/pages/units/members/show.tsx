import AppLayout from '@/layouts/app-layout';
import { formatName } from '@/lib/utils';
import type { BreadcrumbItem, SharedData, Unit, UnitMember, UnitRank, UnitSlot, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

type HydratedMember = UnitMember & { rank: UnitRank; slot?: UnitSlot; user: User };

export default function MemberEdit() {
    const initials = useInitials();
    const { unit, member } = usePage<
        SharedData & {
            unit: Unit;
            member: HydratedMember;
        }
    >().props;
    const name = formatName(member.rank.short_name, member.display_name, member.user.display_name, member.user.username);

    return (
        <AppLayout
            breadcrumbs={[
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
                    href: `/units/${unit.slug}/members`,
                },
            ]}
        >
            <Head title={name} />
            <div className="h-48 bg-secondary flex items-center justify-center">
                <div className="flex flex-col gap-4 items-center">
                    <Avatar className="size-20">
                        <AvatarImage src={member.user.avatar} />
                        <AvatarFallback>{initials(name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-semibold">{name}</span>
                        <span className="text-sm italic text-muted-foreground">Joined {new Date(member.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                Profile Data
            </div>
        </AppLayout>
    );
}
