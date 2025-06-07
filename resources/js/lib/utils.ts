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
