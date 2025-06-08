import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UnitCard } from '@/components/units/unit-card';
import AppLayout from '@/layouts/app-layout';
import { Paginator, SharedData, Unit, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export default function Units() {
    const { units } = usePage<
        SharedData & {
            units: Paginator<Unit>;
        }
    >().props;

    const onPerPageChanged = (val: string) => {
        router.visit(
            route('units.index', {
                per_page: val,
            }),
            { preserveState: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Units" />

            <div className="flex items-center justify-between space-x-2 p-4">
                <div className="text-sm text-muted-foreground">
                    Showing {units.per_page} of {units.total} units.
                </div>
                <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <span className="w-fit text-sm text-muted-foreground">Per page:</span>
                        <Select onValueChange={onPerPageChanged} defaultValue={units.per_page.toString()}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Per page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center">
                        {units.links.map((link, idx) => (
                            <Button
                                key={idx}
                                variant={link.active ? 'secondary' : 'outline'}
                                size="icon"
                                className="rounded-none first:rounded-l-md last:rounded-r-md"
                                asChild
                            >
                                <Link href={link.url!}>
                                    {link.label == '&laquo; Previous' ? <ArrowLeft /> : link.label == 'Next &raquo;' ? <ArrowRight /> : link.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid h-full flex-1 grid-cols-1 gap-4 overflow-x-auto rounded-xl p-4 lg:grid-cols-4 xl:grid-cols-3">
                {units.data.map((unit, key) => (
                    <UnitCard unit={unit} key={key} />
                ))}
            </div>
        </AppLayout>
    );
}
