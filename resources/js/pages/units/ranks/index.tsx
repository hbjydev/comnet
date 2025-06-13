import { DragHandle, SortableTable } from '@/components/sortable-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import UnitStructureLayout from '@/layouts/units/structure';
import { SharedData, Unit, UnitRank, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export const columns = (_unitSlug: string): ColumnDef<UnitRank>[] => [
    {
        id: 'drag',
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
        accessorKey: 'display_name',
        header: 'Name',
    },
    {
        accessorKey: 'short_name',
        header: 'Short',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row: _row }) => (
            <div className="flex items-center gap-x-2">
                <Button size="icon" variant="ghost">
                    <Pencil />
                </Button>
                <Button size="icon" variant="ghost">
                    <Trash />
                </Button>
            </div>
        ),
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
                    title: 'Ranks',
                    href: `/units/${unit.slug}/ranks`,
                },
            ]}
        >
            <UnitStructureLayout>
                <Head title="Ranks" />
                <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                    <SortableTable data={ranks} columns={columns(unit.slug)} idKey="id" />
                </div>
            </UnitStructureLayout>
        </AppLayout>
    );
}
