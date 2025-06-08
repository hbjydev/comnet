import { useInitials } from '@/hooks/use-initials';
import { Unit } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

function UnitCard({ unit }: { unit: Unit }) {
    const initials = useInitials();

    return (
        <Link href={route('units.show', { unit: unit.slug })}>
            <Card className="h-fit pt-0">
                <CardHeader className="p-0">
                    {unit.banner ? <img src={unit.banner} className="aspect-16/4 rounded-t-xl object-cover" /> : <></>}

                    <CardTitle className="flex items-center gap-x-2 px-6 pt-4">
                        <Avatar className="flex items-center justify-center bg-secondary">
                            <AvatarImage src={unit.avatar} />
                            <AvatarFallback>{initials(unit.display_name)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                            <h2 className="text-xl font-semibold tracking-tight">{unit.display_name}</h2>
                            {/*<p className="text-sm text-muted-foreground">{`Created at ${unitCreated}`}</p>*/}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{unit.description ?? <i>This unit has no description.</i>}</p>
                </CardContent>

                <CardFooter>
                    <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-x-1">
                            <Users className="h-4 w-4" />
                            {unit.members_count}
                        </div>

                        <div className="flex items-center gap-x-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(unit.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

export { UnitCard };
