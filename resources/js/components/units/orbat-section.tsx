import { UnitSection } from '@/types';
import { Slots } from './slots';

type OrbatSectionProps = {
    section: UnitSection;
};

export const OrbatSection = ({ section }: OrbatSectionProps) => {
    return (
        <li className="before:border-zinc-600!">
            <div className="tf-nc flex! min-w-64 flex-col rounded-sm border-zinc-600! p-0! before:border-zinc-600! after:border-zinc-600!">
                {section.icon ? <img className="mx-auto! h-32 w-32 object-cover pt-2!" src={section.icon} /> : null}
                <span className="px-4! py-2! text-center font-medium tracking-wide">{section.display_name}</span>
                {(section.slots ?? []).length > 0 ? (
                    <Slots slots={section.slots} />
                ) : (
                    <span className="text-secondary-fg rounded-b-md bg-background px-2! py-4! text-center text-sm italic">
                        This section has no slots
                    </span>
                )}
            </div>
            {(section.sections || []).length ? (
                <ul>
                    {section.sections.map((v, k) => (
                        <OrbatSection section={v} key={k} />
                    ))}
                </ul>
            ) : null}
        </li>
    );
};
