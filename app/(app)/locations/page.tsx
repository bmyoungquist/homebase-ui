interface Location {
	id: number;
	parentId: number | null;
	name: string;
	description: string;
	createdAt: Date;
}

export default async function Locations() {
	const data: Location[] = await (
		await fetch(`${process.env.HOMEBASE_API_URL}/v1/locations`)
	).json();

	return <>{data?.map((location) => location.name)}</>;
}
