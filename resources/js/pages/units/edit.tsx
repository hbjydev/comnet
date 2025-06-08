import AppLayout from '@/layouts/app-layout';
import { SharedData, Unit, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export default function Edit() {
    const { unit } = usePage<SharedData & { unit: Unit }>().props;

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
        </AppLayout>
    );
}
