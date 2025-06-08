import type { UnitSlot } from '@/types';

type SlotsProps = {
    slots: UnitSlot[];
};

export const Slots = ({ slots }: SlotsProps) => (
    <table>
        <tbody>
            {slots.map((slot, k) => (
                <tr key={k} className="group border-b bg-background last:border-none odd:bg-secondary">
                    <th className="border-r p-[4px_10px]! font-normal group-last:rounded-bl-sm">{slot.display_name}</th>
                    <td className="p-[4px_10px]! group-last:rounded-br-sm">
                        {/*
                        slot.member
                        ? <a className="underline underline-offset-2" href={`/roster/service-record/${slot.profile.id}`}>{slot.profile.ui_name}</a>
                        : <span className="text-green-600">Open</span>
                    */}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);
