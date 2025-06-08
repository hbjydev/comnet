import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MembersList } from '@/components/units/members-list';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { SharedData, Unit, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Cog, Columns3, ExternalLink, TableCellsMerge } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export default function Show() {
    const initials = useInitials();
    const {
        unit,
        auth: { memberships },
    } = usePage<SharedData & { unit: Unit }>().props;

    const canOpenAdmin = memberships.find((v) => v.unit_id == unit.id && ['owner', 'admin'].includes(v.role));

    return (
        <AppLayout
            breadcrumbs={[
                ...breadcrumbs,
                {
                    title: unit.display_name,
                    href: `/units/${unit.slug}`,
                },
            ]}
        >
            <Head title={unit.display_name} />

            {unit.banner ? (
                <img className="h-48 bg-secondary object-cover" src={unit.banner} alt={unit.display_name} />
            ) : (
                <div className="flex h-48 items-center justify-center bg-secondary">
                    <h2 className="text-3xl font-semibold tracking-tight text-muted-foreground">{unit.display_name} has no banner</h2>
                </div>
            )}

            <div className="flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex h-4 w-full max-w-screen-xl flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 pt-2 xl:grid-cols-[auto_25rem]">
                        <div className="space-y-4">
                            <div className="flex items-center gap-x-4">
                                <Avatar className="flex h-12 w-12 items-center justify-center bg-secondary">
                                    <AvatarImage src={unit.avatar} />
                                    <AvatarFallback>{initials(unit.display_name)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-0.5">
                                    <h2 className="text-xl font-semibold tracking-tight">{unit.display_name}</h2>
                                    <p className="text-sm text-muted-foreground">{`Created at ${new Date(unit.created_at).toLocaleDateString()}`}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-4">
                                <HeadingSmall title="Description" />

                                {unit.description}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-x-2">
                                <Button asChild>
                                    <Link href={route('units.orbat', { unit: unit.slug })}>
                                        <TableCellsMerge />
                                        ORBAT
                                        <ExternalLink />
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('units.ranks.index', { unit: unit.slug })}>
                                        <Columns3 />
                                        Structure
                                        <ExternalLink />
                                    </Link>
                                </Button>
                                {canOpenAdmin && (
                                    <Button asChild>
                                        <Link href={route('units.edit', { unit: unit.slug })}>
                                            <Cog />
                                            Admin
                                            <ExternalLink />
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            <MembersList unit={unit} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
