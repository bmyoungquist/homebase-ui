import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getUserInitials(firstName?: string, lastName?: string): string {
	if (!firstName) return '';

	return `${firstName.slice(0, 1)}${lastName?.slice(0, 1)}`.toUpperCase();
}
