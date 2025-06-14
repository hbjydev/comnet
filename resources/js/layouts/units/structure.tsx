import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Unit, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, TableCellsMerge } from 'lucide-react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Ranks',
        href: '/ranks',
        icon: Award,
    },
    {
        title: 'Sections',
        href: '/sections',
        icon: TableCellsMerge,
    },
];

export default function UnitStructureLayout({ children }: PropsWithChildren) {
    const { unit } = usePage<{ unit: Unit }>().props;

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Structure" description={`Unit personnel layouts for ${unit.display_name}`} />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath.endsWith(item.href),
                                })}
                            >
                                <Link href={`/units/${unit.slug}${item.href}`} prefetch>
                                    {item.icon && <item.icon />}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-full">
                    <section className="max-w-full space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
