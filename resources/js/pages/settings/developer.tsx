import HeadingSmall from "@/components/heading-small";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { BreadcrumbItem, SharedDataAuthed } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Developer settings',
        href: '/settings/developer',
    },
];

export default function Developer() {
    const { auth } = usePage<SharedDataAuthed>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Developer settings" description="Manage your API keys and developer access" />
                </div>
            </SettingsLayout>
        </AppLayout>
    );

}
