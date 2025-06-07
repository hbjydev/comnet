import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatName } from '@/lib/utils';
import { Paginator, SharedData, Unit, UnitMember, UnitRank, UnitSlot, User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

type HydratedMember = UnitMember & { rank: UnitRank; slot?: UnitSlot; user: User; };

export const columns: ColumnDef<HydratedMember>[] = [
    {
        id: 'name',
        accessorFn: row => formatName(row.rank.short_name, row.display_name, row.user.display_name, row.user.username),
        header: "Name",
        cell: ({ row }) => (
          <div className="font-semibold">{row.getValue('name')}</div>
        ),
    },
    {
        accessorFn: row => row.rank.display_name,
        header: 'Rank',
    },
    {
        accessorFn: row => row.slot ? row.slot.display_name : 'Unassigned',
        header: 'Role',
    },
    {
        accessorFn: row => new Date(row.created_at).toLocaleDateString(),
        header: 'Date Joined',
    }
];

export default function Members() {
    const { unit, members } = usePage<SharedData & {
        unit: Unit;
        members: Paginator<HydratedMember>;
    }>().props;

    const table = useReactTable({
        data: members.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

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
        ]}>
            <Head title="Members" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>

                </Table>
            </div>
        </AppLayout>
    );
}
