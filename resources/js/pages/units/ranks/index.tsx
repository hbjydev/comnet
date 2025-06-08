import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import UnitStructureLayout from '@/layouts/units/structure';
import { SharedData, Unit, UnitRank, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export const columns = (unitSlug: string): ColumnDef<UnitRank>[] => [
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
        cell: ({ row }) => (
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

    const table = useReactTable({
        data: ranks,
        columns: columns(unit.slug),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

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
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="first:pl-4">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="first:pl-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns(unit.slug).length} className="h-24 text-center">
                                        No ranks configured.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </UnitStructureLayout>
        </AppLayout>
    );
}
