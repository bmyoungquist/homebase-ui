import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getUserInitials(name?: string): string {
	if (!name) return ""

	const names = name.split(' ')
	const first = names[0]
	const last = names.length > 1 ? names[names.length - 1] : ""

	return `${first.slice(0, 1)}${last.slice(0, 1)}`.toUpperCase()
}