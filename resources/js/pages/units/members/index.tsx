import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatName } from '@/lib/utils';
import { Paginator, SharedData, Unit, UnitMember, UnitRank, UnitSlot, User, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

type HydratedMember = UnitMember & { rank: UnitRank; slot?: UnitSlot; user: User; };

export const columns = (unitSlug: string): ColumnDef<HydratedMember>[] => [
    {
        id: 'name',
        accessorFn: row => formatName(row.rank.short_name, row.display_name, row.user.display_name, row.user.username),
        header: "Name",
        cell: ({ row }) => (
            <div className="font-semibold underline">
                <Link href={route('units.members.show', { unit: unitSlug, member: row.original.user_id })}>
                    {row.getValue('name')}
                </Link>
            </div>
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
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <Button size="icon" variant="ghost" asChild>
                    <Link href={route('units.members.edit', { unit: unitSlug, member: row.original.user_id })}>
                        <Pencil />
                    </Link>
                </Button>
                <Button size="icon" variant="ghost">
                    <Link href={route('units.members.edit', { unit: unitSlug, member: row.original.user_id })}>
                        <Trash />
                    </Link>
                </Button>
            </div>
        ),
    },
];

export default function Members() {
    const { unit, members } = usePage<SharedData & {
        unit: Unit;
        members: Paginator<HydratedMember>;
    }>().props;

    const table = useReactTable({
        data: members.data,
        columns: columns(unit.slug),
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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="first:pl-4">
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
                                        <TableCell key={cell.id} className="first:pl-4">
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
