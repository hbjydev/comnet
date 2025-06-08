import { UnitCard } from '@/components/units/unit-card';
import AppLayout from '@/layouts/app-layout';
import { Paginator, SharedData, Unit, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export default function Dashboard() {
    const { units } = usePage<
        SharedData & {
            units: Paginator<Unit>;
        }
    >().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Units" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {units.data.map((unit, key) => (
                    <UnitCard unit={unit} key={key} />
                ))}
            </div>
        </AppLayout>
    );
}
