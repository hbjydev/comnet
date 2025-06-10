import { useInitials } from '@/hooks/use-initials';
import { formatName } from '@/lib/utils';
import { Paginator, Unit, UnitMember, UnitRank, User } from '@/types';
import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

type HydratedMember = UnitMember & {
    user: User;
    rank: UnitRank;
};

export const MembersList = ({ unit }: { unit: Unit }) => {
    const { data, isLoading } = useQuery<{ data: Paginator<HydratedMember> }>({
        queryKey: ['unit', unit.slug, 'members'],
        queryFn: async () => {
            const resp = await fetch(
                route('api.units.members.index', {
                    unit: unit.slug,
                    per_page: 5,
                }),
            );
            return (await resp.json()) as { data: Paginator<HydratedMember> };
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        Members
                        <Badge>{data ? data.data.total : 0}</Badge>
                    </div>
                    <Button size="sm" variant="link" asChild>
                        <Link href={route('units.members.index', { unit: unit.slug })}>View all</Link>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-4">
                {isLoading ? (
                    [...Array(5)].map((_, idx) => (
                        <div className="flex items-center space-x-4" key={idx}>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                ) : (
                    <MembersListItems members={(data ?? { data: { data: [] } }).data.data!} />
                )}
            </CardContent>
        </Card>
    );
};

export const MembersListItems = ({ members }: { members: HydratedMember[] }) => {
    const initials = useInitials();

    return members.map((member, idx) => (
        <div className="flex items-center space-x-4" key={idx}>
            <Avatar>
                <AvatarImage src={member.user.avatar} alt={member.display_name} />
                <AvatarFallback>{initials(member.display_name ?? member.user.display_name ?? member.user.username)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-x-1">
                <span className="text-semibold">
                    {formatName(member.rank.short_name, member.display_name, member.user.display_name, member.user.username)}
                </span>
                <span className="text-semibold text-muted-foreground">Member since {new Date(member.created_at).toLocaleDateString()}</span>
            </div>
        </div>
    ));
};
