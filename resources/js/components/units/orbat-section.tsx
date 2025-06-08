import { UnitSection } from "@/types";
import { Slots } from "./slots";

type OrbatSectionProps = {
    section: UnitSection;
};

export const OrbatSection = ({ section }: OrbatSectionProps) => {
    return (
        <li className="before:border-zinc-600!">
            <div className="tf-nc flex! flex-col border-zinc-600! rounded-sm min-w-64 p-0! before:border-zinc-600! after:border-zinc-600!">
                {section.icon ? <img className="w-32 h-32 mx-auto! pt-2! object-cover" src={section.icon} /> : null}
                <span className="font-medium text-center tracking-wide py-2! px-4!">{section.display_name}</span>
                {(section.slots ?? []).length > 0 ? <Slots slots={section.slots} /> : <span className="text-secondary-fg italic bg-background rounded-b-md text-center px-2! py-4! text-sm">This section has no slots</span>}
            </div>
            {
                (section.sections || []).length
                    ? <ul>{section.sections.map((v, k) => <OrbatSection section={v} key={k} />)}</ul>
                    : null
            }
        </li>
    );
};
