import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const MemberRoleLabel = {
    owner: 'Owner',
    admin: 'Admin',
    normal: 'Normal',
    banned: 'Banned',
};

export const formatName = (rank: string, ...options: (string | undefined)[]) => {
    let name = '';
    for (const nameOpt of options) {
        if (nameOpt) {
            name = nameOpt;
            break;
        }
    }
    return `${rank}. ${name}`;
};
