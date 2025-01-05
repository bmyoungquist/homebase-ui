export function api(input: string, init?: RequestInit) {
	return fetch(`${process.env.HOMEBASE_API_URL!}${input}`, init);
}
