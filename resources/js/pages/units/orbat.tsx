import { OrbatSection } from '@/components/units/orbat-section';
import AppLayout from '@/layouts/app-layout';
import { Unit, UnitSection, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import 'treeflex/dist/css/treeflex.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export default function Show() {
    const { unit, sections } = usePage<{
        unit: Unit;
        sections: UnitSection[];
    }>().props;

    const sectionsMap = sections.map((v, key) => <OrbatSection section={v} key={key} />);

    return (
        <AppLayout
            breadcrumbs={[
                ...breadcrumbs,
                {
                    title: unit.display_name,
                    href: `/units/${unit.slug}`,
                },
                {
                    title: 'ORBAT',
                    href: `/units/${unit.slug}/orbat`,
                },
            ]}
        >
            <Head title={unit.display_name} />

            <div className="flex flex-col items-center justify-center">
                <div className="tf-tree" id="orbat_root">
                    <ul>{sectionsMap}</ul>
                </div>
            </div>
        </AppLayout>
    );
}
