import AppLayout from '@/layouts/app-layout';
import UnitStructureLayout from '@/layouts/units/structure';
import { SharedData, Unit, UnitRank, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export default function Ranks() {
    const { unit, ranks } = usePage<
        SharedData & {
            unit: Unit;
            ranks: UnitRank[];
        }
    >().props;

    return (
        <AppLayout
            breadcrumbs={[
                ...breadcrumbs,
                {
                    title: unit.display_name,
                    href: `/units/${unit.slug}`,
                },
                {
                    title: 'Structure',
                    href: `/units/${unit.slug}/ranks`,
                },
                {
                    title: 'Sections',
                    href: `/units/${unit.slug}/sections`,
                },
            ]}
        >
            <UnitStructureLayout>
                <Head title="Sections" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl"></div>
            </UnitStructureLayout>
        </AppLayout>
    );
}
