import { Unit } from '@/types';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function UnitCard({ unit }: { unit: Unit }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Link href={route('units.show', { unit: unit.slug })}>{unit.display_name}</Link>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{unit.description ?? <i>This unit has no description.</i>}</p>
            </CardContent>
        </Card>
    );
}

export { UnitCard };
