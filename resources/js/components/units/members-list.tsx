import { Paginator, Unit, UnitMember, User } from "@/types";
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useInitials } from "@/hooks/use-initials";
import moment from "moment";

type HydratedMember = UnitMember & {
    user: User;
};

export const MembersList = ({ unit }: { unit: Unit }) => {
    const { data, isLoading } = useQuery<{ data: Paginator<HydratedMember> }>({
        queryKey: ['unit', unit.slug, 'members'],
        queryFn: async () => {
            const resp = await fetch(route('api.unit.members', {
                unit: unit.slug,
            }));
            return await resp.json() as { data: Paginator<HydratedMember> };
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                    Members
                    <Badge>{data ? data.data.total : 0}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
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
                ): <MembersListItems members={data?.data.data!} />}
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
                <span className="text-semibold">{member.display_name ?? member.user.display_name ?? member.user.username}</span>
                <span className="text-semibold text-muted-foreground">{moment(member.created_at).toLocaleString()}</span>
            </div>
        </div>
    ));
}
