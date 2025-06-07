import { Unit } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";

function UnitCard({ unit }: { unit: Unit }) {
    return (
        <Card>
            <CardHeader>{unit.display_name}</CardHeader>
            <CardContent>
                <p>{unit.description ?? <i>This unit has no description.</i>}</p>
            </CardContent>
        </Card>
    );
}

export { UnitCard };
