import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MembersList } from '@/components/units/members-list';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { SharedData, Unit, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { AvatarFallback } from '@radix-ui/react-avatar';
import moment from 'moment';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Units',
        href: '/units',
    },
];

export default function Show() {
    const initials = useInitials();
    const { unit } = usePage<SharedData & { unit: Unit }>().props;

    const unitCreated = moment(unit.created_at);

    return (
        <AppLayout breadcrumbs={[...breadcrumbs, {
            title: unit.display_name,
            href: `/units/${unit.slug}`
        }]}>
            <Head title={unit.display_name} />

            {
                unit.banner
                    ? <img className="bg-secondary h-48" src={unit.banner} alt={unit.display_name} />
                    : (
                        <div className="h-48 bg-secondary flex items-center justify-center">
                            <h2 className="text-3xl text-muted-foreground font-semibold tracking-tight">{unit.display_name} has no banner</h2>
                        </div>
                    )
            }

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto items-center">
                <div className="max-w-screen-xl w-full flex flex-col gap-4 h-4">
                    <div className="flex items-center gap-x-4">
                        <Avatar className="w-12 h-12 bg-secondary flex items-center justify-center">
                            <AvatarImage src={unit.avatar} />
                            <AvatarFallback>{initials(unit.display_name)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                            <h2 className="text-xl font-semibold tracking-tight">{unit.display_name}</h2>
                            <p className="text-sm text-muted-foreground">{`Created at ${unitCreated}`}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-[auto_25rem] gap-4">
                        <div className="space-y-4 pt-2">
                            <div className="flex flex-col gap-y-4">
                                <HeadingSmall title="Description" />

                                {unit.description}
                            </div>

                        </div>
                        <div className="space-y-4">
                            <MembersList unit={unit} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
